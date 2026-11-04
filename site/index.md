<!-- https://luvms012-rgb.github.io/ybm-ds/site/index.html -->

# Get Started

YBM DS는 YBM 서비스를 위한 디자인 시스템입니다.

## AI로 시작하기

아래 글을 AI 코딩 도구(ChatGPT, Claude, Cursor 등)에 붙여 넣으면 됩니다. 지킬 규칙은 AI가 문서에서 읽어 갑니다.

### DS 설치하기

```text
이 프로젝트에 YBM DS를 넣어 줘.
https://luvms012-rgb.github.io/ybm-ds/site/llms.txt 를 먼저 읽고, 거기 적힌 설치 방법과 규칙을 따라 줘.
```

### 서비스 색 입히기

YBM IT처럼 다른 서비스에 쓸 때 이어서 붙여 넣습니다.

```text
이 서비스의 브랜드 색을 나에게 먼저 물어봐 줘.
그 색으로 YBM DS 브랜드 색을 맞춰 서비스 CSS에 넣고, 정하지 않으면 기본 색으로 둬. 바꾼 화면을 먼저 보여 줘.
```

화면 만들기, 규칙 점검 요청은 [AI & Tools](https://luvms012-rgb.github.io/ybm-ds/site/get-started/ai.md#prompt)에 있습니다.

## 직접 시작하기

### 1. DS 불러오기

`<head>`에 두 줄을 넣으면 글꼴, 토큰, 아이콘, 컴포넌트가 함께 들어옵니다. 쓰는 법은 [Components](https://luvms012-rgb.github.io/ybm-ds/site/components/index.md)에 있습니다.

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
```

### 2. 서비스 색 입히기

서비스 CSS를 DS 다음에 불러오고, 브랜드 팔레트 10단계만 그 서비스 색으로 덮어씁니다. 자세한 것은 [Color](https://luvms012-rgb.github.io/ybm-ds/site/foundations/color.md)에 있습니다.

```html
<link rel="stylesheet" href="ybm-it.css">  <!-- DS 두 줄 다음 -->

/* ybm-it.css */
:root {
  --ds-color-palette-brand-100: #e6f6ee;  /* 옅은 배경 */
  --ds-color-palette-brand-600: #12a150;  /* 주 버튼, 링크 */
  --ds-color-palette-brand-700: #0d7d3e;  /* 눌림 */
  /* 200 ~ 500, 800 ~ 1000 도 같은 색의 단계로 */
}
```

## 다크 모드

`html`에 속성 하나를 붙이면 모든 색이 어두운 화면용으로 바뀝니다. 색을 토큰으로만 썼다면 따로 고칠 것이 없습니다.

```html
<html lang="ko" data-theme="dark">
```
