<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/top-app-bar.html -->

# Top App Bar

모바일 화면 맨 위에서 화면 제목과 뒤로 가기 같은 버튼을 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `theme` | ios android CSS data-platform |
| `tone` | layer transparent + gradient |
| `titleLayout` | titleOnly withSubtitle |

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-appbar-height` | `var(--ybm-space-x14)` |
| `--ds-appbar-side` | `calc(var(--ybm-space-x11) * 2)` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 모바일 화면마다 하나씩 둡니다. |
| **Do** | 제목 위치(ios 가운데, android 왼쪽)는 한 서비스 안에서 하나로 맞춥니다. |
| **Do** | 왼쪽에는 뒤로 또는 닫기 버튼을, 오른쪽에는 아이콘 버튼을 2개까지 둡니다. |
| **Do** | transparent는 사진 위에서만 쓰고 gradient를 켭니다. |

## 예시

```html
<header class="ds-appbar" style="width:375px">
  <div class="ds-appbar__left"><button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button></div>
  <div class="ds-appbar__main"><h1 class="ds-appbar__title">제목</h1></div>
  <div class="ds-appbar__right"><button type="button" class="ds-appbar__button" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button><button type="button" class="ds-appbar__button" aria-label="더보기"><i class="ds-icon ds-icon--ellipsis" aria-hidden="true"></i></button></div>
</header>
<header class="ds-appbar" style="width:375px">
  <div class="ds-appbar__left"><button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button></div>
  <div class="ds-appbar__main"><h1 class="ds-appbar__title">제목</h1><p class="ds-appbar__subtitle">부제목</p></div>
  <div class="ds-appbar__right"><button type="button" class="ds-appbar__button" aria-label="더보기"><i class="ds-icon ds-icon--ellipsis" aria-hidden="true"></i></button></div>
</header>
<header class="ds-appbar" data-platform="android" style="width:375px">
  <div class="ds-appbar__left"><button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button></div>
  <div class="ds-appbar__main"><h1 class="ds-appbar__title">아주 긴 제목은 한 줄에서 말줄임으로 끝납니다</h1></div>
  <div class="ds-appbar__right"><button type="button" class="ds-appbar__button" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button><button type="button" class="ds-appbar__button" aria-label="메뉴" disabled><i class="ds-icon ds-icon--menu" aria-hidden="true"></i></button></div>
</header>
<div style="width:375px;background:var(--ybm-color-palette-gray-700)">
  <header class="ds-appbar" data-tone="transparent" data-gradient>
    <div class="ds-appbar__left"><button type="button" class="ds-appbar__button" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">사진 위 막대</h1></div>
    <div class="ds-appbar__right"></div>
  </header>
  <div style="height:40px"></div>
</div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

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
