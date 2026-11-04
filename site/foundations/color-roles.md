<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/color-roles.html -->

# Color

색은 정보의 위계와 상태, 브랜드를 구분해 보여 줍니다.

역할 색의 이름은 속성, 역할, 변형, 상태 네 조각으로 이어 붙입니다. `--ds-color-bg-brand-solid-pressed`는 배경(속성), 브랜드(역할), 진한 면(변형), 눌렀을 때(상태)입니다.

## 속성

모든 역할 색은 세 가지 속성 가운데 하나로 시작합니다.

| 속성 | 쓰는 곳 |
| --- | --- |
| `bg` | 화면 전체나 부품의 바탕 |
| `fg` | 글자, 아이콘 같은 앞쪽 요소 |
| `stroke` | 경계를 나누는 선과 부품의 테두리 |

## 역할

속성 다음에는 뜻을 나타내는 역할이 붙습니다. 같은 역할은 배경, 글자, 테두리에 함께 쓰여 어디서나 같은 뜻으로 읽힙니다.

### Brand

브랜드 색은 브랜드와 이어지는 요소를 바로 알아보게 합니다. 화면에서 가장 중요한 동작 하나를 강조할 때도 씁니다.

| 토큰 | 값 |
| --- | --- |
| `--ds-color-fg-brand` | `#2563eb / #3b82f6` |
| `--ds-color-bg-brand-solid` | `#2563eb / #3b82f6` |
| `--ds-color-bg-brand-solid-pressed` | `#1d4ed8 / #60a5fa` |
| `--ds-color-bg-brand-weak` | `#dbeafe / #172554` |
| `--ds-color-stroke-brand-solid` | `#1d4ed8 / #60a5fa` |

### Neutral

기본 색은 대부분의 글과 바탕에 쓰는 색입니다. 가장 눈에 띄지는 않지만 늘 잘 보여야 하는 요소에 씁니다.

| 토큰 | 값 |
| --- | --- |
| `--ds-color-fg-neutral` | `#1a1c20 / #f3f4f5` |
| `--ds-color-fg-neutral-muted` | `#555d6d / #dcdee3` |
| `--ds-color-fg-neutral-subtle` | `#868b94 / #b0b3ba` |
| `--ds-color-fg-on-neutral-solid` | `#ffffff / #16171b` |
| `--ds-color-bg-neutral-solid` | `#2a3038 / #f3f4f5` |
| `--ds-color-bg-neutral` | `#f3f4f5 / #2b2e35` |
| `--ds-color-bg-neutral-weak-alpha` | `#0000000c / #ffffff20` |

### Positive

성공 색은 끝난 일, 확인, 좋은 상태를 알립니다.

| 토큰 | 값 |
| --- | --- |
| `--ds-color-fg-positive` | `#079171 / #22b27f` |
| `--ds-color-fg-positive-contrast` | `#075445 / #93e5c0` |
| `--ds-color-bg-positive-solid` | `#079171 / #117956` |
| `--ds-color-bg-positive-weak` | `#edfaf6 / #202926` |

### Warning

주의 색은 마감 임박처럼 사용자가 한 번 더 살펴야 할 내용을 알립니다.

| 토큰 | 값 |
| --- | --- |
| `--ds-color-fg-warning` | `#e14d00 / #ff6600` |
| `--ds-color-fg-warning-contrast` | `#862b00 / #eecebc` |
| `--ds-color-bg-warning-solid` | `#e14d00 / #e65200` |
| `--ds-color-bg-warning-weak` | `#fff2ec / #31241f` |

### Critical

오류 색은 실패, 삭제처럼 바로 주의를 끌어야 하는 문제를 알립니다.

| 토큰 | 값 |
| --- | --- |
| `--ds-color-fg-critical` | `#fa342c / #ff6e60` |
| `--ds-color-fg-critical-contrast` | `#921708 / #f8c5c3` |
| `--ds-color-bg-critical-solid` | `#fa342c / #f73526` |
| `--ds-color-bg-critical-weak` | `#fdf0f0 / #322323` |

### Informative

안내 색은 도움말과 상태 설명처럼 알아 두면 좋은 정보를 전합니다.

| 토큰 | 값 |
| --- | --- |
| `--ds-color-fg-informative` | `#217cf9 / #41a2f9` |
| `--ds-color-fg-informative-contrast` | `#0b4596 / #b9d7fb` |
| `--ds-color-bg-informative-solid` | `#217cf9 / #1e82eb` |
| `--ds-color-bg-informative-weak` | `#eff6ff / #202742` |

### Magic

