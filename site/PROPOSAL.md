# YBM DS 사이트 - 추가 제안 (검토용)

> 2026-10-30 작성. 사이트는 지금 ybm-ds 에 **정의되거나 작성된 것만**으로 만들었다.
> 아래는 DS 에 아직 없어서 사이트에 넣지 않은 것들이다. 검토 후 고른 것만 DS 와 사이트에 추가한다.
> 표의 "권장" 은 먼저 하면 효과가 큰 순서다.

---

## 1. 설치 방법 (2순위, 개발자용)

지금 사이트에 있는 설치 방법은 모두 바로 쓸 수 있는 것이다.

| 순위 | 방법 | 지금 | 누가 |
|---|---|---|---|
| 1 | CSS 두 줄(`<link>` + `<script>`) | 됨 | 모두 |
| 1-1 | 공개 CDN 주소에 커밋 번호로 버전 고정 | 됨 | 개발자 |
| 1-2 | 저장소 내려받아 `dist/` 복사 | 됨 | 개발자, 사내 서버 |
| 2 | **npm 패키지** | 안 됨 - 제안 | 개발자 |
| 3 | npx 로 컴포넌트 코드 복사 | 안 됨 - 권장하지 않음 | - |

### npm, npx 가 뭔가요
- **npm** 은 개발자들이 쓰는 "부품 가게"다. `npm install 이름` 한 줄로 프로젝트에 라이브러리를 받고, 버전 번호로 관리한다. React, Vue, Next.js 같은 요즘 프로젝트는 거의 모두 이 방식으로 CSS 와 JS 를 들여온다.
- **npx** 는 npm 에 올라온 프로그램을 설치 없이 한 번 실행하는 명령이다. 요즘 유행하는 "컴포넌트 코드를 내 프로젝트에 복사해 넣는" 방식(`npx 도구 add button`)이 이것이다. 이 방식은 React 컴포넌트처럼 **코드 파일**을 나눠 주는 DS 에 맞고, YBM DS 처럼 **CSS 한 벌**로 된 DS 에는 맞지 않는다(복사본이 생기면 DS 를 고쳐도 반영되지 않는다).

### 권장안: npm 패키지 하나
```
npm install @ybm/ds            ← 패키지 이름은 정해야 한다
```
```js
import '@ybm/ds/dist/ybm-ds.css';   // 빌드 도구(Vite, Next.js 등)가 알아서 묶는다
import '@ybm/ds/dist/ybm-ds.js';
```
- 필요한 것: `package.json` 1개, 버전 번호 규칙(아래 3-1), npm 계정과 배포 1회. 코드는 지금 그대로.
- 얻는 것: 개발자는 익숙한 방식으로 설치하고, 버전을 올릴 때만 바뀌어 안전하다. 공개 CDN 이 npm 패키지를 자동으로 따라 올라가서 `https://cdn.jsdelivr.net/npm/@ybm/ds@1.0.0/dist/ybm-ds.css` 같은 버전 주소도 생긴다.
- 사내 전용이면 공개 npm 대신 사내 저장소(GitHub Packages 등)에 올릴 수 있다. 공개 범위(3-6)와 함께 정한다.

---

## 2. AI 와 함께 쓰기 (Quick Start with AI 강화)

| 제안 | 하는 일 | 권장 |
|---|---|---|
| `llms.txt` | AI 가 한 번에 읽는 사이트 요약 글(설치, 규칙, 컴포넌트 목록과 마크업). 안내문에 주소 하나만 주면 된다 | ★ |
| 컴포넌트 마크업 JSON | 지금은 마크업이 CSS 주석에만 있다. `components.json` 에 `markup`, `description` 을 넣으면 AI 와 사이트가 같은 원본을 쓴다 | ★ |
| 안내문 더 만들기 | "Figma 시안을 DS 로 옮기기", "기존 CSS 를 DS 로 바꾸기" 같은 상황별 안내문 | |
| AI 전용 연결(MCP) | AI 도구가 DS 를 직접 찾아보는 연결. 사용자가 늘면 검토 | |

