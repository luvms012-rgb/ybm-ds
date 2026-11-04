<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/side-navigation.html -->

# Side Navigation

PC 화면 왼쪽에 두는 메뉴로, 화면 사이를 오갈 때 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<nav class="ds-sidenav" aria-label="메뉴" [data-collapsed]>
  <div class="ds-sidenav__header"><button class="ds-sidenav__trigger" aria-label="메뉴 접기"><i class="ds-icon ds-icon--panel-left"></i></button></div>
  <div class="ds-sidenav__content">
    <div class="ds-sidenav__group">
      [<div class="ds-sidenav__group-label">그룹</div>]
      <a class="ds-sidenav__item" href="#" aria-current="page">
        <span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--house-solid"></i></span>
        <span class="ds-sidenav__label">메뉴</span>
        [<i class="ds-icon ds-icon--chevron-down ds-icon--sm ds-sidenav__suffix"></i>]
      </a>
    </div>
  </div>
  <div class="ds-sidenav__footer">…</div>
</nav>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-sidenav__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Trigger**`ds-sidenav__trigger` | 누르면 열리거나 바뀌는 버튼입니다. |
| **Content**`ds-sidenav__content` | 주된 내용이 들어가는 영역입니다. |
| **Group**`ds-sidenav__group` | 관련 항목을 묶는 영역입니다. |
| **Group Label**`ds-sidenav__group-label` | 묶음의 이름입니다. |
| **Item**`ds-sidenav__item` | 목록의 항목 하나입니다. |
| **Prefix**`ds-sidenav__prefix` | 앞에 붙는 아이콘이나 요소입니다. |
| **Label**`ds-sidenav__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Suffix**`ds-sidenav__suffix` | 뒤에 붙는 아이콘이나 요소입니다. |
| **Footer**`ds-sidenav__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: expanded 240, collapsed 56

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 메뉴는 화면 폭 1280 이상에서 펼치고, 768 이상에서 접습니다. |
| **Do** | 화면 폭이 768보다 좁으면 서랍(Drawer)으로 바꿉니다. |
| **Do** | 하위 메뉴가 있는 항목은 눌러도 이동하지 않고 펼치거나 접기만 합니다. 하위 메뉴가 선택돼 있으면 부모 항목은 펼쳐 둡니다. |
| **Do** | 메뉴 이름은 짧게 씁니다. |
| **Don't** | 하위 메뉴가 없는 항목은 누르면 바로 이동하고, 화살표를 달지 않습니다. |

## 예시

### 하위 메뉴가 있는 항목은 펼치기만

하위 메뉴가 있는 "내 강의실"은 눌러도 이동하지 않고 펼치거나 접기만 합니다. 지금 보는 하위 메뉴가 있으면 부모를 펼쳐 두고, 하위 메뉴가 없는 항목에는 화살표를 달지 않습니다.

```html
<nav class="ds-sidenav" aria-label="학습 메뉴">
  <div class="ds-sidenav__header">
    <button type="button" class="ds-sidenav__trigger" aria-label="메뉴 접기"><i class="ds-icon ds-icon--panel-left" aria-hidden="true"></i></button>
  </div>
  <div class="ds-sidenav__content">
    <div class="ds-sidenav__group">
      <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--house" aria-hidden="true"></i></span><span class="ds-sidenav__label">홈</span></a>
      <div class="ds-sidenav__item" role="button" tabindex="0" aria-expanded="true" aria-controls="side-navigation-ex1-sub">
        <span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--book-open" aria-hidden="true"></i></span>
        <span class="ds-sidenav__label">내 강의실</span>
        <i class="ds-icon ds-icon--chevron-up ds-icon--sm ds-sidenav__suffix" aria-hidden="true"></i>
      </div>
      <div id="side-navigation-ex1-sub">
        <a class="ds-sidenav__item" href="#" aria-current="page"><span class="ds-sidenav__prefix" aria-hidden="true"></span><span class="ds-sidenav__label">수강 중</span></a>
        <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix" aria-hidden="true"></span><span class="ds-sidenav__label">수강 완료</span></a>
      </div>
      <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></span><span class="ds-sidenav__label">시험 일정</span></a>
      <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--settings" aria-hidden="true"></i></span><span class="ds-sidenav__label">설정</span></a>
    </div>
  </div>
</nav>
```

### 화면이 좁아지면 접어 두기

