# YBM Design System

YBM 서비스 공용 디자인 시스템. Figma 변수/컴포넌트가 정본이고, 이 폴더(`ybm-ds/`)는 그걸 코드로 옮긴 배포 패키지와 동기화 도구다.
이 폴더 하나가 GitHub 저장소 하나다(가이드 사이트와 분리된 단독 저장소).

- 최종 갱신: 2026-10-27
- Figma 파일: `1VCEsFU3xMWuXIntIrZz9i` - <https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/>
- GitHub 저장소: <https://github.com/luvms012-rgb/ybm-ds>
- 배포 주소(Pages): <https://luvms012-rgb.github.io/ybm-ds/> - 첫 화면이 컴포넌트 미리보기
- 로컬 폴더: 회사 `C:\Users\luvms\Desktop\works\ybm-ds`, 집 Mac `~/Works/ybm-ds` (저장소 이름과 같다)

---

## 1. 폴더 구조

```
ybm-ds/                      ← 저장소 루트 = Pages 사이트 루트
├─ README.md                 ← 이 문서 (DS 전체 안내)
├─ index.html                컴포넌트 미리보기 (48종, Light/Dark, ?only=43-48 로 골라 보기)
├─ components.json           컴포넌트 목록 - CSS 클래스, Figma 노드 ID, 변형 수 (sync 가 양쪽과 대조)
├─ sync.mjs                  ◆ 통합 동기화 (Figma ↔ 로컬 ↔ GitHub ↔ 가이드 사이트)
├─ 동기화.bat                 더블클릭 = node sync.mjs deploy (검증 → 커밋 → GitHub 반영)
├─ deploy.config.json        저장소, Pages 주소, 브랜치
├─ dist/                     ← 배포 패키지(2026-10-27 ybm-ds/ → dist/). 서비스는 이 폴더를 가리킨다
│  ├─ ybm-ds.css             진입 파일 (이것 하나만 link) - 아래 5개를 cascade layer 로 import
│  ├─ tokens.css             토큰 (⚠ 생성물 - 손으로 고치지 않음)
│  ├─ base.css               리셋, Pretendard @font-face, 포커스 링, reduced-motion, .ds-sr-only
│  ├─ icons.css              Lucide 아이콘 (data URI + mask) .ds-icon
│  ├─ components.css         컴포넌트 48종 .ds-*
│  ├─ utilities.css          .ds-t01~t17, .ds-fw-*, .ds-fg-*, .u-*
│  ├─ ybm-ds.js              공통 인터랙션 (의존성 없음)
│  └─ fonts/                 Pretendard woff2 (Thin~Black 9종, CSS 는 400/500/600/700 사용)
├─ tokens/                   ← 토큰 소스와 파생물
│  ├─ figma-variables.json   Figma 변수 전집 스냅샷 = source of truth
│  ├─ build.mjs              스냅샷 → tokens.css + 파생 3종 생성 (Node - Python 불필요)
│  ├─ figma-sync.mjs         Figma ↔ 스냅샷 비교/병합 (sync.mjs 가 호출)
│  ├─ design-tokens.json     (생성물) 중첩 JSON
│  ├─ tokens.js              (생성물) JS 객체
│  └─ tailwind.preset.js     (생성물) Tailwind preset - 값은 전부 CSS 변수 참조
└─ .claude/skills/ds-sync/   Claude 용 동기화 절차 ("ds 동기화" 라고 요청하면 이 순서대로 실행)
```

git 에 올리지 않는 것(`.gitignore`): `tokens/.figma-check.js`, `tokens/.figma-result.json`, `tokens/figma-variables.backup-*.json`

### 손으로 관리하는 파일 vs 생성물

| 구분 | 파일 |
|---|---|
| 직접 편집 | `base.css` `icons.css` `components.css` `utilities.css` `ybm-ds.css` `ybm-ds.js` `index.html` `components.json` `sync.mjs` `tokens/build.mjs` `tokens/figma-sync.mjs` |
| 생성물 (편집 금지) | `dist/tokens.css` `tokens/design-tokens.json` `tokens/tokens.js` `tokens/tailwind.preset.js` `tokens/.figma-check.js` |
| 스냅샷 (sync 로만 갱신) | `tokens/figma-variables.json` |

---

## 2. 사용법

```html
<!-- 배포 주소에서 바로 (가이드 사이트/외부 시안) -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>

<!-- 로컬 작업(works 폴더 안) - 상대경로. 가이드 배포 때 위 주소로 자동 치환된다 -->
<link rel="stylesheet" href="../../../../ybm-ds/dist/ybm-ds.css">
<link rel="stylesheet" href="…/{서비스}.css">       <!-- 서비스 전용은 DS 다음에 -->

<html data-theme="dark">  <!-- 다크 모드(선택). 모드는 Light/Dark 두 가지뿐 -->
```

### Cascade Layers
DS 전체가 `@layer ybm.tokens, ybm.base, ybm.icons, ybm.components, ybm.utilities` 안에 들어 있다.
레이어 밖에 쓴 서비스 CSS 는 선택자 우선순위와 상관없이 항상 DS 를 이긴다 → `!important`/선택자 길이 경쟁 불필요.

### 커스텀 규칙
- 서비스는 **컴포넌트 변수(`--ds-*`)만 바꿔서** 커스텀한다. 클래스 신설/`!important` 금지.
  예) `.signup-dialog { --ds-dialog-width: 360px; }`
- 토큰 레이어 중 **팔레트는 YBM 전체 공유**, 서비스는 시맨틱/컴포넌트 층만 덮어쓴다.

### ybm-ds.js 가 하는 일 (CSS 로 안 되는 것만)
| 기능 | 사용 |
|---|---|
| Dialog 열기/닫기 | `data-ds-open="dialogId"` / `data-ds-close` 속성, 바깥(dim) 클릭 닫기. 네이티브 `<dialog>.showModal()` |
| Snackbar | `YBM.snackbar("문구", { variant: "positive"\|"critical", action: "확인", onAction, duration })` - 기본 4초 |
| Slider | `<input type="range" class="ds-slider">` 채움 길이(`--ds-slider-value`) 동기화 |
| Checkbox | `data-indeterminate` → `input.indeterminate = true` |
| Text Field clear | 값 지우기 (노출/숨김은 CSS) |

---

## 3. 동기화 - Figma ↔ 로컬 ↔ GitHub ↔ 가이드 사이트

