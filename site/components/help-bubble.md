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
| **Body**`ds-helpbubble__body` | 본문이 들어가는 영역입니다. |
| **Title**`ds-helpbubble__title` | 제목입니다. |
| **Desc**`ds-helpbubble__desc` | 제목을 돕는 설명 글입니다. |
| **Close**`ds-helpbubble__close` | 닫기 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: `--ds-hb-arrow-offset`

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | Tooltip은 마우스를 올리거나 포커스할 때만 보이고, 터치 화면에서는 안 보입니다. |
| **Do** | 닫기 버튼이 필요하거나 설명이 여러 줄이면 Help Bubble을 씁니다. |

## 예시

```html
<div class="ds-helpbubble" role="tooltip"><div class="ds-helpbubble__body"><strong class="ds-helpbubble__title">여기서 배송 상황을 확인해요</strong><p class="ds-helpbubble__desc">상품이 출발하면 바로 볼 수 있어요.</p></div><button class="ds-helpbubble__close" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
<div class="ds-helpbubble" role="tooltip" data-placement="bottom-start"><div class="ds-helpbubble__body"><strong class="ds-helpbubble__title">bottom-start</strong></div></div>
```

## 규격

### 크기와 여백

```
placement: top(기본) / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end
Figma: bg/neutral-solid / shape/lg / padding 10/12 / 본문 gap x0_5 / 최대 글 폭 236
       title t03 Bold / desc t03 / fg/on-neutral-solid / 꼬리 12×8(가장자리 정렬 시 x3_5 안쪽) / elevation 2
```
