<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/tooltip.html -->

# Tooltip

마우스를 올리거나 포커스하면 짧은 설명을 띄우는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-tooltip-anchor">
  <button class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-describedby="tip-copy" aria-label="복사">…</button>
  <span class="ds-tooltip" role="tooltip" id="tip-copy" [data-placement="bottom"]>링크 복사</span>
</span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: placement top, bottom, left, right, hover/focus 전용

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | Tooltip은 마우스를 올리거나 포커스할 때만 보이고, 터치 화면에서는 안 보입니다. |
| **Do** | 닫기 버튼이 필요하거나 설명이 여러 줄이면 Help Bubble을 씁니다. |

## 예시

```html
<span class="ds-tooltip-anchor"><button class="ds-btn" data-variant="neutralWeak" data-layout="iconOnly" aria-label="링크 복사" aria-describedby="pv-tip1"><i class="ds-icon ds-icon--external-link" aria-hidden="true"></i></button><span class="ds-tooltip" role="tooltip" id="pv-tip1">링크 복사</span></span>
<span class="ds-tooltip-anchor"><button class="ds-btn" data-variant="neutralWeak" aria-describedby="pv-tip2">bottom</button><span class="ds-tooltip" role="tooltip" id="pv-tip2" data-placement="bottom">아래에 표시</span></span>
<span class="ds-tooltip-anchor"><button class="ds-btn" data-variant="neutralWeak" aria-describedby="pv-tip3">항상 표시</button><span class="ds-tooltip" role="tooltip" id="pv-tip3" data-placement="right" data-state="open">data-state="open"</span></span>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-tooltip-gap` | `var(--ds-space-x1_5)` |

### 크기와 여백

```
placement: top(기본) / bottom / left / right
Figma: padding x1 x2 / shape/xs / bg/neutral-solid / t02 Medium fg/on-neutral-solid / 최대 폭 240
       대상과 간격 x1_5 / elevation overlay / 꼬리 없음
Help Bubble 과 차이: Tooltip 은 짧은 라벨(아이콘 버튼 이름 등)을 hover/focus 로만 보여 준다.
터치 화면에서는 보이지 않으므로 꼭 필요한 정보를 넣지 않는다. 닫기 버튼/여러 줄 설명은 Help Bubble.
```
