<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/rating.html -->

# Rating

별 다섯 개로 평점을 보여 주거나 매기는 컴포넌트입니다.

## 사용법

아래 예시의 코드를 복사해 씁니다.

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | small medium large |
| `value` | --ds-rating-value 0~5 |

그 밖에: input (radio 5개)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 별 옆에 평점 숫자와 후기 수를 함께 보여 주세요. |
| **Do** | 고르는 별점은 별 5개를 모두 보여 주고, 고른 별까지 채웁니다. |
| **Do** | 별 색은 경고색(노랑) 하나만 씁니다. |

## 예시

```html
<span class="ds-rating" style="--ds-rating-value: 4.5" role="img" aria-label="5점 만점에 4.5점"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.5</span><span class="ds-rating__count">(312)</span></span>
<span class="ds-rating" data-size="small" style="--ds-rating-value: 3.8" role="img" aria-label="5점 만점에 3.8점"><span class="ds-rating__stars"></span><span class="ds-rating__value">3.8</span></span>
<span class="ds-rating" data-size="large" style="--ds-rating-value: 5" role="img" aria-label="5점 만점에 5점"><span class="ds-rating__stars"></span><span class="ds-rating__value">5.0</span><span class="ds-rating__count">(12)</span></span>
<span class="ds-rating" style="--ds-rating-value: 0" role="img" aria-label="평점 없음"><span class="ds-rating__stars"></span><span class="ds-rating__count">아직 후기가 없어요</span></span>

<fieldset class="ds-rating" data-input data-size="large" aria-label="별점 고르기">
  <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="pv-rating" value="1" aria-label="1점"><span class="ds-rating__star"></span></label>
  <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="pv-rating" value="2" aria-label="2점"><span class="ds-rating__star"></span></label>
  <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="pv-rating" value="3" aria-label="3점"><span class="ds-rating__star"></span></label>
  <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="pv-rating" value="4" aria-label="4점" checked><span class="ds-rating__star"></span></label>
  <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="pv-rating" value="5" aria-label="5점"><span class="ds-rating__star"></span></label>
</fieldset>
<i class="ds-icon ds-icon--heart" aria-hidden="true"></i><i class="ds-icon ds-icon--heart-solid" aria-hidden="true" style="color:var(--ybm-color-fg-critical)"></i><i class="ds-icon ds-icon--bookmark" aria-hidden="true"></i><i class="ds-icon ds-icon--bookmark-solid" aria-hidden="true"></i><i class="ds-icon ds-icon--shopping-cart" aria-hidden="true"></i><i class="ds-icon ds-icon--map-pin" aria-hidden="true"></i><i class="ds-icon ds-icon--star" aria-hidden="true"></i>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-rating-size` | `16px` |
| `--ds-rating-gap` | `2px` |
| `--ds-rating-value` | `0` |
| `--ds-rating-fill` | `var(--ybm-color-fg-warning)` |
| `--ds-rating-empty` | `var(--ybm-color-stroke-neutral-muted)` |

### 크기와 여백

```
보기:  <span class="ds-rating" style="--ds-rating-value: 4.5" role="img" aria-label="5점 만점에 4.5점"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.5</span><span class="ds-rating__count">(312)</span></span>
입력:  <fieldset class="ds-rating" data-input aria-label="별점"> 안에 <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="r" value="1"><span class="ds-rating__star"></span></label> 5개
size: small 12 / medium 16 (기본) / large 20  /  값: --ds-rating-value 0~5 (소수 가능)  /  색: --ds-rating-fill, --ds-rating-empty
```
