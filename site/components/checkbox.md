<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/checkbox.html -->

# Checkbox

여러 선택지 가운데 하나 이상을 선택할 때 쓰는 컴포넌트입니다. 약관 동의처럼 하나만 켜고 끌 때도 씁니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<label class="ds-checkbox" data-tone="neutral">
  <input type="checkbox" class="ds-checkbox__control">
  <span class="ds-checkbox__label">라벨</span>
</label>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | square ghost |
| 켜고 끄는 속성 | `tone` `size` |

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-checkbox-size` | `20px` |
| `--ds-checkbox-icon` | `12px` |
| `--ds-checkbox-checked-bg` | `var(--ybm-color-bg-brand-solid)` |
| `--ds-checkbox-checked-fg` | `var(--ybm-color-fg-on-brand-solid)` |
| `--ds-checkbox-line` | `var(--ybm-color-stroke-neutral-weak)` |
| `--ds-checkbox-mark` | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")` |

## 예시

```html
<label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">brand</span></label>
<label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">neutral</span></label>
<label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" data-indeterminate><span class="ds-checkbox__label">일부 선택</span></label>
<label class="ds-checkbox" data-variant="ghost"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">ghost</span></label>
<label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" disabled><span class="ds-checkbox__label">disabled</span></label>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
size: medium(기본 20) / large(24)   variant: square(기본) / ghost   tone: brand(기본) / neutral
indeterminate: input.indeterminate = true (스크립트) → 가로선
Figma: 행 min-h 32/36 / 위 6 / gap x2 / 박스 shape/xs / label t04/t05 fg/neutral
  unchecked bg/layer-default + 1px stroke/neutral-weak / checked neutral bg/neutral-solid + 체크 fg/on-neutral-solid
  brand bg/brand-solid + 체크 fg/on-brand-solid / disabled bg/disabled + stroke/neutral-muted
  disabledChecked bg/disabled + 체크 fg/disabled / ghost 박스 없이 체크 14 (미선택 fg/placeholder)
체크와 가로선은 아이콘 세트가 아닌 전용 그림(Figma "Checkbox Mark"): 24 기준 선 2.75 고정 비율 → 12px 1.375 / 14px 1.6
```
