<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/spacing.html -->

# Spacing

간격은 요소 사이의 거리로 무엇이 한 묶음인지 보여 줍니다.

## 개요

4px 단위가 기본이고 작은 간격은 2px 단위도 씁니다. 이름의 숫자에 4를 곱하면 값입니다. 화면 좌우 여백은 `--ybm-space-x-global-gutter` 입니다.

## 토큰

| 토큰 | 값 | 보기 |
| --- | --- | --- |
| `--ybm-space-x0` | 0px |  |
| `--ybm-space-x0_5` | 2px |  |
| `--ybm-space-x1` | 4px |  |
| `--ybm-space-x1_5` | 6px |  |
| `--ybm-space-x2` | 8px |  |
| `--ybm-space-x2_5` | 10px |  |
| `--ybm-space-x3` | 12px |  |
| `--ybm-space-x3_5` | 14px |  |
| `--ybm-space-x4` | 16px |  |
| `--ybm-space-x4_5` | 18px |  |
| `--ybm-space-x5` | 20px |  |
| `--ybm-space-x6` | 24px |  |
| `--ybm-space-x7` | 28px |  |
| `--ybm-space-x8` | 32px |  |
| `--ybm-space-x9` | 36px |  |
| `--ybm-space-x10` | 40px |  |
| `--ybm-space-x11` | 44px |  |
| `--ybm-space-x12` | 48px |  |
| `--ybm-space-x13` | 52px |  |
| `--ybm-space-x14` | 56px |  |
| `--ybm-space-x15` | 60px |  |
| `--ybm-space-x16` | 64px |  |
| `--ybm-space-x18` | 72px |  |
| `--ybm-space-x20` | 80px |  |
| `--ybm-space-x24` | 96px |  |
| `--ybm-space-x32` | 128px |  |

## 코드에서 쓰기

```css
.my-page {
  padding-inline: var(--ybm-space-x-global-gutter);
}
.my-card {
  display: flex;
  flex-direction: column;
  gap: var(--ybm-space-x2);
  padding: var(--ybm-space-x4);
}
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 관련 있는 줄은 좁게 붙이고, 다른 덩어리는 넓게 띄웁니다. |
| **Do** | 화면 좌우 여백은 global-gutter 하나로 맞춥니다. |
| **Don't** | 토큰에 없는 간격(예: 13px)을 만들지 않습니다. |
