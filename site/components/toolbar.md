<!-- https://luvms012-rgb.github.io/yds/site/components/toolbar.html -->

# Toolbar

표나 카드 위에서 그 내용에 쓰는 동작을 한 줄로 모은 막대입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-toolbar" role="toolbar" aria-label="주문 목록 도구" [data-size="small"] [data-variant="muted"] [data-divider]>
  <div class="ds-toolbar__start">[<span class="ds-toolbar__title">주문 목록</span>] [<span class="ds-toolbar__count">3개 선택</span>] 버튼, 탭, 찾기 칸</div>
  [<div class="ds-toolbar__center">…</div>]
  <div class="ds-toolbar__end">… [<span class="ds-toolbar__separator" role="separator"></span>] …</div>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Start** `ds-toolbar__start` | 앞쪽에 놓는 영역입니다. |
| **Title** `ds-toolbar__title` | 막대가 다루는 내용의 이름입니다. |
| **Count** `ds-toolbar__count` | 고른 개수입니다. |
| **Center** `ds-toolbar__center` | 가운데에 놓는 영역입니다. |
| **End** `ds-toolbar__end` | 로그인 같은 버튼이 놓이는 오른쪽 끝 영역입니다. |
| **Separator** `ds-toolbar__separator` | 묶음 사이를 나누는 세로선입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | medium small |
| `variant` | plain muted |

그 밖에: `data-divider`

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 막대 안에서 좌우 화살표로 버튼 사이를 옮긴다

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 뒤로, 거르기 같은 보조 동작은 왼쪽에, 저장 같은 주된 동작은 오른쪽에 둡니다. |
| **Do** | 여러 줄을 고른 뒤 잠깐 나오는 막대는 muted 로 바탕을 깔아 구분합니다. |
| **Do** | 안의 버튼은 small 로 맞추고, 덜 쓰는 동작은 Menu 로 옮깁니다. |
| **Don't** | 화면 전체 메뉴에는 쓰지 않습니다. 그때는 Top Navigation 이나 Top App Bar 를 씁니다. |

## 예시

### 표 위 도구 막대

왼쪽에 표 이름을, 오른쪽에 거르기와 내려받기, 주된 동작을 둡니다. 아래 선으로 표와 나눕니다.

```html
<div class="u-col u-full">
  <div class="ds-toolbar" role="toolbar" aria-label="주문 목록 도구" data-divider><div class="ds-toolbar__start"><span class="ds-toolbar__title">주문 목록</span></div><div class="ds-toolbar__end"><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="거르기"><i class="ds-icon ds-icon--list-filter" aria-hidden="true"></i></button><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="내려받기"><i class="ds-icon ds-icon--download" aria-hidden="true"></i></button><span class="ds-toolbar__separator" role="separator"></span><button type="button" class="ds-btn" data-variant="neutralSolid" data-size="small"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i>새 주문</button></div></div>
  <table class="ds-table"><thead><tr><th>주문 번호</th><th>상품</th><th data-align="end">금액</th></tr></thead><tbody><tr><td>0012</td><td>데일리 백팩 18L</td><td data-align="end">42,000원</td></tr><tr><td>0011</td><td>스테인리스 텀블러</td><td data-align="end">18,000원</td></tr></tbody></table>
</div>
```

### 여러 줄을 고른 뒤 나오는 막대

고른 개수와 그 줄들에 할 수 있는 동작만 담고, 바탕을 깔아 잠깐 나온 막대임을 알립니다. 끝에 선택 해제를 둡니다.

```html
<div class="ds-toolbar u-full" role="toolbar" aria-label="고른 주문 도구" data-variant="muted" data-size="small"><div class="ds-toolbar__start"><span class="ds-toolbar__count">3개 선택</span></div><div class="ds-toolbar__end"><button type="button" class="ds-btn" data-variant="neutralWeak" data-size="small">내보내기</button><button type="button" class="ds-btn" data-variant="neutralWeak" data-size="small">삭제</button><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="선택 해제"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div></div>
```

## 규격

### 크기와 여백

```
size: medium(기본) 높이 56, 좌우 x4, 사이 x2 / small 높이 48, 좌우 x3 / 안의 버튼은 small 을 쓴다
variant: plain(기본, 바탕 없음) / muted(여러 줄을 고른 뒤 잠깐 나오는 막대, bg/neutral + shape/lg)
data-divider: 아래 선 stroke/neutral-muted 로 내용과 나눈다 / 묶음 사이 세로선 stroke/neutral-muted 높이 20
title t05 SemiBold / count(고른 개수) t04 Medium
ybm-ds.js: 막대 안에서 좌우 화살표로 버튼 사이를 옮긴다
```