---

## 3. 정책과 가이드 (DS 에 아직 없는 것)

### 3-1. 버전과 변경 관리 ★
- 버전 번호 규칙: 큰 번호(클래스 이름이 바뀌어 화면이 깨질 수 있음) / 중간 번호(새 컴포넌트) / 작은 번호(값 조정, 버그).
- 변경 기록 페이지: 지금은 README 표에만 있다. 사이트에 "새 소식" 으로 보여 주면 쓰는 사람이 무엇이 바뀌었는지 안다.
- 없어지는 클래스는 바로 지우지 않고 한 버전 동안 남겨 둔다.

### 3-2. 한글 타이포그래피 토큰 ★
사이트와 템플릿은 국내 주요 서비스의 글자 위계를 따라 아래 규칙을 쓰고 있지만, **DS 토큰에는 자간과 긴 글 줄 높이가 없다.**
| 제안 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `--ybm-letter-spacing-tight` | -0.02em | 20px 이상 제목 |
| `--ybm-letter-spacing-snug` | -0.01em | 15~19px 본문과 소제목 |
| `--ybm-letter-spacing-normal` | 0 | 14px 이하 |
| `--ybm-line-height-reading` | 1.7 | 긴 글 본문 |
- 함께: 글자 스타일(제목 1~4, 본문, 라벨, 보조)을 역할 이름으로 정리할지 다시 검토. 지금은 번호(t01~t17)만 있어 사람마다 다른 번호를 고른다.

### 3-3. 페이지 레이아웃 규칙 ★
- 템플릿마다 본문 최대 폭과 사이드바 폭을 따로 정했다(640, 1200, 240 등). 페이지 폭, 사이드바 폭, 열 수(모바일 4 / 태블릿 8 / PC 12 등)를 토큰이나 레이아웃 클래스로 정하면 화면끼리 맞춰진다.

### 3-4. 접근성 기준
- 목표 수준(예: 웹 접근성 지침 2.1 AA), 글자와 배경 대비, 키보드 이동, 포커스 표시, 화면 읽기 프로그램용 라벨 규칙.
- 컴포넌트 페이지에 "접근성" 칸을 두고 컴포넌트마다 지켜야 할 속성(aria-*)을 정리.

### 3-5. 글쓰기 가이드
- 말투(~해요), 버튼 라벨(동사로 끝내기, 2~6자), 오류 문구(원인 + 해결), 빈 화면 문구(상황 + 다음 행동).
- 지금은 Figma 설명과 README 에 흩어져 있다. 한 페이지로 모으면 기획자가 바로 쓴다.

### 3-6. 사용 범위와 공개 범위
- 적용 대상: 어떤 서비스가 반드시 써야 하는지, 예외는 어떻게 받는지.
- 지원 브라우저: DS 는 CSS 레이어, `:has()`, `aspect-ratio` 를 쓴다. 최신 Chrome, Safari, Edge, Firefox 기준이고 오래된 브라우저는 따로 정해야 한다.
- 공개 범위: 지금 저장소와 사이트는 누구나 볼 수 있다. 회사 정책 확인 필요.
- 브랜드: 로고 사용 규칙, 서비스별 브랜드 색 교체 방법(README 에 기술 방법만 있음).

### 3-7. 기여 방법
- 새 컴포넌트나 변경 요청 절차, Figma 와 CSS 를 같은 날 함께 고치는 규칙, 검토자.

---

## 4. DS 에 없어서 템플릿에서 대신한 것

