<!-- https://luvms012-rgb.github.io/yds/site/components/side-panel.html -->

# Side Panel

PC 화면 가장자리에서 밀려 나오는 창입니다. 지금 화면을 그대로 둔 채 자세한 정보나 작업을 보여 줄 때 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<dialog class="ds-sidepanel" id="sp" aria-labelledby="sp-t" [data-size="small"] [data-direction="left"]>
  <div class="ds-sidepanel__header">
    <div class="ds-sidepanel__texts"><h2 class="ds-sidepanel__title" id="sp-t">제목</h2>[<p class="ds-sidepanel__desc">설명</p>]</div>
    <button type="button" class="ds-sidepanel__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
  </div>
  <div class="ds-sidepanel__body">…</div>
  [<div class="ds-sidepanel__footer">…버튼…</div>]
</dialog>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header** `ds-sidepanel__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Texts** `ds-sidepanel__texts` | 제목과 설명을 묶는 글자 영역입니다. |
| **Title** `ds-sidepanel__title` | 제목입니다. |
| **Desc** `ds-sidepanel__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Close** `ds-sidepanel__close` | 닫기 버튼입니다. |
| **Body** `ds-sidepanel__body` | 본문이 들어가는 영역입니다. |
| **Footer** `ds-sidepanel__footer` | 버튼이나 보조 정보가 놓이는 아래 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | small medium large |
| `direction` | right left |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- Dialog 와 같이 열고 닫기, 본문이 스크롤되면 data-scrolled

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | PC 화면 옆에 보조 내용이나 필터를 둘 때 Side Panel을 씁니다. |
| **Do** | 화면이 좁으면 Bottom Sheet로 바꿉니다. |

## 예시

### 목록을 둔 채 옆에서 필터 고르기

PC 화면에서 목록을 가리지 않고 필터를 고르게 할 때 Side Panel을 씁니다. 화면이 좁은 모바일에서는 같은 내용을 Bottom Sheet에 담습니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 480px">
  <div class="u-flex u-center u-between">
    <span class="ds-t04 ds-fg-muted">강의 32개</span>
    <button type="button" class="ds-btn" data-variant="neutralOutline" data-size="small" data-ds-open="side-panel-ex1"><i class="ds-icon ds-icon--list-filter" aria-hidden="true"></i>필터</button>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">영어 회화 기초</span><span class="ds-list-item__desc">어학, 3개월</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">컴퓨터 활용 실무</span><span class="ds-list-item__desc">자격증, 1개월</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
  </ul>
  <dialog class="ds-sidepanel" id="side-panel-ex1" data-size="small" aria-labelledby="side-panel-ex1-title">
    <div class="ds-sidepanel__header">
      <div class="ds-sidepanel__texts">
        <h2 class="ds-sidepanel__title" id="side-panel-ex1-title">필터</h2>
        <p class="ds-sidepanel__desc">원하는 조건을 골라 주세요</p>
      </div>
      <button type="button" class="ds-sidepanel__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
    <div class="ds-sidepanel__body u-col u-gap-8">
      <div class="ds-field">
        <div class="ds-field__header">
          <span class="ds-field__label" id="side-panel-ex1-field">분야</span>
        </div>
        <fieldset class="ds-checkbox-group" aria-labelledby="side-panel-ex1-field">
          <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span>어학</span></label>
          <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span>자격증</span></label>
          <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span>취업</span></label>
          <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span>컴퓨터</span></label>
        </fieldset>
      </div>
      <div class="ds-field">
        <div class="ds-field__header">
          <span class="ds-field__label" id="side-panel-ex1-period">수강 기간</span>
        </div>
        <div class="ds-radio-group" role="radiogroup" aria-labelledby="side-panel-ex1-period">
          <label class="ds-radio"><input type="radio" class="ds-radio__control" name="side-panel-ex1-period" checked><span>전체</span></label>
          <label class="ds-radio"><input type="radio" class="ds-radio__control" name="side-panel-ex1-period"><span>1개월 이하</span></label>
          <label class="ds-radio"><input type="radio" class="ds-radio__control" name="side-panel-ex1-period"><span>3개월 이하</span></label>
        </div>
      </div>
    </div>
    <div class="ds-sidepanel__footer">
      <button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium">초기화</button>
      <button type="button" class="ds-btn" data-variant="neutralSolid" data-size="medium" data-ds-close>강의 32개 보기</button>
    </div>
  </dialog>
</div>
```

### 보조 내용을 옆에 모아 보여 주기

알림처럼 하던 일과 따로 보는 보조 내용은 Side Panel에 모읍니다. 닫으면 보던 화면이 그대로 남아 있어 하던 일로 바로 돌아갑니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 480px">
  <div class="u-flex u-center u-between">
    <h3 class="ds-t07 ds-fw-bold">내 강의실</h3>
    <button type="button" class="ds-btn" data-variant="ghost" data-layout="iconOnly" aria-label="알림 열기" data-ds-open="side-panel-ex2"><i class="ds-icon ds-icon--bell" aria-hidden="true"></i></button>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">영어 회화 기초</span><span class="ds-list-item__desc">9강부터 이어서 보기</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
    <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">비즈니스 이메일 쓰기</span><span class="ds-list-item__desc">16강부터 이어서 보기</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
  </ul>
  <dialog class="ds-sidepanel" id="side-panel-ex2" data-size="small" aria-labelledby="side-panel-ex2-title">
    <div class="ds-sidepanel__header">
      <div class="ds-sidepanel__texts">
        <h2 class="ds-sidepanel__title" id="side-panel-ex2-title">알림</h2>
      </div>
      <button type="button" class="ds-sidepanel__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
    <div class="ds-sidepanel__body">
      <ul class="ds-list" data-variant="inset" data-divider>
        <li><a class="ds-list-item" href="#"><span class="ds-list-item__prefix"><i class="ds-icon ds-icon--book-open" aria-hidden="true"></i></span><span class="ds-list-item__content"><span class="ds-list-item__title">수강 신청이 확정됐어요</span><span class="ds-list-item__desc">방금</span></span></a></li>
        <li><a class="ds-list-item" href="#"><span class="ds-list-item__prefix"><i class="ds-icon ds-icon--truck" aria-hidden="true"></i></span><span class="ds-list-item__content"><span class="ds-list-item__title">주문한 교재가 출발했어요</span><span class="ds-list-item__desc">1시간 전</span></span></a></li>
        <li><a class="ds-list-item" href="#"><span class="ds-list-item__prefix"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></span><span class="ds-list-item__content"><span class="ds-list-item__title">내일 오전 10시에 시험이 있어요</span><span class="ds-list-item__desc">어제</span></span></a></li>
      </ul>
    </div>
  </dialog>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-sidepanel-width` | `720px` |

### 크기와 여백

```
네이티브 <dialog> 를 쓴다. data-ds-open 으로 열고, data-ds-close 와 바깥 누르기로 닫는다.
size: small 480 / 기본 medium 720 / large 960 (화면의 80% 를 넘지 않음)   direction: 기본 오른쪽 / data-direction="left"
본문이 스크롤되면 ybm-ds.js 가 data-scrolled 를 붙여 본문 위에 1px 선이 생긴다. 화면이 좁으면 Bottom Sheet 로 바꿔 쓴다.
Figma: bg/layer-floating / header 최소 높이 70, padding x6 x6 x4, gap x1_5, 제목 t08 Bold, 설명 t05 fg/neutral-muted
  body 좌우 x6, 아래 x12 / footer padding x4 x6 x6 / Close Button 52, shape/lg, x 22 fg/neutral-subtle
```
