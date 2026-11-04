<!-- https://luvms012-rgb.github.io/yds/site/components/chat.html -->

# Chat

말풍선과 입력 칸으로 대화 화면을 만드는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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

## 구조

| 부품 | 설명 |
| --- | --- |
| **Status** `ds-chat-meta__status` | "답변 중"처럼 지금 상태를 알리는 글입니다. |
| **Attach** `ds-chat-composer__attach` | 파일을 첨부하는 버튼입니다. |
| **Field** `ds-chat-composer__field` | 글을 쓰는 칸입니다. |
| **Input** `ds-chat-composer__input` | 실제 입력 칸입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `sender` | assistant user |
| `status` | sending sent read error |

그 밖에: 보내기 `send/stop/disabled`

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 상대 말풍선은 왼쪽, 내 말풍선은 오른쪽에 둡니다. |
| **Do** | 입력 칸이 비어 있으면 보내기 버튼을 끕니다. |
| **Do** | 답변을 만드는 동안에는 보내기 버튼을 멈춤(stop) 버튼으로 바꿉니다. |

## 예시

### 말풍선 자리로 누가 한 말인지 나누기

상대 말풍선은 왼쪽, 내 말풍선은 오른쪽에 두고 내 말 아래에 읽음 상태를 붙입니다. 입력 칸이 비어 있는 동안에는 보내기 버튼을 꺼 둡니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 375px">
  <div class="u-col u-gap-3">
    <p class="ds-chat-system">오늘</p>
    <div class="ds-chat-bubble">안녕하세요. 주문 번호를 알려 주시면 배송 상태를 확인해 드릴게요.</div>
    <div class="u-col u-gap-1">
      <div class="ds-chat-bubble" data-sender="user">주문 번호는 2611040123이에요</div>
      <div class="u-flex"><span class="u-grow"></span><span class="ds-chat-meta" data-status="read"><b class="ds-chat-meta__status">읽음</b><time>오후 2:10</time></span></div>
    </div>
    <div class="ds-chat-bubble">확인했어요. 상품은 오늘 저녁 6시 전에 도착할 예정이에요.</div>
  </div>
  <form class="ds-chat-composer" onsubmit="return false">
    <button type="button" class="ds-chat-composer__attach" aria-label="첨부"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
    <div class="ds-chat-composer__field">
      <textarea class="ds-chat-composer__input" rows="1" placeholder="메시지를 입력하세요" aria-label="메시지"></textarea>
      <button type="submit" class="ds-chat-send" aria-label="보내기" disabled></button>
    </div>
  </form>
</div>
```

### 답변을 만드는 동안 멈춤 버튼 보여 주기

답변을 만드는 동안에는 보내기 버튼을 멈춤(`data-state="stop"`) 버튼으로 바꿉니다. 답변이 길어지거나 질문을 잘못 보냈을 때 바로 멈출 수 있습니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 375px">
  <div class="u-col u-gap-3">
    <div class="ds-chat-bubble" data-sender="user">이번 주 수업 일정을 정리해 줘</div>
    <div class="ds-chat-bubble">월요일 저녁 7시에 회화, 수요일 저녁 7시에 문법 수업이 있어요. 금요일에는</div>
  </div>
  <form class="ds-chat-composer" onsubmit="return false">
    <button type="button" class="ds-chat-composer__attach" aria-label="첨부"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
    <div class="ds-chat-composer__field">
      <textarea class="ds-chat-composer__input" rows="1" placeholder="메시지를 입력하세요" aria-label="메시지"></textarea>
      <button type="button" class="ds-chat-send" data-state="stop" aria-label="답변 멈추기"></button>
    </div>
  </form>
</div>
```

### 보내지 못한 메시지 알리기

보내지 못한 말풍선 아래에 `data-status="error"` 상태를 붙여 critical 색 글자로 알립니다. 다시 보내기 버튼을 바로 옆에 두어 고치는 방법까지 보여 줍니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 375px">
  <p class="ds-chat-system" data-variant="divider">오늘</p>
  <div class="ds-chat-bubble">교환할 상품 사진을 보내 주세요.</div>
  <div class="u-col u-gap-1">
    <div class="ds-chat-bubble" data-sender="user">사진 두 장 보낼게요</div>
    <div class="u-flex u-center u-gap-2">
      <span class="u-grow"></span>
      <button class="ds-btn" data-variant="ghost" data-size="xsmall">다시 보내기</button>
      <span class="ds-chat-meta" data-status="error"><b class="ds-chat-meta__status">전송 실패</b><time>오후 3:24</time></span>
    </div>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-chat-bubble-max` | `288px` |
| `--ds-chat-send-bg` | `var(--ds-color-bg-brand-solid)` |
| `--ds-chat-send-fg` | `var(--ds-color-fg-on-brand-solid)` |
| `--ds-chat-send-icon` | `var(--ds-icon-arrow-up)` |

### 크기와 여백

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
