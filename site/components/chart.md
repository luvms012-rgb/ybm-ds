<!-- https://luvms012-rgb.github.io/yds/site/components/chart.html -->

# Chart

막대, 선, 도넛으로 수치를 비교하거나 흐름을 보여 주는 그래프입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<figure class="ds-chart" data-type="bar|line|donut">
  [<figcaption class="ds-chart__header"><span class="ds-chart__title">주간 방문</span><span class="ds-chart__desc">지난 7일</span></figcaption>]
  막대: <div class="ds-chart__plot"><div class="ds-chart__col"><span class="ds-chart__bar" style="--ds-chart-value: 72%" [data-series="2"]></span><span class="ds-chart__label">월</span></div> 칸 수만큼</div>
  선:   <div class="ds-chart__plot"><svg class="ds-chart__svg" viewBox="0 0 100 40" preserveAspectRatio="none"><polygon class="ds-chart__area" points="…"/><polyline class="ds-chart__line" [data-series="2"] points="0,30 20,22 …"/></svg></div>
        <div class="ds-chart__axis"><span>월</span> …</div>
  도넛: <div class="ds-chart__donut" style="--ds-chart-1: 40; --ds-chart-2: 30; --ds-chart-3: 20" role="img" aria-label="…">[<span class="ds-chart__total">…</span>]</div>
  [<ul class="ds-chart__legend"><li><span class="ds-chart__swatch" [data-series="2"]></span>신규</li></ul>]
</figure>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header** `ds-chart__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Title** `ds-chart__title` | 제목입니다. |
| **Desc** `ds-chart__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Plot** `ds-chart__plot` | 값을 그리는 영역입니다. 눈금선이 깔립니다. |
| **Col** `ds-chart__col` | 막대 하나와 그 이름을 묶은 칸입니다. |
| **Bar** `ds-chart__bar` | 값만큼 높아지는 막대입니다. |
| **Label** `ds-chart__label` | 막대 아래 이름입니다. |
| **Svg** `ds-chart__svg` | 선을 그리는 그림 영역입니다. |
| **Area** `ds-chart__area` | 선 아래를 옅게 채운 면입니다. |
| **Line** `ds-chart__line` | 값을 잇는 선입니다. |
| **Axis** `ds-chart__axis` | 가로축 이름 줄입니다. |
| **Donut** `ds-chart__donut` | 전체 안의 몫을 보여 주는 고리입니다. |
| **Total** `ds-chart__total` | 도넛 가운데 합계입니다. |
| **Legend** `ds-chart__legend` | 색이 무엇을 뜻하는지 알려 주는 범례입니다. |
| **Swatch** `ds-chart__swatch` | 범례의 색 표시입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `type` | bar line donut |

그 밖에: `data-series` 1~5, `--ds-chart-value`, `--ds-chart-height`

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 막대는 항목끼리 비교할 때, 선은 시간에 따른 흐름을 볼 때, 도넛은 전체 안의 몫을 볼 때 씁니다. |
| **Do** | 색만으로 나누지 말고 범례나 값 글자를 함께 둡니다. |
| **Do** | 한 그래프의 색은 chart/series 5개 안에서 씁니다. |
| **Don't** | 도넛 조각은 5개를 넘기지 않습니다. |

## 예시

### 카드 안에서 한 주 흐름 보여 주기

제목과 기간을 그래프 위에 두고, 막대 아래에는 요일만 적습니다. 비교할 값이 하나면 색도 하나만 씁니다.

