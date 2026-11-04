<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/toggle-button.html -->

# Toggle Button

누를 때마다 켜짐과 꺼짐이 바뀌는 버튼입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<button type="button" class="ds-toggle" aria-pressed="false" [data-size="medium"]>라벨</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | "알림 받기" 켜고 끄기처럼 한 가지 상태만 바꿀 때 씁니다. |
| **Do** | 고르기와 걸러 보기는 Chip, 바로 반영되는 설정은 Switch를 씁니다. 역할이 겹치지 않게 나눠 쓰세요. |
| **Don't** | 여러 개 가운데 하나를 고르는 데는 쓰지 않습니다. 그럴 때는 Segmented Control을 씁니다. |

## 예시

### 한 가지 상태를 켜고 끄기

개강 알림처럼 한 가지 상태만 켜고 끄는 데 Toggle Button을 씁니다. 라벨은 그대로 두고 `aria-pressed`로 켜졌는지 알립니다.

```html
<article class="ds-card" style="width: 100%; max-width: 360px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">데이터 분석 입문</h3>
    <p class="ds-card__desc">12월 2일 개강 예정</p>
  </header>
  <div class="ds-card__content u-flex u-center u-between u-gap-3">
    <span class="ds-fg-muted">개강하는 날 아침에 알려 줘요.</span>
    <button type="button" class="ds-toggle" aria-pressed="true">개강 알림</button>
  </div>
</article>
```

### 서로 상관없는 보기 옵션 켜기

해석 보기, 단어 뜻 보기처럼 서로 상관없는 옵션을 하나씩 켜고 끕니다. 여러 개 가운데 하나만 고르는 보기 방식은 Segmented Control로 만듭니다.

```html
<div class="u-col u-gap-5" style="width: 100%; max-width: 420px">
  <div class="u-flex u-gap-2" role="group" aria-label="보기 옵션">
    <button type="button" class="ds-toggle" aria-pressed="true">해석 보기</button>
    <button type="button" class="ds-toggle" aria-pressed="false">단어 뜻 보기</button>
  </div>
  <div class="u-col u-gap-1">
    <p class="ds-t05">Could you send me the file by Friday?</p>
    <p class="ds-t04 ds-fg-muted">금요일까지 파일을 보내 줄 수 있나요?</p>
  </div>
  <div class="u-col u-gap-1">
    <p class="ds-t05">I'll check the schedule and let you know.</p>
    <p class="ds-t04 ds-fg-muted">일정을 확인하고 알려 줄게요.</p>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-toggle-bg` | `var(--ds-color-bg-layer-default)` |
| `--ds-toggle-fg` | `var(--ds-color-fg-neutral)` |
| `--ds-toggle-line` | `var(--ds-color-stroke-neutral-weak)` |

### 크기와 여백

```
size: small(기본) / medium
Figma small: py6 px12 / t03 Bold / medium: py10 px16 / t04 Bold / shape/lg
  off bg/layer-default + stroke/neutral-weak / on bg/brand-weak + stroke/brand-solid + fg/brand / disabled bg/disabled + fg/disabled
```
