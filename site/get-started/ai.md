<!-- https://luvms012-rgb.github.io/ybm-ds/site/get-started/ai.html -->

# AI & Tools

AI 도구와 YBM DS를 함께 쓰는 방법입니다.

## 소개

모든 문서를 AI가 읽기 쉬운 마크다운으로도 냅니다. 컴포넌트 목록, HTML 구조, 토큰도 파일로 열려 있어 AI가 DS 규칙대로 화면을 만듭니다.

## 요청 예시

### DS 설치하기

```text
이 프로젝트에 YBM DS를 넣어 줘.
https://luvms012-rgb.github.io/ybm-ds/site/llms.txt 를 먼저 읽고, 거기 적힌 설치 방법과 규칙을 따라 줘.
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

### 서비스 색 입히기

```text
이 서비스의 브랜드 색을 나에게 먼저 물어봐 줘.
그 색으로 YBM DS 브랜드 색을 맞춰 서비스 CSS에 넣고, 정하지 않으면 기본 색으로 둬. 바꾼 화면을 먼저 보여 줘.
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
| [tokens.css](https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/tokens.css) | 색, 간격, 글자 크기 같은 `--ds-*` 토큰입니다. |
| Templates | `llms.txt` 끝에 템플릿마다 HTML 원본 주소가 있어 새 화면의 출발점으로 씁니다. |

## Figma

Figma 변수 이름이 CSS 변수 이름과 같습니다. Dev Mode에서 복사한 코드가 그대로 동작하고, AI에 Figma 화면을 주면 같은 토큰 이름으로 옮깁니다.

Figma 라이브러리컴포넌트와 토큰을 Figma에서 봅니다.
