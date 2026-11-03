<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/tabs.html -->

# Tabs

한 화면의 내용을 여러 탭으로 나눠 전환하는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-tabs" role="tablist" [data-size="medium"] [data-layout="hug"]>
  <button class="ds-tabs__trigger" role="tab" aria-selected="true">탭</button>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `layout` | fill hug |
| 켜고 끄는 속성 | `size` |

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-tabs-height` | `40px` |

## 예시

```html
<div class="ds-tabs" role="tablist"><button class="ds-tabs__trigger" role="tab" aria-selected="true">주문 내역</button><button class="ds-tabs__trigger" role="tab" aria-selected="false">배송 조회</button><button class="ds-tabs__trigger" role="tab" aria-selected="false" disabled>환불</button></div>
<div class="ds-tabs" role="tablist" data-layout="hug" data-size="medium"><button class="ds-tabs__trigger" role="tab" aria-selected="true">hug</button><button class="ds-tabs__trigger" role="tab" aria-selected="false">medium</button></div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
size: small(기본 40) / medium 44   triggerLayout: fill(기본) / hug
Figma: bg/layer-default / 하단 1px stroke/neutral-muted / trigger padding x2_5 / t04 Medium fg/neutral-subtle(2026-11-03, placeholder 에서 진하게)
  selected t04 SemiBold fg/neutral + 하단 2px fg/neutral 인디케이터(트리거 폭) / disabled fg/disabled
  hug: 좌우 x4 / 트리거는 내용 폭
```
