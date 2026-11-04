<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/date-picker-date-cell.html -->

# Date Picker · Date Cell

달력에서 날짜를 선택하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-datepicker">
  <div class="ds-datepicker__header">
    <button class="ds-datepicker__nav" aria-label="이전 달"><i class="ds-icon ds-icon--chevron-left ds-icon--lg"></i></button>
    <strong class="ds-datepicker__title">2026년 8월</strong>
    <button class="ds-datepicker__nav" aria-label="다음 달"><i class="ds-icon ds-icon--chevron-right ds-icon--lg"></i></button>
  </div>
  <div class="ds-datepicker__weekdays"><span>일</span>…<span>토</span></div>
  <div class="ds-datepicker__grid" role="grid">
    <button class="ds-date-cell" data-state="today|selected|range-start|range-middle|range-end" [disabled]>15</button> × 42
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-datepicker__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Nav**`ds-datepicker__nav` | 이전 달, 다음 달로 넘기는 버튼입니다. |
| **Title**`ds-datepicker__title` | 제목입니다. |
| **Weekdays**`ds-datepicker__weekdays` | 요일 줄입니다. |
| **Grid**`ds-datepicker__grid` | 날짜 칸 모음입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `cell state` | today selected range-start range-middle range-end |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 날짜 고르기가 화면의 주된 일이거나 흐름의 한 단계면 화면에 바로 둡니다. 폼의 입력 칸을 눌러 고를 때는 Bottom Sheet 안에 넣습니다. |
| **Do** | 여는 버튼은 Select Trigger, Text Field Input, Field Button 중 하나를 씁니다. |
| **Do** | 처음에는 오늘이 든 달을 보여 줍니다. 이미 고른 날짜가 있으면 그 달을 보여 줍니다. |
| **Do** | 기간의 최소, 최대 조건은 Callout으로 미리 알려 줍니다. 시작일만 고른 상태에서는 확인 버튼을 끕니다. |
| **Do** | 오늘을 고른 경우에는 오늘 표시보다 선택 모양을 먼저 보여 줍니다. |

## 예시

### 흐름의 한 단계로 화면에 바로 두기

날짜 고르기가 신청 흐름의 한 단계일 때는 달력을 화면에 바로 둡니다. 처음에는 오늘이 든 달을 보여 주고, 고를 수 없는 지난 날짜는 `disabled`로 막습니다.

```html
<div class="u-col u-gap-5 u-full" style="max-width: 320px">
  <div class="u-col u-gap-2">
    <h3 class="ds-t08 ds-fw-bold">시험 날짜를 골라 주세요</h3>
    <p class="ds-t04 ds-fg-subtle">지난 날짜는 고를 수 없어요.</p>
  </div>
  <div class="ds-datepicker">
    <div class="ds-datepicker__header">
      <button class="ds-datepicker__nav" aria-label="이전 달" disabled><i class="ds-icon ds-icon--chevron-left ds-icon--lg" aria-hidden="true"></i></button>
      <strong class="ds-datepicker__title">2026년 11월</strong>
      <button class="ds-datepicker__nav" aria-label="다음 달"><i class="ds-icon ds-icon--chevron-right ds-icon--lg" aria-hidden="true"></i></button>
    </div>
    <div class="ds-datepicker__weekdays"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
    <div class="ds-datepicker__grid" role="grid">
      <button class="ds-date-cell" disabled>1</button><button class="ds-date-cell" disabled>2</button><button class="ds-date-cell" disabled>3</button><button class="ds-date-cell" data-state="today">4</button><button class="ds-date-cell">5</button><button class="ds-date-cell">6</button><button class="ds-date-cell">7</button>
      <button class="ds-date-cell">8</button><button class="ds-date-cell">9</button><button class="ds-date-cell">10</button><button class="ds-date-cell">11</button><button class="ds-date-cell">12</button><button class="ds-date-cell">13</button><button class="ds-date-cell">14</button>
      <button class="ds-date-cell">15</button><button class="ds-date-cell">16</button><button class="ds-date-cell">17</button><button class="ds-date-cell">18</button><button class="ds-date-cell">19</button><button class="ds-date-cell">20</button><button class="ds-date-cell" data-state="selected">21</button>
      <button class="ds-date-cell">22</button><button class="ds-date-cell">23</button><button class="ds-date-cell">24</button><button class="ds-date-cell">25</button><button class="ds-date-cell">26</button><button class="ds-date-cell">27</button><button class="ds-date-cell">28</button>
      <button class="ds-date-cell">29</button><button class="ds-date-cell">30</button>
    </div>
  </div>
  <button class="ds-btn" data-variant="brandSolid" data-size="large" data-width="fill">다음</button>
</div>
```

