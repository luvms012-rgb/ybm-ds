<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/checkbox.html -->

# Checkbox

여러 선택지에서 하나 이상을 고를 때 쓰는 컴포넌트입니다. 약관 동의처럼 항목 하나를 켜고 끌 때도 씁니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<label class="ds-checkbox" data-tone="neutral">
  <input type="checkbox" class="ds-checkbox__control">
  <span class="ds-checkbox__label">라벨</span>
</label>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Control** `ds-checkbox__control` | 실제로 값을 입력하거나 고르는 부분입니다. |
| **Label** `ds-checkbox__label` | 이름이나 값을 보여 주는 글자입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | square ghost |
| 켜고 끄는 속성 | `tone` `size` |

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- data-indeterminate 속성 → input.indeterminate

## 예시

### 약관은 전체 동의와 항목 동의로 나누기

맨 위에 전체 동의 칸을 두고, 약관 항목은 ghost로 박스 없이 체크만 보여 줍니다. 항목마다 전문을 여는 링크를 붙여 무엇에 동의하는지 확인할 수 있게 합니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 375px">
  <label class="ds-checkbox" data-size="large">
    <input type="checkbox" class="ds-checkbox__control" checked>
    <span class="ds-checkbox__label ds-fw-semibold">약관에 모두 동의해요</span>
  </label>
  <hr class="ds-divider">
  <div class="u-col u-gap-1">
    <div class="u-flex u-center u-between">
      <label class="ds-checkbox" data-variant="ghost"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">(필수) 서비스 이용 약관</span></label>
      <a class="ds-link" data-size="small" href="#" aria-label="서비스 이용 약관 보기">보기</a>
    </div>
    <div class="u-flex u-center u-between">
      <label class="ds-checkbox" data-variant="ghost"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">(필수) 개인 정보 수집과 이용</span></label>
      <a class="ds-link" data-size="small" href="#" aria-label="개인 정보 수집과 이용 보기">보기</a>
    </div>
    <div class="u-flex u-center u-between">
      <label class="ds-checkbox" data-variant="ghost"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">(선택) 할인과 이벤트 소식 받기</span></label>
      <a class="ds-link" data-size="small" href="#" aria-label="할인과 이벤트 소식 받기 보기">보기</a>
    </div>
  </div>
</div>
```

### 버튼을 눌러야 반영되는 선택 받기

로그인처럼 버튼을 눌러야 반영되는 선택은 Switch가 아니라 Checkbox로 받습니다. Switch는 누르는 즉시 바뀌는 설정에만 씁니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 375px">
  <div class="ds-field">
    <div class="ds-field__header"><label class="ds-field__label" for="checkbox-ex2-id">아이디</label></div>
    <div class="ds-input" data-variant="outline"><input class="ds-input__control" id="checkbox-ex2-id" placeholder="아이디를 입력해 주세요"></div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header"><label class="ds-field__label" for="checkbox-ex2-password">비밀번호</label></div>
    <div class="ds-input" data-variant="outline"><input class="ds-input__control" id="checkbox-ex2-password" type="password" placeholder="비밀번호를 입력해 주세요"></div>
  </div>
  <label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">로그인 상태 유지</span></label>
  <button class="ds-btn" data-size="large" data-width="fill">로그인</button>
</div>
```

### 목록에서 여러 개를 골라 한 번에 처리하기

목록 위에 전체 선택 칸을 두고, 일부만 골랐으면 가로선(`data-indeterminate`)으로 보여 줍니다. 고른 항목은 위쪽 버튼으로 한 번에 처리합니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 375px">
  <div class="u-flex u-center u-between">
    <label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" data-indeterminate><span class="ds-checkbox__label">전체 선택 (2/3)</span></label>
    <button class="ds-btn" data-variant="ghost" data-size="xsmall">선택 삭제</button>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__prefix"><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" checked aria-label="무선 이어폰"></label></span>
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">무선 이어폰</span>
          <span class="ds-list-item__desc">화이트, 1개</span>
        </span>
        <span class="ds-list-item__suffix">59,000원</span>
      </div>
    </li>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__prefix"><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" checked aria-label="보온 텀블러"></label></span>
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">보온 텀블러</span>
          <span class="ds-list-item__desc">500ml, 2개</span>
        </span>
        <span class="ds-list-item__suffix">24,000원</span>
      </div>
    </li>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__prefix"><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="노트 3권 세트"></label></span>
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">노트 3권 세트</span>
          <span class="ds-list-item__desc">1개</span>
        </span>
        <span class="ds-list-item__suffix">9,800원</span>
      </div>
    </li>
  </ul>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-checkbox-size` | `20px` |
| `--ds-checkbox-icon` | `12px` |
| `--ds-checkbox-checked-bg` | `var(--ds-color-bg-brand-solid)` |
| `--ds-checkbox-checked-fg` | `var(--ds-color-fg-on-brand-solid)` |
| `--ds-checkbox-line` | `var(--ds-color-palette-gray-600)` |
| `--ds-checkbox-mark` | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")` |

### 크기와 여백

```
size: medium(기본 20) / large(24)   variant: square(기본) / ghost   tone: brand(기본) / neutral
indeterminate: input.indeterminate = true (스크립트) → 가로선
Figma: 행 min-h 32/36 / 위 6 / gap x2 / 박스 shape/xs / label t04/t05 fg/neutral
  unchecked bg/layer-default + 1px palette/gray-600(2026-11-04, Radio 같음) / checked neutral bg/neutral-solid + 체크 fg/on-neutral-solid
  brand bg/brand-solid + 체크 fg/on-brand-solid / disabled bg/disabled + stroke/neutral-muted
  disabledChecked bg/disabled + 체크 fg/disabled / ghost 박스 없이 체크 14 (미선택 fg/placeholder)
체크와 가로선은 아이콘 세트가 아닌 전용 그림(Figma "Checkbox Mark"): 24 기준 선 2.75 고정 비율 → 12px 1.375 / 14px 1.6
```
