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

### 신청서 위에 지금 단계 보여 주기

수강 신청 4단계를 짧은 명사 라벨로 보여 주고 지금 단계를 표시합니다. 단계가 3~5개인 가입, 신청, 결제 흐름의 맨 위에 둡니다.

```html
<div class="u-col u-gap-8" style="width: 100%; max-width: 480px">
  <ol class="ds-stepper" aria-label="수강 신청 단계">
    <li class="ds-stepper__step" data-state="complete"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">강의 선택</span></li>
    <li class="ds-stepper__step" data-state="current" aria-current="step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">수강생 정보</span></li>
    <li class="ds-stepper__step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">결제</span></li>
    <li class="ds-stepper__step"><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">신청 완료</span></li>
  </ol>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="stepper-ex1-name">수강생 이름</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="stepper-ex1-name" placeholder="이름을 입력해 주세요" required>
    </div>
    <div class="ds-field__footer">
      <p class="ds-field__help">수료증에 이 이름이 들어가요.</p>
    </div>
  </div>
  <button type="button" class="ds-btn" data-size="large" data-width="fill">다음</button>
</div>
```

### 처리 과정을 세로로 따라가기

여러 날에 걸친 환불 과정을 세로 Stepper로 보여 줍니다. 끝난 단계와 지금 단계가 보여 사용자가 문의하지 않고도 진행 상황을 알 수 있습니다.
