# YBM Design System

YBM 서비스 공용 디자인 시스템. Figma 변수·컴포넌트가 정본이고, 이 폴더(`ds/`)는 그걸 코드로 옮긴 배포 패키지와 토큰 파이프라인이다.

- 최종 갱신: 2026-10-21
- Figma 파일: `1VCEsFU3xMWuXIntIrZz9i` — <https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/>
- 로컬 폴더: `C:\Users\luvms\Desktop\works\ds`

---

## 1. 폴더 구조

```
ds/
├─ README.md                 ← 이 문서 (DS 전체 안내)
├─ ybm-ds/                   ← 배포 패키지. 서비스는 이 폴더를 그대로 가져다 쓴다
│  ├─ ybm-ds.css             진입 파일 (이것 하나만 link) — 아래 5개를 cascade layer 로 import
│  ├─ tokens.css             토큰 (⚠ build.py 생성물 — 손으로 고치지 않음)
│  ├─ base.css               리셋 · Pretendard @font-face · 포커스 링 · reduced-motion · .ds-sr-only
│  ├─ icons.css              Lucide 아이콘 (data URI + mask) .ds-icon
│  ├─ components.css         컴포넌트 42종 .ds-*
│  ├─ utilities.css          .ds-t01~t17 · .ds-fw-* · .ds-fg-* · .u-*
│  ├─ ybm-ds.js              공통 인터랙션 (의존성 없음)
│  └─ fonts/                 Pretendard woff2 (Thin~Black 9종, CSS 는 400/500/600/700 사용)
└─ tokens/                   ← 토큰 소스와 파생물
   ├─ figma-variables.json   Figma 변수 전집 스냅샷 = source of truth
   ├─ figma-variables.backup-YYYY-MM-DD.json   apply 시 자동 백업
   ├─ build.py               스냅샷 → tokens.css + 파생 3종 생성
   ├─ figma-sync.mjs         Figma ↔ 스냅샷 비교·병합 도우미
   ├─ .figma-check.js        figma-sync check 가 만드는 use_figma 실행용 스크립트
   ├─ design-tokens.json     (생성물) 중첩 JSON
   ├─ tokens.js              (생성물) JS 객체
   └─ tailwind.preset.js     (생성물) Tailwind preset — 값은 전부 CSS 변수 참조
```

### 손으로 관리하는 파일 vs 생성물

| 구분 | 파일 |
|---|---|
| 직접 편집 | `base.css` `icons.css` `components.css` `utilities.css` `ybm-ds.css` `ybm-ds.js` `build.py` `figma-sync.mjs` |
| 생성물 (편집 금지) | `ybm-ds/tokens.css` `tokens/design-tokens.json` `tokens/tokens.js` `tokens/tailwind.preset.js` `tokens/.figma-check.js` |
| 스냅샷 (figma-sync 로만 갱신) | `tokens/figma-variables.json` |

---

## 2. 사용법

```html
<link rel="stylesheet" href="…/ybm-ds/ybm-ds.css">                 <!-- 공통 DS -->
<link rel="stylesheet" href="…/services/{서비스}/{서비스}.css">       <!-- 서비스 전용 -->
<script src="…/ybm-ds/ybm-ds.js" defer></script>

<html data-theme="dark" data-shape="soft">  <!-- 둘 다 선택. 독립 조합 가능 -->
```

### Cascade Layers
DS 전체가 `@layer ybm.tokens, ybm.base, ybm.icons, ybm.components, ybm.utilities` 안에 들어 있다.
레이어 밖에 쓴 서비스 CSS 는 선택자 우선순위와 상관없이 항상 DS 를 이긴다 → `!important`·선택자 길이 경쟁 불필요.

### 커스텀 규칙
- 서비스는 **컴포넌트 변수(`--ds-*`)만 바꿔서** 커스텀한다. 클래스 신설·`!important` 금지.
  예) `.signup-dialog { --ds-dialog-width: 360px; }`
- 토큰 레이어 중 **팔레트는 YBM 전체 공유**, 서비스는 시맨틱·컴포넌트 층만 덮어쓴다.

