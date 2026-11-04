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
| **Do** | 별점을 매길 때는 별 5개를 모두 보여 주고, 고른 별까지 채웁니다. |
| **Do** | 별 색은 경고색(노랑) 하나만 씁니다. |

## 예시

### 별 옆에 평점과 후기 수 함께 적기

목록에서는 별 옆에 평점 숫자와 후기 수를 함께 둡니다. 별만으로는 4.5점과 4점을 가려 보기 어렵고, 후기 수가 있어야 평점을 얼마나 믿을지 알 수 있습니다.

```html
<ul class="ds-list u-full" data-variant="inset" data-divider style="max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content u-gap-1">
        <span class="ds-list-item__title">영어 회화 기초</span>
        <span class="ds-rating" data-size="small" style="--ds-rating-value: 4.5" role="img" aria-label="5점 만점에 4.5점, 후기 312개"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.5</span><span class="ds-rating__count">(312)</span></span>
      </span>
      <span class="ds-list-item__suffix">49,000원</span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content u-gap-1">
        <span class="ds-list-item__title">비즈니스 이메일 쓰기</span>
        <span class="ds-rating" data-size="small" style="--ds-rating-value: 4.8" role="img" aria-label="5점 만점에 4.8점, 후기 1,204개"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.8</span><span class="ds-rating__count">(1,204)</span></span>
      </span>
      <span class="ds-list-item__suffix">59,000원</span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content u-gap-1">
        <span class="ds-list-item__title">여행 영어 첫걸음</span>
        <span class="ds-rating" data-size="small" style="--ds-rating-value: 0" role="img" aria-label="아직 후기가 없어요"><span class="ds-rating__stars"></span><span class="ds-rating__count">아직 후기가 없어요</span></span>
      </span>
      <span class="ds-list-item__suffix">29,000원</span>
    </a>
  </li>
</ul>
```

### 별점을 매길 때는 별 5개 모두 보여 주기

후기를 쓸 때는 입력형(`data-input`)으로 별 5개를 모두 보여 주고 고른 별까지 채웁니다. 다섯 개 중 몇 개를 골랐는지 한눈에 보입니다.

```html
<div class="u-col u-gap-6 u-full" style="max-width: 420px">
  <div class="ds-field">
    <div class="ds-field__header">
      <span class="ds-field__label" id="rating-ex2-label">강의는 어떠셨나요?</span>
    </div>
    <fieldset class="ds-rating" data-input data-size="large" aria-labelledby="rating-ex2-label">
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="1" aria-label="1점"><span class="ds-rating__star"></span></label>
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="2" aria-label="2점"><span class="ds-rating__star"></span></label>
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="3" aria-label="3점"><span class="ds-rating__star"></span></label>
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="4" aria-label="4점" checked><span class="ds-rating__star"></span></label>
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="5" aria-label="5점"><span class="ds-rating__star"></span></label>
    </fieldset>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="rating-ex2-text">후기</label>
      <span class="ds-field__indicator">선택</span>
    </div>
    <textarea class="ds-textarea" id="rating-ex2-text" rows="3" placeholder="좋았던 점이나 아쉬운 점을 적어 주세요"></textarea>
  </div>
  <button type="button" class="ds-btn" data-variant="neutralSolid" data-size="large">후기 올리기</button>
</div>
```

### 점수와 상관없이 별 색은 하나로

점수가 낮은 후기도 별은 높은 점수와 같은 색으로 채웁니다. 낮은 점수만 빨간색으로 바꾸면 오류나 경고로 읽힙니다.

```html
<ul class="ds-list u-full" data-divider style="max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content u-gap-1">
        <span class="ds-rating" data-size="small" style="--ds-rating-value: 5" role="img" aria-label="5점 만점에 5점"><span class="ds-rating__stars"></span><span class="ds-rating__value">5.0</span></span>
        <span class="ds-list-item__title">예문이 많아서 바로 따라 할 수 있었어요.</span>
        <span class="ds-tag-group"><span>김하늘</span><span>11월 2일</span></span>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content u-gap-1">
        <span class="ds-rating" data-size="small" style="--ds-rating-value: 2" role="img" aria-label="5점 만점에 2점"><span class="ds-rating__stars"></span><span class="ds-rating__value">2.0</span></span>
        <span class="ds-list-item__title">진도가 빨라서 따라가기 힘들었어요.</span>
        <span class="ds-tag-group"><span>이준</span><span>10월 30일</span></span>
      </span>
    </div>
  </li>
</ul>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-rating-size` | `16px` |
| `--ds-rating-gap` | `2px` |
| `--ds-rating-value` | `0` |
| `--ds-rating-fill` | `var(--ds-color-fg-warning)` |
| `--ds-rating-empty` | `var(--ds-color-stroke-neutral-muted)` |

### 크기와 여백

```
보기:  <span class="ds-rating" style="--ds-rating-value: 4.5" role="img" aria-label="5점 만점에 4.5점"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.5</span><span class="ds-rating__count">(312)</span></span>
입력:  <fieldset class="ds-rating" data-input aria-label="별점"> 안에 <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="r" value="1"><span class="ds-rating__star"></span></label> 5개
size: small 12 / medium 16 (기본) / large 20  /  값: --ds-rating-value 0~5 (소수 가능)  /  색: --ds-rating-fill, --ds-rating-empty
```
