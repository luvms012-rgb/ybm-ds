<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/time-picker.html -->

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
| **Column**`ds-timepicker__column` | 시, 분처럼 값을 고르는 열입니다. |
| **Option**`ds-timepicker__option` | 고를 수 있는 선택지 하나입니다. |

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

```html
<div class="ds-timepicker" role="group" aria-label="시간" id="pv-tp">
  <div class="ds-timepicker__column" role="listbox" aria-label="오전/오후" tabindex="0"><div class="ds-timepicker__option" role="option" aria-selected="true">오전</div><div class="ds-timepicker__option" role="option">오후</div></div>
  <div class="ds-timepicker__column" role="listbox" aria-label="시" tabindex="0" data-pv-fill="1-12" data-pv-sel="10"></div>
  <div class="ds-timepicker__column" role="listbox" aria-label="분" tabindex="0" data-pv-fill="0-55-5" data-pv-sel="30"></div>
</div>
<div class="ds-timepicker" role="group" aria-label="시간" aria-disabled="true">
  <div class="ds-timepicker__column" role="listbox" aria-label="오전/오후"><div class="ds-timepicker__option" role="option" aria-selected="true">오전</div><div class="ds-timepicker__option" role="option">오후</div></div>
  <div class="ds-timepicker__column" role="listbox" aria-label="시" data-pv-fill="1-12" data-pv-sel="10"></div>
  <div class="ds-timepicker__column" role="listbox" aria-label="분" data-pv-fill="0-55-5" data-pv-sel="30"></div>
</div>
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
