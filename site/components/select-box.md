<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/select-box.html -->

# Select Box

선택지를 설명과 함께 상자로 크게 보여 주는 컴포넌트입니다. 요금제처럼 차이를 읽고 고를 때 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-selectbox-group" [style="--ds-selectbox-columns: 2"]>
  <label class="ds-selectbox" [data-layout="vertical"]>
    [<i class="ds-icon ds-icon--…" aria-hidden="true"></i>]
    <span class="ds-selectbox__texts">
      <span class="ds-selectbox__label">라벨</span>
      [<span class="ds-selectbox__desc">설명</span>]
    </span>
    <span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"></span>
    또는 <span class="ds-radio" data-tone="neutral" data-size="medium"><input type="radio" class="ds-radio__control" name="g"></span>
  </label>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Texts**`ds-selectbox__texts` | 제목과 설명을 묶는 글자 영역입니다. |
| **Label**`ds-selectbox__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Desc**`ds-selectbox__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Control**`ds-checkbox__control` | 실제로 값을 입력하거나 고르는 부분입니다. |
| **Control**`ds-radio__control` | 실제로 값을 입력하거나 고르는 부분입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `type` | check radio |
| `state` | unchecked checked disabled |
| `layout` | horizontal vertical |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 설명이 필요한 선택지가 2~6개일 때 씁니다. |
| **Do** | 짧은 선택지는 Radio Group이나 Checkbox를 씁니다. |
| **Don't** | 한 묶음 안에서 check와 radio를 섞지 않습니다. |

## 예시

### 설명을 읽고 고르는 이용권

선택지마다 가격과 조건 같은 설명이 필요할 때 Select Box로 크게 보여 줍니다. 짧은 라벨만으로 고를 수 있으면 Radio Group을 씁니다.

```html
<div class="ds-field u-full" style="max-width: 420px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="select-box-ex1-label">이용권</span>
  </div>
  <div class="ds-selectbox-group" role="radiogroup" aria-labelledby="select-box-ex1-label">
    <label class="ds-selectbox">
      <span class="ds-selectbox__texts">
        <span class="ds-selectbox__label">1개월</span>
        <span class="ds-selectbox__desc">19,000원, 언제든 해지할 수 있어요</span>
      </span>
      <span class="ds-radio" data-tone="neutral" data-size="medium"><input type="radio" class="ds-radio__control" name="select-box-ex1"></span>
    </label>
    <label class="ds-selectbox">
      <span class="ds-selectbox__texts">
        <span class="ds-selectbox__label">6개월</span>
        <span class="ds-selectbox__desc">월 15,000원, 90,000원을 한 번에 결제해요</span>
      </span>
      <span class="ds-radio" data-tone="neutral" data-size="medium"><input type="radio" class="ds-radio__control" name="select-box-ex1"></span>
    </label>
    <label class="ds-selectbox">
      <span class="ds-selectbox__texts">
        <span class="ds-selectbox__label">12개월</span>
        <span class="ds-selectbox__desc">월 12,000원, 가장 많이 골라요</span>
      </span>
      <span class="ds-radio" data-tone="neutral" data-size="medium"><input type="radio" class="ds-radio__control" name="select-box-ex1" checked></span>
    </label>
  </div>
</div>
```

### 여러 개를 고를 때는 체크로만

관심 분야처럼 여러 개를 고를 때는 모든 상자에 체크 표시를 씁니다. 한 묶음 안에서 check와 radio를 섞으면 몇 개를 골라야 하는지 헷갈립니다.

```html
<div class="ds-field u-full" style="max-width: 420px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="select-box-ex2-label">관심 있는 분야를 모두 골라 주세요</span>
  </div>
  <div class="ds-selectbox-group" role="group" aria-labelledby="select-box-ex2-label" style="--ds-selectbox-columns: 2">
    <label class="ds-selectbox" data-layout="vertical">
      <i class="ds-icon ds-icon--message-circle" aria-hidden="true"></i>
      <span class="ds-selectbox__texts">
        <span class="ds-selectbox__label">말하기</span>
        <span class="ds-selectbox__desc">발음과 대화 연습</span>
      </span>
      <span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked></span>
    </label>
    <label class="ds-selectbox" data-layout="vertical">
      <i class="ds-icon ds-icon--headset" aria-hidden="true"></i>
      <span class="ds-selectbox__texts">
        <span class="ds-selectbox__label">듣기</span>
        <span class="ds-selectbox__desc">빠른 말 알아듣기</span>
      </span>
      <span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"></span>
    </label>
    <label class="ds-selectbox" data-layout="vertical">
      <i class="ds-icon ds-icon--book-open" aria-hidden="true"></i>
      <span class="ds-selectbox__texts">
        <span class="ds-selectbox__label">읽기</span>
        <span class="ds-selectbox__desc">긴 글 빨리 읽기</span>
      </span>
      <span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked></span>
    </label>
    <label class="ds-selectbox" data-layout="vertical">
      <i class="ds-icon ds-icon--pencil" aria-hidden="true"></i>
      <span class="ds-selectbox__texts">
        <span class="ds-selectbox__label">쓰기</span>
        <span class="ds-selectbox__desc">이메일과 보고서</span>
      </span>
      <span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"></span>
    </label>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-selectbox-columns` | `1` |
| `--ds-selectbox-line` | `var(--ds-color-stroke-neutral-weak)` |
| `--ds-selectbox-bg` | `var(--ds-color-bg-layer-default)` |

### 크기와 여백

```
layout: horizontal(기본) / vertical(여러 열로 놓을 때)
표시는 Checkbox(square/neutral/medium), Radio(neutral/medium) 를 그대로 쓴다.
Figma: padding x4 x5 / gap x3 / shape/lg / bg/layer-default / 1px stroke/neutral-weak
  선택 1px stroke/neutral-contrast(색만 진해짐) / disabled bg/disabled + 글자 fg/disabled
  label t05 Medium fg/neutral / desc t04 fg/neutral-subtle / 글 사이 2 / 앞 아이콘 24
```
