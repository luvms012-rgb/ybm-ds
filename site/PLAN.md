# YBM DS 사이트 — 구상

- 작성: 2026-10-25
- 상태: **구상 단계, 코드 없음.** 사용자가 만들라고 할 때까지 만들지 않는다.
- 함께 읽을 문서: REFERENCE-ANALYSIS.md (레퍼런스 A, B 분석, 로컬 전용)

**확정 사항**
- IA: **Docs · Foundations · Components · Templates** (2026-10-26 Foundations를 상단 메뉴로 분리 — 아래 URL·사이드바도 이에 맞춤)
- 화면 구성은 레퍼런스 A, 컴포넌트 문서 깊이는 레퍼런스 B
- Getting Started는 **Quick Start with AI**로 시작
- 만드는 방식: **정적 HTML + GitHub Pages**. 빌드 스크립트가 ybm-ds 데이터(components.json, 토큰)를 읽어 페이지를 생성한다.

---

## 1. 원칙

1. **설치할 것 없음**: Node 내장 기능만 쓴다. 회사 윈도우와 집 Mac 모두 `node build.mjs` 하나로 빌드한다.
2. **사이트도 YBM DS로 만든다**: 버튼, 탭, 칩, 다이얼로그, 스낵바는 `ds-*`를 그대로 쓴다. 사이트 전용 CSS는 레이아웃(셸·그리드)에만 쓴다.
3. **ybm-ds가 정본**: 사이트는 DS 데이터를 읽기만 하고 복사해서 고치지 않는다. 사이트에만 필요한 정보는 사이트 저장소에 따로 둔다.
4. **한 곳만 고치면 반영**: 컴포넌트 추가나 토큰 변경은 ybm-ds에서만 하고, 사이트를 다시 빌드하면 목록·카드·Foundations가 따라 바뀐다.

---

## 2. 저장소와 폴더 구조

**ybm-ds 저장소 안 `site/` 폴더**로 둔다 (2026-10-30 확정, 처음 구상은 별도 저장소였다).

```
ybm-ds/site/
├─ CLAUDE.md                  어느 컴퓨터의 Claude든 먼저 읽는 안내
├─ README.md                  빌드·배포 방법
├─ REFERENCE-ANALYSIS.md      레퍼런스 분석
├─ PLAN.md                    이 문서
├─ site.config.json           사이트 제목·메뉴
├─ build.mjs                  생성기
├─ serve.mjs                  로컬 미리보기 서버 (Node 내장 http)
├─ src/
│  ├─ layouts/                shell.html(상단 바·사이드바·본문·목차), home.html
│  ├─ content/
│  │  ├─ docs/                Getting Started, 가이드 원고 (HTML 조각)
│  │  ├─ components/          <slug>.html — 사람이 쓰는 컴포넌트 문서
│  │  └─ templates/           <slug>/index.html — 템플릿 화면
│  ├─ data/
│  │  ├─ component-meta.json  slug·카테고리·한 줄 설명·상태·지원 배지 (no 로 매칭)
│  │  ├─ templates.json       템플릿 목록·카테고리·설명·사용 컴포넌트
│  │  └─ whats-new.json       새 소식
│  └─ assets/                 site.css, site.js, 로고
└─ dist/                      생성 결과 (Pages 배포 대상, git 제외)
```

**DS 위치**

사이트와 DS 가 한 저장소라 빌드는 항상 바로 위 폴더(`..`)를 읽는다. 컴퓨터마다 경로를 맞출 필요가 없다.

---|---|
| 집 Mac | `~/Works/ybm-ds` |
| 회사 윈도우 | `C:\Users\luvms\Desktop\works\ybm-ds` (ybm-ds README 기준) |

빌드는 다음 순서로 DS 위치를 찾는다.
1. `site.config.local.json`
2. 환경변수 `YBM_DS_PATH`
3. `../ybm-ds`, `../ds`
4. 없으면 Pages 주소(`https://luvms012-rgb.github.io/ybm-ds/`)에서 받아온다.

---

## 3. 데이터 흐름

