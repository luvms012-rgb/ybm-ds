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