| 필요했던 것 | 템플릿에서 대신한 방법 | 제안 |
|---|---|---|
| 차트(막대, 선, 원형) | 대시보드에서 Progress 막대와 숫자 카드로 대신 | 차트 색 토큰은 이미 있음(`chart/series-1~5`). 차트 컴포넌트 또는 차트 라이브러리 연결 가이드 |
| 사진 자리 | Image Frame 안에 아이콘만 둠 | 일러스트와 빈 이미지 가이드(보류 항목) |
| 페이지 머리말(제목 + 설명 + 버튼 묶음) | 템플릿마다 직접 배치 | Page Header 컴포넌트 |
| 숫자 요약 칸(KPI) | Card 안에 직접 배치 | Stat 컴포넌트 |
| 비밀번호 보기 버튼 | Text Field 의 suffix 에 아이콘 버튼 | Text Field 속성으로 정식 지원 |

---

## 5. 사이트 기능

| 제안 | 설명 | 권장 |
|---|---|---|
| 전체 검색 | 어느 화면에서든 컴포넌트, 템플릿, 토큰을 찾는 창(단축키 포함) | ★ |
| 새 소식 | 3-1 변경 기록을 보여 주는 페이지 | ★ |
| 템플릿 추가 | 검색 결과, 상세(상품/강의), 마이페이지, 결제, 알림 목록, 온보딩, 일정(달력), 고객센터 FAQ, 오류 화면 | ★ |
| 템플릿 썸네일 이미지 | 지금은 실제 화면을 줄여 띄운다. 템플릿이 많아지면 캡처 이미지로 바꿔 빠르게 | |
| 배포 자동화 | 지금은 `node site/build.mjs` 후 deploy. 저장소에 올리면 GitHub 가 알아서 만들게 할 수 있다 | |
| 영어 | 지금은 한국어만. 해외 사용자가 있으면 검토 | |

---

## 6. 템플릿을 만들며 발견한 것 (2026-10-30 집)

### 6-1. DS 에 없어서 임시로 대신한 것 ★ → 2026-10-30 밤에 둘 다 추가함 (72 Rating, 아이콘 heart/bookmark/shopping-cart/map-pin/star + -solid). 아래 표는 기록용.
| 필요한 것 | 지금 대신한 방법 | 제안 |
|---|---|---|
| 평점(Rating) | 반짝임 아이콘 + 숫자(4.8) + 후기 수 글자 | `Rating` 부품: 별 5개 채움 비율, 크기 small/medium, 읽기 전용과 입력. 가게 목록, 상품 카드, 후기에 모두 필요 |
| 아이콘 5개 | 좋아요 = thumbs-up, 저장 = inbox, 장바구니 = credit-card, 지도 = globe, 별 = sparkles | Lucide 에서 `heart`, `bookmark`, `shopping-cart`, `map-pin`, `star`(채움 포함) 추가. 아이콘 페이지에서 바로 복사해 icons.css 에 넣으면 된다 |
| 별점 입력 | 없음 | Rating 입력형으로 해결 |

### 6-2. 국내 이커머스 메인 4곳 검토 결과 → 2026-10-30 밤에 Commerce Home 에 모두 반영함(카테고리 서랍, 평점, 배송 배지, 담기, 타임 세일 Timer, 분류별 랭킹 탭, 쿠폰 Dialog). 왼쪽 카테고리 사이드 메뉴(PC)만 안 함.
공통으로 있는 요소를 우리 Commerce Home 과 비교했다. 사이트 이름은 적지 않는다.

