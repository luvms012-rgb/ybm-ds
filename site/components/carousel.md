<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/carousel.html -->

# Carousel

여러 콘텐츠를 옆으로 넘기며 보는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="추천">
  <div class="ds-carousel__scroller">
    <div class="ds-carousel__item">…</div>
  </div>
  <button type="button" class="ds-carousel__button" data-direction="previous" aria-label="이전"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i></button>
  <button type="button" class="ds-carousel__button" data-direction="next" aria-label="다음"><i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></button>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Scroller**`ds-carousel__scroller` | 옆으로 넘기는 영역입니다. |
| **Item**`ds-carousel__item` | 목록의 항목 하나입니다. |
| **Button**`ds-carousel__button` | 이전, 다음 장으로 넘기는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 항목 사이 x2, 끝 흐림 x1, 버튼 32

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 처음/끝이면 data-at-start / data-at-end, 버튼으로 한 화면씩 넘기기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 사진은 Image Frame의 비율 안에 꽉 채워 넣습니다. |
| **Do** | 여러 장을 넘겨 볼 때는 Carousel 항목으로 넣습니다. |
| **Do** | 터치 화면에서는 넘기기 버튼 없이 손가락으로 넘깁니다. |

## 예시

```html
<div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="추천" style="width:343px">
  <div class="ds-carousel__scroller">
    <div class="ds-carousel__item"><div class="ds-imageframe" data-ratio="4:3" style="width:240px"><span class="pv-ph">1</span></div></div>
    <div class="ds-carousel__item"><div class="ds-imageframe" data-ratio="4:3" style="width:240px"><span class="pv-ph">2</span></div></div>
    <div class="ds-carousel__item"><div class="ds-imageframe" data-ratio="4:3" style="width:240px"><span class="pv-ph">3</span></div></div>
    <div class="ds-carousel__item"><div class="ds-imageframe" data-ratio="4:3" style="width:240px"><span class="pv-ph">4</span></div></div>
  </div>
  <button type="button" class="ds-carousel__button" data-direction="previous" aria-label="이전"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i></button>
  <button type="button" class="ds-carousel__button" data-direction="next" aria-label="다음"><i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></button>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-carousel-gap` | `var(--ds-space-x2)` |
| `--ds-carousel-padding` | `0px` |
| `--ds-carousel-fade` | `var(--ds-space-x1)` |
| `--ds-carousel-fade-start` | `var(--ds-carousel-fade)` |
| `--ds-carousel-fade-end` | `var(--ds-carousel-fade)` |

### 크기와 여백

```
항목은 넘길 때 시작 위치에 맞춰 멈춘다. 이미지 넘기기 배너는 Image Frame 을 항목으로 넣어 만든다.
ybm-ds.js 가 처음/끝에 닿으면 data-at-start / data-at-end 를 붙여 그쪽 흐림과 버튼을 감추고, 버튼을 누르면 한 화면씩 넘긴다.
Figma: 항목 사이 x2 / 양 끝 흐림 x1 / Carousel Button 32 pill, bg/layer-floating, elevation overlay, 아이콘 16, 가장자리에서 x2
```
