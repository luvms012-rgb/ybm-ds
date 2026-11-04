<!-- https://luvms012-rgb.github.io/ybm-ds/site/index.html -->

# Get Started

yds는 YBM 서비스를 위한 디자인 시스템입니다.

## AI로 시작하기

아래 글을 AI 코딩 도구(ChatGPT, Claude, Cursor 등)에 붙여 넣으면 됩니다.

### 설치하기

```text
이 프로젝트에 yds를 설치해 줘.
문서: https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
문서의 '지킬 것'을 먼저 읽고 그대로 따라 줘.
```

### 브랜드 컬러 입히기

서비스에 쓸 때 이어서 붙여 넣습니다. 대괄호 안에 브랜드 컬러를 넣습니다.

```text
이 서비스의 브랜드 컬러를 [#12a150]으로 맞춰 줘.
문서: https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
이 색을 600 단계로 두고 나머지 단계와 다크 모드 값을 만들어 서비스 CSS에 넣어 줘. 바뀐 화면도 보여 줘.
```

### 화면 만들기

대괄호 안만 내 상황에 맞게 바꿉니다.

```text
yds로 [만들 화면, 예: 회원 목록 화면]을 만들어 줘.
문서: https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
비슷한 화면이 Templates에 있으면 그 화면에서 시작해 줘.
```

### 규칙 점검하기

```text
이 화면이 yds 규칙을 지키는지 점검하고 고쳐 줘.
문서: https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
검사 스크립트로 먼저 검사하고, 고친 곳은 목록으로 알려 줘.
```

## 직접 시작하기

`<head>`에 두 줄을 넣으면 글꼴, 토큰, 아이콘, 컴포넌트가 함께 들어옵니다. 쓰는 법은 [Components](https://luvms012-rgb.github.io/ybm-ds/site/components/index.md)에 있습니다.

**최신 버전**

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
```

**버전 고정 v1.1.0**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/ybm-ds@v1.1.0/dist/ybm-ds.css">
<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/ybm-ds@v1.1.0/dist/ybm-ds.js" defer></script>
```

운영 서비스는 버전을 고정한 주소를 쓰고, 새 버전은 [Updates](https://luvms012-rgb.github.io/ybm-ds/site/updates.html)를 확인한 뒤 올립니다.

## 내 사이트에 적용해보기

운영 중인 사이트는 한 번에 바꾸지 않고 아래 순서대로 적용합니다. 브랜드 컬러와 규칙 점검은 위 AI로 시작하기의 글을 그대로 씁니다.

### 1. 사이트 살펴보기

아직 고치지 않고, 무엇을 어떤 순서로 바꿀지 먼저 정합니다.

```text
이 사이트에 yds를 옮겨 오려고 해. 아직 고치지 말고 먼저 살펴봐 줘.
문서: https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
공통 <head> 파일, CSS 파일, 자주 쓰는 색과 부품을 정리하고 바꿀 순서를 제안해 줘.
```

### 2. DS 넣기

공통 <head>에 넣습니다. 기존 CSS가 DS보다 먼저 적용되어 지금 화면은 거의 그대로입니다.

```text
이 사이트의 공통 <head>에 yds를 넣어 줘.
문서: https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
넣은 뒤 지금 화면에서 달라진 곳이 있으면 알려 줘.
```

### 3. 화면 하나씩 바꾸기

화면마다 대괄호 안만 바꿔 붙여 넣습니다.

```text
[바꿀 화면, 예: 회원 정보 수정] 화면을 yds 컴포넌트로 바꿔 줘.
문서: https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
서버 코드와 스크립트가 쓰는 class, id, name은 그대로 두고, 바꾸기 전후 화면을 비교해서 보여 줘.
```

## 다크 모드

`html`에 속성 하나를 붙이면 모든 색이 어두운 화면용으로 바뀝니다. 색을 토큰으로만 썼다면 따로 고칠 것이 없습니다.

**AI 요청**

```text
이 사이트에 yds 다크 모드를 넣어 줘.
문서: https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
화면 오른쪽 위에 라이트, 다크 전환 버튼을 만들고, 처음에는 기기 설정을 따르게 해 줘.
```

**HTML**

```html
<!-- 다크 모드 -->
<html lang="ko" data-theme="dark">

<!-- 기기 설정을 따를 때: <head> 맨 위 -->
<script>
  if (matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.dataset.theme = 'dark';
</script>
```

## AI가 읽는 파일

주소를 알려 주면 AI가 필요한 것을 골라 읽습니다. 주소를 열지 못하는 도구에는 `llms-full.txt`를 첨부합니다.

| 파일 | 내용 |
| --- | --- |
| [llms-full.txt](https://luvms012-rgb.github.io/ybm-ds/site/llms-full.txt) | 모든 문서를 한 파일로 모았습니다. |
| [llms.txt](https://luvms012-rgb.github.io/ybm-ds/site/llms.txt) | 전체 목차와 지킬 규칙입니다. AI가 여기서 시작합니다. |
| [AGENTS.md](https://luvms012-rgb.github.io/ybm-ds/site/ai/AGENTS.md) | 프로젝트 맨 위 폴더에 두면 AI 도구가 늘 읽는 규칙 파일입니다. |
| [CLAUDE.md](https://luvms012-rgb.github.io/ybm-ds/site/ai/CLAUDE.md), [yds.mdc](https://luvms012-rgb.github.io/ybm-ds/site/ai/yds.mdc) | Claude, Cursor용 규칙 파일입니다. 내용은 AGENTS.md와 같습니다. |
| [components.json](https://luvms012-rgb.github.io/ybm-ds/components.json) | 쓸 수 있는 컴포넌트와 속성 목록입니다. |
| [components.css](https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css) | 컴포넌트마다 머리 주석에 HTML 구조가 있습니다. |
| [tokens.css](https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/tokens.css) | 색, 간격, 글자 크기 같은 `--ds-*` 토큰입니다. |
| [icons.json](https://luvms012-rgb.github.io/ybm-ds/site/ai/icons.json) | 쓸 수 있는 아이콘 이름과 쓰임입니다. |
| [yds-check.mjs](https://luvms012-rgb.github.io/ybm-ds/site/ai/yds-check.mjs) | `node yds-check.mjs 폴더`로 규칙을 어긴 곳을 찾습니다. |
| [design-tokens.json](https://luvms012-rgb.github.io/ybm-ds/tokens/design-tokens.json) | 표준 토큰 형식입니다. 디자인 도구와 토큰 변환기에서 읽습니다. |
| [tokens.js](https://luvms012-rgb.github.io/ybm-ds/tokens/tokens.js) | 스크립트에서 토큰 값을 쓸 때 불러옵니다. |
| [tailwind.preset.js](https://luvms012-rgb.github.io/ybm-ds/tokens/tailwind.preset.js) | Tailwind에 yds 토큰을 연결합니다. |
| 페이지별 `.md` | 문서 제목 아래 Markdown 메뉴에서 그 페이지만 복사합니다. |

Figma 변수와 CSS 변수는 이름이 같습니다. AI에 [Figma](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2608-2) 화면을 주면 같은 토큰으로 옮깁니다.