| 요소 | 4곳 공통 여부 | 우리 Commerce Home | 제안 |
|---|---|---|---|
| 상단 카테고리 서랍(햄버거) + 검색창 | 4/4 | 검색창만 | 카테고리 서랍을 Menu Sheet 또는 Side Panel 로 추가 |
| 큰 배너 캐러셀 | 4/4 | 있음 | 유지 |
| 빠른 분류(둥근 아이콘 줄) | 3/4 | 있음 | 유지 |
| 상품 카드: 할인율 + 가격 + 원가 | 4/4 | 있음 | 유지 |
| 상품 카드: 평점 + 후기 수 | 4/4 | 없음 | Rating 부품 뒤에 추가 |
| 상품 카드: 배송 배지(당일, 새벽, 무료) | 3/4 | 없음 | Badge 로 추가, 문구는 범용(빠른 배송, 무료 배송) |
| 상품 카드: 담기 버튼 | 3/4 | 없음 | 카드 오른쪽 아래 iconOnly 버튼, 아이콘은 shopping-cart 추가 뒤 |
| 타임세일(남은 시간) | 3/4 | 없음 | DS Timer 부품으로 섹션 추가 |
| 랭킹 탭(분류별) | 4/4 | 검색어 순위만 | Chip Tabs 로 분류 고르는 상품 랭킹 선반으로 바꿈 |
| 첫 구매 쿠폰 모달 | 2/4 | 없음 | Dialog 예시로 추가(열기 버튼만) |
| 섹션 제목 + 전체 보기 | 4/4 | 있음 | 유지 |
| 왼쪽 카테고리 사이드 메뉴(PC) | 2/4 | 없음 | 선택. 넓은 화면에서 Side Navigation |

### 6-3. 새 템플릿 후보 (이커머스 흐름을 끝까지) → 1~5 는 2026-10-30 밤에 만듦(Product List, Product Detail, Cart, Checkout, Order Complete). 6 Event Page 만 남음.
| 순위 | 템플릿 | 내용 | 부품 |
|---|---|---|---|
| 1 | Product List | 분류 상세 목록. 왼쪽 필터(가격, 브랜드, 배송), 위 정렬 칩, 3~4열 카드, 더보기 | Checkbox Group, Slider, Chip, Pagination |
| 2 | Product Detail | 사진 캐러셀, 옵션 선택, 수량, 구매/담기 고정 막대, 상세 탭(정보, 후기, 문의) | Carousel, Select, Quantity Picker, Tabs, Rating |
| 3 | Cart | 담은 상품 목록, 선택 삭제, 수량, 합계, 주문 버튼 | Checkbox, Quantity Picker, Table 또는 List |
| 4 | Checkout | 배송지, 결제 수단, 쿠폰, 최종 금액 (이미 예정) | Select Box, Radio, Text Field |
| 5 | Order Complete | 주문 번호, 배송 예정일, 다음 행동 | Result Section |
| 6 | Event Page | 기획전 한 페이지. 큰 그림 + 상품 묶음 여러 개 | Image Frame, Carousel |

## 7. 템플릿 추가와 고도화 검토 (2026-10-31 집, 사용자 요청)

사내 UI Patterns 모음(웹 26,712장, 분류 59개, 큰 묶음 7개)을 기준으로 우리 템플릿 26종을 대조했다. 사용자가 짚어 준 서비스 3곳(금융 조회형, 보험 다이렉트형, 소상공인 관리자형)의 화면 구성도 함께 봤다. 템플릿은 범용이므로 서비스 이름이 아니라 화면 유형으로 적는다. 자세한 출처는 로컬 REFERENCE-ANALYSIS.md 에만 있다.

### 7-1. 지금 있는 것과 빈 곳

| UI Patterns 묶음 | 우리가 있는 것 | 비어 있는 것 (모음 안 장수) |
|---|---|---|
| 진입 | Dashboard, Login 3종 | **랜딩페이지 2,190**, 회원가입과 약관동의 1,845, 인증하기 204, 온보딩 199 |
| 탐색 | Search 4종, Product List, Product Detail, Commerce Home | **북마크·위시리스트 581**, 전체메뉴 468, 비교하기 48(보험·요금제에서는 핵심) |
| 프로모션 | 없음 | 멤버십·요금제 213, 혜택 205, 쿠폰 157, 기획전 (6-3 의 Event Page) |
| 활동 | AI Chat, Group Detail, Case Study | **글쓰기 583**, 리뷰 331 과 리뷰쓰기 177, 커뮤니티 글 목록과 상세 502, 1:1 채팅 292 |
| 거래 | Checkout, Cart, Order Complete, Form, Form Wizard | **조회하기(견적·계산) 464**, 취소·환불 197 |
| 관리 | Settings, Table | **내역 859**, 문의하기 671, 공지사항 441, 마이페이지 320, 고객센터·FAQ 303, 알림 129, 통계·리포트 545 |
| AI·도구 | AI Chat | AI 요약(브리핑) 카드, 챗봇 띄우기 버튼 |

