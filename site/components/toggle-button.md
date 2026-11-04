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
