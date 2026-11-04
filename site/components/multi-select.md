<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/multi-select.html -->

# Multi Select

목록에서 값을 여러 개 고르면 칸 안에 모아 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-multiselect">
  <button type="button" class="ds-multiselect__trigger" data-ds-popover="ms" aria-haspopup="listbox" aria-expanded="false">
    <span class="ds-multiselect__values" data-placeholder="선택하세요" [data-max="2"]></span>
    <i class="ds-icon ds-icon--chevron-down ds-icon--sm" aria-hidden="true"></i>
  </button>
  <div class="ds-multiselect__panel" id="ms" role="listbox" aria-multiselectable="true" hidden>
    [<div class="ds-multiselect__heading">관심 분야</div>]
    <label class="ds-multiselect__option"><span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"></span><span class="ds-multiselect__label">디자인</span></label>
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Trigger**`ds-multiselect__trigger` | 누르면 열리거나 바뀌는 버튼입니다. |
| **Values**`ds-multiselect__values` | 고른 값이 배지로 들어가는 영역입니다. |
| **Panel**`ds-multiselect__panel` | 펼쳐지는 선택 목록입니다. |
| **Heading**`ds-multiselect__heading` | 목록 위에 붙는 소제목입니다. |
| **Option**`ds-multiselect__option` | 고를 수 있는 선택지 하나입니다. |
| **Control**`ds-checkbox__control` | 실제로 값을 입력하거나 고르는 부분입니다. |
| **Label**`ds-multiselect__label` | 이름이나 값을 보여 주는 글자입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `Trigger content` | placeholder selected |
| `state` | enabled open disabled |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- Popover 와 같이 열고 닫기, 고른 값을 칸에 Badge 로 채우기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 여러 개를 고를 때만 Multi Select를 씁니다. |
| **Do** | 고른 값이 많으면 2개까지 보여 주고 나머지는 +N으로 줄입니다. |

## 예시

```html
<div class="ds-multiselect" style="width:320px">
  <button type="button" class="ds-multiselect__trigger" data-ds-popover="pv-msel" aria-haspopup="listbox" aria-expanded="false">
    <span class="ds-multiselect__values" data-placeholder="선택하세요"></span>
    <i class="ds-icon ds-icon--chevron-down ds-icon--sm" aria-hidden="true"></i>
  </button>
  <div class="ds-multiselect__panel" id="pv-msel" role="listbox" aria-multiselectable="true" hidden>
    <div class="ds-multiselect__heading">관심 분야</div>
    <label class="ds-multiselect__option"><span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked></span><span class="ds-multiselect__label">디자인</span></label>
    <label class="ds-multiselect__option"><span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked></span><span class="ds-multiselect__label">개발</span></label>
    <label class="ds-multiselect__option"><span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"></span><span class="ds-multiselect__label">기획</span></label>
    <label class="ds-multiselect__option"><span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked></span><span class="ds-multiselect__label">마케팅</span></label>
    <label class="ds-multiselect__option"><span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" disabled></span><span class="ds-multiselect__label">영업</span></label>
  </div>
</div>
```

## 규격

### 크기와 여백

```
Popover 와 같이 data-ds-popover="id" 로 열고, 바깥 누르기와 Esc 로 닫는다.
ybm-ds.js 가 고른 값을 Badge 로 칸에 채우고, data-max(기본 2) 를 넘으면 +N 으로 줄인다.
Figma: Trigger 높이 40, padding x2 x3_5, gap x2, shape/sm, 1px stroke/neutral-weak (열림 stroke/neutral-contrast), 값 사이 x1, +N t04 Medium fg/neutral-muted
  Panel padding x1, shape/lg, bg/layer-floating, elevation overlay, 최대 높이 300 / heading padding x1 x2, t02 fg/neutral-muted
  Option padding x1_5 x2, gap x2, shape/sm, t04 Medium / highlighted bg/transparent-pressed / disabled fg/disabled
```
