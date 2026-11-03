<!-- https://luvms012-rgb.github.io/ybm-ds/site/get-started/scripts.html -->

# Scripts

`ybm-ds.js`는 창 열기, 알림처럼 CSS만으로는 할 수 없는 동작을 맡습니다. 불러오기만 하면 HTML 속성을 보고 알아서 동작합니다.

## 하는 일

| 부품 | 하는 일 |
| --- | --- |
| **Text Field clear 버튼** | 값 지우기 (노출/숨김은 CSS 가 처리) |
| **Dialog** | data-ds-open / data-ds-close 속성으로 열고 닫기, 바깥(dim) 클릭 닫기 |
| **Snackbar** | YBM.snackbar("문구", { variant: "positive"\|"critical", action: "확인", onAction, duration }) |
| **Slider** | <input class="ds-slider"> 채움 길이(--ds-slider-value) 동기화 |
| **Checkbox** | data-indeterminate 속성 → input.indeterminate |
| **Popover** | data-ds-popover="id" 로 열고 닫기, 바깥 클릭과 Esc, 안의 data-ds-close 로 닫기 |
| **Time Picker** | 가운데 온 항목에 aria-selected, 멈추면 열에서 change(detail.value), 항목 누름과 화살표 키로 이동 |
| **Chat Composer** | 입력이 비면 보내기 비활성, field-sizing 이 없는 브라우저에서 높이 맞춤 |
| **Search Suggestion** | 입력 칸(role=combobox, aria-controls)에서 위아래 화살표로 줄 고르기, Enter 로 그 줄 누르기 |
| **Menu Sheet** | Dialog 와 같이 열고 닫기, 바깥(dim) 클릭 닫기 |
| **Timer** | data-start(흐른 시간) / data-end(남은 시간)로 1초마다 글자를 바꾸고, 남은 시간이 0 이면 ds-timer-end 이벤트 |
| **Segmented Control** | 누르면 하나만 aria-pressed, change 이벤트. 선택 배경이 고른 항목으로 미끄러져 이동(위치는 --ds-seg-x / --ds-seg-w) |
| **Side Panel** | Dialog 와 같이 열고 닫기, 본문이 스크롤되면 data-scrolled |
| **Pull To Refresh** | 터치로 당긴 거리 표시, 넘겨 놓으면 ds-refresh 이벤트, YBM.endRefresh(요소) 로 되돌리기 |
| **Carousel** | 처음/끝이면 data-at-start / data-at-end, 버튼으로 한 화면씩 넘기기 |
| **Code Block** | data-ds-copy 버튼으로 코드 복사 |
| **Multi Select** | Popover 와 같이 열고 닫기, 고른 값을 칸에 Badge 로 채우기 |
| **File Attach** | 파일을 끌어 놓는 칸 위로 끌고 오면 data-state="dragover", 벗어나거나 놓으면 뺀다 |

## 직접 사용

| 기능 | 사용방법 |
| --- | --- |
| 창 열기, 닫기 | `YBM.openDialog(요소)`, `YBM.closeDialog(요소)` |
| 알림 띄우기 | `YBM.snackbar("저장했어요", { variant: "positive" })` |
| 새로 고침 끝내기 | `YBM.endRefresh(요소)` |
| 나중에 넣은 HTML 연결 | `YBM.init(요소)` |

```html
<button class="ds-btn" data-ds-open="confirm">열기</button>
<dialog class="ds-dialog" id="confirm">… <button class="ds-btn" data-ds-close>닫기</button></dialog>

<script>
  YBM.snackbar("저장했어요", { variant: "positive", action: "확인" });
</script>
```
