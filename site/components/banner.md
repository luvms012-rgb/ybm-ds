<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/banner.html -->

# Banner

화면 맨 위에서 서비스 전체 공지를 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-banner" role="status" data-tone="warning">
  <div class="ds-banner__inner">
    <i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i>
    <p class="ds-banner__message"><strong class="ds-banner__title">점검 안내</strong>  10월 25일(토) 02:00~06:00 서비스를 점검해요.</p>
    [<a class="ds-banner__action" href="#">자세히</a>]
    [<button type="button" class="ds-banner__close" aria-label="공지 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>]
  </div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Inner**`ds-banner__inner` | 배너 내용을 가운데에 정해진 폭으로 담는 영역입니다. |
| **Message**`ds-banner__message` | 알릴 내용을 담은 글입니다. |
| **Title**`ds-banner__title` | 제목입니다. |
| **Action**`ds-banner__action` | 바로 실행하는 작은 버튼입니다. |
| **Close**`ds-banner__close` | 닫기 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: tone neutral, informative, positive, warning, critical, variant solid

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | Banner는 화면 맨 위에 전체 폭으로, 한 번에 하나만 띄웁니다. |
| **Do** | 본문 안의 안내는 Callout을 씁니다. |

## 예시

```html
<div class="ds-banner" role="status"><div class="ds-banner__inner"><i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i><p class="ds-banner__message"><strong class="ds-banner__title">안내</strong>  개인정보처리방침이 11월 1일부터 바뀌어요.</p><a class="ds-banner__action" href="#">자세히</a><button type="button" class="ds-banner__close" aria-label="공지 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div></div>
<div class="ds-banner" role="status" data-tone="informative"><div class="ds-banner__inner"><i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i><p class="ds-banner__message">알림 설정 화면이 더 간단해졌어요.</p><a class="ds-banner__action" href="#">살펴보기</a></div></div>
<div class="ds-banner" role="status" data-tone="warning"><div class="ds-banner__inner"><i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i><p class="ds-banner__message"><strong class="ds-banner__title">점검 안내</strong>  10월 25일(토) 02:00~06:00 서비스를 점검해요.</p></div></div>
<div class="ds-banner" role="alert" data-tone="critical"><div class="ds-banner__inner"><i class="ds-icon ds-icon--circle-alert-solid" aria-hidden="true"></i><p class="ds-banner__message">일부 결제 수단에 장애가 있어요. 복구 중이에요.</p></div></div>
<div class="ds-banner" role="status" data-variant="solid" data-tone="informative"><div class="ds-banner__inner"><i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i><p class="ds-banner__message">solid · informative</p><button type="button" class="ds-banner__close" aria-label="공지 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div></div>
<div class="ds-banner" role="status" data-variant="solid"><div class="ds-banner__inner"><i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i><p class="ds-banner__message">solid · neutral</p></div></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-banner-bg` | `var(--ds-color-bg-neutral)` |
| `--ds-banner-fg` | `var(--ds-color-fg-neutral)` |
| `--ds-banner-max` | `1200px` |

### 크기와 여백

```
tone: neutral(기본) / informative / positive / warning / critical   variant: weak(기본) / solid
Figma: 전체 폭 / 모서리 없음 / min-h48 / padding x3 x4 / 내용 최대 폭 --ds-banner-max(1200) 가운데 / gap x2
  t04 / 제목 Bold / 아이콘 Solid 16 / action t04 Bold 밑줄 / 닫기 20(터치 영역 40)
  weak: Callout 과 같은 tone 색 / 아래 1px stroke/neutral-weak
  solid: bg/{tone}-solid + fg/on-{tone}-solid (neutral = bg/neutral-solid + fg/on-neutral-solid)
Callout 과 차이: Callout 은 본문 안 안내(둥근 상자), Banner 는 페이지 전체에 걸린 공지(화면 맨 위, 한 번에 1개).
```
