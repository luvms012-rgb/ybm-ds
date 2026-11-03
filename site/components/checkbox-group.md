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
| **Control**`ds-checkbox__control` | 실제로 값을 입력하거나 고르는 부분입니다. |
| **Label**`ds-checkbox__label` | 이름이나 값을 보여 주는 글자입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 세로 간격 x1, 묶음 이름은 Field Label

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 서로 관련된 체크박스만 묶습니다. |
| **Do** | 묶음 이름과 오류 문구는 Field Label로 붙입니다. |

## 예시

```html
<fieldset class="ds-checkbox-group">
  <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">이메일</span></label>
  <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">문자 메시지</span></label>
  <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">앱 알림</span></label>
</fieldset>
```

## 규격

### 크기와 여백

```
묶음 이름, 설명, 오류 문구는 03 Field Label 로 감싼다.
Figma: 항목 사이 x1
```
