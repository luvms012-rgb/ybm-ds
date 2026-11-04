<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/progress.html -->

# Progress

작업이 얼마나 진행됐는지 막대로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
     style="--ds-progress-value: 40%" [data-tone="neutral"] [data-size="small"]></div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` `tone` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | "3/10", "40%"처럼 값을 글자로 막대 위나 옆에 적습니다. 막대만으로는 정확한 숫자를 알 수 없습니다. |
| **Do** | 화면의 대표 진행률은 brand, 목록 안이나 보조 진행률은 neutral을 씁니다. |
| **Do** | 0%일 때도 바탕 막대(track)는 보여 줍니다. 그래야 진행 막대인 줄 알 수 있습니다. |
| **Do** | 화면 읽기 프로그램이 읽도록 role="progressbar"와 aria-valuenow, aria-valuemin, aria-valuemax를 붙입니다. 라벨이 없으면 aria-label을 붙입니다. |

## 예시

### 진행 값을 글자로 함께 적기

막대 위에 "3/10"처럼 지금 값을 글자로 적습니다. 막대 길이만으로는 몇 문제가 남았는지 정확히 알 수 없습니다.
