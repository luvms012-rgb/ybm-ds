<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/snackbar.html -->

# Snackbar

작업 결과를 화면 아래에 잠깐 띄워 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-snackbar" role="status" data-variant="positive" data-state="open">
  <i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i>
  <span class="ds-snackbar__message">저장했어요</span>
  [<button type="button" class="ds-snackbar__action">확인</button>]
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Message**`ds-snackbar__message` | 알릴 내용을 담은 글입니다. |
| **Action**`ds-snackbar__action` | 바로 실행하는 작은 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | default positive critical |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- DS.snackbar("문구", { variant: "positive"|"critical", action: "확인", onAction, duration })

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 4초 동안 보이고, 한 번에 하나만 띄웁니다. |

## 예시

### 저장한 결과를 짧게 알리기

저장 버튼을 누르면 화면 아래에 결과를 한 줄로 알립니다. 4초 뒤 저절로 사라지므로 사용자가 닫지 않아도 되는 알림에 씁니다.

```html
<div class="u-col u-gap-5" style="width: 100%; max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="snackbar-ex1-name">닉네임</label>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="snackbar-ex1-name" value="하늘빛공부">
    </div>
    <div class="ds-field__footer">
      <p class="ds-field__help">게시판과 댓글에 보이는 이름이에요.</p>
    </div>
  </div>
  <button type="button" class="ds-btn" data-size="large" data-width="fill" onclick="DS.snackbar('저장했어요', { variant: 'positive' })">저장</button>
</div>
```

### 지운 직후 되돌릴 기회 주기

알림을 지우면 되돌리기 버튼 하나를 붙여 알립니다. 확인 창으로 흐름을 막지 않으면서 실수를 바로잡을 길을 남길 때 씁니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">주문한 상품이 출발했어요</span>
        <span class="ds-list-item__desc">오늘 오전 9:12</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="알림 지우기" onclick="DS.snackbar('알림을 지웠어요', { action: '되돌리기' })"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i></button>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">할인 쿠폰이 3일 뒤 사라져요</span>
        <span class="ds-list-item__desc">어제 오후 6:30</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="알림 지우기" onclick="DS.snackbar('알림을 지웠어요', { action: '되돌리기' })"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i></button>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">1:1 문의에 답변이 달렸어요</span>
        <span class="ds-list-item__desc">11월 2일</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="알림 지우기" onclick="DS.snackbar('알림을 지웠어요', { action: '되돌리기' })"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i></button>
      </span>
    </div>
  </li>
</ul>
```

### 실패하면 다시 시도하게 하기

요청이 실패하면 critical 아이콘과 다시 시도 버튼을 함께 띄웁니다. 문구에는 왜 안 됐는지를 짧게 적고 버튼으로 바로 다시 하게 합니다.
