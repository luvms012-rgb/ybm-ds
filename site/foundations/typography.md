<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/typography.html -->

# Typography

타이포그래피는 글을 분명하고 읽기 쉽게 전합니다.

## 개요

글꼴은 Pretendard 하나입니다. 크기는 `--ds-font-size-t01` ~ `t17`, 줄 높이는 같은 번호의 `--ds-line-height-*`를 짝으로 씁니다.

## 크기

| 토큰 | 크기 / 줄 높이 (px) | 보기 |
| --- | --- | --- |
| `t01` | 11 / 17 | 가나다 Aa 123 |
| `t02` | 12 / 18 | 가나다 Aa 123 |
| `t03` | 13 / 20 | 가나다 Aa 123 |
| `t04` | 14 / 21 | 가나다 Aa 123 |
| `t05` | 16 / 24 | 가나다 Aa 123 |
| `t06` | 18 / 28 | 가나다 Aa 123 |
| `t07` | 20 / 29 | 가나다 Aa 123 |
| `t08` | 22 / 32 | 가나다 Aa 123 |
| `t09` | 24 / 34 | 가나다 Aa 123 |
| `t10` | 26 / 37 | 가나다 Aa 123 |
| `t11` | 28 / 40 | 가나다 Aa 123 |
| `t12` | 32 / 44 | 가나다 Aa 123 |
| `t13` | 40 / 54 | 가나다 Aa 123 |
| `t14` | 48 / 62 | 가나다 Aa 123 |
| `t15` | 56 / 75 | 가나다 Aa 123 |
| `t16` | 64 / 85 | 가나다 Aa 123 |
| `t17` | 72 / 96 | 가나다 Aa 123 |

## 굵기

| 토큰 | 값 | 보기 |
| --- | --- | --- |
| `--ds-font-weight-regular` | 400 | 가나다 Aa 123 |
| `--ds-font-weight-medium` | 500 | 가나다 Aa 123 |
| `--ds-font-weight-semibold` | 600 | 가나다 Aa 123 |
| `--ds-font-weight-bold` | 700 | 가나다 Aa 123 |

## 코드에서 쓰기

본문에는 `word-break: keep-all`을 함께 써서 어절 중간에서 줄이 바뀌지 않게 합니다.

```css
.my-title {
  font-size: var(--ds-font-size-t09);
  line-height: var(--ds-line-height-t09);
  font-weight: var(--ds-font-weight-bold);
}
.my-text {
  font-size: var(--ds-font-size-t05);
  line-height: var(--ds-line-height-t05);
  word-break: keep-all;
  overflow-wrap: break-word;
}
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 크기와 줄 높이는 같은 번호끼리 짝으로 씁니다. |
| **Do** | 제목은 Bold, 항목 제목은 SemiBold, 본문은 Regular로 위계를 나눕니다. |
| **Do** | 한 화면의 크기는 서너 단계로 줄입니다. |
| **Don't** | px 숫자를 직접 쓰지 않습니다. |
| **Don't** | 강조를 색으로만 하지 않습니다. 굵기를 먼저 씁니다. |
