<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/elevation.html -->

# Elevation

그림자와 겹침 순서는 요소가 얼마나 떠 있는지, 무엇이 위에 있는지 보여 줍니다.

## 그림자

숫자 대신 쓰임 이름으로 씁니다.

| 토큰 | 쓰임 | 보기 |
| --- | --- | --- |
| `--ybm-elevation-raised` | thumb, 선택된 세그먼트 |  |
| `--ybm-elevation-overlay` | menu, select, snackbar, tooltip, date picker |  |
| `--ybm-elevation-panel` | 떠 있는 패널, 펼침 메뉴 |  |
| `--ybm-elevation-floating` | FAB |  |
| `--ybm-elevation-modal` | dialog, alert dialog, bottom sheet |  |

## 겹침 순서

| 토큰 | 값 |
| --- | --- |
| `--ybm-z-base` | 0 |
| `--ybm-z-sticky` | 100 |
| `--ybm-z-overlay` | 1000 |
| `--ybm-z-dialog` | 1100 |
| `--ybm-z-toast` | 1200 |
| `--ybm-z-tooltip` | 1300 |
