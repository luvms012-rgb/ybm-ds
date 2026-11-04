<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/switch.html -->

# Switch

설정을 바로 켜고 끌 때 쓰는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<label class="ds-switch" data-size="24">
  <span class="ds-switch__label">알림 받기</span>
  <input type="checkbox" role="switch" class="ds-switch__control">
</label>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Label** `ds-switch__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Control** `ds-switch__control` | 실제로 값을 입력하거나 고르는 부분입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | 16 24 32 |
| 켜고 끄는 속성 | `tone` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 누르는 즉시 반영되는 설정에만 씁니다. |
| **Do** | 저장 버튼이 따로 있으면 Checkbox를 씁니다. |

## 예시

### 설정 목록에서 바로 켜고 끄기

알림 설정처럼 누르는 즉시 반영되는 항목에 Switch를 둡니다. 따로 저장 버튼이 없으므로 켜고 끈 상태가 곧 결과입니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">수업 알림</span>
        <span class="ds-list-item__desc">수업 시작 10분 전에 알려 줘요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" checked></span></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">과제 마감 알림</span>
        <span class="ds-list-item__desc">마감 하루 전에 알려 줘요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" checked></span></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">혜택과 이벤트 소식</span>
        <span class="ds-list-item__desc">할인과 새 강의 소식을 보내 줘요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control"></span></span>
    </label>
  </li>
</ul>
```

### 카드 안 기능 하나를 라벨과 함께 켜기

카드 안에서 자동 연장 같은 기능 하나를 라벨 붙은 Switch로 켜고 끕니다. 켜는 순간 적용되고 언제든 다시 끌 수 있는 기능에 씁니다.

```html
<article class="ds-card" style="width: 100%; max-width: 360px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">프리미엄 이용권</h3>
    <p class="ds-card__desc">다음 결제일 12월 4일</p>
  </header>
  <div class="ds-card__content">
    <label class="ds-switch u-full u-between">
      <span class="ds-switch__label">자동 연장</span>
      <input type="checkbox" role="switch" class="ds-switch__control" checked>
    </label>
  </div>
</article>
```

### 바꿀 수 없는 설정은 까닭 적기

기기에서 알림을 꺼 두어 바꿀 수 없는 항목은 Switch를 disabled로 두고 까닭을 설명에 적습니다. 바로 아래에 기기 설정으로 가는 줄을 두어 다음에 할 일을 알려 줍니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">푸시 알림</span>
        <span class="ds-list-item__desc">기기 설정에서 알림을 꺼 두었어요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" disabled></span></span>
    </label>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">기기 알림 설정 열기</span>
      </span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">이메일 알림</span>
        <span class="ds-list-item__desc">주 1회 학습 리포트를 보내 줘요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" checked></span></span>
    </label>
  </li>
</ul>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-switch-w` | `38px` |
| `--ds-switch-h` | `24px` |
| `--ds-switch-thumb` | `16px` |
| `--ds-switch-thumb-on` | `20px` |
| `--ds-switch-on` | `var(--ds-color-bg-brand-solid)` |
| `--ds-switch-thumb-color` | `var(--ds-color-palette-static-white)` |
| `--ds-switch-t` | `var(--ds-switch-thumb)` |

### 크기와 여백

```
size: 24(기본) / 16 / 32   tone: brand(기본) / neutral
Figma 16: 트랙 26×16 / 썸 10(켜짐 12) / gap x1_5 / label t03 Medium
       24: 트랙 38×24 / 썸 16(켜짐 20) / gap x2   / label t04 Medium
       32: 트랙 52×32 / 썸 21(켜짐 26) / gap x2_5 / label t05 Medium
  트랙 off palette/gray-600 / on bg/neutral-solid(neutral) / bg/brand-solid(brand)
  썸 fg/on-neutral-solid(neutral) / static-white(brand / checked 는 fg/on-brand-solid, 같은 값) + elevation raised
  disabled: 트랙 opacity .38 / 라벨 .58 / 썸 static-black-alpha-700
```
