# YBM DS 사이트

YBM 디자인 시스템 공식 문서 사이트를 준비하는 폴더다. 2026-10-30 별도 저장소(ybm-ds-site)에서 ybm-ds 안 `site/` 로 합쳤다. DS 를 사이트로 보여 주는 것이라 한 저장소로 관리한다.

## 현재 상태 (2026-10-30 첫 버전)
- 사이트 주소: <https://luvms012-rgb.github.io/ybm-ds/site/> (로컬 미리보기는 works/.claude/launch.json 의 ds-preview → http://localhost:5179/site/)
- **만들기: `node site/build.mjs`** - 바로 위 폴더(DS)의 components.json, dist/components.css 머리 주석과 --ds-* 변수, tokens.css, icons.css, ybm-ds.js 머리 주석, 루트 index.html 예시, README 6.2 지침을 읽어 페이지를 만든다. DS 를 고치면 다시 실행만 하면 된다.
- 손으로 쓰는 것: `site/build.mjs`(시작하기, 사용 규칙 문장 포함), `site/src/`(site.css, site.js, logo-mark.svg, figma-notes.json, templates.json), `site/templates/pages/*.html`(템플릿 원본)
- 생성물(직접 고치지 않음): `site/index.html`, `site/get-started/`, `site/components/`, `site/templates/*.html`, `site/assets/`
- `site/src/figma-notes.json`: Figma 컴포넌트 설명에서 옮긴 페이지 분류, 한 줄 설명, Do/Don't. Figma 설명을 고치면 같이 고친다.
- 부족한 정책/가이드 제안: [PROPOSAL.md](PROPOSAL.md) - 사용자가 검토 후 고른 것만 추가한다.
- 먼저 읽을 문서: [PLAN.md](PLAN.md)(처음 구상, IA 는 아래가 최신), REFERENCE-ANALYSIS.md(레퍼런스 A, B 분석, **로컬 전용** git 제외)

