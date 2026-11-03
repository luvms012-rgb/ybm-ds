<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/segmented-control.html -->

# Segmented Control

같은 내용을 목록, 달력처럼 다른 방식으로 바꿔 볼 때 쓰는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-segmented" role="group" aria-label="보기 방식" [data-size="medium"] [data-layout="fill"]>
  <button type="button" class="ds-segmented__item" aria-pressed="true">목록</button>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `layout` `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 고르면 선택 배경이 미끄러지듯 옮겨 가는 움직임을 그대로 둡니다. |
| **Do** | 항목은 2~4개만 둡니다. 5개가 넘으면 알아보기 어렵고 누를 자리가 좁아집니다. |
| **Do** | 한 화면에 하나만 둡니다. 여러 개를 두면 무엇이 중요한지 흐려집니다. |
| **Do** | 라벨은 짧게 씁니다. 칸에 비해 라벨이 길면 다른 컴포넌트를 쓰세요. |
| **Don't** | 화면 이동에는 쓰지 않습니다. 화면 이동은 Tabs를 씁니다. |

## 예시

```html
<div class="ds-segmented" role="group" aria-label="보기 방식"><button type="button" class="ds-segmented__item" aria-pressed="true">목록</button><button type="button" class="ds-segmented__item" aria-pressed="false">달력</button></div>

<div class="ds-segmented" role="group" aria-label="기간" data-size="medium"><button type="button" class="ds-segmented__item" aria-pressed="false">1개월</button><button type="button" class="ds-segmented__item" aria-pressed="true">3개월</button><button type="button" class="ds-segmented__item" aria-pressed="false">1년</button></div><button class="ds-btn" data-variant="neutralWeak"><i class="ds-icon ds-icon--download" aria-hidden="true"></i>내보내기</button>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
size: small(기본) / medium   layout: hug(기본) / fill
모션: 선택 배경이 고른 항목으로 미끄러져 이동한다(필수, ybm-ds.js). 누르면 aria-pressed 가 바뀌고 change 이벤트가 난다.
Figma small : 트랙 bg/neutral / padding 2 / shape/sm / item py6 px12 / shape/xs / t03 Bold fg/neutral-subtle
      medium: 트랙 shape/lg / item py8 px16 / shape/sm / t04 Bold
      selected bg/layer-default + elevation raised + fg/neutral / disabled fg/disabled
높이(2026-11-03): small 32(Button xsmall 과 같음) / medium 40(Button medium, Select medium 과 같음). 글자와 아이콘 모두 같은 높이
```