| 원본 (ybm-ds) | 읽는 내용 | 만들어지는 것 |
|---|---|---|
| `components.json` | 47종의 번호·이름·CSS 클래스·Figma 노드와 변형 수·props 문자열 | Components 사이드바, 개요 카드, 상세 상단 메타, Properties 컨트롤 |
| `tokens/design-tokens.json` | 팔레트·시맨틱 색(light/dark), 타입 스케일, 간격, 반경, shape, 그림자 | Foundations 페이지 전체 |
| `ybm-ds/tokens.css` | CSS 변수 이름 | 토큰 표의 `var(--ybm-…)` 표기, 이름 검증 |
| `ybm-ds/components.css` | 클래스별 `--ds-*` 변수 | Properties 탭의 "커스텀 변수" 표 |
| `index.html`의 `.pv-sec[data-no]` | 컴포넌트별 미리보기 마크업 | 1차 미리보기·개요 카드 썸네일 (나중에 `content/components/`의 예제로 교체) |
| `ybm-ds/` 패키지 폴더 | CSS·JS·폰트 | `dist/ybm-ds/`로 복사. 사이트 자체 스타일이자 미리보기 |
| `README.md` | 사용법·Cascade Layers·커스텀 규칙·동기화 | Docs > 가이드 원고 (처음 한 번 옮겨 적음) |

`components.json`의 props 문자열(예: ``variant `brandSolid·neutralSolid` · size `small·medium` ``)을 나눠서 **이름 + 값 목록**으로 읽고, 이걸로 Properties 컨트롤을 만든다. 형식이 불규칙한 컴포넌트는 `component-meta.json`에 직접 적는다.

---

## 4. URL 구조

```
/                                   홈
/docs/getting-started/              시작하기 (Quick Start with AI)
/docs/whats-new/                    새 소식
/docs/guide/<slug>/                 가이드
/foundations/<slug>/                Foundations
/components/                        컴포넌트 개요
/components/<slug>/                 상세  (?tab=properties | accessibility)
/templates/                         템플릿 (?filter=<카테고리>, ?preview=<slug>)
/templates/<slug>/                  템플릿 단독 화면 (미리보기·새 창용)
/search-index.json                  검색 데이터
/llms.txt, /llms-full.txt           AI용 요약
/components/<slug>.md               AI용 컴포넌트 문서
```

---

## 5. 화면 설계

### 5-1. 공통 셸 (레퍼런스 A 방식)

- **상단 바** (고정, 반투명에 블러)
  - 왼쪽: `YBM DS` 로고
  - 가운데: Docs · Foundations · Components · Templates
  - 오른쪽: 검색(⌘K / Ctrl+K), Light/Dark, Figma, GitHub, `시작하기` 버튼(`ds-btn` neutralSolid small)
- **왼쪽 사이드바** 260px: 그룹 제목과 접기, 현재 페이지 강조
- **본문** 최대 800px. **오른쪽 목차** 232px, Docs에만 둔다.
- **반응형**
  - 1024px 미만: 목차를 숨긴다.
  - 768px 미만: 사이드바는 메뉴 버튼을 누르면 Bottom Sheet로 열린다.
- **글꼴·색**: 전부 DS 토큰(Pretendard, `--ybm-color-*`, `--ybm-font-size-t*`)을 쓰고, 사이트용 값을 따로 만들지 않는다.

### 5-2. 홈 (레퍼런스 A 홈의 YBM판)

1. **히어로**: YBM DS 로고타입, 한 줄 소개, CTA 2개(`시작하기`, `컴포넌트 보기`). 양옆에 실제 DS 컴포넌트로 만든 예시 카드를 둔다(예: 시험 접수 카드, 성적 확인 카드).
2. **벤토 4장**: Foundations / 47개 컴포넌트 / AI와 함께 쓰기 / Templates. 카드마다 실제 컴포넌트 미리보기와 `살펴보기 →`가 있다.
3. **숫자**: 컴포넌트 수, 토큰 수, 템플릿 수. 빌드 때 자동으로 센다.
4. **새 소식** 최근 3개 → 마무리 CTA → 푸터

영상·스크롤 연출(레퍼런스 B 방식)은 쓰지 않는다.

### 5-3. Docs

**사이드바**

| 그룹 | 페이지 |
|---|---|
| 시작하기 | Getting Started, 새 소식 |
| 가이드 | 사용법, Cascade Layers, 커스터마이즈(`--ds-*`), 테마와 Shape, JS 기능, Figma 동기화, 기여하기 |
| 리소스 | Figma, GitHub, llms.txt |

**Getting Started 페이지 순서**

