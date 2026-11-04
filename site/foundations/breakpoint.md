<!-- https://luvms012-rgb.github.io/yds/site/foundations/breakpoint.html -->

# Breakpoint

기준점은 화면 폭에 따라 배치를 바꾸는 지점입니다.

## 개요

작은 화면부터 만들고 폭이 넓어질 때 배치를 더합니다. `@media` 안에서는 CSS 변수를 쓸 수 없어 숫자를 직접 씁니다.

## 토큰

| 토큰 | 폭 | 쓰임 |
| --- | --- | --- |
| `--ds-breakpoint-sm` | 480px | 큰 휴대폰 |
| `--ds-breakpoint-md` | 768px | 태블릿, PC 부품으로 바뀌는 기준 |
| `--ds-breakpoint-lg` | 1280px | 넓은 PC, 3단 배치 |
| `--ds-breakpoint-xl` | 1440px | 아주 넓은 화면 |

## 폭에 따라 바뀌는 컴포넌트

- Top Navigation ↔ Top App Bar, Side Panel ↔ Bottom Sheet, Dialog ↔ Bottom Sheet는 768을 기준으로 바꿉니다.
- Side Navigation은 1280 이상에서 펼치고, 768 이상에서 접고, 그보다 좁으면 서랍 메뉴로 엽니다.

## 코드에서 쓰기

```css
@media (min-width: 768px) { /* 태블릿, PC */ }
@media (min-width: 1280px) { /* 넓은 PC */ }

<!-- 768 이상에서 숨김(모바일 전용) / 768 이상에서만 보임(PC 전용) -->
<div class="u-hide-from-md">…</div>
<div class="u-show-from-md">…</div>
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 모바일 화면을 먼저 만들고 min-width로 넓은 화면을 더합니다. |
| **Do** | 기준점은 표의 네 값만 씁니다. |
| **Don't** | 기기 이름(아이폰, 갤럭시)에 맞춘 폭을 따로 만들지 않습니다. |
