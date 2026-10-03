export const styles = [
  {
    slug: "natural",
    name: "자연눈썹",
    en: "Natural brows",
    line: "본래의 결에 가볍게 더하는 인상",
    text: "눈썹이 자라는 방향을 따라 가는 결을 표현하는 디자인입니다. 테두리를 또렷하게 채우는 느낌보다 기존 눈썹과 자연스럽게 이어지는 분위기를 살펴보세요.",
    point: "앞머리의 시작점 · 결의 방향 · 눈썹 사이의 여백",
    question:
      "평소 눈썹 화장을 얼마나 하는지, 비어 보이는 부분이 어디인지 이야기해 주세요.",
  },
  {
    slug: "combo",
    name: "콤보눈썹",
    en: "Combo brows",
    line: "섬세한 결과 부드러운 음영의 조합",
    text: "한 올씩 보이는 결과 은은한 음영을 함께 표현하는 디자인입니다. 앞머리와 꼬리의 농도 차이, 눈썹 전체의 선명함을 비교하면 원하는 느낌을 찾는 데 도움이 됩니다.",
    point: "결과 음영의 비율 · 앞머리 농도 · 꼬리의 선명함",
    question:
      "채워진 느낌은 어느 정도가 좋은지, 메이크업을 했을 때의 모습을 함께 알려 주세요.",
  },
  {
    slug: "embossed",
    name: "엠보눈썹",
    en: "Hair-stroke brows",
    line: "한 올의 방향까지 살펴보는 디자인",
    text: "눈썹의 개별적인 결 표현을 중심으로 살펴보는 스타일입니다. 자연눈썹과 이름이나 표현이 겹칠 수 있어, 명칭만으로 정하기보다 실제 작업 방식과 디자인 예시를 함께 확인하는 것이 좋습니다.",
    point: "결의 간격 · 기존 눈썹과의 연결 · 전체적인 밀도",
    question: "원하는 결의 굵기와 간격을 보여주는 참고 사진을 준비해 주세요.",
  },
  {
    slug: "men",
    name: "남자눈썹",
    en: "Men’s brows",
    line: "원래의 두께를 살리는 정돈된 균형",
    text: "기존 눈썹의 숱과 두께를 바탕으로 길이와 빈 부분의 균형을 살펴보는 디자인입니다. 직선적인 모양과 완만한 각도 중 얼굴과 취향에 어울리는 방향을 비교해 보세요.",
    point: "두께와 길이 · 눈썹산의 각도 · 좌우의 균형",
    question:
      "평소 손질하는 방식과 피하고 싶은 진한 느낌을 먼저 전달해 주세요.",
  },
  {
    slug: "powder",
    name: "파우더눈썹",
    en: "Powder brows",
    line: "파우더로 채운 듯 은은한 농도",
    text: "가루 타입의 눈썹 메이크업처럼 부드러운 면과 농도를 표현하는 스타일입니다. 경계가 진하게 보이는 정도와 앞머리에서 꼬리로 이어지는 농도의 변화를 함께 확인해 보세요.",
    point: "앞머리의 여백 · 음영의 농도 · 부드러운 경계",
    question:
      "평소 사용하는 눈썹 제품의 색과 좋아하는 메이크업의 농도를 알려 주세요.",
  },
];
export const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const ld = (value) =>
  /* HTML */ `<script type="application/ld+json">
    ${JSON.stringify(
      { "@context": "https://schema.org", ...value },
      null,
      2,
    ).replace(/</g, "\\u003c")}
  </script>`;
