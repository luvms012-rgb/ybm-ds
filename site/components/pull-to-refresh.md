<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/pull-to-refresh.html -->

# Pull To Refresh

목록 맨 위에서 아래로 당기면 새로 고치는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-ptr">
  <div class="ds-ptr__indicator">
    <span class="ds-progress-circle" role="progressbar" aria-label="새로 고침"><svg viewBox="0 0 24 24" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
  </div>
  <div class="ds-ptr__content">…목록…</div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Indicator**`ds-ptr__indicator` | 지금 상태나 위치를 알려 주는 표시입니다. |
| **Track**`ds-progress-circle__track` | 막대의 바탕입니다. |
| **Range**`ds-progress-circle__range` | 당긴 만큼 차오르는 표시입니다. |
| **Content**`ds-ptr__content` | 주된 내용이 들어가는 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `state` | pulling refreshing |

그 밖에: Progress Circle 24

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 터치로 당긴 거리 표시, 넘겨 놓으면 ds-refresh 이벤트, YBM.endRefresh(요소) 로 되돌리기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 최신 내용을 다시 불러오는 목록 화면에만 씁니다. |
| **Do** | 글자를 골라야 하는 영역에서는 data-disabled로 끕니다. |

## 예시

```html
<div class="ds-ptr" id="pv-ptr" style="width:343px;height:240px;box-shadow:inset 0 0 0 1px var(--ybm-color-stroke-neutral-muted);border-radius:var(--ybm-shape-md)">
  <div class="ds-ptr__indicator">
    <span class="ds-progress-circle" role="progressbar" aria-label="새로 고침" style="--ds-progress-value: 0"><svg viewBox="0 0 24 24" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
  </div>
  <div class="ds-ptr__content" style="height:100%;overflow:auto;padding:var(--ybm-space-x4)">
    <p>휴대폰에서 이 칸을 아래로 당겨 보세요.</p>
    <p id="pv-ptr-out" style="color:var(--ybm-color-fg-neutral-muted)">아직 새로 고치지 않았어요</p>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-ptr-size` | `calc(var(--ybm-space-x6) + var(--ybm-space-x8) * 2)` |
| `--ds-ptr-displacement` | `0px` |

### 크기와 여백

```
ybm-ds.js 가 터치로 당긴 거리를 --ds-ptr-displacement 에 넣고, 88 을 넘겨 놓으면 data-state="refreshing" 과 ds-refresh 이벤트.
새로 고침이 끝나면 YBM.endRefresh(요소) 로 되돌린다. data-disabled 로 끈다.
Figma: 위쪽 영역 높이 x6 + x8 × 2 / Progress Circle 24 neutral, 당기는 동안 차오르고 새로 고치는 동안 회전
```
