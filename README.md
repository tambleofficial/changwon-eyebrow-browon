# 브로우온 — 전국 지역별 눈썹문신 사이트

전국 메인 → 시·도 → 시·군·구 → 동네 상세 페이지로 이동하는 모바일 중심 사이트입니다.
기존 창원 단일 페이지를 전국 지역 계층 구조로 다시 제작한 버전입니다.

- 브랜드: 브로우온
- 전화: 010-8142-1319
- 배포 주소: https://changwon-eyebrow-browon.pages.dev
- 창원 SEO 페이지: https://changwon-eyebrow-browon.pages.dev/gyeongnam/changwon-si/
- 지역 3,873개 + 메인·전체지역·문의·개인정보처리방침·이용약관 = 총 3,878개 페이지
- 별도의 noindex 404 안내 페이지 포함

## GitHub → Cloudflare Pages

1. ZIP을 풀고 **ZIP 안의 파일과 폴더를 그대로** GitHub 저장소 최상위에 올립니다. ZIP 자체나 바깥 폴더째 올리지 마세요.
2. 저장소 첫 화면에 `data`, `public`, `scripts`, `package.json`, `site.config.json`, `README.md`가 보여야 합니다.
3. 기존 단일 페이지 프로젝트를 교체하는 경우 이번 ZIP의 구성으로 사이트 소스를 교체하세요. 기존 브로우온 프로젝트와 같은 빌드 명령을 사용합니다.
4. Cloudflare Pages에서 GitHub 저장소를 연결하고 아래 설정으로 배포합니다.

| 항목 | 값 |
|---|---|
| 프로젝트 이름 | changwon-eyebrow-browon |
| Production branch | main |
| Framework preset | None |
| Build command | node scripts/build.mjs |
| Build output directory | dist |
| Root directory | 비워 두기 |

GitHub에 수천 개 HTML 파일을 올릴 필요가 없습니다. `data/regions.json`의 지역 목록과 공통 템플릿으로 Cloudflare 빌드 중 모든 페이지를 정적 HTML로 생성합니다. 검색 로봇과 방문자는 JavaScript 실행 없이도 각 지역의 완성된 본문과 링크를 받습니다.

프로젝트 이름이 사용 중이면 Cloudflare가 다른 주소를 발급할 수 있습니다. 이 경우 `site.config.json`의 `siteUrl` 또는 환경변수 `SITE_URL`을 실제 주소로 바꾸고 재배포하세요. 대표 주소·OG·캐러셀 URL·이미지 절대 주소·사이트맵·RSS가 함께 변경됩니다.

기본 배포 브랜치는 `main`입니다. 다른 이름을 사용하는 경우 Cloudflare의 `PRODUCTION_BRANCH` 환경변수에 실제 운영 브랜치 이름을 입력하세요. 운영 브랜치 외 미리보기 빌드는 noindex로 생성됩니다.

## 구성과 주요 경로

| 종류 | 경로 |
|---|---|
| 전국 메인 | / |
| 전체지역·지역 검색 | /areas/ |
| 경남 | /gyeongnam/ |
| 창원 | /gyeongnam/changwon-si/ |
| 창원 성산구 | /gyeongnam/changwon-si/seongsan-gu/ |
| 창원 성산구 상남동 | /gyeongnam/changwon-si/seongsan-gu/sangnam-dong/ |
| 김해 | /gyeongnam/gimhae-si/ |
| 거제 | /gyeongnam/geoje-si/ |
| 아주동 | /gyeongnam/geoje-si/aju-dong/ |
| 문의 | /contact/ |
| 개인정보처리방침 | /privacy/ |
| 이용약관 | /terms/ |

지역 이름·URL 계층은 2026-10-03에 확인한 참고 사이트의 전체지역 목록을 기준으로 구성했습니다. 코드·디자인·본문·사진은 새로 만들었으며 참고 사이트의 이미지·연락처·업체 이름·스타일시트·스크립트는 사용하지 않았습니다. 지역 목록이 행정구역의 최신 법적 기준을 보장하는 자료는 아니므로 운영 중 변경된 지역은 `data/regions.json`에서 관리하세요.

## 캐러셀과 SEO

