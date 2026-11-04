<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/callout.html -->

# Callout

본문 안에서 꼭 알아야 할 정보를 눈에 띄게 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-callout" data-tone="warning">
  <i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i>
  <p class="ds-callout__content"><strong class="ds-callout__title">안내</strong>  본문  <a class="ds-callout__link" href="#">자세히</a></p>
  [<button class="ds-callout__suffix" aria-label="닫기"><i class="ds-icon ds-icon--x"></i></button>]
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Content**`ds-callout__content` | 주된 내용이 들어가는 영역입니다. |
| **Title**`ds-callout__title` | 제목입니다. |
| **Link**`ds-callout__link` | 자세히 보기 같은 이동 링크입니다. |
| **Suffix**`ds-callout__suffix` | 뒤에 붙는 아이콘이나 요소입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `tone` | neutral informative positive warning critical magic 은 CSS 만 |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 앞 아이콘은 채움(Solid) 모양을 씁니다. |
| **Do** | 제목, 본문, 링크는 한 줄로 이어 쓰고, 사이는 두 칸 띄웁니다. |
| **Do** | Banner는 화면 맨 위에 전체 폭으로, 한 번에 하나만 띄웁니다. |
| **Do** | 본문 안의 안내는 Callout을 씁니다. |
| **Don't** | 전체를 누를 수 있는 Callout에는 링크 글자를 따로 넣지 않습니다. |

## 예시

```html
<div class="ds-callout"><i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i><p class="ds-callout__content"><strong class="ds-callout__title">안내</strong>  신분증을 꼭 지참해 주세요.</p></div>
<div class="ds-callout" data-tone="informative"><i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i><p class="ds-callout__content">이벤트 기간은 10월 31일까지예요.  <a class="ds-callout__link" href="#">자세히</a></p></div>
<div class="ds-callout" data-tone="positive"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i><p class="ds-callout__content">결제가 완료됐어요.</p></div>
<div class="ds-callout" data-tone="warning"><i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i><p class="ds-callout__content">잔여 좌석이 얼마 남지 않았어요.</p><button class="ds-callout__suffix" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
<div class="ds-callout" data-tone="critical"><i class="ds-icon ds-icon--circle-alert-solid" aria-hidden="true"></i><p class="ds-callout__content">결제에 실패했어요. 다시 시도해 주세요.</p></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-callout-bg` | `var(--ds-color-bg-neutral)` |
| `--ds-callout-fg` | `var(--ds-color-fg-neutral)` |

### 크기와 여백

```
tone: neutral(기본) / informative / positive / warning / critical
Figma: padding x3_5 / gap x2 / min-h50 / shape/md / t04 / 아이콘 Solid 16
  neutral bg/neutral + fg/neutral(info) / informative bg/informative-weak + fg/brand-contrast(info)
  positive bg/positive-weak + fg/positive(circle-check) / warning bg/warning-weak + fg/warning(triangle-alert)
  critical bg/critical-weak + fg/critical(circle-alert)
제목/링크는 본문과 같은 줄(inline), 구분은 띄어쓰기 두 칸. 제목 Bold / 링크 밑줄.
```
