<!-- https://luvms012-rgb.github.io/yds/site/components/slider.html -->

# Slider

손잡이를 끌어 범위 안에서 값을 정하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<input type="range" class="ds-slider" min="0" max="100" value="45" [data-tone="brand"]>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `tone` |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- <input class="ds-slider"> 채움 길이(--ds-slider-value) 동기화

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 누르는 영역은 손잡이뿐 아니라 막대 전체입니다. 막대를 누르면 손잡이가 그 자리로 바로 옮겨 갑니다. |
| **Do** | 값이 이어지는 슬라이더는 부드럽게 움직입니다. 단계가 있는 슬라이더는 가장 가까운 단계에서 멈춥니다. |
| **Do** | 알맞은 기본값을 미리 넣어 사용자의 수고와 실수를 줄입니다. |
| **Do** | 움직이는 동안 지금 값을 보여 줍니다. |

## 예시

### 움직이는 동안 지금 값 보여 주기

손잡이를 움직이는 동안 라벨 옆 숫자도 함께 바꿉니다. 막대만으로는 지금 값이 정확히 얼마인지 알 수 없습니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header u-between">
    <label class="ds-field__label" for="slider-ex1">음량</label>
    <output class="ds-t04 ds-fg-muted" id="slider-ex1-value" for="slider-ex1">40%</output>
  </div>
  <input type="range" class="ds-slider" id="slider-ex1" min="0" max="100" value="40" oninput="document.getElementById('slider-ex1-value').value = this.value + '%'">
</div>
```

### 단계가 있으면 가까운 단계에 멈추기

재생 속도처럼 정해진 단계가 있으면 `step`을 넣어 가장 가까운 단계에 멈추게 합니다. 막대 아래에 단계 값을 적어 어디에 멈출지 미리 알려 줍니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header u-between">
    <label class="ds-field__label" for="slider-ex2">재생 속도</label>
    <output class="ds-t04 ds-fg-muted" id="slider-ex2-value" for="slider-ex2">1배</output>
  </div>
  <input type="range" class="ds-slider" id="slider-ex2" min="0.5" max="2" step="0.25" value="1" oninput="document.getElementById('slider-ex2-value').value = this.value + '배'">
  <div class="u-flex u-between ds-t02 ds-fg-subtle" aria-hidden="true">
    <span>0.5배</span>
    <span>1배</span>
    <span>1.5배</span>
    <span>2배</span>
  </div>
</div>
```

### 많이 고르는 값을 기본값으로 넣기

처음 쓰는 사람이 많이 고르는 값을 기본값으로 넣어 둡니다. 그대로 두어도 되고 필요할 때만 옮기면 되어 수고와 실수가 줄어듭니다.

```html
<article class="ds-card u-full" style="max-width: 360px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">하루 학습 목표</h3>
    <p class="ds-card__desc">나중에 설정에서 바꿀 수 있어요</p>
  </header>
  <div class="ds-card__content">
    <div class="ds-field">
      <div class="ds-field__header u-between">
        <label class="ds-field__label" for="slider-ex3">목표 시간</label>
        <output class="ds-t04 ds-fg-muted" id="slider-ex3-value" for="slider-ex3">30분</output>
      </div>
      <input type="range" class="ds-slider" data-tone="brand" id="slider-ex3" min="10" max="120" step="10" value="30" oninput="document.getElementById('slider-ex3-value').value = this.value + '분'">
      <div class="ds-field__footer">
        <p class="ds-field__help">처음 시작하는 분께 30분을 권해요</p>
      </div>
    </div>
  </div>
  <footer class="ds-card__footer">
    <button type="button" class="ds-btn" data-variant="neutralWeak">이대로 시작하기</button>
  </footer>
</article>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-slider-value` | `50%` |
| `--ds-slider-active` | `var(--ds-color-bg-neutral-solid)` |
| `--ds-slider-thumb-line` | `var(--ds-color-bg-neutral-solid)` |

### 크기와 여백

```
tone: neutral(기본) / brand
채움 길이는 --ds-slider-value(0~100%) — ybm-ds.js 가 input 마다 자동으로 갱신한다.
Figma: 높이 20 / 트랙 4 pill palette/gray-200 / 채움 bg/neutral-solid(brand bg/brand-solid)
       썸 20 static-white + 1px 테두리(채움 색) + elevation raised
       disabled opacity .7 / 채움 bg/disabled / 썸 테두리 stroke/neutral-weak
```
