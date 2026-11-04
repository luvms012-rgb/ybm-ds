<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/empty.html -->

# Empty

보여 줄 내용이 없을 때 그 이유와 다음에 할 일을 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-empty" [data-size="small"]>
  <span class="ds-empty__media"><i class="ds-icon ds-icon--inbox" aria-hidden="true"></i></span>
  <p class="ds-empty__title">아직 내역이 없어요</p>
  [<p class="ds-empty__desc">조건을 바꾸거나 새로 추가해 보세요.</p>]
  [<div class="ds-empty__actions"><button class="ds-btn" data-variant="neutralWeak">새로 추가하기</button></div>]
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Media** `ds-empty__media` | 상황을 보여 주는 아이콘이나 그림입니다. |
| **Title** `ds-empty__title` | 제목입니다. |
| **Desc** `ds-empty__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Actions** `ds-empty__actions` | 버튼을 묶는 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 제목에는 지금 상황을, 설명에는 다음에 할 일을 적습니다. 오류는 Empty 대신 Callout(critical)이나 Result Section으로 알립니다. |
| **Do** | 버튼은 없거나 하나만 둡니다. 많아도 두 개까지입니다. |
| **Do** | 아이콘은 상황에 맞게 바꿉니다. |
| **Do** | 카드나 목록 안의 좁은 자리에는 small을 씁니다. |

## 예시

### 찾기 결과가 없을 때 다음 할 일 알리기

제목에는 지금 상황을, 설명에는 다음에 할 일을 적습니다. 사용자가 찾는 말만 바꾸면 되는 자리라 버튼 없이 안내만 둡니다.

```html
<div class="u-col u-gap-2 u-full" style="max-width: 420px">
  <div class="ds-input" data-variant="outline" data-size="medium">
    <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
    <input class="ds-input__control" type="search" value="영어 문법 심화반" aria-label="강의 찾기">
    <button class="ds-input__clear" aria-label="지우기"></button>
  </div>
  <div class="ds-empty">
    <span class="ds-empty__media"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></span>
    <p class="ds-empty__title">'영어 문법 심화반'에 맞는 강의가 없어요</p>
    <p class="ds-empty__desc">낱말을 줄이거나 다른 낱말로 찾아보세요.</p>
  </div>
</div>
```

### 카드 안 좁은 자리에는 small 쓰기

카드나 목록 안의 좁은 자리에는 `data-size="small"`을 씁니다. 화면 전체가 아니라 한 칸이 비었다는 것만 가볍게 알립니다.

```html
<article class="ds-card u-full" data-size="small" style="max-width: 360px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">다가오는 수업</h3>
  </header>
  <div class="ds-card__content">
    <div class="ds-empty" data-size="small">
      <span class="ds-empty__media"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></span>
      <p class="ds-empty__title">예약한 수업이 없어요</p>
      <p class="ds-empty__desc">수업을 예약하면 여기에 보여요.</p>
      <div class="ds-empty__actions"><button class="ds-btn" data-variant="neutralWeak" data-size="small">수업 예약하기</button></div>
    </div>
  </div>
</article>
```

### 상황에 맞는 아이콘과 버튼 하나 두기

쿠폰함이 비면 쿠폰을 떠올리게 하는 아이콘을 쓰고, 쿠폰을 받을 수 있는 곳으로 가는 버튼을 하나만 둡니다. 버튼이 많으면 무엇을 먼저 할지 알기 어려워 많아도 두 개까지만 둡니다.

```html
<div class="u-col u-full" style="max-width: 420px">
  <div class="ds-tabs" role="tablist">
    <button class="ds-tabs__trigger" role="tab" aria-selected="true">쓸 수 있는 쿠폰</button>
    <button class="ds-tabs__trigger" role="tab" aria-selected="false">지난 쿠폰</button>
  </div>
  <div class="ds-empty">
    <span class="ds-empty__media"><i class="ds-icon ds-icon--tag" aria-hidden="true"></i></span>
    <p class="ds-empty__title">쓸 수 있는 쿠폰이 없어요</p>
    <p class="ds-empty__desc">이벤트에 참여하면 쿠폰을 받을 수 있어요.</p>
    <div class="ds-empty__actions"><button class="ds-btn" data-variant="neutralWeak">이벤트 보기</button></div>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-empty-media` | `56px` |
| `--ds-empty-icon` | `28px` |

### 크기와 여백

```
size: medium(기본) / small
Figma medium: padding 40/16 / gap x4 / media 56(아이콘 28) / title t06 Bold / desc t04 / actions 위 x2 / 버튼 medium
      small : padding 24/16 / gap x3 / media 40(아이콘 20) / title t05 Bold / desc t03 / actions 위 x1 / 버튼 small
  media bg/neutral-muted + 아이콘 fg/neutral-subtle / title fg/neutral / desc fg/neutral-subtle / 가운데 정렬
```
