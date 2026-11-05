<!-- https://luvms012-rgb.github.io/yds/site/components/timer.html -->

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

```html
<article class="ds-card" style="width: 100%; max-width: 360px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">오늘만 30% 할인</h3>
    <p class="ds-card__desc">자정이 지나면 원래 가격으로 돌아가요.</p>
  </header>
  <div class="ds-card__content u-flex u-center u-between">
    <span class="ds-fg-muted">남은 시간</span>
    <time class="ds-timer ds-t09 ds-fw-bold ds-fg-neutral" id="timer-ex2">0:00:00</time>
  </div>
  <footer class="ds-card__footer">
    <button type="button" class="ds-btn">할인가로 신청하기</button>
  </footer>
</article>
<script>
  // 미리보기 전용 - 오늘 자정까지 남은 시간
  document.getElementById('timer-ex2').setAttribute('data-end', String(new Date().setHours(24, 0, 0, 0)));
</script>
```

### 공부한 시간을 글로 보이기

흐른 시간은 `data-start`에 시작 시각을 넣고 `data-format="elapsed"`로 분과 초를 글로 보여 줍니다. 공부한 시간처럼 길이 자체를 읽어야 할 때 씁니다.

```html
<article class="ds-card" data-size="small" style="width: 100%; max-width: 360px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">5강 회의에서 의견 말하기</h3>
    <p class="ds-card__desc">비즈니스 영어 회화</p>
  </header>
  <div class="ds-card__content u-flex u-center u-between">
    <span class="ds-fg-muted">오늘 공부한 시간</span>
    <time class="ds-timer ds-t04 ds-fw-semibold ds-fg-neutral" id="timer-ex3" data-format="elapsed">12분 00초</time>
  </div>
</article>
<script>
  // 미리보기 전용 - 12분 전에 시작
  document.getElementById('timer-ex3').setAttribute('data-start', String(Date.now() - 12 * 60000));
</script>
```

## 규격

### 크기와 여백

```
format: 기본 clock(12:34, 1시간 넘으면 1:02:34) / data-format="elapsed"(12분 34초)
흐른 시간: data-start="시작 시각" / 남은 시간: data-end="끝 시각" (ISO 문자열 또는 밀리초)
ybm-ds.js 가 1초마다 글자와 datetime 을 바꾸고, 남은 시간이 0 이 되면 ds-timer-end 이벤트를 한 번 보낸다.
Figma: t02 fg/neutral-muted, 숫자 폭 고정 / 크기와 색은 놓이는 자리에 맞춰 바꿔 쓴다
```
