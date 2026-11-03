<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/date-picker-date-cell.html -->

# Date Picker · Date Cell

달력에서 날짜를 선택하는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `cell state` | today selected range-start range-middle range-end |

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-date-pill-bg` | `transparent` |
| `--ds-date-pill-line` | `transparent` |
| `--ds-date-track` | `transparent` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 날짜 고르기가 화면의 주된 일이거나 단계별 흐름의 한 단계면 화면에 바로 둡니다. 폼의 입력 칸을 눌러 고를 때는 Bottom Sheet 안에 넣습니다. |
| **Do** | 여는 버튼은 Select Trigger, Text Field Input, Field Button 중 하나를 씁니다. |
| **Do** | 처음에는 오늘이 있는 달을 보여 주고, 이미 고른 날짜가 있으면 그 달을 보여 줍니다. |
| **Do** | 기간의 최소, 최대 조건은 Callout으로 미리 알려 줍니다. 시작일만 고른 상태에서는 확인 버튼을 끕니다. |
| **Do** | 오늘이 선택된 날짜이기도 하면 선택 모양을 먼저 보여 줍니다. |

## 예시

```html
<div class="ds-datepicker">
  <div class="ds-datepicker__header"><button class="ds-datepicker__nav" aria-label="이전 달"><i class="ds-icon ds-icon--chevron-left ds-icon--lg" aria-hidden="true"></i></button><strong class="ds-datepicker__title">2026년 10월</strong><button class="ds-datepicker__nav" aria-label="다음 달"><i class="ds-icon ds-icon--chevron-right ds-icon--lg" aria-hidden="true"></i></button></div>
  <div class="ds-datepicker__weekdays"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
  <div class="ds-datepicker__grid" role="grid" id="pv-cal"></div>
</div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
selection: single / range
Figma: 폭 320 / padding x5 / gap x3 / shape/2xl / bg/layer-default / elevation overlay(+헤어라인)
  header h40 / 이동 버튼 24 폭 / chevron 24 fg/neutral / title t06 Bold 가운데
  요일 t04 fg/neutral-subtle / 셀 40×44 / pill 32×32 shape/xl / label t05
  today pill 1px stroke/brand-solid + fg/brand Medium / selected pill bg/brand-solid + fg/on-brand-solid Medium
  range 띠 bg/brand-weak 32 높이 (start 오른쪽 절반 / end 왼쪽 절반 / middle 전체, middle 글자 fg/brand) / disabled fg/disabled
```
