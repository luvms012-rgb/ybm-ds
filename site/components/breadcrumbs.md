<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/breadcrumbs.html -->

# Breadcrumbs

지금 화면이 어디에 있는지 경로로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<nav class="ds-breadcrumbs" aria-label="현재 위치">
  <ol>
    <li><a href="#">홈</a></li>
    <li><a href="#">고객센터</a></li>
    <li><span aria-current="page">공지사항</span></li>
  </ol>
</nav>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 현재 항목 aria-current=page

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 웹 화면에서 깊이가 2단계 이상일 때만 씁니다. |
| **Do** | 모바일 앱에서는 뒤로 가기 버튼이 있는 머리말을 씁니다. |
| **Don't** | 마지막 항목(지금 화면)은 링크로 만들지 않습니다. |

## 예시

```html
<nav class="ds-breadcrumbs" aria-label="현재 위치"><ol><li><a href="#">홈</a></li><li><a href="#">고객센터</a></li><li><span aria-current="page">공지사항</span></li></ol></nav>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
Figma: t03 / 항목 fg/neutral-subtle(링크 hover 밑줄) / 현재 fg/neutral Medium / 구분 chevron-right 14 fg/neutral-subtle
       항목/구분 사이 x1 / 줄바꿈 허용(좁으면 다음 줄)
마지막 항목(현재 화면)은 링크가 아니다. 모바일 앱 화면에는 쓰지 않는다(뒤로 가기 헤더 사용).
```
