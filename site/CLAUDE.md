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
- ~~용어는 되도록 영어~~ (2026-10-30 저녁 집) → 2026-11-02 회사에서 아래 "한글 쓰기 규칙" 으로 바뀜(사용자 "가급적 한글로"). 오른쪽 목차 위 "목차" 제목은 없앰(그대로).
- **한글 쓰기 규칙** (2026-11-02 회사, 사용자 "레퍼런스 B 전체를 검수해서 한글을 그대로 우리 쪽에, 가급적 한글로". 레퍼런스 B 의 글쓰기, 말투 문서와 시작하기, 컴포넌트 문서 표본에서 뽑음):
  1. 이름은 영어 그대로: 상단 메뉴, 왼쪽 메뉴, 페이지 제목(Get Started, Usage, Color, 컴포넌트 이름), 토큰, 클래스, 속성 이름, Figma. 영어 뒤 조사는 바로 붙인다(Button은, `data-size`를).
  2. 나머지는 한국어: 섹션 제목(h2, h3)과 목차, 버튼, 탭, 표 머리, 찾기 칸 안내, 분류 칩. 시작하기 문서 제목은 "개요", "설치하기", "컴포넌트", "다크 모드" 처럼 짧게(군더더기 "첫", "켜기" 같은 말은 빼기, 11-02 사용자). Do / Don't 표시만 영어로 둔다(레퍼런스 B 도 그렇다).
  3. 문서 글(리드, 본문, 표 안 설명, 사용 지침, 템플릿 설명)은 합니다체. "~있어요, ~해요" 를 섞지 않는다. 안내는 "~하세요".
  4. 화면 글(예시, 대표 그림, 템플릿 안, 빈 결과 안내)은 해요체. 쉬운 말, 아라비아 숫자, 높임은 최소("~하실" 대신 "~할"), "불가능합니다" 대신 "할 수 없어요", 오류는 고치는 방법까지, 주의와 경고만 "~니다".
  5. 제목, 버튼, 메뉴, 라벨, 표 머리에는 마침표를 찍지 않고 문장에는 찍는다. 느낌표, 줄임말, 어려운 한자어는 쓰지 않는다.
  6. 설명(리드)은 하는 일로 쓴다(2026-11-02 사용자 "디스크립션도 seed 처럼"): 컴포넌트는 "누르면 ~하게 하는 컴포넌트입니다.", Foundations 는 "색은 ~를 보여 주도록 돕습니다." 처럼 주제어로 시작, 안내 페이지는 "~를 알아봅니다." 생김새나 토큰 목록 나열("~토큰입니다", "작은 그림입니다")로 쓰지 않는다. 컴포넌트 설명 원본은 figma-notes.json lead(71개 모두, Figma 문서 프레임 설명은 최종 검토 때 맞춘다).
  - 템플릿 분류 칩은 보이는 이름만 한국어(build.mjs `TPL_GROUP_KO`), 거르는 값은 templates.json 의 영어 group 그대로.
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

- **코드 상자와 표는 구분되게** (2026-11-02 회사, 사용자 "코드와 테이블을 구분지으라", 레퍼런스 A 실측): 코드는 회색 바탕 + 진한 회색 머리 줄 44(언어 이름 12 + 복사 28 원형) + 모서리 12, 표는 흰 바탕 + 모서리 16 + 머리 14 600 muted + 줄 사이 선.

