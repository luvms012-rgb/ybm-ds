<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/search-suggestion.html -->

# Search Suggestion

검색어를 입력하는 동안 추천 검색어를 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-search-anchor">
  <div class="ds-input" data-variant="outline" data-size="medium">
    <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
    <input class="ds-input__control" type="search" role="combobox" aria-controls="sg" aria-expanded="true" aria-autocomplete="list" placeholder="검색어를 입력하세요">
    <button type="button" class="ds-input__clear" aria-label="지우기"></button>
  </div>
  <div class="ds-search-suggest" id="sg">
    [<div class="ds-search-suggest__heading" id="sg-h">최근 검색어</div>]
    <ul class="ds-search-suggest__list" role="listbox" aria-labelledby="sg-h">
      <li role="none"><a class="ds-search-suggest__item" role="option" id="sg-1" href="#">
        <i class="ds-icon ds-icon--clock" aria-hidden="true"></i>
        <span class="ds-search-suggest__content"><span class="ds-search-suggest__label">회의록</span>[<span class="ds-search-suggest__desc">보조 설명</span>]</span>
      </a></li>
    </ul>
    [<p class="ds-search-suggest__empty">검색 결과가 없어요</p>]
  </div>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `content` | suggestion recent empty |
| `Item state` | enabled highlighted |
| 켜고 끄는 속성 | `description` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 검색 칸은 Text Field outline에 search 아이콘과 지우기 버튼을 붙여 만들고, `type="search"`와 `role="combobox"`를 붙입니다. |
| **Do** | 입력 전에는 최근 검색어, 입력 중에는 추천어, 결과가 없으면 안내 문구를 보여 줍니다. |

## 예시

```html
<div class="ds-search-anchor" style="width:320px">
  <div class="ds-input" data-variant="outline" data-size="medium">
    <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
    <input class="ds-input__control" id="pv-sg-input" type="search" role="combobox" aria-controls="pv-sg" aria-expanded="true" aria-autocomplete="list" placeholder="검색어를 입력하세요" value="디자인">
    <button type="button" class="ds-input__clear" aria-label="지우기"></button>
  </div>
  <div class="ds-search-suggest" id="pv-sg">
    <ul class="ds-search-suggest__list" role="listbox" aria-label="추천어">
      <li role="none"><a class="ds-search-suggest__item" role="option" id="pv-sg-1" href="#"><i class="ds-icon ds-icon--search" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">디자인 시스템</span></span></a></li>
      <li role="none"><a class="ds-search-suggest__item" role="option" id="pv-sg-2" href="#"><i class="ds-icon ds-icon--search" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">디자인 가이드</span><span class="ds-search-suggest__desc">문서 12개</span></span></a></li>
      <li role="none"><a class="ds-search-suggest__item" role="option" id="pv-sg-3" href="#"><i class="ds-icon ds-icon--search" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">디자인 토큰</span></span></a></li>
    </ul>
  </div>
</div>
<div class="ds-search-suggest" style="width:320px">
  <div class="ds-search-suggest__heading" id="pv-sg-h">최근 검색어</div>
  <ul class="ds-search-suggest__list" role="listbox" aria-labelledby="pv-sg-h">
    <li role="none"><a class="ds-search-suggest__item" role="option" href="#"><i class="ds-icon ds-icon--clock" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">회의록</span></span></a></li>
    <li role="none"><a class="ds-search-suggest__item" role="option" href="#"><i class="ds-icon ds-icon--clock" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">주간 보고</span></span></a></li>
  </ul>
</div>
<div class="ds-search-suggest" style="width:320px"><p class="ds-search-suggest__empty">검색 결과가 없어요</p></div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
검색 입력 칸은 Text Field(04) outline 에 search 아이콘과 지우기 버튼을 붙여 쓴다.
입력 전 최근 검색어(머리말 + clock), 입력 중 추천어(search), 찾은 것이 없으면 empty 문구.
열고 닫기와 목록 채우기는 서비스가 한다. ybm-ds.js 는 입력 칸의 위아래 화살표로 줄 고르기와 Enter 만 맡는다.
Figma: padding x1 / shape/lg / bg/layer-floating / elevation overlay / 최대 높이 300 / 입력 칸과 같은 폭
  머리말 padding x2 x2 x1, t02 fg/neutral-muted / empty padding x3, t02 fg/neutral-muted, 가운데
  Search Suggestion Item padding x2, gap x2, shape/sm, 아이콘 16 fg/neutral-subtle, 글자 t04 fg/neutral, 설명 t02 fg/neutral-muted
  highlighted bg/transparent-pressed
```
