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

### 아이콘 버튼에 이름 보여 주기

아이콘만 있는 버튼에 마우스를 올리거나 포커스하면 이름을 Tooltip으로 보여 줍니다. 버튼의 `aria-label`과 같은 짧은 라벨만 넣습니다.
