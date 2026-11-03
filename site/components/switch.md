<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/switch.html -->

# Switch

설정을 바로 켜고 끌 때 쓰는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<label class="ds-switch" data-size="24">
  <span class="ds-switch__label">알림 받기</span>
  <input type="checkbox" role="switch" class="ds-switch__control">
</label>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Label**`ds-switch__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Control**`ds-switch__control` | 실제로 값을 입력하거나 고르는 부분입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | 16 24 32 |
| 켜고 끄는 속성 | `tone` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 누르는 즉시 반영되는 설정에만 씁니다. |
| **Do** | 저장 버튼이 따로 있으면 Checkbox를 씁니다. |

## 예시

```html
<label class="ds-switch" data-size="16"><span class="ds-switch__label">16</span><input type="checkbox" role="switch" class="ds-switch__control" checked></label>
<label class="ds-switch"><span class="ds-switch__label">알림 받기</span><input type="checkbox" role="switch" class="ds-switch__control" checked></label>
<label class="ds-switch" data-size="32"><span class="ds-switch__label">32</span><input type="checkbox" role="switch" class="ds-switch__control"></label>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-switch-w` | `38px` |
| `--ds-switch-h` | `24px` |
| `--ds-switch-thumb` | `16px` |
| `--ds-switch-thumb-on` | `20px` |
| `--ds-switch-on` | `var(--ybm-color-bg-brand-solid)` |
| `--ds-switch-thumb-color` | `var(--ybm-color-palette-static-white)` |
| `--ds-switch-t` | `var(--ds-switch-thumb)` |

### 크기와 여백

```
size: 24(기본) / 16 / 32   tone: brand(기본) / neutral
Figma 16: 트랙 26×16 / 썸 10(켜짐 12) / gap x1_5 / label t03 Medium
       24: 트랙 38×24 / 썸 16(켜짐 20) / gap x2   / label t04 Medium
       32: 트랙 52×32 / 썸 21(켜짐 26) / gap x2_5 / label t05 Medium
  트랙 off palette/gray-600 / on bg/neutral-solid(neutral) / bg/brand-solid(brand)
  썸 fg/on-neutral-solid(neutral) / static-white(brand / checked 는 fg/on-brand-solid, 같은 값) + elevation raised
  disabled: 트랙 opacity .38 / 라벨 .58 / 썸 static-black-alpha-700
```