장수가 많은 곳은 어느 서비스에나 있는 화면이라는 뜻이다. 우리 템플릿은 이커머스와 검색은 두터운데, **회원가입부터 마이페이지·내역·고객센터까지 "서비스 운영의 기본 화면"이 비어 있다.**

### 7-2. 새 템플릿 후보 (권장 순서) → 1~6 은 2026-10-31 집에서 만듦(Landing Page, Sign Up, My Page, History, Help Center, Notice + Notice Detail). 템플릿 33종. Code Input 부품 없이 Sign Up 은 Text Field + Timer 로 했다.

| 순위 | 템플릿 (en) | 묶음 | 내용 | 쓰는 부품 |
|---|---|---|---|---|
| 1 | Landing Page | Entry | 큰 제목과 버튼 2개, 특징 3열, 화면 그림, 요금 미리보기, FAQ, 마지막 CTA. 모음에서 두 번째로 많은 화면 | Action Button, Card, Accordion, Image Frame, Badge |
| 2 | Sign Up | Entry | 약관 전체 동의(접기), 이메일·비밀번호, 휴대폰 인증번호 6자리 + 남은 시간, 완료 | Checkbox Group, Text Field, Timer, Result Section |
| 3 | My Page | Manage | 프로필 요약, 포인트·쿠폰 숫자, 최근 주문, 메뉴 목록(내역, 설정, 고객센터), 로그아웃 | Avatar, List, Badge, Card |
| 4 | History | Manage | 기간 칩(1주, 1개월, 3개월, 직접), 주문·결제·포인트 탭, 날짜별 묶음 목록, 상세 열기 | Chip Tabs, Tabs, List, Date Picker, Pagination |
| 5 | Help Center | Manage | 검색, 자주 묻는 질문 분류 칩과 아코디언, 1:1 문의 폼(파일 첨부), 전화 상담 예약 | Search Suggestion, Accordion, Text Field, File Attach, Select Box |
| 6 | Notice | Manage | 공지 목록(고정 공지 배지, 날짜), 상세(제목, 날짜, 본문, 이전·다음), 페이지 막대 | List, Badge, Markdown, Pagination |
| 7 | Pricing | Promotion | 요금제 3~4열 비교 표. 추천 열 강조, 월·연 전환, 항목별 체크, 아래 FAQ | Segmented Control, Table, Badge, Accordion |
| 8 | Quote | Transaction | 조건을 고르면(나이, 기간, 금액 슬라이더) 결과 카드가 바로 바뀌는 견적·계산 화면. PC 는 오른쪽 고정 요약 | Slider, Select Box, Radio Group, Card, Callout |
| 9 | Wishlist | Explore | 찜한 상품 묶음(폴더), 묶음 추가 사이드 패널, 전체 선택 삭제, 빈 상태 | Side Panel, Checkbox, Card, Empty |
| 10 | Write | Activity | 글 제목, 본문 편집(굵게·목록·링크 도구 막대), 사진 첨부, 태그, 임시 저장과 발행 | Text Field, Textarea, File Attach, Chip, Snackbar |
| 11 | Review Write | Activity | 별점 고르기, 사진 첨부, 글, 선택 항목 평가, 작성 완료 | Rating(input), File Attach, Textarea, Result Section |
| 12 | Notifications | Manage | 읽음·안 읽음, 종류별 탭, 날짜 묶음, 모두 읽음, 알림 설정 바로 가기 | Tabs, List, Status Dot, Switch |
| 13 | Report | Manage | 기간 선택, 핵심 숫자 4개와 전주 대비, 추이 그래프, 분류별 표, 내려받기 | Date Picker, Card, Table, Progress (그래프 부품은 7-3) |
| 14 | Onboarding | Entry | 소개 3~4장 넘기기, 건너뛰기, 마지막 장 시작 버튼 | Carousel, Action Button |
| 15 | Cancel & Refund | Transaction | 취소 사유 고르기, 환불 금액 안내, 되돌릴 수 없음 확인, 완료 | Radio Group, Callout, Alert Dialog, Result Section |
| 16 | Event Page | Promotion | 6-3 의 6번 그대로 | Image Frame, Carousel |