화면 폭이 1280보다 좁으면 `data-collapsed`로 접어 아이콘만 남깁니다. 이름이 숨으므로 항목마다 `aria-label`을 붙이고, 768보다 좁아지면 서랍 메뉴로 바꿉니다.

```html
<div class="u-flex u-gap-6 u-full" style="max-width: 560px">
  <nav class="ds-sidenav" aria-label="학습 메뉴" data-collapsed>
    <div class="ds-sidenav__header">
      <button type="button" class="ds-sidenav__trigger" aria-label="메뉴 펼치기"><i class="ds-icon ds-icon--panel-left" aria-hidden="true"></i></button>
    </div>
    <div class="ds-sidenav__content">
      <div class="ds-sidenav__group">
        <a class="ds-sidenav__item" href="#" aria-current="page" aria-label="홈"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--house-solid" aria-hidden="true"></i></span><span class="ds-sidenav__label">홈</span></a>
        <a class="ds-sidenav__item" href="#" aria-label="내 강의실"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--book-open" aria-hidden="true"></i></span><span class="ds-sidenav__label">내 강의실</span></a>
        <a class="ds-sidenav__item" href="#" aria-label="시험 일정"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></span><span class="ds-sidenav__label">시험 일정</span></a>
        <a class="ds-sidenav__item" href="#" aria-label="주문 내역"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--receipt" aria-hidden="true"></i></span><span class="ds-sidenav__label">주문 내역</span></a>
        <a class="ds-sidenav__item" href="#" aria-label="설정"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--settings" aria-hidden="true"></i></span><span class="ds-sidenav__label">설정</span></a>
      </div>
    </div>
  </nav>
  <section class="u-col u-gap-3 u-grow u-mt-4">
    <h3 class="ds-t07 ds-fw-bold">이어서 볼 강의</h3>
    <ul class="ds-list" data-variant="inset" data-divider>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">영어 회화 기초</span><span class="ds-list-item__desc">9강부터</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">비즈니스 이메일 쓰기</span><span class="ds-list-item__desc">16강부터</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
    </ul>
  </section>
</div>
```

### 짧은 이름을 묶음으로 나누기

메뉴 이름은 "주문 내역"처럼 두세 낱말로 짧게 쓰고, 성격이 비슷한 메뉴끼리 묶음 이름 아래에 모읍니다. 이름이 길면 240 폭 안에서 잘려 끝까지 읽을 수 없습니다.

```html
<nav class="ds-sidenav" aria-label="내 메뉴">
  <div class="ds-sidenav__header">
    <button type="button" class="ds-sidenav__trigger" aria-label="메뉴 접기"><i class="ds-icon ds-icon--panel-left" aria-hidden="true"></i></button>
  </div>
  <div class="ds-sidenav__content">
    <div class="ds-sidenav__group">
      <div class="ds-sidenav__group-label">학습</div>
      <a class="ds-sidenav__item" href="#" aria-current="page"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--house-solid" aria-hidden="true"></i></span><span class="ds-sidenav__label">홈</span></a>
      <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--book-open" aria-hidden="true"></i></span><span class="ds-sidenav__label">내 강의실</span></a>
      <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></span><span class="ds-sidenav__label">시험 일정</span></a>
    </div>
    <div class="ds-sidenav__group">
      <div class="ds-sidenav__group-label">내 정보</div>
      <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--receipt" aria-hidden="true"></i></span><span class="ds-sidenav__label">주문 내역</span></a>
      <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--tag" aria-hidden="true"></i></span><span class="ds-sidenav__label">쿠폰</span></a>
      <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--settings" aria-hidden="true"></i></span><span class="ds-sidenav__label">설정</span></a>
    </div>
  </div>
  <div class="ds-sidenav__footer">
    <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--headset" aria-hidden="true"></i></span><span class="ds-sidenav__label">고객센터</span></a>
  </div>
</nav>
```

## 규격

### 크기와 여백

```
collapsed: data-collapsed (240 → 56)
Figma: bg/canvas / header h64 padding x2(트리거 40 shape/sm / panel-left 20 fg/neutral-subtle 오른쪽 정렬)
  content padding 8/8/24/8 / 그룹 사이 x2 / group label padding x1_5 / Static t04 Bold fg/neutral-muted
  item h44 / px x2(접힘 x2_5 / 폭 40) / gap x3 / shape/sm / prefix 20 / label Static t04 Medium fg/neutral-muted / 아이콘 fg/neutral-subtle
  current bg/neutral-weak-alpha + 글자/아이콘 fg/neutral / disabled fg/disabled / suffix 16
```
