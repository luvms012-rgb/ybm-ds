<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/accordion.html -->

# Accordion

제목을 누르면 내용이 펼쳐지는 컴포넌트입니다. 긴 정보를 짧게 정리해 보여 줄 때 씁니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<details class="ds-accordion" [data-variant="separated"] [data-size="large"]>
  <summary class="ds-accordion__trigger">
    [<i class="ds-icon ds-icon--… " aria-hidden="true"></i>]
    <span class="ds-accordion__body"><span class="ds-accordion__title">항목</span>[<span class="ds-accordion__desc">설명</span>]</span>
  </summary>
  <div class="ds-accordion__content">내용</div>
</details>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | separated |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 항목을 2개 이상 둡니다. 하나만 따로 쓰지 않습니다. |
| **Do** | 누르는 영역은 화살표 아이콘이 아니라 제목 줄 전체입니다. |
| **Do** | 하나만 열리게 할지 여러 개 열리게 할지 정해서 화면 전체에 똑같이 적용합니다. |
| **Do** | 크기는 모바일에서 medium, PC에서 large를 씁니다. |
| **Don't** | inline(이어진 목록)과 separated(따로 떨어진 카드)를 한 화면에서 섞지 않습니다. |
| **Don't** | 펼친 내용 안에 스크롤을 넣지 않습니다. 내용이 길면 따로 페이지를 만드세요. |

## 예시

```html
<details class="ds-accordion" open><summary class="ds-accordion__trigger"><span class="ds-accordion__body"><span class="ds-accordion__title">배송은 얼마나 걸리나요?</span></span></summary><div class="ds-accordion__content">주문 뒤 2~3일 안에 받을 수 있어요.</div></details>
<details class="ds-accordion"><summary class="ds-accordion__trigger"><span class="ds-accordion__body"><span class="ds-accordion__title">환불은 언제까지 가능한가요?</span><span class="ds-accordion__desc">주문, 환불</span></span></summary><div class="ds-accordion__content">상품을 받은 날부터 7일 안에 할 수 있어요.</div></details>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
variant: inline(기본) / separated   size: medium(기본) / large
Figma medium: trigger 16 사방 / gap x3 / title t05 Medium / desc t03 fg/neutral-subtle / chevron 20 fg/neutral
              content 0/16/16/16 / t04 fg/neutral-subtle
Figma large : trigger py20 / title t06 Medium / desc t04 / chevron 24 / content t05
  inline 하단 1px stroke/neutral-weak / separated 1px 사방 + shape/lg + bg/layer-default
  disabled(aria-disabled) 글자/아이콘 fg/disabled
```
