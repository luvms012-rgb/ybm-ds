<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/menu-sheet.html -->

# Menu Sheet

모바일 화면 아래에서 올라와 항목 하나를 선택하는 창입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<dialog class="ds-menusheet" id="ms" aria-labelledby="ms-t">
  [<div class="ds-menusheet__header"><h2 class="ds-menusheet__title" id="ms-t">제목</h2>[<p class="ds-menusheet__desc">설명</p>]</div>]
  <div class="ds-menusheet__list">
    <div class="ds-menusheet__group" role="group">
      <button type="button" class="ds-menusheet__item" [data-tone="critical"] [data-label-align="center"]>
        [<i class="ds-icon ds-icon--share" aria-hidden="true"></i>]
        <span class="ds-menusheet__content"><span class="ds-menusheet__label">공유하기</span>[<span class="ds-menusheet__item-desc">보조 설명</span>]</span>
      </button>
    </div>
  </div>
  <div class="ds-menusheet__footer"><button type="button" class="ds-menusheet__close" data-ds-close>닫기</button></div>
</dialog>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-menusheet__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Title**`ds-menusheet__title` | 제목입니다. |
| **Desc**`ds-menusheet__desc` | 제목을 돕는 설명 글입니다. |
| **List**`ds-menusheet__list` | 항목 목록입니다. |
| **Group**`ds-menusheet__group` | 관련 항목을 묶는 영역입니다. |
| **Item**`ds-menusheet__item` | 목록의 항목 하나입니다. |
| **Content**`ds-menusheet__content` | 주된 내용이 들어가는 영역입니다. |
| **Label**`ds-menusheet__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Item Desc**`ds-menusheet__item-desc` | 항목 설명입니다. |
| **Footer**`ds-menusheet__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |
| **Close**`ds-menusheet__close` | 닫기 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `Item tone` | neutral critical |
| `labelAlign` | left center |
| 켜고 끄는 속성 | `header` `description` `footer` |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- Dialog 와 같이 열고 닫기, 바깥(dim) 클릭 닫기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 몇 가지 동작 중 하나를 고를 때는 Menu Sheet, 입력이나 긴 내용은 Bottom Sheet를 씁니다. |
| **Do** | 되돌릴 수 없는 동작은 critical로 따로 묶습니다. |

## 예시

```html
<button type="button" class="ds-btn" data-variant="neutralOutline" data-size="small" data-ds-open="pv-ms">메뉴 시트 열기</button>
<dialog class="ds-menusheet" id="pv-ms" aria-labelledby="pv-ms-t">
  <div class="ds-menusheet__header"><h2 class="ds-menusheet__title" id="pv-ms-t">제목</h2><p class="ds-menusheet__desc">설명을 적어 주세요</p></div>
  <div class="ds-menusheet__list">
    <div class="ds-menusheet__group" role="group">
      <button type="button" class="ds-menusheet__item" data-ds-close><i class="ds-icon ds-icon--share" aria-hidden="true"></i><span class="ds-menusheet__content"><span class="ds-menusheet__label">공유하기</span></span></button>
      <button type="button" class="ds-menusheet__item" data-ds-close><i class="ds-icon ds-icon--link" aria-hidden="true"></i><span class="ds-menusheet__content"><span class="ds-menusheet__label">링크 복사</span><span class="ds-menusheet__item-desc">누구나 볼 수 있는 링크예요</span></span></button>
    </div>
    <div class="ds-menusheet__group" role="group">
      <button type="button" class="ds-menusheet__item" data-tone="critical" data-ds-close><i class="ds-icon ds-icon--trash" aria-hidden="true"></i><span class="ds-menusheet__content"><span class="ds-menusheet__label">삭제하기</span></span></button>
    </div>
  </div>
  <div class="ds-menusheet__footer"><button type="button" class="ds-menusheet__close" data-ds-close>닫기</button></div>
</dialog>
```

## 규격

### 크기와 여백

```
Bottom Sheet 와 같이 네이티브 <dialog> 를 쓴다. data-ds-open 으로 열고, data-ds-close 와 바깥 누르기로 닫는다.
Item tone: 기본 neutral / data-tone="critical"(되돌릴 수 없는 동작)   labelAlign: 기본 left / data-label-align="center"
Figma: 최대 폭 480 / 위쪽 shape/2xl / bg/layer-floating / padding 위 x6, 좌우 global gutter, 아래 x4
  header gap x1, 아래 x4, 제목 t06 Bold, 설명 t04 fg/neutral-muted / 묶음 사이 x2_5 / 묶음 shape/xl, 줄 사이 1px stroke/neutral-muted
  Item 최소 높이 52, padding x3_5 x4, gap x3_5, bg/neutral(pressed bg/neutral-weak-pressed), 아이콘 22, 글자 t05, 설명 t03 Medium fg/neutral-subtle
  critical 아이콘과 글자 fg/critical / footer 위 x2_5 / Close Button 높이 52, padding x3_5 x5, shape/lg, t05 Medium
```
