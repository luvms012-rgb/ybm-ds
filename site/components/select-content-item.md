<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/select-content-item.html -->

# Select Content · Item

Select를 눌렀을 때 펼쳐지는 선택지 목록입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-select-content" role="listbox" [data-size="medium"]>
  <div class="ds-select-content__group" role="group" aria-labelledby="g1">
    <div class="ds-select-content__label" id="g1">최근 검색</div>
    <ul class="ds-select-list">
      <li><button class="ds-select-item" role="option" aria-selected="true">
            <span class="ds-select-item__body"><span class="ds-select-item__label">서울특별시</span>
            [<span class="ds-select-item__desc">보조 설명</span>]</span></button></li>
    </ul>
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Group**`ds-select-content__group` | 관련 항목을 묶는 영역입니다. |
| **Label**`ds-select-content__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Body**`ds-select-item__body` | 본문이 들어가는 영역입니다. |
| **Label**`ds-select-item__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Desc**`ds-select-item__desc` | 제목을 돕는 설명 글입니다. |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 항목 이름은 짧은 명사로 씁니다. 동작이나 덧붙이는 설명은 이름에 넣지 않습니다. |
| **Do** | 선택 칸 폭에서 이름이 잘리지 않는지 확인하세요. |
| **Do** | 선택지는 한 가지 기준(많이 쓰는 순, 크기순, 시간순)으로 정렬합니다. 성격이 다른 선택지는 묶음으로 나누세요. |
| **Do** | 값을 고를 때는 Select, 동작을 실행할 때는 Menu를 씁니다. |
| **Don't** | "전체 선택"처럼 다른 선택지를 바꾸는 항목은 넣지 않습니다. 다만 하나만 고르는 칸에서 "없음"이 답이 될 수 있으면 "없음"을 넣습니다. |

## 예시

```html
<div class="ds-select-content" role="listbox">
  <ul class="ds-select-list">
    <li><button class="ds-select-item" role="option" aria-selected="true"><span class="ds-select-item__body"><span class="ds-select-item__label">서울특별시</span></span></button></li>
    <li><button class="ds-select-item" role="option" aria-selected="false"><span class="ds-select-item__body"><span class="ds-select-item__label">부산광역시</span></span></button></li>
    <li><button class="ds-select-item" role="option" aria-selected="false" disabled><span class="ds-select-item__body"><span class="ds-select-item__label">제주(배송 불가)</span></span></button></li>
  </ul>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-select-item-padding` | `var(--ybm-space-x3) var(--ybm-space-x2)` |
| `--ds-select-item-gap` | `var(--ybm-space-x3)` |
| `--ds-select-item-check` | `20px` |

### 크기와 여백

```
Dialog / Bottom Sheet 안에서는 .ds-select-list 만 단독으로 쓴다.
Figma Content: shape/2xl / bg/layer-floating / elevation overlay(+헤어라인) / 위아래 x2 / 그룹 사이 x2
       group label large px16 py10 t04 Medium / medium py8 t03 Regular / fg/neutral-subtle
       둘째 그룹부터 1px stroke/neutral-muted 구분선(좌우 x4, 아래 x2)
Figma Item(large): 바깥 좌우 x2 / surface py12 px8 gap12 shape/lg / label t05 / desc t03 / check 20 fg/neutral
           (medium): surface py10 gap8 / label t04 / desc t02 / check 16
       highlighted(hover/focus) bg/transparent-pressed / selected = 우측 체크만 / disabled fg/disabled
```
