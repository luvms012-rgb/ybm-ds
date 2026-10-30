# ybm-ds - 작업 기준 (집 PC, 회사 PC 공용)

집(**Mac**)과 회사(**Windows**) 두 PC 에서 같은 저장소로 작업한다. 이 파일은 저장소에 같이 올라가므로 어느 PC 에서든 Claude 가 먼저 읽는다.
PC 마다 따로 쌓이는 Claude 메모리는 서로 보이지 않는다 - 두 PC 가 함께 알아야 할 것은 여기에 적는다.

- 최종 갱신: 2026-10-30 (회사 PC)

## 1. 기준 주소

| 항목 | 주소 |
|---|---|
| 공식 Figma (정본) | 파일 `1VCEsFU3xMWuXIntIrZz9i` "디자인 시스템" - Foundations 페이지 <https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2274-1143> |
| GitHub 저장소 | <https://github.com/luvms012-rgb/ybm-ds> (브랜치 `main`) |
| 배포 (Pages) | <https://luvms012-rgb.github.io/ybm-ds/> |
| 문서 사이트 | 이 저장소의 [site/](site/CLAUDE.md) 폴더 (2026-10-30 별도 저장소 ybm-ds-site 에서 합침). 구상 단계, 사용자가 만들라고 하기 전에는 코드 없음 |

Foundations 페이지 문서 프레임(왼쪽→오른쪽): Color `2486:2`, Typography `2486:13`, Spacing `2486:24`, Radius `2486:35`, Elevation `2486:46`.

## 2. 두 PC 싱크 규칙

GitHub `main` 이 기준이다. PC 사이에 직접 옮기는 파일은 없다.

1. **작업 시작** - `git pull` 로 다른 PC 에서 올린 것부터 받는다. 받기 전에 로컬에 커밋 안 된 변경이 있으면 먼저 사용자에게 묻는다.
2. **작업 끝 / "저장하고 스탑"** - 커밋하고 `git push` 한다(또는 `node sync.mjs deploy "메시지"`). 다른 PC 에서 이어 갈 수 있도록 이 파일 §3 "진행 상황" 을 같이 고친다.
3. 한쪽 PC 에만 있는 커밋 안 된 작업은 다른 PC 에서 보이지 않는다. 작업을 넘길 때는 반드시 push 까지 한다.
4. 로컬 전용 파일(`.cache/`, `tokens/.figma-*` 등)은 올리지 않는다.

### 처음 세팅 (새 PC)

```
git clone https://github.com/luvms012-rgb/ybm-ds.git
```

- Node.js 가 있어야 한다(`node sync.mjs` 로 확인). 패키지 설치는 필요 없다.
- push 는 그 PC 의 Git 로그인을 쓴다(Mac: GitHub Desktop 또는 키체인, Windows: Git Credential Manager). Claude 가 인증 정보를 직접 다루지 않는다.
- Figma 읽기/쓰기는 Claude 의 Figma 커넥터로 한다(PC 마다 한 번 연결).
- 폴더 위치는 PC 마다 달라도 된다. README 의 로컬 경로(`C:\Users\...`)는 회사 PC 기준.

### Mac 에서 다른 점

- `동기화.bat` 은 Windows 전용 → Mac 에서는 `node sync.mjs deploy "메시지"` 를 터미널에서 실행한다. 나머지 `node sync.mjs ...` 명령은 똑같다.
- 가이드 사이트 재배포(`project/_publish/publish.ps1`)는 Windows 에서만 돈다. Mac 에서 deploy 하면 ybm-ds 만 올라가고 가이드 사이트는 회사 PC 에서 다시 배포해야 한다.
- `.gitattributes` 가 `* -text`(줄바꿈 변환 없음)다. 파일의 줄바꿈을 바꾸지 않는다 - 현재 CRLF 는 `동기화.bat` 하나뿐이고 나머지는 LF.

## 3. 진행 상황

