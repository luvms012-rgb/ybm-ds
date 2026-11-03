<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/chip.html -->

# Chip

고른 값이나 입력한 값을 작은 덩어리로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button type="button" class="ds-chip" aria-pressed="false">
  [<i class="ds-icon ds-icon--heart" aria-hidden="true"></i>] @naver.com [<i class="ds-icon ds-icon--chevron-down"></i>]
</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | solid outlineStrong outlineWeak |
| `layout` | iconOnly |
| 켜고 끄는 속성 | `size` |

## 예시

```html
<button type="button" class="ds-chip" aria-pressed="true">전체</button>
<button type="button" class="ds-chip" aria-pressed="false">할인</button>
<button type="button" class="ds-chip" data-variant="outlineStrong" aria-pressed="false">outlineStrong</button>
<button type="button" class="ds-chip" data-variant="outlineWeak" aria-pressed="false">@naver.com<i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i></button>
<button type="button" class="ds-chip" disabled>disabled</button>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-chip-height` | `36px` |
| `--ds-chip-padding-x` | `calc(var(--ds-space-x2) + var(--ds-space-x1_5))` |
| `--ds-chip-min-width` | `var(--ds-space-x12)` |
| `--ds-chip-icon` | `16px` |
| `--ds-chip-bg` | `var(--ds-color-bg-neutral-weak-alpha)` |
| `--ds-chip-fg` | `var(--ds-color-fg-neutral)` |
| `--ds-chip-line` | `transparent` |

### 크기와 여백

```
variant: solid(기본) / outlineStrong / outlineWeak   size: medium(기본 36) / small 32 / large 40
layout : 기본 withText / data-layout="iconOnly"      state: aria-pressed="true"(checked) / disabled
Figma: shape/pill / t04 Regular(large t05) / 좌우 12/14/16 / min-w 44/48/52 / 아이콘 14/16/16 / 아이콘↔라벨 x1_5
  solid bg/neutral-weak-alpha / outlineStrong bg/layer-default + stroke/neutral-weak / outlineWeak + stroke/neutral-muted
  checked(solid/outlineStrong) bg/neutral-solid + fg/on-neutral-solid SemiBold
  checked(outlineWeak) bg/neutral + stroke/neutral-contrast + fg/neutral Medium / disabled opacity .5
```
