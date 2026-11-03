<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/quantity-picker.html -->

# Quantity Picker

수량을 하나씩 늘리고 줄이는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-quantity" data-size="medium">
  <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
  <input class="ds-quantity__value" inputmode="numeric" value="1" aria-label="수량">
  <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `layout` | fill |
| 켜고 끄는 속성 | `size` |

## 예시

```html
<div class="ds-quantity"><button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button><input class="ds-quantity__value" inputmode="numeric" value="1" aria-label="수량"><button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button></div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
size: medium(기본 40) / small 36 / large 52   layout: hug(기본) / data-layout="fill"
Figma: bg/layer-default / 1px stroke/neutral-weak / small/medium shape/sm / large shape/lg
       버튼 정사각(36/40/52) / 아이콘 16/18/22 fg/neutral / 값 min-w40 px8 / t05 Medium(large t06)
       disabled 아이콘/값 fg/disabled / invalid 1px stroke/critical-solid
```
