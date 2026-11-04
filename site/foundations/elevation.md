<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/elevation.html -->

# Elevation

그림자와 겹침 순서는 요소가 얼마나 떠 있는지, 무엇이 위에 있는지 보여 줍니다.

## 개요

위에 떠 있는 면일수록 지금 더 중요합니다. 그림자는 숫자 대신 쓰임 이름으로 씁니다. 다크 모드에서는 떠 있는 면을 `bg-layer-floating`으로 한 단계 밝게 칠합니다.

## 그림자

| 토큰 | 쓰임 | 보기 |
| --- | --- | --- |
| `--ds-elevation-raised` | thumb, 선택된 세그먼트 |  |
| `--ds-elevation-overlay` | menu, select, snackbar, tooltip, date picker |  |
| `--ds-elevation-panel` | 떠 있는 패널, 펼침 메뉴 |  |
| `--ds-elevation-floating` | FAB |  |
| `--ds-elevation-modal` | dialog, alert dialog, bottom sheet |  |

## 겹침 순서

| 토큰 | 값 |
| --- | --- |
| `--ds-z-base` | 0 |
| `--ds-z-sticky` | 100 |
| `--ds-z-overlay` | 1000 |
| `--ds-z-dialog` | 1100 |
| `--ds-z-toast` | 1200 |
| `--ds-z-tooltip` | 1300 |

## 코드에서 쓰기

```css
.my-menu {
  background: var(--ds-color-bg-layer-floating);
  box-shadow: var(--ds-elevation-overlay);
  z-index: var(--ds-z-overlay);
}
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 요소의 쓰임에 맞는 그림자 이름을 고릅니다. 메뉴는 overlay, 다이얼로그는 modal 입니다. |
| **Do** | 같은 높이 안에서 면을 나눌 때는 그림자 대신 테두리를 씁니다. |
| **Don't** | 그림자 값을 직접 만들지 않습니다. |
