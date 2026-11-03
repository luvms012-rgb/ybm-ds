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
| **Affix**`ds-fieldbutton__affix` | 값 앞이나 뒤에 붙는 아이콘입니다. |
| **Value**`ds-fieldbutton__value` | 고른 값이나 숫자를 보여 줍니다. |

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

```html
<button type="button" class="ds-fieldbutton" data-size="large"><span class="ds-fieldbutton__value" data-placeholder="날짜를 선택해 주세요"></span><i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i></button>
<button type="button" class="ds-fieldbutton" data-size="medium"><span class="ds-fieldbutton__value">2026.10.25 (토)</span><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></button>
```

## 규격

### 크기와 여백

```
Figma large : h52 / px16 / gap10 / shape/lg / t05 / icon 20 / medium: h40 / px14 / gap8 / shape/sm / t04 / icon 16
       1px stroke/neutral-weak / invalid 1px stroke/critical-solid / disabled/readOnly bg/disabled
       affix/아이콘 fg/neutral-subtle / placeholder fg/placeholder / 값 fg/neutral
readOnly: aria-readonly="true" (폼 제출이 필요하면 disabled 대신 readOnly — DS §6.4)
```
