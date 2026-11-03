<!-- https://luvms012-rgb.github.io/ybm-ds/site/get-started/ai.html -->

# AI

AI 도구가 YBM DS 문서를 바로 읽을 수 있도록 모든 문서를 마크다운으로도 제공합니다. 컴포넌트 하나만 가져갈 수도, 전체를 한 번에 줄 수도 있습니다.

## 파일

| 파일 | 내용 |
| --- | --- |
| [llms.txt](https://luvms012-rgb.github.io/ybm-ds/site/llms.txt) | 전체 목차입니다. 분류별 문서 링크와 한 줄 설명이 있어, AI 가 필요한 문서를 골라 읽습니다. |
| [llms-full.txt](https://luvms012-rgb.github.io/ybm-ds/site/llms-full.txt) | 모든 문서를 한 파일로 모았습니다. 주소를 읽지 못하는 도구에 첨부할 때 씁니다. |
| 페이지별 `.md` | 각 문서 주소의 `.html` 을 `.md` 로 바꾸면 그 페이지만 마크다운으로 받습니다. 예) `components/action-button.md` |

## 사용방법

1. 컴포넌트 하나만 필요하면 그 페이지 제목 아래 **Markdown** 메뉴에서 **내용 복사**를 누르고 AI 대화에 붙여 넣습니다.
2. 여러 컴포넌트로 화면을 만들 때는 `llms.txt` 주소를 알려 주면 AI 가 필요한 문서를 찾아 읽습니다.
3. 주소를 열지 못하는 도구에는 `llms-full.txt` 를 파일로 첨부합니다.
4. 새 화면은 `llms.txt` 의 Templates 목록에서 비슷한 화면의 HTML 을 출발점으로 삼게 하면 배치와 여백이 DS 기준에 맞습니다.

## 템플릿 목록

`llms.txt` 에는 문서 말고도 AI 가 바로 가져다 쓸 수 있는 템플릿 목록이 있습니다.

| 목록 | 내용 |
| --- | --- |
| Templates | 템플릿마다 HTML 원본 주소와 한 줄 설명입니다. 그대로 열면 되는 완성된 화면이라 고쳐 쓰기 좋습니다. |

## 요청 예시

```text
아래 YBM DS 문서를 읽고 로그인 화면을 HTML 로 만들어 줘.
부품은 .ds-* 클래스만, 색과 간격은 --ybm-* 토큰만 써 줘.
https://luvms012-rgb.github.io/ybm-ds/site/llms.txt
```

### 화면 만들기

만들고 싶은 화면을 말로 설명하면 DS 부품으로 조립합니다. 대괄호 안만 내 상황에 맞게 바꾸면 됩니다.

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

이미 만든 화면이 DS 규칙을 지키는지 확인하고 고칩니다.

```text
이 화면이 YBM DS 규칙을 지키는지 점검하고 고쳐 줘.
- hex, rgb로 색을 직접 쓴 곳 → --ybm-color-* 토큰으로
- 토큰이 아닌 임의의 간격, 글자 크기 → --ybm-space-*, --ybm-font-size-* 로
- https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main/dist/components.css에 없는 ds- 클래스, !important
- DS 부품으로 바꿀 수 있는데 직접 만든 버튼, 입력, 표
고친 곳은 목록으로 알려 줘.
```

문서를 고치면 사이트를 다시 만들 때 마크다운도 함께 새로 만들어집니다.
