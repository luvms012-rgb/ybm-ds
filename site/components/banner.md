<!-- https://luvms012-rgb.github.io/yds/site/components/banner.html -->

# Banner

화면 맨 위에서 서비스 전체 공지를 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-banner" role="status" data-tone="warning">
  <div class="ds-banner__inner">
    <i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i>
    <p class="ds-banner__message"><strong class="ds-banner__title">점검 안내</strong>  10월 25일(토) 02:00~06:00 서비스를 점검해요.</p>
    [<a class="ds-banner__action" href="#">자세히</a>]
    [<button type="button" class="ds-banner__close" aria-label="공지 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>]
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Inner** `ds-banner__inner` | 배너 내용을 가운데에 정해진 폭으로 담는 영역입니다. |
| **Message** `ds-banner__message` | 알릴 내용을 담은 글입니다. |
| **Title** `ds-banner__title` | 제목입니다. |
| **Action** `ds-banner__action` | 바로 실행하는 작은 버튼입니다. |
| **Close** `ds-banner__close` | 닫기 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: tone neutral, informative, positive, warning, critical, variant solid

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | Banner는 화면 맨 위에 전체 폭으로, 한 번에 하나만 띄웁니다. |
| **Do** | 본문 안의 안내는 Callout을 씁니다. |

## 예시

### 점검 일정을 화면 맨 위에 알리기

모든 화면에 걸리는 점검 공지는 Banner로 화면 맨 위에 전체 폭으로 띄웁니다. 한 번에 하나만 두고, 자세한 내용은 오른쪽 링크로 넘깁니다.

```html
<div style="width: 100%; max-width: 375px">
  <div class="ds-banner" role="status" data-tone="warning">
    <div class="ds-banner__inner">
      <i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i>
      <p class="ds-banner__message"><strong class="ds-banner__title">점검 안내</strong>  9일 새벽 2~6시에 점검해요.</p>
      <a class="ds-banner__action" href="#">자세히</a>
    </div>
  </div>
  <header class="ds-appbar">
    <div class="ds-appbar__left"></div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">홈</h1></div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="알림"><i class="ds-icon ds-icon--bell" aria-hidden="true"></i></button>
    </div>
  </header>
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">주문 내역</span>
          <span class="ds-list-item__desc">최근 3개월 2건</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">쿠폰함</span>
          <span class="ds-list-item__desc">쓸 수 있는 쿠폰 3장</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 급한 장애는 바로 읽히게 알리기

결제 장애처럼 바로 알아야 하는 공지는 critical 톤과 `role="alert"`로 띄웁니다. 문구에는 지금 쓸 수 있는 다른 방법까지 적습니다.

```html
<div style="width: 100%">
  <div class="ds-banner" role="alert" data-tone="critical">
    <div class="ds-banner__inner">
      <i class="ds-icon ds-icon--circle-alert-solid" aria-hidden="true"></i>
      <p class="ds-banner__message"><strong class="ds-banner__title">결제 장애</strong>  일부 카드 결제가 되지 않아요. 계좌 이체나 간편 결제를 써 주세요.</p>
    </div>
  </div>
  <header class="ds-topnav">
    <div class="ds-topnav__left">
      <a class="ds-topnav__heading" href="#"><span class="ds-t06 ds-fw-bold">서비스 이름</span></a>
      <nav class="ds-topnav__menu u-show-from-md" aria-label="주요 메뉴">
        <a class="ds-topnav__item" href="#" aria-current="page">홈</a>
        <a class="ds-topnav__item" href="#">쇼핑</a>
        <a class="ds-topnav__item" href="#">주문 내역</a>
        <a class="ds-topnav__item" href="#">고객센터</a>
      </nav>
    </div>
    <div class="ds-topnav__end">
      <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
      <a class="ds-btn" data-variant="neutralWeak" data-size="xsmall" href="#">로그인</a>
    </div>
  </header>
</div>
```

### 한 번 읽으면 되는 공지는 닫을 수 있게

정책 변경처럼 한 번 읽으면 되는 공지에는 닫기 버튼을 붙여 사용자가 치울 수 있게 합니다. 닫기 버튼의 `aria-label`에는 무엇을 닫는지 적습니다.

```html
<div style="width: 100%; max-width: 375px">
  <div class="ds-banner" role="status">
    <div class="ds-banner__inner">
      <i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i>
      <p class="ds-banner__message">개인 정보 처리 방침이 12월 1일부터 바뀌어요.</p>
      <a class="ds-banner__action" href="#">보기</a>
      <button type="button" class="ds-banner__close" aria-label="공지 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
  </div>
  <header class="ds-appbar">
    <div class="ds-appbar__left">
      <button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
    </div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">내 정보</h1></div>
    <div class="ds-appbar__right"></div>
  </header>
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content"><span class="ds-list-item__title">개인 정보</span></span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content"><span class="ds-list-item__title">비밀번호 바꾸기</span></span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-banner-bg` | `var(--ds-color-bg-neutral)` |
| `--ds-banner-fg` | `var(--ds-color-fg-neutral)` |
| `--ds-banner-max` | `1200px` |

### 크기와 여백

```
tone: neutral(기본) / informative / positive / warning / critical   variant: weak(기본) / solid
Figma: 전체 폭 / 모서리 없음 / min-h48 / padding x3 x4 / 내용 최대 폭 --ds-banner-max(1200) 가운데 / gap x2
  t04 / 제목 Bold / 아이콘 Solid 16 / action t04 Bold 밑줄 / 닫기 20(터치 영역 40)
  weak: Callout 과 같은 tone 색 / 아래 1px stroke/neutral-weak
  solid: bg/{tone}-solid + fg/on-{tone}-solid (neutral = bg/neutral-solid + fg/on-neutral-solid)
Callout 과 차이: Callout 은 본문 안 안내(둥근 상자), Banner 는 페이지 전체에 걸린 공지(화면 맨 위, 한 번에 1개).
```
