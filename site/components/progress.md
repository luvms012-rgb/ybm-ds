<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/progress.html -->

# Progress

작업이 얼마나 진행됐는지 막대로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
     style="--ds-progress-value: 40%" [data-tone="neutral"] [data-size="small"]></div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` `tone` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | "3/10", "40%"처럼 값을 글자로 막대 위나 옆에 적습니다. 막대만으로는 정확한 숫자를 알 수 없습니다. |
| **Do** | 화면의 대표 진행률은 brand, 목록 안이나 보조 진행률은 neutral을 씁니다. |
| **Do** | 0%일 때도 바탕 막대(track)는 보여 줍니다. 그래야 진행 막대인 줄 알 수 있습니다. |
| **Do** | 화면 읽기 프로그램이 읽도록 role="progressbar"와 aria-valuenow, aria-valuemin, aria-valuemax를 붙입니다. 라벨이 없으면 aria-label을 붙입니다. |

## 예시

### 진행 값을 글자로 함께 적기

막대 위에 "3/10"처럼 지금 값을 글자로 적습니다. 막대 길이만으로는 몇 문제가 남았는지 정확히 알 수 없습니다.

```html
<article class="ds-card u-full" style="max-width: 420px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">오늘의 단어 퀴즈</h3>
    <p class="ds-card__desc">하루 10문제, 5분이면 끝나요</p>
  </header>
  <div class="ds-card__content u-col u-gap-2">
    <div class="u-flex u-between">
      <span class="ds-fg-subtle">푼 문제</span>
      <span class="ds-fw-semibold">3/10</span>
    </div>
    <div class="ds-progress" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="10" aria-label="푼 문제" style="--ds-progress-value: 30%"></div>
  </div>
  <footer class="ds-card__footer">
    <button type="button" class="ds-btn" data-variant="neutralWeak">이어서 풀기</button>
  </footer>
</article>
```

### 목록 안 진행률은 neutral로 낮추기

여러 줄에 붙는 진행률은 `data-tone="neutral"`과 `data-size="small"`로 낮춥니다. brand는 화면의 대표 진행률 하나에만 써야 눈에 띕니다.

```html
<ul class="ds-list u-full" data-variant="inset" data-divider style="max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <div class="ds-list-item__content u-gap-1_5">
        <span class="ds-list-item__title">영어 회화 기초</span>
        <div class="u-flex u-center u-gap-3">
          <div class="ds-progress u-grow" role="progressbar" aria-valuenow="8" aria-valuemin="0" aria-valuemax="20" aria-label="영어 회화 기초 진도" style="--ds-progress-value: 40%" data-tone="neutral" data-size="small"></div>
          <span class="ds-list-item__desc">8/20강</span>
        </div>
      </div>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <div class="ds-list-item__content u-gap-1_5">
        <span class="ds-list-item__title">비즈니스 이메일 쓰기</span>
        <div class="u-flex u-center u-gap-3">
          <div class="ds-progress u-grow" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="16" aria-label="비즈니스 이메일 쓰기 진도" style="--ds-progress-value: 94%" data-tone="neutral" data-size="small"></div>
          <span class="ds-list-item__desc">15/16강</span>
        </div>
      </div>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <div class="ds-list-item__content u-gap-1_5">
        <span class="ds-list-item__title">실전 모의고사</span>
        <div class="u-flex u-center u-gap-3">
          <div class="ds-progress u-grow" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="12" aria-label="실전 모의고사 진도" style="--ds-progress-value: 17%" data-tone="neutral" data-size="small"></div>
          <span class="ds-list-item__desc">2/12회</span>
        </div>
      </div>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
</ul>
```

### 시작 전에도 바탕 막대 보여 주기

아직 시작하지 않아 0%여도 바탕 막대(track)는 그대로 둡니다. 막대가 사라지면 이 자리에 진행률이 채워진다는 것을 알 수 없습니다.

```html
<div class="u-col u-gap-2 u-full" style="max-width: 420px">
  <div class="u-flex u-center u-between">
    <span class="ds-t05 ds-fw-semibold">이번 주 학습 목표</span>
    <span class="ds-t04 ds-fg-muted">0/5시간</span>
  </div>
  <div class="ds-progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="5" aria-label="이번 주 학습 목표" style="--ds-progress-value: 0%"></div>
  <p class="ds-t03 ds-fg-subtle">첫 강의를 들으면 바로 채워져요</p>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-progress-value` | `0%` |
| `--ds-progress-track` | `var(--ds-color-palette-brand-200)` |
| `--ds-progress-range` | `var(--ds-color-bg-brand-solid)` |

### 크기와 여백

```
tone: brand(기본) / neutral   size: medium(기본 8) / small 4
Figma: 트랙 palette/brand-200(neutral palette/gray-200) / 채움 bg/brand-solid(neutral bg/neutral-solid) / pill
```
