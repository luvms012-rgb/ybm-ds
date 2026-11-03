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

```html
<div class="ds-field">
  <div class="ds-field__header"><label class="ds-field__label" for="pv-name">이름</label><span class="ds-field__required" aria-hidden="true"></span></div>
  <div class="ds-input" data-variant="outline"><input class="ds-input__control" id="pv-name" placeholder="이름을 입력해 주세요"></div>
  <div class="ds-field__footer"><p class="ds-field__help">실명으로 입력해 주세요</p></div>
</div>
<div class="ds-field">
  <div class="ds-field__header"><label class="ds-field__label" for="pv-mail">이메일</label></div>
  <div class="ds-input" data-variant="outline"><input class="ds-input__control" id="pv-mail" value="ybm@" aria-invalid="true"></div>
  <div class="ds-field__footer"><p class="ds-field__error">이메일 형식이 올바르지 않아요</p></div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-field-gap` | `var(--ybm-space-x2)` |
| `--ds-field-label-weight` | `var(--ybm-font-weight-medium)` |

### 크기와 여백

```
Figma: 세로 gap x2 / label t05 Medium(bold 변형 t05 Bold) fg/neutral / indicator t04 fg/neutral-subtle(좌 4)
       required 점 4×4 fg/critical / footer 좌우 x0_5 / 안내 t04 fg/neutral-subtle / 오류 t04 fg/critical
오류: 입력 요소에 aria-invalid="true" → help 대신 error 를 보이고 critical 색.
```
