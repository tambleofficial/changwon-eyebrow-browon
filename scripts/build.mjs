import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "./vendor/prettier.mjs";
import * as htmlPlugin from "./vendor/prettier-html.mjs";
import { createRenderer, esc } from "./render.mjs";
process.chdir(fileURLToPath(new URL("..", import.meta.url)));
const config = JSON.parse(fs.readFileSync("site.config.json", "utf8"));
const parsed = new URL(process.env.SITE_URL || config.siteUrl);
if (parsed.protocol !== "https:" || parsed.username || parsed.password)
  throw new Error("SITE_URL에는 실제 HTTPS 사이트 주소를 입력하세요.");
config.siteUrl = parsed.origin;
config.phone = process.env.CONTACT_PHONE || config.phone;
if (
  !/^[+\d ()-]+$/.test(config.phone) ||
  !/^\+?\d{8,15}$/.test(config.phone.replace(/[^+\d]/g, ""))
)
  throw new Error("전화번호를 확인하세요.");
config.naverVerification =
  process.env.NAVER_SITE_VERIFICATION || config.naverVerification || "";
const preview =
  !!process.env.CF_PAGES_BRANCH &&
  process.env.CF_PAGES_BRANCH !== (process.env.PRODUCTION_BRANCH || "main");
const regions = JSON.parse(fs.readFileSync("data/regions.json", "utf8"));
const images = JSON.parse(fs.readFileSync("data/images.json", "utf8"));
const paths = new Set(regions.map((r) => r.path));
if (paths.size !== regions.length) throw new Error("중복 지역 경로");
for (const r of regions)
  if (
    !/^\/[a-z0-9/-]+\/$/.test(r.path) ||
    (r.parent !== "/" && !paths.has(r.parent))
  )
    throw new Error("잘못된 지역 계층: " + r.path);
for (const r of regions)
  for (const slug of ["natural", "combo", "embossed", "men", "powder"])
    if (!images[r.imageKey + "-" + slug])
      throw new Error("지역별 이미지 누락: " + r.name + " " + slug);
for (const [name, meta] of Object.entries(images))
  if (
    !fs.existsSync("public/assets/images/" + name + ".webp") ||
    !meta.width ||
    !meta.height
  )
    throw new Error("이미지 누락: " + name);
fs.rmSync("dist", { recursive: true, force: true });
fs.cpSync("public", "dist", { recursive: true });
const render = createRenderer({ config, regions, images, preview }),
  allPaths = [],
  feed = [];
const feedPaths = new Set(["/", ...regions.map((r) => r.path)]);
async function write(route, page) {
  const target = path.join("dist", route, "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(
    target,
    await format(page.html, {
      parser: "html",
      plugins: [htmlPlugin],
      printWidth: 100,
      tabWidth: 2,
      htmlWhitespaceSensitivity: "css",
    }),
  );
  allPaths.push(route);
  if (feedPaths.has(route))
    feed.push({
      route,
      main: page.main,
      title: page.html.match(/<title>(.*?)<\/title>/)[1],
    });
}
await write("/", render.home());
await write("/areas/", render.areas());
for (const r of regions) await write(r.path, render.local(r));
for (const kind of ["contact", "privacy", "terms"])
  await write("/" + kind + "/", render.info(kind));
fs.writeFileSync(
  "dist/404.html",
  await format(render.notFound(), {
    parser: "html",
    plugins: [htmlPlugin],
    printWidth: 100,
    tabWidth: 2,
  }),
);
const origin = config.siteUrl;
fs.writeFileSync(
  "dist/sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    allPaths.map((p) => `<url><loc>${origin + p}</loc></url>`).join("") +
    "</urlset>\n",
);
fs.writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);
fs.writeFileSync(
  "dist/rss.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>' +
    esc(config.brand) +
    " 지역별 눈썹문신 안내</title><link>" +
    origin +
    '/</link><description>지역과 디자인으로 찾아보는 눈썹문신 안내</description><language>ko</language><atom:link href="' +
    origin +
    '/rss.xml" rel="self" type="application/rss+xml"/>' +
    feed
      .map(
        ({ route, main, title }) =>
          `<item><title>${title}</title><link>${origin + route}</link><guid isPermaLink="true">${origin + route}</guid><description><![CDATA[${main
            .replace(/(href|src)="\//g, '$1="' + origin + "/")
            .replace(/href="#/g, 'href="' + origin + route + "#")
            .replaceAll("]]>", "]]]]><![CDATA[>")}]]></description></item>`,
      )
      .join("") +
    "</channel></rss>\n",
);
fs.writeFileSync(
  "dist/region-index.json",
  JSON.stringify(
    regions.map((r) => ({
      path: r.path,
      name: r.name,
      fullName: render.fullName(r),
    })),
  ),
);
fs.writeFileSync(
  "dist/indexing-urls.txt",
  allPaths.map((p) => origin + p).join("\n") + "\n",
);
console.log(
  `빌드 완료: ${allPaths.length}개 페이지 / ${regions.length}개 지역 / ${origin} / ${preview ? "미리보기 noindex" : "검색 수집 허용"}`,
);
