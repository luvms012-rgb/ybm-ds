<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/badge.html -->

# Badge

대상의 상태나 속성을 짧은 글자로 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-badge" data-variant="solid" data-tone="brand">NEW</span>
<span class="ds-badge" data-size="large">
  [<i class="ds-icon ds-icon--circle-check-solid ds-badge__prefix" aria-hidden="true"></i>]
  <span class="ds-badge__label">라벨</span>
  [<button type="button" class="ds-badge__action" aria-label="삭제"><i class="ds-icon ds-icon--x"></i></button>]
</span>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Prefix**`ds-badge__prefix` | 앞에 붙는 아이콘이나 요소입니다. |
| **Label**`ds-badge__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Action**`ds-badge__action` | 바로 실행하는 작은 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | weak solid outline |
| `tone` | neutral brand informative positive warning critical |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 누를 수 없는 표시용 라벨로만 씁니다. |

## 예시

```html
<span class="ds-badge">neutral</span><span class="ds-badge" data-tone="brand">brand</span><span class="ds-badge" data-tone="informative">informative</span><span class="ds-badge" data-tone="positive">positive</span><span class="ds-badge" data-tone="warning">warning</span><span class="ds-badge" data-tone="critical">critical</span>

<span class="ds-badge" data-variant="solid" data-tone="brand">NEW</span><span class="ds-badge" data-variant="solid" data-tone="critical">마감</span><span class="ds-badge" data-variant="outline">outline</span><span class="ds-badge" data-size="large"><span class="ds-badge__label">large</span></span>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-badge-bg` | `var(--ds-color-bg-neutral)` |
| `--ds-badge-fg` | `var(--ds-color-fg-neutral-muted)` |
| `--ds-badge-line` | `transparent` |

### 크기와 여백

```
size: medium(기본) / large   variant: weak(기본) / solid / outline
tone: neutral(기본) / brand / informative / positive / warning / critical
Figma medium: py2 px6 / min-h20 / shape/2xs / t01 Medium / 아이콘 12
      large : py4 px8 / min-h24 / shape/xs  / t02 Medium / 아이콘 14
공통: gap x0_5 / solid 라벨 fg/on-{tone}-solid
기본 최대 너비 없음 — 말줄임이 필요하면 사용처에서 max-width 지정
```
