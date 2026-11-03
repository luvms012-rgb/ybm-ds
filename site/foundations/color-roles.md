<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/color-roles.html -->

# Color

색은 정보의 위계와 상태, 브랜드를 구분해 보여 줍니다.

역할 색의 이름은 속성, 역할, 변형, 상태 네 조각으로 이어 붙입니다. `--ybm-color-bg-brand-solid-pressed`는 배경(속성), 브랜드(역할), 진한 면(변형), 눌렀을 때(상태)입니다.

## 속성

모든 역할 색은 세 가지 속성 가운데 하나로 시작합니다.

| 속성 | 쓰는 곳 |
| --- | --- |
| `bg` | 화면 전체나 부품의 바탕 |
| `fg` | 글자, 아이콘 같은 앞쪽 요소 |
| `stroke` | 경계를 나누는 선과 부품의 테두리 |

## 역할

속성 다음에 뜻을 나타내는 역할이 붙습니다. 같은 역할은 여러 속성에 걸쳐 함께 쓰여 화면 전체에서 같은 뜻으로 읽힙니다.

### Brand

브랜드 색은 브랜드와 이어지는 요소를 바로 알아보게 합니다. 화면에서 가장 중요한 동작 하나를 강조할 때도 씁니다.

`--ybm-color-fg-brand`

`--ybm-color-bg-brand-solid`

`--ybm-color-bg-brand-solid-pressed`

`--ybm-color-bg-brand-weak`

`--ybm-color-stroke-brand-solid`

### Neutral

기본 색은 대부분의 글과 바탕에 쓰는 색입니다. 가장 눈에 띄지는 않지만 늘 잘 보여야 하는 요소에 씁니다.

`--ybm-color-fg-neutral`

`--ybm-color-fg-neutral-muted`

`--ybm-color-fg-neutral-subtle`

`--ybm-color-fg-on-neutral-solid`

`--ybm-color-bg-neutral-solid`

`--ybm-color-bg-neutral-weak`

### Positive

성공 색은 끝난 일, 확인, 좋은 상태를 알립니다.

`--ybm-color-fg-positive`

`--ybm-color-fg-positive-contrast`

`--ybm-color-bg-positive-solid`

`--ybm-color-bg-positive-weak`

### Warning

주의 색은 마감 임박처럼 사용자가 한 번 더 살펴야 할 내용을 알립니다.

`--ybm-color-fg-warning`

`--ybm-color-fg-warning-contrast`

`--ybm-color-bg-warning-solid`

`--ybm-color-bg-warning-weak`

### Critical

오류 색은 실패, 삭제처럼 바로 주의를 끌어야 하는 문제를 알립니다.

`--ybm-color-fg-critical`

`--ybm-color-fg-critical-contrast`

`--ybm-color-bg-critical-solid`

`--ybm-color-bg-critical-weak`

### Informative

안내 색은 도움말과 상태 설명처럼 알아 두면 좋은 정보를 전합니다.

`--ybm-color-fg-informative`

`--ybm-color-fg-informative-contrast`

`--ybm-color-bg-informative-solid`

`--ybm-color-bg-informative-weak`

### Magic

AI 색은 AI 기능과 새 기능을 다른 기능과 구분해 보여 줍니다.

`--ybm-color-fg-magic`

`--ybm-color-bg-magic-solid`

`--ybm-color-bg-magic-weak`

`--ybm-color-stroke-magic-solid`

### Layer

면 색은 화면의 깊이와 겹침을 나눕니다. 화면 바탕, 기본 면, 떠 있는 면 순서로 위에 놓입니다.

`--ybm-color-bg-canvas`

`--ybm-color-bg-layer-default`

`--ybm-color-bg-layer-floating`

