<!-- https://luvms012-rgb.github.io/yds/site/components/wheel-picker.html -->

# Wheel Picker

돌려서 날짜나 숫자 같은 값 하나를 고르는 휠입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-wheelpicker" role="group" aria-label="생년월일" [aria-disabled="true"]>
  <div class="ds-wheelpicker__column" role="listbox" aria-label="연" tabindex="0">
    <div class="ds-wheelpicker__option" role="option" [data-value="1990"]>1990년</div>
    <div class="ds-wheelpicker__option" role="option" aria-selected="true">1991년</div> …
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Column** `ds-wheelpicker__column` | 시, 분처럼 값을 고르는 열입니다. |
| **Option** `ds-wheelpicker__option` | 고를 수 있는 선택지 하나입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 열 여러 개, `aria-selected`, change 이벤트(Time Picker 와 같은 휠)

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- Time Picker 와 같은 휠

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 차례로 이어진 값을 고를 때 씁니다. |
| **Do** | 모바일에서는 Field Button 을 눌러 Bottom Sheet 안에서 엽니다. |
| **Do** | 시간을 고를 때는 Time Picker 를 씁니다. |
| **Don't** | 고를 값이 몇 개 안 되면 휠을 쓰지 않습니다. 그때는 Radio Group 이나 Select 를 씁니다. |

## 예시

### 바텀 시트 안에서 생년월일 고르기

모바일에서는 칸을 눌러 바텀 시트를 열고 그 안에서 돌려 고릅니다. 다 고르면 아래 버튼으로 닫습니다.

```html
<div class="ds-bottomsheet" style="position: relative; inset: auto; display: flex; width: 100%; max-width: 375px; transform: none"><div class="ds-bottomsheet__header"><h2 class="ds-bottomsheet__title">생년월일</h2></div><div class="ds-bottomsheet__body"><div class="ds-wheelpicker" role="group" aria-label="생년월일"><div class="ds-wheelpicker__column" role="listbox" aria-label="연" tabindex="0"><div class="ds-wheelpicker__option" role="option">1990년</div><div class="ds-wheelpicker__option" role="option">1991년</div><div class="ds-wheelpicker__option" role="option">1992년</div><div class="ds-wheelpicker__option" role="option">1993년</div><div class="ds-wheelpicker__option" role="option">1994년</div><div class="ds-wheelpicker__option" role="option">1995년</div><div class="ds-wheelpicker__option" role="option">1996년</div><div class="ds-wheelpicker__option" role="option">1997년</div><div class="ds-wheelpicker__option" role="option">1998년</div><div class="ds-wheelpicker__option" role="option">1999년</div><div class="ds-wheelpicker__option" role="option">2000년</div><div class="ds-wheelpicker__option" role="option" aria-selected="true">2001년</div><div class="ds-wheelpicker__option" role="option">2002년</div><div class="ds-wheelpicker__option" role="option">2003년</div><div class="ds-wheelpicker__option" role="option">2004년</div><div class="ds-wheelpicker__option" role="option">2005년</div><div class="ds-wheelpicker__option" role="option">2006년</div><div class="ds-wheelpicker__option" role="option">2007년</div><div class="ds-wheelpicker__option" role="option">2008년</div><div class="ds-wheelpicker__option" role="option">2009년</div><div class="ds-wheelpicker__option" role="option">2010년</div></div><div class="ds-wheelpicker__column" role="listbox" aria-label="월" tabindex="0"><div class="ds-wheelpicker__option" role="option">1월</div><div class="ds-wheelpicker__option" role="option">2월</div><div class="ds-wheelpicker__option" role="option">3월</div><div class="ds-wheelpicker__option" role="option">4월</div><div class="ds-wheelpicker__option" role="option" aria-selected="true">5월</div><div class="ds-wheelpicker__option" role="option">6월</div><div class="ds-wheelpicker__option" role="option">7월</div><div class="ds-wheelpicker__option" role="option">8월</div><div class="ds-wheelpicker__option" role="option">9월</div><div class="ds-wheelpicker__option" role="option">10월</div><div class="ds-wheelpicker__option" role="option">11월</div><div class="ds-wheelpicker__option" role="option">12월</div></div><div class="ds-wheelpicker__column" role="listbox" aria-label="일" tabindex="0"><div class="ds-wheelpicker__option" role="option">1일</div><div class="ds-wheelpicker__option" role="option">2일</div><div class="ds-wheelpicker__option" role="option">3일</div><div class="ds-wheelpicker__option" role="option">4일</div><div class="ds-wheelpicker__option" role="option">5일</div><div class="ds-wheelpicker__option" role="option">6일</div><div class="ds-wheelpicker__option" role="option">7일</div><div class="ds-wheelpicker__option" role="option">8일</div><div class="ds-wheelpicker__option" role="option">9일</div><div class="ds-wheelpicker__option" role="option">10일</div><div class="ds-wheelpicker__option" role="option">11일</div><div class="ds-wheelpicker__option" role="option">12일</div><div class="ds-wheelpicker__option" role="option">13일</div><div class="ds-wheelpicker__option" role="option">14일</div><div class="ds-wheelpicker__option" role="option">15일</div><div class="ds-wheelpicker__option" role="option">16일</div><div class="ds-wheelpicker__option" role="option" aria-selected="true">17일</div><div class="ds-wheelpicker__option" role="option">18일</div><div class="ds-wheelpicker__option" role="option">19일</div><div class="ds-wheelpicker__option" role="option">20일</div><div class="ds-wheelpicker__option" role="option">21일</div><div class="ds-wheelpicker__option" role="option">22일</div><div class="ds-wheelpicker__option" role="option">23일</div><div class="ds-wheelpicker__option" role="option">24일</div><div class="ds-wheelpicker__option" role="option">25일</div><div class="ds-wheelpicker__option" role="option">26일</div><div class="ds-wheelpicker__option" role="option">27일</div><div class="ds-wheelpicker__option" role="option">28일</div><div class="ds-wheelpicker__option" role="option">29일</div><div class="ds-wheelpicker__option" role="option">30일</div><div class="ds-wheelpicker__option" role="option">31일</div></div></div></div><div class="ds-bottomsheet__footer"><button type="button" class="ds-btn" data-variant="neutralSolid" data-size="large" data-width="fill">확인</button></div></div>
```

