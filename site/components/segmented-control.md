<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/segmented-control.html -->

# Segmented Control

같은 내용을 목록, 달력처럼 다른 방식으로 바꿔 볼 때 쓰는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 누르면 하나만 aria-pressed, change 이벤트. 선택 배경이 고른 항목으로 미끄러져 이동(위치는 --ds-seg-x / --ds-seg-w)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 고르면 선택 배경이 미끄러지듯 옮겨 가는 움직임을 그대로 둡니다. |
| **Do** | 항목은 2~4개만 둡니다. 더 많으면 알아보기 어렵고 누를 자리가 좁아집니다. |
| **Do** | 한 화면에 하나만 둡니다. 여러 개를 두면 무엇이 중요한지 흐려집니다. |
| **Do** | 라벨은 짧게 씁니다. 칸에 비해 라벨이 길면 다른 컴포넌트를 쓰세요. |
| **Don't** | 화면 이동에는 쓰지 않습니다. 화면을 옮길 때는 Tabs를 씁니다. |

## 예시

### 같은 내용의 보기 방식만 바꾸기

수업 일정을 목록으로 볼지 달력으로 볼지처럼 같은 내용을 보는 방식만 바꿀 때 씁니다. 다른 화면으로 옮겨 가는 메뉴는 Tabs로 만듭니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 420px">
  <div class="u-flex u-center u-between">
    <h3 class="ds-t06 ds-fw-bold">수업 일정</h3>
    <div class="ds-segmented" role="group" aria-label="보기 방식">
      <button type="button" class="ds-segmented__item" aria-pressed="true">목록</button>
      <button type="button" class="ds-segmented__item" aria-pressed="false">달력</button>
    </div>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">영어 회화 기초</span>
          <span class="ds-list-item__desc">11월 6일 목요일 오후 7시</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">비즈니스 이메일 쓰기</span>
          <span class="ds-list-item__desc">11월 8일 토요일 오전 10시</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 짧은 선택지 2~4개 중 하나 고르기

기간처럼 짧은 선택지를 2~4개만 둡니다. 선택지가 더 많거나 라벨이 길면 Select를 씁니다.
