<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/bottom-navigation.html -->

# Bottom Navigation

앱 화면 아래에서 주요 메뉴 사이를 오가는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<nav class="ds-bottomnav" aria-label="주요 메뉴">
  <a class="ds-bottomnav__item" href="#" aria-current="page">
    <span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--house-solid ds-icon--lg"></i>[<span class="ds-bottomnav__badge--dot"></span>]</span>
    <span class="ds-bottomnav__label">홈</span>
  </a>
</nav>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Item**`ds-bottomnav__item` | 목록의 항목 하나입니다. |
| **Icon**`ds-bottomnav__icon` | 메뉴를 나타내는 아이콘입니다. |
| **Badge Dot**`ds-bottomnav__badge--dot` | 새 소식을 알리는 점입니다. |
| **Label**`ds-bottomnav__label` | 메뉴 이름입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 뱃지 `__badge--dot/--count` (bg/critical-solid)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 탭은 3~5개를 둡니다. |
| **Do** | 라벨은 한글 5자(영문 10자) 안으로 씁니다. |
| **Do** | 아이콘은 채움(Solid) 모양을 씁니다. |
| **Do** | 배지 숫자는 1~99로 쓰고, 100 이상은 `99+`로 씁니다. |
| **Do** | 숫자가 0이면 배지를 숨깁니다. |
| **Don't** | 숫자 배지를 세 개 넘게 한꺼번에 띄우지 않습니다. |

## 예시

```html
<nav class="ds-bottomnav" aria-label="주요 메뉴" style="position:static">
  <a class="ds-bottomnav__item" href="#" aria-current="page"><span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--house-solid ds-icon--lg" aria-hidden="true"></i></span><span class="ds-bottomnav__label">홈</span></a>
  <a class="ds-bottomnav__item" href="#"><span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--calendar ds-icon--lg" aria-hidden="true"></i><span class="ds-bottomnav__badge--dot"></span></span><span class="ds-bottomnav__label">일정</span></a>
  <a class="ds-bottomnav__item" href="#"><span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--file-text ds-icon--lg" aria-hidden="true"></i></span><span class="ds-bottomnav__label">알림</span></a>
  <a class="ds-bottomnav__item" href="#"><span class="ds-bottomnav__icon"><i class="ds-icon ds-icon--menu ds-icon--lg" aria-hidden="true"></i></span><span class="ds-bottomnav__label">전체</span></a>
</nav>
```

## 규격

### 크기와 여백

```
Figma: bg/layer-default / 상단 1px stroke/neutral-muted / 항목 높이 51 / padding 4/2 / gap 2 / 아이콘 24(Solid)
  label Static t01 SemiBold / 선택 아이콘 fg/brand + 라벨 fg/neutral / 미선택 fg/neutral-subtle / disabled fg/disabled
  뱃지 bg/critical-solid + 1.5px bg/layer-default 테두리 / dot 6 / count 최소 18 / Static t01 Bold static-white
  안쪽 최대 폭 480 / 하단 safe area
```