## 사용자가 확정한 것
- **레퍼런스 1순위는 레퍼런스 A** (2026-10-30 저녁 집, 사용자 "1순위, B 는 필요하면 언급"). 배치 크기, 상단 막대, 왼쪽 메뉴, 목차, 글자 크기와 굵기는 레퍼런스 A 문서 시작 화면 실측값이다(site.css 머리 주석에 수치). 아래에 "레퍼런스 B" 로 적힌 규칙 가운데 배치, 상단 막대, 왼쪽 메뉴, 글자 크기와 굵기 항목은 이것으로 바뀌었고, 상자, 이전/다음, 푸터, 썸네일은 그대로다. 레퍼런스 B 는 사용자가 말할 때만 참고한다.
- **용어는 되도록 영어** (2026-10-30 저녁 집): 제목(h2, h3), 목차, 버튼, 탭, 찾기 칸 안내 글은 영어. 설명 문장과 본문은 한국어. 오른쪽 목차 위 "목차" 제목은 없앰.
- **왼쪽 메뉴 묶음은 접는 아코디언** (2026-10-30 저녁 집, 레퍼런스 A 실측): 묶음 이름은 항목과 같은 32 버튼(14/20 400) + 오른쪽 14 꺾쇠(위 = 펼침), 안쪽 항목 글자 들여쓰기 32, 안쪽 항목 사이 간격 0, 묶음 위아래 8. 항목은 진한 글자 400, 지금 페이지 500 + 옅은 회색 채움. 접은 묶음은 localStorage `ybm-site-nav-closed` 에 기억하고, 지금 페이지가 든 묶음은 늘 펼친다.
- **사이트 CSS / JS 주소에 버전**(`?v=` + 내용 해시 8자리)을 붙인다. 고친 뒤 브라우저나 GitHub Pages 캐시 때문에 예전 모양이 보이는 문제를 막는다.
- **로고 다크 모드 (2026-10-31 결정)**: 다크 모드에서는 공식 로고를 CSS filter 로 흰색 단색으로 보여 준다(`img[src$="logo-ybmnet.svg"]`). 로고 파일 자체는 손대지 않는다. 공식 다크용 로고 파일이 생기면 그걸로 바꾼다.
- **목차를 누르면** 막대가 누른 항목으로 바로 미끄러지고 본문은 부드럽게 스크롤한다(스크롤하는 동안 지나가는 제목은 막대를 움직이지 않음, 움직임 줄이기 설정이면 바로 이동).
- **IA 는 Get Started, Components, Templates 세 가지** (2026-10-30 저녁 집에서 사용자 "통합": 네 가지였던 것을 레퍼런스 A 처럼 Foundations 를 Get Started 왼쪽 메뉴의 묶음으로 넣음). 사이트 메인은 따로 없고 Get Started 가 첫 화면이다. Get Started 왼쪽 메뉴는 Overview + Guide(Scripts, Usage) + Foundations(Color, Elevation, Iconography, Motion, Radius, Spacing, Typography). 파일 주소 `foundations/<slug>.html` 은 그대로이고, 예전 허브 `foundations/index.html` 은 Color 로 넘어가는 빈 페이지만 남겼다.
- **다크 모드는 기기 설정을 따른다** (2026-10-30 집, 사용자 "밤에는 자동으로 다크모드"): 처음 들어오면 OS 의 라이트 / 다크 설정(prefers-color-scheme)대로 보이고, 기기 설정이 바뀌면 같이 바뀐다. 상단 버튼으로 고르면 그 선택(`localStorage` ybm-site-theme = dark 또는 light)이 우선한다.
- **배치와 전체 스타일은 레퍼런스 B 문서 화면 그대로** (2026-10-30 오후 사용자 "컨텐츠가 너무 좁아, 당근하고 똑같이", "레이아웃 똑같이", "컨텐츠 박스 스타일과 전체적인 스타일 당근 것으로"). 처음엔 레퍼런스 A 배치였다가 바뀜. 실측값:
  - 상단 막대도 레퍼런스 B: 높이 64 / 1024 이상 72 / 1280 이상 76, 메뉴 항목 16/24 보통 굵기 진한 글자 높이 32 안쪽 4 6(1280 이상 36, 6 12) 모서리 8 간격 2, 지금 메뉴와 호버는 옅은 회색 채움, 오른쪽 원형 버튼 32(1280 이상 36) 옅은 회색 채움 간격 6. 로고와 오른쪽 버튼은 본문과 같은 최대 1552 칸 안(칸 왼쪽 16 에 로고, 오른쪽 16 안쪽에 마지막 버튼, 1920 에서 로고 x 193). 1024 이상: 왼쪽 메뉴 184(1280 이상 240) | 본문 칸(안쪽 32 24, 1280 이상 56 32, 글 최대 900 가운데) | 목차 200(1280 이상), 셋을 합친 최대 1552 를 화면 가운데에. 1440 에서 글 x 283 폭 900 / 목차 x 1225, 1920 에서 메뉴 x 177 / 글 x 523 으로 레퍼런스와 같다. 1024 보다 좁으면 메뉴는 서랍, 목차는 제목 아래 고르기. 목차 막대 움직임만 레퍼런스 A.
  - 제목 구성: 제목 위 경로 글자는 사용자가 빼라고 함. 제목 32 / 48 / 60(줄 높이 1.1, 500), 설명 16/24 300 muted, 아래 구분선 없음. 컴포넌트는 큰 회색 미리보기(900 x 473, 모서리 16, 부품을 최대 2배까지 키움). 번호/클래스 줄, 제목 줄 Figma 메뉴, Figma/CSS 확인 줄은 사용자가 모두 빼라고 함(Figma 는 상단 막대 아이콘 하나만).
  - 예시 상자: 1px `stroke-neutral-muted` 테두리, 모서리 12, 위 줄 칩 탭(미리보기 / 코드, 고른 것만 `bg-neutral-weak-alpha`) + 구분선 + 흰 미리보기. 코드 상자: 흰 바탕, 같은 테두리, 복사 버튼만 오른쪽 위(언어 이름 칩은 사용자가 뺌 - 칩 모양은 미리보기 / 코드 고르는 곳에만), 코드 13/22. 코드 칸 위 작은 이름 글자도 쓰지 않는다. 표: 테두리 + 모서리 8, 머리 14 500, 칸 10 16 / 12 16, 줄 사이 선. 인라인 코드 `bg-neutral-weak-alpha` 모서리 4.
  - 이전 / 다음 문서: 2열 간격 24, 위 64, 회색 채움 모서리 12. 푸터: 위 선, 왼쪽 YBM NET 로고와 저작권, 오른쪽 Menu / More. 제목(h2) 위 56, 아래 24.
