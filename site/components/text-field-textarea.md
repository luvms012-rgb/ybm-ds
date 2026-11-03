<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/text-field-textarea.html -->

# Text Field Textarea

여러 줄의 긴 글을 입력하는 칸입니다. 글이 길어지면 칸도 함께 늘어납니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<textarea class="ds-textarea" data-size="medium" rows="3" placeholder="…"></textarea>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `variant` `size` |

## 예시

```html
<textarea class="ds-textarea" rows="3" placeholder="문의 내용을 입력해 주세요"></textarea>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-textarea-padding` | `var(--ybm-space-x3_5) var(--ybm-space-x4)` |
| `--ds-textarea-min-height` | `94px` |
| `--ds-textarea-radius` | `var(--ybm-shape-lg)` |
| `--ds-textarea-font-size` | `var(--ybm-font-size-t05)` |
| `--ds-textarea-line-height` | `var(--ybm-line-height-t05)` |
| `--ds-textarea-line` | `var(--ybm-color-stroke-neutral-weak)` |
| `--ds-textarea-line-width` | `1px` |

### 크기와 여백

```
variant : outline(기본) / underline      size : large(기본) / medium
Figma outline large : px16 / py14 / min-h94 / shape/lg / t05
      outline medium: px14 / py12 / min-h82 / shape/sm / t04
      underline large : py8+14 / min-h110 / t06 / 하단 1px / underline medium: py6+12 / min-h94 / t05
focused 1px stroke/neutral-contrast / invalid 1px stroke/critical-solid / disabled/readOnly bg/disabled
```
