<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/skeleton.html -->

# Skeleton

내용을 불러오는 동안 들어갈 자리를 미리 보여 주는 컴포넌트입니다. 기다리는 시간을 덜 지루하게 합니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-skeleton" style="width:220px;height:16px"></span>
<span class="ds-skeleton" data-shape="circle" style="--ds-skeleton-size:48px"></span>
<span class="ds-skeleton" data-shape="text" data-lines="3"></span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `shape` | rect circle text |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 목록이나 카드처럼 곧 나타날 모양을 미리 보여 줄 수 있는 곳에 씁니다. |
| **Do** | 모서리는 나중에 들어올 콘텐츠와 똑같이 맞춥니다. |
| **Do** | 1~10초 걸리고 모양을 미리 보여 줄 수 있으면 Skeleton, 1~4초 동안 기다린다는 것만 알리면 Progress Circle을 씁니다. |
| **Don't** | Progress Circle과 함께 쓰지 않습니다. 같은 로딩을 두 번 알리게 됩니다. |

## 예시

```html
<span class="ds-skeleton" data-shape="circle" style="--ds-skeleton-size:48px"></span><span class="ds-skeleton" style="width:220px;height:16px"></span><span class="ds-skeleton" data-shape="text" data-lines="3" style="width:240px"></span>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-skeleton-color` | `var(--ds-color-palette-gray-200)` |
| `--ds-skeleton-radius` | `var(--ds-shape-sm)` |
| `--ds-skeleton-size` | `48px` |

### 크기와 여백

```
shape: rectangle(기본) / circle / text
Figma: palette/gray-200 / rectangle shape/sm / circle pill / text 줄 높이 14 / 줄 사이 x2 / 마지막 줄 64%
모서리(2026-11-03): --ds-skeleton-radius 로 나중에 들어올 콘텐츠와 같게 맞춘다
움직임 줄이기(2026-11-03): 설정을 켠 사람에게는 깜빡이지 않는다
```
