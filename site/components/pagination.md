<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/pagination.html -->

# Pagination

여러 페이지로 나뉜 목록에서 페이지를 넘기는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<nav class="ds-pagination" aria-label="페이지">
  <a class="ds-pagination__item" data-type="first" aria-label="첫 페이지" aria-disabled="true"></a>
  <a class="ds-pagination__item" data-type="prev"  aria-label="이전 페이지" aria-disabled="true"></a>
  <a class="ds-pagination__item" href="?p=1" aria-current="page">1</a>
  <a class="ds-pagination__item" href="?p=2">2</a>
  <span class="ds-pagination__item" data-type="ellipsis" aria-hidden="true"></span>
  <a class="ds-pagination__item" href="?p=10">10</a>
  <a class="ds-pagination__item" data-type="next" href="?p=2" aria-label="다음 페이지"></a>
  <a class="ds-pagination__item" data-type="last" href="?p=10" aria-label="마지막 페이지"></a>
</nav>
simple: <nav class="ds-pagination" data-type="simple"> prev · <span class="ds-pagination__indicator"><b>3</b> / 10</span> · next
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `type` | first prev next last ellipsis simple |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 번호는 지금 페이지를 포함해 5개(넓으면 7개)까지 보이고, 나머지는 말줄임표로 줄입니다. 첫 번호와 마지막 번호는 늘 보이게 둡니다. |
| **Do** | 목록 아래 가운데에 둡니다. 페이지를 옮기면 목록 맨 위로 올라갑니다. |
| **Do** | 지금 페이지 번호는 누를 수 없게 두고 aria-current="page"를 붙입니다. |
| **Do** | 첫 페이지의 처음, 이전 버튼과 마지막 페이지의 다음, 마지막 버튼은 숨기지 않고 꺼 둡니다. |
| **Do** | 화살표 버튼에는 aria-label을 꼭 붙입니다. |
| **Don't** | 끝없이 이어지는 피드나 "더 보기"가 어울리는 목록에는 쓰지 않습니다. |

## 예시

```html
<nav class="ds-pagination" aria-label="페이지"><a class="ds-pagination__item" data-type="first" aria-label="첫 페이지" aria-disabled="true"></a><a class="ds-pagination__item" data-type="prev" aria-label="이전 페이지" aria-disabled="true"></a><a class="ds-pagination__item" href="#" aria-current="page">1</a><a class="ds-pagination__item" href="#">2</a><a class="ds-pagination__item" href="#">3</a><span class="ds-pagination__item" data-type="ellipsis" aria-hidden="true"></span><a class="ds-pagination__item" href="#">10</a><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a><a class="ds-pagination__item" data-type="last" href="#" aria-label="마지막 페이지"></a></nav>
<nav class="ds-pagination" data-type="simple" aria-label="페이지"><a class="ds-pagination__item" data-type="prev" href="#" aria-label="이전 페이지"></a><span class="ds-pagination__indicator"><b>3</b> / 10</span><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
type: full(기본) / simple
Figma item: 36(높이/최소 폭) / px x2 / shape/sm / 숫자 t04 Medium fg/neutral-muted / 화살표 20 fg/neutral / ellipsis 16 fg/neutral-subtle
  pressed bg/transparent-pressed / current bg/neutral-solid + fg/on-neutral-solid t04 Bold / disabled 화살표 fg/disabled
  full gap x1 / simple gap x3 / indicator 현재 t04 Bold fg/neutral + "/ 전체" t04 fg/neutral-subtle
```
