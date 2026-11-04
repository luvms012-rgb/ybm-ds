<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/table.html -->

# Table

여러 항목을 같은 기준으로 나란히 놓고 비교하는 표입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-table-wrap">            ← 열이 넘치면 가로 스크롤
  <table class="ds-table" [data-density="compact"]>
    <thead><tr><th scope="col">선택</th><th scope="col">제목</th><th scope="col" data-align="end">금액</th></tr></thead>
    <tbody>
      <tr class="ds-table__group"><td colspan="3">묶음 이름</td></tr>        ← 묶음 행(선택)
      <tr [aria-selected="true"] [data-interactive]>
        <td><label class="ds-checkbox">…</label></td>                         ← 체크박스만 든 칸은 폭 52 고정
        <td><span class="ds-table__stack"><span>제목</span><span>보조 글</span></span></td>  ← 두 줄 칸
        <td data-align="end">10,000원</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Group**`ds-table__group` | 관련 항목을 묶는 영역입니다. |
| **Stack**`ds-table__stack` | 여러 줄을 쌓아 보여 주는 칸입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `density` | compact |
| 켜고 끄는 속성 | `align` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 열은 모바일에서 3개, PC에서 6개 안팎까지 둡니다. 넘치면 가로로 밀어서 봅니다. 모바일에서 열이 많으면 표 대신 Card 목록으로 바꿉니다. |
| **Do** | 표에는 꼭 머리 줄을 둡니다(thead와 th scope="col"). |
| **Do** | 데이터가 없을 때는 머리 줄 아래에 Empty(small)를 표 전체 폭으로 둡니다. |
| **Do** | 마우스를 올렸을 때 색이 바뀌는 효과는 줄을 눌러 상세로 가는 표에서만 씁니다. |
| **Do** | 글은 왼쪽, 숫자와 금액은 오른쪽에 맞춥니다. 번호, 날짜, 상태처럼 짧고 길이가 같은 값은 가운데에 맞춥니다. |
| **Don't** | 한 표 안에서 density를 섞지 않습니다. 데이터가 많은 관리 화면은 compact, 일반 사용자 화면은 default를 씁니다. |
| **Don't** | 한 칸에 두 줄 넘게 넣지 않습니다. 긴 글은 말줄임하고 상세 화면에서 보여 줍니다. |

## 예시

```html
<div class="ds-table-wrap">
  <table class="ds-table">
    <thead><tr><th scope="col" data-align="center" style="width:72px">번호</th><th scope="col">제목</th><th scope="col" data-align="center" style="width:120px">등록일</th></tr></thead>
    <tbody>
      <tr data-interactive><td data-align="center">12</td><td>11월 배송 일정 안내</td><td data-align="center">2026.10.22</td></tr>
      <tr data-interactive aria-selected="true"><td data-align="center">11</td><td>추가 할인 이벤트 공지</td><td data-align="center">2026.10.18</td></tr>
      <tr data-interactive><td data-align="center">10</td><td>영수증 발급 방법 변경 안내</td><td data-align="center">2026.10.10</td></tr>
    </tbody>
  </table>
</div>

<div class="ds-table-wrap">
  <table class="ds-table">
    <thead><tr><th scope="col"><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="모든 행 선택"></label></th><th scope="col">주문</th><th scope="col">상태</th><th scope="col" data-align="end">금액</th></tr></thead>
    <tbody>
      <tr class="ds-table__group"><td colspan="4">오늘</td></tr>
      <tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="주문 1042 선택"></label></td><td><span class="ds-table__stack"><span>무선 이어폰 외 1건</span><span>주문 1042</span></span></td><td><span class="ds-badge" data-tone="informative">배송 준비</span></td><td data-align="end">128,000원</td></tr>
      <tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="주문 1041 선택" checked></label></td><td><span class="ds-table__stack"><span>텀블러 500ml</span><span>주문 1041</span></span></td><td><span class="ds-badge" data-tone="positive">배송 중</span></td><td data-align="end">24,900원</td></tr>
      <tr class="ds-table__group"><td colspan="4">어제</td></tr>
      <tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="주문 1038 선택"></label></td><td><span class="ds-table__stack"><span>여행용 파우치 세트</span><span>주문 1038</span></span></td><td><span class="ds-badge">배송 완료</span></td><td data-align="end">39,000원</td></tr>
    </tbody>
  </table>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-table-head-h` | `44px` |
| `--ds-table-row-h` | `56px` |
| `--ds-table-line` | `var(--ds-color-stroke-neutral-muted)` |

### 크기와 여백

```
density: default(기본) / compact
2026-11-03 개편(템플릿 표 기준과 같게): 위 진한 선 하나 + 머리줄 바탕 없음 + 행 사이 옅은 선
Figma: 표 위 1px stroke/neutral-solid / 칸 아래 1px stroke/neutral-muted / header 바탕 없음
  높이 header 44 / body 56 (compact 44 / 48) / 칸 좌우 x3, 양 끝 칸 x4 / 한 줄 말줄임
  header t03 Regular fg/neutral-subtle / body t04 fg/neutral / 두 줄 칸 아래 줄 t02 fg/neutral-subtle
  묶음 행 44 bg/neutral-weak-alpha + SemiBold / hover(data-interactive 행만) bg/neutral-weak-alpha / selected bg/brand-weak
  정렬: 글 start(기본) / 숫자 end / 짧은 고정 길이 값(번호/날짜/상태) center → data-align (right 는 end 와 같음)
  선은 칸 border 로 그린다(행 그림자는 칸에 바탕을 넣으면 가려지고, 표 양 끝에 세로 선이 생긴다)
  Card 안에 넣으면 카드 테두리가 틀이 되므로 위 진한 선과 마지막 줄 선을 뺀다 (2026-11-03)
```
