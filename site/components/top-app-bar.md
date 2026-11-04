<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/top-app-bar.html -->

# Top App Bar

모바일 화면 맨 위에서 제목과 뒤로 가기 같은 버튼을 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<header class="ds-appbar" [data-platform="android"] [data-tone="transparent" data-gradient]>
  <div class="ds-appbar__left">
    <button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
  </div>
  <div class="ds-appbar__main">
    <h1 class="ds-appbar__title">제목</h1>
    [<p class="ds-appbar__subtitle">부제목</p>]
  </div>
  <div class="ds-appbar__right">
    <button type="button" class="ds-appbar__button" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
  </div>
</header>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Left** `ds-appbar__left` | 뒤로 가기 같은 버튼이 놓이는 왼쪽 영역입니다. |
| **Button** `ds-appbar__button` | 아이콘 버튼입니다. |
| **Main** `ds-appbar__main` | 제목이 놓이는 가운데 영역입니다. |
| **Title** `ds-appbar__title` | 제목입니다. |
| **Subtitle** `ds-appbar__subtitle` | 제목 아래에 붙는 작은 글입니다. |
| **Right** `ds-appbar__right` | 검색 같은 버튼이 놓이는 오른쪽 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `theme` | ios android CSS data-platform |
| `tone` | layer transparent + gradient |
| `titleLayout` | titleOnly withSubtitle |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 모바일 화면마다 하나씩 둡니다. |
| **Do** | 제목 위치(ios 가운데, android 왼쪽)는 한 서비스 안에서 하나로 맞춥니다. |
| **Do** | 왼쪽에는 뒤로 가기나 닫기 버튼을 둡니다. |
| **Do** | 오른쪽에는 아이콘 버튼을 2개까지 둡니다. |
| **Do** | transparent는 사진 위에서만 쓰고, gradient를 함께 켭니다. |

## 예시

### 하위 화면 맨 위에 뒤로 가기와 제목

하위 화면 맨 위에 뒤로 가기 버튼과 화면 제목을 둡니다. 오른쪽 아이콘 버튼은 2개까지만 두어 제목 자리를 지킵니다.

```html
<div style="width: 100%; max-width: 375px">
  <header class="ds-appbar">
    <div class="ds-appbar__left">
      <button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
    </div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">주문 상세</h1></div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="문의하기"><i class="ds-icon ds-icon--headset" aria-hidden="true"></i></button>
      <button type="button" class="ds-appbar__button" aria-label="더보기"><i class="ds-icon ds-icon--ellipsis" aria-hidden="true"></i></button>
    </div>
  </header>
  <ul class="ds-list" data-divider>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__content"><span class="ds-list-item__title">주문 번호</span></span>
        <span class="ds-list-item__suffix">1042</span>
      </div>
    </li>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__content"><span class="ds-list-item__title">주문일</span></span>
        <span class="ds-list-item__suffix">2026.11.02</span>
      </div>
    </li>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__content"><span class="ds-list-item__title">상태</span></span>
        <span class="ds-list-item__suffix">배송 중</span>
      </div>
    </li>
  </ul>
</div>
```

### 작성 화면은 닫기 버튼과 부제목으로

전체 화면으로 여는 작성 화면은 제목을 왼쪽 끝에, 닫기 버튼을 오른쪽 끝에 둡니다. 부제목에는 지금 단계처럼 제목을 돕는 짧은 정보만 넣습니다.

```html
<div style="width: 100%; max-width: 375px">
  <header class="ds-appbar" data-platform="android">
    <div class="ds-appbar__left"></div>
    <div class="ds-appbar__main">
      <h1 class="ds-appbar__title">수강 후기 쓰기</h1>
      <p class="ds-appbar__subtitle">2 / 3</p>
    </div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
  </header>
  <ul class="ds-list" data-divider aria-label="좋았던 점">
    <li>
      <label class="ds-list-item">
        <span class="ds-list-item__content"><span class="ds-list-item__title">설명이 쉬워요</span></span>
        <span class="ds-list-item__suffix"><span class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control"></span></span>
      </label>
    </li>
    <li>
      <label class="ds-list-item">
        <span class="ds-list-item__content"><span class="ds-list-item__title">예제가 많아요</span></span>
        <span class="ds-list-item__suffix"><span class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control"></span></span>
      </label>
    </li>
    <li>
      <label class="ds-list-item">
        <span class="ds-list-item__content"><span class="ds-list-item__title">강의 길이가 알맞아요</span></span>
        <span class="ds-list-item__suffix"><span class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control"></span></span>
      </label>
    </li>
  </ul>
</div>
```

### 안드로이드 앱은 제목을 왼쪽에

안드로이드 앱이라면 `data-platform="android"`로 제목을 왼쪽에 둡니다. 한 서비스 안에서는 모든 화면의 제목 위치를 하나로 맞춥니다.

```html
<div style="width: 100%; max-width: 375px">
  <header class="ds-appbar" data-platform="android">
    <div class="ds-appbar__left">
      <button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
    </div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">공지사항</h1></div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="공지 찾기"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
    </div>
  </header>
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">11월 정기 점검 안내</span>
          <span class="ds-tag-group"><span>운영팀</span><span>2026.11.02</span></span>
        </span>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">겨울 방학 특강 신청을 받아요</span>
          <span class="ds-tag-group"><span>교육팀</span><span>2026.10.28</span></span>
        </span>
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
| `--ds-appbar-height` | `var(--ds-space-x14)` |
| `--ds-appbar-side` | `calc(var(--ds-space-x11) * 2)` |

### 크기와 여백

```
theme(Figma) = data-platform: 기본 ios(제목 가운데) / "android"(제목 왼쪽)
tone: 기본 layer / data-tone="transparent"(사진 같은 배경 위, 글자와 아이콘 흰색) + data-gradient(가독성용 위쪽 그라데이션)
titleLayout: 부제목을 넣으면 withSubtitle 모양이 된다
Figma: 높이 x14 / 좌우 padding x1_5 / bg/layer-default
  ios 양옆 칸 버튼 2개 폭, 제목과 양옆 최소 간격 x2 / android 제목 칸 왼쪽 padding x1_5
  제목 Static t06 Bold fg/neutral (부제목이 있으면 t05 Bold) / 부제목 Static t02 fg/neutral-muted
  transparent 글자와 아이콘 palette/static-white, 그라데이션 검정 35% → 0, 아래로 x5 더 내려옴
  Top App Bar Button 44 shape/sm, 아이콘 24 / pressed bg/transparent-pressed / disabled fg/disabled
```