- **확정** - 문서 사이트 상단 메뉴(IA): **Docs, Foundations, Components, Templates**. Foundations 는 Docs 하위가 아니라 독립 메뉴이고, 원본은 위 Foundations 페이지.
- **끝냄 (2026-10-27)** - Figma 페이지 구성을 레퍼런스 라이브러리 형식으로 개편(README §4). 디자인 시스템(변수/텍스트 스타일/컴포넌트)은 그대로이고, 컴포넌트 40종을 카테고리 페이지 10개로 옮겨 문서 프레임(헤더 + 마스터 컴포넌트)에 담았다. 우리에게 없는 것(Templates, Chat 페이지, 문서 본문의 사용 예시 블록)은 비워 둠.
- **끝냄 (2026-10-27)** - 변수 모드 정리: Typography 130%/150%, Shape Soft/Sharp 삭제 → 모드는 색의 Light / Dark 만. 코드 토큰(`tokens/figma-variables.json` → `tokens.css` 등)/미리보기/README 반영. Figma 페이지 개편 때 새로 만든 컴포넌트 10종은 10-28 CSS 와 함께 등록.
- **끝냄 (2026-10-27)** - 로컬 폴더 `works/ds` → `works/ybm-ds`(집 Mac 과 같은 이름), 배포 패키지 `ybm-ds/` → `dist/`(공개 주소 `…/ybm-ds/dist/ybm-ds.css`, 가이드 사이트 경로/`dsUrl` 함께 변경). 아이콘 선 굵기 크기 비례(크기 ÷ 12, Figma/CSS), 2px 테두리 → 1px, 원본이 끊겼던 인스턴스 1,061개 다시 연결, `palette/brand-1000` 추가와 브랜드 색 바꾸는 방법(README §5.3), Icons 페이지 문서 프레임화.
- **끝냄 (2026-10-28)** - Figma 에만 있던 10종 CSS 완성 + 등록: 49 Select Box, 50 Time Picker, 51 Table Pagination, 52 Popover, 53 Chat(5종), Text Link 는 02번에 Figma ID. 하위 부품 3개(Segmented Control Item, Tag Group Item, Checkbox Mark)도 등록 → Figma 대조 74개 일치, 미등록 0. `ybm-ds.js` 에 Popover 열고 닫기, Time Picker 휠, Chat 입력창 동작 추가. 아이콘 `square` 추가. 예시 문구에서 특정 서비스 내용을 뺌.
- **끝냄 (2026-10-29)** - 새 부품 4종을 Figma 와 CSS 에 함께 만듦: 54 Top App Bar(+ Button), 55 Top Navigation(+ Item) 은 Navigation 페이지, 56 Search Suggestion(+ Item), 57 File Attach(Dropzone/Trigger/Item) 는 Data Input 페이지. 처음 만든 것이 레퍼런스 가이드와 달라 같은 날 가이드 규격으로 다시 만들었다(따로 두었던 둥근 Search Field 는 지우고 Text Field 로 대신). 아이콘 `upload`, `clock` 추가, `ybm-ds.js` 에 추천어 화살표 키와 파일 끌어 놓기 표시.
- **원칙** - 새 부품의 큰 틀, 쓰임, 위계, 여백, 밸런스는 사용자가 정한 레퍼런스 가이드 2곳(메모리/대화 기록 참고)의 같은 부품에서만 가져온다. 만들기 전에 그 규격부터 확인한다.
- **원칙** - 이 DS 는 완전 범용이다. 특정 서비스나 사이트를 근거로 부품을 정하거나 예시 문구에 넣지 않는다.
- **끝냄 (2026-10-29)** - 58 Menu Sheet(Overlay), 59 Result Section, 61 Status Dot(Feedback & Status), 60 Timer(Content) 를 Figma 와 CSS 에 함께 만듦. Spinner 는 Progress Circle indeterminate 와 겹쳐 만들지 않음.
- **끝냄 (2026-10-29)** - 62 Checkbox Group, 71 Multi Select(Data Input), 63 Scroll Fog, 64 Pull To Refresh(Layout), 65 Side Panel(Overlay), 66 Image Frame, 67 Carousel(Content), 68 Markdown, 69 Code Block, 70 Citation(Chat) 을 Figma 와 CSS 에 함께 만듦.
- **끝냄 (2026-10-29)** - 파운데이션 검토 후 필요한 것만: 반응형 기준점(sm 480 / md 768 / lg 1280 / xl 1440, CSS 전용 토큰 + .u-hide-from-* / .u-show-from-*), 모션 값을 레퍼런스 가이드 값으로 맞춤(+ easing-enter / exit). sync pull 이 cssOnly 를 지우던 문제 수정.
- **끝냄 (2026-10-30)** - 별도 저장소 ybm-ds-site(구상 문서뿐)를 이 저장소 `site/` 로 합침. 레퍼런스 분석 문서는 외부 이름이 들어 있어 로컬 전용(`site/.gitignore`)이라 다른 PC 에는 없다. 예전 ybm-ds-site 저장소는 더 쓰지 않는다.
- **끝냄 (2026-10-30)** - 문서 사이트 첫 버전 `site/` (Get Started / Components 70종 / Templates 9종, `node site/build.mjs` 로 생성). 자세한 것은 [site/CLAUDE.md](site/CLAUDE.md), 부족한 정책 제안은 [site/PROPOSAL.md](site/PROPOSAL.md)(사용자 검토 대기). Code Block 에 `data-wrap` 추가.
- **끝냄 (2026-10-30)** - 사이트 화면을 레퍼런스 A 실측에 더 맞춤: 왼쪽 메뉴(접는 묶음, 항목 32), 박스 배경과 테두리, 컴포넌트 목록(회색 미리보기 3열, 메뉴 위 찾기 칸)과 상세(912 가운데), 템플릿 목록(PC 왼쪽 메뉴 없음), 파운데이션을 항목마다 한 페이지(색, 글자, 간격, 모서리, 그림자, 움직임, 아이콘)로. 이어서 컴포넌트 목록과 상세를 문서와 같은 752 폭으로, 썸네일은 레퍼런스 B 방식, 아이콘 페이지에 Lucide 전체 1,999개 목록과 찾기(site/src/lucide-icons.json). 마지막으로 배치, 상자, 제목 구성, 영문 왼쪽 메뉴, 이전/다음, 푸터를 레퍼런스 B 실측으로 바꾸고 상단 막대도 본문 칸에 맞춤, 컴포넌트 목록과 메뉴는 ABC 순, 설명/개수/Figma 메뉴/확인 줄은 사용자 지시로 뺌. Foundations 를 상단 메뉴로 분리(foundations/ 폴더, 카드 목록 + 항목 페이지). 상단 막대 높이/메뉴 글자/여백도 레퍼런스 B 값, 페이지 제목은 모두 영문, 아이콘 페이지 찾기 칸. 파운데이션은 컴포넌트 다음에 레퍼런스 B 기준으로 다시 작업 예정. 규칙은 site/CLAUDE.md.
- **보류 (필요해지면)** - 모션 Figma 변수화(Figma 동작에 연결 안 됨), 역할 이름 글자 스타일(같은 값 두 벌이 됨, 필요하면 README 대응표만), 그라데이션(스크롤 끝 흐림 하나뿐), 브랜드 교체 층(두 번째 브랜드가 생길 때), 일러스트(그림 자체가 필요).
- **끝냄 (2026-10-27)** - 체크박스 체크와 가로선을 아이콘 세트에서 분리해 전용 부품 `Checkbox Mark`(굵기 고정, CSS 와 같음). 채움형(Solid) 아이콘 원본 그림을 크기에 맞춰 늘고 줄도록 고쳐 Banner, 하단 탭 아이콘 정렬 해결. Figma 문서 설명 문구를 쉬운 한 문장으로 전부 다시 씀.
- **다음 할 일 (보류, 요청할 때만)** - Templates 페이지(`2479:5`) 모바일 375 템플릿 10종: 1 로그인 / 2 서비스 홈 / 3 검색 결과, 목록 / 4 상세 화면 / 5 신청서 작성 / 6 마이페이지, 설정 / 7 고객센터 FAQ / 8 고객센터 채팅 상담 / 9 고객센터 만족도 설문 / 10 빈 화면, 오류. DS 에 없는 상단 앱바, 점수형 문항은 템플릿 안에서 먼저 조합.
- **정리 후보 (미정)** - 값이 같은 변수: `bg/neutral-inverted(-pressed)` = `bg/neutral-solid(-pressed)`, `bg/neutral-subtle` = `bg/layer-default` = `fg/neutral-inverted` = `fg/on-neutral-solid`. 빈칸: `bg/neutral-weak`(현재 `bg/neutral` 이 대신). 텍스트 스타일 `Scale/*` 와 `Static/*` 는 이제 값이 같다. Icons 페이지 옆 "미사용 벡터 (확인 후 삭제)" 13개.
- **회사 PC 에만 있음** - 로컬 브랜치 `backup/2026-10-26-local`(push 안 함): 10-23~24 작업분(구조 정리, cssOnly 버그 수정, `components/index.html` 컴포넌트 메인, 이전 CLAUDE.md 초안). 꺼내 쓸지는 사용자가 정한다.

## 4. 작업 규칙

- 사용법/동기화/토큰/컴포넌트 상세는 `README.md`, Figma 동기화 절차는 `.claude/skills/ds-sync/SKILL.md`.
- 커밋/배포는 사용자가 요청할 때만.
- 문서/코드에 외부 레퍼런스 DS 의 이름/링크/비교 문구를 넣지 않는다.
- `dist/tokens.css` 와 `tokens/` 생성물은 손으로 고치지 않는다.
- 문장 규칙(문서, Figma 문구, 답변 모두): 긴 대시와 가운뎃점을 쓰지 않고 "-", ",", "/" 로 쓴다. 설명은 "크기에 따라 달라지는 모양입니다." 처럼 쉬운 한 문장으로 끝내고, 뒤에 값 목록이나 괄호 안 예시 나열을 붙이지 않는다.
