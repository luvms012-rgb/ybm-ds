<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/stepper.html -->

# Stepper

여러 단계로 나뉜 흐름에서 지금 몇 번째 단계인지 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<ol class="ds-stepper" aria-label="가입 단계" [data-orientation="vertical"]>
  <li class="ds-stepper__step" data-state="complete"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">약관 동의</span></li>
  <li class="ds-stepper__step" data-state="current" aria-current="step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">본인 인증</span></li>
  <li class="ds-stepper__step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">정보 입력</span></li>
</ol>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Step**`ds-stepper__step` | 단계 하나입니다. |
| **Indicator**`ds-stepper__indicator` | 단계 번호나 완료 표시입니다. |
| **Label**`ds-stepper__label` | 이름이나 값을 보여 주는 글자입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: state complete, current, upcoming, orientation vertical

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 단계는 3~5개로 하고, 라벨은 짧은 명사로 씁니다. |
| **Do** | 단계가 더 많으면 "2 / 6"처럼 글자로 보여 줍니다. |

## 예시

```html
<ol class="ds-stepper" aria-label="가입 단계" style="max-width:560px">
  <li class="ds-stepper__step" data-state="complete"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">약관 동의</span></li>
  <li class="ds-stepper__step" data-state="current" aria-current="step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">본인 인증</span></li>
  <li class="ds-stepper__step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">정보 입력</span></li>
  <li class="ds-stepper__step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">가입 완료</span></li>
</ol>
<ol class="ds-stepper" aria-label="신청 단계" data-orientation="vertical" style="margin-top:var(--ybm-space-x6)">
  <li class="ds-stepper__step" data-state="complete"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">상품 선택</span></li>
  <li class="ds-stepper__step" data-state="current" aria-current="step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">배송지 입력</span></li>
  <li class="ds-stepper__step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">결제</span></li>
</ol>
```

## 규격

### 크기와 여백

```
state: complete / current / upcoming(기본)   orientation: horizontal(기본) / vertical
Figma: indicator 24 원형 / 숫자 t02 Bold(자동 번호) / 연결선 2px / 라벨 t03(horizontal 아래 가운데 / vertical 오른쪽)
  complete bg/brand-solid + check 14 fg/on-brand-solid / 연결선 stroke/brand-solid
  current 1px stroke/brand-solid + 숫자 fg/brand / 라벨 Bold fg/neutral
  upcoming bg/neutral-muted + 숫자 fg/neutral-subtle / 라벨 fg/neutral-subtle / 연결선 stroke/neutral-weak
단계는 3~5개. 라벨은 짧은 명사형(한글 6자 안팎). 단계가 더 많으면 "2 / 6" 처럼 글자로 보여 준다.
```
