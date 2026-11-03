<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/table-pagination.html -->

# Table Pagination

표 아래에서 페이지를 넘기고 한 번에 보일 행 수를 바꾸는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-tablepagination">
  <label class="ds-tablepagination__size">
    <span class="ds-tablepagination__label">페이지당 행 수</span>
    <span class="ds-tablepagination__select"><select><option>10개</option><option>25개</option><option>50개</option></select></span>
  </label>
  <div class="ds-tablepagination__range">
    <span class="ds-tablepagination__position">
      <span class="ds-tablepagination__select"><select aria-label="표시 범위"><option>1-10</option>…</select></span>
      (unknownTotal 은 select 대신 <span class="ds-tablepagination__current">11-20</span>)
      [<span class="ds-tablepagination__total">/ 총 237개</span>]
    </span>
    <nav class="ds-pagination" aria-label="표 페이지">
      <a class="ds-pagination__item" data-type="prev" href="#" aria-label="이전 페이지"></a>
      <a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a>
    </nav>
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Size**`ds-tablepagination__size` | 한 번에 볼 개수를 고르는 영역입니다. |
| **Label**`ds-tablepagination__label` | 개수 고르기 앞 글자입니다. |
| **Select**`ds-tablepagination__select` | 한 번에 볼 개수를 고르는 셀렉트입니다. |
| **Range**`ds-tablepagination__range` | 지금 보고 있는 항목 범위입니다. |
| **Position**`ds-tablepagination__position` | 지금 보고 있는 범위입니다. |
| **Current**`ds-tablepagination__current` | 지금 쪽 번호입니다. |
| **Total**`ds-tablepagination__total` | 전체 개수입니다. |
| **Item**`ds-pagination__item` | 쪽 이동 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `state` | default unknownTotal empty |

그 밖에: 최소 폭 640

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 데이터 표 아래에서만 씁니다. |
| **Do** | 일반 목록에는 Pagination을 씁니다. |
| **Do** | 페이지당 줄 수는 3~4가지 중에서 고르게 합니다. |

## 예시

```html
<div class="ds-tablepagination">
  <label class="ds-tablepagination__size"><span class="ds-tablepagination__label">페이지당 행 수</span><span class="ds-tablepagination__select"><select><option>10개</option><option>25개</option><option>50개</option></select></span></label>
  <div class="ds-tablepagination__range">
    <span class="ds-tablepagination__position"><span class="ds-tablepagination__select"><select aria-label="표시 범위"><option>1-10</option><option selected>11-20</option><option>21-30</option></select></span><span class="ds-tablepagination__total">/ 총 237개</span></span>
    <nav class="ds-pagination" aria-label="표 페이지"><a class="ds-pagination__item" data-type="prev" href="#" aria-label="이전 페이지"></a><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav>
  </div>
</div>
<div class="ds-tablepagination">
  <label class="ds-tablepagination__size"><span class="ds-tablepagination__label">페이지당 행 수</span><span class="ds-tablepagination__select"><select><option>10개</option><option>25개</option></select></span></label>
  <div class="ds-tablepagination__range">
    <span class="ds-tablepagination__position"><span class="ds-tablepagination__current">11-20</span></span>
    <nav class="ds-pagination" aria-label="표 페이지"><a class="ds-pagination__item" data-type="prev" href="#" aria-label="이전 페이지"></a><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav>
  </div>
</div>
<div class="ds-tablepagination">
  <label class="ds-tablepagination__size"><span class="ds-tablepagination__label">페이지당 행 수</span><span class="ds-tablepagination__select"><select><option>10개</option></select></span></label>
  <div class="ds-tablepagination__range">
    <span class="ds-tablepagination__position"><span class="ds-tablepagination__select"><select aria-label="표시 범위" disabled><option>0-0</option></select></span><span class="ds-tablepagination__total">/ 총 0개</span></span>
    <nav class="ds-pagination" aria-label="표 페이지"><a class="ds-pagination__item" data-type="prev" aria-disabled="true" aria-label="이전 페이지"></a><a class="ds-pagination__item" data-type="next" aria-disabled="true" aria-label="다음 페이지"></a></nav>
  </div>
</div>
```

## 규격

### 크기와 여백

```
state: default / unknownTotal(전체 개수를 모를 때) / empty(데이터 없음)
empty: 범위 select 에 disabled, 이동 버튼에 aria-disabled="true"
Figma: 최소 폭 640 / padding x2 x4 / 양 끝 정렬 / 한 줄 고정(좁으면 표와 같은 가로 스크롤 영역에 둔다)
  label, total t04 fg/neutral-subtle / select h36 padding 0 8 0 12 gap x1 shape/sm bg/layer-default 1px stroke/neutral-weak
  값 t04 Medium fg/neutral / chevron 16 / disabled bg/disabled fg/disabled / 이동 버튼은 Pagination Item(prev, next)
일반 목록의 페이지 이동은 Pagination 을 쓴다.
```
