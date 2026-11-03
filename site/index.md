<!-- https://luvms012-rgb.github.io/ybm-ds/site/index.html -->

# Get Started

YBM DS는 YBM 서비스를 위한 디자인 시스템입니다.

## AI로 시작하기

아래 글을 AI 코딩 도구(ChatGPT, Claude, Cursor 등)에 붙여 넣으면 설치부터 규칙까지 알아서 맞춥니다.

### DS 적용하기

```text
이 프로젝트에 YBM DS를 적용해 줘.
1. <head>에 아래 두 줄을 넣어 줘.
   <link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
   <script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
2. 문서는 https://luvms012-rgb.github.io/ybm-ds/site/llms.txt 목차에서 필요한 페이지(.md)를 골라 읽어.
3. 쓸 수 있는 컴포넌트 목록은 https://luvms012-rgb.github.io/ybm-ds/components.json, 각 컴포넌트의 HTML 구조는 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css의 컴포넌트별 머리 주석을 따라.
4. 색, 간격, 글자 크기, 모서리, 그림자는 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/tokens.css의 --ds-* 토큰만 써.
5. 서비스 CSS는 DS 다음에 불러오고, 바꾸고 싶은 모양은 컴포넌트의 --ds-* 변수만 덮어써.
6. 새 ds- 클래스를 만들거나 !important를 쓰지 마.
```

### 화면 만들기

대괄호 안만 내 상황에 맞게 바꿉니다.

```text
YBM DS로 [만들 화면, 예: 회원 목록 관리 화면]을 만들어 줘.
- 부품은 https://luvms012-rgb.github.io/ybm-ds/components.json에 있는 것만 쓰고, 마크업은 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css 머리 주석 그대로 써.
- 쓰는 컴포넌트는 https://luvms012-rgb.github.io/ybm-ds/site/llms.txt에서 그 문서(.md)를 읽고 사용 지침을 따라.
- 비슷한 화면이 llms.txt의 Templates 목록에 있으면 그 HTML을 출발점으로 써.
- 모바일 먼저 만들고, 768px 이상과 1280px 이상에서 배치를 바꿔 줘.
- 글자는 한국어. 제목은 Bold에 자간 -0.02em, 항목 제목은 SemiBold, 본문은 Regular로 쓰고, 크기는 --ds-font-size-* 토큰, 본문은 word-break: keep-all.
- 배치용 CSS에는 --ds-* 토큰만 쓰고 hex 색은 쓰지 마.
```

### 규칙 점검하기

```text
이 화면이 YBM DS 규칙을 지키는지 점검하고 고쳐 줘.
- hex, rgb로 색을 직접 쓴 곳 → --ds-color-* 토큰으로
- 토큰이 아닌 임의의 간격, 글자 크기 → --ds-space-*, --ds-font-size-* 로
- https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css에 없는 ds- 클래스, !important
- DS 부품으로 바꿀 수 있는데 직접 만든 버튼, 입력, 표
고친 곳은 목록으로 알려 줘.
```

## 시스템 이해하기

Foundations색, 글자, 간격 같은 기본 토큰.

Components화면을 이루는 부품의 모양과 쓰임.

Templates가져다 고쳐 쓰는 완성 화면.

## 바로 써 보기

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
