# ybm-ds - 작업 기준 (집 PC, 회사 PC 공용)

집(**Mac**)과 회사(**Windows**) 두 PC 에서 같은 저장소로 작업한다. 이 파일은 저장소에 같이 올라가므로 어느 PC 에서든 Claude 가 먼저 읽는다.
PC 마다 따로 쌓이는 Claude 메모리는 서로 보이지 않는다 - 두 PC 가 함께 알아야 할 것은 여기에 적는다.

- 최종 갱신: 2026-10-27 (회사 PC)

## 1. 기준 주소

| 항목 | 주소 |
|---|---|
| 공식 Figma (정본) | 파일 `1VCEsFU3xMWuXIntIrZz9i` "디자인 시스템" - Foundations 페이지 <https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2274-1143> |
| GitHub 저장소 | <https://github.com/luvms012-rgb/ybm-ds> (브랜치 `main`) |
| 배포 (Pages) | <https://luvms012-rgb.github.io/ybm-ds/> |
| 사이트 저장소 | <https://github.com/luvms012-rgb/ybm-ds-site> - 용도/이 저장소와의 관계는 아직 정하지 않음, 작업 전 사용자에게 확인 |

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
- **끝냄 (2026-10-27)** - 변수 모드 정리: Typography 130%/150%, Shape Soft/Sharp 삭제 → 모드는 색의 Light / Dark 만. 코드 토큰(`tokens/figma-variables.json` → `tokens.css` 등)/미리보기/README 반영. Figma 페이지 개편 때 새로 만든 컴포넌트 10종은 아직 CSS/`components.json` 미등록.
- **끝냄 (2026-10-27)** - 로컬 폴더 `works/ds` → `works/ybm-ds`(집 Mac 과 같은 이름), 배포 패키지 `ybm-ds/` → `dist/`(공개 주소 `…/ybm-ds/dist/ybm-ds.css`, 가이드 사이트 경로/`dsUrl` 함께 변경). 아이콘 선 굵기 크기 비례(크기 ÷ 12, Figma/CSS), 2px 테두리 → 1px, 원본이 끊겼던 인스턴스 1,061개 다시 연결, `palette/brand-1000` 추가와 브랜드 색 바꾸는 방법(README §5.3), Icons 페이지 문서 프레임화.
- **정리 후보 (미정)** - 값이 같은 변수: `bg/neutral-inverted(-pressed)` = `bg/neutral-solid(-pressed)`, `bg/neutral-subtle` = `bg/layer-default` = `fg/neutral-inverted` = `fg/on-neutral-solid`. 빈칸: `bg/neutral-weak`(현재 `bg/neutral` 이 대신). 텍스트 스타일 `Scale/*` 와 `Static/*` 는 이제 값이 같다. Icons 페이지 옆 "미사용 벡터 (확인 후 삭제)" 13개.
- **회사 PC 에만 있음** - 로컬 브랜치 `backup/2026-10-26-local`(push 안 함): 10-23~24 작업분(구조 정리, cssOnly 버그 수정, `components/index.html` 컴포넌트 메인, 이전 CLAUDE.md 초안). 꺼내 쓸지는 사용자가 정한다.

## 4. 작업 규칙

- 사용법/동기화/토큰/컴포넌트 상세는 `README.md`, Figma 동기화 절차는 `.claude/skills/ds-sync/SKILL.md`.
- 커밋/배포는 사용자가 요청할 때만.
- 문서/코드에 외부 레퍼런스 DS 의 이름/링크/비교 문구를 넣지 않는다.
- `dist/tokens.css` 와 `tokens/` 생성물은 손으로 고치지 않는다.