AI 색은 AI 기능과 새 기능을 다른 기능과 구분해 보여 줍니다.

| 토큰 | 값 |
| --- | --- |
| `--ds-color-fg-magic` | `#8969ea / #9179e0` |
| `--ds-color-bg-magic-solid` | `#8969ea / #7659bd` |
| `--ds-color-bg-magic-weak` | `#f5f3fe / #201a2e` |
| `--ds-color-stroke-magic-solid` | `#8969ea / #9179e0` |

### Layer

면 색은 화면의 깊이와 겹침을 나눕니다. 화면 바탕, 기본 면, 떠 있는 면 순서로 위에 놓입니다.

| 토큰 | 값 |
| --- | --- |
| `--ds-color-bg-canvas` | `#f7f8f9 / #000000` |
| `--ds-color-bg-layer-default` | `#ffffff / #16171b` |
| `--ds-color-bg-layer-floating` | `#ffffff / #1d2025` |
| `--ds-color-bg-overlay` | `#00000074` |

## 변형

같은 역할이라도 강조 정도에 따라 변형을 고릅니다. 예를 들어 성공 배경은 옅은 `bg-positive-weak`와 진한 `bg-positive-solid`가 있습니다.

| 변형 | 뜻 |
| --- | --- |
| `solid` | 진한 면입니다. 가장 강하게 눈에 띕니다. |
| `weak` | 옅은 면입니다. 넓은 영역에 써도 부담이 적습니다. |
| `muted`, `subtle` | 한 단계, 두 단계 흐린 글자와 선입니다. |
| `contrast` | 옅은 면 위에서도 읽히는 더 진한 글자입니다. |
| `on-[역할]-solid` | 진한 면 위에 올리는 글자와 아이콘입니다. |

## 상태

부품의 상태에 따라 색이 바뀝니다. 눌렀을 때는 끝에 `-pressed`가 붙은 색을 쓰고, 꺼진 부품은 `bg-disabled`, `fg-disabled`를 씁니다.

## 토큰

값의 앞 견본은 라이트 모드, 뒤 견본은 다크 모드입니다.

### 배경

