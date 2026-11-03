<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/action-button.html -->

# Action Button

누르면 바로 동작을 실행하는 기본 버튼입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button class="ds-btn" data-variant="neutralWeak" data-size="large">
  [<i class="ds-icon ds-icon--plus" aria-hidden="true"></i>] 라벨 [<i class="ds-icon …">]
</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | brandSolid brandOutline neutralSolid neutralWeak neutralOutline criticalSolid ghost |
| `size` | xsmall small medium large |
| `layout` | iconOnly |
| `width` | fill |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 강조 버튼(High emphasis)은 한 화면에 하나만 둡니다. |
| **Don't** | 버튼을 세 개 넘게 나란히 두지 않습니다. |

## 예시

```html
<button class="ds-btn" data-variant="brandSolid">brandSolid</button>
<button class="ds-btn" data-variant="neutralSolid">neutralSolid</button>
<button class="ds-btn" data-variant="neutralWeak">neutralWeak</button>
<button class="ds-btn" data-variant="criticalSolid">criticalSolid</button>
<button class="ds-btn" data-variant="brandOutline">brandOutline</button>
<button class="ds-btn" data-variant="neutralOutline">neutralOutline</button>
<button class="ds-btn" data-variant="ghost">ghost</button>
<button class="ds-btn" disabled>disabled</button>

<button class="ds-btn" data-variant="neutralSolid" data-size="xsmall">xsmall</button>
<button class="ds-btn" data-variant="neutralSolid" data-size="small">small</button>
<button class="ds-btn" data-variant="neutralSolid" data-size="medium"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i>medium</button>
<button class="ds-btn" data-variant="neutralSolid" data-size="large">large<i class="ds-icon ds-icon--arrow-right" aria-hidden="true"></i></button>
<button class="ds-btn" data-variant="neutralWeak" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-btn-height` | `40px` |
| `--ds-btn-padding-x` | `var(--ds-space-x4)` |
| `--ds-btn-radius` | `var(--ds-shape-sm)` |
| `--ds-btn-gap` | `var(--ds-space-x1_5)` |
| `--ds-btn-font-size` | `var(--ds-font-size-t04)` |
| `--ds-btn-line-height` | `var(--ds-line-height-t04)` |
| `--ds-btn-font-weight` | `var(--ds-font-weight-semibold)` |
| `--ds-btn-icon` | `18px` |
| `--ds-btn-icon-only` | `20px` |
| `--ds-btn-bg` | `var(--ds-color-bg-brand-solid)` |
| `--ds-btn-bg-pressed` | `var(--ds-color-bg-brand-solid-pressed)` |
| `--ds-btn-fg` | `var(--ds-color-fg-on-brand-solid)` |
| `--ds-btn-border` | `transparent` |

### 크기와 여백

```
variant : brandSolid(기본) / neutralSolid / neutralWeak / criticalSolid / brandOutline / neutralOutline / ghost
size    : xsmall 32 / small 36 / medium 40(기본) / large 52
layout  : 기본 withText / data-layout="iconOnly" / data-width="fill"
Figma: xsmall px14 gap4 t02 Medium shape/xs (iconOnly pill) / icon 16
       small  px14 gap4 t04 SemiBold shape/sm / icon 18
       medium px16 gap6 t04 SemiBold shape/sm / icon 18 (iconOnly 20)
       large  px20 gap8 t06 SemiBold shape/md / icon 24
```
