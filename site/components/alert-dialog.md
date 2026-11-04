<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/alert-dialog.html -->

# Alert Dialog

하던 일을 잠시 멈추고 중요한 확인을 받는 창입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<dialog class="ds-dialog ds-alertdialog" role="alertdialog" aria-labelledby="a-t" aria-describedby="a-d">
  <div class="ds-alertdialog__header"><h2 id="a-t" class="ds-alertdialog__title">제목</h2><p id="a-d" class="ds-alertdialog__desc">이 작업은 되돌릴 수 없습니다.</p></div>
  <div class="ds-alertdialog__footer" data-action="pair">
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>취소</button>
    <button class="ds-btn" data-variant="neutralSolid">확인</button>
  </div>
</dialog>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-alertdialog__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Title**`ds-alertdialog__title` | 제목입니다. |
| **Desc**`ds-alertdialog__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Footer**`ds-alertdialog__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |

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

### 지우기 전에 한 번 더 묻기

되돌릴 수 없는 삭제는 Alert Dialog로 확인받고, 실행 버튼은 criticalSolid로 둡니다. 바깥을 눌러도 닫히지 않아 버튼을 골라야만 넘어갑니다.

```html
<ul class="ds-list" data-variant="inset" style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">회사</span>
        <span class="ds-list-item__desc">서울시 중구 한빛로 12, 3층</span>
      </span>
      <span class="ds-list-item__suffix"><button class="ds-btn" data-variant="ghost" data-size="small" data-ds-open="alert-dialog-ex1">삭제</button></span>
    </div>
  </li>
</ul>
<dialog class="ds-dialog ds-alertdialog" id="alert-dialog-ex1" role="alertdialog" aria-labelledby="alert-dialog-ex1-title" aria-describedby="alert-dialog-ex1-desc">
  <div class="ds-alertdialog__header">
    <h2 id="alert-dialog-ex1-title" class="ds-alertdialog__title">배송지를 삭제할까요?</h2>
    <p id="alert-dialog-ex1-desc" class="ds-alertdialog__desc">삭제한 배송지는 되돌릴 수 없어요.</p>
  </div>
  <div class="ds-alertdialog__footer" data-action="critical">
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>취소</button>
    <button class="ds-btn" data-variant="criticalSolid" data-ds-close>삭제</button>
  </div>
</dialog>
```

### 쓰던 글을 두고 나갈 때 묻기

쓰던 내용이 사라지는 동작 앞에서 한 번 더 묻고, 두 버튼을 가로로(`pair`) 나란히 둡니다. 확인 버튼에는 "나가기"처럼 실제로 일어나는 일을 적습니다.

```html
<div style="width: 100%; max-width: 375px">
  <header class="ds-appbar">
    <div class="ds-appbar__left">
      <button type="button" class="ds-appbar__button" aria-label="닫기" data-ds-open="alert-dialog-ex2"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">후기 쓰기</h1></div>
    <div class="ds-appbar__right"></div>
  </header>
  <textarea class="ds-textarea" rows="4" aria-label="후기">배송이 빠르고 포장도 꼼꼼했어요.</textarea>
</div>
<dialog class="ds-dialog ds-alertdialog" id="alert-dialog-ex2" role="alertdialog" aria-labelledby="alert-dialog-ex2-title" aria-describedby="alert-dialog-ex2-desc">
  <div class="ds-alertdialog__header">
    <h2 id="alert-dialog-ex2-title" class="ds-alertdialog__title">후기 쓰기를 그만둘까요?</h2>
    <p id="alert-dialog-ex2-desc" class="ds-alertdialog__desc">지금 나가면 쓴 내용이 사라져요.</p>
  </div>
  <div class="ds-alertdialog__footer" data-action="pair">
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>계속 쓰기</button>
    <button class="ds-btn" data-variant="neutralSolid" data-ds-close>나가기</button>
  </div>
</dialog>
```

### 버튼 글이 길면 위아래로 쌓기

버튼 글이 길어 가로 두 칸에 들어가지 않으면 `stacked`로 위아래로 쌓습니다. 해지처럼 잃는 것이 있는 동작은 설명에 무엇이 사라지는지 적습니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">멤버십</span>
        <span class="ds-list-item__desc">다음 결제일 12월 1일</span>
      </span>
      <span class="ds-list-item__suffix">월 4,900원</span>
    </div>
  </li>
  <li>
    <button type="button" class="ds-list-item" data-ds-open="alert-dialog-ex3">
      <span class="ds-list-item__content"><span class="ds-list-item__title ds-fg-critical">멤버십 해지</span></span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </button>
  </li>
</ul>
<dialog class="ds-dialog ds-alertdialog" id="alert-dialog-ex3" role="alertdialog" aria-labelledby="alert-dialog-ex3-title" aria-describedby="alert-dialog-ex3-desc">
  <div class="ds-alertdialog__header">
    <h2 id="alert-dialog-ex3-title" class="ds-alertdialog__title">멤버십을 해지할까요?</h2>
    <p id="alert-dialog-ex3-desc" class="ds-alertdialog__desc">해지하면 남은 쿠폰 2장과 무료 배송 혜택이 사라져요.</p>
  </div>
  <div class="ds-alertdialog__footer" data-action="stacked">
    <button class="ds-btn" data-variant="neutralSolid" data-ds-close>혜택 계속 받기</button>
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>해지하고 혜택 끝내기</button>
  </div>
</dialog>
```

## 규격

### 크기와 여백

```
action(data-action): single(기본) / pair / critical / stacked / nonpreferred
Figma: 폭 272 / gap x2 / header 20/20/0/20 / gap x1_5 / title t07 Bold / desc t05 fg/neutral-muted
       footer 16/20/20/20 / 버튼 medium / single/stacked 세로 gap x2 / pair/critical 가로 2등분 gap x2 / nonpreferred 세로 gap x4
```
