<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/citation.html -->

# Citation

본문의 근거가 된 출처를 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<a class="ds-citation" data-type="number" href="#ref-1" aria-label="출처 1">1</a>
<a class="ds-citation" href="https://…">[<span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span>]<span class="ds-citation__label">출처 이름</span></a>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Icon**`ds-citation__icon` | 출처 사이트 아이콘입니다. |
| **Label**`ds-citation__label` | 출처 이름입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `type` | number label |
| 켜고 끄는 속성 | `icon` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | AI 답변처럼 서식 있는 글은 Markdown으로 감쌉니다. |
| **Do** | 코드는 Code Block에 넣습니다. |
| **Do** | 근거는 번호나 출처 칩(Citation)으로 붙입니다. |

## 예시

```html
<span>번호<a class="ds-citation" data-type="number" href="#">1</a></span>
<a class="ds-citation" href="#"><span class="ds-citation__label">출처 이름</span></a>
<a class="ds-citation" href="#"><span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span><span class="ds-citation__label">출처 이름</span></a>
```

## 규격

### 크기와 여백

```
type: 기본 label(출처 이름 칩) / data-type="number"(글 뒤 위첨자 번호)
Figma: 높이 x5, t02, fg/neutral-muted / number 최소 폭 x5, 좌우 x1, pill, bg/brand-weak, SemiBold
  label 좌우 x2(아이콘이 있으면 왼쪽 x0_5), gap x1, shape/sm, 1px stroke/neutral-weak, 최대 15em / 아이콘 칸 x4 원, 아이콘 12
```