`--ybm-color-bg-overlay`

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
| `--ybm-color-bg-brand-solid` 브랜드 진한 면 배경입니다. | `palette-brand-600` |
| `--ybm-color-bg-brand-solid-pressed` 브랜드 진한 면 배경, 눌렀을 때입니다. | `palette-brand-700` |
| `--ybm-color-bg-brand-weak` 브랜드 옅은 면 배경입니다. | `palette-brand-100` |
| `--ybm-color-bg-brand-weak-pressed` 브랜드 옅은 면 배경, 눌렀을 때입니다. | `palette-brand-200` |
| `--ybm-color-bg-canvas` 화면 바탕 배경입니다. | `palette-gray-100` |
| `--ybm-color-bg-critical-solid` 오류 진한 면 배경입니다. | `palette-red-700` |
| `--ybm-color-bg-critical-solid-pressed` 오류 진한 면 배경, 눌렀을 때입니다. | `palette-red-800` |
| `--ybm-color-bg-critical-weak` 오류 옅은 면 배경입니다. | `palette-red-100` |
| `--ybm-color-bg-critical-weak-pressed` 오류 옅은 면 배경, 눌렀을 때입니다. | `palette-red-200` |
| `--ybm-color-bg-disabled` 꺼짐 배경입니다. | `palette-gray-200` |
| `--ybm-color-bg-informative-solid` 안내 진한 면 배경입니다. | `palette-blue-700` |
| `--ybm-color-bg-informative-solid-pressed` 안내 진한 면 배경, 눌렀을 때입니다. | `palette-blue-800` |
| `--ybm-color-bg-informative-weak` 안내 옅은 면 배경입니다. | `palette-blue-100` |
| `--ybm-color-bg-informative-weak-pressed` 안내 옅은 면 배경, 눌렀을 때입니다. | `palette-blue-200` |
| `--ybm-color-bg-layer-default` 면 기본 배경입니다. | `palette-gray-00` |
| `--ybm-color-bg-layer-floating` 면 떠 있는 면 배경입니다. | `palette-gray-00` |
| `--ybm-color-bg-magic-solid` AI 진한 면 배경입니다. | `palette-purple-700` |
| `--ybm-color-bg-magic-solid-pressed` AI 진한 면 배경, 눌렀을 때입니다. | `palette-purple-800` |
| `--ybm-color-bg-magic-weak` AI 옅은 면 배경입니다. | `palette-purple-100` |
| `--ybm-color-bg-magic-weak-pressed` AI 옅은 면 배경, 눌렀을 때입니다. | `palette-purple-200` |
| `--ybm-color-bg-neutral` 기본 배경입니다. | `palette-gray-200` |
| `--ybm-color-bg-neutral-inverted` 기본 반전 배경입니다. | `palette-gray-900` |
| `--ybm-color-bg-neutral-inverted-pressed` 기본 반전 배경, 눌렀을 때입니다. | `palette-gray-800` |
| `--ybm-color-bg-neutral-muted` 기본 한 단계 흐린 배경입니다. | `palette-gray-100` |
| `--ybm-color-bg-neutral-solid` 기본 진한 면 배경입니다. | `palette-gray-900` |
| `--ybm-color-bg-neutral-solid-pressed` 기본 진한 면 배경, 눌렀을 때입니다. | `palette-gray-800` |
| `--ybm-color-bg-neutral-subtle` 기본 두 단계 흐린 배경입니다. | `palette-gray-00` |
| `--ybm-color-bg-neutral-weak-alpha` 기본 옅은 반투명 면 배경입니다. | `palette-static-black-alpha-200` |
| `--ybm-color-bg-neutral-weak-alpha-pressed` 기본 옅은 반투명 면 배경, 눌렀을 때입니다. | `palette-static-black-alpha-300` |
| `--ybm-color-bg-neutral-weak-pressed` 기본 옅은 면 배경, 눌렀을 때입니다. | `palette-gray-300` |
| `--ybm-color-bg-overlay` 덮개 배경입니다. | `palette-static-black-alpha-700` |
| `--ybm-color-bg-positive-solid` 성공 진한 면 배경입니다. | `palette-green-700` |
| `--ybm-color-bg-positive-solid-pressed` 성공 진한 면 배경, 눌렀을 때입니다. | `palette-green-800` |
| `--ybm-color-bg-positive-weak` 성공 옅은 면 배경입니다. | `palette-green-100` |
| `--ybm-color-bg-positive-weak-pressed` 성공 옅은 면 배경, 눌렀을 때입니다. | `palette-green-200` |
| `--ybm-color-bg-transparent` 투명 배경입니다. | `transparent` |
| `--ybm-color-bg-transparent-pressed` 투명 배경, 눌렀을 때입니다. | `palette-static-black-alpha-200` |
| `--ybm-color-bg-warning-solid` 주의 진한 면 배경입니다. | `palette-orange-700` |
| `--ybm-color-bg-warning-solid-pressed` 주의 진한 면 배경, 눌렀을 때입니다. | `palette-orange-800` |
| `--ybm-color-bg-warning-weak` 주의 옅은 면 배경입니다. | `palette-orange-100` |
| `--ybm-color-bg-warning-weak-pressed` 주의 옅은 면 배경, 눌렀을 때입니다. | `palette-orange-200` |

### 글자와 아이콘

