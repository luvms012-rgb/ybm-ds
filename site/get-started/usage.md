<!-- https://luvms012-rgb.github.io/ybm-ds/site/get-started/usage.html -->

# Usage

DS를 불러오는 순서와 다크 모드, 반응형 기준을 알아봅니다.

## 불러오는 순서

DS를 먼저, 서비스 CSS를 그다음에 불러옵니다. DS 전체가 CSS 레이어 안에 들어 있어서 레이어 밖에 쓴 서비스 CSS는 선택자 길이와 상관없이 항상 DS를 이깁니다. 그래서 `!important`나 긴 선택자로 다툴 필요가 없습니다.

서비스 CSS에서는 컴포넌트 변수(`--ds-*`)와 시맨틱 색(`bg`, `fg`, `stroke`)만 덮어씁니다. 새 `ds-` 클래스를 만들거나 `!important`를 쓰지 않습니다. 브랜드 색도 바꿀 수 있습니다([Color](https://luvms012-rgb.github.io/ybm-ds/site/foundations/color.md#brand)).

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<link rel="stylesheet" href="my-service.css">  <!-- 서비스 CSS는 항상 DS 다음 -->

/* my-service.css */
.my-dialog { --ds-dialog-width: 360px; }
.my-banner { --ds-banner-bg: var(--ybm-color-bg-brand-weak); }
```

## 상태 나타내기

CSS는 Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다. 상태는 가능한 한 HTML 기본 속성으로 표현해서 접근성이 함께 맞춰지게 했습니다.

| 상태 | 쓰는 속성 |
| --- | --- |
| 꺼짐 | `disabled` |
| 선택 | `:checked`, `aria-selected`, `aria-pressed` |
| 지금 위치 | `aria-current="page"` |
| 펼침 | `aria-expanded` |
| 오류 | `aria-invalid="true"` |
| 누름 | `:active` (마우스는 `:hover`도) |

## 화면 모드

모드는 라이트와 다크 두 가지입니다. `<html data-theme="dark">`를 붙이면 시맨틱 색이 모두 어두운 화면용으로 바뀝니다. 색을 토큰으로만 썼다면 따로 고칠 것이 없습니다.

## 테마

테마는 브랜드 색, 바탕색, 모서리 곡률을 한 번에 바꿔 같은 DS 로 다른 분위기의 서비스를 만듭니다. DS 다음에 테마 파일을 붙이고 html 에 테마 이름을 적으면 되고, 컴포넌트는 고치지 않습니다. 고를 수 있는 테마는 [Themes](https://luvms012-rgb.github.io/ybm-ds/site/themes/index.html) 에서 화면으로 비교해 볼 수 있습니다.

```html
<html lang="ko" data-ds-theme="trust">
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">
<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/themes/trust.css">
```

토큰 값은 html 에서 정해지므로 테마도 html 에만 답니다. 다크 모드는 테마 파일 안에 함께 들어 있고, 포커스 링과 안내색은 접근성을 위해 테마와 상관없이 그대로입니다.

## 반응형 기준점

작은 화면부터 쌓아 올리는 방식입니다. `@media` 안에서는 CSS 변수를 쓸 수 없어서 숫자를 직접 씁니다.

| 이름 | 폭 | 쓰임 |
| --- | --- | --- |
| `sm` | 480px | 큰 휴대폰 |
| `md` | 768px | 태블릿, PC 부품으로 바뀌는 기준 |
| `lg` | 1280px | 넓은 PC, 3단 배치 |
| `xl` | 1440px | 아주 넓은 화면 |

```css
@media (min-width: 768px) { /* 태블릿, PC */ }
@media (min-width: 1280px) { /* 넓은 PC */ }

<!-- 유틸리티: 768 이상에서 숨김(모바일 전용) / 768 이상에서만 보임(PC 전용) -->
<div class="u-hide-from-md">…</div>
<div class="u-show-from-md">…</div>
```

- Top Navigation ↔ Top App Bar, Side Panel ↔ Bottom Sheet, Dialog ↔ Bottom Sheet는 768을 기준으로 바꿉니다.
- Side Navigation은 1280 이상 펼침, 768 이상 접힘, 그보다 좁으면 서랍 메뉴입니다.

## 한글 줄바꿈

본문에는 `word-break: keep-all`과 `overflow-wrap: break-word`를 함께 씁니다. 넣지 않으면 한글이 음절 단위로 끊겨 어절 중간에서 줄이 바뀝니다.

## 아이콘

UI 아이콘은 Lucide 한 가지만 씁니다. 색은 부모 글자색을 따르고, 크기는 기본 20, `ds-icon--sm` 16, `ds-icon--lg` 24 입니다. 목록은 [Iconography](https://luvms012-rgb.github.io/ybm-ds/site/foundations/icons.md)에 있습니다.
