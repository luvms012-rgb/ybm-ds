<!-- https://luvms012-rgb.github.io/yds/site/components/code-input.html -->

# Code Input

인증번호처럼 정해진 자리 수를 한 칸에 한 글자씩 넣는 칸입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-codeinput" role="group" aria-label="인증번호 6자리" [data-size="medium"] [aria-invalid="true"]>
  <input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="1번째 숫자"> 칸 수만큼
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | large medium |

그 밖에: `aria-invalid`, ds-code-complete 이벤트

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 한 칸에 한 글자, 넣으면 다음 칸, 지우면 앞 칸, 붙여 넣으면 모든 칸, 다 채우면 ds-code-complete(detail.value)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 칸 수는 보내는 번호의 자리 수와 같게 둡니다. |
| **Do** | 숫자만 받을 때는 `inputmode="numeric"` 과 `autocomplete="one-time-code"` 를 넣어 문자로 온 번호를 바로 채우게 합니다. |
| **Do** | 남은 시간은 Timer 로, 틀렸을 때는 칸 아래 오류 문구로 알립니다. |
| **Don't** | 비밀번호처럼 가려야 하는 값에는 쓰지 않습니다. |

## 예시

### 문자로 받은 인증번호 넣기

칸 아래에 남은 시간과 다시 받기를 둡니다. 번호가 오면 휴대폰이 첫 칸에 알아서 채우고, 칸을 다 채우면 바로 확인합니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header"><span class="ds-field__label" id="ex-otp">인증번호</span></div>
  <div class="ds-codeinput" role="group" aria-labelledby="ex-otp"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="1번째 숫자"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="2번째 숫자"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="3번째 숫자"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="4번째 숫자"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="5번째 숫자"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="6번째 숫자"></div>
  <div class="ds-field__footer u-between"><p class="ds-field__help">남은 시간 <time class="ds-timer">2:48</time></p><a class="ds-link" data-size="small" href="#">다시 받기</a></div>
</div>
```

### 번호가 틀렸을 때

칸 전체를 오류 색으로 바꾸고 칸 아래에 까닭을 한 줄로 적습니다. 다시 넣을 수 있게 칸은 비우지 않습니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header"><span class="ds-field__label" id="ex-otp2">인증번호</span></div>
  <div class="ds-codeinput" role="group" aria-labelledby="ex-otp2" aria-invalid="true"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="1번째 숫자" value="4"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="2번째 숫자" value="1"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="3번째 숫자" value="9"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="4번째 숫자" value="0"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="5번째 숫자" value="2"><input class="ds-codeinput__cell" inputmode="numeric" autocomplete="one-time-code" aria-label="6번째 숫자" value="6"></div>
  <div class="ds-field__footer"><p class="ds-field__error">번호가 맞지 않아요. 다시 확인해 주세요.</p></div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-codeinput-w` | `48px` |
| `--ds-codeinput-h` | `56px` |
| `--ds-codeinput-radius` | `var(--ds-shape-lg)` |
| `--ds-codeinput-line` | `var(--ds-color-stroke-neutral-weak)` |

### 크기와 여백

```
size: large(기본) 칸 48x56, shape/lg, t08 SemiBold / medium 칸 40x48, shape/md, t06 SemiBold / 칸 사이 x2
선: 1px stroke/neutral-weak, 포커스 stroke/neutral-contrast, 틀림 stroke/critical-solid, 비활성 bg/disabled
ybm-ds.js: 한 글자를 넣으면 다음 칸, 지우면 앞 칸, 붙여 넣으면 모든 칸을 채우고 다 채우면 ds-code-complete(detail.value)
```
