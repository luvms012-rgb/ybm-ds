<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/pagination.html -->

# Pagination

여러 페이지로 나뉜 목록에서 페이지를 넘기는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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

## 구조

| 부품 | 설명 |
| --- | --- |
| **Item** `ds-pagination__item` | 페이지 번호 버튼입니다. |
| **Indicator** `ds-pagination__indicator` | 지금 페이지를 알려 주는 표시입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `type` | first prev next last ellipsis simple |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 번호는 지금 페이지를 포함해 5개(넓으면 7개)까지 보여 줍니다. 나머지는 말줄임표로 줄입니다. 첫 번호와 마지막 번호는 늘 보이게 둡니다. |
| **Do** | 목록 아래 가운데에 둡니다. 페이지를 옮기면 목록 맨 위로 올라갑니다. |
| **Do** | 지금 페이지 번호는 누를 수 없게 두고 aria-current="page"를 붙입니다. |
| **Do** | 첫 페이지에서는 처음, 이전 버튼을 숨기지 않고 꺼 둡니다. 마지막 페이지의 다음, 마지막 버튼도 같습니다. |
| **Do** | 화살표 버튼에는 aria-label을 꼭 붙입니다. |
| **Don't** | 끝없이 이어지는 피드나 "더 보기"가 어울리는 목록에는 쓰지 않습니다. |

## 예시

### 목록 아래 가운데에 두고 첫 페이지에서 이전 끄기

목록 아래 가운데에 두고, 첫 페이지에서는 이전 버튼을 숨기지 않고 꺼 둡니다. 좁은 화면에서는 번호를 5개 자리 안에서 보여 주고 마지막 번호를 늘 남겨 전체 길이를 알 수 있게 합니다.

```html
<div class="u-col u-gap-4 u-full" style="max-width: 375px">
  <ul class="ds-list" data-divider>
    <li><a class="ds-list-item" href="#" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">연말 배송 일정 안내</span><span class="ds-list-item__desc">2026.11.03</span></span></a></li>
    <li><a class="ds-list-item" href="#" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">개인정보 처리방침 변경 안내</span><span class="ds-list-item__desc">2026.10.28</span></span></a></li>
    <li><a class="ds-list-item" href="#" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">11월 8일 새벽 서비스 점검</span><span class="ds-list-item__desc">2026.10.24</span></span></a></li>
    <li><a class="ds-list-item" href="#" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">고객센터 운영 시간 변경</span><span class="ds-list-item__desc">2026.10.02</span></span></a></li>
  </ul>
  <nav class="ds-pagination" aria-label="공지 목록 페이지">
    <a class="ds-pagination__item" data-type="prev" aria-label="이전 페이지" aria-disabled="true"></a>
    <a class="ds-pagination__item" href="?p=1" aria-current="page">1</a>
    <a class="ds-pagination__item" href="?p=2">2</a>
    <a class="ds-pagination__item" href="?p=3">3</a>
    <span class="ds-pagination__item" data-type="ellipsis" aria-hidden="true"></span>
    <a class="ds-pagination__item" href="?p=12">12</a>
    <a class="ds-pagination__item" data-type="next" href="?p=2" aria-label="다음 페이지"></a>
  </nav>
</div>
```

### 넓은 화면에서는 지금 페이지 양옆까지

넓은 화면에서는 번호를 7개 자리까지 쓰고 지금 페이지 양옆 번호와 첫 번호, 마지막 번호를 남깁니다. 지금 페이지에는 `aria-current="page"`를 붙여 누를 수 없게 둡니다.

```html
<div class="u-col u-gap-6 u-full" style="max-width: 640px">
  <ul class="ds-list" data-variant="inset" data-divider>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">비즈니스 영어 메일 쓰기</span><span class="ds-list-item__desc">강의 18개, 9시간</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">발표가 쉬워지는 영어 표현</span><span class="ds-list-item__desc">강의 14개, 7시간</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">회의에서 바로 쓰는 영어</span><span class="ds-list-item__desc">강의 20개, 10시간</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
  </ul>
  <nav class="ds-pagination" aria-label="강의 목록 페이지">
    <a class="ds-pagination__item" data-type="first" href="?p=1" aria-label="첫 페이지"></a>
    <a class="ds-pagination__item" data-type="prev" href="?p=5" aria-label="이전 페이지"></a>
    <a class="ds-pagination__item" href="?p=1">1</a>
    <span class="ds-pagination__item" data-type="ellipsis" aria-hidden="true"></span>
    <a class="ds-pagination__item" href="?p=5">5</a>
    <a class="ds-pagination__item" href="?p=6" aria-current="page">6</a>
    <a class="ds-pagination__item" href="?p=7">7</a>
    <span class="ds-pagination__item" data-type="ellipsis" aria-hidden="true"></span>
    <a class="ds-pagination__item" href="?p=12">12</a>
    <a class="ds-pagination__item" data-type="next" href="?p=7" aria-label="다음 페이지"></a>
    <a class="ds-pagination__item" data-type="last" href="?p=12" aria-label="마지막 페이지"></a>
  </nav>
</div>
```

### 좁은 카드 안에서는 simple 쓰기

카드처럼 좁은 자리에서는 `data-type="simple"`로 지금 페이지와 전체 페이지 수만 보여 줍니다. 번호를 늘어놓을 자리가 없을 때 이전, 다음 버튼만으로 넘깁니다.

```html
<article class="ds-card u-full" data-size="small" style="max-width: 360px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">수강 후기</h3>
    <p class="ds-card__desc">후기 24개</p>
  </header>
  <div class="ds-card__content">
    <ul class="u-col u-gap-3">
      <li class="u-col u-gap-1"><p>설명이 쉬워서 끝까지 들었어요.</p><span class="ds-tag-group"><span>김하나</span><span>2026.11.02</span></span></li>
      <li class="u-col u-gap-1"><p>예문이 많아서 바로 써먹을 수 있어요.</p><span class="ds-tag-group"><span>이준</span><span>2026.10.30</span></span></li>
      <li class="u-col u-gap-1"><p>복습 퀴즈가 있어서 좋았어요.</p><span class="ds-tag-group"><span>박서진</span><span>2026.10.27</span></span></li>
    </ul>
  </div>
  <footer class="ds-card__footer">
    <nav class="ds-pagination u-grow" data-type="simple" aria-label="후기 페이지">
      <a class="ds-pagination__item" data-type="prev" href="?p=1" aria-label="이전 페이지"></a>
      <span class="ds-pagination__indicator"><b>2</b> / 8</span>
      <a class="ds-pagination__item" data-type="next" href="?p=3" aria-label="다음 페이지"></a>
    </nav>
  </footer>
</article>
```

## 규격

### 크기와 여백

```
type: full(기본) / simple
Figma item: 36(높이/최소 폭) / px x2 / shape/sm / 숫자 t04 Medium fg/neutral-muted / 화살표 20 fg/neutral / ellipsis 16 fg/neutral-subtle
  pressed bg/transparent-pressed / current bg/neutral-solid + fg/on-neutral-solid t04 Bold / disabled 화살표 fg/disabled
  full gap x1 / simple gap x3 / indicator 현재 t04 Bold fg/neutral + "/ 전체" t04 fg/neutral-subtle
```
