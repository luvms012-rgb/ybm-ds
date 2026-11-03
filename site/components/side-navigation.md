<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/side-navigation.html -->

# Side Navigation

PC 화면 왼쪽에 두는 메뉴로, 화면 사이를 오갈 때 씁니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<nav class="ds-sidenav" aria-label="메뉴" [data-collapsed]>
  <div class="ds-sidenav__header"><button class="ds-sidenav__trigger" aria-label="메뉴 접기"><i class="ds-icon ds-icon--panel-left"></i></button></div>
  <div class="ds-sidenav__content">
    <div class="ds-sidenav__group">
      [<div class="ds-sidenav__group-label">그룹</div>]
      <a class="ds-sidenav__item" href="#" aria-current="page">
        <span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--house-solid"></i></span>
        <span class="ds-sidenav__label">메뉴</span>
        [<i class="ds-icon ds-icon--chevron-down ds-icon--sm ds-sidenav__suffix"></i>]
      </a>
    </div>
  </div>
  <div class="ds-sidenav__footer">…</div>
</nav>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: expanded 240, collapsed 56

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 화면 폭이 1280 이상이면 펼치고, 768 이상이면 접고, 그보다 좁으면 서랍(Drawer)으로 바꿉니다. |
| **Do** | 하위 메뉴가 있는 항목은 눌러도 이동하지 않고 펼치거나 접기만 합니다. 하위 메뉴가 선택돼 있으면 부모 항목은 펼쳐 둡니다. |
| **Do** | 메뉴 이름은 짧게 씁니다. |
| **Don't** | 하위 메뉴가 없는 항목은 누르면 바로 이동하고, 화살표를 달지 않습니다. |

## 예시

```html
<nav class="ds-sidenav" aria-label="메뉴">
  <div class="ds-sidenav__header"><button class="ds-sidenav__trigger" aria-label="메뉴 접기" onclick="this.closest('.ds-sidenav').toggleAttribute('data-collapsed')"><i class="ds-icon ds-icon--panel-left" aria-hidden="true"></i></button></div>
  <div class="ds-sidenav__content"><div class="ds-sidenav__group">
    <div class="ds-sidenav__group-label">쇼핑</div>
    <a class="ds-sidenav__item" href="#" aria-current="page"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--house-solid" aria-hidden="true"></i></span><span class="ds-sidenav__label">홈</span></a>
    <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></span><span class="ds-sidenav__label">주문 내역</span></a>
    <a class="ds-sidenav__item" href="#"><span class="ds-sidenav__prefix"><i class="ds-icon ds-icon--file-text" aria-hidden="true"></i></span><span class="ds-sidenav__label">배송 조회</span><i class="ds-icon ds-icon--chevron-down ds-icon--sm ds-sidenav__suffix" aria-hidden="true"></i></a>
  </div></div>
</nav>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
collapsed: data-collapsed (240 → 56)
Figma: bg/canvas / header h64 padding x2(트리거 40 shape/sm / panel-left 20 fg/neutral-subtle 오른쪽 정렬)
  content padding 8/8/24/8 / 그룹 사이 x2 / group label padding x1_5 / Static t04 Bold fg/neutral-muted
  item h44 / px x2(접힘 x2_5 / 폭 40) / gap x3 / shape/sm / prefix 20 / label Static t04 Medium fg/neutral-muted / 아이콘 fg/neutral-subtle
  current bg/neutral-weak-alpha + 글자/아이콘 fg/neutral / disabled fg/disabled / suffix 16
```
