<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/alert-dialog.html -->

# Alert Dialog

하던 일을 잠시 멈추고 중요한 확인을 받는 창입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<dialog class="ds-dialog ds-alertdialog" role="alertdialog" aria-labelledby="a-t" aria-describedby="a-d">
  <div class="ds-alertdialog__header"><h2 id="a-t" class="ds-alertdialog__title">제목</h2><p id="a-d" class="ds-alertdialog__desc">이 작업은 되돌릴 수 없습니다.</p></div>
  <div class="ds-alertdialog__footer" data-action="pair">
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>취소</button>
    <button class="ds-btn" data-variant="neutralSolid">확인</button>
  </div>
</dialog>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `action` | pair critical nonpreferred |

그 밖에: 272 폭

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 되돌릴 수 없는 작업을 확인받을 때 씁니다. |
| **Do** | 바깥을 눌러도 닫히지 않고 버튼으로만 닫힙니다. |

## 예시

```html
<button class="ds-btn" data-variant="criticalSolid" data-ds-open="pv-alert">주문 취소</button>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
action(data-action): single(기본) / pair / critical / stacked / nonpreferred
Figma: 폭 272 / gap x2 / header 20/20/0/20 / gap x1_5 / title t07 Bold / desc t05 fg/neutral-muted
       footer 16/20/20/20 / 버튼 medium / single/stacked 세로 gap x2 / pair/critical 가로 2등분 gap x2 / nonpreferred 세로 gap x4
```