### ybm-ds.js 가 하는 일 (CSS 로 안 되는 것만)
| 기능 | 사용 |
|---|---|
| Dialog 열기/닫기 | `data-ds-open="dialogId"` / `data-ds-close` 속성, 바깥(dim) 클릭 닫기. 네이티브 `<dialog>.showModal()` |
| Snackbar | `YBM.snackbar("문구", { variant: "positive"\|"critical", action: "확인", onAction, duration })` — 기본 4초 |
| Slider | `<input type="range" class="ds-slider">` 채움 길이(`--ds-slider-value`) 동기화 |
| Checkbox | `data-indeterminate` → `input.indeterminate = true` |
| Text Field clear | 값 지우기 (노출/숨김은 CSS) |

---

## 3. 토큰 파이프라인

```
Figma 변수 ──(figma-sync check → use_figma → apply)──▶ tokens/figma-variables.json
                                                          │
                                         python tokens/build.py [날짜]
                                                          ▼
                     ybm-ds/tokens.css · design-tokens.json · tokens.js · tailwind.preset.js
```

1. `node tokens/figma-sync.mjs check` → `tokens/.figma-check.js` 생성
2. 그 내용을 Figma MCP `use_figma`(fileKey `1VCEsFU3xMWuXIntIrZz9i`, 읽기 전용)로 실행 → `{ same, added, removed, changed, collections, inSync }` 반환
3. 변경이 있으면 결과 JSON 을 파일로 저장 후 `node tokens/figma-sync.mjs apply <결과.json>` (기존 스냅샷은 `.backup-날짜.json` 으로 백업)
4. `python tokens/build.py` → 생성물 4종 재작성
   - `python tokens/build.py <날짜> <출력폴더>` 로 다른 곳에 빌드해 diff 검증 가능
   - 스냅샷이 불완전하면(개수 불일치·모드 누락·별칭 미해결) 빌드가 즉시 실패한다

비교 기준: 변수 이름 · 타입 · 모드별 값(색 hex, 숫자, 별칭 이름) · description.

---

## 4. Figma 파일 구조

| 페이지 | ID | 내용 |
|---|---|---|
| Foundations | `2274:1143` | 섹션 Color `2288:63` · Typography `2288:64` · Elevation `2288:65` · Radius `2288:66` · Spacing `2288:67` |
| Components | `0:1` | 컴포넌트마다 섹션 1개 (34개 섹션) |
| Icons | `271:2027` | Lucide Icons 프레임 `1167:2` |

### 변수 컬렉션
| 컬렉션 | 모드 | 변수 수 |
|---|---|---|
| **YBM DS** (`VariableCollectionId:3:2`) | Light / Dark | 246 |
| Typography | 100% / 130% / 150% | 73 |
| Shape | Default / Soft / Sharp | 9 |
| Elevation | Default | 30 |

- Figma 변수 이름에는 `color/` 접두사가 없다 (`bg/canvas`, `fg/neutral` …).
- 모든 변수의 Web code syntax = `var(--ybm-…)` → Dev Mode 복사본이 그대로 CSS 에서 동작.

### 로컬 스타일
- 텍스트 스타일 **136개**: `Scale|Static / t01~t17 / {1 Regular · 2 Medium · 3 SemiBold · 4 Bold}` (예 `Scale/t06/4 Bold`). Typography 변수에 바인딩돼 있어 변수만 바꾸면 전부 반영.
- ⛔ 이펙트·컬러·그리드 로컬 스타일은 **만들지 않는다**. 그림자·색은 변수를 노드에 직접 바인딩.

---

## 5. 토큰

### 5.1 구조 — 3계층
```
PALETTE  --ybm-color-palette-*            원시값. 컴포넌트·서비스에서 직접 쓰지 않음
SEMANTIC --ybm-color-{bg|fg|stroke|chart}-*  역할. 컴포넌트는 이 층만 참조
COMPONENT --ds-{컴포넌트}-*                 components.css 의 각 컴포넌트가 노출
```
- 시맨틱 이름은 반드시 **역할**(neutral·brand·critical·informative·positive·warning·magic)이다. 색 이름(orange 등)을 시맨틱으로 쓰지 않는다.
- 예외: Progress Circle 은 팔레트를 직접 참조한다.

