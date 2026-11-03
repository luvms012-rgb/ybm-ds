<!-- https://luvms012-rgb.github.io/ybm-ds/site/index.html -->

# Get Started

YBM DS는 YBM 서비스를 위한 디자인 시스템입니다. 컴포넌트와 토큰을 Figma와 코드에 같은 이름으로 담아, 누가 만들어도 같은 화면이 나오도록 돕습니다.

## YBM DS란 무엇인가요?

화면을 만들 때마다 색과 버튼을 새로 정하지 않도록, 미리 정해 둔 값과 부품을 한곳에 모은 것입니다. 디자이너는 Figma에서, 개발자는 코드에서 같은 이름으로 씁니다.

처음이라면 아래 세 낱말만 알아 두면 됩니다.

| 낱말 | 뜻 |
| --- | --- |
| **토큰** | 색, 글자 크기, 간격처럼 자주 쓰는 값에 붙인 이름입니다. 값 대신 이름을 쓰면 한 번에 바꿀 수 있습니다. |
| **컴포넌트** | 버튼, 입력창처럼 화면을 이루는 부품입니다. 정해진 클래스만 붙이면 같은 모양이 나옵니다. |
| **템플릿** | 컴포넌트를 조립해 둔 화면 한 장입니다. 비슷한 화면을 만들 때 출발점으로 씁니다. |

## 시스템 이해하기

Foundations색, 글자, 간격처럼 모든 화면의 바탕이 되는 토큰과 원칙.

Components버튼, 입력창처럼 화면을 이루는 부품의 모양과 쓰임.

Templates부품을 조립해 둔 완성 화면. 그대로 가져가 고쳐 씁니다.

## 바로 써 보기

설치 과정 없이 두 단계면 첫 화면이 나옵니다.

### 1. DS 불러오기

페이지 `<head>`에 두 줄을 넣습니다. 글꼴(Pretendard), 토큰, 아이콘, 컴포넌트가 한 번에 들어옵니다.

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
```

### 2. 컴포넌트 붙이기

정해진 클래스와 속성만 붙이면 됩니다. 컴포넌트마다 쓰는 법은 [Components](https://luvms012-rgb.github.io/ybm-ds/site/components/index.md)에 있습니다.

```html
<button class="ds-btn" data-variant="brandSolid" data-size="large">시작하기</button>
<button class="ds-btn" data-variant="neutralWeak" data-size="large">나중에</button>
```

불러오는 순서, 다크 모드, 반응형 기준은 [Usage](https://luvms012-rgb.github.io/ybm-ds/site/get-started/usage.md)에서 이어서 봅니다.

## AI로 만들기

코드를 몰라도 됩니다. 아래 내용을 AI 코딩 도구(ChatGPT, Claude, Cursor 등)에 붙여 넣으면 설치부터 규칙까지 알아서 맞춥니다.

```text
이 프로젝트에 YBM DS를 적용해 줘.
1. <head>에 아래 두 줄을 넣어 줘.
   <link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
   <script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
2. 문서는 https://luvms012-rgb.github.io/ybm-ds/site/llms.txt 목차에서 필요한 페이지(.md)를 골라 읽어.
3. 쓸 수 있는 컴포넌트 목록은 https://luvms012-rgb.github.io/ybm-ds/components.json, 각 컴포넌트의 HTML 구조는 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css의 컴포넌트별 머리 주석을 따라.
4. 색, 간격, 글자 크기, 모서리, 그림자는 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/tokens.css의 --ybm-* 토큰만 써.
5. 서비스 CSS는 DS 다음에 불러오고, 바꾸고 싶은 모양은 컴포넌트의 --ds-* 변수만 덮어써.
6. 새 ds- 클래스를 만들거나 !important를 쓰지 마.
```

그다음 만들고 싶은 화면을 말로 설명하면 됩니다. 화면 만들기, 규칙 점검 요청 예시와 문서를 AI에 주는 방법은 [AI](https://luvms012-rgb.github.io/ybm-ds/site/get-started/ai.md)에 있습니다.

## 도구

AIllms.txt와 마크다운으로 AI 도구에 DS 문서를 주는 방법.

Scripts여닫기, 선택처럼 움직임이 있는 컴포넌트의 스크립트.

Figma디자이너가 쓰는 컴포넌트와 토큰 라이브러리.

GitHubDS 원본 파일과 바뀐 내용 기록.

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
