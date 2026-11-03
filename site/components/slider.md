<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/slider.html -->

# Slider

막대를 끌어서 범위 안의 값을 정하는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<input type="range" class="ds-slider" min="0" max="100" value="45" [data-tone="brand"]>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `tone` |

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-slider-value` | `50%` |
| `--ds-slider-active` | `var(--ybm-color-bg-neutral-solid)` |
| `--ds-slider-thumb-line` | `var(--ybm-color-bg-neutral-solid)` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 누르는 영역은 손잡이뿐 아니라 막대 전체입니다. 막대를 누르면 그 자리로 바로 옮겨 갑니다. |
| **Do** | 값이 이어지는 슬라이더는 부드럽게 움직이고, 단계가 있는 슬라이더는 가장 가까운 단계에 맞춰 멈춥니다. |
| **Do** | 알맞은 기본값을 미리 넣어 사용자의 수고와 실수를 줄입니다. |
| **Do** | 움직이는 동안 지금 값을 보여 줍니다. |

## 예시

```html
<input type="range" class="ds-slider" min="0" max="100" value="45" aria-label="neutral"><input type="range" class="ds-slider" min="0" max="100" value="70" data-tone="brand" aria-label="brand">
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
tone: neutral(기본) / brand
채움 길이는 --ds-slider-value(0~100%) — ybm-ds.js 가 input 마다 자동으로 갱신한다.
Figma: 높이 20 / 트랙 4 pill palette/gray-200 / 채움 bg/neutral-solid(brand bg/brand-solid)
       썸 20 static-white + 1px 테두리(채움 색) + elevation raised
       disabled opacity .7 / 채움 bg/disabled / 썸 테두리 stroke/neutral-weak
```