```
 Figma 변수/컴포넌트
   │  ① node sync.mjs figma → tokens/.figma-check.js
   │     Claude 가 use_figma 로 실행(읽기 전용) → 결과를 tokens/.figma-result.json 에 저장
   ▼
 ② node sync.mjs pull
   ├─ 변수 변경 → figma-variables.json 병합(백업) → build.mjs 로 생성물 4종 재작성
   ├─ 컴포넌트 대조 → components.json 과 다른 노드/변형 수/목록에 없는 세트 보고
   ├─ 검증(아래) → 실패하면 멈춤
   ├─ git commit → push → GitHub Pages(1~2분 뒤 반영)
   └─ 가이드 사이트 재배포(project/_publish/publish.ps1) - 가이드는 DS 를 Pages 주소로 참조
```

| 하고 싶은 일 | 명령 |
|---|---|
| 전부(Figma → 로컬 → GitHub → 가이드) | Claude 에게 **"ds 동기화"** - ①② 를 이어서 실행한다 |
| 로컬에서 고친 CSS 를 올리기 | `동기화.bat` 더블클릭 또는 `node sync.mjs deploy "메시지"` |
| 상태만 보기 | `node sync.mjs` (검증, 커밋 안 된 변경, 스냅샷 날짜, 사이트 응답) |
| 토큰만 다시 빌드 | `node sync.mjs build` (또는 `node tokens/build.mjs <날짜> <폴더>` 로 다른 곳에 빌드해 diff) |
| 옵션 | `--no-push` 커밋까지만, `--ds-only` 가이드 재배포 생략 |

**검증 항목** (`node sync.mjs verify`, deploy/pull 이 매번 실행)
1. 생성물 4종 = 스냅샷으로 다시 빌드한 결과 (tokens.css 를 손으로 고쳤거나 빌드를 빠뜨리면 실패)
2. `ybm-ds.css` 가 import 하는 파일, `base.css` 의 폰트 파일이 실제로 있는지
3. `components.json` 의 클래스가 `components.css` 에 모두 있는지 (+ 목록에 없는 루트 클래스 경고)

**변수 비교 기준**: 이름, 타입, 모드별 값(색 hex, 숫자, 별칭 이름), description. 스냅샷이 불완전하면(개수 불일치/모드 누락/별칭 미해결) 빌드가 즉시 실패한다.
**컴포넌트 비교 기준**: `components.json` 의 노드 ID 존재, 타입, 변형 수, Components 페이지에서 목록에 없는 COMPONENT_SET.

> 처음 한 번: GitHub 에서 저장소 `ybm-ds`(Public, README 없이) 생성 → Settings → Pages → Branch `main` / root.
> push 인증은 PC 의 Git Credential Manager(가이드 배포와 같은 GitHub 로그인)를 그대로 쓴다.

---

## 4. Figma 파일 구조

2026-10-27 페이지 구성을 레퍼런스 라이브러리 형식으로 바꿨다. 컴포넌트는 카테고리 페이지에 나뉘고, 컴포넌트마다 문서 프레임 1개(문서 헤더 + 본문)에 담긴다. 본문은 위쪽 "Examples"(속성별 예시 블록 - 마스터 컴포넌트의 인스턴스로만 구성, 문서당 최대 6개) + 아래쪽 "마스터 컴포넌트" 순서다. 컴포넌트 노드 ID 는 그대로다.