- **페이지 제목은 왼쪽 메뉴와 같은 영문** (2026-10-30 사용자): Get Started, Usage, Scripts, Foundations, Color 등, Components, 컴포넌트 이름, Templates, 템플릿 영문 이름. 설명과 본문은 한국어.
- **왼쪽 메뉴도 레퍼런스 B** (2026-10-30, A 로 갔다가 사용자 "left 영문으로, 호버 bg 라운딩도 당근과 같이"): 이름은 영문(Overview, Guide / Foundations, 컴포넌트 분류 영문, 템플릿 영문 이름), 항목 40 / 모서리 8 / 14 muted, 호버와 지금 페이지는 옅은 회색 채움 + 진한 글자, 묶음 이름 12/16, 안쪽 20 12 80. Components 메뉴 맨 위 찾기 칸은 유지(1px 테두리 보이게 흰 띠 안에). 섹션 이름과 같은 묶음 이름(Foundations, Components, Templates)은 쓰지 않고 항목만, Guide 처럼 실제로 나누는 묶음 이름만 둔다. **순서는 ABC**: 컴포넌트는 분류 없이 Components 한 묶음에 ABC 순, Get Started 는 묶음(Guide, Foundations)은 두고 묶음 안을 ABC 순. 이전 / 다음 문서도 메뉴 순서를 따른다.
- **페이지 배치 3 가지** (`page({ layout })`): doc 글 900 + 목차 - 시작하기, 파운데이션, 컴포넌트 상세 / wide 메뉴 옆 넓은 폭 - 컴포넌트 목록(레퍼런스 B 목록처럼 분류 제목, 개수 없이 ABC 순 3열, 1440 에서 칸 358), 템플릿 상세 / full 템플릿 목록은 PC 에서 왼쪽 메뉴 없이 가운데 머리 + 가운데 필터 + 3열(레퍼런스 A, 그대로 둠).
- **컴포넌트 목록 썸네일은 레퍼런스 B**: 16:9 `bg-neutral` 상자(모서리 8) 가운데에 첫 예시의 앞 부품 2개를 실제 크기로, 상자보다 크면 site.js 가 줄이고(최소 0.5배) 많이 줄여야 하면 뒤 부품을 뺀다. 아래 이름 20/30 500 만(설명은 사용자가 뺌).
- **아이콘 페이지**(foundations/icons.html): 큰 그림 아래 찾기 칸 하나(스크롤해도 위에 붙음)가 CSS 로 바로 쓰는 아이콘(dist/icons.css)과 Lucide 전체 목록(CSS 표시)을 함께 거른다. 전체 목록은 `site/src/lucide-icons.json`(Lucide 1.64.0, 1,999개, ISC) 을 site.js 가 그린다. CSS 에 없는 아이콘은 누르면 icons.css 에 넣을 줄이 복사된다. 갱신: lucide-static 의 icon-nodes.json, tags.json, LICENSE 를 받아 `node site/lucide-update.mjs <폴더> <버전>`.
- **Foundations** (2026-10-30, 레퍼런스 B 의 Foundations 화면과 우리 컴포넌트 목록 기준. 같은 날 저녁 상단 메뉴에서 빠져 Get Started 왼쪽 메뉴 묶음이 됨, 3열 카드 허브는 없앰): 항목마다 한 페이지 `foundations/<slug>.html`(Color, Elevation, Iconography, Motion, Radius, Spacing, Typography - 메뉴와 이전/다음은 ABC 순), 제목은 영문. 설명 아래 큰 그림은 2026-10-31 사용자 지시로 없앰(build.mjs 의 FV 삭제). 표 값은 build.mjs 가 tokens.css 에서 읽는다(다크 블록은 따로). 본문 내용은 레퍼런스 B 처럼 더 채울 수 있다(사용자 검토).
- Quick Start with AI 컨셉. 설치 1순위는 CSS 두 줄, 2순위(개발자)는 버전 고정 CDN, 파일 내려받기, Tailwind 설정. npm 은 제안(PROPOSAL.md).
- 사이트와 템플릿은 **ybm-ds 에 정의된 것만** 쓴다. 없는 것은 PROPOSAL.md 로 제안한다.
- 한글, Pretendard. **한글 위계는 레퍼런스 B 그대로** (2026-10-30 사용자 지시, 실측): 페이지 제목은 위 "제목 구성" 값(32 / 48 / 60), 리드 16/24 300(Pretendard Light, DS 폰트 폴더 파일을 사이트 CSS 에서 선언), 섹션 제목 24/32 500, 소제목 16/22 500, 본문 16/28 400, 보조 14/19. 자간은 사이트 전체 0(2026-10-30 사용자 지시). 템플릿 9종의 tp-h1~tp-body 도 같은 기준. word-break keep-all.
- 템플릿은 모두 반응형(모바일 먼저, 768 / 1280). 앞으로 계속 추가한다(`site/src/templates.json` 한 줄 + `site/templates/pages/<slug>.html`).
- **템플릿 분류는 영어** (2026-10-30 저녁 집, 레퍼런스 A 템플릿 목록 방식): Dashboard, Table, Form, Login, Search, Content, Commerce, Community, Tools, AI Chat, Shell. 목록 위 필터 칩과 상세 위 경로에 그대로 쓴다. 템플릿 안 글은 한국어, 이름은 영어(`en`).
- **템플릿 26종** (2026-10-30 밤 집에서 9종 더: Login Split, Login SSO(Login), Form Wizard(Form), Checkout, Product Detail, Product List, Cart, Order Complete(Commerce), Empty & Error(Shell). Commerce Home 은 카테고리 서랍(Side Panel), 평점(Rating), 배송 배지, 담기 버튼, 타임 세일(Timer), 분류별 랭킹 탭, 쿠폰 Dialog 를 더함.)
- **템플릿 17종까지의 기록** (2026-10-30 저녁 집에서 8종 추가, 사용자가 준 국내 서비스 화면 7곳과 레퍼런스 A 템플릿 목록을 구조만 참고. 서비스 이름, 글, 상품은 넣지 않음): Search Products, Search Places, Search Posts, Search Groups(검색 범위 탭 + 필터 칩 + 오른쪽 보조 칸), Group Detail(왼쪽 소개 카드 + 오른쪽 탭 내용), Project Detail(720 글 + 오른쪽 떠 있는 반응 막대), Case Study(사연 요약표 + 번호 제안 + 전후 사진 + 예산 표), Commerce Home(분류 탭 + 배너 + 빠른 분류 + 브랜드 + 선반 + 순위). 다음 6종 예정: Login Split, Login SSO, Checkout, Form Wizard, Product Detail, Empty & Error.
- **템플릿 스타일 주의**: 템플릿 `<style>` 은 DS 레이어 밖이라 `.tp-*` 에 `display` 를 쓰면 `u-hide-from-md` 보다 세다. 모바일 전용 막대는 `@media (min-width: 768px) { display: none }` 을 직접 쓴다.
- **국내 이커머스 메인 검토 (2026-10-30 집, 제안만)**: 종합몰 4곳 메인을 봤다. 공통 요소는 상단 카테고리 서랍(햄버거) + 검색창, 큰 배너 캐러셀, 빠른 분류, 상품 카드(사진, 브랜드, 이름, 할인율 + 가격 + 원가, 평점과 후기 수, 배송 배지, 담기 버튼), 타임세일(남은 시간), 랭킹 탭(분류별), 쿠폰 모달, 섹션 제목 + 전체 보기. 우리 Commerce Home 에 없는 것: 평점/후기 수, 배송 배지, 담기 버튼, 타임세일 Timer, 분류별 랭킹 탭, 카테고리 서랍. 제안은 PROPOSAL.md 6 절.
- 로고: **YBM NET 공식 로고만** 쓴다(2026-10-30 사용자 지시). 로고 모음 Figma 파일 `NvAvZxDAnYf3nOVkBZ3pyU` 노드 `130:1642` 를 그대로 내보낸 `src/logo-ybmnet.svg`. 잘라 쓰거나 "Design System" 같은 글자를 붙이지 않는다.
- 두 레퍼런스의 이름과 주소는 저장소에 적지 않는다(로컬 분석 문서와 Claude 메모리에만).

