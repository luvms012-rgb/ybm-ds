<!-- https://luvms012-rgb.github.io/ybm-ds/site/get-started/ai.html -->

# AI & Tools

AI 도구와 YBM DS를 함께 쓰는 방법입니다.

## 소개

모든 문서를 AI가 읽기 쉬운 마크다운으로도 냅니다. 컴포넌트 목록, HTML 구조, 토큰도 파일로 열려 있어 AI가 DS 규칙대로 화면을 만듭니다.

## 요청 예시

### DS 적용하기

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

### 화면 만들기

대괄호 안만 내 상황에 맞게 바꿉니다.

```text
YBM DS로 [만들 화면, 예: 회원 목록 관리 화면]을 만들어 줘.
- 부품은 https://luvms012-rgb.github.io/ybm-ds/components.json에 있는 것만 쓰고, 마크업은 https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css 머리 주석 그대로 써.
- 쓰는 컴포넌트는 https://luvms012-rgb.github.io/ybm-ds/site/llms.txt에서 그 문서(.md)를 읽고 사용 지침을 따라.
- 비슷한 화면이 llms.txt의 Templates 목록에 있으면 그 HTML을 출발점으로 써.
- 모바일 먼저 만들고, 768px 이상과 1280px 이상에서 배치를 바꿔 줘.
- 글자는 한국어. 제목은 Bold에 자간 -0.02em, 항목 제목은 SemiBold, 본문은 Regular로 쓰고, 크기는 --ybm-font-size-* 토큰, 본문은 word-break: keep-all.
- 배치용 CSS에는 --ybm-* 토큰만 쓰고 hex 색은 쓰지 마.
```

### 규칙 점검하기

```text
이 화면이 YBM DS 규칙을 지키는지 점검하고 고쳐 줘.
- hex, rgb로 색을 직접 쓴 곳 → --ybm-color-* 토큰으로
- 토큰이 아닌 임의의 간격, 글자 크기 → --ybm-space-*, --ybm-font-size-* 로
- https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css에 없는 ds- 클래스, !important
- DS 부품으로 바꿀 수 있는데 직접 만든 버튼, 입력, 표
고친 곳은 목록으로 알려 줘.
```

## llms.txt

| 파일 | 내용 |
| --- | --- |
| [llms.txt](https://luvms012-rgb.github.io/ybm-ds/site/llms.txt) | 전체 목차입니다. AI가 필요한 문서를 골라 읽습니다. |
| [llms-full.txt](https://luvms012-rgb.github.io/ybm-ds/site/llms-full.txt) | 모든 문서를 한 파일로 모았습니다. 주소를 열지 못하는 도구에 첨부합니다. |
| 페이지별 `.md` | 문서 주소의 `.html`을 `.md`로 바꾸면 그 페이지만 받습니다. |

- 컴포넌트 하나만 필요하면 제목 아래 **Markdown** 메뉴에서 **내용 복사**를 누릅니다.
- 여러 컴포넌트로 화면을 만들 때는 `llms.txt` 주소를 알려 줍니다.

## AI가 읽는 파일

| 파일 | 내용 |
| --- | --- |
| [components.json](https://luvms012-rgb.github.io/ybm-ds/components.json) | 쓸 수 있는 컴포넌트와 속성 목록입니다. |
| [components.css](https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css) | 컴포넌트마다 머리 주석에 HTML 구조가 있습니다. |
| [tokens.css](https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/tokens.css) | 색, 간격, 글자 크기 같은 `--ybm-*` 토큰입니다. |
| Templates | `llms.txt` 끝에 템플릿마다 HTML 원본 주소가 있어 새 화면의 출발점으로 씁니다. |

## Figma

Figma 변수 이름이 CSS 변수 이름과 같습니다. Dev Mode에서 복사한 코드가 그대로 동작하고, AI에 Figma 화면을 주면 같은 토큰 이름으로 옮깁니다.

Figma 라이브러리컴포넌트와 토큰을 Figma에서 봅니다.
