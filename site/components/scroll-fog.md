<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/scroll-fog.html -->

# Scroll Fog

스크롤 영역 끝을 흐리게 해서 내용이 더 있다는 것을 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-scrollfog" [data-direction="horizontal"]>…스크롤 되는 내용…</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `direction` | vertical horizontal |

그 밖에: 끝 20

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-scrollfog-size` | `20px` |
| `--ds-scrollfog-direction` | `to bottom` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 흐려지는 쪽에 20 이상 여백을 둡니다. |
| **Do** | 화면 전체 세로 스크롤에는 위 20, 아래 80을 둡니다. |

## 예시

```html
<div class="ds-scrollfog" style="width:240px;height:180px;padding-block:20px">
  <p>스크롤 되는 내용 1</p><p>스크롤 되는 내용 2</p><p>스크롤 되는 내용 3</p><p>스크롤 되는 내용 4</p><p>스크롤 되는 내용 5</p><p>스크롤 되는 내용 6</p><p>스크롤 되는 내용 7</p><p>스크롤 되는 내용 8</p><p>스크롤 되는 내용 9</p>
</div>
<div class="ds-scrollfog" data-direction="horizontal" style="display:flex;gap:var(--ybm-space-x2);width:300px;padding-inline:20px">
  <span class="ds-badge" data-size="large">전체</span><span class="ds-badge" data-size="large">디자인</span><span class="ds-badge" data-size="large">개발</span><span class="ds-badge" data-size="large">기획</span><span class="ds-badge" data-size="large">마케팅</span><span class="ds-badge" data-size="large">영업</span><span class="ds-badge" data-size="large">운영</span>
</div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
direction: 기본 세로 / data-direction="horizontal"   흐려지는 쪽에 최소 20 의 여백을 둔다(화면 전체 세로 스크롤은 위 20, 아래 80)
Figma: 끝 20 을 투명 → 불투명으로 / 코드는 배경색 덮개가 아니라 mask 라 어떤 배경 위에서도 쓴다
```
