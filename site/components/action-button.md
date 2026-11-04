<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/action-button.html -->

# Action Button

누르면 바로 동작을 실행하는 기본 버튼입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button class="ds-btn" data-variant="neutralWeak" data-size="large">
  [<i class="ds-icon ds-icon--plus" aria-hidden="true"></i>] 라벨 [<i class="ds-icon …">]
</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | brandSolid brandOutline neutralSolid neutralWeak neutralOutline criticalSolid ghost |
| `size` | xsmall small medium large |
| `layout` | iconOnly |
| `width` | fill |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 강조 버튼(High emphasis)은 한 화면에 하나만 둡니다. |
| **Don't** | 버튼을 세 개 넘게 나란히 두지 않습니다. |

## 예시

### 강조 버튼은 화면에 하나만 두기

화면에서 가장 중요한 동작 하나만 brandSolid로 두고, 나머지는 neutralWeak로 낮춥니다. 강조 버튼이 둘이면 무엇을 먼저 눌러야 할지 알기 어렵습니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 420px">
  <div class="u-flex u-center u-between">
    <span class="ds-t04 ds-fg-muted">총 결제 금액</span>
    <strong class="ds-t07 ds-fw-bold">32,000원</strong>
  </div>
  <div class="u-flex u-gap-2">
    <button class="ds-btn" data-variant="neutralWeak" data-size="large" data-width="fill">장바구니 담기</button>
    <button class="ds-btn" data-size="large" data-width="fill">바로 구매하기</button>
  </div>
</div>
```

### 버튼은 세 개까지, 나머지는 아이콘으로

나란히 두는 버튼은 세 개까지로 하고, 찜이나 공유처럼 가끔 쓰는 동작은 아이콘 버튼으로 작게 둡니다. 아이콘만 있는 버튼에는 `aria-label`로 이름을 붙입니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 420px">
  <strong class="ds-t06 ds-fw-bold">영어 회화 첫걸음</strong>
  <div class="u-flex u-gap-2">
    <button class="ds-btn" data-variant="neutralOutline" data-size="large" data-layout="iconOnly" aria-label="찜하기"><i class="ds-icon ds-icon--heart" aria-hidden="true"></i></button>
    <button class="ds-btn" data-variant="neutralOutline" data-size="large" data-layout="iconOnly" aria-label="공유하기"><i class="ds-icon ds-icon--share" aria-hidden="true"></i></button>
    <button class="ds-btn" data-size="large" data-width="fill">수강 신청하기</button>
  </div>
</div>
```

### 목록 줄 안에서는 작은 보조 버튼으로

줄마다 놓는 버튼은 small 크기의 neutralWeak로 두어 줄마다 강조가 생기지 않게 합니다. 줄 안에 버튼이 있으면 줄 전체를 링크로 만들지 않습니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">무선 이어폰</span>
        <span class="ds-list-item__desc">11월 2일 도착</span>
      </span>
      <span class="ds-list-item__suffix"><button class="ds-btn" data-variant="neutralWeak" data-size="small">리뷰 쓰기</button></span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">보온 텀블러</span>
        <span class="ds-list-item__desc">내일 도착 예정</span>
      </span>
      <span class="ds-list-item__suffix"><button class="ds-btn" data-variant="neutralWeak" data-size="small">배송 조회</button></span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">노트 3권 세트</span>
        <span class="ds-list-item__desc">10월 28일 도착</span>
      </span>
      <span class="ds-list-item__suffix"><button class="ds-btn" data-variant="neutralWeak" data-size="small">다시 담기</button></span>
    </div>
  </li>
</ul>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-btn-height` | `40px` |
| `--ds-btn-padding-x` | `var(--ds-space-x4)` |
| `--ds-btn-radius` | `var(--ds-shape-sm)` |
| `--ds-btn-gap` | `var(--ds-space-x1_5)` |
| `--ds-btn-font-size` | `var(--ds-font-size-t04)` |
| `--ds-btn-line-height` | `var(--ds-line-height-t04)` |
| `--ds-btn-font-weight` | `var(--ds-font-weight-semibold)` |
| `--ds-btn-icon` | `18px` |
| `--ds-btn-icon-only` | `20px` |
| `--ds-btn-bg` | `var(--ds-color-bg-brand-solid)` |
| `--ds-btn-bg-pressed` | `var(--ds-color-bg-brand-solid-pressed)` |
| `--ds-btn-fg` | `var(--ds-color-fg-on-brand-solid)` |
| `--ds-btn-border` | `transparent` |

### 크기와 여백

```
variant : brandSolid(기본) / neutralSolid / neutralWeak / criticalSolid / brandOutline / neutralOutline / ghost
size    : xsmall 32 / small 36 / medium 40(기본) / large 52
layout  : 기본 withText / data-layout="iconOnly" / data-width="fill"
Figma: xsmall px14 gap4 t02 Medium shape/xs (iconOnly pill) / icon 16
       small  px14 gap4 t04 SemiBold shape/sm / icon 18
       medium px16 gap6 t04 SemiBold shape/sm / icon 18 (iconOnly 20)
       large  px20 gap8 t06 SemiBold shape/md / icon 24
```