### 입력 칸을 눌러 Bottom Sheet에서 고르기

폼의 날짜 칸은 Field Button으로 만들고, 누르면 Bottom Sheet 안의 달력에서 고릅니다. 오늘을 고른 경우에는 오늘 표시 대신 선택 모양만 보여 줍니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="date-picker-date-cell-ex2-field">방문 날짜</label>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <button type="button" class="ds-fieldbutton" id="date-picker-date-cell-ex2-field" data-ds-open="date-picker-date-cell-ex2-sheet" aria-haspopup="dialog">
    <span class="ds-fieldbutton__value">2026.11.04 (수)</span>
    <i class="ds-icon ds-icon--calendar" aria-hidden="true"></i>
  </button>
</div>
<dialog class="ds-bottomsheet" id="date-picker-date-cell-ex2-sheet" aria-labelledby="date-picker-date-cell-ex2-title" data-handle>
  <div class="ds-bottomsheet__header">
    <h2 class="ds-bottomsheet__title" id="date-picker-date-cell-ex2-title">방문 날짜</h2>
    <button class="ds-bottomsheet__close" data-ds-close aria-label="닫기"></button>
  </div>
  <div class="ds-bottomsheet__body">
    <div class="u-flex u-center">
      <div class="ds-datepicker">
        <div class="ds-datepicker__header">
          <button class="ds-datepicker__nav" aria-label="이전 달" disabled><i class="ds-icon ds-icon--chevron-left ds-icon--lg" aria-hidden="true"></i></button>
          <strong class="ds-datepicker__title">2026년 11월</strong>
          <button class="ds-datepicker__nav" aria-label="다음 달"><i class="ds-icon ds-icon--chevron-right ds-icon--lg" aria-hidden="true"></i></button>
        </div>
        <div class="ds-datepicker__weekdays"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
        <div class="ds-datepicker__grid" role="grid">
          <button class="ds-date-cell" disabled>1</button><button class="ds-date-cell" disabled>2</button><button class="ds-date-cell" disabled>3</button><button class="ds-date-cell" data-state="selected">4</button><button class="ds-date-cell">5</button><button class="ds-date-cell">6</button><button class="ds-date-cell">7</button>
          <button class="ds-date-cell">8</button><button class="ds-date-cell">9</button><button class="ds-date-cell">10</button><button class="ds-date-cell">11</button><button class="ds-date-cell">12</button><button class="ds-date-cell">13</button><button class="ds-date-cell">14</button>
          <button class="ds-date-cell">15</button><button class="ds-date-cell">16</button><button class="ds-date-cell">17</button><button class="ds-date-cell">18</button><button class="ds-date-cell">19</button><button class="ds-date-cell">20</button><button class="ds-date-cell">21</button>
          <button class="ds-date-cell">22</button><button class="ds-date-cell">23</button><button class="ds-date-cell">24</button><button class="ds-date-cell">25</button><button class="ds-date-cell">26</button><button class="ds-date-cell">27</button><button class="ds-date-cell">28</button>
          <button class="ds-date-cell">29</button><button class="ds-date-cell">30</button>
        </div>
      </div>
    </div>
  </div>
  <div class="ds-bottomsheet__footer">
    <button class="ds-btn" data-variant="brandSolid" data-size="large" data-ds-close>선택 완료</button>
  </div>