export function createRenderer({ config, regions, images, preview }) {
  const origin = config.siteUrl,
    brand = config.brand,
    phone = config.phone,
    tel = phone.replace(/[^+\d]/g, "");
  const byPath = new Map(regions.map((r) => [r.path, r]));
  const childMap = new Map();
  for (const r of regions) {
    if (!childMap.has(r.parent)) childMap.set(r.parent, []);
    childMap.get(r.parent).push(r);
  }
  const children = (p) => childMap.get(p) || [];
  const provinces = children("/");
  const ancestors = (r) => {
    const list = [];
    while (r) {
      list.unshift(r);
      r = byPath.get(r.parent);
    }
    return list;
  };
  const fullName = (r) =>
    ancestors(r)
      .map((x) => x.name)
      .join(" ");
  const img = (slug, alt, hero = false) => {
    const meta = images[slug];
    return /* HTML */ `<img
      src="/assets/images/${slug}.webp"
      width="${meta.width}"
      height="${meta.height}"
      alt="${esc(alt)}"
      ${hero ? 'fetchpriority="high"' : 'loading="lazy"'}
      decoding="async"
    />`;
  };
  const regionLink = (r, short = false) =>
    /* HTML */ `<a href="${r.path}"
      ><span>${esc(r.name)}${short ? "" : "눈썹문신"}</span
      ><small
        >${children(r.path).length
          ? children(r.path).length + "개 하위 지역"
          : "디자인 안내"}</small
      ></a
    >`;
  function crumbs(r, label) {
    return /* HTML */ `<nav class="breadcrumbs" aria-label="현재 위치">
      <a href="/">홈</a>${r
        ? ancestors(r)
            .map((a, i, list) =>
              i === list.length - 1
                ? /* HTML */ `<span aria-current="page">${esc(a.name)}</span>`
                : /* HTML */ `<a href="${a.path}">${esc(a.name)}</a>`,
            )
            .join("")
        : /* HTML */ `<span aria-current="page">${esc(label)}</span>`}
    </nav>`;
  }
  function faq(region) {
    const place = region?.name;
    return [
      [
        place
          ? `${place}눈썹문신 상담 전 무엇을 준비하면 좋나요?`
          : "어울리는 눈썹 디자인을 어떻게 찾을까요?",
        "눈썹 화장을 하지 않은 현재 모습과 마음에 드는 디자인 사진을 준비해 보세요. 숱이 비어 보이는 곳, 좋아하는 두께, 피하고 싶은 인상을 함께 이야기하면 상담 내용을 구체적으로 정리할 수 있습니다.",
      ],
      [
        "예전에 받은 눈썹문신의 잔흔이 있어도 상담할 수 있나요?",
        "이전 진행 시기와 현재 잔흔의 색·모양을 먼저 알려 주세요. 사진만으로 진행 가능 여부나 결과를 단정할 수 없으므로, 현재 상태를 확인하는 상담이 필요합니다.",
      ],
      [
        "자연눈썹·엠보눈썹·콤보눈썹은 어떻게 비교하나요?",
        "명칭은 매장마다 다르게 사용될 수 있습니다. 결을 표현하는 방식, 음영의 유무, 농도와 경계를 함께 비교하고 원하는 모습을 사진으로 전달해 주세요.",
      ],
      [
        "방문 위치와 비용은 어디에서 확인하나요?",
        `방문하려는 곳의 실제 위치와 예약 가능 시간, 비용 및 리터치 포함 범위를 먼저 확인하세요. 사이트의 지역·디자인 안내에 관한 문의는 ${phone}로 연락하실 수 있습니다.`,
      ],
    ];
  }
  const faqSection = (items) =>
    /* HTML */ `<section class="section" id="faq">
      <div class="section-head">
        <p class="kicker">QUESTIONS</p>
        <h2>미리 알아두면<br />좋은 이야기</h2>
      </div>
      <div class="faq-list">
        ${items
          .map(
            ([q, a], i) =>
              /* HTML */ `<details ${i === 0 ? "open" : ""}>
                <summary>${esc(q)}</summary>
                <p>${esc(a)}</p>
              </details>`,
          )
          .join("")}
      </div>
    </section>`;
  function carousel(items, title, subtitle) {
    return /* HTML */ `<section class="section collection" id="designs">
      <div class="section-head">
        <p class="kicker">BROW COLLECTION</p>
        <h2>${esc(title)}</h2>
        <p>${esc(subtitle)}</p>
      </div>
      <div class="slider" tabindex="0" aria-label="${esc(title)}">
        <ul>
          ${items
            .map(
              (item, i) =>
                /* HTML */ `<li>
                  <a href="${item.href}"
                    ><div class="card-image">
                      ${img(item.slug, item.name + " 디자인 예시")}<span
                        class="number"
                        >0${i + 1}</span
                      >
                    </div>
                    <h3>${esc(item.name)}</h3>
                    <p>${esc(item.caption)}</p></a
                  >
                </li>`,
            )
            .join("")}
        </ul>
      </div>
      <div class="slider-footer">
        <span>좌우로 넘겨 살펴보세요</span>
        <div class="slider-buttons">
          <button type="button" data-prev aria-label="이전 항목">이전</button
          ><button type="button" data-next aria-label="다음 항목">다음</button>
        </div>
      </div>
    </section>`;
  }
  const listSchema = (items, name) => ({
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: origin + item.href,
      image: origin + "/assets/images/" + item.slug + ".webp",
    })),
  });
  const featured = () =>
    provinces.map((r) => ({
      name: r.name + " 눈썹문신",
      href: r.path,
      slug: r.imageKey + "-natural",
      caption: "지역별 디자인 안내",
    }));
  function shell({
    path,
    title,
    description,
    main,
    schema = [],
    region = null,
    noindex = false,
  }) {
    const metadata = [
      {
        "@type": "WebPage",
        "@id": origin + path + "#webpage",
        url: origin + path,
        name: title,
        description,
        inLanguage: "ko-KR",
      },
      ...schema,
    ];
    if (path === "/")
      metadata.push({ "@type": "WebSite", name: brand, url: origin + "/" });
    if (region)
      metadata.push({
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "홈", path: "/" }, ...ancestors(region)].map(
          (r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: r.name,
            item: origin + r.path,
          }),
        ),
      });
    const keyword = region ? region.name + "눈썹문신" : "눈썹문신";
    const provinceNav = provinces
      .map((r) => /* HTML */ `<a href="${r.path}">${esc(r.name)}</a>`)
      .join("");
    return /* HTML */ `<!doctype html>
      <html lang="ko">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>${esc(title)}</title>
          <meta name="description" content="${esc(description)}" />
          <meta
            name="keywords"
            content="${esc(
              [
                keyword,
                ...styles.map((s) => (region?.name || "") + s.name),
                region ? fullName(region) : "김해·청주·창원·수원·서울 눈썹문신",
                brand,
              ].join(", "),
            )}"
          />
          <meta
            name="robots"
            content="${preview || noindex
              ? "noindex, follow"
              : "index, follow, max-image-preview:large"}"
          />
          ${config.naverVerification
            ? /* HTML */ `<meta
                name="naver-site-verification"
                content="${esc(config.naverVerification)}"
              />`
            : ""}
          <link rel="canonical" href="${origin + path}" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="${esc(brand)}" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:title" content="${esc(title)}" />
          <meta property="og:description" content="${esc(description)}" />
          <meta property="og:url" content="${origin + path}" />
          <meta
            property="og:image"
            content="${origin}/assets/images/${region
              ? region.imageKey + "-natural"
              : "hero"}.webp"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="theme-color" content="#173c43" />
          <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="${esc(brand)} 지역별 디자인 안내"
            href="${origin}/rss.xml"
          />
          <link
            rel="preload"
            href="/assets/fonts/browon-sans.woff"
            as="font"
            type="font/woff"
            crossorigin
          />
          <link rel="stylesheet" href="/assets/site.css" />
          <script src="/assets/site.js" defer></script>
          ${metadata.map(ld).join("")}
        </head>
        <body>
          <a class="skip" href="#main">본문 바로가기</a>
          <aside class="desktop-note">
            <a href="/" class="desktop-brand">BROW<span>:ON</span></a>
            <p class="desktop-title">나에게 맞는 결,<br />가까운 지역부터.</p>
            <p>다섯 지역의 눈썹 디자인 가이드</p>
            <div class="desktop-stats">
              <b>${regions.length}</b><span>지역 안내</span
              ><b>${regions.length * styles.length}</b><span>디자인 사진</span>
            </div>
            <a class="desktop-feature" href="${config.featuredRegion}"
              >창원눈썹문신 살펴보기</a
            >
          </aside>
          <div class="phone-frame">
            <header class="site-header">
              <a href="/" class="brand" aria-label="${esc(brand)} 홈"
                >BROW<span>:ON</span><small>브로우온</small></a
              ><a class="header-area" href="/areas/">전체지역</a>
            </header>
            <main id="main">${main}</main>
            <footer>
              <a href="/" class="brand">BROW<span>:ON</span></a>
              <p>지역으로 찾고, 디자인으로 비교하는<br />눈썹문신 안내.</p>
              <a class="footer-phone" href="tel:${tel}">${esc(phone)}</a>
              <nav class="province-footer" aria-label="지역별 안내">
                ${provinceNav}
              </nav>
              <nav class="footer-links">
                <a href="/">홈</a><a href="/areas/">전체지역</a
                ><a href="/contact/">문의</a
                ><a href="/privacy/">개인정보처리방침</a
                ><a href="/terms/">이용약관</a>
              </nav>
              <small
                >© ${new Date().getFullYear()} ${esc(brand)}. All rights
                reserved.</small
              >
            </footer>
          </div>
          <aside class="desktop-contact">
            <span class="kicker">LET’S TALK</span>
            <p>지역 · 디자인<br />안내 문의</p>
            <a href="tel:${tel}">${esc(phone)}</a
            ><a class="contact-circle" href="/contact/">문의 안내</a>
          </aside>
          <nav class="contact-dock" aria-label="빠른 메뉴">
            <a href="/areas/">내 지역 찾기</a><a href="tel:${tel}">전화 문의</a>
          </nav>
        </body>
      </html>`;
  }
  function home() {
    const items = featured(),
      questions = faq();
    const main = /* HTML */ `<section class="hero">
        <p class="kicker">YOUR BROW, YOUR NEIGHBORHOOD</p>
        <h1>우리 동네<br /><em>눈썹문신</em> 찾기</h1>
        <p class="hero-copy">
          지역을 먼저 고르고,<br />나에게 맞는 다섯 가지 디자인을 만나보세요.
        </p>
        <form class="search-form" action="/areas/" method="get">
          <label class="sr-only" for="home-search">찾는 지역 이름</label
          ><input
            id="home-search"
            name="q"
            placeholder="지역 이름을 입력하세요"
            autocomplete="off"
          /><button type="submit">찾기</button>
        </form>
        <a class="featured-link" href="${config.featuredRegion}"
          >창원눈썹문신 바로 보기</a
        >
        <figure class="hero-photo">
          ${img(
            "hero",
            "자연스러운 눈썹 결과 피부결을 담은 인물 디자인 이미지",
            true,
          )}
          <figcaption>
            <span>BROW:ON EDIT</span
            ><strong>작은 결이 만드는<br />나다운 분위기.</strong>
          </figcaption>
        </figure>
      </section>
      ${carousel(
        items,
        "지역별 눈썹문신",
        "사진을 선택하면 해당 지역 안내로 이동합니다.",
      )}
      <section class="section" id="regions">
        <div class="section-head">
          <p class="kicker">FIND YOUR AREA</p>
          <h2>어느 지역을<br />찾고 계신가요?</h2>
        </div>
        <div class="region-grid">
          ${provinces.map((r) => regionLink(r)).join("")}
        </div>
      </section>
      ${faqSection(questions)}`;
    return {
      main,
      html: shell({
        path: "/",
        title: "눈썹문신 | 김해·청주·창원·수원·서울 디자인 안내 - " + brand,
        description:
          "김해·청주·창원·수원·서울, 다섯 지역의 눈썹 디자인. 브로우온에서 지역별 눈썹문신 디자인과 자연·콤보·엠보·남자·파우더 눈썹의 차이, 상담 전 확인사항을 살펴보세요.",
        main,
        schema: [
          listSchema(items, "지역별 눈썹문신"),
          {
            "@type": "FAQPage",
            mainEntity: questions.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          },
        ],
      }),
    };
  }
  function local(r) {
    const kids = children(r.path),
      chain = ancestors(r),
      context = fullName(r),
      questions = faq(r);
    const items = styles.map((s, i) => ({
      name: r.name + " " + s.name,
      href: r.path + "#brow-" + (i + 1),
      slug: r.imageKey + "-" + s.slug,
      caption: s.en,
    }));
    const nearby = children(r.parent).filter((x) => x.path !== r.path);
    const localNav = kids.length ? kids : nearby;
    const main = `${crumbs(r)}<section class="hero local-hero"><p class="kicker">${esc(chain.map((a) => a.name).join(" · "))}</p><h1>${esc(r.name)}<em>눈썹문신</em></h1><p class="hero-copy">이름보다, 나에게 어울리는 느낌.<br>결과 음영이 다른 다섯 가지 스타일을 비교해 보세요.</p><div class="hero-actions"><a href="#designs" class="button primary">디자인 살펴보기</a><a href="#local-areas" class="button secondary">다른 지역</a></div><figure class="local-photo">${img(r.imageKey + "-natural", context + " 자연눈썹 디자인 예시", true)}<figcaption>${esc(context)} · 디자인 가이드</figcaption></figure></section>${carousel(items, r.name + " 눈썹문신 스타일", "사진을 누르면 해당 스타일의 자세한 설명으로 이동합니다.")}<section class="section style-details"><div class="section-head"><p class="kicker">FIVE WAYS TO FIND YOURSELF</p><h2>어떤 눈썹이<br>내 취향일까요?</h2></div>${styles
      .map(
        (s, i) =>
          /* HTML */ `<article id="brow-${i + 1}" class="style-story">
            <div class="story-heading">
              <span>0${i + 1}</span>
              <div>
                <p class="kicker">${s.en}</p>
                <h3>${esc(r.name + " " + s.name)}</h3>
              </div>
            </div>
            <figure>
              ${img(
                r.imageKey + "-" + s.slug,
                r.name + " " + s.name + " 디자인 예시",
              )}
              <figcaption>눈썹 디자인 예시</figcaption>
            </figure>
            <h4>${s.line}</h4>
            <p>${s.text}</p>
            <dl>
              <div>
                <dt>살펴볼 포인트</dt>
                <dd>${s.point}</dd>
              </div>
              <div>
                <dt>상담에서 나눌 이야기</dt>
                <dd>${s.question}</dd>
              </div>
            </dl>
            <a class="inline-link" href="#designs">다른 스타일 함께 보기</a>
          </article>`,
      )
      .join(
        "",
      )}</section><section class="section process"><div class="section-head"><p class="kicker">FROM FIRST TALK</p><h2>상담에서<br>리터치 확인까지</h2></div><ol>${[
      [
        "현재 모습 준비",
        "눈썹 화장을 지운 사진과 기존 잔흔, 원하는 디자인 예시를 정리합니다.",
      ],
      [
        "모양과 방식 상담",
        "두께·길이·각도·농도와 실제 작업 방식을 확인하고 궁금한 점을 질문합니다.",
      ],
      [
        "진행 전 사항 확인",
        "진행 가능 여부와 비용, 소요 시간, 개인별 주의사항을 방문할 곳에서 확인합니다.",
      ],
      [
        "리터치 범위 확인",
        "추가 확인 일정과 리터치 포함 여부, 별도 비용의 유무를 미리 안내받습니다.",
      ],
    ]
      .map(
        ([h, p], i) =>
          /* HTML */ `<li>
            <span>0${i + 1}</span>
            <div>
              <h3>${h}</h3>
              <p>${p}</p>
            </div>
          </li>`,
      )
      .join(
        "",
      )}</ol></section><section class="section care"><p class="kicker">AFTER YOUR VISIT</p><h2>진행 후 관리,<br>받은 안내부터 확인하세요.</h2><p>관리 방법은 진행 방식과 개인 상태에 따라 달라질 수 있습니다. 세안·화장·운동을 다시 시작하는 시점과 궁금한 변화는 진행받은 곳의 안내를 기준으로 확인하세요.</p><ul><li>안내받은 관리 내용과 연락 방법을 보관하기</li><li>리터치 일정과 비용 포함 범위를 다시 확인하기</li><li>불편함이나 이상 변화가 있으면 관련 전문가에게 확인하기</li></ul></section>${faqSection(questions)}<section class="section reading"><div class="section-head"><p class="kicker">DESIGN NOTES</p><h2>사진을 볼 때<br>함께 살펴볼 네 가지</h2></div>${[
      [
        "모양은 얼굴 전체와 함께",
        "눈썹만 확대해서 보기보다 이마, 눈과의 간격, 전체적인 표정 안에서 원하는 분위기를 살펴보세요.",
      ],
      [
        "명칭보다 실제 표현 방식",
        "같은 이름이라도 결의 밀도와 음영의 농도가 다를 수 있습니다. 디자인 사진과 설명을 함께 비교하세요.",
      ],
      [
        "색은 일상의 메이크업과 함께",
        "좋아하는 색과 평소 쓰는 눈썹 제품을 참고하면 상담에서 원하는 농도를 더 구체적으로 이야기할 수 있습니다.",
      ],
      [
        "리터치는 조건까지 확인",
        "일정뿐 아니라 적용 범위와 추가 비용, 변경 가능한 부분까지 확인해 두면 상담 내용을 정리하기 쉽습니다.",
      ],
    ]
      .map(
        ([h, p]) =>
          /* HTML */ `<article>
            <h3>${h}</h3>
            <p>${p}</p>
          </article>`,
      )
      .join(
        "",
      )}</section><section class="section local-navigation" id="local-areas"><div class="section-head"><p class="kicker">EXPLORE THE NEIGHBORHOOD</p><h2>다른 지역<br>눈썹문신 안내</h2><p>김해·청주·창원·수원·서울의 지역별 디자인도 살펴보세요.</p></div>${localNav.length ? /* HTML */ `<div class="region-grid">${localNav.map((x) => regionLink(x)).join("")}</div>` : /* HTML */ `<a class="button secondary" href="/areas/">전체 지역 보기</a>`}<div class="local-back"><a href="${r.parent}">메인으로</a><a href="/areas/">전체지역</a></div></section>`;
    return {
      main,
      html: shell({
        path: r.path,
        title: `${r.name}눈썹문신 | ${context} 자연·콤보·남자눈썹 - ${brand}`,
        description: `${context} 눈썹문신 디자인 안내. 자연눈썹·콤보눈썹·엠보눈썹·남자눈썹·파우더눈썹을 비교하고 지역별 디자인 예시와 상담 전 확인사항을 살펴보세요. 문의 ${phone}.`,
        main,
        region: r,
        schema: [
          listSchema(items, r.name + " 눈썹문신 디자인 5가지"),
          {
            "@type": "FAQPage",
            mainEntity: questions.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          },
        ],
      }),
    };
  }
  function tree(r) {
    const kids = children(r.path);
    return kids.length
      ? /* HTML */ `<details class="area-branch">
          <summary>${esc(r.name)} <small>${kids.length}개 지역</small></summary>
          <a class="area-overview" href="${r.path}"
            >${esc(r.name)}눈썹문신 전체 보기</a
          >
          <div class="area-children">${kids.map(tree).join("")}</div>
        </details>`
      : /* HTML */ `<a class="area-leaf" href="${r.path}">${esc(r.name)}</a>`;
  }
  function areas() {
    const items = featured();
    const main = `${crumbs(null, "전체지역")}<section class="hero directory-hero"><p class="kicker">ALL NEIGHBORHOODS</p><h1>내 동네<br><em>눈썹문신</em> 찾기</h1><p class="hero-copy">김해·청주·창원·수원·서울 중에서<br>원하는 지역을 찾아보세요.</p><form class="search-form" id="area-search-form" action="/areas/" method="get"><label class="sr-only" for="area-search">지역 이름 검색</label><input id="area-search" name="q" placeholder="예: 창원, 청주" autocomplete="off"><button type="submit">찾기</button></form><p class="search-status" id="search-status" role="status" hidden></p><div class="search-results" id="search-results" hidden></div></section><section class="section area-directory" id="directory"><div class="section-head"><p class="kicker">5 REGIONS</p><h2>다섯 지역 전체보기</h2></div>${provinces.map(tree).join("")}</section>${carousel(items, "지역별 디자인 안내", "지역을 선택해 눈썹 스타일과 상담 포인트를 확인하세요.")}`;
    return {
      main,
      html: shell({
        path: "/areas/",
        title: "눈썹문신 전체지역 | 김해·청주·창원·수원·서울 - " + brand,
        description:
          "김해·청주·창원·수원·서울 눈썹문신 지역 안내. 원하는 지역을 선택하고 지역마다 다른 디자인 사진과 상담 정보를 살펴보세요.",
        main,
        schema: [listSchema(items, "지역별 눈썹문신")],
      }),
    };
  }
  function info(kind) {
    const pages = {
      contact: {
        title: "지역·디자인 문의",
        eyebrow: "CONTACT",
        body: /* HTML */ `<p>
            원하는 지역과 눈썹 디자인을 함께 알려 주세요. 사이트의 지역 안내와
            콘텐츠 관련 문의도 아래 번호로 연락하실 수 있습니다.
          </p>
          <a class="big-phone" href="tel:${tel}">${esc(phone)}</a>
          <h2>문의 전에 준비하면 좋은 내용</h2>
          <ul>
            <li>찾고 있는 지역: 김해·청주·창원·수원·서울</li>
            <li>궁금한 눈썹 스타일과 원하는 분위기</li>
            <li>기존 눈썹문신 잔흔 여부와 문의 내용</li>
          </ul>
          <p>
            각 지역 페이지는 디자인을 살펴보기 위한 안내 페이지입니다. 실제
            방문할 곳의 위치, 운영시간, 진행 가능 여부와 비용은 방문 전에 확인해
            주세요.
          </p>`,
      },
      privacy: {
        title: "개인정보처리방침",
        eyebrow: "PRIVACY",
        body: /* HTML */ `<p>
            브로우온은 이 사이트에서 회원가입이나 상담 정보 입력폼을 운영하지
            않습니다. 지역 검색어는 방문자의 브라우저에서 지역 목록을 찾는 데
            사용하며 별도의 검색어 저장 기능을 두지 않습니다.
          </p>
          <h2>전화 문의</h2>
          <p>
            전화 버튼을 누르면 이용자의 전화 앱이 열립니다. 문의 과정에서
            전달하는 내용에는 필요한 범위의 정보만 포함해 주세요.
          </p>
          <h2>사이트 제공 과정</h2>
          <p>
            사이트는 Cloudflare Pages를 통해 제공됩니다. 접속 처리와 보안을 위해
            호스팅 제공자의 정책에 따른 기술적 접속 정보가 처리될 수 있습니다.
            사이트 코드에는 별도의 광고 추적 도구나 분석 쿠키를 추가하지
            않았습니다.
          </p>
          <h2>문의</h2>
          <p>
            운영: ${esc(brand)}<br />연락처:
            <a href="tel:${tel}">${esc(phone)}</a><br />시행일: 2026년 10월 3일
          </p>`,
      },
      terms: {
        title: "이용약관",
        eyebrow: "TERMS",
        body: /* HTML */ `<p>
            브로우온은 지역별 눈썹 디자인과 상담 전 확인사항을 안내하는 정보
            사이트입니다.
          </p>
          <h2>안내 정보의 이용</h2>
          <p>
            지역 페이지가 해당 지역에 실제 지점이나 제휴 업체가 운영되고 있음을
            의미하지는 않습니다. 방문 장소와 운영시간, 비용, 제공 서비스는
            방문하려는 곳에서 직접 확인해 주세요.
          </p>
          <h2>디자인 이미지</h2>
          <p>
            사진은 디자인의 분위기를 살펴보기 위한 예시이며 특정 고객의 진행
            결과나 효과를 보장하는 자료가 아닙니다. 스타일의 명칭과 실제 작업
            방식은 안내하는 곳에 따라 달라질 수 있습니다.
          </p>
          <h2>예약과 문의</h2>
          <p>
            이 사이트에는 온라인 예약·결제 기능이 없습니다. 전화 문의만으로
            예약이나 계약이 확정되는 것은 아니며, 필요한 조건을 별도로 확인해
            주세요.
          </p>
          <h2>콘텐츠 관련 문의</h2>
          <p>
            오류 수정과 콘텐츠 관련 연락은
            <a href="tel:${tel}">${esc(phone)}</a>로 문의해 주세요.<br />시행일:
            2026년 10월 3일
          </p>`,
      },
    };
    const p = pages[kind],
      main = `${crumbs(null, p.title)}<section class="hero info-page"><p class="kicker">${p.eyebrow}</p><h1>${p.title}</h1><div class="prose">${p.body}</div></section>`;
    return {
      main,
      html: shell({
        path: "/" + kind + "/",
        title: p.title + " | " + brand,
        description: brand + " " + p.title + " 안내. 문의 " + phone,
        main,
      }),
    };
  }
  function notFound() {
    return shell({
      path: "/404.html",
      title: "페이지를 찾을 수 없습니다 | " + brand,
      description: "지역 목록에서 원하는 페이지를 찾아보세요.",
      noindex: true,
      main: '<section class="hero info-page"><p class="kicker">404</p><h1>페이지를<br>찾을 수 없어요.</h1><p class="hero-copy">주소를 확인하거나 전체지역에서<br>원하는 동네를 찾아주세요.</p><a class="button primary" href="/areas/">전체지역 보기</a></section>',
    });
  }
  return { home, local, areas, info, notFound, fullName, provinces };
}
