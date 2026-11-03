<!-- https://luvms012-rgb.github.io/ybm-ds/site/index.html -->

# Get Started

YBM DS는 YBM 서비스를 위한 디자인 시스템입니다. 컴포넌트와 토큰을 Figma와 코드에 같은 이름으로 담아, 누가 만들어도 같은 화면이 나오도록 돕습니다.

## AI로 바로 시작하기

아래 내용을 AI 코딩 도구(ChatGPT, Claude, Cursor 등)에 붙여 넣으면 설치부터 규칙까지 알아서 맞춥니다.

```text
이 프로젝트에 YBM DS를 적용해 줘.
1. <head>에 아래 두 줄을 넣어 줘.
   <link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
   <script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
2. 쓸 수 있는 컴포넌트 목록은 https://luvms012-rgb.github.io/ybm-ds/components.json, 각 컴포넌트의 HTML 구조는 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css의 컴포넌트별 머리 주석을 따라.
3. 색, 간격, 글자 크기, 모서리, 그림자는 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/tokens.css의 --ybm-* 토큰만 써.
4. 서비스 CSS는 DS 다음에 불러오고, 바꾸고 싶은 모양은 컴포넌트의 --ds-* 변수만 덮어써.
5. 새 ds- 클래스를 만들거나 !important를 쓰지 마.
```

그다음 만들고 싶은 화면을 말로 설명하세요. 대괄호 안만 내 상황에 맞게 바꾸면 됩니다. 비슷한 화면이 [템플릿](https://luvms012-rgb.github.io/ybm-ds/site/templates/index.md)에 있으면 그 화면에서 출발합니다.

```text
YBM DS로 [만들 화면, 예: 회원 목록 관리 화면]을 만들어 줘.
- 부품은 https://luvms012-rgb.github.io/ybm-ds/components.json에 있는 것만 쓰고, 마크업은 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css 머리 주석 그대로 써.
- 비슷한 화면이 https://luvms012-rgb.github.io/ybm-ds/site/templates/index.html에 있으면 그 템플릿을 출발점으로 써.
- 모바일 먼저 만들고, 768px 이상과 1280px 이상에서 배치를 바꿔 줘.
- 글자는 한국어. 제목 500 굵기, 본문 16px 줄 높이 28px, 자간은 주지 않고, 본문 word-break: keep-all.
- 배치용 CSS에는 --ybm-* 토큰만 쓰고 hex 색은 쓰지 마.
```

이미 만든 화면이 있다면 DS 규칙을 지키는지 점검하게 할 수 있습니다.

```text
이 화면이 YBM DS 규칙을 지키는지 점검하고 고쳐 줘.
- hex, rgb로 색을 직접 쓴 곳 → --ybm-color-* 토큰으로
- 토큰이 아닌 임의의 간격, 글자 크기 → --ybm-space-*, --ybm-font-size-* 로
- https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css에 없는 ds- 클래스, !important
- DS 부품으로 바꿀 수 있는데 직접 만든 버튼, 입력, 표
고친 곳은 목록으로 알려 줘.
```

## 설치하기

가장 쉬운 방법은 CSS로 바로 쓰는 것입니다. 빌드 도구나 설치 과정 없이 `<head>`에 두 줄만 넣으면 글꼴(Pretendard), 토큰, 아이콘, 컴포넌트가 한 번에 들어옵니다.

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
```

## 컴포넌트

정해진 클래스와 속성만 붙이면 됩니다. 각 컴포넌트의 구조와 속성은 [Components](https://luvms012-rgb.github.io/ybm-ds/site/components/index.md)에 있습니다.

```html
<button class="ds-btn" data-variant="brandSolid" data-size="large">시작하기</button>
<button class="ds-btn" data-variant="neutralWeak" data-size="large">나중에</button>
```

## 다크 모드

html 요소에 속성 하나만 붙이면 모든 색이 어두운 화면용으로 바뀝니다. 오른쪽 위 달 모양 버튼으로 이 사이트에서도 바로 볼 수 있습니다.

```html
<html lang="ko" data-theme="dark">
```

## 다른 설치 방법

개발자가 버전을 고정하거나 파일을 직접 가지고 있어야 할 때 씁니다.

### 버전 고정하기

위 주소는 늘 최신 버전을 줍니다. 배포 후 바뀌지 않게 하려면 공개 CDN 주소에 커밋 번호를 넣어 고정하세요.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/ybm-ds@[커밋 번호]/dist/ybm-ds.css">
<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/ybm-ds@[커밋 번호]/dist/ybm-ds.js" defer></script>
```

### 파일 내려받기

저장소를 내려받아 `dist` 폴더를 프로젝트에 넣고 상대 경로로 불러옵니다. 인터넷이 막힌 환경이나 사내 서버에 둘 때 씁니다.

```shell
git clone https://github.com/luvms012-rgb/ybm-ds.git
# ybm-ds/dist 폴더를 프로젝트로 복사한 뒤
<link rel="stylesheet" href="./dist/ybm-ds.css">
<script src="./dist/ybm-ds.js" defer></script>
```

### Tailwind CSS와 함께 쓰기

Tailwind를 쓰는 프로젝트는 토큰을 Tailwind 이름으로 바로 쓸 수 있는 설정 파일이 있습니다. 값은 모두 DS의 CSS 변수를 가리키므로 `ybm-ds.css`도 함께 불러와야 합니다.

```javascript
// tailwind.config.js - ybm-ds/tokens/tailwind.preset.js를 프로젝트에 복사한 뒤
module.exports = { presets: [require('./tailwind.preset.js')] };
```

## 다음 단계

Usage불러오는 순서, 화면 모드, 반응형 기준점을 알아봅니다.

Foundations색, 글자, 간격처럼 모든 화면의 바탕이 되는 토큰을 봅니다.

Components부품마다 미리보기, 사용법, 속성, 사용 지침을 봅니다.

Templates자주 쓰는 화면을 통째로 복사해 출발점으로 씁니다.