1~6 만 만들어도 "가입 → 둘러보기 → 주문 → 마이페이지 → 내역 → 고객센터"가 템플릿으로 이어진다. 관리자형(소상공인 관리자) 화면은 Dashboard, Table, Form Wizard, Report, Settings 조합으로 대부분 만들 수 있어 따로 두지 않았다.

### 7-3. 기존 템플릿 고도화

| 템플릿 | 지금 | 고도화 |
|---|---|---|
| Templates 목록 | 영어 분류 11개(만든 순서대로 생긴 것) | UI Patterns 의 큰 묶음 7개로 다시 묶기: Entry, Explore, Promotion, Activity, Transaction, Manage, AI & Tools. 사내에서 이미 쓰는 분류라 찾기 쉽다 |
| Dashboard | 숫자 카드, 표, 활동 | 기간 선택과 전주 대비 화살표, 추이 그래프 자리(7-4 의 Chart) |
| Table | 검색, 필터, 표 | 선택 행 수와 일괄 동작 막대, 열 보이기·숨기기, 정렬 아이콘 |
| Login | 로그인 | 회원가입·비밀번호 찾기 링크(Sign Up 과 연결), 소셜 로그인은 Login SSO 로 |
| Search Places | 목록 | PC 오른쪽 지도 자리(Image Frame 으로 자리만), 거리순 정렬 |
| AI Chat | 대화 | AI 요약 카드(출처 Citation), 추천 질문 칩, 답변 중 멈춤 버튼(square 아이콘) |
| Product Detail | 상세 | 비교하기 담기(Compare 바), 최근 본 상품 줄 |
| Form Wizard | 3단계 | 임시 저장 안내 Snackbar, 단계별 요약(마지막 확인 단계) |

### 7-4. 템플릿을 만들려면 DS 에 필요한 것

| 필요 | 쓰는 곳 | 메모 |
|---|---|---|
| **Chart** (막대, 선, 도넛) | Dashboard, Report, Quote | 토큰 `--ybm-color-chart-*` 는 있으나 부품이 없다. CSS 만으로 막대·도넛은 가능, 선 그래프는 SVG. 우선 막대와 도넛만 |
| **Code Input** (인증번호 6자리) | Sign Up | 칸 6개, 자동 다음 칸. Text Field 의 변형으로 |
| **Date Range** (기간) | History, Report | Date Picker 2개 조합 + 빠른 선택 칩. 부품보다 템플릿 패턴으로 충분할 수 있음 |
| **Toolbar** (편집 도구 막대) | Write | Toggle Button 묶음으로 가능. 부품 추가는 보류 |
| **Compare Bar** (아래 고정 비교 담기) | Product Detail, Pricing | 템플릿 패턴으로 |

권장안: 7-2 의 1~6 을 먼저 만들고, 그 전에 7-4 의 Chart(막대·도넛)와 Code Input 을 DS 에 넣는다. 7-3 의 목록 묶음 7개는 템플릿을 늘리기 전에 바꾸는 편이 손이 덜 든다. 사용자가 고르면 진행한다.
