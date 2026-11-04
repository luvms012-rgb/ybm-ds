<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/field-label.html -->

# Field Label

입력 칸에 라벨, 안내, 오류 문구를 붙여 무엇을 입력할지 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-field" [data-label-weight="bold"]>
  <div class="ds-field__header">
    <label class="ds-field__label" for="id">라벨</label>
    [<span class="ds-field__indicator">선택</span>] [<span class="ds-field__required" aria-hidden="true"></span>]
  </div>
  <div class="ds-input">…</div>
  <div class="ds-field__footer">
    <p class="ds-field__help">설명을 써주세요</p>
    [<p class="ds-field__error">오류 이유</p>]
    [<span class="ds-field__count">0/8</span>]
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-field__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Label**`ds-field__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Indicator**`ds-field__indicator` | 지금 상태나 위치를 알려 주는 표시입니다. |
| **Required**`ds-field__required` | 꼭 입력해야 함을 알리는 표시입니다. |
| **Footer**`ds-field__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |
| **Help**`ds-field__help` | 입력을 돕는 안내 글입니다. |
| **Error**`ds-field__error` | 잘못된 입력을 알리는 글입니다. |
| **Count**`ds-field__count` | 개수나 글자 수를 보여 줍니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `label-weight` | bold |

## 예시

### 꼭 넣을 칸과 비워도 되는 칸 나누기

꼭 넣어야 하는 칸에는 라벨 옆에 필수 점을, 비워도 되는 칸에는 '선택'을 붙입니다. 필수 점은 화면 읽기 프로그램이 읽지 않으므로 입력 요소에 `required`를 함께 붙입니다.

```html
<form class="u-col u-gap-5 u-full" style="max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="field-label-ex1-name">이름</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="field-label-ex1-name" placeholder="이름을 입력해 주세요" required>
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="field-label-ex1-phone">휴대폰 번호</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="field-label-ex1-phone" type="tel" placeholder="010-0000-0000" required>
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="field-label-ex1-code">추천인 코드</label>
      <span class="ds-field__indicator">선택</span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="field-label-ex1-code" placeholder="코드를 입력해 주세요">
    </div>
    <div class="ds-field__footer">
      <p class="ds-field__help">친구에게 받은 코드가 있으면 넣어 주세요.</p>
    </div>
  </div>
</form>
```

### 오류는 고치는 방법까지 알리기

입력 요소에 `aria-invalid="true"`를 붙이면 안내 문구가 오류 문구로 바뀌고 빨간색이 됩니다. 오류 문구에는 무엇이 틀렸는지와 고치는 방법을 함께 적습니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="field-label-ex2-mail">이메일</label>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <div class="ds-input" data-variant="outline">
    <input class="ds-input__control" id="field-label-ex2-mail" type="email" value="hana@example" aria-invalid="true" aria-describedby="field-label-ex2-error" required>
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">로그인할 때 쓰는 이메일이에요.</p>
    <p class="ds-field__error" id="field-label-ex2-error">이메일 주소가 끝까지 들어가지 않았어요. 예: hana@example.com</p>
  </div>
</div>
```

### 글자 수 제한은 카운트로 보여 주기

글자 수 제한이 있는 칸은 아래 오른쪽에 지금 글자 수와 최대 글자 수를 보여 줍니다. 안내 문구는 왼쪽에 두어 두 정보가 한 줄에 함께 읽힙니다.

```html
<div class="ds-field u-full" style="max-width: 420px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="field-label-ex3-text">문의 내용</label>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <textarea class="ds-textarea" id="field-label-ex3-text" rows="4" maxlength="500" placeholder="궁금한 점을 자세히 적어 주세요" required>주문한 책이 아직 오지 않았어요. 배송 상황을 알려 주세요.</textarea>
  <div class="ds-field__footer">
    <p class="ds-field__help">주민등록번호 같은 개인 정보는 적지 말아 주세요.</p>
    <span class="ds-field__count">33/500</span>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-field-gap` | `var(--ds-space-x2)` |
| `--ds-field-label-weight` | `var(--ds-font-weight-medium)` |

### 크기와 여백

```
Figma: 세로 gap x2 / label t05 Medium(bold 변형 t05 Bold) fg/neutral / indicator t04 fg/neutral-subtle(좌 4)
       required 점 4×4 fg/critical / footer 좌우 x0_5 / 안내 t04 fg/neutral-subtle / 오류 t04 fg/critical
오류: 입력 요소에 aria-invalid="true" → help 대신 error 를 보이고 critical 색.
```
