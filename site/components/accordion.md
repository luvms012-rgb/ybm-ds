<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/accordion.html -->

# Accordion

제목을 누르면 내용이 펼쳐지는 컴포넌트입니다. 긴 정보를 짧게 정리해 보여 줄 때 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<details class="ds-accordion" [data-variant="separated"] [data-size="large"]>
  <summary class="ds-accordion__trigger">
    [<i class="ds-icon ds-icon--… " aria-hidden="true"></i>]
    <span class="ds-accordion__body"><span class="ds-accordion__title">항목</span>[<span class="ds-accordion__desc">설명</span>]</span>
  </summary>
  <div class="ds-accordion__content">내용</div>
</details>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Trigger** `ds-accordion__trigger` | 누르면 열리거나 바뀌는 버튼입니다. |
| **Body** `ds-accordion__body` | 본문이 들어가는 영역입니다. |
| **Title** `ds-accordion__title` | 제목입니다. |
| **Desc** `ds-accordion__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Content** `ds-accordion__content` | 주된 내용이 들어가는 영역입니다. |

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
| **Do** | 한 번에 하나만 열지, 여러 개를 열지 먼저 정합니다. 정한 방식은 화면 전체에 똑같이 씁니다. |
| **Do** | 크기는 모바일에서 medium, PC에서 large를 씁니다. |
| **Don't** | inline(이어진 목록)과 separated(따로 떨어진 카드)를 한 화면에서 섞지 않습니다. |
| **Don't** | 펼친 내용 안에 스크롤을 넣지 않습니다. 내용이 길면 따로 페이지를 만드세요. |

## 예시

### 자주 묻는 질문을 하나씩 펼치기

같은 `name`을 붙여 한 번에 하나만 열리게 하고, 제목 줄 어디를 눌러도 펼쳐지게 합니다. 고객센터처럼 질문이 여러 개인 화면에서 답을 하나씩 읽게 할 때 씁니다.

```html
<div style="width: 100%; max-width: 420px">
  <details class="ds-accordion" name="accordion-ex1" open>
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body"><span class="ds-accordion__title">주문을 취소하고 싶어요</span></span>
    </summary>
    <div class="ds-accordion__content">결제하고 1시간 안에는 주문 내역에서 바로 취소할 수 있어요. 그 뒤에는 고객센터로 문의해 주세요.</div>
  </details>
  <details class="ds-accordion" name="accordion-ex1">
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body"><span class="ds-accordion__title">배송지를 바꿀 수 있나요?</span></span>
    </summary>
    <div class="ds-accordion__content">상품이 출발하기 전까지 주문 상세에서 바꿀 수 있어요.</div>
  </details>
  <details class="ds-accordion" name="accordion-ex1">
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body"><span class="ds-accordion__title">영수증은 어디서 받나요?</span></span>
    </summary>
    <div class="ds-accordion__content">주문 상세 아래 영수증 보기를 누르면 내려받을 수 있어요.</div>
  </details>
</div>
```

### PC 화면에서는 크게 나눠 보여 주기

PC 화면에서는 large 크기로 제목과 설명을 크게 보여 줍니다. 한 화면의 Accordion은 모두 separated로 맞추고 inline과 섞지 않습니다.

```html
<div class="ds-accordion-group" data-variant="separated" style="width: 100%; max-width: 640px">
  <details class="ds-accordion" data-variant="separated" data-size="large" open>
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body">
        <span class="ds-accordion__title">1주차 기초 다지기</span>
        <span class="ds-accordion__desc">강의 4개, 52분</span>
      </span>
    </summary>
    <div class="ds-accordion__content">자주 쓰는 문장 구조와 시제를 짧은 예문으로 익혀요.</div>
  </details>
  <details class="ds-accordion" data-variant="separated" data-size="large">
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body">
        <span class="ds-accordion__title">2주차 상황별 표현 익히기</span>
        <span class="ds-accordion__desc">강의 6개, 1시간 20분</span>
      </span>
    </summary>
    <div class="ds-accordion__content">주문, 길 찾기, 예약처럼 자주 만나는 상황의 대화를 듣고 따라 말해요.</div>
  </details>
  <details class="ds-accordion" data-variant="separated" data-size="large">
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body">
        <span class="ds-accordion__title">3주차 실력 점검</span>
        <span class="ds-accordion__desc">강의 2개, 40분</span>
      </span>
    </summary>
    <div class="ds-accordion__content">앞에서 배운 내용을 문제로 풀며 다시 확인해요.</div>
  </details>
</div>
```

### 긴 글은 펼치지 말고 따로 보여 주기

펼친 내용에는 요약 몇 줄만 두고, 전문은 Text Link로 다른 화면에서 보여 줍니다. 펼친 칸 안에 스크롤이 생기면 어디까지 읽었는지 놓치기 쉽습니다.

```html
<div style="width: 100%; max-width: 420px">
  <details class="ds-accordion" open>
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body">
        <span class="ds-accordion__title">개인 정보 수집과 이용 (필수)</span>
      </span>
    </summary>
    <div class="ds-accordion__content">
      <p>주문과 배송을 위해 이름, 연락처, 주소를 모아요. 모은 정보는 주문이 끝나고 5년 동안 보관해요.</p>
      <p class="u-mt-2"><a class="ds-link" data-size="small" href="#">전문 보기</a></p>
    </div>
  </details>
  <details class="ds-accordion">
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body">
        <span class="ds-accordion__title">개인 정보 제3자 제공 (필수)</span>
      </span>
    </summary>
    <div class="ds-accordion__content">
      <p>상품을 보내기 위해 택배 회사에 이름, 연락처, 주소를 전해요.</p>
      <p class="u-mt-2"><a class="ds-link" data-size="small" href="#">전문 보기</a></p>
    </div>
  </details>
  <details class="ds-accordion">
    <summary class="ds-accordion__trigger">
      <span class="ds-accordion__body">
        <span class="ds-accordion__title">할인과 이벤트 소식 받기 (선택)</span>
      </span>
    </summary>
    <div class="ds-accordion__content">
      <p>할인 쿠폰과 이벤트 소식을 문자와 이메일로 보내요. 언제든 설정에서 끌 수 있어요.</p>
    </div>
  </details>
</div>
```

## 규격

### 크기와 여백

```
variant: inline(기본) / separated   size: medium(기본) / large
Figma medium: trigger 16 사방 / gap x3 / title t05 Medium / desc t03 fg/neutral-subtle / chevron 20 fg/neutral
              content 0/16/16/16 / t04 fg/neutral-subtle
Figma large : trigger py20 / title t06 Medium / desc t04 / chevron 24 / content t05
  inline 하단 1px stroke/neutral-weak / separated 1px 사방 + shape/lg + bg/layer-default
  disabled(aria-disabled) 글자/아이콘 fg/disabled
```
