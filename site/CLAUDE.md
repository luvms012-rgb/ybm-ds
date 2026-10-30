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
- **IA 는 Get Started, Components, Templates 세 가지** (2026-10-30). 사이트 메인은 따로 없고 Get Started 가 첫 화면이다. 토큰과 아이콘은 Get Started 안 "파운데이션" 묶음.
- **배치는 레퍼런스 A 의 시작 화면과 똑같이** (2026-10-30, 사용자가 두 번 강조, 실측값으로 맞춤): 상단 48(로고 / 가운데 메뉴 / 오른쪽 32 아이콘 버튼과 시작하기 버튼), 본문 752 칸은 화면 전체의 가운데(왼쪽 = max(284, 화면 폭 절반 - 377.5)), 1280 이상에서 오른쪽 56 옆에 목차 232(2px 세로선 위에 지금 위치 막대가 움직임, 항목 28), 좁으면 제목 아래 목차 고르기. 1440/1920/2560 에서 본문 x 335/575/895, 목차 x 1143/1383/1703 으로 레퍼런스와 같다. 본문 리듬은 블록 사이 16, 제목 위 40, 머리말 아래 첫 제목 56, 라벨과 코드 칸 사이 4. 컴포넌트 문서 깊이는 레퍼런스 B.
- **왼쪽 메뉴도 레퍼런스 A** (2026-10-30, 한때 레퍼런스 B 로 바꿨다가 사용자 지시로 되돌림): 폭 260 화면 왼쪽 고정, 항목 32 / 모서리 12 / 14 진한 글자, 묶음은 접고 펴는 제목(오른쪽 꺾쇠) 아래 32 들여쓴 항목, 묶음 사이 8, 지금 페이지는 옅은 회색 채움 + 500. Components 메뉴 맨 위에 찾기 칸(메뉴와 목록 카드를 함께 거름).
- **페이지 배치 4 가지** (`page({ layout })`, 레퍼런스 A 실측): doc 문서 752 + 목차 / component 컴포넌트 상세는 메뉴 오른쪽 영역 가운데 912, 목차 없음 / wide 컴포넌트 목록은 메뉴 옆 전체 폭, 가운데 머리(제목, 설명, 버튼 두 개) + 구분선 + 분류마다 3열 회색 미리보기 상자(228, 모서리 16) 아래 이름 / full 템플릿 목록은 PC 에서 왼쪽 메뉴 없이 가운데 머리 + 가운데 필터 + 3열(간격 24).
- **박스는 레퍼런스 A 의 배경과 테두리만** (내용은 우리 것 그대로): 일반 박스(표, 예시, 카드, 사용 지침)는 흰 배경 + 1px `stroke-neutral-muted` + 모서리 16, 코드 박스는 `bg-neutral` + 같은 테두리 + 모서리 12, 머리 줄은 `bg-neutral-weak-alpha` 를 한 겹 더 깔아 진하게(선 없음). 표는 머리 줄 배경 없이 줄 사이 선만.
- **파운데이션은 항목마다 한 페이지** (레퍼런스 A): 색, 글자, 간격, 모서리, 그림자(+ 쌓는 순서), 움직임, 아이콘. 색 표는 토큰 / 값(라이트, 다크 견본 + 값). 값은 build.mjs 가 tokens.css 에서 읽는다(다크 블록은 따로).
- Quick Start with AI 컨셉. 설치 1순위는 CSS 두 줄, 2순위(개발자)는 버전 고정 CDN, 파일 내려받기, Tailwind 설정. npm 은 제안(PROPOSAL.md).
- 사이트와 템플릿은 **ybm-ds 에 정의된 것만** 쓴다. 없는 것은 PROPOSAL.md 로 제안한다.
- 한글, Pretendard. **한글 위계는 레퍼런스 B 시작 화면 그대로** (2026-10-30 사용자 지시, 실측): 페이지 제목 40/48 500, 리드 16/24 300(Pretendard Light, DS 폰트 폴더 파일을 사이트 CSS 에서 선언), 섹션 제목 24/32 500, 소제목 16/22 500, 본문 16/28 400, 보조 14/19. 자간은 사이트 전체 0(2026-10-30 사용자 지시). 템플릿 9종의 tp-h1~tp-body 도 같은 기준. word-break keep-all.
- 템플릿은 모두 반응형(모바일 먼저, 768 / 1280). 앞으로 계속 추가한다(`site/src/templates.json` 한 줄 + `site/templates/pages/<slug>.html`).
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

## 진행 기록
- 2026-10-26 (회사): ybm-ds `main`을 GitHub(`d4f83b6`)에 맞췄다. 회사 PC에만 있던 커밋 전 작업(10-23 폴더 구조 정리, figma-sync `cssOnly` 수정, `components/index.html` 컴포넌트 메인 시안, 작업 메모)은 **회사 PC 로컬 브랜치 `backup/2026-10-26-local`** 에만 있다(GitHub에 없음). 필요하면 회사 PC에서 꺼낸다.

## 작업 방식
- 집(Mac)과 회사(윈도우)를 오가며 작업한다. 시작할 때 ybm-ds 에서 `git pull`, 끝낼 때 commit + push (`node sync.mjs deploy`).
- 사용자에게는 한국어로, 쉬운 말로 설명한다.
