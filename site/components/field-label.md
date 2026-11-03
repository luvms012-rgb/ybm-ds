<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/field-label.html -->

# Field Label

입력 칸에 라벨, 안내, 오류 문구를 붙여 무엇을 입력할지 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `label-weight` | bold |

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-field-gap` | `var(--ybm-space-x2)` |
| `--ds-field-label-weight` | `var(--ybm-font-weight-medium)` |

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

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
Figma: 세로 gap x2 / label t05 Medium(bold 변형 t05 Bold) fg/neutral / indicator t04 fg/neutral-subtle(좌 4)
       required 점 4×4 fg/critical / footer 좌우 x0_5 / 안내 t04 fg/neutral-subtle / 오류 t04 fg/critical
오류: 입력 요소에 aria-invalid="true" → help 대신 error 를 보이고 critical 색.
```
