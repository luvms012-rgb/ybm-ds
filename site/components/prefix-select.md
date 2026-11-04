<!-- https://luvms012-rgb.github.io/yds/site/components/prefix-select.html -->

# Prefix Select

입력 칸 앞에서 국가 번호, 단위 같은 기준 값을 고르는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button type="button" class="ds-prefixselect" [data-size="medium"]>통신사</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 입력 앞 선택(통신사, 국가번호)

## 예시

### 번호 앞에 고를 값을 한 칸에 붙이기

휴대폰 인증처럼 번호 앞에 고를 값이 하나 더 있으면 Prefix Select를 입력 칸 안 맨 앞에 둡니다. 고르는 값과 입력하는 값이 한 칸에 있어 하나의 정보로 읽힙니다.

```html
<div class="u-col u-gap-6 u-full" style="max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="prefix-select-ex1-phone">휴대폰 번호</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input">
      <button type="button" class="ds-prefixselect">통신사</button>
      <input class="ds-input__control" id="prefix-select-ex1-phone" type="tel" inputmode="numeric" placeholder="010-0000-0000" required>
    </div>
  </div>
  <button class="ds-btn" data-variant="brandSolid" data-size="large" data-width="fill">인증번호 받기</button>
</div>
```

### 테두리 칸에는 한 단계 작게 쓰기

테두리 있는 입력 칸에는 `data-size="medium"`을 써서 글자 크기를 칸과 맞춥니다. 누르면 Bottom Sheet에서 국가번호를 고르고, 고른 값이 버튼 글자가 됩니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="prefix-select-ex2-phone">연락처</label>
  </div>
  <div class="ds-input" data-variant="outline">
    <button type="button" class="ds-prefixselect" data-size="medium" aria-haspopup="dialog" aria-label="국가번호 +82" data-ds-open="prefix-select-ex2-sheet">+82</button>
    <input class="ds-input__control" id="prefix-select-ex2-phone" type="tel" inputmode="numeric" placeholder="10-1234-5678">
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">해외 번호는 국가번호를 먼저 바꿔 주세요.</p>
  </div>
</div>
<dialog class="ds-bottomsheet" id="prefix-select-ex2-sheet" aria-labelledby="prefix-select-ex2-title" data-handle>
  <div class="ds-bottomsheet__header">
    <h2 class="ds-bottomsheet__title" id="prefix-select-ex2-title">국가번호</h2>
    <button class="ds-bottomsheet__close" data-ds-close aria-label="닫기"></button>
  </div>
  <div class="ds-bottomsheet__body">
    <div class="ds-radio-group" role="radiogroup" aria-labelledby="prefix-select-ex2-title">
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="prefix-select-ex2-code" checked><span>대한민국 +82</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="prefix-select-ex2-code"><span>일본 +81</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="prefix-select-ex2-code"><span>미국 +1</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="prefix-select-ex2-code"><span>베트남 +84</span></label>
    </div>
  </div>
  <div class="ds-bottomsheet__footer">
    <button class="ds-btn" data-variant="brandSolid" data-size="large" data-ds-close>적용</button>
  </div>
</dialog>
```

## 규격

### 크기와 여백

```
Figma large: t06 Regular / chevron 24 / medium: t05 / chevron 20 / gap x1 / fg/neutral-subtle
```
