<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/empty.html -->

# Empty

보여 줄 내용이 없을 때 그 이유와 다음에 할 일을 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-empty" [data-size="small"]>
  <span class="ds-empty__media"><i class="ds-icon ds-icon--inbox" aria-hidden="true"></i></span>
  <p class="ds-empty__title">아직 내역이 없어요</p>
  [<p class="ds-empty__desc">조건을 바꾸거나 새로 추가해 보세요.</p>]
  [<div class="ds-empty__actions"><button class="ds-btn" data-variant="neutralWeak">새로 추가하기</button></div>]
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Media**`ds-empty__media` | 상황을 보여 주는 아이콘이나 그림입니다. |
| **Title**`ds-empty__title` | 제목입니다. |
| **Desc**`ds-empty__desc` | 제목을 돕는 설명 글입니다. |
| **Actions**`ds-empty__actions` | 버튼을 묶는 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 제목에는 지금 상황을, 설명에는 다음에 할 일을 적습니다. 오류는 Empty 대신 Callout(critical)이나 Result Section으로 알립니다. |
| **Do** | 버튼은 없거나 하나가 기본이고, 많아도 두 개까지 둡니다. |
| **Do** | 아이콘은 상황에 맞게 바꿉니다. |
| **Do** | 카드나 목록 안의 좁은 자리에는 small을 씁니다. |

## 예시

```html
<div class="ds-empty"><span class="ds-empty__media"><i class="ds-icon ds-icon--inbox" aria-hidden="true"></i></span><p class="ds-empty__title">아직 주문 내역이 없어요</p><p class="ds-empty__desc">마음에 드는 상품을 찾아보세요.</p><div class="ds-empty__actions"><button class="ds-btn" data-variant="neutralWeak">둘러보기</button></div></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-empty-media` | `56px` |
| `--ds-empty-icon` | `28px` |

### 크기와 여백

```
size: medium(기본) / small
Figma medium: padding 40/16 / gap x4 / media 56(아이콘 28) / title t06 Bold / desc t04 / actions 위 x2 / 버튼 medium
      small : padding 24/16 / gap x3 / media 40(아이콘 20) / title t05 Bold / desc t03 / actions 위 x1 / 버튼 small
  media bg/neutral-muted + 아이콘 fg/neutral-subtle / title fg/neutral / desc fg/neutral-subtle / 가운데 정렬
```
