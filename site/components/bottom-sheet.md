<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/bottom-sheet.html -->

# Bottom Sheet

화면 아래에서 올라오는 창입니다. 지금 화면을 그대로 둔 채 추가 정보나 동작을 보여 줄 때 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<dialog class="ds-bottomsheet" aria-labelledby="bs-t" [data-header-align="center"] [data-handle]>
  <div class="ds-bottomsheet__header">
    <h2 class="ds-bottomsheet__title" id="bs-t">제목</h2>
    [<p class="ds-bottomsheet__desc">설명</p>]
    [<button class="ds-bottomsheet__close" data-ds-close aria-label="닫기"></button>]
  </div>
  <div class="ds-bottomsheet__body">…</div>
  [<div class="ds-bottomsheet__footer"><button class="ds-btn" data-variant="neutralSolid" data-size="large">확인</button></div>]
</dialog>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-bottomsheet__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Title**`ds-bottomsheet__title` | 제목입니다. |
| **Desc**`ds-bottomsheet__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Close**`ds-bottomsheet__close` | 닫기 버튼입니다. |
| **Body**`ds-bottomsheet__body` | 본문이 들어가는 영역입니다. |
| **Footer**`ds-bottomsheet__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `header-align` | center |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 몇 가지 동작 중 하나를 고를 때는 Menu Sheet를 씁니다. |
| **Do** | 입력이나 긴 내용은 Bottom Sheet에 담습니다. |
| **Do** | 되돌릴 수 없는 동작은 critical로 따로 묶습니다. |
| **Do** | PC 화면 옆에 보조 내용이나 필터를 둘 때 Side Panel을 씁니다. |
| **Do** | 화면이 좁으면 Bottom Sheet로 바꿉니다. |

## 예시

```html
<button class="ds-btn" data-variant="neutralWeak" data-ds-open="pv-bs">Bottom Sheet 열기</button>
```

## 규격

### 크기와 여백

```
headerAlign: left(기본) / center   handle: data-handle
Figma: 폭 채움 / 위쪽 shape/3xl / bg/layer-floating
  header 24/20/16/20 / gap x2 / title t07 SemiBold / desc t05 fg/neutral-muted
  body 12/20/16/20 / min-h64 / footer 16/20/24/20 / 닫기 40×40(위 18 / 오른쪽 10) / handle 36×4 palette/gray-400 (위 6)
```
