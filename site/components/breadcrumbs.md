<!-- https://luvms012-rgb.github.io/yds/site/components/breadcrumbs.html -->

# Breadcrumbs

지금 화면이 어디에 있는지 경로로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<nav class="ds-breadcrumbs" aria-label="현재 위치">
  <ol>
    <li><a href="#">홈</a></li>
    <li><a href="#">고객센터</a></li>
    <li><span aria-current="page">공지사항</span></li>
  </ol>
</nav>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 현재 항목 aria-current=page

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 웹 화면에서 깊이가 2단계 이상일 때만 씁니다. |
| **Do** | 모바일 앱에서는 뒤로 가기 버튼이 있는 머리말을 씁니다. |
| **Don't** | 마지막 항목(지금 화면)은 링크로 만들지 않습니다. |

## 예시

### 공지 글 위에서 지금 위치 알리기

웹에서 두 단계 넘게 들어간 화면은 제목 위에 Breadcrumbs를 두어 위치를 알립니다. 마지막 항목은 지금 화면이라 링크로 만들지 않습니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 640px">
  <nav class="ds-breadcrumbs" aria-label="현재 위치">
    <ol>
      <li><a href="#">홈</a></li>
      <li><a href="#">고객센터</a></li>
      <li><a href="#">공지사항</a></li>
      <li><span aria-current="page">연말 배송 일정 안내</span></li>
    </ol>
  </nav>
  <h1 class="ds-t11 ds-fw-bold">연말 배송 일정 안내</h1>
  <span class="ds-tag-group"><span>운영팀</span><span>2026.12.01</span><span>조회 1,204</span></span>
</div>
```

### 여러 단계 분류를 거슬러 올라가기

분류가 여러 단계인 목록에서는 상위 분류를 눌러 바로 올라갈 수 있게 합니다. 모바일 앱 화면에는 Breadcrumbs 대신 뒤로 가기 버튼이 있는 Top App Bar를 씁니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 640px">
  <nav class="ds-breadcrumbs" aria-label="현재 위치">
    <ol>
      <li><a href="#">홈</a></li>
      <li><a href="#">가전</a></li>
      <li><a href="#">주방 가전</a></li>
      <li><span aria-current="page">커피 머신</span></li>
    </ol>
  </nav>
  <div class="u-flex u-center u-between">
    <h1 class="ds-t09 ds-fw-bold">커피 머신</h1>
    <span class="ds-t04 ds-fg-subtle">상품 86개</span>
  </div>
  <div class="u-flex u-wrap u-gap-2">
    <button type="button" class="ds-chip" data-size="small" aria-pressed="false">캡슐형</button>
    <button type="button" class="ds-chip" data-size="small" aria-pressed="false">반자동</button>
    <button type="button" class="ds-chip" data-size="small" aria-pressed="false">전자동</button>
  </div>
</div>
```

## 규격

### 크기와 여백

```
Figma: t03 / 항목 fg/neutral-subtle(링크 hover 밑줄) / 현재 fg/neutral Medium / 구분 chevron-right 14 fg/neutral-subtle
       항목/구분 사이 x1 / 줄바꿈 허용(좁으면 다음 줄)
마지막 항목(현재 화면)은 링크가 아니다. 모바일 앱 화면에는 쓰지 않는다(뒤로 가기 헤더 사용).
```