## 데이터 원본
- 같은 저장소의 바로 위 폴더(`..`)가 DS 정본이다: `components.json`, `dist/`, `tokens/`. 사이트는 읽기만 한다.
- 저장소: <https://github.com/luvms012-rgb/ybm-ds> (집 Mac `~/Works/ybm-ds`, 회사 윈도우 `C:\Users\luvms\Desktop\works\ybm-ds`)
- 예전 사이트 저장소 <https://github.com/luvms012-rgb/ybm-ds-site> 는 더 쓰지 않는다. 내용은 이 폴더로 옮겼고, 예전 커밋 기록은 그 저장소에만 있다.

## Figma
- **공식 DS 파일** (기준 원본, 파일명 "디자인 시스템"): <https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2274-1143>
  - 노드 `2274:1143` = Foundations 페이지. 섹션: Color `2288:63` · Typography `2288:64` · Spacing `2288:67` · Radius `2288:66` · Elevation `2288:65`. 사이트 Foundations 메뉴의 원본이다.
- **레퍼런스 파일**: 레퍼런스 A 의 Figma 라이브러리 (주소는 로컬 분석 문서와 Claude 메모리)
  - ybm-ds Figma 구성을 이 화면 기준으로 바꿀 예정. **보류 중** — 사용자가 요청할 때만 시작한다.
