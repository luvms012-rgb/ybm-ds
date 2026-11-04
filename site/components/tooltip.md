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

```html
<article class="ds-card" data-size="small" style="width: 100%; max-width: 420px">
  <div class="u-flex u-center u-between u-gap-3">
    <div class="u-col u-gap-1">
      <p class="ds-t05 ds-fw-semibold">3강 수업 자료</p>
      <span class="ds-tag-group"><span>PDF</span><span>2.4MB</span></span>
    </div>
    <div class="u-flex u-gap-1">
      <span class="ds-tooltip-anchor">
        <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="내려받기" aria-describedby="tooltip-ex1-down"><i class="ds-icon ds-icon--download" aria-hidden="true"></i></button>
        <span class="ds-tooltip" role="tooltip" id="tooltip-ex1-down">내려받기</span>
      </span>
      <span class="ds-tooltip-anchor">
        <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="링크 복사" aria-describedby="tooltip-ex1-link"><i class="ds-icon ds-icon--link" aria-hidden="true"></i></button>
        <span class="ds-tooltip" role="tooltip" id="tooltip-ex1-link">링크 복사</span>
      </span>
      <span class="ds-tooltip-anchor">
        <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="인쇄" aria-describedby="tooltip-ex1-print"><i class="ds-icon ds-icon--printer" aria-hidden="true"></i></button>
        <span class="ds-tooltip" role="tooltip" id="tooltip-ex1-print">인쇄</span>
      </span>
    </div>
  </div>
</article>
```

### 도구 막대에서 단축키 함께 알리기

아이콘이 이어진 글쓰기 도구 막대에서 이름과 단축키를 한 줄로 알려 줍니다. 터치 화면에서는 보이지 않으므로 꼭 알아야 할 내용은 넣지 않습니다.

```html
<div class="u-col u-gap-2" style="width: 100%; max-width: 480px">
  <div class="u-flex u-gap-1" role="toolbar" aria-label="글쓰기 도구">
    <span class="ds-tooltip-anchor">
      <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="되돌리기" aria-describedby="tooltip-ex2-undo"><i class="ds-icon ds-icon--undo-2" aria-hidden="true"></i></button>
      <span class="ds-tooltip" role="tooltip" id="tooltip-ex2-undo" data-placement="bottom">되돌리기 Ctrl+Z</span>
    </span>
    <span class="ds-tooltip-anchor">
      <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="다시 하기" aria-describedby="tooltip-ex2-redo"><i class="ds-icon ds-icon--redo-2" aria-hidden="true"></i></button>
      <span class="ds-tooltip" role="tooltip" id="tooltip-ex2-redo" data-placement="bottom">다시 하기 Ctrl+Y</span>
    </span>
    <span class="ds-tooltip-anchor">
      <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="기울임" aria-describedby="tooltip-ex2-italic"><i class="ds-icon ds-icon--italic" aria-hidden="true"></i></button>
      <span class="ds-tooltip" role="tooltip" id="tooltip-ex2-italic" data-placement="bottom">기울임 Ctrl+I</span>
    </span>
    <span class="ds-tooltip-anchor">
      <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="링크 넣기" aria-describedby="tooltip-ex2-link"><i class="ds-icon ds-icon--link" aria-hidden="true"></i></button>
      <span class="ds-tooltip" role="tooltip" id="tooltip-ex2-link" data-placement="bottom">링크 넣기 Ctrl+K</span>
    </span>
    <span class="ds-tooltip-anchor">
      <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="사진 넣기" aria-describedby="tooltip-ex2-image"><i class="ds-icon ds-icon--image" aria-hidden="true"></i></button>
      <span class="ds-tooltip" role="tooltip" id="tooltip-ex2-image" data-placement="bottom">사진 넣기</span>
    </span>
  </div>
  <textarea class="ds-textarea" rows="4" aria-label="후기 본문" placeholder="수강 후기를 적어 주세요"></textarea>
</div>
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
