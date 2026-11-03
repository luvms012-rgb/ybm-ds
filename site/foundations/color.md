<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/color.html -->

# Color

색은 정보의 위계와 상태, 브랜드를 구분해 보여 줍니다.

## 개요

YBM DS 의 색은 역할 색과 팔레트 색 두 층으로 되어 있습니다. 화면에는 역할 색만 쓰고, 팔레트 색은 역할 색을 만드는 원료로 둡니다. 그래서 어떤 화면에서도 글자와 바탕의 대비가 충분하고 뜻이 분명합니다.

## 역할 색

역할 색은 생김새가 아니라 하는 일로 이름을 붙인 색입니다. 오류는 `critical`, 성공은 `positive` 처럼 이름만 보고 어디에 쓰는지 알 수 있습니다. 자세한 규칙과 전체 목록은 [Roles](https://luvms012-rgb.github.io/ybm-ds/site/foundations/color-roles.md)에 있습니다.

### 장점 1. 접근성

역할 색은 처음부터 정해 둔 글자와 바탕 짝으로 대비를 맞췄습니다. 짝을 지켜 쓰기만 하면 읽기 어려운 조합이 생기지 않습니다.

### 장점 2. 빈틈없는 바꾸기

색을 바꿀 때 값이 아니라 뜻을 기준으로 바꿉니다. 값이 같아도 뜻이 다르면 따로 바꿀 수 있어서, 한 곳을 고쳐도 다른 곳이 함께 흔들리지 않습니다.

### 장점 3. 다크 모드

역할 색은 라이트와 다크 모드에 알맞은 값을 따로 갖고 있습니다. 토큰으로만 썼다면 `data-theme="dark"` 하나로 모든 화면이 맞춰집니다.

## 팔레트 색

팔레트 색은 회색과 일곱 가지 색을 100 ~ 1000 단계로 나눈 원료 색입니다. 역할 색으로 나타내기 어려운 드문 경우에만 화면에 씁니다. 다크 모드에서는 같은 단계 번호에 어두운 화면용 값이 들어가 있어 그대로 써도 알아보기 쉽습니다. 전체 목록은 [Palette](https://luvms012-rgb.github.io/ybm-ds/site/foundations/color-palette.md)에 있습니다.

## 관련 문서

역할 색역할 색의 규칙과 전체 토큰.

팔레트 색팔레트 색의 단계와 전체 토큰.

## 코드에서 쓰기

```css
.my-card {
  background: var(--ds-color-bg-layer-default);
  color: var(--ds-color-fg-neutral);
  border: 1px solid var(--ds-color-stroke-neutral-muted);
}
```

### 브랜드 색 바꾸기

이 가이드는 모노톤으로 보여 줍니다. 팔레트 `--ds-color-palette-brand-100` ~ `1000`만 덮어쓰면 브랜드 색을 쓰는 곳이 모두 따라 바뀝니다.

```css
/* my-service.css - DS 다음에 불러온다 */
:root {
  --ds-color-palette-brand-100: #e6f6ee;  /* 옅은 배경 */
  --ds-color-palette-brand-600: #12a150;  /* 주 버튼, 링크 */
  --ds-color-palette-brand-700: #0d7d3e;  /* 눌림, 진한 글자 */
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