- **Figma / Code 버튼**(2026-10-31): 컴포넌트와 Foundations 페이지 머리말 아래에 그 부품의 Figma 문서 프레임과 GitHub CSS 줄 범위로 가는 버튼 2개. 주소는 `tokens/links.mjs` 의 계획을 쓰고(Figma 문서 프레임의 "문서 / 코드" 링크와 같은 원본), 문서 프레임 ID 는 `components.json` 의 `doc` / `figmaDocs` 에서 온다. 줄 번호는 빌드마다 다시 계산된다. Motion 은 Figma 문서가 없어 Code 만.
- **쉬움이 먼저** (2026-10-31 사용자: "ybm-ds 는 전체적으로 쉬웠으면"): 글은 짧고 쉬운 말, 한 문단에 한 가지. 페이지는 보자마자 복사해서 쓸 수 있게(Usage 코드가 위, 설명은 한두 줄). 선택지와 규칙은 적게. 새 페이지나 글을 쓸 때 이 기준으로 먼저 본다.
- **Foundations 페이지 구성** (2026-10-31, 레퍼런스 A 의 Color 페이지): Overview(짧은 설명 + 바로 쓰는 예시) → 토큰/항목 표 → 쓰는 법 코드 → Best Practices(Do / Don't 표, `practices()`). Iconography 를 이 구성으로 먼저 만들었다: Overview, Icons(쓰임별 표 5묶음, 이름 누르면 클래스 복사), Size and Color, Add an Icon(Lucide 전체 찾기), Best Practices. 아이콘 쓰임 글은 build.mjs 의 ICON_GROUPS 에 있고, icons.css 에 아이콘을 넣으면 빌드가 빠진 것을 알려 준다. 나머지 Foundations 페이지도 같은 구성으로 채울 수 있다.
- **컴포넌트 상세 배치** (2026-10-31, 레퍼런스 A 의 Button 페이지 실측): 본문 폭 912(문서 페이지 752 보다 넓음, `.site-body--comp`), 첫 그림 16:9, 순서는 Usage → Properties → CSS Variables → Best Practices(Do / Don't 표. "않/금지/마세요" 가 든 문장이 Don't) → Examples(Preview / Code) → Specification.
- **넓은 배치 폭** (2026-10-31): 컴포넌트 목록과 템플릿 상세(`site-body--wide`)는 본문을 1152 로 제한하고 가운데 둔다(레퍼런스 A 컴포넌트 목록 1920 실측). 큰 화면에서 카드가 끝없이 늘어나던 문제를 고침.
- **템플릿 33종** (2026-10-31): PROPOSAL 7-2 의 1~6 을 추가해 분류 13개(Entry, Manage 추가). 서비스 운영 기본 화면(가입 → 마이페이지 → 내역 → 고객센터 → 공지)이 이어진다. 나머지 후보(7~16)와 분류 7개 재편은 PROPOSAL 7 절.
- **미리보기와 사이트 글자 규칙** (2026-10-31): 사이트 CSS 는 cascade layer 밖이라 DS 부품보다 세다. 본문용 h2, h3, p, li, code 규칙은 `:not(.pv-stage *, .site-tile__inner *, .site-example__preview *)` 로 미리보기 안을 빼야 한다. 빼지 않으면 부품 제목에 큰 여백이 생긴다.
- **Best Practices 표** (2026-10-31): Do 를 먼저, Don't 를 나중에. README 6.2 는 문장마다 한 줄, Figma 메모(figma-notes.json dos)는 항목마다 한 줄. 첫 문장이 "~않습니다, ~마세요" 로 끝나면 Don't. 같은 규칙이 겹치면(앞 7글자) 자세한 쪽만 남긴다. 문장은 합니다체, "금지, 권장" 같은 딱딱한 말은 풀어 쓴다.
- **Figma 와 이어지기** (2026-10-31): 사이트의 Figma 버튼은 Get Started(`2608:2`), Foundations, 컴포넌트, 템플릿(`templates.json` 의 `figma.pc`) 프레임으로 간다. Figma 문서 프레임 본문은 `node sync.mjs docs` 로 사이트와 같은 설명과 Best Practices 를 다시 채울 수 있다(같은 이름의 노드를 지우고 다시 만든다).
- **템플릿을 Figma 로** (2026-10-31): `node site/figma-capture.mjs [slug]` 가 이 Mac 의 Chrome 을 화면 없이 띄워 템플릿을 PC 1440 / 모바일 375 로 열고 SVG 로 저장한다(tokens/.figma-capture, 커밋 안 함). 여러 개를 한 번에 돌리면 가끔 멈추므로 한 개씩 돌리는 것이 안전하다. 올리기는 upload_assets(SVG 는 글자 레이어와 벡터로 들어온다), 정리는 use_figma: 글자 이름 t-굵기-번호 로 굵기를 바로잡고, fx-… 이름의 도형에 그림자 효과, 색은 YBM DS Light 값이 같은 bg/fg/stroke 변수에 연결. 템플릿을 고치면 그 화면만 다시 캡처해 바꾼다.

## 진행 기록
- 2026-10-26 (회사): ybm-ds `main`을 GitHub(`d4f83b6`)에 맞췄다. 회사 PC에만 있던 커밋 전 작업(10-23 폴더 구조 정리, figma-sync `cssOnly` 수정, `components/index.html` 컴포넌트 메인 시안, 작업 메모)은 **회사 PC 로컬 브랜치 `backup/2026-10-26-local`** 에만 있다(GitHub에 없음). 필요하면 회사 PC에서 꺼낸다.

## 작업 방식
- 집(Mac)과 회사(윈도우)를 오가며 작업한다. 시작할 때 ybm-ds 에서 `git pull`, 끝낼 때 commit + push (`node sync.mjs deploy`).
- 사용자에게는 한국어로, 쉬운 말로 설명한다.