- **컴포넌트 대표 그림** (2026-11-02 회사, 사용자 "대표 컴포넌트, 직관적으로, 한글 예시로"): 상단 큰 그림과 목록 카드는 `site/src/covers.html` 에 컴포넌트마다 손으로 쓴 장면 하나를 쓴다. 변형 이름(brandSolid, neutral 같은 것)이나 견본 나열은 쓰지 않고, 한국어로 실제 쓰는 모습(주문, 배송, 알림, 일정 같은 일반 상황)으로. 떠 있는 창도 제자리에 그린다(site.css). 새 컴포넌트를 넣으면 여기에도 한 장면을 더한다.
- **가이드는 브랜드 색 없이 모노톤** (2026-11-02 회사, 사용자 "가이드에 브랜드 컬러 적용 X, 브랜드는 커스텀 가능하다고 추가"): site/src/brand-mono.css 가 body 에서 브랜드 역할 색(bg/fg/stroke brand, chart series-1, palette brand)을 neutral 로 바꾼다. 사이트는 site.css 끝에 붙고, 템플릿 미리보기 iframe 은 site.js 가 넣는다. DS 와 템플릿 원본 파일은 그대로 파랑이다. Color 페이지 "브랜드 색" 절에 서비스가 palette/brand 로 바꾸는 법. 안내색(informative)과 포커스 링은 브랜드가 아니라 그대로.
- **부품은 생김새가 아니라 하는 일로 고른다** (2026-11-02 회사, 사용자 "명심해줘"): 값 고르기는 Select, 동작은 Menu, 짧은 설명은 Tooltip, 작업 창은 Popover, 화면을 막으면 Dialog 처럼 components.css 머리 주석의 "고르는 법" 을 먼저 본다.
- **브라우저 기본 UI 는 가급적 DS 로** (2026-11-02 회사, 사용자): 찾기 칸 지우기는 DS `.ds-input__clear`(브라우저 X 는 DS CSS 가 숨김), 좁은 화면 목차는 기본 select 대신 DS Select Trigger + Select Content(site.js 가 여닫고 읽는 위치를 따라 값이 바뀜). 새로 넣는 입력, 고르기, 스크롤 표시도 DS 부품부터 찾는다.
- **컴포넌트 찾기는 한글로도** (2026-11-02 회사): `site/src/search-ko.json` 에 컴포넌트마다 한글 낱말(버튼, 체크박스, 모달 등). "버튼" 으로 찾으면 Action Button 같은 영어 이름이 나온다. 목록 카드와 왼쪽 메뉴가 같은 결과(설명 글은 찾기에 넣지 않음). 새 컴포넌트를 넣으면 여기에도 한 줄, 빠지면 빌드가 알려 준다.
- **템플릿 이름은 한국어** (2026-11-02 회사): 왼쪽 메뉴, 제목, 목록 카드는 templates.json 의 `name`(국내 서비스에서 쓰는 말로), `en` 은 찾기용으로만.

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
- **템플릿 51종 = 레퍼런스 A 템플릿과 같은 구성** (2026-11-01 밤, 사용자 요청 "아스트릭스와 똑같은 템플릿으로 우리 DS 를 입혀서 다시"): 분류 10개(Dashboard 7, Table 7, Form 8, Settings 3, Login 3, Tools 5, Content 7, AI Chat 2, Gallery 6, Shell 3)와 각 화면의 구조·배치를 레퍼런스 A 그대로 따르고, 부품·색·글자는 YBM DS, 글은 우리 한국어 내용으로 새로 썼다(원본 글과 사진은 가져오지 않음, 사진은 연한 색 자리). 예전 47종(시험·학습·커머스 등)은 지웠고 사용자가 나중에 다시 만든다. 이름(slug)은 레퍼런스 A 와 같다.
- **템플릿은 모두 생성기로 만든다**: `site/templates/gen/kit.mjs`(공용 CSS와 부품 함수, 차트 SVG), 분류별 파일 dashboard/table/form/settings/login/tools/content/aichat/gallery/shell.mjs. pages/ 의 HTML 을 직접 고치지 말고 생성기를 고친 뒤 `node site/templates/gen/run.mjs` → `node site/build.mjs`. run.mjs 가 site/src/templates.json 도 다시 쓰고 목록에 없는 pages/ 파일을 지운다. build.mjs 는 목록에서 빠진 상세 페이지(site/templates/*.html)를 지운다. 공통 틀: 머리글(tp-head, 안쪽 24, 제목 tp-h1), 본문(tp-content, 안쪽 24, 묶음 사이 32), 오른쪽 패널(tp-body--panel > tp-panel, 400), 카드는 ds-card data-size="small"(안쪽 16, 간격 12).
- **아이콘 93개 추가** (2026-11-01): 템플릿에 필요한 Lucide 아이콘을 icons.css 맨 끝 한 묶음으로 넣고, 아이콘 페이지 표에 App, Editor, More 묶음을 더했다.
- **(옛 기록) 템플릿 47종** (2026-11-01): 시험(Exam, Exam B2B)과 학습(Learning, Learning B2B) 14종 추가. 글자 위계는 tp-h1 Bold, tp-h2 / tp-h3 SemiBold, 본문 Regular 로 통일한다.
- **템플릿 33종** (2026-10-31): PROPOSAL 7-2 의 1~6 을 추가해 분류 13개(Entry, Manage 추가). 서비스 운영 기본 화면(가입 → 마이페이지 → 내역 → 고객센터 → 공지)이 이어진다. 나머지 후보(7~16)와 분류 7개 재편은 PROPOSAL 7 절.
- **미리보기와 사이트 글자 규칙** (2026-10-31): 사이트 CSS 는 cascade layer 밖이라 DS 부품보다 세다. 본문용 h2, h3, p, li, code 규칙은 `:not(.pv-stage *, .site-tile__inner *, .site-example__preview *)` 로 미리보기 안을 빼야 한다. 빼지 않으면 부품 제목에 큰 여백이 생긴다.
- **Best Practices 표** (2026-10-31): Do 를 먼저, Don't 를 나중에. README 6.2 는 문장마다 한 줄, Figma 메모(figma-notes.json dos)는 항목마다 한 줄. 첫 문장이 "~않습니다, ~마세요" 로 끝나면 Don't. 같은 규칙이 겹치면(앞 7글자) 자세한 쪽만 남긴다. 문장은 합니다체, "금지, 권장" 같은 딱딱한 말은 풀어 쓴다.
- **Figma 와 이어지기** (2026-10-31): 사이트의 Figma 버튼은 Get Started(`2608:2`), Foundations, 컴포넌트, 템플릿(`templates.json` 의 `figma.pc`) 프레임으로 간다. Figma 문서 프레임 본문은 `node sync.mjs docs` 로 사이트와 같은 설명과 Best Practices 를 다시 채울 수 있다(같은 이름의 노드를 지우고 다시 만든다).
- **템플릿 목록은 100% 폭이 아니라 가운데 1552** (2026-11-02 회사, 사용자가 여러 번 지적): 레퍼런스 A 처럼 최대 1600 칸 안쪽 24 = 내용 1552 를 화면 가운데에(`.site-body--full .site-doc`). 2000 폭에서 x 216.5 로 레퍼런스와 같다.
- **템플릿 점검 2가지** (2026-11-02 회사, 사용자 "이런 실수 없는지 검토"): ① inset box-shadow 로 그린 선은 안쪽 자식의 배경이 덮으면 사라진다(위 메뉴 아래 선, 표 행 선). 바탕색은 td 가 아니라 tr 에, 안쪽 틀은 `background: none`. ② 한 줄의 버튼, 고르기 칸, 입력칸, 세그먼트는 높이가 같아야 한다. 고르기 칸과 입력칸은 small 이 없다(kit 이 medium 으로 받음), 고르기 칸이나 입력칸이 있는 줄은 kit `even()` 으로 버튼과 세그먼트를 40 으로. 새 템플릿도 두 가지를 1440 / 375 에서 확인한다.
- **대시보드는 4종** (2026-11-02 회사, 사용자 "대시보드 사례 축소"): 분석, 퍼널·코호트, 프로젝트 현황, 서비스 모니터링. 데이터, 주간 리포트, 자산 대시보드는 지움(Figma Templates 페이지의 그 화면은 아직 남아 있음).
- **커뮤니티 템플릿 4종** (2026-11-02 회사, 사용자 "UI 패턴 모음 커뮤니티 검토해서 추가"): 분류 Community(칩 '커뮤니티'), 생성기 `community.mjs`. 커뮤니티 홈(게시판 메뉴 + 지금 뜨는 글 + 새 글 피드 + 실시간 인기글), 게시판 목록(카페형, 말머리, 공지 고정, 댓글 수, 조회, 좋아요, 768 미만은 제목 + 한 줄 정보), 게시글 상세(투표, 좋아요/스크랩, 댓글과 답글, 이전/다음 글), 글쓰기(게시판/말머리, 도구 줄 + 본문, 사진 첨부, 댓글 허용/익명, 아래 등록 막대). 국내 게시판 화면의 공통 구조만 따랐고 서비스 이름과 글은 넣지 않았다. Figma 화면은 아직 없다.
- **요금제 템플릿 4종** (2026-11-02 회사, 사용자 "UI 패턴 모음 요금제, 구독 검토해서 추가"): 분류 Pricing(칩 '요금제'), 생성기 `pricing.mjs`. 요금제 비교(월/연 세그먼트로 가격 바뀜, 플랜 카드 4개와 추천 표시, 기능 비교 표, 자주 묻는 질문), 구독 결제(결제 주기 Select Box, 결제 수단, 할인 코드, 약관, 오른쪽 결제 요약), 내 구독(현재 요금제, 사용량, 결제 수단, 결제 내역, 해지 시작), 구독 해지(잃는 혜택, 해지 까닭, 할인 제안, 유의 사항, 유지/해지). 멤버십·요금제 화면의 공통 구조만 따랐다. Figma 화면은 아직 없다.
- **템플릿 목록 = 레퍼런스 A 템플릿 페이지 레이아웃과 크기** (2026-11-01): 왼쪽 메뉴 없는 전체 폭, 가운데 제목 42 + 설명 14, 그 아래 24 띄워 32px 알약 분류 칩(줄바꿈), 40 띄워 그리드. 그리드는 칸 사이 24, 768 미만 1열, 1280 미만 2열, 그 이상 3열(1440 폭에서 카드 443×278). 카드는 둥글기 16, 1px 선, 카드 전체가 1440×900 미리보기를 줄인 것(16:10). 마우스를 올리면 검은 78% 덮개 위에 영어 이름 17 SemiBold, 한글 설명 14 두 줄, 알약 버튼 Preview와 Open in Figma. 마우스 없는 기기는 덮개 대신 미리보기 아래에 이름과 설명. 카드 어디를 눌러도 상세로 간다.
- **템플릿 글자 위계와 여백 (2026-11-01, toss.im 참고)**: 굵기는 두 단계만 쓴다. 큰 제목(`tp-h1`) Bold, 묶음 제목(`tp-h2`)과 항목 제목(`tp-h3`) SemiBold, 나머지 Regular. 큰 제목은 모바일 24px(t09) 이상, PC 32px(t12)이고 제목과 큰 숫자에는 `letter-spacing: -0.02em`을 준다. 글자 색은 제목·본문 neutral, 보조 설명(`tp-sub`) muted, 날짜·캡션(`tp-caption`) subtle 세 단계. 여백은 제목→설명 12, 제목→내용 16, 카드 안 20(모바일)/24(PC), 묶음 사이 24(모바일)/32(PC), 화면 위 24(모바일)/40(PC). 새 템플릿도 이 값을 그대로 쓴다.
- **템플릿 = 배치는 레퍼런스 A, 한글 글자 위계는 토스** (2026-11-02 회사, 사용자 "레이아웃은 레퍼런스 A 템플릿을 쓰되 한글 위계 등은 토스"). 같은 날 잠깐 넣었던 회색 바탕 + 흰 카드(tp-canvas)는 걷어냈다.
  - 배치: 흰 바탕, 바깥 여백 16 / 24, 묶음 사이 24 / 32 와 구분선, 카드는 흰 바탕 + 옅은 1px 선(stroke-neutral-muted) + 모서리 12, 안쪽 16 / 20, 옆 패널 360 + 왼쪽 선.
  - 글자: tp-h1 24 / 28 Bold, tp-h2 18 / 20 Bold, tp-h3 16 SemiBold, 본문 14, 보조 muted, 캡션 subtle, 제목 자간 -0.02em.
  - 차트: 선 1.75, 한 계열 면은 위에서 아래로 옅어지는 색, 막대 둥근 끝. 모든 차트(kit 의 lineChart, barChart, donut, spark 와 직접 그린 퍼널, 일정, 가동 기록, 코호트, 비율 막대)는 마우스를 올리면 값 풍선이 뜬다. 값은 SVG 의 data-tp, 직접 그린 것은 data-tip="제목|값". page() 가 CHART_JS 를 붙인다.
  - 사진: Unsplash 사진 주소(images.unsplash.com)를 kit 의 PHOTOS 주제별 목록에서 고른다(nature, city, food, product, book, study, work, mix). 여러 색 바탕의 빈 사진 자리는 쓰지 않는다(사용자 "다양한 컬러 쓰지 말 것").
  - 고르기 칸(kit select) 기본 medium, 줄 안에서는 글자만큼만. 옆으로 미는 표는 최소 760. 머리글 도구에는 라벨 붙은 고르기(selField)를 쓰지 않는다.
  - 설명(desc) 62개는 11-02 자연스러운 한국어로 다시 씀: 합니다체, 하는 일 먼저, 번역투(글칸, 알약 버튼, 레일, 갈림 등) 없이.
- **템플릿 보기 창** (2026-11-02 회사, 사용자 "템플릿 100% 쓰지 말고 레퍼런스 크기로"): 목록에서 카드를 누르면 상세 페이지 대신 레퍼런스 A 처럼 큰 창(최대 1472, 바깥 16, 모서리 24, 이전/다음 화살표, 아래 Figma / 문서 보기 / 새 창으로 보기)에 템플릿을 띄운다. 주소에 ?preview=이름. 새 탭(Ctrl, Cmd)은 상세 페이지로. site.js 끝 "템플릿 보기 창", site.css 끝 .site-tplv.
- **시험 접수, 기업 러닝 템플릿 11종** (2026-11-02 회사, 사용자 요청): 분류 Exam(시험 신청, 내 시험, 성적표), Exam B2B(단체 접수, 응시자 관리, 단체 성적 대시보드), Learning B2B(학습 홈, 과정 찾기, 강의 보기, 과정 운영, 학습 현황 대시보드). 생성기 `exam.mjs`, `learning.mjs`, 둘이 함께 쓰는 위 메뉴 / 옆 메뉴 틀과 고르기 상자, 달력은 `frame.mjs`. 시험 이름은 특정 시험이 아닌 일반 이름(영어 말하기 시험 등), 기관은 가상 이름(한빛대학교, 한빛전자). 러닝은 AI 어드바이저(과정 추천), AI 튜터(요약, 퀴즈, 질문), 법정 필수 교육, 사내 지식 공유를 담는다. Figma 화면은 아직 없다.
- **템플릿을 Figma 로** (2026-10-31): `node site/figma-capture.mjs [slug]` 가 이 Mac 의 Chrome 을 화면 없이 띄워 템플릿을 PC 1440 / 모바일 375 로 열고 SVG 로 저장한다(tokens/.figma-capture, 커밋 안 함). 여러 개를 한 번에 돌리면 가끔 멈추므로 한 개씩 돌리는 것이 안전하다. 올리기는 upload_assets(SVG 는 글자 레이어와 벡터로 들어온다), 정리는 use_figma: 글자 이름 t-굵기-번호 로 굵기를 바로잡고, fx-… 이름의 도형에 그림자 효과, 색은 YBM DS Light 값이 같은 bg/fg/stroke 변수에 연결. 템플릿을 고치면 그 화면만 다시 캡처해 바꾼다(올린 새 프레임의 자식을 기존 프레임으로 옮기면 id 와 사이트 링크가 그대로다). 그래프처럼 안에 그린 SVG 는 캡처 때 색을 실제 값으로 바꿔 적는다.

## 진행 기록
- 2026-10-26 (회사): ybm-ds `main`을 GitHub(`d4f83b6`)에 맞췄다. 회사 PC에만 있던 커밋 전 작업(10-23 폴더 구조 정리, figma-sync `cssOnly` 수정, `components/index.html` 컴포넌트 메인 시안, 작업 메모)은 **회사 PC 로컬 브랜치 `backup/2026-10-26-local`** 에만 있다(GitHub에 없음). 필요하면 회사 PC에서 꺼낸다.

## 작업 방식
- 집(Mac)과 회사(윈도우)를 오가며 작업한다. 시작할 때 ybm-ds 에서 `git pull`, 끝낼 때 commit + push (`node sync.mjs deploy`).
- 사용자에게는 한국어로, 쉬운 말로 설명한다.
