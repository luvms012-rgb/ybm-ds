<!-- https://luvms012-rgb.github.io/ybm-ds/site/index.html -->

# Get Started

YBM DS는 YBM 서비스를 위한 디자인 시스템입니다.

## YBM DS란 무엇인가요?

| 용어 | 뜻 |
| --- | --- |
| **토큰** | 색, 크기, 간격 같은 값에 붙인 이름입니다. |
| **컴포넌트** | 버튼, 입력창처럼 화면을 이루는 부품입니다. |
| **템플릿** | 부품을 조립해 둔 화면 한 장입니다. |

## 시스템 이해하기

Foundations색, 글자, 간격 같은 기본 토큰.

Components화면을 이루는 부품의 모양과 쓰임.

Templates가져다 고쳐 쓰는 완성 화면.

## 바로 써 보기

AI 코딩 도구로 만들 때는 [AI & Tools](https://luvms012-rgb.github.io/ybm-ds/site/get-started/ai.md#prompt)의 요청 글을 붙여 넣으면 아래 설치와 규칙을 알아서 맞춥니다.

`<head>`에 두 줄을 넣으면 글꼴, 토큰, 아이콘, 컴포넌트가 함께 들어옵니다. 컴포넌트마다 쓰는 법은 [Components](https://luvms012-rgb.github.io/ybm-ds/site/components/index.md)에 있습니다.

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
```

## 다른 서비스에 쓰기

YBM IT처럼 다른 서비스에도 DS를 그대로 가져다 씁니다. DS 파일은 고치지 않고, 서비스 CSS 한 장에서 그 서비스의 색과 로고만 바꿉니다.

### 1. 서비스 CSS를 DS 다음에 불러오기

DS가 CSS 레이어 안에 있어 뒤에 불러온 서비스 CSS가 `!important` 없이 이깁니다.

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
<link rel="stylesheet" href="ybm-it.css">  <!-- 서비스 CSS는 항상 DS 다음 -->
```

### 2. 브랜드 색 넣기

브랜드 팔레트 10단계만 서비스 색으로 바꾸면 주 버튼, 체크박스, 링크처럼 브랜드 색을 쓰는 곳이 모두 따라 바뀝니다. 자세한 것은 [Color](https://luvms012-rgb.github.io/ybm-ds/site/foundations/color.md)에 있습니다.

```css
/* ybm-it.css */
:root {
  --ds-color-palette-brand-100: #e6f6ee;  /* 옅은 배경 */
  --ds-color-palette-brand-600: #12a150;  /* 주 버튼, 링크 */
  --ds-color-palette-brand-700: #0d7d3e;  /* 눌림 */
  /* 200 ~ 500, 800 ~ 1000 도 같은 색의 단계로 */
}
:root[data-theme="dark"] {
  /* 다크는 같은 단계를 뒤집어 넣는다 (다크 100 = 라이트 1000) */
}
```

### 3. 로고와 이름 바꾸기

머리 메뉴의 로고 그림과 페이지 제목만 서비스 것으로 바꿉니다.

```html
<header class="ds-topnav">
  <a class="ds-topnav__left" href="/"><img src="ybm-it-logo.svg" alt="YBM IT"></a>
  …
</header>
```

### 4. 필요한 곳만 다듬기

모양을 더 바꾸고 싶으면 컴포넌트 변수(`--ds-*`)만 덮어씁니다. 새 `ds-` 클래스를 만들지 않습니다.

```css
/* ybm-it.css */
.ds-dialog { --ds-dialog-width: 360px; }
.ds-btn[data-variant="brandSolid"] { --ds-btn-radius: var(--ds-shape-pill); }
```

## 다크 모드

`html`에 속성 하나를 붙이면 모든 색이 어두운 화면용으로 바뀝니다. 색을 토큰으로만 썼다면 따로 고칠 것이 없습니다.

```html
<html lang="ko" data-theme="dark">
```