### 5.2 네이밍 규약 (`--ybm-` 접두사, zero-pad)
`--ybm-color-*` · `--ybm-space-x*` · `--ybm-radius-r*` · `--ybm-shape-*` · `--ybm-font-size-t0N` · `--ybm-line-height-t0N` · `--ybm-font-weight-*` · `--ybm-font-family-base` · `--ybm-elevation-*` · `--ybm-duration-*` · `--ybm-easing-*` · `--ybm-z-*`

### 5.3 팔레트 (103)
gray `00·100~1000` · brand `100~900`(**실제 색은 파랑**, `#dbeafe`~) · blue · red · green · yellow · orange · purple `100~1000` · `static-white`/`static-black` + 각 alpha `50~1000`.
다크 모드는 **팔레트 flip**(명도 반전, gray-00=검정). `static-*` 만 모드 무관.

로고 고정색(모드 무관): `logo-ybm-blue #0055a7` · `logo-ybm-red #e83743` · `logo-ybm-gray #7d7d7d`

### 5.4 시맨틱 색

**bg (41)** — `canvas` `layer-default` `layer-floating` `overlay` `disabled` `transparent(-pressed)` ·
`neutral` `neutral-weak-pressed` `neutral-weak-alpha(-pressed)` `neutral-muted` `neutral-subtle` `neutral-solid(-pressed)` `neutral-inverted(-pressed)` ·
`{brand|critical|informative|positive|warning|magic}-{solid|weak}(-pressed)`

**fg (25)** — `neutral` `neutral-muted` `neutral-subtle` `neutral-inverted` `placeholder` `disabled` ·
`{brand|critical|informative|positive|warning|magic}` + `-contrast` ·
`on-{brand|critical|informative|positive|warning|magic|neutral}-solid` (solid 배경 위 글자)

**stroke (19)** — `neutral`(기본 테두리) `neutral-weak` `neutral-muted` `neutral-subtle` `neutral-solid` `neutral-contrast` `focus-ring` ·
`{brand|critical|informative|positive|warning|magic}-{solid|weak}`

**chart (5)** — `series-1~5` = brand / orange / green / purple / yellow (Light 600~700, Dark 600)

다크 전환: `<html data-theme="dark">` — 팔레트 flip + 대비 보정이 필요한 시맨틱만 재지정(예: `bg/critical-solid` L=red-700 → D=red-600).

### 5.5 Spacing — `x{N}` = N × 4px (27)
20px 이하 2px 반값 스텝, 20~64px 4px 단위, 그 위는 점프. (20px 위의 반값 스텝은 의도적으로 없음)

`x0 0` `x0_5 2` `x1 4` `x1_5 6` `x2 8` `x2_5 10` `x3 12` `x3_5 14` `x4 16` `x4_5 18` `x5 20` `x6 24` `x7 28` `x8 32` `x9 36` `x10 40` `x11 44` `x12 48` `x13 52` `x14 56` `x15 60` `x16 64` `x18 72` `x20 80` `x24 96` `x32 128` · `spacing/x-global-gutter`

Figma 의 `dimension/x*` 변수 scopes = `WIDTH_HEIGHT` + `GAP`.

### 5.6 Radius (원시) → Shape (시맨틱)
원시: `r0 0` `r0_5 2` `r1 4` `r1_5 6` `r2 8` `r2_5 10` `r3 12` `r3_5 14` `r4 16` `r5 20` `r6 24` `r8 32` `full 9999`

**컴포넌트는 `--ybm-shape-*` 만 쓴다** (원시 radius 직접 참조 금지).

| shape | 기본 | soft (`data-shape="soft"`) | sharp (`data-shape="sharp"`) |
|---|---|---|---|
| 2xs | r1 4 | r2 8 | r0 0 |
| xs | r1_5 6 | r2_5 10 | r0 0 |
| sm | r2 8 | r3 12 | r0 0 |
| md | r2_5 10 | r3_5 14 | r0_5 2 |
| lg | r3 12 | r4 16 | r0_5 2 |
| xl | r4 16 | r5 20 | r1 4 |
| 2xl | r5 20 | r6 24 | r1 4 |
| 3xl | r6 24 | r8 32 | r1_5 6 |
| pill | full | full | full |

- 곡률 노브 `--ybm-shape-scale`(기본 1, 0 이면 완전 각짐). 영역 단위로 덮어써도 동작하도록 shape 계산은 `:root` 가 아니라 `*, ::before, ::after` 에서 한다.
- `data-shape="square"` = 노브 0. pill 은 항상 원형.