```html
<article class="ds-card u-full" style="max-width: 420px; padding: var(--ds-space-x5)">
  <figure class="ds-chart" data-type="bar"><figcaption class="ds-chart__header"><span class="ds-chart__title">주간 방문</span><span class="ds-chart__desc">지난 7일</span></figcaption><div class="ds-chart__plot"><div class="ds-chart__col"><span class="ds-chart__bar" style="--ds-chart-value: 40%"></span><span class="ds-chart__label">월</span></div><div class="ds-chart__col"><span class="ds-chart__bar" style="--ds-chart-value: 62%"></span><span class="ds-chart__label">화</span></div><div class="ds-chart__col"><span class="ds-chart__bar" style="--ds-chart-value: 55%"></span><span class="ds-chart__label">수</span></div><div class="ds-chart__col"><span class="ds-chart__bar" style="--ds-chart-value: 80%"></span><span class="ds-chart__label">목</span></div><div class="ds-chart__col"><span class="ds-chart__bar" style="--ds-chart-value: 72%"></span><span class="ds-chart__label">금</span></div><div class="ds-chart__col"><span class="ds-chart__bar" style="--ds-chart-value: 30%"></span><span class="ds-chart__label">토</span></div><div class="ds-chart__col"><span class="ds-chart__bar" style="--ds-chart-value: 24%"></span><span class="ds-chart__label">일</span></div></div></figure>
</article>
```

### 두 흐름을 범례와 함께 비교하기

선이 둘 이상이면 아래에 범례를 둬서 색이 무엇인지 알립니다. 주된 흐름 하나에만 면을 깝니다.

```html
<figure class="ds-chart" data-type="line" style="width: 100%; max-width: 420px"><figcaption class="ds-chart__header"><span class="ds-chart__title">월별 가입</span><span class="ds-chart__desc">올해</span></figcaption><div class="ds-chart__plot"><svg class="ds-chart__svg" viewBox="0 0 100 40" preserveAspectRatio="none" role="img" aria-label="월별 가입"><polygon class="ds-chart__area" points="0,40 0,30 16.7,26 33.3,28 50,18 66.7,20 83.3,12 100,8 100,40"/><polyline class="ds-chart__line" points="0,30 16.7,26 33.3,28 50,18 66.7,20 83.3,12 100,8"/><polyline class="ds-chart__line" data-series="2" points="0,34 16.7,32 33.3,30 50,29 66.7,26 83.3,24 100,22"/></svg></div><div class="ds-chart__axis"><span>1월</span><span>2월</span><span>3월</span><span>4월</span><span>5월</span><span>6월</span><span>7월</span></div><ul class="ds-chart__legend"><li><span class="ds-chart__swatch"></span>신규</li><li><span class="ds-chart__swatch" data-series="2"></span>다시 가입</li></ul></figure>
```

### 전체 안의 몫은 도넛으로

가운데에 합계를 두고, 조각은 큰 것부터 차례로 놓습니다. 범례에 몫을 함께 적어 색을 구분하기 어려워도 읽게 합니다.

```html
<figure class="ds-chart" data-type="donut"><div class="ds-chart__donut" style="--ds-chart-1: 45; --ds-chart-2: 30; --ds-chart-3: 15; --ds-chart-4: 10" role="img" aria-label="결제 수단 비중: 카드 45%, 계좌 이체 30%, 간편 결제 15%, 기타 10%"><span class="ds-chart__total">1,284<small>전체 주문</small></span></div><ul class="ds-chart__legend"><li><span class="ds-chart__swatch"></span>카드 45%</li><li><span class="ds-chart__swatch" data-series="2"></span>계좌 이체 30%</li><li><span class="ds-chart__swatch" data-series="3"></span>간편 결제 15%</li><li><span class="ds-chart__swatch" data-series="4"></span>기타 10%</li></ul></figure>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-chart-height` | `160px` |
| `--ds-chart-size` | `160px` |
| `--ds-chart-color` | `var(--ds-color-chart-series-1)` |
| `--ds-chart-1` | `0` |
| `--ds-chart-2` | `0` |
| `--ds-chart-3` | `0` |
| `--ds-chart-4` | `0` |
| `--ds-chart-5` | `0` |

### 크기와 여백

```
색: chart/series-1~5 (data-series 1~5, 기본 1) / 눈금선 stroke/neutral-muted / 막대 폭 최대 32, 위 모서리 shape/2xs
높이: --ds-chart-height(기본 160) / 도넛 지름 --ds-chart-size(기본 160), 두께 24, 값은 백분율 숫자(합 100 이하, 남은 몫은 bg/neutral)
title t05 SemiBold / desc t03 fg/neutral-muted / 축 글자 t02 fg/neutral-muted / 범례 t03, 색 표시 10
```
