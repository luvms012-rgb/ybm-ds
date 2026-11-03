<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/list-list-item.html -->

# List · List Item

설정, 메뉴처럼 항목을 한 줄씩 늘어놓는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<ul class="ds-list" [data-variant="inset"] [data-divider]>
  <li>
    <a class="ds-list-item" href="#" [data-size="small"]>
      [<span class="ds-list-item__prefix"><i class="ds-icon ds-icon--credit-card" aria-hidden="true"></i></span>]
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">결제 수단</span>
        [<span class="ds-list-item__desc">등록된 카드 2개</span>]
      </span>
      [<span class="ds-list-item__suffix">값 · Badge · Switch</span>]
      [<i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>]
    </a>
  </li>
</ul>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `divider` |

그 밖에: variant inset, size small, prefix/suffix/chevron

## CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-list-item-min-h` | `56px` |
| `--ds-list-item-py` | `var(--ybm-space-x3)` |
| `--ds-list-item-px` | `var(--ybm-space-x4)` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 한 줄 안에 누를 수 있는 요소는 3개까지만 둡니다. |
| **Don't** | 줄 전체가 링크이면 안에 다른 버튼을 넣지 않습니다. |

## 예시

```html
<ul class="ds-list" data-variant="inset" data-divider>
  <li><a class="ds-list-item" href="#"><span class="ds-list-item__prefix"><i class="ds-icon ds-icon--id-card" aria-hidden="true"></i></span><span class="ds-list-item__content"><span class="ds-list-item__title">내 정보</span><span class="ds-list-item__desc">이름 · 연락처 · 이메일</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
  <li><a class="ds-list-item" href="#"><span class="ds-list-item__prefix"><i class="ds-icon ds-icon--credit-card" aria-hidden="true"></i></span><span class="ds-list-item__content"><span class="ds-list-item__title">결제 수단</span></span><span class="ds-list-item__suffix">카드 2개</span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
  <li><label class="ds-list-item"><span class="ds-list-item__prefix"><i class="ds-icon ds-icon--message-circle" aria-hidden="true"></i></span><span class="ds-list-item__content"><span class="ds-list-item__title">알림 받기</span></span><span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" checked aria-label="알림 받기"></span></span></label></li>
  <li><a class="ds-list-item" href="#" aria-disabled="true"><span class="ds-list-item__prefix"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span><span class="ds-list-item__content"><span class="ds-list-item__title">언어 설정</span><span class="ds-list-item__desc">준비 중</span></span></a></li>
</ul>
<ul class="ds-list">
  <li><a class="ds-list-item" href="#" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">공지사항</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
  <li><a class="ds-list-item" href="#" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">자주 묻는 질문</span></span><span class="ds-list-item__suffix"><span class="ds-badge" data-tone="brand">NEW</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
  <li><a class="ds-list-item" href="#" data-size="small"><span class="ds-list-item__content"><span class="ds-list-item__title">1:1 문의</span></span><i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i></a></li>
</ul>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
variant: plain(기본) / inset(카드 안처럼 둥근 묶음)   size: medium(기본) / small   divider: data-divider
Figma item medium: min-h56 / py x3 / px x4 / gap x3 / title t05 fg/neutral / desc t03 fg/neutral-subtle
            small : min-h48 / py x2_5 / title t04 / desc t02
  prefix 24(아이콘 fg/neutral-subtle, Avatar 36 가능) / suffix t04 fg/neutral-subtle / chevron 20 fg/neutral-subtle
  pressed bg/transparent-pressed / disabled 글자 fg/disabled / divider 1px stroke/neutral-subtle(본문 시작점부터)
  inset: bg/layer-default / 1px stroke/neutral-weak / shape/xl / 바깥 여백 없음
상호작용 요소(링크/스위치 등)는 한 줄에 4개 미만. 행 전체가 링크이면 안에 다른 버튼을 넣지 않는다.
```
