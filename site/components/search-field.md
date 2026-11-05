<!-- https://luvms012-rgb.github.io/yds/site/components/search-field.html -->

# Search Field

지우기와 취소 버튼을 함께 둔 찾기 칸입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<form class="ds-searchfield" role="search" [data-variant="fill"] action="…">
  <div class="ds-input" data-variant="outline" data-size="medium">
    <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
    <input class="ds-input__control" type="search" name="q" placeholder="찾을 낱말" aria-label="찾기">
    <button type="button" class="ds-input__clear" aria-label="지우기"></button>
  </div>
  [<button type="button" class="ds-searchfield__cancel">취소</button>]
</form>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Icon** `ds-input__icon` | 뜻을 빠르게 알려 주는 아이콘입니다. |
| **Control** `ds-input__control` | 실제로 값을 입력하거나 고르는 부분입니다. |
| **Clear** `ds-input__clear` | 입력한 값을 지우는 버튼입니다. |
| **Cancel** `ds-searchfield__cancel` | 찾기를 그만두는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | outline fill |

그 밖에: cancel 버튼

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | `<form role="search">` 로 감싸 Enter 로 보내게 합니다. |
| **Do** | 앱 머리나 목록 위처럼 바탕이 흰 곳에는 fill 을 씁니다. |
| **Do** | 추천어 목록이 필요하면 Search Suggestion 을 함께 씁니다. |
| **Do** | 취소 버튼은 찾기 화면을 따로 열었을 때만 둡니다. |

## 예시

### 앱 머리의 찾기 칸

찾기 화면을 따로 열었을 때는 바탕을 깐 칸 옆에 취소를 둡니다. 취소를 누르면 앞 화면으로 돌아갑니다.

```html
<div class="u-full" style="max-width: 375px; padding: var(--ds-space-x2) var(--ds-space-x4)"><form class="ds-searchfield" role="search" data-variant="fill" action="#"><div class="ds-input" data-variant="outline" data-size="medium"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" type="search" name="q" placeholder="찾을 낱말을 넣어 주세요" aria-label="찾기"><button type="button" class="ds-input__clear" aria-label="지우기"></button></div><button type="button" class="ds-searchfield__cancel">취소</button></form></div>
```

### 목록 위에서 거르기

목록 위 찾기 칸은 테두리 칸으로 두고 취소는 두지 않습니다. 글자를 넣으면 지우기 버튼이 나옵니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 420px">
  <form class="ds-searchfield" role="search" action="#"><div class="ds-input" data-variant="outline" data-size="medium"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" type="search" name="q" placeholder="상품 이름으로 찾기" aria-label="찾기" value="텀블러"><button type="button" class="ds-input__clear" aria-label="지우기"></button></div></form>
  <ul class="ds-list" data-variant="inset" data-divider><li><div class="ds-list-item"><span class="ds-list-item__content"><span class="ds-list-item__title">스테인리스 텀블러 500ml</span><span class="ds-list-item__desc">18,000원</span></span></div></li></ul>
</div>
```

## 규격

### 크기와 여백

```
칸은 Text Field(outline large / medium) 그대로 / variant fill: 선 없이 bg/neutral, 모서리 shape/pill(앱 머리, 목록 위)
cancel t05 Medium fg/neutral, 칸과 사이 x3 / Enter 로 form 을 보낸다(추천어 목록은 Search Suggestion)
```
