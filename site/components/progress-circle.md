<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/progress-circle.html -->

# Progress Circle

작업이 진행 중임을 원으로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-progress-circle" data-size="40" data-tone="brand" role="progressbar" aria-valuenow="40" style="--ds-progress-value: 40">
  <svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg>
</span>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Track**`ds-progress-circle__track` | 막대의 바탕입니다. |
| **Range**`ds-progress-circle__range` | 진행한 양을 보여 주는 호입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `tone` | neutral brand staticWhite |
| `type` | determinate indeterminate |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 로딩은 Progress Circle의 indeterminate로 보여 줍니다. |
| **Do** | Spinner 부품은 따로 없습니다. |
| **Do** | staticWhite는 어두운 배경이나 사진 위에서만 씁니다. |
| **Do** | determinate는 진행률을 실제로 알 수 있을 때만 씁니다. 모를 때는 indeterminate를 씁니다. |

## 예시

```html
<span class="ds-progress-circle" role="progressbar" aria-label="불러오는 중" data-type="indeterminate"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
<span class="ds-progress-circle" data-size="40" data-tone="brand" role="progressbar" aria-valuenow="40" aria-label="40%" style="--ds-progress-value: 40"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
<span class="ds-progress-circle" data-size="56" data-tone="brand" role="progressbar" aria-valuenow="75" aria-label="75%" style="--ds-progress-value: 75"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-progress-value` | `40` |

### 크기와 여백

```
tone: neutral(기본) / brand / staticWhite   size: 24(기본) / 40 / 56   type: determinate / indeterminate
  indeterminate: data-type="indeterminate" (회전하는 25% 호)
Figma: 두께 24→3 / 40→5 / 56→7 / 둥근 끝 / 12시 시작
  neutral 트랙 palette/gray-200 + 호 palette/gray-500 / brand palette/brand-200 + bg/brand-solid
  staticWhite palette/static-white-alpha-300 + palette/static-white (팔레트 직참은 의도된 예외)
```
