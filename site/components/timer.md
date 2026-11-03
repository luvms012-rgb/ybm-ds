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

```html
<span>남은 시간 <time class="ds-timer" id="pv-timer-end" style="font-size:var(--ds-font-size-t07);line-height:var(--ds-line-height-t07);font-weight:var(--ds-font-weight-bold);color:var(--ds-color-fg-neutral)">0:00</time></span>
<span>흐른 시간 <time class="ds-timer" id="pv-timer-start" data-format="elapsed">0초</time></span>
```

## 규격

### 크기와 여백

```
format: 기본 clock(12:34, 1시간 넘으면 1:02:34) / data-format="elapsed"(12분 34초)
흐른 시간: data-start="시작 시각" / 남은 시간: data-end="끝 시각" (ISO 문자열 또는 밀리초)
ybm-ds.js 가 1초마다 글자와 datetime 을 바꾸고, 남은 시간이 0 이 되면 ds-timer-end 이벤트를 한 번 보낸다.
Figma: t02 fg/neutral-muted, 숫자 폭 고정 / 크기와 색은 놓이는 자리에 맞춰 바꿔 쓴다
```
