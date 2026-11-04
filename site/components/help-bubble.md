<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/help-bubble.html -->

# Help Bubble

특정 요소를 가리키며 쓰는 법이나 새 기능을 알려 주는 말풍선입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-helpbubble" role="tooltip" data-placement="bottom-start">
  <div class="ds-helpbubble__body">
    <strong class="ds-helpbubble__title">제목</strong>
    [<p class="ds-helpbubble__desc">부연 설명</p>]
  </div>
  [<button class="ds-helpbubble__close" aria-label="닫기"><i class="ds-icon ds-icon--x"></i></button>]
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Body** `ds-helpbubble__body` | 본문이 들어가는 영역입니다. |
| **Title** `ds-helpbubble__title` | 제목입니다. |
| **Desc** `ds-helpbubble__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Close** `ds-helpbubble__close` | 닫기 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: `--ds-hb-arrow-offset`

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | Tooltip은 마우스를 올리거나 포커스할 때만 보이고, 터치 화면에서는 안 보입니다. |
| **Do** | 닫기 버튼이 필요하거나 설명이 여러 줄이면 Help Bubble을 씁니다. |

## 예시

### 새로 생긴 버튼을 가리키며 알려 주기

새로 생긴 버튼 바로 아래에 두고 꼬리를 그 버튼 쪽으로 향하게 해 무엇을 가리키는지 보여 줍니다. 사용자가 읽고 직접 닫아야 하므로 Tooltip이 아닌 Help Bubble에 닫기 버튼을 둡니다.

```html
<div class="u-full" style="max-width: 420px">
  <div class="u-flex u-gap-2">
    <button class="ds-btn" data-variant="neutralOutline" data-size="small" aria-describedby="help-bubble-ex1"><i class="ds-icon ds-icon--list-filter" aria-hidden="true"></i>필터</button>
    <button class="ds-btn" data-variant="neutralOutline" data-size="small"><i class="ds-icon ds-icon--arrow-up-down" aria-hidden="true"></i>최신순</button>
  </div>
  <div class="ds-helpbubble" id="help-bubble-ex1" role="tooltip" data-placement="bottom-start">
    <div class="ds-helpbubble__body">
      <strong class="ds-helpbubble__title">필터가 새로 생겼어요</strong>
      <p class="ds-helpbubble__desc">가격과 배송 조건으로 상품을 골라 볼 수 있어요.</p>
    </div>
    <button class="ds-helpbubble__close" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
  </div>
</div>
```

### 두 줄 넘는 설명은 Help Bubble로

설명이 두 줄 넘게 이어지면 Tooltip 대신 Help Bubble을 쓰고, 안내 아이콘 옆에 꼬리를 그 아이콘 쪽으로 둡니다. 아이콘 버튼에는 `aria-describedby`로 말풍선을 이어 줍니다.

```html
<div class="u-flex u-center u-gap-1">
  <span class="ds-t04 ds-fg-muted">적립 예정 포인트</span>
  <span class="ds-t04 ds-fw-bold">320P</span>
  <button class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="포인트 적립 안내" aria-describedby="help-bubble-ex2"><i class="ds-icon ds-icon--info" aria-hidden="true"></i></button>
  <div class="ds-helpbubble" id="help-bubble-ex2" role="tooltip" data-placement="right">
    <div class="ds-helpbubble__body">
      <strong class="ds-helpbubble__title">결제 금액의 1%를 모아 드려요</strong>
      <p class="ds-helpbubble__desc">구매를 확정한 다음 날 들어오고, 1년 동안 쓸 수 있어요.</p>
    </div>
  </div>
</div>
```

## 규격

### 크기와 여백

```
placement: top(기본) / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end
Figma: bg/neutral-solid / shape/lg / padding 10/12 / 본문 gap x0_5 / 최대 글 폭 236
       title t03 Bold / desc t03 / fg/on-neutral-solid / 꼬리 12×8(가장자리 정렬 시 x3_5 안쪽) / elevation 2
```
