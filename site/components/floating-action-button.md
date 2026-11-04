<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/floating-action-button.html -->

# Floating Action Button

화면 위에 떠서 그 화면의 가장 중요한 동작을 실행하는 버튼입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button class="ds-fab"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i>글쓰기</button>
<button class="ds-fab" data-layout="iconOnly" aria-label="글쓰기"><i class="ds-icon ds-icon--plus"></i></button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `layout` | iconOnly extended=false |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 쓸 수 없으면 버튼을 숨깁니다. |
| **Do** | 한 화면에 하나만 둡니다. 두 개 이상이면 무엇이 주요 동작인지 알기 어렵습니다. |
| **Do** | extended에는 라벨을 꼭 넣습니다. |
| **Do** | 버튼이 내용을 가리지 않도록 화면 아래에 버튼 높이만큼 여백을 둡니다. |
| **Don't** | disabled 상태로 두지 않습니다. 쓸 수 없는 동작이면 버튼을 숨깁니다. |

## 예시

```html
<button class="ds-fab" style="position:static"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i>글쓰기</button><button class="ds-fab" data-layout="iconOnly" aria-label="글쓰기" style="position:static"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
```

## 규격

### 크기와 여백

```
Figma extended: h48 / px18 / gap x1 / 아이콘 16 / t05 Bold / iconOnly 56×56 / 아이콘 24
       shape/pill / bg/brand-solid(pressed -pressed) / 글자/아이콘 fg/on-brand-solid / elevation floating
```
