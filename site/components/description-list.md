<!-- https://luvms012-rgb.github.io/yds/site/components/description-list.html -->

# Description List

주문 정보처럼 항목 이름과 값을 짝지어 보여 주는 목록입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<dl class="ds-desclist" [data-layout="top"] [data-columns="2|3"] [data-align="end"] [data-divider]>
  <div class="ds-desclist__item"><dt class="ds-desclist__label">주문 번호</dt><dd class="ds-desclist__value">20261105-0012</dd></div>
</dl>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Item** `ds-desclist__item` | 이름과 값 한 쌍입니다. |
| **Label** `ds-desclist__label` | 항목 이름입니다. |
| **Value** `ds-desclist__value` | 항목 값입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `layout` | start top |
| `columns` | 2 3 |
| `align` | end |

그 밖에: `data-divider`

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 이름은 짧게 쓰고, 값이 길면 `data-layout="top"` 으로 이름을 위에 둡니다. |
| **Do** | 금액처럼 끝을 맞춰 읽는 값은 `data-align="end"` 로 오른쪽에 붙입니다. |
| **Do** | 고칠 수 있는 값은 Text Field 로 만들고, 이 목록은 보여 주기만 합니다. |
| **Don't** | 이름과 값이 짝이 아닌 내용에는 쓰지 않습니다. |

## 예시

### 결제 정보는 금액을 오른쪽 끝에

금액이 있는 목록은 값을 오른쪽 끝에 맞춰 위아래 숫자를 견줘 보기 쉽게 합니다. 마지막 합계만 굵게 씁니다.

```html
<dl class="ds-desclist" data-divider data-align="end" style="width: 100%; max-width: 420px"><div class="ds-desclist__item"><dt class="ds-desclist__label">상품 금액</dt><dd class="ds-desclist__value">52,000원</dd></div><div class="ds-desclist__item"><dt class="ds-desclist__label">할인</dt><dd class="ds-desclist__value">-4,000원</dd></div><div class="ds-desclist__item"><dt class="ds-desclist__label">배송비</dt><dd class="ds-desclist__value">0원</dd></div><div class="ds-desclist__item"><dt class="ds-desclist__label">결제 금액</dt><dd class="ds-desclist__value"><b>48,000원</b></dd></div></dl>
```

### 값이 길면 이름을 위에

주소나 요청 사항처럼 긴 값은 이름을 위에 두고 넓은 화면에서는 두 칸으로 나눕니다. 좁은 화면에서는 한 칸으로 돌아갑니다.

```html
<dl class="ds-desclist" data-layout="top" data-columns="2" style="width: 100%"><div class="ds-desclist__item"><dt class="ds-desclist__label">받는 사람</dt><dd class="ds-desclist__value">와이비엠</dd></div><div class="ds-desclist__item"><dt class="ds-desclist__label">연락처</dt><dd class="ds-desclist__value">010-1234-5678</dd></div><div class="ds-desclist__item"><dt class="ds-desclist__label">배송지</dt><dd class="ds-desclist__value">서울시 종로구 종로 1길 23, 4층</dd></div><div class="ds-desclist__item"><dt class="ds-desclist__label">요청 사항</dt><dd class="ds-desclist__value">문 앞에 두고 가 주세요</dd></div></dl>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-desclist-label-width` | `96px` |

### 크기와 여백

```
layout: start(기본, 이름 왼쪽 + 값 오른쪽) / top(이름 위 + 값 아래, 값이 길 때)
이름 t04 Medium fg/neutral-muted, 폭 --ds-desclist-label-width(기본 96) / 값 t04 fg/neutral
줄 사이 x2 / data-divider 면 줄마다 위아래 x3 + 사이 선 stroke/neutral-muted / 이름과 값 사이 x4 / 여러 칸 사이 x6(폭 480 아래는 한 칸)
data-align="end": 값을 오른쪽 끝에 붙인다(금액, 결제 정보)
```
