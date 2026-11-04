<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/image-frame.html -->

# Image Frame

사진을 정해진 비율에 맞춰 잘라 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-imageframe" data-ratio="4:3" [data-radius="lg"] [data-stroke]>
  <img src="…" alt="…">
  [<div class="ds-imageframe__floater" data-position="bottom-end"><span class="ds-imageframe__indicator">1/5</span></div>]
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Floater**`ds-imageframe__floater` | 사진 위에 떠 있는 버튼이나 배지입니다. |
| **Indicator**`ds-imageframe__indicator` | 여러 장 가운데 지금 보는 사진을 알려 주는 표시입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `ratio` | 1:1 4:3 16:9 |
| 켜고 끄는 속성 | `stroke` `indicator` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 사진은 Image Frame의 비율 안에 꽉 채워 넣습니다. |
| **Do** | 여러 장을 넘겨 볼 때는 Carousel 항목으로 넣습니다. |
| **Do** | 터치 화면에서는 넘기기 버튼 없이 손가락으로 넘깁니다. |

## 예시

```html
<div class="ds-imageframe" style="width:160px"><span class="pv-ph"><i class="ds-icon ds-icon--image" aria-hidden="true"></i></span></div>
<div class="ds-imageframe" data-ratio="4:3" data-stroke style="width:200px"><span class="pv-ph"><i class="ds-icon ds-icon--image" aria-hidden="true"></i></span><div class="ds-imageframe__floater" data-position="bottom-end"><span class="ds-imageframe__indicator">1/5</span></div></div>
<div class="ds-imageframe" data-ratio="16:9" style="width:240px"><span class="pv-ph"><i class="ds-icon ds-icon--image" aria-hidden="true"></i></span></div>

<div class="ds-imageframe" data-radius="md" style="width:120px"><span class="pv-ph">md</span></div>
<div class="ds-imageframe" data-radius="lg" style="width:120px"><span class="pv-ph">lg</span></div>
<div class="ds-imageframe" data-radius="xl" style="width:120px"><span class="pv-ph">xl</span></div>
<div class="ds-imageframe" data-radius="none" style="width:120px"><span class="pv-ph">none</span></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-imageframe-ratio` | `1` |
| `--ds-imageframe-radius` | `var(--ds-shape-sm)` |

### 크기와 여백

```
ratio: 기본 1:1 / data-ratio="4:3" / data-ratio="16:9" (그 밖은 --ds-imageframe-ratio)   stroke: data-stroke
radius: sm(기본) / none / md / lg / xl (2026-11-03 추가, 작은 썸네일 sm/md, 카드 안 사진 lg, 큰 대표 사진 xl)
Figma: shape/sm / 빈 자리 bg/neutral / stroke 안쪽 1px stroke/neutral-subtle
  얹는 표시는 가장자리에서 x1_5 / indicator padding x0_5 x1_5, pill, palette/static-black-alpha-800, Static t01 Medium 흰색
```