### 5.7 Typography
폰트: **Pretendard** (`"Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`)
웨이트: regular 400 · medium 500 · semibold 600 · bold 700

| 단계 | size / line | 단계 | size / line | 단계 | size / line |
|---|---|---|---|---|---|
| t01 | 11 / 17 | t07 | 20 / 29 | t13 | 40 / 54 |
| t02 | 12 / 18 | t08 | 22 / 32 | t14 | 48 / 62 |
| t03 | 13 / 20 | t09 | 24 / 34 | t15 | 56 / 75 |
| t04 | 14 / 21 | t10 | 26 / 37 | t16 | 64 / 85 |
| t05 | 16 / 24 | t11 | 28 / 40 | t17 | 72 / 96 |
| t06 | 18 / 28 | t12 | 32 / 44 | | |

- Figma Typography 컬렉션은 100% / 130% / 150% 모드(시스템 글자 확대 대응). `*-static` 변수는 확대에 반응하지 않는 곳(내비게이션 라벨 등)용 — `Static/*` 텍스트 스타일.
- CSS 는 100% 모드 값만 쓴다(`*-static` 도 같은 값).
- 컴포넌트 라벨은 fontSize 변수 직접 바인딩이 아니라 **텍스트 스타일 적용**.
- `body` 기본 = t05, `word-break: keep-all`.

### 5.8 Elevation (그림자)
2겹(key + ambient) 5단계. 기하값은 Figma `Elevation` 컬렉션, 색은 `YBM DS` 컬렉션의 `elevation/{n}-key|ambient`(다크 모드 자동 대응).

| 단계 | 값 | 역할 별칭 (컴포넌트는 이 이름을 씀) |
|---|---|---|
| 1 | `0 1 2 -1` + `0 1 3 0` | `--ybm-elevation-raised` — thumb, 선택된 세그먼트 |
| 2 | `0 2 4 -2` + `0 4 10 -1` | `--ybm-elevation-overlay` (+1px stroke/neutral-muted inset) — menu, select, snackbar, tooltip, date picker |
| 3 | `0 2 4 -2` + `0 10 8 0` | `--ybm-elevation-panel` — 떠 있는 패널 |
| 4 | `0 4 6 -4` + `0 10 18 -3` | `--ybm-elevation-floating` — FAB |
| 5 | `0 8 10 -6` + `0 20 32 -5` | `--ybm-elevation-modal` — dialog, alert dialog, bottom sheet |

### 5.9 CSS 전용 시스템 토큰
- Motion: `duration-fast 120ms` · `normal 200ms` · `slow 320ms` · `easing-standard cubic-bezier(.2,0,0,1)` · `easing-emphasized cubic-bezier(.3,0,0,1)`
- Z-index: `base 0` · `sticky 100` · `overlay 1000` · `dialog 1100` · `toast 1200` · `tooltip 1300`

---

## 6. 컴포넌트

### 6.1 카탈로그 (Figma ↔ CSS)
CSS 는 Figma 프로퍼티 이름을 그대로 `data-*` 속성으로 쓴다: `<button class="ds-btn" data-variant="brandSolid" data-size="large">`.
상태는 가능한 한 네이티브로 표현한다(`:disabled` `:checked` `:focus-within` `[aria-invalid]` `[aria-selected]` `[aria-pressed]` `[aria-current]` `[aria-expanded]`). Figma 의 pressed = `:active`(+ 마우스 환경 `:hover`).

