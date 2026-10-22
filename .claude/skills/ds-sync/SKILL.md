---
name: ds-sync
description: YBM DS 를 Figma ↔ 로컬(ds/) ↔ GitHub(ybm-ds 저장소·Pages) ↔ 가이드 사이트까지 한 번에 맞춘다. "ds 동기화", "DS 싱크", "피그마랑 맞춰줘", "DS 배포" 같은 요청이나, ds 폴더·Figma DS 를 고친 작업의 마지막 단계에 쓴다.
---

# YBM DS 동기화

Figma 파일 `1VCEsFU3xMWuXIntIrZz9i`(디자인 시스템)과 `works/ds` 를 맞추고 GitHub 까지 올린다. 모든 명령은 `works/ds` 에서 실행한다.

## 순서

1. **점검 스크립트 생성** — `node sync.mjs figma` → `tokens/.figma-check.js`
2. **Figma 읽기(읽기 전용)** — `figma-use` 스킬을 불러온 뒤, `tokens/.figma-check.js` 내용(첫 두 줄 주석 제외)을 그대로 `use_figma` 의 code 로 실행한다(fileKey `1VCEsFU3xMWuXIntIrZz9i`).
   반환값 `{ variables, components }` 를 **그대로** `tokens/.figma-result.json` 에 저장한다.
3. **반영·배포** — `node sync.mjs pull`
   - 변수 변경이 있으면 스냅샷 병합(백업) → 토큰 생성물 재빌드
   - 컴포넌트 대조 결과를 출력한다(Figma 에 없는 노드 · 변형 수 차이 · 목록에 없는 세트)
   - 검증 통과 시 커밋 → push → Pages → 가이드 사이트 재배포
4. **컴포넌트 차이 처리** — 3 에서 차이가 나오면 사용자에게 어느 쪽이 맞는지 묻는다. 정해지면
   - Figma 가 맞음 → `components.css`·`components.json`·`index.html`·README §6 을 고친다
   - 코드가 맞음 → Figma 컴포넌트를 고친다(`figma-use` + `figma-generate-library`)
   그다음 1~3 을 다시 실행한다.
5. 사용자에게 결과를 짧게 보고한다: 바뀐 것, 커밋 메시지, 사이트 주소(<https://luvms012-rgb.github.io/ybm-ds/>).

## 로컬만 고쳤을 때
`node sync.mjs deploy "무엇을 고쳤는지"` (또는 `동기화.bat`). Figma 쪽도 같은 작업 안에서 맞춘다(README §10-6 양방향 규칙).

## 실패할 때
| 메시지 | 처리 |
|---|---|
| 생성물이 스냅샷과 다름 | 누가 `tokens.css` 등을 손으로 고쳤다. Figma 변수를 고친 뒤 1~3 을 다시 하거나, `node sync.mjs build` 로 되돌린다 — 어느 쪽인지 사용자에게 묻는다 |
| CSS 에 없는 클래스 | `components.json` 과 `components.css` 가 어긋남 — 둘 중 맞는 쪽으로 고친다 |
| GitHub 저장소가 아직 없어요 | 사용자에게 github.com/new 에서 `ybm-ds`(Public, README 없이) 생성 + Settings → Pages(main / root) 를 부탁한다. 인증 정보를 꺼내 쓰지 않는다 |
| push 인증 실패 | 사용자에게 GitHub Desktop 이나 `배포하기.bat` 로 한 번 로그인해 달라고 한다 |

## 하지 말 것
- `ybm-ds/tokens.css` 와 `tokens/` 생성물을 손으로 고치지 않는다.
- Figma 점검 스크립트를 변수 쓰기용으로 바꾸지 않는다(이 절차의 Figma 단계는 읽기 전용).
- 문서·코드에 외부 레퍼런스 DS 의 이름·링크·비교 문구를 넣지 않는다.
