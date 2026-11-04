<!-- https://luvms012-rgb.github.io/yds/site/components/image-frame.html -->

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
| **Floater** `ds-imageframe__floater` | 사진 위에 떠 있는 버튼이나 배지입니다. |
| **Indicator** `ds-imageframe__indicator` | 여러 장 가운데 지금 보는 사진을 알려 주는 표시입니다. |

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

### 목록 썸네일을 같은 비율로 맞추기

목록 썸네일은 1:1 틀에 사진을 꽉 채워 넣어, 올린 사진의 비율이 달라도 줄이 가지런합니다. 작은 썸네일에는 `data-radius="md"`처럼 작은 모서리를 씁니다.

```html
<ul class="ds-list u-full" data-divider style="max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><span class="ds-imageframe" data-radius="md" style="width: 64px"><img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=160&q=70" alt=""></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">영어 독해 기초</span>
        <span class="ds-list-item__desc">강의 20개, 10시간</span>
      </span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><span class="ds-imageframe" data-radius="md" style="width: 64px"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=160&q=70" alt=""></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">처음 배우는 코딩</span>
        <span class="ds-list-item__desc">강의 32개, 16시간</span>
      </span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><span class="ds-imageframe" data-radius="md" style="width: 64px"><img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=160&q=70" alt=""></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">한 장으로 끝내는 글쓰기</span>
        <span class="ds-list-item__desc">강의 12개, 6시간</span>
      </span>
    </a>
  </li>
</ul>
```

### 카드 안 사진은 카드 모서리와 맞추기

카드 안 사진은 16:9 틀에 넣고 `data-radius="lg"`로 카드 모서리와 결을 맞춥니다. 사진이 길거나 넓어도 틀 밖으로 넘치지 않고 가운데가 보입니다.

```html
<a class="ds-card u-full" data-size="small" href="#" style="max-width: 320px">
  <div class="ds-imageframe" data-ratio="16:9" data-radius="lg"><img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=640&q=70" alt=""></div>
  <header class="ds-card__header">
    <h3 class="ds-card__title">핸드드립 원데이 클래스</h3>
    <p class="ds-card__desc">11월 14일 (토) 오후 2시, 8명 모집</p>
  </header>
</a>
```

### 흰 바탕 사진에는 테두리 두르기

흰 바탕 상품 사진은 `data-stroke`로 옅은 테두리를 둘러 화면 바탕과 경계를 만듭니다. 사진과 화면이 같은 색이라 사진이 어디서 끝나는지 알기 어려울 때 씁니다.

```html
<div class="u-flex u-gap-3 u-full" style="max-width: 420px">
  <div class="u-col u-gap-2 u-grow">
    <div class="ds-imageframe" data-radius="md" data-stroke><img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=70" alt="검은색 러닝화"></div>
    <div class="u-col u-gap-0_5">
      <span class="ds-t04">가벼운 러닝화</span>
      <span class="ds-t05 ds-fw-bold">59,000원</span>
    </div>
  </div>
  <div class="u-col u-gap-2 u-grow">
    <div class="ds-imageframe" data-radius="md" data-stroke><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=70" alt="흰색 손목시계"></div>
    <div class="u-col u-gap-0_5">
      <span class="ds-t04">흰색 스마트 워치</span>
      <span class="ds-t05 ds-fw-bold">129,000원</span>
    </div>
  </div>
</div>
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