| # | 컴포넌트 | CSS | Figma COMPONENT_SET (ID · 변형 수) | 주요 속성 / 컴포넌트 변수 |
|---|---|---|---|---|
| 01 | Action Button | `.ds-btn` | `24:354` · 168 | variant `brandSolid·brandOutline·neutralSolid·neutralWeak·neutralOutline·criticalSolid·ghost` · size `xsmall·small·medium·large` · layout `iconOnly` · width `fill` |
| 02 | Text Link | `.ds-link` | — (CSS 전용) | `--ds-link-color(-hover)` |
| 03 | Field Label | `.ds-field` (`__header/label/indicator/required/footer/help/error/count`) | `109:1367` · 2 | label-weight `bold` |
| 04 | Text Field Input | `.ds-input` (`__control/prefix/suffix/icon/clear`) | `108:1325` · 40 | variant `outline·underline` · size |
| 05 | Text Field Textarea | `.ds-textarea` | `114:1496` · 40 | variant · size |
| 06 | Field Button | `.ds-fieldbutton` (`__affix/__value`) | `1408:2667` · 16 | size `large·medium` · 상태 enabled/disabled/readOnly/invalid |
| 07 | Prefix Select | `.ds-prefixselect` | `2096:852` · 2 | 입력 앞 선택(통신사·국가번호) |
| 08 | Select Trigger | `.ds-select` | `119:1605` · 20 | size |
| 09 | Select Content · Item | `.ds-select-content` `.ds-select-item` | `125:1717` · 2 / `124:1769` · 12 | |
| 10 | Checkbox | `.ds-checkbox` | `61:995` · 40 | variant `square·ghost` · tone · size |
| 11 | Radio Group | `.ds-radio-group` `.ds-radio` | `1224:2164` · 16 | tone · size |
| 12 | Switch | `.ds-switch` | `93:1271` · 24 | size `16·24·32` · tone |
| 13 | Quantity Picker | `.ds-quantity` | `1184:2146` · 18 | size · layout `fill` |
| 14 | Code Input | `.ds-code-input` | — (CSS 전용) | 인증번호 6칸 |
| 15 | Chip | `.ds-chip` `.ds-chip-group` | `69:964` · 54 | variant `solid·outlineStrong·outlineWeak` · size · layout `iconOnly` |
| 16 | Chip Tabs | `.ds-chiptabs` (`__trigger`) | `1407:2596` · 4 / Trigger `1407:2522` · 16 | variant `neutralSolid·neutralOutline` · size `medium·large` |
| 17 | Tabs | `.ds-tabs` (`__trigger`) | `95:1313` · 4 / Tab Trigger `95:1272` · 12 | layout `fill·hug` · size |
| 18 | Segmented Control | `.ds-segmented` | `1239:2152` · 4 | layout · size |
| 19 | Toggle Button | `.ds-toggle` | `1244:2164` · 6 | size |
| 20 | Badge | `.ds-badge` | `17:87` · 36 | variant `weak·solid·outline` · tone `neutral·brand·informative·positive·warning·critical` · size |
| 21 | Tag Group | `.ds-tag-group` | `1240:2176` · 4 | 작성자 · 날짜 · 조회수 |
| 22 | Avatar | `.ds-avatar` | `40:614` · 30 | size `20·24·36·42·48·56·64·80·96·108` |
| 23 | Callout | `.ds-callout` | `1241:2177` · 5 | tone `neutral·informative·positive·warning·critical` (magic 은 CSS 만) |
| 24 | Snackbar | `.ds-snackbar` | `92:1107` · 3 | variant `default·positive·critical` |
| 25 | Help Bubble | `.ds-helpbubble` | `75:1233` · 12 | `--ds-hb-arrow-offset` |
| 26 | Menu · Menu Item | `.ds-menu` `.ds-menu-item` | `1246:2183`(COMPONENT) / `1246:2182` · 6 | tone `critical` |
| 27 | Dialog | `.ds-dialog` | `1493:939` · 8 (+ Dialog Body Slot `1528:835`) | size(480/800) · `--ds-dialog-width` |
| 28 | Alert Dialog | `.ds-alertdialog` | `30:540` · 5 | 272 폭 · action `pair·critical·nonpreferred` |
| 29 | Bottom Sheet | `.ds-bottomsheet` | `59:674` · 8 | header-align `center` |
| 30 | Accordion | `.ds-accordion` (`<details>`) | `282:1996` · 12 | variant `separated` · size |
| 31 | Skeleton | `.ds-skeleton` | `1242:2158` · 3 | shape `rect·circle·text` |
| 32 | Slider | `.ds-slider` | `1243:2168` · 4 | tone |
| 33 | Progress | `.ds-progress` | `2163:982` · 4 | size · tone |
| 34 | Progress Circle | `.ds-progress-circle` | `1405:2502` · 18 | tone `neutral·brand·staticWhite` · size · type `determinate·indeterminate` |
| 35 | Floating Action Button | `.ds-fab` | `1406:2468` · 4 | layout `iconOnly`(extended=false) |
| 36 | Date Picker · Date Cell | `.ds-datepicker` `.ds-date-cell` | `1324:2310` · 2 / `1322:2183` · 7 | cell state `today·selected·range-start·range-middle·range-end` |
| 37 | Bottom Navigation | `.ds-bottomnav` | `1348:2383` · 3 / Item `1347:2416` · 12 | 뱃지 `__badge--dot/--count` (bg/critical-solid) |
| 38 | Side Navigation | `.ds-sidenav` | `1371:2610` · 4 / Item `1370:2392` · 8 | expanded 240 / collapsed 56 |
| 39 | Card | `.ds-card` | `2164:1063` · 4 | variant `elevated` · size |
| 40 | Empty | `.ds-empty` | `2164:1092` · 2 | size |
| 41 | Pagination | `.ds-pagination` | `2163:1067` · 2 / Item `2163:1028` · 16 | type `first·prev·next·last·ellipsis·simple` |
| 42 | Table | `.ds-table` `.ds-table-wrap` | `2164:1271` · 2 / Row `2164:1178` · 8 / Cell `2164:1105` · 6 | density `compact` · align |

