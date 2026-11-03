<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/color.html -->

# Color

색은 정보의 위계와 상태, 브랜드를 구분해 보여 줍니다.

## 개요

색은 생김새가 아니라 하는 일로 이름을 붙입니다. 화면에는 시맨틱 색(`bg`, `fg`, `stroke`)만 쓰고, 팔레트(`--ybm-color-palette-*`)는 시맨틱 색을 만드는 원료로 둡니다. 토큰으로만 쓰면 `data-theme="dark"` 하나로 다크 모드가 맞춰집니다.

## 역할

| 역할 | 쓰는 곳 |
| --- | --- |
| `brand` | 주 버튼, 선택된 상태, 링크 |
| `neutral` | 바탕, 본문, 보조 버튼 |
| `positive` | 성공, 완료 |
| `warning` | 주의, 마감 임박 |
| `critical` | 오류, 삭제 |
| `informative` | 안내, 도움말 |
| `magic` | AI 기능, 새 기능 |

## 배경

| 토큰 | 값 |
| --- | --- |
| `--ybm-color-bg-brand-solid` | `#2563eb / #3b82f6` |
| `--ybm-color-bg-brand-solid-pressed` | `#1d4ed8 / #60a5fa` |
| `--ybm-color-bg-brand-weak` | `#dbeafe / #172554` |
| `--ybm-color-bg-brand-weak-pressed` | `#bfdbfe / #1e3a8a` |
| `--ybm-color-bg-canvas` | `#f7f8f9 / #000000` |
| `--ybm-color-bg-critical-solid` | `#fa342c / #f73526` |
| `--ybm-color-bg-critical-solid-pressed` | `#ca1d13 / #ff6e60` |
| `--ybm-color-bg-critical-weak` | `#fdf0f0 / #322323` |
| `--ybm-color-bg-critical-weak-pressed` | `#fde7e7 / #4f2624` |
| `--ybm-color-bg-disabled` | `#f3f4f5 / #2b2e35` |
| `--ybm-color-bg-informative-solid` | `#217cf9 / #1e82eb` |
| `--ybm-color-bg-informative-solid-pressed` | `#135fcd / #41a2f9` |
| `--ybm-color-bg-informative-weak` | `#eff6ff / #202742` |
| `--ybm-color-bg-informative-weak-pressed` | `#e2edfc / #1e3352` |
| `--ybm-color-bg-layer-default` | `#ffffff / #16171b` |
| `--ybm-color-bg-layer-floating` | `#ffffff / #1d2025` |
| `--ybm-color-bg-magic-solid` | `#8969ea / #7659bd` |
| `--ybm-color-bg-magic-solid-pressed` | `#6d50cb / #9179e0` |
| `--ybm-color-bg-magic-weak` | `#f5f3fe / #201a2e` |
| `--ybm-color-bg-magic-weak-pressed` | `#efeafe / #2b2140` |
| `--ybm-color-bg-neutral` | `#f3f4f5 / #2b2e35` |
| `--ybm-color-bg-neutral-inverted` | `#2a3038 / #f3f4f5` |
| `--ybm-color-bg-neutral-inverted-pressed` | `#555d6d / #dcdee3` |
| `--ybm-color-bg-neutral-muted` | `#f7f8f9 / #1d2025` |
| `--ybm-color-bg-neutral-solid` | `#2a3038 / #f3f4f5` |
| `--ybm-color-bg-neutral-solid-pressed` | `#555d6d / #dcdee3` |
| `--ybm-color-bg-neutral-subtle` | `#ffffff / #16171b` |
| `--ybm-color-bg-neutral-weak-alpha` | `#0000000c / #ffffff20` |
| `--ybm-color-bg-neutral-weak-alpha-pressed` | `#00000010 / #ffffff2e` |
| `--ybm-color-bg-neutral-weak-pressed` | `#eeeff1 / #393d46` |
| `--ybm-color-bg-overlay` | `#00000074 / #00000074` |
| `--ybm-color-bg-positive-solid` | `#079171 / #117956` |
| `--ybm-color-bg-positive-solid-pressed` | `#00745f / #1b946d` |
| `--ybm-color-bg-positive-weak` | `#edfaf6 / #202926` |
| `--ybm-color-bg-positive-weak-pressed` | `#d9f6e9 / #20362e` |
| `--ybm-color-bg-transparent` | `transparent / transparent` |
| `--ybm-color-bg-transparent-pressed` | `#0000000c / #ffffff20` |
| `--ybm-color-bg-warning-solid` | `#e14d00 / #e65200` |
| `--ybm-color-bg-warning-solid-pressed` | `#b93901 / #ff6600` |
| `--ybm-color-bg-warning-weak` | `#fff2ec / #31241f` |
| `--ybm-color-bg-warning-weak-pressed` | `#ffe8db / #4b291c` |

## 글자와 아이콘

