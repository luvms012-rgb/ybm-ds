<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/progress.html -->

# Progress

작업이 얼마나 진행됐는지 막대로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
     style="--ds-progress-value: 40%" [data-tone="neutral"] [data-size="small"]></div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` `tone` |

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-progress-value` | `0%` |
| `--ds-progress-track` | `var(--ybm-color-palette-brand-200)` |
| `--ds-progress-range` | `var(--ybm-color-bg-brand-solid)` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | "3/10", "40%"처럼 값을 글자로 막대 위나 옆에 함께 적습니다. 막대만으로는 정확한 숫자가 전해지지 않습니다. |
| **Do** | 화면의 대표 진행률은 brand, 목록 안이나 보조 진행률은 neutral을 씁니다. |
| **Do** | 0%일 때도 바탕 막대(track)는 보여서 진행 막대라는 것을 알 수 있게 합니다. |
| **Do** | 화면 읽기 프로그램을 위해 role="progressbar"와 aria-valuenow, aria-valuemin, aria-valuemax를 붙이고, 라벨이 없으면 aria-label을 붙입니다. |

## 예시

```html
<div class="ds-progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" aria-label="진행률" style="--ds-progress-value: 40%"></div>
<div class="ds-progress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="진행률" style="--ds-progress-value: 75%" data-tone="neutral" data-size="small"></div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
tone: brand(기본) / neutral   size: medium(기본 8) / small 4
Figma: 트랙 palette/brand-200(neutral palette/gray-200) / 채움 bg/brand-solid(neutral bg/neutral-solid) / pill
```