Divider 는 Figma 컴포넌트 없이 CSS 만 있다.

### 6.2 사용 지침 (Do / Don't)
- **Action Button** — 강조(High emphasis)는 화면당 1개, 3개 이상 나란히 금지.
- **Badge** — 클릭 불가, 표시 전용.
- **Segmented Control** — 항목 2~4개, 화면당 1개.
- **Switch** — 즉시 반영되는 설정에만. 저장 버튼이 따로 있으면 Checkbox.
- **Snackbar** — 4초, 동시 1개.
- **Chip Tabs** — 콘텐츠 카테고리 전환용. 주요 내비게이션은 Tabs. variant 혼용 금지.
- **FAB** — 화면당 1개, 라벨 권장. disabled 상태 없음.
- **Field Button** — 폼 제출이 필요하면 disabled 대신 readOnly.
- **Dialog** — 헤더 닫기와 푸터 취소를 동시에 두지 않는다. 푸터 CTA 는 Action Button large(52).
- **Alert Dialog** — 되돌릴 수 없는 작업 확인용, 버튼으로만 닫힘.
- **Menu vs Select** — 동작 실행은 Menu, 값 고르기는 Select.
- **Callout** — prefix 아이콘은 Solid 형. 전체 클릭형(actionable)에는 링크 텍스트 금지. 제목·본문·링크는 한 줄 인라인(띄어쓰기 두 칸으로 구분).
- **Bottom Navigation** — 탭 3~5개, 라벨 한글 5자/영문 10자, 아이콘은 Solid, 뱃지 3개 이상 동시 노출 금지, count 1~99 (100↑ `99+`, 0 숨김).
- **Side Navigation** — 하위 메뉴가 있는 항목은 클릭 시 이동 없이 펼침만, 하위가 활성이면 부모는 펼친 상태 유지. 반응형 lg=펼침 / md=접힘 / sm=Drawer.
- **Divider** — 마지막 섹션 하단에 두지 않는다.
- **List Item** — 상호작용 요소 4개 미만.
- 닫기 버튼(Dialog·Bottom Sheet): 40×40 투명 + 24px `Lucide/x`, 색 `fg/neutral`.

---

## 7. 아이콘

**UI 아이콘은 Lucide 만 사용한다.**

### Figma
- Icons 페이지 `271:2027` → 프레임 `Lucide Icons` `1167:2`
- `Lucide/<name>` COMPONENT_SET(Outline + Solid) 1228개 + Outline 만 있는 FRAME 466개(선으로만 된 아이콘이라 Solid 불가)
- 컴포넌트에는 **반드시 이 페이지 컴포넌트의 인스턴스**를 쓴다. 벡터 직접 그리기·복제·외부 아이콘셋·detach 금지.
- 색은 인스턴스 내부 `Vector` 의 fill/stroke 를 `fg/*` 로 오버라이드. Solid 의 루트 COMPONENT 에는 fill 을 넣지 않는다(사각형으로 렌더됨).
- 자주 쓰는 ID: `x` `277:3557` · `chevron-right` `277:2216` · `chevron-down` `277:2212` · `plus` `277:3041` · `calendar` `277:2152` · `panel-left` `277:2980` · `house`(Solid) `1365:8053`