1. H1과 리드 문장
2. **Quick Start with AI**: "AI 코딩 도구에 붙여넣으세요" 안내 아래 프롬프트 상자를 둔다. 상자마다 라벨과 복사 버튼이 있다.
   - ① **YBM DS 적용하기** (초안)
     > 이 프로젝트에 YBM DS를 적용해줘. `<head>`에 `https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css`와 `ybm-ds.js`(defer)를 넣고, `https://<사이트>/llms.txt`를 읽고 규칙을 따라. 서비스 CSS는 DS 다음에 불러오고, 커스텀은 `--ds-*` 변수로만 해. 새 클래스를 만들거나 `!important`를 쓰지 마.
   - ② **화면 만들기**: 컴포넌트 목록과 클래스 규칙을 알려 주고 요청한 화면을 DS로 구성하게 한다.
   - ③ **기존 화면 점검**: DS 규칙 위반(하드코딩 색·임의 클래스·`!important`)을 찾아 고치게 한다.
3. **직접 설치**: `<link>`·`<script>` 복사, `data-theme`·`data-shape`, 첫 컴포넌트 예시
4. **다음 단계** 카드: Foundations, Components, Templates

**Foundations (상단 메뉴 · 자체 사이드바 · 빌드 때 토큰에서 자동 생성)** — 원본은 공식 Figma Foundations 페이지(CLAUDE.md 참고)

| 페이지 | 내용 |
|---|---|
| Color | 팔레트 그리드(light/dark 값), 시맨틱 bg·fg·stroke 표와 견본, 이름 클릭하면 복사 |
| Typography | t01~t17 크기·행간 표와 샘플 문장, 굵기 4종 |
| Spacing | x0~x32 막대 시각화 |
| Radius·Shape | r0~r8, shape xs~xl, 기본·Soft·Sharp 비교 |
| Elevation | 1~5 단계와 용도별(raised·floating·panel·modal·overlay) 카드 |
| All Tokens | 전체 표 + 검색 필터 |
| Icons | `icons.css`의 아이콘 목록 그리드 + 이름 복사 |

### 5-4. Components

**개요 (`/components/`)**
- 사이드바 맨 위에 컴포넌트 검색 입력창(목록 필터)을 두고, 그 아래 카테고리별로 묶은 목록을 둔다.
- 본문: 제목 "컴포넌트", 설명 한 줄, 버튼 2개(`Figma에서 보기`, `설치하기`)
- 카테고리별 3열 카드: 미리보기(`.pv-stage` 첫 블록 축소), 이름, 상태 배지(신규·베타)
- 카테고리 배정은 REFERENCE-ANALYSIS.md §4 표를 따른다.

**상세 (`/components/<slug>/`)**
- **상단**: 분류, H1, 한 줄 설명, 메타(`.ds-btn` · Figma 변형 168개 · Figma 링크), 지원 배지(Figma ✓ · HTML/CSS ✓), `AI용 문서 복사` 버튼
- **탭** (`ds-tabs`, URL `?tab=`)
  - **Overview**
    - 큰 미리보기. 위쪽 미니 툴바에서 Light/Dark·Shape를 바꾼다.
    - 사용(Usage) → 구조(Anatomy, 번호 마커) → Variant·Size·State 갤러리
    - 가이드라인: 레퍼런스 B식 위계 표와 레퍼런스 A식 Do/Don't 배지 표
    - 예제 카드: 미리보기, `설명 | 코드` 탭, 코드 복사
  - **Properties**
    - 라이브 플레이그라운드: props 컨트롤 → 미리보기 갱신 + 생성된 HTML 표시
    - 속성 표: `data-*` 속성·값·기본값·설명
    - 커스텀 변수 표: `--ds-*`
    - Specification: variant·size별 토큰 값
  - **Accessibility**: 대비, 키보드, ARIA 요구사항. 처음엔 공통 항목에서 시작해 컴포넌트별로 추가한다.
- `content/components/<slug>.html`이 없으면 **자동 기본 페이지**(미리보기 + 메타 + 속성 표)로 만든다. 그래서 첫 빌드부터 47종이 전부 존재한다.

### 5-5. Templates

- 제목과 설명 한 줄
- 필터 칩(`ds-chip-tabs`): 전체 / 회원·로그인 / 고객센터 / 폼 / 목록·테이블 / 마이페이지 / 결제·신청 / 빈 화면·오류
- 3열 카드: 썸네일과 이름
- 카드를 누르면 미리보기 모달(`ds-dialog`)이 열린다. 모달에는 제목, 설명, 실제 화면(iframe), 사용 컴포넌트 목록, `HTML 복사`, `새 창에서 열기`가 있다.
- 첫 템플릿은 ybm-guide의 **회원가입**(`project/signup`)과 **고객센터**(`project/cs`)를 옮겨 온다.

### 5-6. 검색

