<!-- https://luvms012-rgb.github.io/yds/site/components/chip.html -->

# Chip

고르거나 입력한 값을 작게 묶어 보여 주는 컴포넌트입니다.

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

### 여러 조건을 함께 골라 거르기

함께 고를 수 있는 필터는 Chip으로 만들고, 고른 칩에는 `aria-pressed="true"`를 붙입니다. 하나만 골라 보이는 내용을 바꿀 때는 Chip Tabs를 씁니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 420px">
  <div class="u-flex u-wrap u-gap-2">
    <button type="button" class="ds-chip" aria-pressed="true">무료 배송</button>
    <button type="button" class="ds-chip" aria-pressed="false">오늘 출발</button>
    <button type="button" class="ds-chip" aria-pressed="true">할인 중</button>
    <button type="button" class="ds-chip" aria-pressed="false">평점 4점 이상</button>
  </div>
  <span class="ds-t04 ds-fg-subtle">상품 128개</span>
</div>
```

### 지금 값을 보여 주고 눌러서 바꾸기

값을 골라야 하는 필터는 칩에 지금 값과 아래 화살표를 함께 보여 줍니다. 누르면 Bottom Sheet나 Select Content를 열어 값을 바꿉니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 420px">
  <div class="u-flex u-wrap u-gap-2">
    <button type="button" class="ds-chip" data-variant="outlineWeak" data-layout="iconOnly" aria-label="필터"><i class="ds-icon ds-icon--sliders-horizontal" aria-hidden="true"></i></button>
    <button type="button" class="ds-chip" data-variant="outlineWeak" aria-haspopup="dialog">최근 3개월<i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i></button>
    <button type="button" class="ds-chip" data-variant="outlineWeak" aria-haspopup="dialog">배송 완료<i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i></button>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">무선 이어폰</span>
          <span class="ds-list-item__desc">11월 2일 주문</span>
        </span>
        <span class="ds-list-item__suffix">배송 완료</span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">보온 텀블러</span>
          <span class="ds-list-item__desc">10월 21일 주문</span>
        </span>
        <span class="ds-list-item__suffix">배송 완료</span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 적용한 조건을 모아 빼기 쉽게

적용한 조건은 오른쪽에 x 아이콘을 붙인 칩으로 모아 보여 주고, 누르면 그 조건이 빠집니다. 칩마다 `aria-label`로 무엇이 빠지는지 적습니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 420px">
  <div class="u-flex u-center u-between">
    <span class="ds-t04 ds-fg-muted">적용한 조건 3개</span>
    <button class="ds-btn" data-variant="ghost" data-size="xsmall">모두 지우기</button>
  </div>
  <div class="u-flex u-wrap u-gap-2">
    <button type="button" class="ds-chip" data-variant="outlineStrong" data-size="small" aria-label="서울 조건 빼기">서울<i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    <button type="button" class="ds-chip" data-variant="outlineStrong" data-size="small" aria-label="1인실 조건 빼기">1인실<i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    <button type="button" class="ds-chip" data-variant="outlineStrong" data-size="small" aria-label="주차 가능 조건 빼기">주차 가능<i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
  </div>
</div>
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