| 토큰 | 값 |
| --- | --- |
| `--ds-color-bg-brand-solid` 브랜드 진한 면 배경입니다. | `#2563eb / #3b82f6` |
| `--ds-color-bg-brand-solid-pressed` 브랜드 진한 면 배경, 눌렀을 때입니다. | `#1d4ed8 / #60a5fa` |
| `--ds-color-bg-brand-weak` 브랜드 옅은 면 배경입니다. | `#dbeafe / #172554` |
| `--ds-color-bg-brand-weak-pressed` 브랜드 옅은 면 배경, 눌렀을 때입니다. | `#bfdbfe / #1e3a8a` |
| `--ds-color-bg-canvas` 화면 바탕 배경입니다. | `#f7f8f9 / #000000` |
| `--ds-color-bg-critical-solid` 오류 진한 면 배경입니다. | `#fa342c / #f73526` |
| `--ds-color-bg-critical-solid-pressed` 오류 진한 면 배경, 눌렀을 때입니다. | `#ca1d13 / #ff6e60` |
| `--ds-color-bg-critical-weak` 오류 옅은 면 배경입니다. | `#fdf0f0 / #322323` |
| `--ds-color-bg-critical-weak-pressed` 오류 옅은 면 배경, 눌렀을 때입니다. | `#fde7e7 / #4f2624` |
| `--ds-color-bg-disabled` 꺼짐 배경입니다. | `#f3f4f5 / #2b2e35` |
| `--ds-color-bg-informative-solid` 안내 진한 면 배경입니다. | `#217cf9 / #1e82eb` |
| `--ds-color-bg-informative-solid-pressed` 안내 진한 면 배경, 눌렀을 때입니다. | `#135fcd / #41a2f9` |
| `--ds-color-bg-informative-weak` 안내 옅은 면 배경입니다. | `#eff6ff / #202742` |
| `--ds-color-bg-informative-weak-pressed` 안내 옅은 면 배경, 눌렀을 때입니다. | `#e2edfc / #1e3352` |
| `--ds-color-bg-layer-default` 면 기본 배경입니다. | `#ffffff / #16171b` |
| `--ds-color-bg-layer-floating` 면 떠 있는 면 배경입니다. | `#ffffff / #1d2025` |
| `--ds-color-bg-magic-solid` AI 진한 면 배경입니다. | `#8969ea / #7659bd` |
| `--ds-color-bg-magic-solid-pressed` AI 진한 면 배경, 눌렀을 때입니다. | `#6d50cb / #9179e0` |
| `--ds-color-bg-magic-weak` AI 옅은 면 배경입니다. | `#f5f3fe / #201a2e` |
| `--ds-color-bg-magic-weak-pressed` AI 옅은 면 배경, 눌렀을 때입니다. | `#efeafe / #2b2140` |
| `--ds-color-bg-neutral` 기본 배경입니다. | `#f3f4f5 / #2b2e35` |
| `--ds-color-bg-neutral-inverted` 기본 반전 배경입니다. | `#2a3038 / #f3f4f5` |
| `--ds-color-bg-neutral-inverted-pressed` 기본 반전 배경, 눌렀을 때입니다. | `#555d6d / #dcdee3` |
| `--ds-color-bg-neutral-muted` 기본 한 단계 흐린 배경입니다. | `#f7f8f9 / #1d2025` |
| `--ds-color-bg-neutral-solid` 기본 진한 면 배경입니다. | `#2a3038 / #f3f4f5` |
| `--ds-color-bg-neutral-solid-pressed` 기본 진한 면 배경, 눌렀을 때입니다. | `#555d6d / #dcdee3` |
| `--ds-color-bg-neutral-subtle` 기본 두 단계 흐린 배경입니다. | `#ffffff / #16171b` |
| `--ds-color-bg-neutral-weak-alpha` 기본 옅은 반투명 면 배경입니다. | `#0000000c / #ffffff20` |
| `--ds-color-bg-neutral-weak-alpha-pressed` 기본 옅은 반투명 면 배경, 눌렀을 때입니다. | `#00000010 / #ffffff2e` |
| `--ds-color-bg-neutral-weak-pressed` 기본 옅은 면 배경, 눌렀을 때입니다. | `#eeeff1 / #393d46` |
| `--ds-color-bg-overlay` 덮개 배경입니다. | `#00000074` |
| `--ds-color-bg-positive-solid` 성공 진한 면 배경입니다. | `#079171 / #117956` |
| `--ds-color-bg-positive-solid-pressed` 성공 진한 면 배경, 눌렀을 때입니다. | `#00745f / #1b946d` |
| `--ds-color-bg-positive-weak` 성공 옅은 면 배경입니다. | `#edfaf6 / #202926` |
| `--ds-color-bg-positive-weak-pressed` 성공 옅은 면 배경, 눌렀을 때입니다. | `#d9f6e9 / #20362e` |
| `--ds-color-bg-transparent` 투명 배경입니다. | `transparent` |
| `--ds-color-bg-transparent-pressed` 투명 배경, 눌렀을 때입니다. | `#0000000c / #ffffff20` |
| `--ds-color-bg-warning-solid` 주의 진한 면 배경입니다. | `#e14d00 / #e65200` |
| `--ds-color-bg-warning-solid-pressed` 주의 진한 면 배경, 눌렀을 때입니다. | `#b93901 / #ff6600` |
| `--ds-color-bg-warning-weak` 주의 옅은 면 배경입니다. | `#fff2ec / #31241f` |
| `--ds-color-bg-warning-weak-pressed` 주의 옅은 면 배경, 눌렀을 때입니다. | `#ffe8db / #4b291c` |

### 글자와 아이콘