### CSS (`icons.css`)
```html
<i class="ds-icon ds-icon--x" aria-hidden="true"></i>
```
- SVG 를 data URI 로 넣고 `mask` 로 그린다 → `file://` 에서도 보이고, 색은 부모 `color` 를 따른다.
- 크기: 기본 20 · `.ds-icon--sm` 16 · `.ds-icon--lg` 24 · 또는 `--ds-icon-size`
- `:root` 의 `--ds-icon-{이름}` 을 다른 컴포넌트 CSS 에서 mask 로 재사용 가능
- 추가: lucide.dev 에서 path 를 복사해 같은 형식으로 한 줄 추가

현재 수록(51): x · chevron-down/up/left/right · chevrons-left/right · check · circle-alert · circle-check · circle-x · info · triangle-alert · eye · eye-off · external-link · monitor · smartphone · rotate-ccw · menu · minus · plus · search · ellipsis · inbox · calendar · panel-left · file-text · house · id-card · credit-card · globe · arrow-right · arrow-up · paperclip · thumbs-up · thumbs-down · headset · corner-down-right · image · sparkles · message-circle(2026-10-21 가이드 코멘트) · Solid: house / info / circle-check / circle-alert / triangle-alert

---

## 8. 유틸리티 (`utilities.css`)
화면 하나에서만 필요한 조정용. 반복되면 컴포넌트/서비스 클래스로 승격한다.

| 분류 | 클래스 |
|---|---|
| 타이포 | `.ds-t01` ~ `.ds-t17` · `.ds-fw-{regular\|medium\|semibold\|bold}` |
| 색 | `.ds-fg-{neutral\|muted\|subtle\|brand\|critical}` |
| 배치 | `.u-flex` `.u-col` `.u-center` `.u-between` `.u-wrap` `.u-grow` |
| 간격 | `.u-gap-{N}` `.u-mt-{N}` `.u-mb-{N}` (N = spacing x 뒤 숫자, 예 `u-gap-5` = 20px) |
| 기타 | `.u-text-center` `.u-full` · `.ds-sr-only`(base.css) |

---

## 9. 접근성 기본값
- 포커스: 키보드 포커스에만 `2px solid stroke/focus-ring`, offset 2px (`:focus-visible`)
- 터치 타깃 40px 이상(아이콘 버튼 44×44)
- `prefers-reduced-motion: reduce` 에서 애니메이션·트랜지션 제거
- 아이콘 전용 버튼은 `aria-label` 필수, 장식 아이콘은 `aria-hidden="true"`

---

## 10. 작업 규칙

### 공통
1. 새 UI 는 **기존 컴포넌트를 재사용**한다. 중복 제작 금지.
2. 컴포넌트는 **시맨틱 토큰만** 참조한다. 반경은 `shape/*`.
3. 새 컴포넌트를 추가하면 `components.css`(`.ds-*` + `--ds-*` 변수) · 이 문서 §6 · Figma `description` 을 함께 갱신한다.
4. 토큰을 바꿀 때는 **Figma 변수 → figma-sync → build.py** 순서. `tokens.css` 를 손으로 고치지 않는다.
5. CSS 수정 후에는 미리보기 HTML 을 브라우저로 렌더해 Figma 스크린샷과 나란히 비교한다.
6. **양방향 동기화** — `ds` 폴더를 고치면 같은 작업 안에서 Figma 도 고치고, Figma 를 고치면 `ds` 도 고친다. 작업 시작 전 `figma-sync check` 로 이미 어긋난 곳이 없는지 확인한다.

### Figma
1. 정식 COMPONENT_SET, 변형 이름은 `축=값`(소문자 시작 camelCase 값). 프로퍼티는 TEXT / BOOLEAN / INSTANCE_SWAP.
   - 프로퍼티 쌍 관행: `prefix icon`(BOOLEAN) + `prefix`(INSTANCE_SWAP).
   - INSTANCE_SWAP 기본값은 컴포넌트 key 가 아니라 **노드 ID 문자열**.
   - 변형마다 다른 기본값이 필요한 슬롯은 프로퍼티로 만들지 않는다(프로퍼티 기본값은 세트 전역).
