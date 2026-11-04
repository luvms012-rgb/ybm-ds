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
| **Scroller** `ds-carousel__scroller` | 옆으로 넘기는 영역입니다. |
| **Item** `ds-carousel__item` | 목록의 항목 하나입니다. |
| **Button** `ds-carousel__button` | 이전 장, 다음 장으로 넘기는 버튼입니다. |

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

### 추천 상품을 옆으로 넘겨 보기

같은 모양의 상품 카드를 한 줄로 늘어놓고 옆으로 넘겨 봅니다. PC에서는 양 끝 버튼으로 한 화면씩 넘기고, 끝에 닿으면 그쪽 버튼이 사라집니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 420px">
  <div class="u-flex u-center u-between">
    <h3 class="ds-t06 ds-fw-bold">함께 보면 좋은 상품</h3>
    <a class="ds-link" data-size="small" href="#">전체 보기</a>
  </div>
  <div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="함께 보면 좋은 상품">
    <div class="ds-carousel__scroller">
      <div class="ds-carousel__item">
        <a class="ds-card" data-variant="subtle" data-size="small" href="#" style="width: 160px">
          <div class="ds-imageframe" data-radius="md"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=320&q=70" alt=""></div>
          <div class="u-col u-gap-0_5">
            <span class="ds-t04">클래식 손목시계</span>
            <span class="ds-t04 ds-fw-bold">89,000원</span>
          </div>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-variant="subtle" data-size="small" href="#" style="width: 160px">
          <div class="ds-imageframe" data-radius="md"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=320&q=70" alt=""></div>
          <div class="u-col u-gap-0_5">
            <span class="ds-t04">무선 헤드폰</span>
            <span class="ds-t04 ds-fw-bold">129,000원</span>
          </div>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-variant="subtle" data-size="small" href="#" style="width: 160px">
          <div class="ds-imageframe" data-radius="md"><img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=320&q=70" alt=""></div>
          <div class="u-col u-gap-0_5">
            <span class="ds-t04">즉석 카메라</span>
            <span class="ds-t04 ds-fw-bold">98,000원</span>
          </div>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-variant="subtle" data-size="small" href="#" style="width: 160px">
          <div class="ds-imageframe" data-radius="md"><img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=320&q=70" alt=""></div>
          <div class="u-col u-gap-0_5">
            <span class="ds-t04">선글라스</span>
            <span class="ds-t04 ds-fw-bold">45,000원</span>
          </div>
        </a>
      </div>
    </div>
    <button type="button" class="ds-carousel__button" data-direction="previous" aria-label="이전"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i></button>
    <button type="button" class="ds-carousel__button" data-direction="next" aria-label="다음"><i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></button>
  </div>
</div>
```

### 사진 여러 장을 한 장씩 넘기기

사진은 Image Frame의 비율 안에 꽉 채우고, 한 장을 한 항목으로 넣어 넘깁니다. 사진마다 순서 표시를 얹어 몇 번째 사진인지 알려 줍니다.

```html
<div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="숙소 사진" style="width: 100%; max-width: 420px">
  <div class="ds-carousel__scroller">
    <div class="ds-carousel__item" style="width: 100%">
      <div class="ds-imageframe" data-ratio="4:3" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=840&q=70" alt="산으로 둘러싸인 호수">
      </div>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <div class="ds-imageframe" data-ratio="4:3" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=840&q=70" alt="구름 위로 솟은 산">
      </div>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <div class="ds-imageframe" data-ratio="4:3" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=840&q=70" alt="안개 낀 산자락">
      </div>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <div class="ds-imageframe" data-ratio="4:3" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=840&q=70" alt="햇살이 드는 숲">
      </div>
    </div>
  </div>
  <span class="ds-carousel__count" aria-hidden="true">1/4</span>
  <button type="button" class="ds-carousel__button" data-direction="previous" aria-label="이전"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i></button>
  <button type="button" class="ds-carousel__button" data-direction="next" aria-label="다음"><i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></button>
</div>
```

### 터치 화면에서는 손가락으로 넘기기

터치 화면에서는 넘기기 버튼을 빼고 손가락으로 밀어 넘깁니다. 다음 항목이 조금 보이게 두어 옆에 더 있다는 것을 알립니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 375px">
  <h3 class="ds-t06 ds-fw-bold">진행 중인 이벤트</h3>
  <div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="진행 중인 이벤트">
    <div class="ds-carousel__scroller">
      <div class="ds-carousel__item">
        <a class="ds-card" data-variant="subtle" data-size="small" href="#" style="width: 260px">
          <div class="ds-imageframe" data-ratio="16:9" data-radius="md"><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=520&q=70" alt=""></div>
          <header class="ds-card__header">
            <h4 class="ds-card__title">주말 장보기 할인</h4>
            <p class="ds-card__desc">11월 30일까지</p>
          </header>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-variant="subtle" data-size="small" href="#" style="width: 260px">
          <div class="ds-imageframe" data-ratio="16:9" data-radius="md"><img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=520&q=70" alt=""></div>
          <header class="ds-card__header">
            <h4 class="ds-card__title">커피 원두 1+1</h4>
            <p class="ds-card__desc">12월 7일까지</p>
          </header>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-variant="subtle" data-size="small" href="#" style="width: 260px">
          <div class="ds-imageframe" data-ratio="16:9" data-radius="md"><img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=520&q=70" alt=""></div>
          <header class="ds-card__header">
            <h4 class="ds-card__title">겨울 독서 챌린지</h4>
            <p class="ds-card__desc">12월 31일까지</p>
          </header>
        </a>
      </div>
    </div>
  </div>
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
번호(1/4)는 항목 안이 아니라 캐러셀 바로 안에 [<span class="ds-carousel__count" aria-hidden="true">1/4</span>] 로 둔다. 넘겨도 제자리에 있고 숫자는 ybm-ds.js 가 바꾼다.
ybm-ds.js 가 처음/끝에 닿으면 data-at-start / data-at-end 를 붙여 그쪽 흐림과 버튼을 감추고, 버튼을 누르면 한 화면씩 넘긴다.
Figma: 항목 사이 x2 / 양 끝 흐림 x1 / Carousel Button 32 pill, bg/layer-floating, elevation overlay, 아이콘 16, 가장자리에서 x2
```