| 토큰 | 값 |
| --- | --- |
| `--ds-color-fg-brand` 브랜드 글자와 아이콘입니다. | `#2563eb / #3b82f6` |
| `--ds-color-fg-brand-contrast` 브랜드 더 진한 글자와 아이콘입니다. | `#1d4ed8 / #60a5fa` |
| `--ds-color-fg-critical` 오류 글자와 아이콘입니다. | `#fa342c / #ff6e60` |
| `--ds-color-fg-critical-contrast` 오류 더 진한 글자와 아이콘입니다. | `#921708 / #f8c5c3` |
| `--ds-color-fg-disabled` 꺼짐 글자와 아이콘입니다. | `#d1d3d8 / #5b606a` |
| `--ds-color-fg-informative` 안내 글자와 아이콘입니다. | `#217cf9 / #41a2f9` |
| `--ds-color-fg-informative-contrast` 안내 더 진한 글자와 아이콘입니다. | `#0b4596 / #b9d7fb` |
| `--ds-color-fg-magic` AI 글자와 아이콘입니다. | `#8969ea / #9179e0` |
| `--ds-color-fg-magic-contrast` AI 더 진한 글자와 아이콘입니다. | `#50379b / #d3c7fb` |
| `--ds-color-fg-neutral` 기본 글자와 아이콘입니다. | `#1a1c20 / #f3f4f5` |
| `--ds-color-fg-neutral-inverted` 기본 반전 글자와 아이콘입니다. | `#ffffff / #16171b` |
| `--ds-color-fg-neutral-muted` 기본 한 단계 흐린 글자와 아이콘입니다. | `#555d6d / #dcdee3` |
| `--ds-color-fg-neutral-subtle` 기본 두 단계 흐린 글자와 아이콘입니다. | `#868b94 / #b0b3ba` |
| `--ds-color-fg-on-brand-solid` 브랜드 진한 면 위의 글자와 아이콘입니다. | `#ffffff` |
| `--ds-color-fg-on-critical-solid` 오류 진한 면 위의 글자와 아이콘입니다. | `#ffffff` |
| `--ds-color-fg-on-informative-solid` 안내 진한 면 위의 글자와 아이콘입니다. | `#ffffff` |
| `--ds-color-fg-on-magic-solid` AI 진한 면 위의 글자와 아이콘입니다. | `#ffffff` |
| `--ds-color-fg-on-neutral-solid` 기본 진한 면 위의 글자와 아이콘입니다. | `#ffffff / #16171b` |
| `--ds-color-fg-on-positive-solid` 성공 진한 면 위의 글자와 아이콘입니다. | `#ffffff` |
| `--ds-color-fg-on-warning-solid` 주의 진한 면 위의 글자와 아이콘입니다. | `#ffffff` |
| `--ds-color-fg-placeholder` 입력 전 안내 글자 글자와 아이콘입니다. | `#b0b3ba / #868b94` |
| `--ds-color-fg-positive` 성공 글자와 아이콘입니다. | `#079171 / #22b27f` |
| `--ds-color-fg-positive-contrast` 성공 더 진한 글자와 아이콘입니다. | `#075445 / #93e5c0` |
| `--ds-color-fg-warning` 주의 글자와 아이콘입니다. | `#e14d00 / #ff6600` |
| `--ds-color-fg-warning-contrast` 주의 더 진한 글자와 아이콘입니다. | `#862b00 / #eecebc` |

### 테두리

| 토큰 | 값 |
| --- | --- |
| `--ds-color-stroke-brand-solid` 브랜드 진한 면 테두리입니다. | `#1d4ed8 / #60a5fa` |
| `--ds-color-stroke-brand-weak` 브랜드 옅은 면 테두리입니다. | `#93c5fd / #1e40af` |
| `--ds-color-stroke-critical-solid` 오류 진한 면 테두리입니다. | `#fa342c / #ff6e60` |
| `--ds-color-stroke-critical-weak` 오류 옅은 면 테두리입니다. | `#fed4d2 / #742826` |
| `--ds-color-stroke-focus-ring` 포커스 고리 테두리입니다. | `#5e98fe / #1e82eb` |
| `--ds-color-stroke-informative-solid` 안내 진한 면 테두리입니다. | `#217cf9 / #41a2f9` |
| `--ds-color-stroke-informative-weak` 안내 옅은 면 테두리입니다. | `#cbdffa / #1a4275` |
| `--ds-color-stroke-magic-solid` AI 진한 면 테두리입니다. | `#8969ea / #9179e0` |
| `--ds-color-stroke-magic-weak` AI 옅은 면 테두리입니다. | `#e1d8ff / #392a57` |
| `--ds-color-stroke-neutral` 기본 테두리입니다. | `#d1d3d8 / #5b606a` |
| `--ds-color-stroke-neutral-contrast` 기본 더 진한 테두리입니다. | `#1a1c20 / #f3f4f5` |
| `--ds-color-stroke-neutral-muted` 기본 한 단계 흐린 테두리입니다. | `#00000010 / #ffffff17` |
| `--ds-color-stroke-neutral-solid` 기본 진한 면 테두리입니다. | `#555d6d / #dcdee3` |
| `--ds-color-stroke-neutral-subtle` 기본 두 단계 흐린 테두리입니다. | `#0000000c / #ffffff0d` |
| `--ds-color-stroke-neutral-weak` 기본 옅은 면 테두리입니다. | `#dcdee3 / #393d46` |
| `--ds-color-stroke-positive-solid` 성공 진한 면 테두리입니다. | `#079171 / #22b27f` |
| `--ds-color-stroke-positive-weak` 성공 옅은 면 테두리입니다. | `#b9e9d2 / #20493b` |
| `--ds-color-stroke-warning-solid` 주의 진한 면 테두리입니다. | `#e14d00 / #ff6600` |
| `--ds-color-stroke-warning-weak` 주의 옅은 면 테두리입니다. | `#ffd5c0 / #6b311c` |