| 토큰 | 값 |
| --- | --- |
| `--ybm-color-fg-brand` 브랜드 글자와 아이콘입니다. | `palette-brand-600` |
| `--ybm-color-fg-brand-contrast` 브랜드 더 진한 글자와 아이콘입니다. | `palette-brand-700` |
| `--ybm-color-fg-critical` 오류 글자와 아이콘입니다. | `palette-red-700` |
| `--ybm-color-fg-critical-contrast` 오류 더 진한 글자와 아이콘입니다. | `palette-red-900` |
| `--ybm-color-fg-disabled` 꺼짐 글자와 아이콘입니다. | `palette-gray-500` |
| `--ybm-color-fg-informative` 안내 글자와 아이콘입니다. | `palette-blue-700` |
| `--ybm-color-fg-informative-contrast` 안내 더 진한 글자와 아이콘입니다. | `palette-blue-900` |
| `--ybm-color-fg-magic` AI 글자와 아이콘입니다. | `palette-purple-700` |
| `--ybm-color-fg-magic-contrast` AI 더 진한 글자와 아이콘입니다. | `palette-purple-900` |
| `--ybm-color-fg-neutral` 기본 글자와 아이콘입니다. | `palette-gray-1000` |
| `--ybm-color-fg-neutral-inverted` 기본 반전 글자와 아이콘입니다. | `palette-gray-00` |
| `--ybm-color-fg-neutral-muted` 기본 한 단계 흐린 글자와 아이콘입니다. | `palette-gray-800` |
| `--ybm-color-fg-neutral-subtle` 기본 두 단계 흐린 글자와 아이콘입니다. | `palette-gray-700` |
| `--ybm-color-fg-on-brand-solid` 브랜드 진한 면 위의 글자와 아이콘입니다. | `palette-static-white` |
| `--ybm-color-fg-on-critical-solid` 오류 진한 면 위의 글자와 아이콘입니다. | `palette-static-white` |
| `--ybm-color-fg-on-informative-solid` 안내 진한 면 위의 글자와 아이콘입니다. | `palette-static-white` |
| `--ybm-color-fg-on-magic-solid` AI 진한 면 위의 글자와 아이콘입니다. | `palette-static-white` |
| `--ybm-color-fg-on-neutral-solid` 기본 진한 면 위의 글자와 아이콘입니다. | `palette-gray-00` |
| `--ybm-color-fg-on-positive-solid` 성공 진한 면 위의 글자와 아이콘입니다. | `palette-static-white` |
| `--ybm-color-fg-on-warning-solid` 주의 진한 면 위의 글자와 아이콘입니다. | `palette-static-white` |
| `--ybm-color-fg-placeholder` 입력 전 안내 글자 글자와 아이콘입니다. | `palette-gray-600` |
| `--ybm-color-fg-positive` 성공 글자와 아이콘입니다. | `palette-green-700` |
| `--ybm-color-fg-positive-contrast` 성공 더 진한 글자와 아이콘입니다. | `palette-green-900` |
| `--ybm-color-fg-warning` 주의 글자와 아이콘입니다. | `palette-orange-700` |
| `--ybm-color-fg-warning-contrast` 주의 더 진한 글자와 아이콘입니다. | `palette-orange-900` |

### 테두리

| 토큰 | 값 |
| --- | --- |
| `--ybm-color-stroke-brand-solid` 브랜드 진한 면 테두리입니다. | `palette-brand-700` |
| `--ybm-color-stroke-brand-weak` 브랜드 옅은 면 테두리입니다. | `palette-brand-300` |
| `--ybm-color-stroke-critical-solid` 오류 진한 면 테두리입니다. | `palette-red-700` |
| `--ybm-color-stroke-critical-weak` 오류 옅은 면 테두리입니다. | `palette-red-300` |
| `--ybm-color-stroke-focus-ring` 포커스 고리 테두리입니다. | `palette-blue-600` |
| `--ybm-color-stroke-informative-solid` 안내 진한 면 테두리입니다. | `palette-blue-700` |
| `--ybm-color-stroke-informative-weak` 안내 옅은 면 테두리입니다. | `palette-blue-300` |
| `--ybm-color-stroke-magic-solid` AI 진한 면 테두리입니다. | `palette-purple-700` |
| `--ybm-color-stroke-magic-weak` AI 옅은 면 테두리입니다. | `palette-purple-300` |
| `--ybm-color-stroke-neutral` 기본 테두리입니다. | `palette-gray-500` |
| `--ybm-color-stroke-neutral-contrast` 기본 더 진한 테두리입니다. | `palette-gray-1000` |
| `--ybm-color-stroke-neutral-muted` 기본 한 단계 흐린 테두리입니다. | `palette-static-black-alpha-300` |
| `--ybm-color-stroke-neutral-solid` 기본 진한 면 테두리입니다. | `palette-gray-800` |
| `--ybm-color-stroke-neutral-subtle` 기본 두 단계 흐린 테두리입니다. | `palette-static-black-alpha-200` |
| `--ybm-color-stroke-neutral-weak` 기본 옅은 면 테두리입니다. | `palette-gray-400` |
| `--ybm-color-stroke-positive-solid` 성공 진한 면 테두리입니다. | `palette-green-700` |
| `--ybm-color-stroke-positive-weak` 성공 옅은 면 테두리입니다. | `palette-green-300` |
| `--ybm-color-stroke-warning-solid` 주의 진한 면 테두리입니다. | `palette-orange-700` |
| `--ybm-color-stroke-warning-weak` 주의 옅은 면 테두리입니다. | `palette-orange-300` |