| 페이지 | ID | 내용 |
|---|---|---|
| About | `2479:3` | 표지(YBMNET 로고 - 색은 logo/* 변수), 이 파일에 대하여, 링크 |
| Foundations | `2274:1143` | 문서 프레임 Color `2486:2`, Typography `2486:13`, Spacing `2486:24`, Radius `2486:35`, Elevation `2486:46` (본문 내용 프레임은 예전 그대로) |
| Icons | `271:2027` | 문서 프레임 `Icon` `2517:2` - 머리말, 예시(크기/색/선형/채움/상태), 안내, 전체 아이콘(라이브러리 프레임 `2416:2`) |
| ----- | | 구분선 |
| Templates | `2479:5` | 비어 있음 (화면 템플릿 준비 중) |
| --- | | 구분선 |
| Action | `2479:7` | Action Button, Chip, Floating Action Button, Menu, Segmented Control, Toggle Button, **Text Link** `2493:324` |
| Chat | `2479:8` | 문서 1개에 **Chat Message Bubble** `2499:6`, **Chat Message Metadata** `2499:18`, **Chat System Message** `2499:25`, **Chat Send Button** `2499:35`, **Chat Composer** `2499:54` |
| Container | `2479:9` | Accordion, Card, **Select Box** `2495:260` |
| Content | `2479:10` | Avatar, Empty, Tag Group |
| Data Input | `2479:11` | Checkbox, Date Picker, Field Button, Quantity Picker, Radio Group, Select, Slider, Switch, Text Field, **Time Picker** `2497:979`, **Search Suggestion** `2558:1321`, **File Attach** (Dropzone `2558:1328`, Trigger `2558:1347`, Item `2558:1384`) |
| Feedback & Status | `2479:12` | Badge, Banner, Callout, Progress, Skeleton |
| Layout | `2479:13` | Divider |
| Navigation | `2479:14` | Bottom Navigation, Breadcrumbs, Chip Tabs, Pagination, Side Navigation, Stepper, Tabs, **Table Pagination** `2498:1299`, **Top App Bar** `2557:1638`, **Top Navigation** `2557:1648` |
| Overlay | `2479:15` | Bottom Sheet, Dialog, Help Bubble, Snackbar, Tooltip, **Popover** `2494:473` |
| Table & List | `2479:16` | List, Table |
| --- | | 구분선 |

**굵게** 표시한 10종은 2026-10-27 Figma 에 새로 만든 것이다. 2026-10-28 CSS 를 만들고 `components.json` 과 §6.1 표에 등록했다(49~53번, Text Link 는 02번에 Figma ID 추가).

Top App Bar, Top Navigation, Search Suggestion, File Attach 는 2026-10-29 Figma 와 CSS 를 함께 만들었다(54~57번). 모양과 여백은 레퍼런스 가이드의 같은 부품 규격을 따른다.

새 컴포넌트는 맞는 카테고리 페이지에 문서 프레임을 하나 더 만들어 넣는다. `sync.mjs` 의 미등록 점검은 About/Foundations/Icons/Templates/구분선을 뺀 모든 페이지를 본다.

### 변수 컬렉션
| 컬렉션 | 모드 | 변수 수 |
|---|---|---|
| **YBM DS** (`VariableCollectionId:3:2`) | Light / Dark | 247 |
| Typography | 100% (하나) | 73 |
| Shape | Default (하나) | 9 |
| Elevation | Default (하나) | 30 |

- 2026-10-27 Typography 130%/150%, Shape Soft/Sharp 모드를 지웠다. 모드는 색의 Light / Dark 만 남는다(레퍼런스 라이브러리 기본 구성과 같음). 지우기 전 값은 Figma 버전 기록과 git 이력의 `tokens/figma-variables.json` 에 있다.

- Figma 변수 이름에는 `color/` 접두사가 없다 (`bg/canvas`, `fg/neutral` …).
- 모든 변수의 Web code syntax = `var(--ybm-…)` → Dev Mode 복사본이 그대로 CSS 에서 동작.

### 로컬 스타일
- 텍스트 스타일 **136개**: `Scale|Static / t01~t17 / {1 Regular, 2 Medium, 3 SemiBold, 4 Bold}` (예 `Scale/t06/4 Bold`). Typography 변수에 바인딩돼 있어 변수만 바꾸면 전부 반영.
- ⛔ 이펙트/컬러/그리드 로컬 스타일은 **만들지 않는다**. 그림자/색은 변수를 노드에 직접 바인딩.

---

## 5. 토큰

### 5.1 구조 - 3계층
```
PALETTE  --ybm-color-palette-*            원시값. 컴포넌트/서비스에서 직접 쓰지 않음
SEMANTIC --ybm-color-{bg|fg|stroke|chart}-*  역할. 컴포넌트는 이 층만 참조
COMPONENT --ds-{컴포넌트}-*                 components.css 의 각 컴포넌트가 노출
```
- 시맨틱 이름은 반드시 **역할**(neutral/brand/critical/informative/positive/warning/magic)이다. 색 이름(orange 등)을 시맨틱으로 쓰지 않는다.
- 예외: Progress Circle 은 팔레트를 직접 참조한다.

### 5.2 네이밍 규약 (`--ybm-` 접두사, zero-pad)
`--ybm-color-*`, `--ybm-space-x*`, `--ybm-radius-r*`, `--ybm-shape-*`, `--ybm-font-size-t0N`, `--ybm-line-height-t0N`, `--ybm-font-weight-*`, `--ybm-font-family-base`, `--ybm-elevation-*`, `--ybm-duration-*`, `--ybm-easing-*`, `--ybm-z-*`

### 5.3 팔레트 (104)
gray `00/100~1000`, brand, blue, red, green, yellow, orange, purple `100~1000`, `static-white`/`static-black` + 각 alpha `50~1000`.
다크 모드는 **팔레트 flip**(명도 반전, gray-00=검정). `static-*` 만 모드 무관. (brand-1000 은 2026-10-27 추가)

#### 브랜드 색 바꾸기 - `palette/brand-100~1000` 한 곳만 고친다
- 브랜드 역할 색(`bg/brand-*`, `fg/brand*`, `stroke/brand-*`, `chart/series-1`)과 컴포넌트는 모두 `palette/brand-*` 를 거친다. Figma/CSS 어디에도 브랜드 색 값을 직접 넣은 곳이 없다(2026-10-27 점검).
- 바꾸는 순서: Figma 변수 `palette/brand-100~1000` 의 Light 값을 새 브랜드 단계로 바꾸고, Dark 값은 같은 단계를 뒤집어 넣는다(Dark 100 = Light 1000 … Dark 1000 = Light 100) → `node sync.mjs figma` → 점검 결과 반영(`pull`) → 버튼/칩/탭/차트 등 전부 따라 바뀐다.
- 기준 단계: `brand-600` = 주 버튼/링크(`bg/brand-solid`, `fg/brand`), `brand-700` = 눌림/진한 글자, `brand-100~200` = 옅은 배경, `brand-300` = 옅은 선.
- 바뀌지 않는 것(의도): 포커스 링 `stroke/focus-ring` 과 안내색 `informative-*` 은 blue 팔레트를 쓴다 - 브랜드가 바뀌어도 접근성 표시는 그대로 둔다. 로고 색 `logo/*` 도 고정.

로고 고정색(모드 무관): `logo-ybm-blue #0055a7`, `logo-ybm-red #e83743`, `logo-ybm-gray #7d7d7d`

### 5.4 시맨틱 색

**bg (41)** - `canvas` `layer-default` `layer-floating` `overlay` `disabled` `transparent(-pressed)` /
`neutral` `neutral-weak-pressed` `neutral-weak-alpha(-pressed)` `neutral-muted` `neutral-subtle` `neutral-solid(-pressed)` `neutral-inverted(-pressed)` /
`{brand|critical|informative|positive|warning|magic}-{solid|weak}(-pressed)`

**fg (25)** - `neutral` `neutral-muted` `neutral-subtle` `neutral-inverted` `placeholder` `disabled` /
`{brand|critical|informative|positive|warning|magic}` + `-contrast` /
`on-{brand|critical|informative|positive|warning|magic|neutral}-solid` (solid 배경 위 글자)

**stroke (19)** - `neutral`(기본 테두리) `neutral-weak` `neutral-muted` `neutral-subtle` `neutral-solid` `neutral-contrast` `focus-ring` /
`{brand|critical|informative|positive|warning|magic}-{solid|weak}`

**chart (5)** - `series-1~5` = brand / orange / green / purple / yellow (Light 600~700, Dark 600)

다크 전환: `<html data-theme="dark">` - 팔레트 flip + 대비 보정이 필요한 시맨틱만 재지정(예: `bg/critical-solid` L=red-700 → D=red-600).

### 5.5 Spacing - `x{N}` = N × 4px (27)
20px 이하 2px 반값 스텝, 20~64px 4px 단위, 그 위는 점프. (20px 위의 반값 스텝은 의도적으로 없음)

`x0 0` `x0_5 2` `x1 4` `x1_5 6` `x2 8` `x2_5 10` `x3 12` `x3_5 14` `x4 16` `x4_5 18` `x5 20` `x6 24` `x7 28` `x8 32` `x9 36` `x10 40` `x11 44` `x12 48` `x13 52` `x14 56` `x15 60` `x16 64` `x18 72` `x20 80` `x24 96` `x32 128`, `spacing/x-global-gutter`

Figma 의 `dimension/x*` 변수 scopes = `WIDTH_HEIGHT` + `GAP`.

### 5.6 Radius (원시) → Shape (시맨틱)
원시: `r0 0` `r0_5 2` `r1 4` `r1_5 6` `r2 8` `r2_5 10` `r3 12` `r3_5 14` `r4 16` `r5 20` `r6 24` `r8 32` `full 9999`

**컴포넌트는 `--ybm-shape-*` 만 쓴다** (원시 radius 직접 참조 금지).

| shape | 값 |
|---|---|
| 2xs | r1 4 |
| xs | r1_5 6 |
| sm | r2 8 |
| md | r2_5 10 |
| lg | r3 12 |
| xl | r4 16 |
| 2xl | r5 20 |
| 3xl | r6 24 |
| pill | full |

- 모양 테마(soft/sharp/square)는 2026-10-27 에 없앴다. 곡률 노브 `--ybm-shape-scale`(기본 1, 0 이면 완전 각짐)만 남는다 - 영역에 덮어쓰면 그 안만 바뀌도록 shape 계산은 `:root` 가 아니라 `*, ::before, ::after` 에서 한다. pill 은 항상 원형.

### 5.7 Typography
폰트: **Pretendard** (`"Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`)
웨이트: regular 400, medium 500, semibold 600, bold 700

| 단계 | size / line | 단계 | size / line | 단계 | size / line |
|---|---|---|---|---|---|
| t01 | 11 / 17 | t07 | 20 / 29 | t13 | 40 / 54 |
| t02 | 12 / 18 | t08 | 22 / 32 | t14 | 48 / 62 |
| t03 | 13 / 20 | t09 | 24 / 34 | t15 | 56 / 75 |
| t04 | 14 / 21 | t10 | 26 / 37 | t16 | 64 / 85 |
| t05 | 16 / 24 | t11 | 28 / 40 | t17 | 72 / 96 |
| t06 | 18 / 28 | t12 | 32 / 44 | | |

- Figma Typography 컬렉션은 모드 하나(100%). 130%/150% 확대 모드는 2026-10-27 에 지웠다.
- `*-static` 변수/`Static/*` 텍스트 스타일은 `Scale/*` 와 값이 같다. 글자 확대와 무관하게 고정해 두고 싶은 자리(내비게이션 라벨 등)를 표시하는 이름으로만 남아 있다.
- 컴포넌트 라벨은 fontSize 변수 직접 바인딩이 아니라 **텍스트 스타일 적용**.
- `body` 기본 = t05, `word-break: keep-all`.

### 5.8 Elevation (그림자)
2겹(key + ambient) 5단계. 기하값은 Figma `Elevation` 컬렉션, 색은 `YBM DS` 컬렉션의 `elevation/{n}-key|ambient`(다크 모드 자동 대응).

| 단계 | 값 | 역할 별칭 (컴포넌트는 이 이름을 씀) |
|---|---|---|
| 1 | `0 1 2 -1` + `0 1 3 0` | `--ybm-elevation-raised` - thumb, 선택된 세그먼트 |
| 2 | `0 2 4 -2` + `0 4 10 -1` | `--ybm-elevation-overlay` (+1px stroke/neutral-muted inset) - menu, select, snackbar, tooltip, date picker |
| 3 | `0 2 4 -2` + `0 10 8 0` | `--ybm-elevation-panel` - 떠 있는 패널 |
| 4 | `0 4 6 -4` + `0 10 18 -3` | `--ybm-elevation-floating` - FAB |
| 5 | `0 8 10 -6` + `0 20 32 -5` | `--ybm-elevation-modal` - dialog, alert dialog, bottom sheet |

### 5.9 CSS 전용 시스템 토큰
- Motion: `duration-fast 120ms`, `normal 200ms`, `slow 320ms`, `easing-standard cubic-bezier(.2,0,0,1)`, `easing-emphasized cubic-bezier(.3,0,0,1)`
- Z-index: `base 0`, `sticky 100`, `overlay 1000`, `dialog 1100`, `toast 1200`, `tooltip 1300`

---

## 6. 컴포넌트

### 6.1 카탈로그 (Figma ↔ CSS)
CSS 는 Figma 프로퍼티 이름을 그대로 `data-*` 속성으로 쓴다: `<button class="ds-btn" data-variant="brandSolid" data-size="large">`.
상태는 가능한 한 네이티브로 표현한다(`:disabled` `:checked` `:focus-within` `[aria-invalid]` `[aria-selected]` `[aria-pressed]` `[aria-current]` `[aria-expanded]`). Figma 의 pressed = `:active`(+ 마우스 환경 `:hover`).

| # | 컴포넌트 | CSS | Figma COMPONENT_SET (ID, 변형 수) | 주요 속성 / 컴포넌트 변수 |
|---|---|---|---|---|
| 01 | Action Button | `.ds-btn` | `24:354`, 168 | variant `brandSolid/brandOutline/neutralSolid/neutralWeak/neutralOutline/criticalSolid/ghost`, size `xsmall/small/medium/large`, layout `iconOnly`, width `fill` |
| 02 | Text Link | `.ds-link` | `2493:324`, 2 | `--ds-link-color(-hover)`, Figma state `enabled/hover` |
| 03 | Field Label | `.ds-field` (`__header/label/indicator/required/footer/help/error/count`) | `109:1367`, 2 | label-weight `bold` |
| 04 | Text Field Input | `.ds-input` (`__control/prefix/suffix/icon/clear`) | `108:1325`, 40 | variant `outline/underline`, size |
| 05 | Text Field Textarea | `.ds-textarea` | `114:1496`, 40 | variant, size |
| 06 | Field Button | `.ds-fieldbutton` (`__affix/__value`) | `1408:2667`, 16 | size `large/medium`, 상태 enabled/disabled/readOnly/invalid |
| 07 | Prefix Select | `.ds-prefixselect` | `2096:852`, 2 | 입력 앞 선택(통신사/국가번호) |
| 08 | Select Trigger | `.ds-select` | `119:1605`, 20 | size |
| 09 | Select Content, Item | `.ds-select-content` `.ds-select-item` | `125:1717`, 2 / `124:1769`, 12 | |
| 10 | Checkbox | `.ds-checkbox` | `61:995`, 40 / Mark `2525:995`, 6 | variant `square/ghost`, tone, size |
| 11 | Radio Group | `.ds-radio-group` `.ds-radio` | `1224:2164`, 16 | tone, size |
| 12 | Switch | `.ds-switch` | `93:1271`, 24 | size `16/24/32`, tone |
| 13 | Quantity Picker | `.ds-quantity` | `1184:2146`, 18 | size, layout `fill` |
| 15 | Chip | `.ds-chip` `.ds-chip-group` | `69:964`, 54 | variant `solid/outlineStrong/outlineWeak`, size, layout `iconOnly` |
| 16 | Chip Tabs | `.ds-chiptabs` (`__trigger`) | `1407:2596`, 4 / Trigger `1407:2522`, 16 | variant `neutralSolid/neutralOutline`, size `medium/large` |
| 17 | Tabs | `.ds-tabs` (`__trigger`) | `95:1313`, 4 / Tab Trigger `95:1272`, 12 | layout `fill/hug`, size |
| 18 | Segmented Control | `.ds-segmented` | `1239:2152`, 4 / Item `1239:2123`, 6 | layout, size |
| 19 | Toggle Button | `.ds-toggle` | `1244:2164`, 6 | size |
| 20 | Badge | `.ds-badge` | `17:87`, 36 | variant `weak/solid/outline`, tone `neutral/brand/informative/positive/warning/critical`, size |
| 21 | Tag Group | `.ds-tag-group` | `1240:2176`, 4 / Item `1240:2135`, 4 | 작성자, 날짜, 조회수 |
| 22 | Avatar | `.ds-avatar` (`__initials` `__status` `__badge`) `.ds-avatar-group` (`__overflow`) | `40:614`, 50 / Status `2357:1206`, 3 / Group `2359:1781`, 21 / Group Overflow `2359:1213`, 7 | size `20/24/36/42/48/56/64/80/96/108`, shape `circle/rounded/square`, status tone `positive/neutral/critical`, group size `20~64` × shape, `+N` |
| 23 | Callout | `.ds-callout` | `1241:2177`, 5 | tone `neutral/informative/positive/warning/critical` (magic 은 CSS 만) |
| 24 | Snackbar | `.ds-snackbar` | `92:1107`, 3 | variant `default/positive/critical` |
| 25 | Help Bubble | `.ds-helpbubble` | `75:1233`, 12 | `--ds-hb-arrow-offset` |
| 26 | Menu, Menu Item | `.ds-menu` `.ds-menu-item` | `1246:2183`(COMPONENT) / `1246:2182`, 6 | tone `critical` |
| 27 | Dialog | `.ds-dialog` | `1493:939`, 8 (+ Dialog Body Slot `1528:835`) | size(480/800), `--ds-dialog-width` |
| 28 | Alert Dialog | `.ds-alertdialog` | `30:540`, 5 | 272 폭, action `pair/critical/nonpreferred` |
| 29 | Bottom Sheet | `.ds-bottomsheet` | `59:674`, 8 | header-align `center` |
| 30 | Accordion | `.ds-accordion` (`<details>`) | `282:1996`, 12 | variant `separated`, size |
| 31 | Skeleton | `.ds-skeleton` | `1242:2158`, 3 | shape `rect/circle/text` |
| 32 | Slider | `.ds-slider` | `1243:2168`, 4 | tone |
| 33 | Progress | `.ds-progress` | `2163:982`, 4 | size, tone |
| 34 | Progress Circle | `.ds-progress-circle` | `1405:2502`, 18 | tone `neutral/brand/staticWhite`, size, type `determinate/indeterminate` |
| 35 | Floating Action Button | `.ds-fab` | `1406:2468`, 4 | layout `iconOnly`(extended=false) |
| 36 | Date Picker, Date Cell | `.ds-datepicker` `.ds-date-cell` | `1324:2310`, 2 / `1322:2183`, 7 | cell state `today/selected/range-start/range-middle/range-end` |
| 37 | Bottom Navigation | `.ds-bottomnav` | `1348:2383`, 3 / Item `1347:2416`, 12 | 뱃지 `__badge--dot/--count` (bg/critical-solid) |
| 38 | Side Navigation | `.ds-sidenav` | `1371:2610`, 4 / Item `1370:2392`, 8 | expanded 240 / collapsed 56 |
| 39 | Card | `.ds-card` | `2164:1063`, 4 | variant `elevated`, size |
| 40 | Empty | `.ds-empty` | `2164:1092`, 2 | size |
| 41 | Pagination | `.ds-pagination` | `2163:1067`, 2 / Item `2163:1028`, 16 | type `first/prev/next/last/ellipsis/simple` |
| 42 | Table | `.ds-table` `.ds-table-wrap` | `2164:1271`, 2 / Row `2164:1178`, 8 / Cell `2164:1105`, 6 | density `compact`, align |
| 43 | Divider | `.ds-divider` | `2347:1152`, 4 | type `thin/thick/vertical/label` (CSS data-weight / data-orientation / data-label), inset |
| 44 | Tooltip | `.ds-tooltip` `.ds-tooltip-anchor` | `2348:1145`(COMPONENT) | placement `top/bottom/left/right`(CSS 만), hover/focus 때만 표시 |
| 45 | List, List Item | `.ds-list` `.ds-list-item` | Item `2350:1207`, 4 | size `medium/small`, state, prefix/description/suffix/chevron/divider, list variant `inset` |
| 46 | Breadcrumbs | `.ds-breadcrumbs` | `2348:1149`(COMPONENT) | 현재 항목 `aria-current="page"` |
| 47 | Stepper | `.ds-stepper` (`__step/indicator/label`) | `2351:1211`(COMPONENT) / Step `2351:1210`, 6 | state `complete/current/upcoming`, orientation `vertical` |
| 48 | Banner | `.ds-banner` (`__inner/message/title/action/close`) | `2349:1217`, 10 | variant `weak/solid`, tone 5 |
| 49 | Select Box | `.ds-selectbox` `.ds-selectbox-group` | `2495:260`, 12 | type `check/radio`, state, layout `horizontal/vertical` |
| 50 | Time Picker | `.ds-timepicker` (`__column/option`) | `2497:979`, 2 | state `enabled/disabled`, 12시간제, 분 간격 5 |
| 51 | Table Pagination | `.ds-tablepagination` (`__size/label/select/range/position/current/total`) | `2498:1299`, 3 | state `default/unknownTotal/empty`, 최소 폭 640 |
| 52 | Popover | `.ds-popover` (`__header/texts/title/desc/close/body/footer`) `.ds-popover-anchor` | `2494:473`, 3 | actions `single/pair/none`, 폭 320 |
| 53 | Chat | `.ds-chat-bubble` `.ds-chat-meta` `.ds-chat-system` `.ds-chat-send` `.ds-chat-composer` | Message Bubble `2499:6`, 2 / Message Metadata `2499:18`, 4 / System Message `2499:25`, 2 / Send Button `2499:35`, 3 / Composer `2499:54`, 2 | sender `assistant/user`, status, 보내기 `send/stop/disabled` |
| 54 | Top App Bar | `.ds-appbar` (`__left/main/title/subtitle/right/button`) | `2557:1638`, 8 / Button `2557:1501`, 6 | theme `ios/android` (CSS `data-platform`), tone `layer/transparent` + gradient, 높이 56 |
| 55 | Top Navigation | `.ds-topnav` (`__left/heading/menu/item/end`) | `2557:1648` / Item `2557:1647`, 4 | 선택은 채운 배경 + SemiBold, 오른쪽 끝 버튼은 Action Button xsmall |
| 56 | Search Suggestion | `.ds-search-anchor` `.ds-search-suggest` (`__heading/list/item/content/label/desc/empty`) | `2558:1321`, 3 / Item `2558:1268`, 2 | 입력 칸은 Text Field + search 아이콘, 화살표 키는 ybm-ds.js |
| 57 | File Attach | `.ds-fileattach` (`__dropzone/input/label/items/trigger/count`) `.ds-fileitem` (`__thumbnail/texts/name/size/image/badge/remove`) | Dropzone `2558:1328`, 3 / Trigger `2558:1347`, 3 / Item `2558:1384`, 4 | dragOver 는 ybm-ds.js, Item file 160×80 / image 80×80 |

목록의 기계용 사본이 `components.json` 이다. 컴포넌트를 추가/변경하면 이 표와 `components.json` 을 함께 고친다(sync 가 Figma/CSS 와 대조).

### 6.2 사용 지침 (Do / Don't)
- **Action Button** - 강조(High emphasis)는 화면당 1개, 3개 이상 나란히 금지.
- **Badge** - 클릭 불가, 표시 전용.
- **Segmented Control** - 항목 2~4개, 화면당 1개.
- **Switch** - 즉시 반영되는 설정에만. 저장 버튼이 따로 있으면 Checkbox.
- **Snackbar** - 4초, 동시 1개.
- **Chip Tabs** - 콘텐츠 카테고리 전환용. 주요 내비게이션은 Tabs. variant 혼용 금지.
- **FAB** - 화면당 1개, 라벨 권장. disabled 상태 없음.
- **Field Button** - 폼 제출이 필요하면 disabled 대신 readOnly.
- **Dialog** - 헤더 닫기와 푸터 취소를 동시에 두지 않는다. 푸터 CTA 는 Action Button large(52).
- **Alert Dialog** - 되돌릴 수 없는 작업 확인용, 버튼으로만 닫힘.
- **Menu vs Select** - 동작 실행은 Menu, 값 고르기는 Select.
- **Callout** - prefix 아이콘은 Solid 형. 전체 클릭형(actionable)에는 링크 텍스트 금지. 제목/본문/링크는 한 줄 인라인(띄어쓰기 두 칸으로 구분).
- **Bottom Navigation** - 탭 3~5개, 라벨 한글 5자/영문 10자, 아이콘은 Solid, 뱃지 3개 이상 동시 노출 금지, count 1~99 (100↑ `99+`, 0 숨김).
- **Side Navigation** - 하위 메뉴가 있는 항목은 클릭 시 이동 없이 펼침만, 하위가 활성이면 부모는 펼친 상태 유지. 반응형 lg=펼침 / md=접힘 / sm=Drawer.
- **Divider** - 마지막 섹션 하단에 두지 않는다.
- **List Item** - 상호작용 요소 4개 미만. 행 전체가 링크이면 안에 다른 버튼을 넣지 않는다.
- **Tooltip vs Help Bubble** - Tooltip 은 아이콘 버튼 이름 같은 짧은 라벨(hover/focus 전용, 터치에서는 안 보임). 닫기/여러 줄 설명은 Help Bubble.
- **Banner vs Callout** - Banner 는 페이지 전체 공지(화면 맨 위, 한 번에 1개, 전체 폭). Callout 은 본문 안 안내.
- **Breadcrumbs** - 웹에서 2단계 이상 깊이일 때만. 마지막(현재) 항목은 링크가 아니다. 모바일 앱은 뒤로 가기 헤더.
- **Stepper** - 단계 3~5개, 라벨은 짧은 명사형. 더 많으면 "2 / 6" 처럼 글자로.
- **Select Box** - 설명이 필요한 선택지 2~6개에만. 짧은 선택지는 Radio Group, Checkbox 를 쓴다. 한 묶음 안에서 check 와 radio 를 섞지 않는다.
- **Time Picker** - 시간 고르기가 화면의 주된 일이면 바로 두고, 입력 필드에서는 Field Button + Bottom Sheet 안에 넣는다.
- **Table Pagination** - 데이터 표 아래 전용. 일반 목록은 Pagination. 페이지당 행 수 선택지는 3~4개.
- **Popover vs Dialog** - Popover 는 트리거 옆에 뜨는 작은 작업 창(제목, 버튼 포함), 바깥을 누르면 닫힌다. 화면을 막아야 하는 확인은 Dialog.
- **Top App Bar** - 모바일 화면마다 1개. theme(ios 제목 가운데 / android 제목 왼쪽)는 서비스 안에서 하나로 맞춘다. 왼쪽은 뒤로 또는 닫기, 오른쪽은 아이콘 버튼 2개까지. transparent 는 사진 위에서만 쓰고 gradient 를 켠다.
- **Top Navigation** - PC 전용. 메뉴는 7개까지, 지금 화면이 속한 메뉴에 `aria-current="page"`. 화면이 좁아지면 Top App Bar 와 메뉴 버튼으로 바꾼다.
- **Search Suggestion** - 검색 입력 칸은 Text Field outline 에 search 아이콘과 지우기 버튼을 붙여 쓰고, `type="search"` 와 `role="combobox"` 를 단다. 입력 전에는 최근 검색어, 입력 중에는 추천어, 없으면 empty 문구를 보여 준다.
- **File Attach** - 끌어 놓는 칸은 PC 처럼 끌어 놓기가 되는 곳에서만 두고, 모바일은 Trigger 와 Item 줄만 쓴다. Trigger 에는 지금 개수와 최대 개수를 적고, 다 차면 disabled 로 바꾼다.
- **Chat** - 상대 말풍선은 왼쪽, 내 말풍선은 오른쪽. 입력이 비면 보내기 비활성, 답변을 만드는 중에는 멈춤(stop)으로 바꾼다.
- 닫기 버튼(Dialog/Bottom Sheet): 40×40 투명 + 24px `Lucide/x`, 색 `fg/neutral`.

---

## 7. 아이콘

**UI 아이콘은 Lucide 만 사용한다.**

### Figma
- Icons 페이지 `271:2027` → 문서 프레임 `Icon` `2517:2` 안 "전체 아이콘" 에 라이브러리 프레임 `2416:2`
- `Lucide/<name>` COMPONENT_SET(Outline + Solid) 1228개 + Outline 만 있는 FRAME 466개(선으로만 된 아이콘이라 Solid 불가)
- Outline 선 굵기는 **크기에 비례**한다 - 원본(24px)은 2, 인스턴스는 크기 ÷ 12 (12px 1, 16px 1.33, 20px 1.67, 24px 2). 인스턴스 크기를 바꿀 때는 비율 크기 조절(K)로 바꾸거나 선 굵기를 크기 ÷ 12 로 맞춘다. (2026-10-27)
- 예외: 컨트롤 표시(체크박스의 체크와 가로선)는 아이콘 세트를 쓰지 않고 전용 부품 `Checkbox Mark`(Data Input 페이지 Checkbox 문서, 12/14/18px)를 쓴다. 선 굵기는 24 기준 2.75 비율(12px 1.375, 14px 1.6, 18px 2.06)로 굵게 유지하고, CSS `--ds-checkbox-mark` 와 같다.
- 컴포넌트에는 **반드시 이 페이지 컴포넌트의 인스턴스**를 쓴다. 벡터 직접 그리기/복제/외부 아이콘셋/detach 금지.
- 색은 인스턴스 내부 `Vector` 의 fill/stroke 를 `fg/*` 로 오버라이드. Solid 의 루트 COMPONENT 에는 fill 을 넣지 않는다(사각형으로 렌더됨).
- 자주 쓰는 ID: `x` `277:3557`, `chevron-right` `277:2216`, `chevron-down` `277:2212`, `plus` `277:3041`, `calendar` `277:2152`, `panel-left` `277:2980`, `house`(Solid) `1365:8053`

### CSS (`icons.css`)
```html
<i class="ds-icon ds-icon--x" aria-hidden="true"></i>
```
- SVG 를 data URI 로 넣고 `mask` 로 그린다 → `file://` 에서도 보이고, 색은 부모 `color` 를 따른다.
- 크기: 기본 20, `.ds-icon--sm` 16, `.ds-icon--lg` 24, 또는 `--ds-icon-size`
- `:root` 의 `--ds-icon-{이름}` 을 다른 컴포넌트 CSS 에서 mask 로 재사용 가능
- 추가: lucide.dev 에서 path 를 복사해 같은 형식으로 한 줄 추가 - `stroke-width` 는 Lucide 원본 그대로 **2**(viewBox 24 기준). 아이콘 크기에 따라 자동으로 비례해 Figma 규칙과 같아진다(20px → 1.67)

현재 수록(51): x, chevron-down/up/left/right, chevrons-left/right, check, circle-alert, circle-check, circle-x, info, triangle-alert, eye, eye-off, external-link, monitor, smartphone, rotate-ccw, menu, minus, plus, search, ellipsis, inbox, calendar, panel-left, file-text, house, id-card, credit-card, globe, arrow-right, arrow-up, paperclip, thumbs-up, thumbs-down, headset, corner-down-right, image, sparkles, message-circle(2026-10-21 가이드 코멘트), Solid: house / info / circle-check / circle-alert / triangle-alert

---

## 8. 유틸리티 (`utilities.css`)
화면 하나에서만 필요한 조정용. 반복되면 컴포넌트/서비스 클래스로 승격한다.

| 분류 | 클래스 |
|---|---|
| 타이포 | `.ds-t01` ~ `.ds-t17`, `.ds-fw-{regular\|medium\|semibold\|bold}` |
| 색 | `.ds-fg-{neutral\|muted\|subtle\|brand\|critical}` |
| 배치 | `.u-flex` `.u-col` `.u-center` `.u-between` `.u-wrap` `.u-grow` |
| 간격 | `.u-gap-{N}` `.u-mt-{N}` `.u-mb-{N}` (N = spacing x 뒤 숫자, 예 `u-gap-5` = 20px) |
| 기타 | `.u-text-center` `.u-full`, `.ds-sr-only`(base.css) |

---

## 9. 접근성 기본값
- 포커스: 키보드 포커스에만 `2px solid stroke/focus-ring`, offset 2px (`:focus-visible`)
- 터치 타깃 40px 이상(아이콘 버튼 44×44)
- `prefers-reduced-motion: reduce` 에서 애니메이션/트랜지션 제거
- 아이콘 전용 버튼은 `aria-label` 필수, 장식 아이콘은 `aria-hidden="true"`

---

## 10. 작업 규칙

### 공통
1. 새 UI 는 **기존 컴포넌트를 재사용**한다. 중복 제작 금지.
2. 컴포넌트는 **시맨틱 토큰만** 참조한다. 반경은 `shape/*`.
3. 새 컴포넌트를 추가하면 `components.css`(`.ds-*` + `--ds-*` 변수), `components.json`, `index.html`(미리보기 섹션), 이 문서 §6, Figma `description` 을 함께 갱신한다.
4. 토큰을 바꿀 때는 **Figma 변수 → `node sync.mjs figma` → use_figma → `node sync.mjs pull`** 순서. `tokens.css` 를 손으로 고치지 않는다.
5. CSS 수정 후에는 `index.html?only=번호` 를 브라우저로 렌더해 Figma 스크린샷과 나란히 비교한다.
6. **양방향 동기화** - `ds` 폴더를 고치면 같은 작업 안에서 Figma 도 고치고, Figma 를 고치면 `ds` 도 고친다. 작업 시작 전 `node sync.mjs figma` 점검으로 이미 어긋난 곳이 없는지 확인하고, 끝나면 `node sync.mjs deploy` 로 GitHub 까지 올린다.

### Figma
1. 정식 COMPONENT_SET, 변형 이름은 `축=값`(소문자 시작 camelCase 값). 프로퍼티는 TEXT / BOOLEAN / INSTANCE_SWAP.
   - 프로퍼티 쌍 관행: `prefix icon`(BOOLEAN) + `prefix`(INSTANCE_SWAP).
   - INSTANCE_SWAP 기본값은 컴포넌트 key 가 아니라 **노드 ID 문자열**.
   - 변형마다 다른 기본값이 필요한 슬롯은 프로퍼티로 만들지 않는다(프로퍼티 기본값은 세트 전역).
2. 새 변수는 Web code syntax `var(--ybm-…)` 와 scopes 를 반드시 지정한다.
3. 변수/텍스트 스타일 삭제 전에는 전체 노드의 `boundVariables` / `textStyleId` 를 스캔해 사용처 0건을 확인한다.
4. 로컬 스타일은 **텍스트 스타일만**. 이펙트/컬러/그리드 스타일 금지.
5. 대량 작업은 소수 샘플 → 스크린샷 비교 → 승인 후 일괄.
6. 컴포넌트 섹션 배치: 박스 안쪽 여백 32, 변형 간격 80, 세트 사이 240.
7. 문서/설명/코드 어디에도 외부 레퍼런스 DS 의 이름/출처 링크/비교 문구를 넣지 않는다.

### Plugin API 함정 (자주 걸리는 것)
- 텍스트를 건드리거나 노드를 옮기기 전에 Pretendard Regular/Medium/SemiBold/Bold 를 모두 `loadFontAsync`. 스타일 문자열은 `SemiBold`(공백 없음).
- 알파 있는 색 변수를 별칭의 별칭으로 paint 에 바인딩하면 alpha 가 적용되지 않을 수 있다 → 최종 alpha 를 `paint.opacity` 에 직접 넣는다.
- TEXT 프로퍼티를 붙이면 range 서식(부분 Bold/밑줄)이 초기화된다.
- 인스턴스 `setProperties` 키는 `label#1407:2` 처럼 접미사가 붙은 실제 키.
- `resize()` 는 sizing mode 를 FIXED 로 되돌린다 → hug 가 필요하면 resize 후 다시 `AUTO`.
- 섹션은 자동으로 커지지 않는다 → `resizeWithoutConstraints`. 섹션 자식 좌표는 섹션 기준.
- `figma.union/subtract` 는 page 직속에서 수행 후 옮긴다(부모 안에서 하면 좌표 이중 적용). `flatten()` 은 clone 에 시도.

---

## 11. 미구현 / 남은 항목
- 미구현 컴포넌트(다음 차례): Side Panel/Drawer, Pull To Refresh, Result Section, Scroll Fog, Menu Sheet, Aspect Ratio, Image Frame, Spinner/Status Dot, Number Input, Typeahead/Multi Select
- AI/학습 서비스용 묶음(채팅 말풍선/입력창/Markdown/Code Block/출처 표시) - magic 시맨틱을 쓸 첫 컴포넌트 후보
- 서비스별 brand 색 교체 층(`data-brand`), motion 토큰의 Figma 변수화
- Callout magic tone, pressed 변형(Figma), magic 시맨틱을 쓰는 컴포넌트 없음
- 시맨틱 텍스트 스타일(화면 제목/본문/주석 등 역할 이름) 미구현

---

## 12. 변경 이력 (주요)
| 날짜 | 내용 |
|---|---|
| 2026-10-29 | 54 Top App Bar(+ Button), 55 Top Navigation(+ Item), 56 Search Suggestion(+ Item), 57 File Attach(Dropzone/Trigger/Item) 를 Figma 와 CSS 에 함께 추가(레퍼런스 가이드 규격 기준). 아이콘 `upload`, `clock` 추가 |
| 2026-10-28 | Figma 에만 있던 10종 CSS 완성과 등록(49~53), Popover/Time Picker/Chat 입력창 동작 |
| 2026-10-27 | Figma 페이지를 레퍼런스 라이브러리 형식(카테고리 페이지 + 문서 프레임)으로 개편, 새 컴포넌트 10종(Figma 만). 모드 정리 - Typography 130%/150%, Shape Soft/Sharp 삭제, CSS 의 `data-shape` 테마(soft/sharp/square) 제거. 남은 모드는 Light / Dark |
| 2026-10-22 | ds 를 단독 GitHub 저장소(ybm-ds) + Pages 로 분리, 가이드 사이트에서 DS 사본 제거(DS 주소 참조). 통합 동기화 `sync.mjs`/`동기화.bat`/`components.json`(Figma 노드 대조) 도입. `build.py` → `build.mjs`(출력 동일, Python 불필요). 컴포넌트 6종 추가(Divider/Tooltip/List/Breadcrumbs/Stepper/Banner - CSS/Figma 동시). 미리보기 `index.html` |
| 2026-10-21 | 폴더 재구성(`ds/` 루트 = `ybm-ds/` + `tokens/`). 명칭 **YBM Family → YBM** 일괄 변경 - Figma 컬렉션 `YBM Family DS` → `YBM DS`, 코드/주석/생성물 전부 |
| 2026-10-20 | 외부 레퍼런스 DS 관련 문구 전면 제거. figma-sync 파이프라인 도입 |
| 2026-10-02 | components.css 전 컴포넌트를 Figma 변형별 실측과 재정합. 로컬 스타일은 텍스트만 허용 |
| 2026-09-29 | lineHeight 전 단계 +2 |
| 2026-09-14 | 텍스트 스타일 전 단계 4웨이트(136개), t15~t17 추가. 이펙트 스타일 삭제 → 변수 직접 바인딩. `stroke/neutral` 신설 |
| 2026-09-09 | Elevation 2겹 5단계 개편, `chart/series-1~5` 신설, yellow 팔레트 교체 |
| 2026-09-04 | Shape 테마(기본/soft/sharp) + 곡률 노브 |
| 2026-08-27 | warning 시맨틱 orange 로 통일, 색 이름 시맨틱(orange-*) 삭제 |
| 2026-08-24 | Spacing 26단계 확장, Progress Circle, FAB, Chip Tabs, Field Button 추가 |
| 2026-08-19 | `--ybm-` 네이밍 통일, Lucide Solid 445개 자동 생성 |