2. 새 변수는 Web code syntax `var(--ybm-…)` 와 scopes 를 반드시 지정한다.
3. 변수·텍스트 스타일 삭제 전에는 전체 노드의 `boundVariables` / `textStyleId` 를 스캔해 사용처 0건을 확인한다.
4. 로컬 스타일은 **텍스트 스타일만**. 이펙트·컬러·그리드 스타일 금지.
5. 대량 작업은 소수 샘플 → 스크린샷 비교 → 승인 후 일괄.
6. 컴포넌트 섹션 배치: 박스 안쪽 여백 32 · 변형 간격 80 · 세트 사이 240.
7. 문서·설명·코드 어디에도 외부 레퍼런스 DS 의 이름·출처 링크·비교 문구를 넣지 않는다.

### Plugin API 함정 (자주 걸리는 것)
- 텍스트를 건드리거나 노드를 옮기기 전에 Pretendard Regular/Medium/SemiBold/Bold 를 모두 `loadFontAsync`. 스타일 문자열은 `SemiBold`(공백 없음).
- 알파 있는 색 변수를 별칭의 별칭으로 paint 에 바인딩하면 alpha 가 적용되지 않을 수 있다 → 최종 alpha 를 `paint.opacity` 에 직접 넣는다.
- TEXT 프로퍼티를 붙이면 range 서식(부분 Bold·밑줄)이 초기화된다.
- 인스턴스 `setProperties` 키는 `label#1407:2` 처럼 접미사가 붙은 실제 키.
- `resize()` 는 sizing mode 를 FIXED 로 되돌린다 → hug 가 필요하면 resize 후 다시 `AUTO`.
- 섹션은 자동으로 커지지 않는다 → `resizeWithoutConstraints`. 섹션 자식 좌표는 섹션 기준.
- `figma.union/subtract` 는 page 직속에서 수행 후 옮긴다(부모 안에서 하면 좌표 이중 적용). `flatten()` 은 clone 에 시도.

---

## 11. 미구현 / 남은 항목
- Figma 컴포넌트 없음: Divider(CSS 만), Text Link · Code Input(CSS 전용)
- 미구현 컴포넌트: Time Picker, Attachment Field, Side Panel, Pull To Refresh, Content Placeholder, Result Section, Scroll Fog, Menu Sheet, List / List Item, Aspect Ratio, Image Frame, Page Banner
- Callout magic tone · pressed 변형(Figma), magic 시맨틱을 쓰는 컴포넌트 없음
- 시맨틱 텍스트 스타일(화면 제목·본문·주석 등 역할 이름) 미구현

---

## 12. 변경 이력 (주요)
| 날짜 | 내용 |
|---|---|
| 2026-10-21 | 폴더 재구성(`ds/` 루트 = `ybm-ds/` + `tokens/`). 명칭 **YBM Family → YBM** 일괄 변경 — Figma 컬렉션 `YBM Family DS` → `YBM DS`, 코드·주석·생성물 전부 |
| 2026-10-20 | 외부 레퍼런스 DS 관련 문구 전면 제거. figma-sync 파이프라인 도입 |
| 2026-10-02 | components.css 전 컴포넌트를 Figma 변형별 실측과 재정합. 로컬 스타일은 텍스트만 허용 |
| 2026-09-29 | lineHeight 전 단계 +2 |
| 2026-09-14 | 텍스트 스타일 전 단계 4웨이트(136개), t15~t17 추가. 이펙트 스타일 삭제 → 변수 직접 바인딩. `stroke/neutral` 신설 |
| 2026-09-09 | Elevation 2겹 5단계 개편, `chart/series-1~5` 신설, yellow 팔레트 교체 |
| 2026-09-04 | Shape 테마(기본/soft/sharp) + 곡률 노브 |
| 2026-08-27 | warning 시맨틱 orange 로 통일, 색 이름 시맨틱(orange-*) 삭제 |
| 2026-08-24 | Spacing 26단계 확장, Progress Circle · FAB · Chip Tabs · Field Button 추가 |
| 2026-08-19 | `--ybm-` 네이밍 통일, Lucide Solid 445개 자동 생성 |
