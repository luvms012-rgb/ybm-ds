<!-- https://luvms012-rgb.github.io/yds/site/components/time-picker.html -->

# Time Picker

휠을 굴려 시간을 선택하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-timepicker" role="group" aria-label="시간" [aria-disabled="true"]>
  <div class="ds-timepicker__column" role="listbox" aria-label="오전/오후" tabindex="0">
    <div class="ds-timepicker__option" role="option">오전</div>
    <div class="ds-timepicker__option" role="option" aria-selected="true">오후</div>
  </div>
  <div class="ds-timepicker__column" role="listbox" aria-label="시" tabindex="0">… 1 ~ 12</div>
  <div class="ds-timepicker__column" role="listbox" aria-label="분" tabindex="0">… 00, 05 ~ 55</div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Column** `ds-timepicker__column` | 시, 분처럼 값을 고르는 열입니다. |
| **Option** `ds-timepicker__option` | 고를 수 있는 선택지 하나입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `state` | enabled disabled |

그 밖에: 12시간제, 분 간격 5

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 가운데 온 항목에 aria-selected, 멈추면 열에서 change(detail.value), 항목 누름과 화살표 키로 이동

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 시간 고르기가 화면의 주된 일이면 화면에 바로 둡니다. |
| **Do** | 입력 칸에서 고를 때는 Bottom Sheet 안에 넣고, Field Button을 눌러 엽니다. |

## 예시

### 알림 시간을 화면에서 바로 고르기

시간 고르기가 화면의 주된 일이라 Time Picker를 화면에 바로 둡니다. 휠을 굴리거나 항목을 눌러 오전/오후, 시, 분을 고릅니다.

```html
<div class="u-col u-gap-6" style="width: 100%; max-width: 360px">
  <div class="u-col u-gap-2">
    <h3 class="ds-t08 ds-fw-bold">학습 알림 시간을 골라 주세요</h3>
    <p class="ds-t04 ds-fg-muted">매일 이 시간에 오늘 할 공부를 알려 줘요.</p>
  </div>
  <div class="ds-timepicker" role="group" aria-label="알림 시간">
    <div class="ds-timepicker__column" role="listbox" aria-label="오전/오후" tabindex="0">
      <div class="ds-timepicker__option" role="option">오전</div>
      <div class="ds-timepicker__option" role="option" aria-selected="true">오후</div>
    </div>
    <div class="ds-timepicker__column" role="listbox" aria-label="시" tabindex="0">
      <div class="ds-timepicker__option" role="option">1</div>
      <div class="ds-timepicker__option" role="option">2</div>
      <div class="ds-timepicker__option" role="option">3</div>
      <div class="ds-timepicker__option" role="option">4</div>
      <div class="ds-timepicker__option" role="option">5</div>
      <div class="ds-timepicker__option" role="option">6</div>
      <div class="ds-timepicker__option" role="option">7</div>
      <div class="ds-timepicker__option" role="option">8</div>
      <div class="ds-timepicker__option" role="option" aria-selected="true">9</div>
      <div class="ds-timepicker__option" role="option">10</div>
      <div class="ds-timepicker__option" role="option">11</div>
      <div class="ds-timepicker__option" role="option">12</div>
    </div>
    <div class="ds-timepicker__column" role="listbox" aria-label="분" tabindex="0">
      <div class="ds-timepicker__option" role="option" aria-selected="true">00</div>
      <div class="ds-timepicker__option" role="option">05</div>
      <div class="ds-timepicker__option" role="option">10</div>
      <div class="ds-timepicker__option" role="option">15</div>
      <div class="ds-timepicker__option" role="option">20</div>
      <div class="ds-timepicker__option" role="option">25</div>
      <div class="ds-timepicker__option" role="option">30</div>
      <div class="ds-timepicker__option" role="option">35</div>
      <div class="ds-timepicker__option" role="option">40</div>
      <div class="ds-timepicker__option" role="option">45</div>
      <div class="ds-timepicker__option" role="option">50</div>
      <div class="ds-timepicker__option" role="option">55</div>
    </div>
  </div>
  <button type="button" class="ds-btn" data-size="large" data-width="fill">저장</button>
</div>
```

### 입력 칸을 누르면 시트에서 고르기

