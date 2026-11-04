<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/side-panel.html -->

# Side Panel

PC 화면 가장자리에서 밀려 나오는 창입니다. 지금 화면을 그대로 둔 채 자세한 정보나 작업을 보여 줄 때 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<dialog class="ds-sidepanel" id="sp" aria-labelledby="sp-t" [data-size="small"] [data-direction="left"]>
  <div class="ds-sidepanel__header">
    <div class="ds-sidepanel__texts"><h2 class="ds-sidepanel__title" id="sp-t">제목</h2>[<p class="ds-sidepanel__desc">설명</p>]</div>
    <button type="button" class="ds-sidepanel__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
  </div>
  <div class="ds-sidepanel__body">…</div>
  [<div class="ds-sidepanel__footer">…버튼…</div>]
</dialog>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-sidepanel__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Texts**`ds-sidepanel__texts` | 제목과 설명을 묶는 글자 영역입니다. |
| **Title**`ds-sidepanel__title` | 제목입니다. |
| **Desc**`ds-sidepanel__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Close**`ds-sidepanel__close` | 닫기 버튼입니다. |
| **Body**`ds-sidepanel__body` | 본문이 들어가는 영역입니다. |
| **Footer**`ds-sidepanel__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | small medium large |
| `direction` | right left |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- Dialog 와 같이 열고 닫기, 본문이 스크롤되면 data-scrolled

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | PC 화면 옆에 보조 내용이나 필터를 둘 때 Side Panel을 씁니다. |
| **Do** | 화면이 좁으면 Bottom Sheet로 바꿉니다. |

## 예시

```html
<button type="button" class="ds-btn" data-variant="neutralOutline" data-size="small" data-ds-open="pv-sp">옆 패널 열기</button>
<dialog class="ds-sidepanel" id="pv-sp" data-size="small" aria-labelledby="pv-sp-t">
  <div class="ds-sidepanel__header">
    <div class="ds-sidepanel__texts"><h2 class="ds-sidepanel__title" id="pv-sp-t">필터</h2><p class="ds-sidepanel__desc">원하는 조건을 고르세요</p></div>
    <button type="button" class="ds-sidepanel__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
  </div>
  <div class="ds-sidepanel__body">
    <p style="height:900px">본문이 길면 이 영역만 스크롤되고, 스크롤되면 위에 선이 생깁니다.</p>
  </div>
  <div class="ds-sidepanel__footer"><button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium" data-ds-close>취소</button><button type="button" class="ds-btn" data-variant="neutralSolid" data-size="medium" data-ds-close>적용</button></div>
</dialog>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-sidepanel-width` | `720px` |

### 크기와 여백

```
네이티브 <dialog> 를 쓴다. data-ds-open 으로 열고, data-ds-close 와 바깥 누르기로 닫는다.
size: small 480 / 기본 medium 720 / large 960 (화면의 80% 를 넘지 않음)   direction: 기본 오른쪽 / data-direction="left"
본문이 스크롤되면 ybm-ds.js 가 data-scrolled 를 붙여 본문 위에 1px 선이 생긴다. 화면이 좁으면 Bottom Sheet 로 바꿔 쓴다.
Figma: bg/layer-floating / header 최소 높이 70, padding x6 x6 x4, gap x1_5, 제목 t08 Bold, 설명 t05 fg/neutral-muted
  body 좌우 x6, 아래 x12 / footer padding x4 x6 x6 / Close Button 52, shape/lg, x 22 fg/neutral-subtle
```
