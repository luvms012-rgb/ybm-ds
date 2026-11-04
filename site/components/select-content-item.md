<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/select-content-item.html -->

# Select Content / Item

Select를 눌렀을 때 펼쳐지는 선택지 목록입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-select-content" role="listbox" [data-size="medium"]>
  <div class="ds-select-content__group" role="group" aria-labelledby="g1">
    <div class="ds-select-content__label" id="g1">최근 검색</div>
    <ul class="ds-select-list">
      <li><button class="ds-select-item" role="option" aria-selected="true">
            <span class="ds-select-item__body"><span class="ds-select-item__label">서울특별시</span>
            [<span class="ds-select-item__desc">보조 설명</span>]</span></button></li>
    </ul>
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Group**`ds-select-content__group` | 관련 항목을 묶는 영역입니다. |
| **Label**`ds-select-content__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Body**`ds-select-item__body` | 본문이 들어가는 영역입니다. |
| **Label**`ds-select-item__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Desc**`ds-select-item__desc` | 제목에 덧붙이는 설명 글입니다. |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 항목 이름은 짧은 명사로 씁니다. 동작이나 덧붙이는 설명은 이름에 넣지 않습니다. |
| **Do** | 선택 칸 폭에서 이름이 잘리지 않는지 확인하세요. |
| **Do** | 선택지는 한 가지 기준(많이 쓰는 순, 크기순, 시간순)으로 정렬합니다. 성격이 다른 선택지는 묶음으로 나누세요. |
| **Do** | 값을 고를 때는 Select, 동작을 실행할 때는 Menu를 씁니다. |
| **Don't** | "전체 선택"처럼 다른 선택지를 바꾸는 항목은 넣지 않습니다. 다만 하나만 고르는 칸에서 "없음"도 답이 될 수 있으면 넣습니다. |

## 예시

### 성격이 다른 선택지는 묶음으로 나누기

최근에 고른 장소와 다른 장소처럼 성격이 다른 선택지는 묶음 이름으로 나눕니다. 묶음 안에서는 가나다순처럼 한 가지 기준으로 늘어놓습니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="select-content-item-ex1-label">시험 장소</span>
  </div>
  <button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="true" aria-controls="select-content-item-ex1" aria-labelledby="select-content-item-ex1-label select-content-item-ex1-value"><span class="ds-select__value" id="select-content-item-ex1-value">서울 강남</span></button>
  <div class="ds-select-content" role="listbox" id="select-content-item-ex1" aria-labelledby="select-content-item-ex1-label">
    <div class="ds-select-content__group" role="group" aria-labelledby="select-content-item-ex1-g1">
      <div class="ds-select-content__label" id="select-content-item-ex1-g1">최근 고른 장소</div>
      <ul class="ds-select-list">
        <li><button type="button" class="ds-select-item" role="option" aria-selected="true"><span class="ds-select-item__body"><span class="ds-select-item__label">서울 강남</span></span></button></li>
        <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">서울 종로</span></span></button></li>
      </ul>
    </div>
    <div class="ds-select-content__group" role="group" aria-labelledby="select-content-item-ex1-g2">
      <div class="ds-select-content__label" id="select-content-item-ex1-g2">다른 장소</div>
      <ul class="ds-select-list">
        <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">광주 동구</span></span></button></li>
        <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">대구 중구</span></span></button></li>
        <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">대전 서구</span></span></button></li>
        <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">부산 진구</span></span></button></li>
      </ul>
    </div>
  </div>
</div>
```

### 이름은 짧게, 덧붙임은 보조 설명으로

항목 이름은 "3개월"처럼 짧은 명사로 쓰고, 가격 같은 덧붙임은 `ds-select-item__desc`로 내립니다. 기간이 짧은 것부터 한 가지 기준으로 늘어놓습니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="select-content-item-ex2-label">수강 기간</span>
  </div>
  <button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="true" aria-controls="select-content-item-ex2" aria-labelledby="select-content-item-ex2-label select-content-item-ex2-value"><span class="ds-select__value" id="select-content-item-ex2-value">3개월</span></button>
  <div class="ds-select-content" role="listbox" id="select-content-item-ex2" aria-labelledby="select-content-item-ex2-label">
    <ul class="ds-select-list">
      <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">1개월</span><span class="ds-select-item__desc">29,000원</span></span></button></li>
      <li><button type="button" class="ds-select-item" role="option" aria-selected="true"><span class="ds-select-item__body"><span class="ds-select-item__label">3개월</span><span class="ds-select-item__desc">79,000원, 한 달에 26,300원</span></span></button></li>
      <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">6개월</span><span class="ds-select-item__desc">139,000원, 한 달에 23,100원</span></span></button></li>
      <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">12개월</span><span class="ds-select-item__desc">239,000원, 한 달에 19,900원</span></span></button></li>
    </ul>
  </div>
</div>
```

### 안 고르는 것도 답이면 "선택 안 함" 넣기

쿠폰처럼 쓰지 않는 것도 답이 되는 칸에는 맨 위에 "선택 안 함"을 둡니다. 지금 쓸 수 없는 쿠폰은 `disabled`로 두고 이유를 보조 설명에 적습니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="select-content-item-ex3-label">쿠폰</span>
  </div>
  <button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="true" aria-controls="select-content-item-ex3" aria-labelledby="select-content-item-ex3-label select-content-item-ex3-value"><span class="ds-select__value" id="select-content-item-ex3-value">3,000원 할인 쿠폰</span></button>
  <div class="ds-select-content" role="listbox" id="select-content-item-ex3" aria-labelledby="select-content-item-ex3-label">
    <ul class="ds-select-list">
      <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">선택 안 함</span></span></button></li>
      <li><button type="button" class="ds-select-item" role="option" aria-selected="true"><span class="ds-select-item__body"><span class="ds-select-item__label">3,000원 할인 쿠폰</span><span class="ds-select-item__desc">11월 15일까지</span></span></button></li>
      <li><button type="button" class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">신규 가입 쿠폰</span><span class="ds-select-item__desc">10% 할인, 11월 30일까지</span></span></button></li>
      <li><button type="button" class="ds-select-item" role="option" aria-selected="false" disabled><span class="ds-select-item__body"><span class="ds-select-item__label">5,000원 할인 쿠폰</span><span class="ds-select-item__desc">5만 원 넘게 주문하면 쓸 수 있어요</span></span></button></li>
    </ul>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-select-item-padding` | `var(--ds-space-x3) var(--ds-space-x2)` |
| `--ds-select-item-gap` | `var(--ds-space-x3)` |
| `--ds-select-item-check` | `20px` |

### 크기와 여백

```
Dialog / Bottom Sheet 안에서는 .ds-select-list 만 단독으로 쓴다.
Figma Content: shape/2xl / bg/layer-floating / elevation overlay(+헤어라인) / 위아래 x2 / 그룹 사이 x2
       group label large px16 py10 t04 Medium / medium py8 t03 Regular / fg/neutral-subtle
       둘째 그룹부터 1px stroke/neutral-muted 구분선(좌우 x4, 아래 x2)
Figma Item(large): 바깥 좌우 x2 / surface py12 px8 gap12 shape/lg / label t05 / desc t03 / check 20 fg/neutral
           (medium): surface py10 gap8 / label t04 / desc t02 / check 16
       highlighted(hover/focus) bg/transparent-pressed / selected = 우측 체크만 / disabled fg/disabled
```
