<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/spacing.html -->

# Spacing

간격은 요소 사이의 거리로 무엇이 한 묶음인지 보여 줍니다.

## 개요

4px 단위가 기본이고 작은 간격은 2px 단위도 씁니다. 이름의 숫자에 4를 곱하면 값입니다. 화면 좌우 여백은 `--ds-space-x-global-gutter` 입니다.

## 토큰

| 토큰 | 값 | 보기 |
| --- | --- | --- |
| `--ds-space-x0` | 0px |  |
| `--ds-space-x0_5` | 2px |  |
| `--ds-space-x1` | 4px |  |
| `--ds-space-x1_5` | 6px |  |
| `--ds-space-x2` | 8px |  |
| `--ds-space-x2_5` | 10px |  |
| `--ds-space-x3` | 12px |  |
| `--ds-space-x3_5` | 14px |  |
| `--ds-space-x4` | 16px |  |
| `--ds-space-x4_5` | 18px |  |
| `--ds-space-x5` | 20px |  |
| `--ds-space-x6` | 24px |  |
| `--ds-space-x7` | 28px |  |
| `--ds-space-x8` | 32px |  |
| `--ds-space-x9` | 36px |  |
| `--ds-space-x10` | 40px |  |
| `--ds-space-x11` | 44px |  |
| `--ds-space-x12` | 48px |  |
| `--ds-space-x13` | 52px |  |
| `--ds-space-x14` | 56px |  |
| `--ds-space-x15` | 60px |  |
| `--ds-space-x16` | 64px |  |
| `--ds-space-x18` | 72px |  |
| `--ds-space-x20` | 80px |  |
| `--ds-space-x24` | 96px |  |
| `--ds-space-x32` | 128px |  |

## 코드에서 쓰기

```css
.my-page {
  padding-inline: var(--ds-space-x-global-gutter);
}
.my-card {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-x2);
  padding: var(--ds-space-x4);
}
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 관련 있는 줄은 좁게 붙이고, 다른 덩어리는 넓게 띄웁니다. |
| **Do** | 화면 좌우 여백은 global-gutter 하나로 맞춥니다. |
| **Don't** | 토큰에 없는 간격(예: 13px)을 만들지 않습니다. |
