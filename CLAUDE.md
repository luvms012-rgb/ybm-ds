# ybm-ds — 작업 기준 (집 PC · 회사 PC 공용)

집(**Mac**)과 회사(**Windows**) 두 PC 에서 같은 저장소로 작업한다. 이 파일은 저장소에 같이 올라가므로 어느 PC 에서든 Claude 가 먼저 읽는다.
PC 마다 따로 쌓이는 Claude 메모리는 서로 보이지 않는다 — 두 PC 가 함께 알아야 할 것은 여기에 적는다.

- 최종 갱신: 2026-10-26 (회사 PC)

## 1. 기준 주소

| 항목 | 주소 |
|---|---|
| 공식 Figma (정본) | 파일 `1VCEsFU3xMWuXIntIrZz9i` "디자인 시스템" — Foundations 페이지 <https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2274-1143> |
| GitHub 저장소 | <https://github.com/luvms012-rgb/ybm-ds> (브랜치 `main`) |
| 배포 (Pages) | <https://luvms012-rgb.github.io/ybm-ds/> |
| 사이트 저장소 | <https://github.com/luvms012-rgb/ybm-ds-site> — 용도·이 저장소와의 관계는 아직 정하지 않음, 작업 전 사용자에게 확인 |

Foundations 페이지 섹션(위→아래): Color `2288:63` · Typography `2288:64` · Spacing `2288:67` · Radius `2288:66` · Elevation `2288:65`.

## 2. 두 PC 싱크 규칙

GitHub `main` 이 기준이다. PC 사이에 직접 옮기는 파일은 없다.

1. **작업 시작** — `git pull` 로 다른 PC 에서 올린 것부터 받는다. 받기 전에 로컬에 커밋 안 된 변경이 있으면 먼저 사용자에게 묻는다.
2. **작업 끝 / "저장하고 스탑"** — 커밋하고 `git push` 한다(또는 `node sync.mjs deploy "메시지"`). 다른 PC 에서 이어 갈 수 있도록 이 파일 §3 "진행 상황" 을 같이 고친다.
3. 한쪽 PC 에만 있는 커밋 안 된 작업은 다른 PC 에서 보이지 않는다. 작업을 넘길 때는 반드시 push 까지 한다.
4. 로컬 전용 파일(`.cache/`, `tokens/.figma-*` 등)은 올리지 않는다.

### 처음 세팅 (새 PC)

```
git clone https://github.com/luvms012-rgb/ybm-ds.git
```

- Node.js 가 있어야 한다(`node sync.mjs` 로 확인). 패키지 설치는 필요 없다.
- push 는 그 PC 의 Git 로그인을 쓴다(Mac: GitHub Desktop 또는 키체인, Windows: Git Credential Manager). Claude 가 인증 정보를 직접 다루지 않는다.
- Figma 읽기·쓰기는 Claude 의 Figma 커넥터로 한다(PC 마다 한 번 연결).
- 폴더 위치는 PC 마다 달라도 된다. README 의 로컬 경로(`C:\Users\...`)는 회사 PC 기준.

### Mac 에서 다른 점

- `동기화.bat` 은 Windows 전용 → Mac 에서는 `node sync.mjs deploy "메시지"` 를 터미널에서 실행한다. 나머지 `node sync.mjs ...` 명령은 똑같다.
- 가이드 사이트 재배포(`project/_publish/publish.ps1`)는 Windows 에서만 돈다. Mac 에서 deploy 하면 ybm-ds 만 올라가고 가이드 사이트는 회사 PC 에서 다시 배포해야 한다.
- `.gitattributes` 가 `* -text`(줄바꿈 변환 없음)다. 파일의 줄바꿈을 바꾸지 않는다 — 현재 CRLF 는 `동기화.bat` 하나뿐이고 나머지는 LF.

## 3. 진행 상황

- **확정** — 문서 사이트 상단 메뉴(IA): **Docs · Foundations · Components · Templates**. Foundations 는 Docs 하위가 아니라 독립 메뉴이고, 원본은 위 Foundations 페이지.
- **예정 (보류)** — Figma 구성을 레퍼런스 라이브러리 기준으로 개편. 사용자가 요청할 때만 시작.
- **회사 PC 에만 있음** — 로컬 브랜치 `backup/2026-10-26-local`(push 안 함): 10-23~24 작업분(구조 정리 · cssOnly 버그 수정 · `components/index.html` 컴포넌트 메인 · 이전 CLAUDE.md 초안). 꺼내 쓸지는 사용자가 정한다.

## 4. 작업 규칙

- 사용법·동기화·토큰·컴포넌트 상세는 `README.md`, Figma 동기화 절차는 `.claude/skills/ds-sync/SKILL.md`.
- 커밋·배포는 사용자가 요청할 때만.
- 문서·코드에 외부 레퍼런스 DS 의 이름·링크·비교 문구를 넣지 않는다.
- `ybm-ds/tokens.css` 와 `tokens/` 생성물은 손으로 고치지 않는다.