- 메인과 전체지역 페이지: 서울·경기·인천·부산·대구 5개 지역 카드 → 각 지역 독립 페이지.
- 지역 페이지: 자연·콤보·엠보·남자·파우더 5개 카드 → 같은 지역 페이지의 `#brow-1`~`#brow-5`.
- 지역 페이지마다 ItemList 1개, 원본 크기의 서로 다른 이미지 5개, 정수 position, 절대 image·url을 사용합니다.
- 실제 카드와 구조화 데이터의 항목명·이미지·연결 주소를 일치시켰습니다.
- 각 지역의 title, description, H1, canonical, OG, 키워드, 현재 위치, 하위·주변 지역 링크를 생성합니다.
- FAQPage는 실제 표시된 문답과 일치합니다. 지역 페이지는 BreadcrumbList도 포함합니다.
- 메인 키워드는 전국 눈썹문신, 창원 페이지의 주 키워드는 창원눈썹문신입니다.
- 실제 지점·제휴 업체·주소·후기·가격·경력은 임의로 만들지 않았습니다.
- 지역별 본문에는 공통 디자인 설명이 포함됩니다. 지역 수 자체가 검색 순위나 색인을 보장하지 않습니다. 실제 지역별 운영 정보가 확보되면 정확한 고유 내용을 추가해 운영하세요.
- 검색 노출과 캐러셀 표시는 네이버가 결정하며 구조화 데이터만으로 보장되지 않습니다.

네이버 공식 가이드: https://searchadvisor.naver.com/guide/structured-data-carousel

## 네이버 서치어드바이저

1. 실제 배포 주소를 사이트로 등록합니다.
2. 소유확인 meta 방식의 content 값을 `site.config.json`의 `naverVerification` 또는 `NAVER_SITE_VERIFICATION` 환경변수에 넣고 재배포합니다.
3. HTML 파일 방식이면 네이버에서 내려받은 파일을 이름 그대로 `public/`에 넣고 재배포합니다.
4. 사이트맵: https://changwon-eyebrow-browon.pages.dev/sitemap.xml
5. RSS: https://changwon-eyebrow-browon.pages.dev/rss.xml

전체 수집 대상 주소는 배포 후 `/indexing-urls.txt`에 있습니다. sitemap에는 3,878개 독립 페이지가 포함되고, RSS에는 메인·17개 시도·창원·아주동의 본문을 포함합니다. `#brow-1` 같은 앵커는 독립 색인 URL이 아닙니다.

## 이미지와 글꼴

사진 6장을 모두 새로 AI 생성했습니다. 주인공은 가상의 성인이며 실제 고객 후기나 전후 결과로 표시하지 않았습니다. 페이지에는 AI 생성 안내 문구를 넣지 않았습니다.

- hero: 밝은 중성 배경, 자연광, 피부결이 살아 있는 여성 인물 사진
- natural: 자연스러운 가는 결과 여백을 보여주는 눈썹
- combo: 결과 부드러운 음영을 함께 보여주는 눈썹
- embossed: 한 올씩 표현된 결을 보여주는 눈썹
- men: 기존 숱과 두께를 살린 남자눈썹
- powder: 부드러운 면과 농도로 표현된 눈썹

생성 도구: 내장 이미지 생성. 공통 지시: 자연광 실사 사진, 과한 보정·플라스틱 피부 금지, 전체 눈썹 꼬리가 프레임 안에 보이게, 로고·문구·워터마크 없음. 6개 원본을 웹용 WebP로 저장했습니다. 지역 전체에서 공통 디자인 이미지 5장을 사용하며 각 페이지 내 5개 캐러셀 항목끼리는 사진이 중복되지 않습니다.

글꼴은 Noto Sans KR의 본문용 서브셋을 로컬 파일로 제공합니다. 수정된 내부 이름은 Browon Region Sans이며, 원본 SIL Open Font License는 `public/assets/fonts/OFL-NotoSansKR.txt`에 포함했습니다. 새 문자를 추가하면 해당 문자는 기기의 기본 한글 글꼴로 표시될 수 있습니다.

## 수정 위치

- 브랜드·전화·배포 주소·네이버 소유확인: `site.config.json`
- 지역 이름·계층·주소: `data/regions.json`
- 본문·HTML·구조화 데이터: `scripts/render.mjs`
- 정적 페이지·사이트맵·RSS 생성: `scripts/build.mjs`
- 디자인: `public/assets/site.css`
- 캐러셀·지역 검색: `public/assets/site.js`
- 사진: `public/assets/images/`
- 사진 원본 크기: `data/images.json`

로컬 빌드 명령은 `node scripts/build.mjs`입니다. `dist`는 생성 결과이며 GitHub 업로드 ZIP에는 포함하지 않습니다.

## 화면 미리보기
`preview.png`는 새 메인 화면의 미리보기입니다. 배포되는 사진·본문·지역 페이지는 빌드 시 `dist`에 생성됩니다. ZIP은 미리보기 포함 20개 파일입니다.
