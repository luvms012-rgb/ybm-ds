<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/pull-to-refresh.html -->

# Pull To Refresh

목록 맨 위에서 아래로 당기면 내용을 새로 불러오는 컴포넌트입니다.

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
| **Indicator** `ds-ptr__indicator` | 지금 상태나 위치를 알려 주는 표시입니다. |
| **Track** `ds-progress-circle__track` | 막대의 바탕입니다. |
| **Range** `ds-progress-circle__range` | 당긴 만큼 차오르는 표시입니다. |
| **Content** `ds-ptr__content` | 주된 내용이 들어가는 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `state` | pulling refreshing |

그 밖에: Progress Circle 24

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 터치로 당긴 거리 표시, 넘겨 놓으면 ds-refresh 이벤트, DS.endRefresh(요소) 로 되돌리기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 최신 내용을 다시 불러오는 목록 화면에만 씁니다. |
| **Do** | 글자를 끌어서 선택하는 영역에서는 data-disabled로 끕니다. |

## 예시

### 새 소식이 쌓이는 목록에 쓰기

알림처럼 새 내용이 계속 쌓이는 목록을 `ds-ptr`로 감쌉니다. 휴대폰에서 맨 위를 아래로 당기면 표시가 내려오고 `ds-refresh` 이벤트가 나갑니다.

```html
<div class="u-col u-full" style="max-width: 375px">
  <header class="ds-appbar">
    <div class="ds-appbar__left">
      <button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
    </div>
    <div class="ds-appbar__main">
      <h1 class="ds-appbar__title">알림</h1>
    </div>
    <div class="ds-appbar__right"></div>
  </header>
  <div class="ds-ptr">
    <div class="ds-ptr__indicator">
      <span class="ds-progress-circle" role="progressbar" aria-label="새로 고침"><svg viewBox="0 0 24 24" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
    </div>
    <div class="ds-ptr__content">
      <ul class="ds-list" data-divider>
        <li>
          <a class="ds-list-item" href="#">
            <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--book-open" aria-hidden="true"></i></span>
            <span class="ds-list-item__content">
              <span class="ds-list-item__title">수강 신청이 확정됐어요</span>
              <span class="ds-list-item__desc">영어 회화 기초, 방금</span>
            </span>
          </a>
        </li>
        <li>
          <a class="ds-list-item" href="#">
            <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--truck" aria-hidden="true"></i></span>
            <span class="ds-list-item__content">
              <span class="ds-list-item__title">주문한 교재가 출발했어요</span>
              <span class="ds-list-item__desc">1시간 전</span>
            </span>
          </a>
        </li>
        <li>
          <a class="ds-list-item" href="#">
            <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></span>
            <span class="ds-list-item__content">
              <span class="ds-list-item__title">내일 오전 10시에 시험이 있어요</span>
              <span class="ds-list-item__desc">어제</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### 글자를 고르는 화면에서는 끄기

공지 본문처럼 글자를 끌어서 고르는 영역은 `data-disabled`로 당기기를 끕니다. 글자를 고르려던 손짓이 새로 고침으로 바뀌지 않습니다.

```html
<div class="ds-ptr u-full" data-disabled style="max-width: 420px">
  <div class="ds-ptr__indicator">
    <span class="ds-progress-circle" role="progressbar" aria-label="새로 고침"><svg viewBox="0 0 24 24" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
  </div>
  <article class="ds-ptr__content u-col u-gap-4">
    <header class="u-col u-gap-2">
      <h3 class="ds-t07 ds-fw-bold">겨울 방학 특강 신청 안내</h3>
      <span class="ds-tag-group"><span>운영팀</span><span>12월 2일</span><span>조회 1,240</span></span>
    </header>
    <hr class="ds-divider">
    <p class="ds-t05">겨울 방학 특강 신청을 12월 9일 오전 10시부터 받아요. 반마다 정원이 있어 먼저 신청한 순서로 마감해요.</p>
    <p class="ds-t05">신청한 강의는 내 강의실에서 바로 확인할 수 있어요.</p>
  </article>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-ptr-size` | `calc(var(--ds-space-x6) + var(--ds-space-x8) * 2)` |
| `--ds-ptr-displacement` | `0px` |

### 크기와 여백

```
ybm-ds.js 가 터치로 당긴 거리를 --ds-ptr-displacement 에 넣고, 88 을 넘겨 놓으면 data-state="refreshing" 과 ds-refresh 이벤트.
새로 고침이 끝나면 DS.endRefresh(요소) 로 되돌린다. data-disabled 로 끈다.
Figma: 위쪽 영역 높이 x6 + x8 × 2 / Progress Circle 24 neutral, 당기는 동안 차오르고 새로 고치는 동안 회전
```
