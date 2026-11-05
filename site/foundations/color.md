<!-- https://luvms012-rgb.github.io/yds/site/foundations/color.html -->

# Color

색은 정보의 위계와 상태, 브랜드를 구분해 보여 줍니다.

## 개요

yds의 색은 역할 색과 팔레트 색 두 층입니다. 화면에는 역할 색만 쓰고, 팔레트 색은 역할 색의 원료로 둡니다. 그래서 어느 화면에서나 대비가 충분하고 뜻이 같습니다.

## 역할 색

역할 색은 생김새가 아니라 하는 일로 이름을 붙입니다. 오류는 `critical`, 성공은 `positive`처럼 이름만 보고 쓰임을 압니다. 자세한 규칙과 전체 목록은 [Roles](https://luvms012-rgb.github.io/yds/site/foundations/color-roles.md)에 있습니다.

## 팔레트 색

팔레트 색은 회색과 일곱 가지 색을 100 ~ 1000 단계로 나눈 원료입니다. 역할 색으로 나타내기 어려울 때만 화면에 씁니다. 다크 모드에서도 같은 단계 번호를 그대로 쓰면 됩니다. 전체 목록은 [Palette](https://luvms012-rgb.github.io/yds/site/foundations/color-palette.md)에 있습니다.

## 관련 문서

- [역할 색](https://luvms012-rgb.github.io/yds/site/foundations/color-roles.md): 역할 색의 규칙과 전체 토큰.

- [팔레트 색](https://luvms012-rgb.github.io/yds/site/foundations/color-palette.md): 팔레트 색의 단계와 전체 토큰.

## 코드에서 쓰기

```css
.my-card {
  background: var(--ds-color-bg-layer-default);
  color: var(--ds-color-fg-neutral);
  border: 1px solid var(--ds-color-stroke-neutral-muted);
}
```

### 브랜드 컬러 바꾸기

브랜드 컬러 하나만 있으면 됩니다. 아래 글의 대괄호에 그 색을 넣어 AI에 붙여 넣으면, 나머지 단계와 다크 모드 값을 만들어 넣습니다.

```text
이 서비스에 브랜드 컬러를 입혀 줘.
브랜드 컬러: [#12a150]
문서: https://luvms012-rgb.github.io/yds/site/llms.txt
이 색을 600 단계로 두고 나머지 단계와 다크 모드 값을 만들어 서비스 CSS에 넣어 줘.
```

직접 넣을 때는 대표 색을 `brand-600`에 두고, 나머지 단계를 같은 색의 진하기로 채웁니다.

```css
/* 서비스 CSS - DS 다음에 불러온다 */
:root {
  --ds-color-palette-brand-600: #12a150;  /* 대표 색: 주 버튼, 링크 */
  --ds-color-palette-brand-700: #0d7d3e;  /* 한 단계 진하게: 눌림 */
  --ds-color-palette-brand-100: #e6f6ee;  /* 아주 옅게: 옅은 배경 */
  /* 나머지 단계도 같은 색으로 채운다 */
}
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 역할에 맞는 색을 고릅니다. 오류는 critical, 성공은 positive입니다. |
| **Do** | 진한 면 위 글자는 fg-on-[역할]-solid를 씁니다. |
| **Do** | 브랜드 색은 주 버튼처럼 꼭 눈에 띄어야 할 곳에만 씁니다. |
| **Don't** | hex나 팔레트 색을 화면에 직접 쓰지 않습니다. |
| **Don't** | 색만으로 뜻을 전하지 않습니다. 아이콘이나 글자를 함께 씁니다. |
