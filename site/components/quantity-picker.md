<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/quantity-picker.html -->

# Quantity Picker

수량을 하나씩 늘리고 줄이는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-quantity" data-size="medium">
  <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
  <input class="ds-quantity__value" inputmode="numeric" value="1" aria-label="수량">
  <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Btn** `ds-quantity__btn` | 수량을 늘리거나 줄이는 버튼입니다. |
| **Value** `ds-quantity__value` | 지금 수량입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `layout` | fill |
| 켜고 끄는 속성 | `size` |

## 예시

### 가장 적은 수량에서는 줄이기 끄기

수량이 1이면 줄이기 버튼에 `disabled`를 붙입니다. 더 줄일 수 없다는 것을 누르기 전에 알 수 있습니다.

```html
<ul class="ds-list u-full" data-variant="inset" data-divider style="max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">영어 단어장 기본편</span>
        <span class="ds-list-item__desc">15,000원</span>
      </span>
      <div class="ds-quantity" data-size="small">
        <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기" disabled><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
        <input class="ds-quantity__value" inputmode="numeric" value="1" aria-label="영어 단어장 기본편 수량">
        <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
      </div>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">듣기 연습 문제집</span>
        <span class="ds-list-item__desc">36,000원</span>
      </span>
      <div class="ds-quantity" data-size="small">
        <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
        <input class="ds-quantity__value" inputmode="numeric" value="2" aria-label="듣기 연습 문제집 수량">
        <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
      </div>
    </div>
  </li>
</ul>
```

### 남은 수량을 넘기면 바로 알리기

재고보다 많이 넣으면 값 칸에 `aria-invalid="true"`를 붙이고 Field Label 오류 문구로 이유를 적습니다. 늘리기 버튼도 꺼서 더 올릴 수 없다는 것을 함께 보여 줍니다.

```html
<div class="ds-field u-full" style="max-width: 240px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="quantity-picker-ex2">수량</label>
  </div>
  <div class="ds-quantity" data-layout="fill">
    <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
    <input class="ds-quantity__value" id="quantity-picker-ex2" inputmode="numeric" value="5" aria-invalid="true" aria-describedby="quantity-picker-ex2-error">
    <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기" disabled><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">한 번에 10개까지 담을 수 있어요</p>
    <p class="ds-field__error" id="quantity-picker-ex2-error">남은 수량은 3개예요</p>
  </div>
</div>
```

### 구매 버튼 옆에서는 높이 맞추기

구매 버튼 옆에 둘 때는 버튼과 같은 높이인 `data-size="large"`를 씁니다. 높이가 같아야 한 줄로 읽히고 누를 자리도 넉넉합니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 375px">
  <div class="u-flex u-center u-between">
    <span class="ds-t04 ds-fg-muted">총 2개</span>
    <span class="ds-t06 ds-fw-bold">30,000원</span>
  </div>
  <div class="u-flex u-gap-2">
    <div class="ds-quantity" data-size="large">
      <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
      <input class="ds-quantity__value" inputmode="numeric" value="2" aria-label="수량">
      <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
    </div>
    <button type="button" class="ds-btn u-grow" data-size="large">바로 구매하기</button>
  </div>
</div>
```

## 규격

### 크기와 여백

```
size: medium(기본 40) / small 36 / large 52   layout: hug(기본) / data-layout="fill"
Figma: bg/layer-default / 1px stroke/neutral-weak / small/medium shape/sm / large shape/lg
       버튼 정사각(36/40/52) / 아이콘 16/18/22 fg/neutral / 값 min-w40 px8 / t05 Medium(large t06)
       disabled 아이콘/값 fg/disabled / invalid 1px stroke/critical-solid
```
