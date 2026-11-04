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

### 브랜드 컬러 입히기

서비스에 쓸 때 이어서 붙여 넣습니다.

```text
이 서비스의 브랜드 색을 나에게 먼저 물어봐 줘.
그 색으로 YBM DS 브랜드 색을 맞춰 서비스 CSS에 넣고, 정하지 않으면 기본 색으로 둬. 바꾼 화면을 먼저 보여 줘.
```

### 화면 만들기

대괄호 안만 내 상황에 맞게 바꿉니다.

```text
YBM DS로 [만들 화면, 예: 회원 목록 화면]을 만들어 줘.
https://luvms012-rgb.github.io/ybm-ds/site/llms.txt 규칙을 따르고, 비슷한 화면이 Templates 목록에 있으면 거기서 시작해 줘.
```

### 규칙 점검하기

```text
이 화면이 YBM DS 규칙을 지키는지 https://luvms012-rgb.github.io/ybm-ds/site/llms.txt 기준으로 점검하고 고쳐 줘. 고친 곳은 목록으로 알려 줘.
```

## 직접 시작하기

`<head>`에 두 줄을 넣으면 글꼴, 토큰, 아이콘, 컴포넌트가 함께 들어옵니다. 쓰는 법은 [Components](https://luvms012-rgb.github.io/ybm-ds/site/components/index.md)에 있습니다.

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
```

## 다크 모드

`html`에 속성 하나를 붙이면 모든 색이 어두운 화면용으로 바뀝니다. 색을 토큰으로만 썼다면 따로 고칠 것이 없습니다.

```html
<html lang="ko" data-theme="dark">
```

## AI가 읽는 파일

주소를 알려 주면 AI가 필요한 것을 골라 읽습니다. 주소를 열지 못하는 도구에는 `llms-full.txt`를 첨부합니다.

| 파일 | 내용 |
| --- | --- |
| [llms.txt](https://luvms012-rgb.github.io/ybm-ds/site/llms.txt) | 전체 목차와 지킬 규칙입니다. AI가 여기서 시작합니다. |
| [llms-full.txt](https://luvms012-rgb.github.io/ybm-ds/site/llms-full.txt) | 모든 문서를 한 파일로 모았습니다. |
| 페이지별 `.md` | 문서 제목 아래 **Markdown** 메뉴에서 그 페이지만 복사합니다. |
| [components.json](https://luvms012-rgb.github.io/ybm-ds/components.json) | 쓸 수 있는 컴포넌트와 속성 목록입니다. |
| [components.css](https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css) | 컴포넌트마다 머리 주석에 HTML 구조가 있습니다. |
| [tokens.css](https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/tokens.css) | 색, 간격, 글자 크기 같은 `--ds-*` 토큰입니다. |

Figma 변수 이름이 CSS 변수 이름과 같아, AI에 [Figma](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2608-2) 화면을 주면 같은 토큰 이름으로 옮깁니다.
