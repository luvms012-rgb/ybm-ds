<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/divider.html -->

# Divider

내용 묶음 사이를 선으로 나누는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<hr class="ds-divider" [data-weight="thick"] [data-inset]>
<span class="ds-divider" role="separator" aria-orientation="vertical" data-orientation="vertical"></span>
<div class="ds-divider" role="separator" data-label><span>또는</span></div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `inset` `label` |

그 밖에: weight thick, orientation vertical

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Don't** | 마지막 묶음 아래에는 구분선을 두지 않습니다. |

## 예시

```html
<hr class="ds-divider">
<hr class="ds-divider" data-weight="thick">
<div class="ds-divider" role="separator" data-label><span>또는</span></div>
<div class="u-flex" style="align-items:center;gap:var(--ds-space-x2);color:var(--ds-color-fg-neutral-subtle);font-size:var(--ds-font-size-t03)"><span>이용약관</span><span class="ds-divider" role="separator" aria-orientation="vertical" data-orientation="vertical" style="--ds-divider-length:12px"></span><span>개인정보처리방침</span></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-divider-color` | `var(--ds-color-stroke-neutral-weak)` |
| `--ds-divider-size` | `1px` |
| `--ds-divider-length` | `16px` |

### 크기와 여백

```
weight: thin(기본 1px) / thick(8px 섹션 구분, 모바일)   orientation: horizontal(기본) / vertical
Figma: thin 1px stroke/neutral-weak / thick 8 bg/neutral-muted / vertical 1×16(--ds-divider-length)
  inset 좌우 x4 / label t03 fg/neutral-subtle, 선과 간격 x3
마지막 섹션 아래에는 두지 않는다.
```
