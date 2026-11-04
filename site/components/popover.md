<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/popover.html -->

# Popover

누른 요소 옆에 작은 창을 띄워 부가 정보나 작업을 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-popover-anchor">
  <button class="ds-btn" data-variant="neutralOutline" data-ds-popover="pop-1" aria-expanded="false" aria-controls="pop-1">열기</button>
  <div class="ds-popover" id="pop-1" role="dialog" aria-labelledby="pop-1-t" hidden [data-placement="bottom-end"]>
    <div class="ds-popover__header">
      <div class="ds-popover__texts"><strong class="ds-popover__title" id="pop-1-t">제목</strong>[<p class="ds-popover__desc">설명</p>]</div>
      [<button type="button" class="ds-popover__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>]
    </div>
    <div class="ds-popover__body">본문</div>
    [<div class="ds-popover__footer"><button class="ds-btn" data-variant="neutralWeak" data-size="small">취소</button><button class="ds-btn" data-variant="neutralSolid" data-size="small">확인</button></div>]
  </div>
</span>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header**`ds-popover__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Texts**`ds-popover__texts` | 제목과 설명을 묶는 글자 영역입니다. |
| **Title**`ds-popover__title` | 제목입니다. |
| **Desc**`ds-popover__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Close**`ds-popover__close` | 닫기 버튼입니다. |
| **Body**`ds-popover__body` | 본문이 들어가는 영역입니다. |
| **Footer**`ds-popover__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `actions` | single pair none |

그 밖에: 폭 320

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- data-ds-popover="id" 로 열고 닫기, 바깥 클릭과 Esc, 안의 data-ds-close 로 닫기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | Popover는 버튼 옆에 뜨는 작은 창이고, 바깥을 누르면 닫힙니다. |
| **Do** | 화면을 막고 확인받아야 할 때는 Dialog를 씁니다. |

## 예시

### 버튼 옆에서 끝나는 작은 작업 열기

공유처럼 버튼 옆에서 끝나는 작은 작업은 Popover로 엽니다. 바깥을 누르면 닫히므로 화면을 막고 꼭 확인받아야 할 때는 Dialog를 씁니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 480px">
  <div class="u-flex u-center u-between u-gap-2">
    <span class="ds-t06 ds-fw-bold">11월 학습 계획</span>
    <span class="ds-popover-anchor">
      <button type="button" class="ds-btn" data-variant="neutralOutline" data-size="small" data-ds-popover="popover-ex1" aria-expanded="false" aria-controls="popover-ex1"><i class="ds-icon ds-icon--share" aria-hidden="true"></i>공유</button>
      <div class="ds-popover" id="popover-ex1" role="dialog" aria-labelledby="popover-ex1-title" hidden data-placement="bottom-end">
        <div class="ds-popover__header">
          <div class="ds-popover__texts">
            <strong class="ds-popover__title" id="popover-ex1-title">링크로 공유</strong>
            <p class="ds-popover__desc">링크가 있는 사람은 누구나 볼 수 있어요</p>
          </div>
          <button type="button" class="ds-popover__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
        </div>
        <div class="ds-popover__body">
          <div class="ds-input" data-variant="outline" data-size="medium">
            <input class="ds-input__control" value="https://example.com/plan/1104" readonly aria-label="공유 링크">
          </div>
        </div>
        <div class="ds-popover__footer">
          <button type="button" class="ds-btn" data-variant="neutralSolid" data-size="small" data-ds-close>링크 복사</button>
        </div>
      </div>
    </span>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li><div class="ds-list-item" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">영어 단어 30개 외우기</span><span class="ds-list-item__desc">매일</span></span></div></li>
    <li><div class="ds-list-item" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">듣기 강의 2개 듣기</span><span class="ds-list-item__desc">월, 수, 금</span></span></div></li>
    <li><div class="ds-list-item" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">모의고사 한 번 풀기</span><span class="ds-list-item__desc">토요일</span></span></div></li>
    <li><div class="ds-list-item" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">틀린 문제 다시 보기</span><span class="ds-list-item__desc">일요일</span></span></div></li>
  </ul>
</div>
```

### 닫기 버튼 대신 아래 버튼으로 닫기

필터처럼 고른 뒤 적용하는 작업은 아래에 취소와 적용 버튼을 두고 위쪽 닫기 버튼은 뺍니다. 닫기 버튼을 빼면 아래 버튼에 `data-ds-close`를 붙여 창이 꼭 닫히게 합니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 480px">
  <div class="u-flex u-center u-between u-gap-2">
    <span class="ds-t06 ds-fw-bold">주문 내역</span>
    <span class="ds-popover-anchor">
      <button type="button" class="ds-btn" data-variant="neutralOutline" data-size="small" data-ds-popover="popover-ex2" aria-expanded="false" aria-controls="popover-ex2"><i class="ds-icon ds-icon--list-filter" aria-hidden="true"></i>필터</button>
      <div class="ds-popover" id="popover-ex2" role="dialog" aria-labelledby="popover-ex2-title" hidden data-placement="bottom-end">
        <div class="ds-popover__header">
          <div class="ds-popover__texts">
            <strong class="ds-popover__title" id="popover-ex2-title">주문 상태</strong>
          </div>
        </div>
        <div class="ds-popover__body">
          <fieldset class="ds-checkbox-group" aria-labelledby="popover-ex2-title">
            <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">결제 완료</span></label>
            <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">배송 중</span></label>
            <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">배송 완료</span></label>
            <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">취소, 반품</span></label>
          </fieldset>
        </div>
        <div class="ds-popover__footer">
          <button type="button" class="ds-btn" data-variant="neutralWeak" data-size="small" data-ds-close>취소</button>
          <button type="button" class="ds-btn" data-variant="neutralSolid" data-size="small" data-ds-close>적용</button>
        </div>
      </div>
    </span>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">무선 이어폰</span><span class="ds-list-item__desc">11월 3일 주문</span></span><span class="ds-list-item__suffix">배송 중</span></a></li>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">영어 단어장 세트</span><span class="ds-list-item__desc">11월 1일 주문</span></span><span class="ds-list-item__suffix">결제 완료</span></a></li>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">가벼운 러닝화</span><span class="ds-list-item__desc">10월 28일 주문</span></span><span class="ds-list-item__suffix">배송 중</span></a></li>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">휴대용 보조 배터리</span><span class="ds-list-item__desc">10월 25일 주문</span></span><span class="ds-list-item__suffix">결제 완료</span></a></li>
  </ul>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-popover-width` | `320px` |
| `--ds-popover-gap` | `var(--ds-space-x2)` |

### 크기와 여백

```
actions: single / pair / none(footer 없음)   placement: bottom-start(기본) / bottom-end / top-start / top-end
ybm-ds.js: data-ds-popover 로 열고 닫기, 바깥 클릭과 Esc 로 닫기, 안의 data-ds-close 로 닫기.
Figma: 폭 320 / padding x5 / gap x4 / shape/xl / bg/layer-floating / 1px stroke/neutral-muted / elevation 2
  title t05 Bold fg/neutral / desc t04 fg/neutral-subtle / 글 사이 x1 / 머리말 gap x3 / 닫기 Lucide/x 20 fg/neutral
  body t04 fg/neutral / footer 오른쪽 정렬 gap x2, Action Button small
닫기 버튼을 숨기면 본문이나 버튼 영역에 닫는 동작을 꼭 둔다.
고르는 법: 짧은 설명은 Tooltip, Help Bubble / 제목과 버튼이 있는 작은 작업 창은 Popover / 화면을 막아야 하면 Dialog
```
