<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/dialog.html -->

# Dialog

화면 위에 창을 띄워 입력이나 확인을 받는 컴포넌트입니다. 꼭 확인받아야 하는 메시지는 Alert Dialog를 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<dialog class="ds-dialog" id="dlg" aria-labelledby="dlg-title" [data-size="large"]>
  <div class="ds-dialog__header">
    <h2 class="ds-dialog__title" id="dlg-title">제목</h2>
    [<p class="ds-dialog__desc">설명</p>]
    [<button class="ds-dialog__close" data-ds-close aria-label="닫기"></button>]
  </div>
  <div class="ds-dialog__body">…</div>
  [<div class="ds-dialog__footer"><button class="ds-btn" data-variant="neutralSolid" data-size="large">확인</button></div>]
</dialog>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-dialog__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Title**`ds-dialog__title` | 제목입니다. |
| **Desc**`ds-dialog__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Close**`ds-dialog__close` | 닫기 버튼입니다. |
| **Body**`ds-dialog__body` | 본문이 들어가는 영역입니다. |
| **Footer**`ds-dialog__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: size(480/800), `--ds-dialog-width`

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- data-ds-open / data-ds-close 속성으로 열고 닫기, 바깥(dim) 클릭 닫기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 아래쪽 주요 버튼은 Action Button large(52)를 씁니다. |
| **Do** | Popover는 버튼 옆에 뜨는 작은 창이고, 바깥을 누르면 닫힙니다. |
| **Do** | 화면을 막고 확인받아야 할 때는 Dialog를 씁니다. |
| **Do** | 화면 폭이 768보다 좁으면 Bottom Sheet로 바꿉니다. 머리말, 본문, 버튼 구조는 그대로 둡니다. |
| **Don't** | 위쪽 닫기 버튼과 아래쪽 취소 버튼을 함께 두지 않습니다. 정보만 보여 줄 때는 위쪽 닫기를 둡니다. 폼이나 설정처럼 주요 동작이 있으면 아래쪽 취소를 둡니다. |

## 예시

```html
<button class="ds-btn" data-variant="neutralWeak" data-ds-open="pv-dlg">Dialog 열기</button>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-dialog-width` | `480px` |
| `--ds-dialog-radius` | `var(--ds-shape-2xl)` |
| `--ds-dialog-max-height` | `80vh` |

### 크기와 여백

```
Figma: 폭 480(large 800) / shape/2xl / bg/layer-floating / 그림자 없음(2026-10-01 결정)
  header 24/20/16/20 / gap x4 / title t07 Bold(Alert Dialog 와 같게, 2026-11-02) fg/neutral / desc t05 fg/neutral-muted
  body 12/20/16/20 / min-h64 / footer 24/20 / Action Button large 폭 채움
  닫기 40×40 / 위 18 / 오른쪽 10 / Lucide/x 24 fg/neutral
```
