<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/chip-tabs.html -->

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

```html
<div class="ds-chiptabs" role="tablist"><button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button><button class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-notification>공지</button><button class="ds-chiptabs__trigger" role="tab" aria-selected="false">이벤트</button></div>
<div class="ds-chiptabs" role="tablist" data-variant="neutralOutline"><button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button><button class="ds-chiptabs__trigger" role="tab" aria-selected="false">공지</button><button class="ds-chiptabs__trigger" role="tab" aria-selected="false">이벤트</button></div>
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
