import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
process.chdir(root);
const config = JSON.parse(fs.readFileSync('site.config.json', 'utf8'));
const sourceOrigin = 'https://changwon-eyebrow-browon.pages.dev';
const raw = process.env.SITE_URL || config.siteUrl;
if (!raw) throw new Error('site.config.json의 siteUrl에 실제 HTTPS 배포 주소를 입력하세요.');
const parsed = new URL(raw);
if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error('대표 주소에는 실제 HTTPS 사이트 주소를 입력하세요.');
const origin = parsed.origin;
const phone = process.env.CONTACT_PHONE || config.phone;
if (!/^[+0-9 ()-]+$/.test(phone)) throw new Error('전화번호에 허용되지 않는 문자가 있습니다.');
const tel = phone.replace(/[^+\d]/g, '');
if (!/^\+?\d{8,15}$/.test(tel)) throw new Error('전화번호를 확인하세요.');
const verification = process.env.NAVER_SITE_VERIFICATION || config.naverVerification || '';
const escape = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const preview = !!process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== (process.env.PRODUCTION_BRANCH || 'main');
fs.rmSync('dist', {recursive:true,force:true});
fs.cpSync('public','dist',{recursive:true});
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const file=path.join(dir,name);
    if(fs.statSync(file).isDirectory()){walk(file);continue;}
    if(!/\.(html|xml|txt)$/.test(name))continue;
    let text=fs.readFileSync(file,'utf8').replaceAll(sourceOrigin,origin).replaceAll('010-8142-1319',phone).replaceAll('01081421319',tel);
    if(name.endsWith('.html')) {
      if(verification) text=text.replace('<!-- NAVER_VERIFICATION -->','<meta name="naver-site-verification" content="'+escape(verification)+'">');
      if(preview) text=text.replace('content="index, follow, max-image-preview:large"','content="noindex, nofollow"');
    }
    fs.writeFileSync(file,text);
  }
}
walk('dist');
console.log('빌드 완료: dist / '+origin+' / '+(preview?'미리보기 noindex':'검색 수집 허용'));
