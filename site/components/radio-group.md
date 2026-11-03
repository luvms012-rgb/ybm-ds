<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/radio-group.html -->

# Radio Group

여러 선택지 가운데 하나만 선택할 때 쓰는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-radio-group" role="radiogroup">
  <label class="ds-radio"><input type="radio" class="ds-radio__control" name="g"><span>라벨</span></label>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `tone` `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 같은 묶음에서는 하나만 선택된 상태로 둡니다. |
| **Do** | 누를 수 있는 영역은 라벨까지 포함한 전체이고, List와 함께 쓰면 줄 전체입니다. |
| **Do** | 여러 개를 골라야 하면 Checkbox를 쓰세요. |
| **Do** | 추천하거나 자주 고르는 선택지를 미리 골라 두면 사용자의 고민이 줄어듭니다. |
| **Do** | 선택지가 2~6개면 Radio Group을, 그보다 많거나 늘어날 수 있으면 Field Button이나 Select를 씁니다. |
| **Don't** | 라벨이 길거나 화면이 좁으면 가로로 늘어놓지 마세요. 기본은 세로로 쌓습니다. |

## 예시

```html
<div class="ds-radio-group" role="radiogroup" aria-label="수령 방법">
  <label class="ds-radio"><input type="radio" class="ds-radio__control" name="pv-r" checked><span>온라인</span></label>
  <label class="ds-radio"><input type="radio" class="ds-radio__control" name="pv-r"><span>방문 수령</span></label>
  <label class="ds-radio"><input type="radio" class="ds-radio__control" name="pv-r" disabled><span>우편</span></label>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-radio-size` | `24px` |
| `--ds-radio-dot` | `10px` |
| `--ds-radio-checked-bg` | `var(--ybm-color-bg-brand-solid)` |
| `--ds-radio-checked-fg` | `var(--ybm-color-fg-on-brand-solid)` |

### 크기와 여백

```
size: large(기본 24) / medium(20)   tone: brand(기본) / neutral
Figma: 행 min-h 36/32 / 위 6 / gap x2 / 원 bg/layer-default + 1px stroke/neutral-weak / label t05/t04
  checked 고리(두께 7/6, 가운데 10/8 은 투명) brand bg/brand-solid / neutral bg/neutral-solid (2026-10-31 흰 점 → 투명)
  disabled bg/disabled + stroke/neutral-muted / disabledChecked 고리 bg/disabled, 가운데 투명
```
