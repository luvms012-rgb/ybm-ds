<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/checkbox-group.html -->

# Checkbox Group

관련된 체크박스를 한 묶음으로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<fieldset class="ds-checkbox-group">
  <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">이메일</span></label>
</fieldset>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Control** `ds-checkbox__control` | 실제로 값을 입력하거나 고르는 부분입니다. |
| **Label** `ds-checkbox__label` | 이름이나 값을 보여 주는 글자입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 세로 간격 x1, 묶음 이름은 Field Label

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 서로 관련된 체크박스만 묶습니다. |
| **Do** | 묶음 이름과 오류 문구는 Field Label로 붙입니다. |

## 예시

### 같은 질문의 답을 한 묶음으로

같은 질문에 답하는 체크박스만 세로로 쌓고, 묶음 이름과 안내는 Field Label로 붙입니다. 묶음에 `aria-labelledby`로 이름을 이어 화면 낭독기도 무엇을 고르는지 알게 합니다.

```html
<div class="ds-field" style="width: 100%; max-width: 375px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="checkbox-group-ex1-label">관심 분야</span>
    <span class="ds-field__indicator">선택</span>
  </div>
  <fieldset class="ds-checkbox-group" aria-labelledby="checkbox-group-ex1-label">
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">어학</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">자격증</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">취업</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">교양</span></label>
  </fieldset>
  <div class="ds-field__footer"><p class="ds-field__help">고른 분야의 강의를 먼저 보여 줘요.</p></div>
</div>
```

### 하나도 고르지 않았을 때 오류 알리기

꼭 골라야 하는 묶음을 비워 두면 묶음에 `aria-invalid="true"`를 붙여 안내 글을 오류 문구로 바꿉니다. 오류 문구에는 무엇을 하면 되는지 적습니다.

```html
<div class="ds-field" style="width: 100%; max-width: 375px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="checkbox-group-ex2-label">답변 받을 방법</span>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <fieldset class="ds-checkbox-group" aria-labelledby="checkbox-group-ex2-label" aria-describedby="checkbox-group-ex2-error" aria-invalid="true">
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">이메일</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">문자 메시지</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">전화</span></label>
  </fieldset>
  <div class="ds-field__footer">
    <p class="ds-field__help">답변이 오면 고른 방법으로 알려 줘요.</p>
    <p class="ds-field__error" id="checkbox-group-ex2-error">답변 받을 방법을 하나 이상 골라 주세요.</p>
  </div>
</div>
```

### 성격이 다른 선택은 묶음 밖에 두기

받을 소식처럼 같은 종류만 묶고, 성격이 다른 선택은 Divider 아래에 따로 둡니다. 저장 버튼으로 한 번에 반영하는 설정이라 Switch 대신 Checkbox를 씁니다.

```html
<div class="u-col u-gap-5" style="width: 100%; max-width: 375px">
  <div class="ds-field">
    <div class="ds-field__header"><span class="ds-field__label" id="checkbox-group-ex3-label">받을 소식</span></div>
    <fieldset class="ds-checkbox-group" aria-labelledby="checkbox-group-ex3-label">
      <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">주문 진행</span></label>
      <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">배송 출발</span></label>
      <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">할인과 이벤트</span></label>
    </fieldset>
  </div>
  <hr class="ds-divider">
  <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">밤 9시부터 아침 8시까지는 받지 않기</span></label>
  <button class="ds-btn" data-size="large" data-width="fill">저장</button>
</div>
```

## 규격

### 크기와 여백

```
묶음 이름, 설명, 오류 문구는 03 Field Label 로 감싼다.
Figma: 항목 사이 x1
```
