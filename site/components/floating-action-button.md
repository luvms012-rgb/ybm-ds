<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/floating-action-button.html -->

# Floating Action Button

화면 위에 떠 있으면서 그 화면에서 가장 중요한 동작 하나를 실행하는 버튼입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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
| **Do** | 버튼이 내용을 가리므로 화면 아래에 버튼 높이만큼 여백을 두세요. |
| **Don't** | disabled 상태로 두지 않습니다. 쓸 수 없는 동작이면 버튼을 숨깁니다. |

## 예시

```html
<button class="ds-fab" style="position:static"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i>글쓰기</button><button class="ds-fab" data-layout="iconOnly" aria-label="글쓰기" style="position:static"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
Figma extended: h48 / px18 / gap x1 / 아이콘 16 / t05 Bold / iconOnly 56×56 / 아이콘 24
       shape/pill / bg/brand-solid(pressed -pressed) / 글자/아이콘 fg/on-brand-solid / elevation floating
```
