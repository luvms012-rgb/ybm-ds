<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/select-trigger.html -->

# Select Trigger

목록에서 값 하나를 고르는 칸입니다. 누르면 Select Content가 열립니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="false" [data-size="medium"]>
  [<i class="ds-icon ds-icon--search" aria-hidden="true"></i>]
  <span class="ds-select__value" data-placeholder="선택해 주세요"></span>
</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` |

## 예시

### 선택지가 많으면 칸 하나로 줄이기

지역처럼 선택지가 6개보다 많거나 늘어날 수 있으면 Select로 칸 하나에 담습니다. 2~6개라면 모두 펼쳐 보이는 Radio Group이 더 빨리 고를 수 있습니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="select-trigger-ex1-label">응시 지역</span>
  </div>
  <button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="select-trigger-ex1-label select-trigger-ex1-value" aria-describedby="select-trigger-ex1-help">
    <span class="ds-select__value" id="select-trigger-ex1-value" data-placeholder="지역을 선택해 주세요"></span>
  </button>
  <div class="ds-field__footer">
    <p class="ds-field__help" id="select-trigger-ex1-help">가까운 시험장을 먼저 보여 드려요</p>
  </div>
</div>
```

### 목록 위 좁은 자리에서 정렬 고르기

목록 위 정렬처럼 좁은 자리에는 `data-size="medium"`을 씁니다. 정렬은 값을 고르는 일이라 Menu가 아니라 Select로 만듭니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 420px">
  <div class="u-flex u-center u-between">
    <span class="ds-t04 ds-fg-muted">강의 32개</span>
    <button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬 기준" style="width: 128px">
      <span class="ds-select__value">최신순</span>
    </button>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">여행 영어 첫걸음</span>
          <span class="ds-list-item__desc">11월 3일 열림</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">비즈니스 이메일 쓰기</span>
          <span class="ds-list-item__desc">10월 27일 열림</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 꼭 골라야 하는 칸을 비우면 알리기

꼭 골라야 하는 칸을 비워 두고 넘어가면 `aria-invalid="true"`로 테두리를 바꾸고 오류 문구를 보여 줍니다. 무엇을 골라야 하는지 문구에 적어 바로 고칠 수 있게 합니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="select-trigger-ex3-label">상담 희망 시간</span>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <button type="button" class="ds-select" aria-haspopup="listbox" aria-expanded="false" aria-invalid="true" aria-labelledby="select-trigger-ex3-label select-trigger-ex3-value" aria-describedby="select-trigger-ex3-error">
    <span class="ds-select__value" id="select-trigger-ex3-value" data-placeholder="시간을 선택해 주세요"></span>
  </button>
  <div class="ds-field__footer">
    <p class="ds-field__help">상담은 평일에만 할 수 있어요</p>
    <p class="ds-field__error" id="select-trigger-ex3-error">상담 희망 시간을 골라 주세요</p>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-select-height` | `52px` |
| `--ds-select-padding-x` | `var(--ds-space-x4)` |
| `--ds-select-gap` | `var(--ds-space-x2_5)` |
| `--ds-select-radius` | `var(--ds-shape-lg)` |
| `--ds-select-font-size` | `var(--ds-font-size-t05)` |
| `--ds-select-line-height` | `var(--ds-line-height-t05)` |
| `--ds-select-icon` | `20px` |
| `--ds-select-line` | `var(--ds-color-stroke-neutral-weak)` |
| `--ds-select-line-width` | `1px` |
| `--ds-select-bg` | `var(--ds-color-bg-transparent)` |

### 크기와 여백

```
Figma large: h52 / px16 / gap10 / shape/lg / t05 / chevron 20 / medium: h40 / px14 / gap8 / shape/sm / t04 / chevron 16
       chevron fg/neutral(열림 = chevron-up) / invalid 1px critical / disabled/readOnly bg/disabled
```
