<!-- https://luvms012-rgb.github.io/yds/site/components/card.html -->

# Card

관련된 정보를 한 덩어리로 묶어 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<article class="ds-card" [data-variant="elevated"] [data-size="small"]>
  <header class="ds-card__header"><h3 class="ds-card__title">카드 제목</h3>[<p class="ds-card__desc">설명</p>]</header>
  <div class="ds-card__content">…</div>
  [<footer class="ds-card__footer"><button class="ds-btn" data-variant="neutralWeak" data-width="fill">자세히 보기</button></footer>]
</article>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header** `ds-card__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Title** `ds-card__title` | 제목입니다. |
| **Desc** `ds-card__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Content** `ds-card__content` | 주된 내용이 들어가는 영역입니다. |
| **Footer** `ds-card__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | elevated |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 화면의 주요 버튼(brandSolid)은 카드 안이 아니라 화면 아래에 둡니다. 카드 아래쪽에는 보조 동작만 둡니다. |
| **Don't** | 같은 목록 안에서는 variant를 섞지 않습니다. 흰 화면에서는 outline, 회색 바탕 위에서는 elevated를 씁니다. |
| **Don't** | 카드 전체를 누를 수 있으면 아래쪽 버튼을 두지 않습니다. 누를 곳이 두 군데가 됩니다. |
| **Don't** | 카드 안에 또 카드를 넣지 않습니다. 카드 안을 나눌 때는 Divider를 씁니다. |

## 예시

### 카드 전체를 눌러 상세로 가기

카드 전체가 링크이면 아래쪽 버튼을 두지 않습니다. 누를 곳이 한 군데라 카드 어디를 눌러도 같은 화면으로 갑니다.

```html
<div class="u-flex u-wrap u-gap-3" style="width: 100%; max-width: 612px">
  <a class="ds-card" href="#" style="width: 100%; max-width: 300px">
    <header class="ds-card__header">
      <h3 class="ds-card__title">주말 요리 클래스</h3>
      <p class="ds-card__desc">11월 15일 (토) 오후 2시</p>
    </header>
    <div class="ds-card__content"><span class="ds-badge" data-tone="warning">마감 임박</span></div>
  </a>
  <a class="ds-card" href="#" style="width: 100%; max-width: 300px">
    <header class="ds-card__header">
      <h3 class="ds-card__title">가죽 공예 원데이</h3>
      <p class="ds-card__desc">11월 16일 (일) 오전 11시</p>
    </header>
    <div class="ds-card__content">남은 자리 6개</div>
  </a>
</div>
```

### 카드 안은 Divider로 나누기

카드 안의 묶음은 Divider로 나누고, 카드 안에 카드를 넣지 않습니다. 화면의 주요 버튼은 카드 밖 아래에 두고 카드 아래쪽에는 보조 동작만 둡니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 375px">
  <article class="ds-card">
    <header class="ds-card__header">
      <h3 class="ds-card__title">결제 금액</h3>
    </header>
    <div class="ds-card__content u-col u-gap-3">
      <div class="u-flex u-between"><span class="ds-fg-muted">상품 금액</span><span>32,000원</span></div>
      <div class="u-flex u-between"><span class="ds-fg-muted">배송비</span><span>3,000원</span></div>
      <div class="u-flex u-between"><span class="ds-fg-muted">쿠폰 할인</span><span>-3,000원</span></div>
      <hr class="ds-divider">
      <div class="u-flex u-between ds-t05 ds-fw-bold"><span>총 결제 금액</span><span>32,000원</span></div>
    </div>
    <footer class="ds-card__footer">
      <button class="ds-btn" data-variant="neutralWeak" data-width="fill">쿠폰 바꾸기</button>
    </footer>
  </article>
  <button class="ds-btn" data-size="large" data-width="fill">32,000원 결제하기</button>
</div>
```

### 여러 개를 늘어놓을 때는 variant 하나로

나란히 놓는 요약 카드는 variant 하나로 맞추고 같은 목록 안에서 섞지 않습니다. 모양이 같아야 카드가 많아도 한 묶음으로 읽힙니다.

```html
<div class="u-flex u-wrap u-gap-3" style="width: 100%; max-width: 624px">
  <article class="ds-card" data-size="small" style="width: 100%; max-width: 200px">
    <header class="ds-card__header">
      <h3 class="ds-card__title">이번 달 주문</h3>
      <p class="ds-card__desc">지난달보다 12% 늘었어요</p>
    </header>
    <div class="ds-card__content ds-t09 ds-fw-bold">1,284건</div>
  </article>
  <article class="ds-card" data-size="small" style="width: 100%; max-width: 200px">
    <header class="ds-card__header">
      <h3 class="ds-card__title">새 회원</h3>
      <p class="ds-card__desc">지난달보다 4% 늘었어요</p>
    </header>
    <div class="ds-card__content ds-t09 ds-fw-bold">312명</div>
  </article>
  <article class="ds-card" data-size="small" style="width: 100%; max-width: 200px">
    <header class="ds-card__header">
      <h3 class="ds-card__title">환불 요청</h3>
      <p class="ds-card__desc">지난달과 같아요</p>
    </header>
    <div class="ds-card__content ds-t09 ds-fw-bold">8건</div>
  </article>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-card-padding` | `var(--ds-space-x5)` |
| `--ds-card-gap` | `var(--ds-space-x4)` |
| `--ds-card-radius` | `var(--ds-shape-xl)` |
| `--ds-card-line` | `var(--ds-color-stroke-neutral-weak)` |

### 크기와 여백

```
variant: outline(기본) / elevated (subtle 은 예전 화면용 이름, 2026-11-04 부터 기본과 같은 모양)   size: medium(기본) / small(모서리 lg)
Figma: bg/layer-default / shape/xl / padding medium x5 / small x4 / 영역 gap x4 / x3
  header gap x1 / title t06 Bold(small t05 Bold, 2026-11-03 한 단계 올림: Empty 제목과 같은 단계) fg/neutral / desc t04(small t03) fg/neutral-subtle
  outline 1px stroke/neutral-weak / elevated elevation raised / footer 버튼 neutralWeak medium(small) gap x2
  모서리 medium shape/xl / small shape/lg (2026-11-03) / 화면 폭에 따라 안쪽 여백을 바꿀 때는 --ds-card-padding / --ds-card-gap
전체가 눌리는 카드: <a class="ds-card" href> → pressed 시 bg/transparent-pressed 를 덧씌움
```
