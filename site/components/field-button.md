<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/field-button.html -->

# Field Button

직접 입력하지 않고 눌러서 값을 고르는 입력 칸입니다. 날짜, 시간처럼 다른 창에서 값을 받을 때 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button type="button" class="ds-fieldbutton" data-size="large">
  [<i class="ds-icon ds-icon--calendar" aria-hidden="true"></i>]
  [<span class="ds-fieldbutton__affix">https://</span>]
  <span class="ds-fieldbutton__value" data-placeholder="선택해 주세요"></span>
  [<span class="ds-fieldbutton__affix">cm</span>]
  <i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i>
</button>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Affix** `ds-fieldbutton__affix` | 값 앞이나 뒤에 붙는 아이콘입니다. |
| **Value** `ds-fieldbutton__value` | 고른 값이나 숫자를 보여 줍니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | large medium |

그 밖에: 상태 enabled/disabled/readOnly/invalid

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 폼으로 보내야 하는 값은 disabled 대신 readOnly로 두세요. disabled 값은 보내지지 않습니다. |
| **Do** | 사용자가 직접 입력해야 하면 Field Button 대신 Text Field Input을 씁니다. |
| **Do** | 라벨, 설명, 오류 문구는 Field Label로 감싸서 붙이세요. |
| **Don't** | 지우기(clear) 버튼은 오른쪽 아이콘과 역할이 겹치므로 넣지 않습니다. |

## 예시

### 정해진 값은 눌러서 고르게 하기

고를 값이 정해진 칸은 Field Button으로 만들고, 누르면 Bottom Sheet에서 고릅니다. 사용자가 직접 써야 하는 칸이면 Text Field Input을 씁니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="field-button-ex1-field">배송 요청 사항</label>
    <span class="ds-field__indicator">선택</span>
  </div>
  <button type="button" class="ds-fieldbutton" id="field-button-ex1-field" data-ds-open="field-button-ex1-sheet" aria-haspopup="dialog">
    <span class="ds-fieldbutton__value" data-placeholder="요청 사항을 골라 주세요"></span>
    <i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i>
  </button>
</div>
<dialog class="ds-bottomsheet" id="field-button-ex1-sheet" aria-labelledby="field-button-ex1-title" data-handle>
  <div class="ds-bottomsheet__header">
    <h2 class="ds-bottomsheet__title" id="field-button-ex1-title">배송 요청 사항</h2>
    <button class="ds-bottomsheet__close" data-ds-close aria-label="닫기"></button>
  </div>
  <div class="ds-bottomsheet__body">
    <div class="ds-radio-group" role="radiogroup" aria-labelledby="field-button-ex1-title">
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="field-button-ex1-request" checked><span>문 앞에 두기</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="field-button-ex1-request"><span>경비실에 맡기기</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="field-button-ex1-request"><span>택배함에 넣기</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="field-button-ex1-request"><span>배송 전에 연락하기</span></label>
    </div>
  </div>
  <div class="ds-bottomsheet__footer">
    <button class="ds-btn" data-variant="brandSolid" data-size="large" data-ds-close>적용</button>
  </div>
</dialog>
```

### 바꿀 수 없지만 보내야 하는 값은 readOnly로

바꿀 수 없지만 폼과 함께 보내야 하는 값은 `disabled` 대신 `aria-readonly="true"`로 둡니다. `disabled` 값은 폼과 함께 보내지지 않기 때문입니다.

```html
<div class="u-col u-gap-5 u-full" style="max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="field-button-ex2-area">시험 지역</label>
    </div>
    <button type="button" class="ds-fieldbutton" id="field-button-ex2-area" aria-readonly="true">
      <span class="ds-fieldbutton__value">서울</span>
      <i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i>
    </button>
    <div class="ds-field__footer">
      <p class="ds-field__help">접수한 지역은 바꿀 수 없어요.</p>
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="field-button-ex2-place">시험장</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <button type="button" class="ds-fieldbutton" id="field-button-ex2-place">
      <span class="ds-fieldbutton__value" data-placeholder="시험장을 골라 주세요"></span>
      <i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i>
    </button>
  </div>
</div>
```

### 고르지 않은 칸은 오류와 고칠 방법 알리기

라벨과 오류 문구는 Field Label로 감싸 붙이고, 고르지 않은 칸에는 `aria-invalid="true"`를 붙입니다. 오류가 나면 안내 문구 자리에 고치는 방법이 보입니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="field-button-ex3-field">생년월일</label>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <button type="button" class="ds-fieldbutton" id="field-button-ex3-field" aria-invalid="true" aria-describedby="field-button-ex3-error">
    <span class="ds-fieldbutton__value" data-placeholder="날짜를 골라 주세요"></span>
    <i class="ds-icon ds-icon--calendar" aria-hidden="true"></i>
  </button>
  <div class="ds-field__footer">
    <p class="ds-field__help">신분증에 적힌 날짜로 골라 주세요.</p>
    <p class="ds-field__error" id="field-button-ex3-error">생년월일을 골라야 다음으로 넘어갈 수 있어요.</p>
  </div>
</div>
```

## 규격

### 크기와 여백

```
Figma large : h52 / px16 / gap10 / shape/lg / t05 / icon 20 / medium: h40 / px14 / gap8 / shape/sm / t04 / icon 16
       1px stroke/neutral-weak / invalid 1px stroke/critical-solid / disabled/readOnly bg/disabled
       affix/아이콘 fg/neutral-subtle / placeholder fg/placeholder / 값 fg/neutral
readOnly: aria-readonly="true" (폼 제출이 필요하면 disabled 대신 readOnly — DS §6.4)
```
