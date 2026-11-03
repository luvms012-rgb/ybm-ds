<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/text-field-input.html -->

# Text Field Input

한 줄 글자를 입력하는 칸입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-input" data-variant="outline" data-size="medium">
  [<i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>]
  [<span class="ds-input__prefix">https://</span>]
  <input class="ds-input__control" placeholder="플레이스홀더">
  [<span class="ds-input__suffix">cm</span>]
  [<button class="ds-input__clear" aria-label="지우기"></button>]
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Icon**`ds-input__icon` | 뜻을 빠르게 알려 주는 아이콘입니다. |
| **Prefix**`ds-input__prefix` | 앞에 붙는 아이콘이나 요소입니다. |
| **Control**`ds-input__control` | 실제로 값을 입력하거나 고르는 부분입니다. |
| **Suffix**`ds-input__suffix` | 뒤에 붙는 아이콘이나 요소입니다. |
| **Clear**`ds-input__clear` | 입력한 값을 지우는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | outline underline |
| 켜고 끄는 속성 | `size` |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 값 지우기 (노출/숨김은 CSS 가 처리)

## 예시

```html
<div class="ds-input"><input class="ds-input__control" placeholder="underline · large"></div>
<div class="ds-input" data-variant="outline" data-size="medium"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" placeholder="outline · medium"></div>
<div class="ds-input" data-variant="outline"><input class="ds-input__control" value="비활성" disabled></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-input-height` | `44px` |
| `--ds-input-padding-x` | `0px` |
| `--ds-input-padding-y` | `var(--ybm-space-x2)` |
| `--ds-input-gap` | `var(--ybm-space-x2_5)` |
| `--ds-input-font-size` | `var(--ybm-font-size-t06)` |
| `--ds-input-line-height` | `var(--ybm-line-height-t06)` |
| `--ds-input-icon` | `24px` |
| `--ds-input-color` | `var(--ybm-color-fg-neutral)` |
| `--ds-input-bg` | `var(--ybm-color-bg-transparent)` |
| `--ds-input-radius` | `0px` |
| `--ds-input-line` | `var(--ybm-color-stroke-neutral-weak)` |
| `--ds-input-line-active` | `var(--ybm-color-stroke-neutral-contrast)` |
| `--ds-input-line-fade` | `var(--ybm-duration-normal) var(--ybm-easing-standard)` |

### 크기와 여백

```
variant : underline(기본) / outline      size : large(기본) / medium
Figma
  outline  large : h52 / px16 / gap10 / shape/lg / t05 / icon 20
  outline  medium: h40 / px14 / gap8  / shape/sm / t04 / icon 16
  underline large : py8 / min-h44 / gap10 / t06 / icon 24 / 하단 1px
  underline medium: py6 / min-h36 / gap8  / t05 / icon 20
  focused 1px stroke/neutral-contrast / invalid 1px stroke/critical-solid
  disabled (outline) bg/disabled / 글자 fg/disabled / readOnly (outline) bg/disabled
```
