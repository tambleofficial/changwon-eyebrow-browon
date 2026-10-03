# 브로우온 창원 — 창원눈썹문신 홈페이지

업체명: 브로우온 창원(요청에 따라 정한 이름)  
전화: 010-8142-1319  
메인 검색어: 창원눈썹문신

## GitHub → Cloudflare Pages 배포
1. ZIP을 풀고 `public`, `scripts`, `package.json`, `site.config.json`, `README.md`를 GitHub 저장소 최상위에 올립니다.
2. Cloudflare Pages 프로젝트 이름은 기본 설정과 같은 `changwon-eyebrow-browon`을 사용합니다. 이 이름은 제안값이며 생성 가능 여부나 배포 완료를 의미하지 않습니다.
3. Build command: `node scripts/build.mjs`
4. Build output directory: `dist`
5. Root directory는 비워 둡니다. Production branch는 `main`으로 지정합니다.

기본 대표 주소는 https://changwon-eyebrow-browon.pages.dev 입니다. **실제 발급된 주소가 다르면 반드시** `site.config.json`의 `siteUrl` 또는 Cloudflare 환경변수 `SITE_URL`을 실제 HTTPS 주소로 바꾸고 다시 배포하세요. 대표 주소, 구조화 데이터의 이미지·앵커, sitemap, RSS, robots가 함께 변경됩니다. 본 파일은 배포용 파일이며 아직 사이트가 공개된 것은 아닙니다.

## 네이버 서치어드바이저
1. 실제 배포 주소를 사이트로 등록합니다.
2. 소유확인용 meta 태그의 content 값을 `site.config.json`의 `naverVerification` 또는 `NAVER_SITE_VERIFICATION` 환경변수에 넣고 재배포합니다. HTML 파일 방식이면 네이버가 발급한 파일을 파일명 그대로 `public/`에 추가해 재배포합니다.
3. 소유확인 완료 후 메인 주소 `/`를 웹 페이지 수집 요청합니다.
4. 사이트맵 제출 주소: 실제 사이트 주소 + `/sitemap.xml`
5. RSS 제출 주소: 실제 사이트 주소 + `/rss.xml`

독립 콘텐츠 페이지는 메인 1개입니다. `#brow-1`부터 `#brow-5`는 메인 본문의 위치이며 별도 색인 페이지가 아닙니다. 오류 안내용 404 페이지는 noindex입니다. `main` 이외 브랜치 미리보기는 빌드에서 noindex로 처리합니다.

## SEO·캐러셀 적용 내용
- 창원눈썹문신을 중심으로 title, description, keywords, H1·본문, canonical, OG·Twitter 메타를 구성했습니다.
- 한 페이지에 ItemList 1개, 중복되지 않는 원본 크기 이미지 5개를 사용합니다.
- `position`, `name`, 절대 `image` URL, 절대 `url`을 포함하고 URL은 같은 페이지 `#brow-1~5`로 연결합니다.
- 카드·ItemList·실제 상세 본문의 이미지와 항목명이 일치합니다.
- JavaScript 없이도 모든 카드·본문·이미지·링크가 HTML에 포함됩니다.
- sitemap과 robots를 제공하고, RSS에 메인 본문 전체와 절대 이미지·링크 주소를 포함했습니다.
- 화면은 대표 소개 → 디자인 캐러셀 → 디자인 기준 → 유형별 설명 → FAQ → 상담 안내 순서입니다.
- 키보드·터치 조작, 움직임 최소화 설정, 모바일 하단 전화 버튼을 지원합니다.
- ItemList 외 WebPage, Organization, FAQPage 데이터를 실제 표시된 내용에 맞춰 넣었습니다. 임의 주소·리뷰·경력·가격·평점은 넣지 않았습니다.
- 상세 주소와 영업시간은 제공받지 않아 기재하지 않았습니다.
- 사이트 이미지 6장은 새로 생성한 디자인 이미지입니다. 페이지에 AI 생성 안내 문구는 넣지 않았으며 실제 고객 전후 사례나 후기라고 표시하지 않았습니다.

구조화 데이터의 유효성과 실제 검색 노출은 별개입니다. 네이버는 캐러셀 형식 노출을 보장하지 않습니다.
공식 가이드: https://searchadvisor.naver.com/guide/structured-data-carousel

## 파일 수정
본문은 `public/index.html`, 색상·배치는 `public/assets/styles.css`, 동작은 `public/assets/main.js`, 사진은 `public/assets/images/`에서 수정합니다. 전화번호는 `site.config.json`에서 변경하면 빌드 시 반영됩니다. 업체명을 바꾸려면 본문·메타·JSON-LD·RSS 내 이름을 함께 변경하세요.

사진은 내장 이미지 생성 도구로 제작했습니다. 생성 방향: 아이보리 배경의 자연스러운 성인 인물 화보 1장, 자연·콤보·엠보·남자·파우더 눈썹을 각각 다른 성인 모델로 표현한 정사각형 사진 5장. 문구·전화번호·로고·워터마크 없이 피부결과 눈썹을 자연스럽게 표현했습니다.

## 글꼴
외부 글꼴 서버에 의존하지 않도록 Noto Sans KR·Noto Serif KR의 본문용 서브셋을 포함했습니다. 수정된 글꼴 내부 이름은 Browon Sans KR·Browon Serif KR입니다. SIL Open Font License 1.1 원문은 `public/assets/fonts/`에 포함돼 있습니다. 새로 추가한 문자는 기기의 한글 기본 글꼴로 표시될 수 있습니다.
