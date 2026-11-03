<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/top-navigation.html -->

# Top Navigation

PC 화면 맨 위에 두는 메뉴로, 서비스의 주요 화면을 오갈 때 씁니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<header class="ds-topnav">
  <div class="ds-topnav__left">
    <a class="ds-topnav__heading" href="/"><img src="logo.svg" alt="서비스 이름"></a>
    <nav class="ds-topnav__menu" aria-label="주요 메뉴">
      <a class="ds-topnav__item" href="#" aria-current="page">홈</a>
      <a class="ds-topnav__item" href="#">소개</a>
    </nav>
  </div>
  <div class="ds-topnav__end">
    <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
    <a class="ds-btn" data-variant="neutralWeak" data-size="xsmall" href="#">로그인</a>
  </div>
</header>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `state` | enabled hover |
| 켜고 끄는 속성 | `search` `action` |

그 밖에: Item selected

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | PC 화면에서만 씁니다. |
| **Do** | 메뉴는 7개까지 두고, 지금 화면이 속한 메뉴에 `aria-current="page"`를 붙입니다. |
| **Do** | 화면이 좁아지면 Top App Bar와 메뉴 버튼으로 바꿉니다. |

## 예시

```html
<header class="ds-topnav" style="min-width:960px">
  <div class="ds-topnav__left">
    <a class="ds-topnav__heading" href="#" aria-label="홈으로"><span style="display:grid;place-items:center;width:88px;height:28px;border-radius:var(--ybm-shape-xs);background:var(--ybm-color-bg-neutral);color:var(--ybm-color-fg-neutral-subtle);font-size:var(--ybm-font-size-t03-static);font-weight:var(--ybm-font-weight-semibold)">로고</span></a>
    <nav class="ds-topnav__menu" aria-label="주요 메뉴">
      <a class="ds-topnav__item" href="#" aria-current="page">홈</a>
      <a class="ds-topnav__item" href="#">소개</a>
      <a class="ds-topnav__item" href="#">서비스</a>
      <a class="ds-topnav__item" href="#">소식</a>
      <a class="ds-topnav__item" href="#">고객지원</a>
    </nav>
  </div>
  <div class="ds-topnav__end">
    <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
    <a class="ds-btn" data-variant="neutralWeak" data-size="xsmall" href="#">로그인</a>
  </div>
</header>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
Figma: padding x2 / bg/layer-default / 왼쪽 묶음 gap x4 / 메뉴 사이 x1 / 오른쪽 끝 버튼 사이 x1
  로고 칸 높이 x8, 좌우 padding x2, 로고 높이 28
  Top Navigation Item 높이 x8, 좌우 padding x3, shape/sm, t04 Medium fg/neutral-muted
  hover bg/transparent-pressed / 선택 bg/neutral-weak-alpha, t04 SemiBold fg/neutral
```
