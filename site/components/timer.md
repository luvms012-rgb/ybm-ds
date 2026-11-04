<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/timer.html -->

# Timer

지난 시간이나 남은 시간을 숫자로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<time class="ds-timer" data-end="2026-10-29T15:00:00+09:00" [data-format="elapsed"]>0:00</time>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `format` | clock elapsed |
| 켜고 끄는 속성 | `data-start` `data-end` |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- data-start(흐른 시간) / data-end(남은 시간)로 1초마다 글자를 바꾸고, 남은 시간이 0 이면 ds-timer-end 이벤트

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 숫자 폭이 고정돼 있어 값이 바뀌어도 글자가 제자리에 있습니다. |
| **Do** | 크기와 색은 놓이는 자리에 맞춰 바꿉니다. |
| **Do** | 시간이 다 되면 `ds-timer-end` 이벤트를 받아 다음 동작으로 이어 갑니다. |

## 예시

### 인증번호 칸에 남은 시간 보이기

인증번호 입력 칸 끝에 남은 시간을 Timer로 보여 줍니다. 숫자 폭이 고정돼 있어 1초마다 값이 바뀌어도 글자가 흔들리지 않습니다.

```html
<div class="ds-field" style="width: 100%; max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="timer-ex1-code">인증번호</label>
  </div>
  <div class="u-flex u-gap-2">
    <div class="ds-input u-grow" data-variant="outline" data-size="medium">
      <input class="ds-input__control" id="timer-ex1-code" inputmode="numeric" maxlength="6" placeholder="6자리 숫자" autocomplete="one-time-code">
      <span class="ds-input__suffix"><time class="ds-timer ds-t04 ds-fg-critical" id="timer-ex1">3:00</time></span>
    </div>
    <button type="button" class="ds-btn" data-variant="neutralWeak">다시 받기</button>
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">문자로 받은 인증번호를 3분 안에 입력해 주세요.</p>
  </div>
</div>
<script>
  // 미리보기 전용 - 지금부터 3분 남은 시간
  document.getElementById('timer-ex1').setAttribute('data-end', String(Date.now() + 3 * 60000));
</script>
```

### 할인이 끝날 때까지 크게 세기

할인이 끝날 때까지 남은 시간을 굵고 큰 글자로 보여 줍니다. 놓이는 자리에 맞춰 `ds-t09`, `ds-fw-bold` 같은 글자 클래스로 크기와 색을 바꿉니다.
