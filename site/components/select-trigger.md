<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/select-trigger.html -->

# Select Trigger

목록에서 값 하나를 고르는 칸입니다. 누르면 Select Content가 열립니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="false" [data-size="medium"]>
  [<i class="ds-icon ds-icon--search" aria-hidden="true"></i>]
  <span class="ds-select__value" data-placeholder="선택해 주세요"></span>
</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` |

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-select-height` | `52px` |
| `--ds-select-padding-x` | `var(--ybm-space-x4)` |
| `--ds-select-gap` | `var(--ybm-space-x2_5)` |
| `--ds-select-radius` | `var(--ybm-shape-lg)` |
| `--ds-select-font-size` | `var(--ybm-font-size-t05)` |
| `--ds-select-line-height` | `var(--ybm-line-height-t05)` |
| `--ds-select-icon` | `20px` |
| `--ds-select-line` | `var(--ybm-color-stroke-neutral-weak)` |
| `--ds-select-line-width` | `1px` |
| `--ds-select-bg` | `var(--ybm-color-bg-transparent)` |

## 예시

```html
<button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="false"><span class="ds-select__value" data-placeholder="지역을 선택해 주세요"></span></button>
<button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="true" data-size="medium"><span class="ds-select__value">서울특별시</span></button>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
Figma large: h52 / px16 / gap10 / shape/lg / t05 / chevron 20 / medium: h40 / px14 / gap8 / shape/sm / t04 / chevron 16
       chevron fg/neutral(열림 = chevron-up) / invalid 1px critical / disabled/readOnly bg/disabled
```
