<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/menu-menu-item.html -->

# Menu · Menu Item

버튼을 누르면 펼쳐지는 동작 목록입니다. 수정, 삭제처럼 바로 실행할 동작을 모아 둡니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-menu" role="menu">
  <button class="ds-menu-item" role="menuitem"><i class="ds-icon ds-icon--search" aria-hidden="true"></i>공유하기</button>
  <div class="ds-menu__divider" role="separator"></div>
  <button class="ds-menu-item" role="menuitem" data-tone="critical">삭제하기</button>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `tone` | critical |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 동작을 실행할 때는 Menu, 값을 고를 때는 Select를 씁니다. |
| **Do** | 삭제, 차단처럼 되돌릴 수 없는 항목은 critical로 두고, 목록 끝에 구분선(Divider)으로 따로 묶습니다. |
| **Do** | 라벨은 2~6자 동사로 쓰고, 한 메뉴 안에서 말투를 맞춥니다. |
| **Do** | 설명은 꼭 필요한 항목에만 한 줄로 붙입니다. |
| **Don't** | 값을 고르는 데는 쓰지 않습니다. 폼에 넣을 값은 Select로 고르고, Menu는 동작을 실행할 때 씁니다. |
| **Don't** | 아이콘을 일부 항목에만 넣지 마세요. 모든 항목에 넣거나 모두 빼세요. |
| **Don't** | 라벨 없이 아이콘만 두지 않습니다. |

## 예시

```html
<div class="ds-menu" role="menu">
  <button class="ds-menu-item" role="menuitem"><i class="ds-icon ds-icon--external-link" aria-hidden="true"></i>공유하기</button>
  <button class="ds-menu-item" role="menuitem"><i class="ds-icon ds-icon--file-text" aria-hidden="true"></i>수정하기</button>
  <div class="ds-menu__divider" role="separator"></div>
  <button class="ds-menu-item" role="menuitem" data-tone="critical">삭제하기</button>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-menu-item-fg` | `var(--ds-color-fg-neutral)` |

### 크기와 여백

```
Figma Menu: 폭 220 / padding x1 / shape/2xl / bg/layer-floating / elevation overlay(+헤어라인)
           divider 1px stroke/neutral-subtle / 위아래 4
Figma Item: py10 px12 / gap x2 / shape/sm / 아이콘 18 / t04 fg/neutral
           pressed bg/neutral-weak-alpha / disabled fg/disabled / critical fg/critical
```
