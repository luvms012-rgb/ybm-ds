<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/chat.html -->

# Chat

말풍선과 입력 칸으로 대화 화면을 만드는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-chat-bubble" [data-sender="user"]>안녕하세요! 무엇을 도와드릴까요?</div>
<span class="ds-chat-meta" data-status="read"><b class="ds-chat-meta__status">읽음</b><time>오후 3:24</time></span>
<p class="ds-chat-system" [data-variant="divider"]>오늘</p>
<button type="button" class="ds-chat-send" aria-label="보내기" [data-state="stop"] [disabled]></button>
<form class="ds-chat-composer">
  <button type="button" class="ds-chat-composer__attach" aria-label="첨부"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
  <div class="ds-chat-composer__field">
    <textarea class="ds-chat-composer__input" rows="1" placeholder="메시지를 입력하세요" aria-label="메시지"></textarea>
    <button type="submit" class="ds-chat-send" aria-label="보내기" disabled></button>
  </div>
</form>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `sender` | assistant user |
| `status` | sending sent read error |

그 밖에: 보내기 `send/stop/disabled`

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-chat-bubble-max` | `288px` |
| `--ds-chat-send-bg` | `var(--ybm-color-bg-brand-solid)` |
| `--ds-chat-send-fg` | `var(--ybm-color-fg-on-brand-solid)` |
| `--ds-chat-send-icon` | `var(--ds-icon-arrow-up)` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 상대 말풍선은 왼쪽, 내 말풍선은 오른쪽에 둡니다. |
| **Do** | 입력 칸이 비어 있으면 보내기 버튼을 끄고, 답변을 만드는 중에는 멈춤(stop) 버튼으로 바꿉니다. |

## 예시

```html
<div style="display:flex;gap:var(--ybm-space-x3);padding:var(--ybm-space-x5) var(--ybm-space-x4)">
  <p class="ds-chat-system">오늘</p>
  <div class="ds-chat-bubble">안녕하세요! 무엇을 도와드릴까요?</div>
  <div style="display:flex;align-items:flex-end;justify-content:flex-end;gap:var(--ybm-space-x1_5)"><span class="ds-chat-meta" data-status="read"><b class="ds-chat-meta__status">읽음</b><time>오후 3:24</time></span><div class="ds-chat-bubble" data-sender="user" style="margin-left:0">이번 주 일정 정리해 줘</div></div>
  <p class="ds-chat-system" data-variant="divider">대화가 종료되었어요</p>
  <div style="display:flex;gap:var(--ybm-space-x4)"><span class="ds-chat-meta" data-status="sending"><b class="ds-chat-meta__status">전송 중</b><time>오후 3:24</time></span><span class="ds-chat-meta" data-status="sent"><time>오후 3:24</time></span><span class="ds-chat-meta" data-status="error"><b class="ds-chat-meta__status">전송 실패</b><time>오후 3:24</time></span></div>
  <div style="display:flex;gap:var(--ybm-space-x3)"><button type="button" class="ds-chat-send" aria-label="보내기"></button><button type="button" class="ds-chat-send" data-state="stop" aria-label="답변 멈추기"></button><button type="button" class="ds-chat-send" aria-label="보내기" disabled></button></div>
</div>
<form class="ds-chat-composer" onsubmit="return false">
  <button type="button" class="ds-chat-composer__attach" aria-label="첨부"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
  <div class="ds-chat-composer__field"><textarea class="ds-chat-composer__input" rows="1" placeholder="메시지를 입력하세요" aria-label="메시지"></textarea><button type="submit" class="ds-chat-send" aria-label="보내기" disabled></button></div>
</form>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
▸ Message Bubble  sender: assistant(기본) / user
  Figma: padding x2_5 x3_5 / t05 / 최대 폭 288(글 260) / 모서리 shape/xl, 말꼬리 쪽만 shape/2xs
         assistant bg/neutral-weak-alpha fg/neutral (왼쪽 위 꼬리) / user bg/brand-solid fg/on-brand-solid (오른쪽 아래 꼬리)
▸ Message Metadata  status: sending / sent / read / error
  Figma: gap x1 / t02 fg/neutral-subtle / 상태 Medium, read fg/brand, error fg/critical
▸ System Message  variant: default / divider
  Figma: t03 fg/neutral-muted / default pill padding x1 x3 bg/neutral-weak-alpha / divider 양옆 1px stroke/neutral-weak, gap x3
▸ Send Button  state: send / stop / disabled
  Figma: 36 원 / 아이콘 20 / send bg/brand-solid + arrow-up fg/on-brand-solid
         stop bg/neutral-solid + square fg/on-neutral-solid / disabled bg/disabled + fg/disabled
▸ Composer  state: empty / typing (비어 있으면 보내기 비활성 - ybm-ds.js 가 맞춰 준다)
  Figma: 위 1px stroke/neutral-muted / padding x2 x3 / gap x2 / bg/layer-default
         첨부 36 + plus 22 fg/neutral-muted / 입력 칸 min-h x11 padding 0 x1 0 x4 gap x2 shape/3xl bg/neutral-weak-alpha
         글 t05 fg/neutral, placeholder fg/placeholder / 화면 아래 고정, 여러 줄은 5줄까지 늘어난다
```