</dialog>
```

### 고를 수 있는 기간을 Callout으로 먼저 알리기

기간의 최대 길이 같은 조건은 달력 위 Callout으로 미리 알리고, 고른 기간은 띠로 이어 보여 줍니다. 시작일만 고른 동안에는 확인 버튼을 꺼 두고, 종료일까지 고르면 켭니다.

```html
<div class="u-col u-gap-4 u-full" style="max-width: 320px">
  <div class="ds-callout" data-tone="informative">
    <i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i>
    <p class="ds-callout__content">수강은 한 번에 7일까지 멈출 수 있어요.</p>
  </div>
  <div class="ds-datepicker">
    <div class="ds-datepicker__header">
      <button class="ds-datepicker__nav" aria-label="이전 달" disabled><i class="ds-icon ds-icon--chevron-left ds-icon--lg" aria-hidden="true"></i></button>
      <strong class="ds-datepicker__title">2026년 11월</strong>
      <button class="ds-datepicker__nav" aria-label="다음 달"><i class="ds-icon ds-icon--chevron-right ds-icon--lg" aria-hidden="true"></i></button>
    </div>
    <div class="ds-datepicker__weekdays"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
    <div class="ds-datepicker__grid" role="grid">
      <button class="ds-date-cell" disabled>1</button><button class="ds-date-cell" disabled>2</button><button class="ds-date-cell" disabled>3</button><button class="ds-date-cell" data-state="today">4</button><button class="ds-date-cell">5</button><button class="ds-date-cell">6</button><button class="ds-date-cell">7</button>
      <button class="ds-date-cell" data-state="range-start">8</button><button class="ds-date-cell" data-state="range-middle">9</button><button class="ds-date-cell" data-state="range-middle">10</button><button class="ds-date-cell" data-state="range-middle">11</button><button class="ds-date-cell" data-state="range-middle">12</button><button class="ds-date-cell" data-state="range-middle">13</button><button class="ds-date-cell" data-state="range-end">14</button>
      <button class="ds-date-cell">15</button><button class="ds-date-cell">16</button><button class="ds-date-cell">17</button><button class="ds-date-cell">18</button><button class="ds-date-cell">19</button><button class="ds-date-cell">20</button><button class="ds-date-cell">21</button>
      <button class="ds-date-cell">22</button><button class="ds-date-cell">23</button><button class="ds-date-cell">24</button><button class="ds-date-cell">25</button><button class="ds-date-cell">26</button><button class="ds-date-cell">27</button><button class="ds-date-cell">28</button>
      <button class="ds-date-cell">29</button><button class="ds-date-cell">30</button>
    </div>
  </div>
  <button class="ds-btn" data-variant="brandSolid" data-size="large" data-width="fill">11월 8일부터 7일 멈추기</button>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-date-pill-bg` | `transparent` |
| `--ds-date-pill-line` | `transparent` |
| `--ds-date-track` | `transparent` |

### 크기와 여백

```
selection: single / range
Figma: 폭 320 / padding x5 / gap x3 / shape/2xl / bg/layer-default / elevation overlay(+헤어라인)
  header h40 / 이동 버튼 24 폭 / chevron 24 fg/neutral / title t06 Bold 가운데
  요일 t04 fg/neutral-subtle / 셀 40×44 / pill 32×32 shape/xl / label t05
  today pill 1px stroke/brand-solid + fg/brand Medium / selected pill bg/brand-solid + fg/on-brand-solid Medium
  range 띠 bg/brand-weak 32 높이 (start 오른쪽 절반 / end 왼쪽 절반 / middle 전체, middle 글자 fg/brand) / disabled fg/disabled
```
