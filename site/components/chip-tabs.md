<!-- https://luvms012-rgb.github.io/yds/site/components/chip-tabs.html -->

# Chip Tabs

칩 모양의 탭으로 목록을 가볍게 걸러 보는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-chiptabs" role="tablist" data-variant="neutralOutline" [data-inset="none"]>
  <button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button>
  <button class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-notification>공지</button>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | neutralSolid neutralOutline |
| `size` | medium large |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 콘텐츠 분류를 바꿀 때 씁니다. |
| **Do** | 선택은 항상 하나만 유지합니다. 여러 개를 고르려면 Chip을 쓰세요. |
| **Don't** | 화면의 주요 메뉴로는 쓰지 않습니다. 주요 메뉴는 Tabs로 만듭니다. Chip Tabs는 한 화면 안에서 걸러 보거나 하위 내용을 바꿀 때 씁니다. |
| **Don't** | 한 줄 안에서 variant와 size를 섞지 않습니다. |
| **Don't** | 항목이 넘쳐도 줄을 바꾸지 않습니다. 넘친 항목은 가로로 밀어서 봅니다. |

## 예시

### Tabs 아래에서 분류 바꾸기

화면의 주요 메뉴는 Tabs로 두고, 그 안에서 분류를 바꿀 때 Chip Tabs를 씁니다. 고른 항목은 늘 하나만 둡니다.

```html
<div style="width: 100%; max-width: 375px">
  <div class="ds-tabs" role="tablist">
    <button class="ds-tabs__trigger" role="tab" aria-selected="true">강의</button>
    <button class="ds-tabs__trigger" role="tab" aria-selected="false">교재</button>
    <button class="ds-tabs__trigger" role="tab" aria-selected="false">이벤트</button>
  </div>
  <div class="ds-chiptabs u-mt-3" role="tablist" aria-label="강의 분류">
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">어학</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">자격증</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">취업</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">교양</button>
  </div>
  <ul class="ds-list u-mt-2">
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">영어 회화 첫걸음</span>
          <span class="ds-list-item__desc">강의 24개, 12시간</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">엑셀 실무 기초</span>
          <span class="ds-list-item__desc">강의 18개, 9시간</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 항목이 많으면 옆으로 밀어 보기

항목이 칸보다 많아도 줄을 바꾸지 않고 가로로 밀어서 봅니다. 새 글이 있는 분류에는 `data-notification`으로 점을 붙입니다.

```html
<div style="width: 100%; max-width: 320px">
  <div class="ds-chiptabs" role="tablist" aria-label="소식 분류">
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">공지</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-notification>이벤트</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">업데이트</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">점검</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">정책 변경</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">채용</button>
  </div>
  <ul class="ds-list u-mt-2">
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">연말 배송 일정 안내</span>
          <span class="ds-list-item__desc">공지, 12월 1일</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">겨울맞이 쿠폰 받기</span>
          <span class="ds-list-item__desc">이벤트, 11월 28일</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 제목 아래 칸 안에 놓기

제목 아래 칸 안에 놓을 때는 `data-inset="none"`으로 좌우 여백을 빼서 제목과 왼쪽 끝을 맞춥니다. 한 줄 안의 항목은 모두 같은 variant와 크기로 맞춥니다.

```html
<section class="u-col u-gap-4" style="width: 100%; max-width: 640px">
  <h3 class="ds-t07 ds-fw-bold">이번 주 인기 강의</h3>
  <div class="ds-chiptabs" role="tablist" aria-label="강의 분류" data-variant="neutralOutline" data-inset="none">
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">어학</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">자격증</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">취업</button>
  </div>
  <div class="u-flex u-gap-3">
    <a class="ds-card u-grow" data-size="small" href="#">
      <header class="ds-card__header">
        <h4 class="ds-card__title">영어 회화 첫걸음</h4>
        <p class="ds-card__desc">강의 24개, 12시간</p>
      </header>
    </a>
    <a class="ds-card u-grow" data-size="small" href="#">
      <header class="ds-card__header">
        <h4 class="ds-card__title">엑셀 실무 기초</h4>
        <p class="ds-card__desc">강의 18개, 9시간</p>
      </header>
    </a>
  </div>
</section>
```

## 규격

### 크기와 여백

```
variant: neutralSolid(기본) / neutralOutline   size: medium(기본 36) / large 40
inset: 기본 좌우 x4(화면 끝까지 넘기는 목록) / data-inset="none" 좌우 여백 없음(제목 아래 콘텐츠 칸 안에 놓을 때, 2026-11-03)
Figma list: 좌우 x4 / gap x2 / trigger: shape/pill / medium h36 px14 min-w48 / large h40 px16 min-w52 / t04 Medium
  neutralSolid bg/neutral-weak-alpha / neutralOutline 투명 + stroke/neutral-muted
  selected bg/neutral-solid + fg/on-neutral-solid / disabled opacity .5 / notification 점 6 bg/brand-solid
```