| 토큰 | 값 |
| --- | --- |
| `--ybm-color-fg-brand` | `#2563eb / #3b82f6` |
| `--ybm-color-fg-brand-contrast` | `#1d4ed8 / #60a5fa` |
| `--ybm-color-fg-critical` | `#fa342c / #ff6e60` |
| `--ybm-color-fg-critical-contrast` | `#921708 / #f8c5c3` |
| `--ybm-color-fg-disabled` | `#d1d3d8 / #5b606a` |
| `--ybm-color-fg-informative` | `#217cf9 / #41a2f9` |
| `--ybm-color-fg-informative-contrast` | `#0b4596 / #b9d7fb` |
| `--ybm-color-fg-magic` | `#8969ea / #9179e0` |
| `--ybm-color-fg-magic-contrast` | `#50379b / #d3c7fb` |
| `--ybm-color-fg-neutral` | `#1a1c20 / #f3f4f5` |
| `--ybm-color-fg-neutral-inverted` | `#ffffff / #16171b` |
| `--ybm-color-fg-neutral-muted` | `#555d6d / #dcdee3` |
| `--ybm-color-fg-neutral-subtle` | `#868b94 / #b0b3ba` |
| `--ybm-color-fg-on-brand-solid` | `#ffffff / #ffffff` |
| `--ybm-color-fg-on-critical-solid` | `#ffffff / #ffffff` |
| `--ybm-color-fg-on-informative-solid` | `#ffffff / #ffffff` |
| `--ybm-color-fg-on-magic-solid` | `#ffffff / #ffffff` |
| `--ybm-color-fg-on-neutral-solid` | `#ffffff / #16171b` |
| `--ybm-color-fg-on-positive-solid` | `#ffffff / #ffffff` |
| `--ybm-color-fg-on-warning-solid` | `#ffffff / #ffffff` |
| `--ybm-color-fg-placeholder` | `#b0b3ba / #868b94` |
| `--ybm-color-fg-positive` | `#079171 / #22b27f` |
| `--ybm-color-fg-positive-contrast` | `#075445 / #93e5c0` |
| `--ybm-color-fg-warning` | `#e14d00 / #ff6600` |
| `--ybm-color-fg-warning-contrast` | `#862b00 / #eecebc` |

## 테두리

| 토큰 | 값 |
| --- | --- |
| `--ybm-color-stroke-brand-solid` | `#1d4ed8 / #60a5fa` |
| `--ybm-color-stroke-brand-weak` | `#93c5fd / #1e40af` |
| `--ybm-color-stroke-critical-solid` | `#fa342c / #ff6e60` |
| `--ybm-color-stroke-critical-weak` | `#fed4d2 / #742826` |
| `--ybm-color-stroke-focus-ring` | `#5e98fe / #1e82eb` |
| `--ybm-color-stroke-informative-solid` | `#217cf9 / #41a2f9` |
| `--ybm-color-stroke-informative-weak` | `#cbdffa / #1a4275` |
| `--ybm-color-stroke-magic-solid` | `#8969ea / #9179e0` |
| `--ybm-color-stroke-magic-weak` | `#e1d8ff / #392a57` |
| `--ybm-color-stroke-neutral` | `#d1d3d8 / #5b606a` |
| `--ybm-color-stroke-neutral-contrast` | `#1a1c20 / #f3f4f5` |
| `--ybm-color-stroke-neutral-muted` | `#00000010 / #ffffff17` |
| `--ybm-color-stroke-neutral-solid` | `#555d6d / #dcdee3` |
| `--ybm-color-stroke-neutral-subtle` | `#0000000c / #ffffff0d` |
| `--ybm-color-stroke-neutral-weak` | `#dcdee3 / #393d46` |
| `--ybm-color-stroke-positive-solid` | `#079171 / #22b27f` |
| `--ybm-color-stroke-positive-weak` | `#b9e9d2 / #20493b` |
| `--ybm-color-stroke-warning-solid` | `#e14d00 / #ff6600` |
| `--ybm-color-stroke-warning-weak` | `#ffd5c0 / #6b311c` |

## 코드에서 쓰기

```css
.my-card {
  background: var(--ybm-color-bg-layer-default);
  color: var(--ybm-color-fg-neutral);
  border: 1px solid var(--ybm-color-stroke-neutral-muted);
}
```

### 브랜드 색 바꾸기

이 가이드는 모노톤으로 보여 줍니다. 팔레트 `--ybm-color-palette-brand-100` ~ `1000`만 덮어쓰면 브랜드 색을 쓰는 곳이 모두 따라 바뀝니다.

```css
/* my-service.css - DS 다음에 불러온다 */
:root {
  --ybm-color-palette-brand-100: #e6f6ee;  /* 옅은 배경 */
  --ybm-color-palette-brand-600: #12a150;  /* 주 버튼, 링크 */
  --ybm-color-palette-brand-700: #0d7d3e;  /* 눌림, 진한 글자 */
  /* 200 ~ 500, 800 ~ 1000 도 같은 색의 단계로 채운다 */
}
:root[data-theme="dark"] {
  /* 다크 모드는 같은 단계를 뒤집어 넣는다 (다크 100 = 라이트 1000) */
}
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 역할에 맞는 색을 고릅니다. 오류는 critical, 성공은 positive 입니다. |
| **Do** | 진한 면 위 글자는 fg-on-[역할]-solid 를 씁니다. |
| **Do** | 브랜드 색은 주 버튼처럼 꼭 눈에 띄어야 할 곳에만 씁니다. |
| **Don't** | hex 나 팔레트 색을 화면에 직접 쓰지 않습니다. |
| **Don't** | 색만으로 뜻을 전하지 않습니다. 아이콘이나 글자를 함께 씁니다. |
