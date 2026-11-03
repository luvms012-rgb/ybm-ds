<!-- https://luvms012-rgb.github.io/ybm-ds/site/index.html -->

# Get Started

YBM DS는 YBM 서비스를 위한 디자인 시스템입니다.

## YBM DS란 무엇인가요?

| 용어 | 뜻 |
| --- | --- |
| **토큰** | 색, 크기, 간격 같은 값에 붙인 이름입니다. |
| **컴포넌트** | 버튼, 입력창처럼 화면을 이루는 부품입니다. |
| **템플릿** | 부품을 조립해 둔 화면 한 장입니다. |

## 시스템 이해하기

Foundations색, 글자, 간격 같은 기본 토큰.

Components화면을 이루는 부품의 모양과 쓰임.

Templates가져다 고쳐 쓰는 완성 화면.

## 바로 써 보기

AI 코딩 도구로 만들 때는 [AI & Tools](https://luvms012-rgb.github.io/ybm-ds/site/get-started/ai.md#prompt)의 요청 글을 붙여 넣으면 아래 설치와 규칙을 알아서 맞춥니다.

### 1. DS 불러오기

`<head>`에 두 줄을 넣으면 글꼴, 토큰, 아이콘, 컴포넌트가 함께 들어옵니다. `ybm-ds.js`는 창 열기, 알림처럼 CSS만으로 안 되는 동작을 알아서 맡습니다.

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>
```

### 2. 컴포넌트 붙이기

정해진 클래스만 붙이면 됩니다. 쓰는 법은 [Components](https://luvms012-rgb.github.io/ybm-ds/site/components/index.md)에 있습니다.

```html
<button class="ds-btn" data-variant="brandSolid" data-size="large">시작하기</button>
<button class="ds-btn" data-variant="neutralWeak" data-size="large">나중에</button>
```

상태는 HTML 기본 속성으로 나타냅니다.

| 상태 | 속성 |
| --- | --- |
| 꺼짐 | `disabled` |
| 선택 | `:checked`, `aria-selected`, `aria-pressed` |
| 지금 위치 | `aria-current="page"` |
| 펼침 | `aria-expanded` |
| 오류 | `aria-invalid="true"` |

### 3. 서비스에 맞게 바꾸기

서비스 CSS는 DS 다음에 불러오고, 컴포넌트 변수(`--ds-*`)와 시맨틱 색만 덮어씁니다. DS가 CSS 레이어 안에 있어 `!important` 없이도 서비스 CSS가 이깁니다. 브랜드 색은 [Color](https://luvms012-rgb.github.io/ybm-ds/site/foundations/color.md#code)에서 바꿉니다.

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<link rel="stylesheet" href="my-service.css">  <!-- 서비스 CSS는 항상 DS 다음 -->

/* my-service.css */
.my-dialog { --ds-dialog-width: 360px; }
.my-banner { --ds-banner-bg: var(--ybm-color-bg-brand-weak); }
```

## 다크 모드

`html`에 속성 하나를 붙이면 모든 색이 어두운 화면용으로 바뀝니다. 색을 토큰으로만 썼다면 따로 고칠 것이 없습니다.

```html
<html lang="ko" data-theme="dark">
```

## 반응형

작은 화면부터 만들고 폭이 넓어질 때 배치를 바꿉니다. `@media` 안에서는 CSS 변수를 쓸 수 없어 숫자를 직접 씁니다.

| 이름 | 폭 | 쓰임 |
| --- | --- | --- |
| `sm` | 480px | 큰 휴대폰 |
| `md` | 768px | 태블릿, PC 부품으로 바뀌는 기준 |
| `lg` | 1280px | 넓은 PC, 3단 배치 |
| `xl` | 1440px | 아주 넓은 화면 |

```css
@media (min-width: 768px) { /* 태블릿, PC */ }
@media (min-width: 1280px) { /* 넓은 PC */ }

<!-- 768 이상에서 숨김(모바일 전용) / 768 이상에서만 보임(PC 전용) -->
<div class="u-hide-from-md">…</div>
<div class="u-show-from-md">…</div>
```

- Top Navigation ↔ Top App Bar, Side Panel ↔ Bottom Sheet, Dialog ↔ Bottom Sheet는 768을 기준으로 바꿉니다.
- Side Navigation은 1280 이상 펼침, 768 이상 접힘, 그보다 좁으면 서랍 메뉴입니다.

## 스크립트 직접 사용

대부분은 HTML 속성만으로 동작합니다. 코드에서 직접 열거나 띄울 때만 아래를 씁니다.

| 기능 | 사용방법 |
| --- | --- |
| 창 열기, 닫기 | `YBM.openDialog(요소)`, `YBM.closeDialog(요소)` |
| 알림 띄우기 | `YBM.snackbar("저장했어요", { variant: "positive" })` |
| 새로 고침 끝내기 | `YBM.endRefresh(요소)` |
| 나중에 넣은 HTML 연결 | `YBM.init(요소)` |

```html
<button class="ds-btn" data-ds-open="confirm">열기</button>
<dialog class="ds-dialog" id="confirm">… <button class="ds-btn" data-ds-close>닫기</button></dialog>

<script>
  YBM.snackbar("저장했어요", { variant: "positive", action: "확인" });
</script>
```

## 다른 설치 방법

### 버전 고정하기

위 주소는 늘 최신입니다. 버전을 고정하려면 주소에 커밋 번호를 넣습니다.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/ybm-ds@[커밋 번호]/dist/ybm-ds.css">
<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/ybm-ds@[커밋 번호]/dist/ybm-ds.js" defer></script>
```

### 파일 내려받기

`dist` 폴더를 프로젝트에 넣고 상대 경로로 불러옵니다. 인터넷이 막힌 사내 서버에 씁니다.

```shell
git clone https://github.com/luvms012-rgb/ybm-ds.git
# ybm-ds/dist 폴더를 프로젝트로 복사한 뒤
<link rel="stylesheet" href="./dist/ybm-ds.css">
<script src="./dist/ybm-ds.js" defer></script>
```

### Tailwind CSS와 함께 쓰기

토큰을 Tailwind 이름으로 쓰는 설정 파일입니다. `ybm-ds.css`도 함께 불러옵니다.

```javascript
// tailwind.config.js - ybm-ds/tokens/tailwind.preset.js를 프로젝트에 복사한 뒤
module.exports = { presets: [require('./tailwind.preset.js')] };
```
