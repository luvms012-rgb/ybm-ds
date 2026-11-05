<!-- https://luvms012-rgb.github.io/yds/site/components/tree.html -->

# Tree

폴더나 분류처럼 위아래 관계가 있는 항목을 접고 펼쳐 보여 주는 목록입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<ul class="ds-tree" role="tree" aria-label="폴더" [data-size="small"] [data-guides="none"]>
  <li class="ds-tree__node" role="treeitem" aria-expanded="true" [aria-selected="true"] tabindex="0">
    <div class="ds-tree__row">
      <span class="ds-tree__toggle" aria-hidden="true"></span>
      [<i class="ds-icon ds-icon--folder ds-tree__icon" aria-hidden="true"></i>]
      <span class="ds-tree__label">문서</span>
      [<span class="ds-tree__suffix">12</span>]
    </div>
    <ul class="ds-tree__group" role="group"> 아래 단계 ds-tree__node 들 </ul>
  </li>
  <li class="ds-tree__node" role="treeitem" tabindex="-1"><a class="ds-tree__row" href="#" [aria-current="page"]>…</a></li>
</ul>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Node** `ds-tree__node` | 트리의 항목 하나입니다. 아래 단계를 품을 수 있습니다. |
| **Row** `ds-tree__row` | 항목 한 줄입니다. |
| **Toggle** `ds-tree__toggle` | 펼치고 접는 표시입니다. |
| **Icon** `ds-tree__icon` | 뜻을 빠르게 알려 주는 아이콘입니다. |
| **Label** `ds-tree__label` | 항목 이름입니다. |
| **Suffix** `ds-tree__suffix` | 뒤에 붙는 아이콘이나 요소입니다. |
| **Group** `ds-tree__group` | 아래 단계 항목들을 묶은 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | medium small |
| `guides` | none |

그 밖에: `aria-expanded`, `aria-selected`

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 줄을 누르면 펼치고 접고 고른다(change, detail.value), 위아래 화살표 이동, 오른쪽 펼침, 왼쪽 접기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 줄마다 알아보기 쉬운 이름과 아이콘을 둡니다. |
| **Do** | 중요한 갈래는 처음부터 펼쳐 둡니다. |
| **Don't** | 4단계보다 깊게 넣지 않습니다. |
| **Don't** | 위아래 관계가 없는 목록에는 쓰지 않습니다. 그때는 List 를 씁니다. |

## 예시

### 파일 탐색기

폴더와 파일을 아이콘으로 나누고, 지금 연 파일을 고른 줄로 보여 줍니다. 펼칠 것이 없는 줄도 펼침 자리를 비워 둬 이름이 한 줄로 맞습니다.

```html
<ul class="ds-tree" role="tree" aria-label="강의 자료 폴더" style="width: 100%; max-width: 320px"><li class="ds-tree__node" role="treeitem" aria-expanded="true" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--folder-open ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">강의 자료</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" aria-expanded="true" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--folder-open ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">1주차</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" aria-selected="true" tabindex="0"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file-text ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">강의 계획서.docx</span></div></li><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">발표 자료.pdf</span></div></li></ul></li><li class="ds-tree__node" role="treeitem" aria-expanded="false" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--folder ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">2주차</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">읽을거리.pdf</span></div></li></ul></li></ul></li><li class="ds-tree__node" role="treeitem" aria-expanded="false" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--folder ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">과제</span><span class="ds-tree__suffix">3</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file-text ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">과제 1.docx</span></div></li></ul></li><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file-text ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">공지.txt</span></div></li></ul>
```

### 분류를 고르는 좁은 메뉴

이음선 없이 들여쓰기만 두고 줄 높이를 줄여 좁은 칸에 넣습니다. 분류 옆 숫자로 들어 있는 개수를 알립니다.

```html
<ul class="ds-tree" role="tree" aria-label="상품 분류" data-size="small" data-guides="none" style="width: 100%; max-width: 240px"><li class="ds-tree__node" role="treeitem" aria-selected="true" tabindex="0"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><span class="ds-tree__label">전체</span><span class="ds-tree__suffix">128</span></div></li><li class="ds-tree__node" role="treeitem" aria-expanded="true" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><span class="ds-tree__label">패션</span><span class="ds-tree__suffix">64</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><span class="ds-tree__label">가방</span><span class="ds-tree__suffix">22</span></div></li><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><span class="ds-tree__label">신발</span><span class="ds-tree__suffix">42</span></div></li></ul></li><li class="ds-tree__node" role="treeitem" aria-expanded="false" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><span class="ds-tree__label">생활</span><span class="ds-tree__suffix">40</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><span class="ds-tree__label">주방</span><span class="ds-tree__suffix">25</span></div></li></ul></li><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><span class="ds-tree__label">도서</span><span class="ds-tree__suffix">24</span></div></li></ul>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-tree-row` | `40px` |
| `--ds-tree-indent` | `20px` |

### 크기와 여백

```
size: medium(기본) 줄 40, t04 / small 줄 32, t03 / 줄 좌우 x2, 모서리 shape/sm, 아이콘 18
한 단계 들여쓰기 20(펼침 표시 자리 20, 펼칠 것이 없는 줄도 자리를 둔다) / 이음선 stroke/neutral-muted, data-guides="none" 이면 들여쓰기만
고름 aria-selected 또는 aria-current = bg/neutral-weak-alpha + fg/neutral + Medium (Side Navigation 과 같다)
ybm-ds.js: 줄을 누르면 펼치거나 접고 그 항목을 고른다(change, detail.value), 위아래 화살표로 이동, 오른쪽 펼침, 왼쪽 접기
```
