<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/popover.html -->

# Popover

누른 요소 옆에 작은 창을 띄워 부가 정보나 작업을 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-popover-anchor">
  <button class="ds-btn" data-variant="neutralOutline" data-ds-popover="pop-1" aria-expanded="false" aria-controls="pop-1">열기</button>
  <div class="ds-popover" id="pop-1" role="dialog" aria-labelledby="pop-1-t" hidden [data-placement="bottom-end"]>
    <div class="ds-popover__header">
      <div class="ds-popover__texts"><strong class="ds-popover__title" id="pop-1-t">제목</strong>[<p class="ds-popover__desc">설명</p>]</div>
      [<button type="button" class="ds-popover__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>]
    </div>
    <div class="ds-popover__body">본문</div>
    [<div class="ds-popover__footer"><button class="ds-btn" data-variant="neutralWeak" data-size="small">취소</button><button class="ds-btn" data-variant="neutralSolid" data-size="small">확인</button></div>]
  </div>
</span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `actions` | single pair none |

그 밖에: 폭 320

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-popover-width` | `320px` |
| `--ds-popover-gap` | `var(--ybm-space-x2)` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | Popover는 버튼 옆에 뜨는 작은 창이고, 바깥을 누르면 닫힙니다. |
| **Do** | 화면을 막고 확인받아야 할 때는 Dialog를 씁니다. |

## 예시

```html
<span class="ds-popover-anchor">
  <button type="button" class="ds-btn" data-variant="neutralOutline" data-size="small" data-ds-popover="pv-pop" aria-expanded="false" aria-controls="pv-pop">공유 설정</button>
  <div class="ds-popover" id="pv-pop" role="dialog" aria-labelledby="pv-pop-t" hidden>
    <div class="ds-popover__header"><div class="ds-popover__texts"><strong class="ds-popover__title" id="pv-pop-t">링크 공유</strong><p class="ds-popover__desc">링크가 있는 사람만 볼 수 있어요</p></div><button type="button" class="ds-popover__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
    <div class="ds-popover__body">공유를 끄면 이미 보낸 링크도 더 이상 열리지 않아요.</div>
    <div class="ds-popover__footer"><button type="button" class="ds-btn" data-variant="neutralWeak" data-size="small" data-ds-close>취소</button><button type="button" class="ds-btn" data-variant="neutralSolid" data-size="small" data-ds-close>공유 끄기</button></div>
  </div>
</span>
<div class="ds-popover" role="dialog" aria-label="예시">
  <div class="ds-popover__header"><div class="ds-popover__texts"><strong class="ds-popover__title">제목</strong><p class="ds-popover__desc">설명을 작성할 수 있어요</p></div><button type="button" class="ds-popover__close" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
  <div class="ds-popover__body">팝오버 본문에는 사용자가 확인할 내용이나 추가 동작을 둘 수 있습니다.</div>
  <div class="ds-popover__footer"><button type="button" class="ds-btn" data-variant="neutralSolid" data-size="small">확인</button></div>
</div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
actions: single / pair / none(footer 없음)   placement: bottom-start(기본) / bottom-end / top-start / top-end
ybm-ds.js: data-ds-popover 로 열고 닫기, 바깥 클릭과 Esc 로 닫기, 안의 data-ds-close 로 닫기.
Figma: 폭 320 / padding x5 / gap x4 / shape/xl / bg/layer-floating / 1px stroke/neutral-muted / elevation 2
  title t05 Bold fg/neutral / desc t04 fg/neutral-subtle / 글 사이 x1 / 머리말 gap x3 / 닫기 Lucide/x 20 fg/neutral
  body t04 fg/neutral / footer 오른쪽 정렬 gap x2, Action Button small
닫기 버튼을 숨기면 본문이나 버튼 영역에 닫는 동작을 꼭 둔다.
고르는 법: 짧은 설명은 Tooltip, Help Bubble / 제목과 버튼이 있는 작은 작업 창은 Popover / 화면을 막아야 하면 Dialog
```