- ⌘K / Ctrl+K로 가운데 팔레트를 연다. ↑↓로 이동, ↵로 선택, Esc로 닫는다.
- 빌드 때 `search-index.json`을 만든다. 담는 내용은 제목, 섹션, URL, 소제목, CSS 클래스명, 토큰 이름이다.
- 결과는 Docs / Components / Templates / 토큰으로 묶어서 보여 준다.

### 5-7. AI용 자료 (레퍼런스 B의 llms.txt 방식)

- `/llms.txt`: 사이트 요약, 적용 규칙, 컴포넌트 목록과 링크
- `/llms-full.txt`: 전체 문서 합본
- 컴포넌트마다 `.md` 파일을 두고, 상세 상단의 `AI용 문서 복사` 버튼으로 복사한다.

---

## 6. 브라우저 동작 (`site.js`, 프레임워크 없음)

| 기능 | 내용 |
|---|---|
| 테마·Shape 토글 | `<html data-theme / data-shape>` 변경, localStorage에 기억 |
| 검색 팔레트 | `search-index.json` 로드, 단순 매칭 |
| 탭 | `?tab=` 주소와 동기화 |
| 복사 | 코드·프롬프트·토큰 이름 복사 → `YBM.snackbar("복사했어요")` |
| 사이드바 필터 | 컴포넌트 목록 검색 |
| 목차 | 스크롤에 맞춰 현재 위치 강조 |
| 템플릿 | 필터 칩 `?filter=`, 모달 `?preview=` |
| 플레이그라운드 | 컨트롤 → 미리보기 속성 변경 → HTML 표시 |
| 모바일 메뉴 | 사이드바를 Bottom Sheet로 |

다이얼로그와 스낵바는 DS의 `ybm-ds.js`를 그대로 쓴다.

---

## 7. 빌드와 배포

- `node build.mjs` → `dist/` 생성. `node serve.mjs`로 로컬에서 미리보기.
- **배포는 GitHub Actions 권장**: push하면 GitHub에서 빌드해 Pages에 올린다. ybm-ds 저장소는 공개라서 Actions에서 그대로 읽을 수 있다. 회사 윈도우·집 Mac 어디서 push해도 결과가 같다.
- ybm-ds가 바뀌면 사이트도 다시 빌드해야 한다. 지금 `sync.mjs`가 가이드 사이트를 재배포하듯, 나중에 사이트 재빌드를 호출하도록 연결한다.

---

## 8. 진행 단계

| 단계 | 내용 |
|---|---|
| **P1 셸·데이터 연결** | 레이아웃, 메뉴, 사이드바 자동 생성. 47종 자동 기본 페이지(미리보기는 index.html에서). Foundations 자동 페이지. Getting Started 초안(Quick Start with AI). 검색, 다크모드, 로컬 빌드 |
| **P2 컴포넌트 문서** | 우선 10종을 레퍼런스 B 깊이로: Action Button, Text Field, Select, Checkbox, Radio, Switch, Tabs, Dialog, Snackbar, Badge. Properties 플레이그라운드 |
| **P3 Templates** | 회원가입·고객센터 이관, 필터·모달·썸네일 |
| **P4 마무리** | 홈, llms.txt, Actions 배포, 공개 범위·도메인 |

---

## 9. 정해야 할 것 (권장안)

| 항목 | 선택지 | 권장 |
|---|---|---|
| 사이트 저장소 | 새 저장소 `ybm-ds-site` / ybm-ds 안 폴더 | **확정: ybm-ds 안 `site/` 폴더** (2026-10-30), DS 를 사이트로 보여 주는 것이라 한 곳에서 관리 |
| 문서 작성 형식 | HTML 조각 / Markdown | **HTML 조각**으로 시작. Markdown은 라이브러리 1개가 필요해서 나중에 |
| 배포 | GitHub Actions / 로컬 스크립트 | **Actions** |
| 템플릿 썸네일 | iframe 축소(실시간) / 캡처 이미지 | iframe으로 시작. 느리면 이미지로 |
| 사이트용 컴포넌트 메타 | 사이트의 `component-meta.json` / `components.json` 확장 | **사이트 쪽 파일**: DS 정본을 건드리지 않음 |
| 언어 | 한국어만 / 한국어 + 영문 병기 | 한국어 중심, 컴포넌트·토큰 이름은 영문 |
| 공개 범위 | 공개 Pages / 회사 내부 호스팅 | 회사 확인 필요 (지금 ybm-ds는 공개) |
| 브랜드 | YBM 로고·히어로 이미지 | 회사 에셋 필요 |
