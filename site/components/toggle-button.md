<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/toggle-button.html -->

# Toggle Button

누를 때마다 켜짐과 꺼짐이 바뀌는 버튼입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button type="button" class="ds-toggle" aria-pressed="false" [data-size="medium"]>라벨</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | "알림 받기" 켜고 끄기처럼 한 가지 상태만 바꿀 때 씁니다. |
| **Do** | 고르기와 걸러 보기는 Chip, 바로 반영되는 설정은 Switch를 씁니다. 역할이 겹치지 않게 나눠 쓰세요. |
| **Don't** | 여러 개를 늘어놓고 하나를 고르게 만들지 마세요. 그럴 때는 Segmented Control을 씁니다. |

## 예시

```html
<button type="button" class="ds-toggle" aria-pressed="true">마감 임박</button><button type="button" class="ds-toggle" aria-pressed="false">무료 배송</button><button type="button" class="ds-toggle" aria-pressed="false" data-size="medium">medium</button>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-toggle-bg` | `var(--ds-color-bg-layer-default)` |
| `--ds-toggle-fg` | `var(--ds-color-fg-neutral)` |
| `--ds-toggle-line` | `var(--ds-color-stroke-neutral-weak)` |

### 크기와 여백

```
size: small(기본) / medium
Figma small: py6 px12 / t03 Bold / medium: py10 px16 / t04 Bold / shape/lg
  off bg/layer-default + stroke/neutral-weak / on bg/brand-weak + stroke/brand-solid + fg/brand / disabled bg/disabled + fg/disabled
```
