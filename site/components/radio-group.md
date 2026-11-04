<!-- https://luvms012-rgb.github.io/yds/site/components/radio-group.html -->

# Radio Group

여러 선택지에서 하나만 고를 때 쓰는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-radio-group" role="radiogroup">
  <label class="ds-radio"><input type="radio" class="ds-radio__control" name="g"><span>라벨</span></label>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `tone` `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 같은 묶음에서는 하나만 선택된 상태로 둡니다. |
| **Do** | 누르는 영역은 라벨까지 포함합니다. List 안에서는 줄 전체를 누를 수 있습니다. |
| **Do** | 여러 개를 골라야 하면 Checkbox를 쓰세요. |
| **Do** | 추천하거나 자주 고르는 선택지는 미리 골라 둡니다. 사용자가 고민할 일이 줄어듭니다. |
| **Do** | 선택지가 2~6개면 Radio Group을 씁니다. 그보다 많거나 늘어날 수 있으면 Field Button이나 Select를 씁니다. |
| **Don't** | 라벨이 길거나 화면이 좁으면 가로로 늘어놓지 마세요. 기본은 세로로 쌓습니다. |

## 예시

### 많이 고르는 선택지를 미리 골라 두기

대부분이 고르는 일반 배송을 처음부터 골라 둡니다. 바꾸고 싶은 사람만 누르면 되어 고민할 일이 줄어듭니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="radio-group-ex1-label">배송 방법</span>
  </div>
  <div class="ds-radio-group" role="radiogroup" aria-labelledby="radio-group-ex1-label">
    <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex1" checked><span>일반 배송, 무료</span></label>
    <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex1"><span>빠른 배송, 3,000원</span></label>
    <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex1"><span>편의점에서 받기</span></label>
  </div>
</div>
```

### 목록 안에서는 줄 전체를 누르게 하기

List 안에 둘 때는 `label.ds-list-item`으로 줄 전체를 라벨로 만듭니다. 작은 원을 겨누지 않아도 줄 어디를 눌러도 고를 수 있습니다.

```html
<ul class="ds-list u-full" data-variant="inset" data-divider role="radiogroup" aria-label="결제 수단" style="max-width: 420px">
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--credit-card" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">카드 결제</span>
        <span class="ds-list-item__desc">일시불, 할부</span>
      </span>
      <span class="ds-radio" data-size="medium"><input type="radio" class="ds-radio__control" name="radio-group-ex2" checked></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--wallet" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">계좌 이체</span>
        <span class="ds-list-item__desc">입금을 확인하면 바로 접수돼요</span>
      </span>
      <span class="ds-radio" data-size="medium"><input type="radio" class="ds-radio__control" name="radio-group-ex2"></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--smartphone" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">휴대폰 결제</span>
        <span class="ds-list-item__desc">한 달에 30만 원까지</span>
      </span>
      <span class="ds-radio" data-size="medium"><input type="radio" class="ds-radio__control" name="radio-group-ex2"></span>
    </label>
  </li>
</ul>
```

### 문항마다 묶음을 따로 두기

문항마다 `name`을 다르게 해 묶음을 나눕니다. 한 묶음 안에서는 하나만 골라지므로 다른 문항의 답과 섞이지 않습니다.

```html
<div class="u-col u-gap-6 u-full" style="max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <span class="ds-field__label" id="radio-group-ex3-q1">강의 난이도는 어땠나요?</span>
    </div>
    <div class="ds-radio-group" role="radiogroup" aria-labelledby="radio-group-ex3-q1">
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q1"><span>쉬웠어요</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q1" checked><span>알맞았어요</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q1"><span>어려웠어요</span></label>
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <span class="ds-field__label" id="radio-group-ex3-q2">다른 사람에게 추천할까요?</span>
    </div>
    <div class="ds-radio-group" role="radiogroup" aria-labelledby="radio-group-ex3-q2">
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q2"><span>추천해요</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q2"><span>잘 모르겠어요</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q2"><span>추천하지 않아요</span></label>
    </div>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-radio-size` | `24px` |
| `--ds-radio-dot` | `10px` |
| `--ds-radio-checked-bg` | `var(--ds-color-bg-brand-solid)` |
| `--ds-radio-checked-fg` | `var(--ds-color-fg-on-brand-solid)` |

### 크기와 여백

```
size: large(기본 24) / medium(20)   tone: brand(기본) / neutral
Figma: 행 min-h 36/32 / 위 6 / gap x2 / 원 bg/layer-default + 1px stroke/neutral-weak / label t05/t04
  checked 고리(두께 7/6, 가운데 10/8 은 투명) brand bg/brand-solid / neutral bg/neutral-solid (2026-10-31 흰 점 → 투명)
  disabled bg/disabled + stroke/neutral-muted / disabledChecked 고리 bg/disabled, 가운데 투명
```