폼 안에서는 Field Button을 누르면 Bottom Sheet가 열리고 그 안에서 시간을 고릅니다. 날짜, 장소처럼 다른 입력 칸과 함께 있는 예약 화면에 씁니다.

```html
<div class="ds-field" style="width: 100%; max-width: 360px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="time-picker-ex2-label">상담 시간</span>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <button type="button" class="ds-fieldbutton" data-size="large" aria-labelledby="time-picker-ex2-label" data-ds-open="time-picker-ex2-sheet">
    <i class="ds-icon ds-icon--clock" aria-hidden="true"></i>
    <span class="ds-fieldbutton__value" data-placeholder="시간을 골라 주세요"></span>
    <i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i>
  </button>
</div>
<dialog class="ds-bottomsheet" id="time-picker-ex2-sheet" aria-labelledby="time-picker-ex2-title" data-handle>
  <div class="ds-bottomsheet__header">
    <h2 class="ds-bottomsheet__title" id="time-picker-ex2-title">상담 시간</h2>
    <button class="ds-bottomsheet__close" data-ds-close aria-label="닫기"></button>
  </div>
  <div class="ds-bottomsheet__body">
    <div class="ds-timepicker" role="group" aria-label="상담 시간">
      <div class="ds-timepicker__column" role="listbox" aria-label="오전/오후" tabindex="0">
        <div class="ds-timepicker__option" role="option">오전</div>
        <div class="ds-timepicker__option" role="option">오후</div>
      </div>
      <div class="ds-timepicker__column" role="listbox" aria-label="시" tabindex="0">
        <div class="ds-timepicker__option" role="option">1</div>
        <div class="ds-timepicker__option" role="option">2</div>
        <div class="ds-timepicker__option" role="option">3</div>
        <div class="ds-timepicker__option" role="option">4</div>
        <div class="ds-timepicker__option" role="option">5</div>
        <div class="ds-timepicker__option" role="option">6</div>
        <div class="ds-timepicker__option" role="option">7</div>
        <div class="ds-timepicker__option" role="option">8</div>
        <div class="ds-timepicker__option" role="option">9</div>
        <div class="ds-timepicker__option" role="option">10</div>
        <div class="ds-timepicker__option" role="option">11</div>
        <div class="ds-timepicker__option" role="option">12</div>
      </div>
      <div class="ds-timepicker__column" role="listbox" aria-label="분" tabindex="0">
        <div class="ds-timepicker__option" role="option">00</div>
        <div class="ds-timepicker__option" role="option">05</div>
        <div class="ds-timepicker__option" role="option">10</div>
        <div class="ds-timepicker__option" role="option">15</div>
        <div class="ds-timepicker__option" role="option">20</div>
        <div class="ds-timepicker__option" role="option">25</div>
        <div class="ds-timepicker__option" role="option">30</div>
        <div class="ds-timepicker__option" role="option">35</div>
        <div class="ds-timepicker__option" role="option">40</div>
        <div class="ds-timepicker__option" role="option">45</div>
        <div class="ds-timepicker__option" role="option">50</div>
        <div class="ds-timepicker__option" role="option">55</div>
      </div>
    </div>
  </div>
  <div class="ds-bottomsheet__footer"><button class="ds-btn" data-variant="neutralSolid" data-size="large" data-ds-close>확인</button></div>
</dialog>
```

## 규격

### 크기와 여백

```
ybm-ds.js 가 가운데 온 항목에 aria-selected 를 붙이고 열에서 change 이벤트(detail.value)를 보낸다.
처음 값은 aria-selected="true" 로 표시해 두면 그 위치로 맞춰 준다. 분 간격은 넣는 항목으로 정한다(기본 5분).
Figma: 폭 320(채움) / 높이 220 = 항목 5줄 × x11 / 좌우 x4 / 열 간격 x2
  가운데 띠 bg/neutral-weak-alpha shape/md
  가운데 t07 SemiBold fg/neutral / 바로 위아래 t06 fg/neutral-muted / 그 밖 t05 fg/neutral-subtle / disabled 모두 fg/disabled
모바일 입력 필드에서는 Field Button + Bottom Sheet 안에 넣어 쓴다.
```
