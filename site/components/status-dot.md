<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/status-dot.html -->

# Status Dot

작은 색 점으로 상태를 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-statusdot" data-tone="positive" [data-pulse]></span> <span>연결됨</span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `tone` | positive warning critical brand neutral |
| 켜고 끄는 속성 | `data-pulse` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 색만으로 뜻을 전하지 않도록 글자와 함께 씁니다. |
| **Do** | 프로필 사진 위의 상태는 Avatar의 Status를 씁니다. |

## 예시

```html
<span style="display:inline-flex;align-items:center;gap:var(--ybm-space-x1_5)"><span class="ds-statusdot" data-tone="positive"></span>연결됨</span>
<span style="display:inline-flex;align-items:center;gap:var(--ybm-space-x1_5)"><span class="ds-statusdot" data-tone="warning"></span>지연</span>
<span style="display:inline-flex;align-items:center;gap:var(--ybm-space-x1_5)"><span class="ds-statusdot" data-tone="critical"></span>끊김</span>
<span style="display:inline-flex;align-items:center;gap:var(--ybm-space-x1_5)"><span class="ds-statusdot" data-tone="brand" data-pulse></span>진행 중</span>
<span style="display:inline-flex;align-items:center;gap:var(--ybm-space-x1_5)"><span class="ds-statusdot"></span>대기</span>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
tone: positive / warning / critical / brand / neutral(기본)   data-pulse: 진행 중일 때 깜빡임
Figma: x2 원 / positive bg/positive-solid, warning bg/warning-solid, critical bg/critical-solid, brand bg/brand-solid, neutral fg/neutral-subtle
  깜빡임 2초, 투명도 1 → 0.5 → 1 (동작 줄이기 설정에서는 멈춤)
```
