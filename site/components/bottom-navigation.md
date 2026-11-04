<!-- https://luvms012-rgb.github.io/yds/site/components/bottom-navigation.html -->

# Bottom Navigation

앱 화면 아래에서 주요 메뉴 사이를 오가는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<nav class="ds-bottomnav" aria-label="주요 메뉴">
  <a class="ds-bottomnav__item" href="#" aria-current="page">
    <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--house-solid ds-icon--lg"></i>[<span class="ds-bottomnav__badge--dot"></span>]</span>
    <span class="ds-bottomnav__label">홈</span>
  </a>
</nav>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Item** `ds-bottomnav__item` | 목록의 항목 하나입니다. |
| **Icon** `ds-bottomnav__icon` | 메뉴를 나타내는 아이콘입니다. |
| **Badge Dot** `ds-bottomnav__badge--dot` | 새 소식을 알리는 점입니다. |
| **Label** `ds-bottomnav__label` | 메뉴 이름입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 뱃지 `__badge--dot/--count` (bg/critical-solid)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 탭은 3~5개를 둡니다. |
| **Do** | 라벨은 한글 5자(영문 10자) 안으로 씁니다. |
| **Do** | 아이콘은 채움(Solid) 모양을 씁니다. |
| **Do** | 배지 숫자는 1~99로 쓰고, 100 이상은 `99+`로 씁니다. |
| **Do** | 숫자가 0이면 배지를 숨깁니다. |
| **Don't** | 숫자 배지를 세 개 넘게 한꺼번에 띄우지 않습니다. |

## 예시

### 주요 화면 네 곳을 아래에 두기

앱의 주요 화면 3개에서 5개를 아래에 두고, 지금 화면은 `aria-current="page"`로 표시합니다. 라벨은 한글 다섯 자 안으로 짧게 씁니다.

```html
<div style="width: 100%; max-width: 375px">
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">영어 회화 첫걸음</span>
          <span class="ds-list-item__desc">3강까지 들었어요</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">엑셀 실무 기초</span>
          <span class="ds-list-item__desc">새 강의 2개가 올라왔어요</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
  <nav class="ds-bottomnav" aria-label="주요 메뉴">
    <a class="ds-bottomnav__item" href="#" aria-current="page">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--house-solid ds-icon--lg" aria-hidden="true"></i></span>
      <span class="ds-bottomnav__label">홈</span>
    </a>
    <a class="ds-bottomnav__item" href="#">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--book-open ds-icon--lg" aria-hidden="true"></i></span>
      <span class="ds-bottomnav__label">강의실</span>
    </a>
    <a class="ds-bottomnav__item" href="#">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--shopping-cart ds-icon--lg" aria-hidden="true"></i></span>
      <span class="ds-bottomnav__label">장바구니</span>
    </a>
    <a class="ds-bottomnav__item" href="#">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--user ds-icon--lg" aria-hidden="true"></i></span>
      <span class="ds-bottomnav__label">내 정보</span>
    </a>
  </nav>
</div>
```

### 새 소식은 점으로, 개수는 숫자로

개수가 중요한 탭에는 숫자 배지를, 새 소식만 알리면 점을 붙입니다. 100이 넘으면 `99+`로 줄이고, 0이면 배지를 숨깁니다.

```html
<div style="width: 100%; max-width: 375px">
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">오늘 도착 예정</span>
          <span class="ds-list-item__desc">무선 이어폰 외 1건</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">쿠폰이 곧 사라져요</span>
          <span class="ds-list-item__desc">3,000원 할인 쿠폰, 3일 남음</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
  <nav class="ds-bottomnav" aria-label="주요 메뉴">
    <a class="ds-bottomnav__item" href="#" aria-current="page">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--house-solid ds-icon--lg" aria-hidden="true"></i></span>
      <span class="ds-bottomnav__label">홈</span>
    </a>
    <a class="ds-bottomnav__item" href="#">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--search ds-icon--lg" aria-hidden="true"></i></span>
      <span class="ds-bottomnav__label">검색</span>
    </a>
    <a class="ds-bottomnav__item" href="#" aria-label="장바구니, 상품 3개">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--shopping-cart ds-icon--lg" aria-hidden="true"></i><span class="ds-bottomnav__badge--count">3</span></span>
      <span class="ds-bottomnav__label">장바구니</span>
    </a>
    <a class="ds-bottomnav__item" href="#" aria-label="알림, 새 알림 99개 넘음">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--bell ds-icon--lg" aria-hidden="true"></i><span class="ds-bottomnav__badge--count">99+</span></span>
      <span class="ds-bottomnav__label">알림</span>
    </a>
    <a class="ds-bottomnav__item" href="#" aria-label="내 정보, 새 소식 있음">
      <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--user ds-icon--lg" aria-hidden="true"></i><span class="ds-bottomnav__badge--dot"></span></span>
      <span class="ds-bottomnav__label">내 정보</span>
    </a>
  </nav>
</div>
```

## 규격

### 크기와 여백

```
Figma: bg/layer-default / 상단 1px stroke/neutral-muted / 항목 높이 51 / padding 4/2 / gap 2 / 아이콘 24(Solid)
  label Static t01 SemiBold / 선택 아이콘 fg/brand + 라벨 fg/neutral / 미선택 fg/neutral-subtle / disabled fg/disabled
  뱃지 bg/critical-solid + 1.5px bg/layer-default 테두리 / dot 6 / count 최소 18 / Static t01 Bold static-white
  안쪽 최대 폭 480 / 하단 safe area
```
