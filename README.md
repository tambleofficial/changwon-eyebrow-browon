# 브로우온 — 5개 지역 눈썹문신 사이트

메인 → 김해·청주·창원·수원·서울 지역 페이지 구성입니다. 다른 지역과 구·동 세부 페이지는 생성하지 않습니다. 모바일 중심 디자인과 전화 010-8142-1319를 유지했습니다.

## 배포

ZIP을 풀고 안의 파일과 폴더를 GitHub 저장소 최상위에 올리세요. 기존 소스를 이번 구성으로 교체합니다. ZIP 자체를 올리지 마세요.

| Cloudflare Pages 항목 | 값 |
|---|---|
| 프로젝트 이름 | changwon-eyebrow-browon |
| Production branch | main |
| Framework preset | None |
| Build command | node scripts/build.mjs |
| Build output directory | dist |
| Root directory | 비워두기 |

빌드할 때 dist를 비우고 현재 5개 지역만 새로 생성합니다. 과거 전국 지역 페이지는 새 배포에서 제외됩니다. GitHub에는 dist를 올릴 필요가 없습니다. 검색 결과에서 이전 주소가 사라지는 시점은 검색엔진의 재수집에 따라 달라집니다.

site.config.json의 siteUrl 기본값은 https://changwon-eyebrow-browon.pages.dev 입니다. 실제 발급된 주소가 다르면 이 값 또는 SITE_URL 환경변수를 수정하세요. canonical, OG, 구조화 데이터, 사이트맵, RSS가 함께 바뀝니다. 운영 브랜치가 main이 아니면 PRODUCTION_BRANCH 환경변수도 설정하세요.

## 지역 페이지

| 지역 | 기존 주소 유지 |
|---|---|
| 김해 | /gyeongnam/gimhae-si/ |
| 청주 | /chungbuk/cheongju-si/ |
| 창원 | /gyeongnam/changwon-si/ |
| 수원 | /gyeonggi/suwon-si/ |
| 서울 | /seoul/ |

각 지역은 메인에서 바로 연결됩니다. 경남·경기·충북 상위 안내 페이지와 구·동 페이지는 만들지 않습니다. 메인, 전체지역, 문의, 개인정보처리방침, 이용약관을 포함해 색인 대상은 10페이지입니다. 별도 404.html은 noindex입니다.

## 사진 및 캐러셀

- 지역마다 자연·콤보·엠보·남자·파우더 5장, 총 25장을 별도로 새로 AI 생성했습니다. 지역 간 같은 사진을 재사용하지 않습니다.
- 각 지역의 대표 사진·OG는 해당 지역 자연눈썹 사진을 사용합니다.
- 메인·전체지역 캐러셀은 각 지역의 자연눈썹 사진으로 해당 지역 페이지를 소개합니다.
- 같은 지역 안에서는 캐러셀과 해당 본문에 같은 사진을 사용합니다. 카드 클릭 시 같은 페이지의 #brow-1~#brow-5로 이동합니다.
- 실제 카드의 이름·사진·주소와 ItemList 구조화 데이터를 일치시켰습니다. 페이지마다 ItemList는 1개입니다.
- 메인 히어로 사진 1장은 기존 AI 사진을 유지했습니다. 전체 사이트 이미지 파일은 26장입니다.
- 사진은 가상 성인의 디자인 예시이며 실제 고객 후기·시술 전후 사례로 표시하지 않습니다. 페이지에 AI 생성 안내 문구는 추가하지 않았습니다.
- 생성 도구: 내장 이미지 생성. 공통 프롬프트: 가상 한국인 성인의 자연광 실사 눈썹 디자인, 실제 피부결·미세한 비대칭, 양쪽 눈썹 전체가 보이는 구도, 지역·유형마다 다른 얼굴·눈썹·머리 모양, 로고·문구·워터마크·전후 비교 없음. 세부 인물·스타일 지정은 image-prompts.json에 기록했습니다.
- 파일은 public/assets/images/{지역영문}-{유형}.webp입니다. 생성 원본 크기를 유지해 WebP로 인코딩했습니다.

지역별 title, description, H1, canonical, OG, 메타 키워드와 BreadcrumbList를 적용했습니다. FAQPage는 실제 본문 문답과 같습니다. 검색 순위와 캐러셀 노출은 검색엔진이 결정하며 이미지 교체나 구조화 데이터만으로 보장되지 않습니다.

## 네이버 등록

- 사이트맵: https://changwon-eyebrow-browon.pages.dev/sitemap.xml — 10페이지
- RSS: https://changwon-eyebrow-browon.pages.dev/rss.xml — 메인과 지역 5페이지
- 색인 주소 목록: 배포 후 /indexing-urls.txt
- 소유확인 메타 content 값: site.config.json의 naverVerification 또는 NAVER_SITE_VERIFICATION
- HTML 파일 방식 소유확인: 네이버에서 받은 파일을 public/에 넣어 배포

#brow-1 같은 본문 앵커는 별도의 색인 제출 주소가 아닙니다.

## 수정 위치

- site.config.json: 브랜드, 전화번호, 주소, 소유확인
- data/regions.json: 5개 지역과 지역별 이미지 접두어
- data/images.json: 이미지 크기
- scripts/render.mjs: 본문, 메타 정보, 캐러셀 구조화 데이터
- scripts/build.mjs: 정적 페이지, 사이트맵, RSS 생성
- public/assets/site.css 및 site.js: 디자인과 동작

글꼴은 Noto Sans KR의 로컬 서브셋이며 라이선스는 public/assets/fonts/OFL-NotoSansKR.txt에 있습니다. preview.png는 메인 화면 미리보기입니다.

## 코드 줄바꿈

HTML 템플릿, CSS, JavaScript, JSON에 줄바꿈과 들여쓰기를 적용했습니다. 빌드 결과 HTML에도 같은 형식이 적용됩니다. 빌드용 포맷터는 scripts/vendor에 포함했으므로 별도 패키지 설치가 필요하지 않습니다. 해당 라이선스도 함께 제공합니다.
