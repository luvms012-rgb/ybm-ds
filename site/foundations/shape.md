<!-- https://luvms012-rgb.github.io/ybm-ds/site/foundations/shape.html -->

# Radius

모서리는 요소의 둥글기를 정해 화면의 인상을 맞춥니다.

## 개요

모서리는 크기 이름으로 씁니다. 작은 요소일수록 덜 둥글고 큰 면일수록 더 둥급니다. 칩과 배지처럼 양 끝이 둥근 요소는 `pill`을 씁니다.

## 토큰

| 토큰 | 값 | 보기 |
| --- | --- | --- |
| `--ybm-shape-2xs` | 4px |  |
| `--ybm-shape-xs` | 6px |  |
| `--ybm-shape-sm` | 8px |  |
| `--ybm-shape-md` | 10px |  |
| `--ybm-shape-lg` | 12px |  |
| `--ybm-shape-xl` | 16px |  |
| `--ybm-shape-2xl` | 20px |  |
| `--ybm-shape-3xl` | 24px |  |
| `--ybm-shape-pill` | 9999px |  |

## 코드에서 쓰기

어떤 영역에 `--ybm-shape-scale`을 0과 1 사이 값으로 덮어쓰면 그 안의 모서리만 덜 둥글게 바뀝니다.

```css
.my-card {
  border-radius: var(--ybm-shape-lg);
}
.admin-area {
  --ybm-shape-scale: 0.5;  /* 이 영역 안의 모서리를 절반으로 */
}
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 안쪽 요소의 모서리는 바깥 요소보다 작게 둡니다. |
| **Don't** | 한 화면 안에서 같은 종류의 요소에 다른 둥글기를 섞지 않습니다. |