### 숫자와 단위 고르기

이어진 숫자 하나를 고를 때는 열 하나로 둡니다. 단위는 항목 글자에 함께 적습니다.

```html
<div class="ds-wheelpicker" style="max-width: 240px" role="group" aria-label="키"><div class="ds-wheelpicker__column" role="listbox" aria-label="키" tabindex="0"><div class="ds-wheelpicker__option" role="option">150cm</div><div class="ds-wheelpicker__option" role="option">151cm</div><div class="ds-wheelpicker__option" role="option">152cm</div><div class="ds-wheelpicker__option" role="option">153cm</div><div class="ds-wheelpicker__option" role="option">154cm</div><div class="ds-wheelpicker__option" role="option">155cm</div><div class="ds-wheelpicker__option" role="option">156cm</div><div class="ds-wheelpicker__option" role="option">157cm</div><div class="ds-wheelpicker__option" role="option">158cm</div><div class="ds-wheelpicker__option" role="option">159cm</div><div class="ds-wheelpicker__option" role="option">160cm</div><div class="ds-wheelpicker__option" role="option">161cm</div><div class="ds-wheelpicker__option" role="option">162cm</div><div class="ds-wheelpicker__option" role="option">163cm</div><div class="ds-wheelpicker__option" role="option">164cm</div><div class="ds-wheelpicker__option" role="option">165cm</div><div class="ds-wheelpicker__option" role="option">166cm</div><div class="ds-wheelpicker__option" role="option">167cm</div><div class="ds-wheelpicker__option" role="option">168cm</div><div class="ds-wheelpicker__option" role="option">169cm</div><div class="ds-wheelpicker__option" role="option" aria-selected="true">170cm</div><div class="ds-wheelpicker__option" role="option">171cm</div><div class="ds-wheelpicker__option" role="option">172cm</div><div class="ds-wheelpicker__option" role="option">173cm</div><div class="ds-wheelpicker__option" role="option">174cm</div><div class="ds-wheelpicker__option" role="option">175cm</div><div class="ds-wheelpicker__option" role="option">176cm</div><div class="ds-wheelpicker__option" role="option">177cm</div><div class="ds-wheelpicker__option" role="option">178cm</div><div class="ds-wheelpicker__option" role="option">179cm</div><div class="ds-wheelpicker__option" role="option">180cm</div><div class="ds-wheelpicker__option" role="option">181cm</div><div class="ds-wheelpicker__option" role="option">182cm</div><div class="ds-wheelpicker__option" role="option">183cm</div><div class="ds-wheelpicker__option" role="option">184cm</div><div class="ds-wheelpicker__option" role="option">185cm</div><div class="ds-wheelpicker__option" role="option">186cm</div><div class="ds-wheelpicker__option" role="option">187cm</div><div class="ds-wheelpicker__option" role="option">188cm</div><div class="ds-wheelpicker__option" role="option">189cm</div><div class="ds-wheelpicker__option" role="option">190cm</div></div></div>
```

## 규격

### 크기와 여백

```
    열 수만큼
모양과 동작은 Time Picker 와 같고 규칙도 함께 쓴다(50 Time Picker). 시간을 고를 때는 Time Picker 를 쓴다
ybm-ds.js 가 가운데 온 항목에 aria-selected 를 붙이고 멈추면 열에서 change(detail.value)를 보낸다
Figma: 폭 채움 / 높이 220 = 항목 5줄 x x11 / 좌우 x4 / 열 간격 x2 / 가운데 띠 bg/neutral-weak-alpha shape/md
```
