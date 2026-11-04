<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/citation.html -->

# Citation

본문의 근거가 된 출처를 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<a class="ds-citation" data-type="number" href="#ref-1" aria-label="출처 1">1</a>
<a class="ds-citation" href="https://…">[<span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span>]<span class="ds-citation__label">출처 이름</span></a>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Icon** `ds-citation__icon` | 출처 사이트 아이콘입니다. |
| **Label** `ds-citation__label` | 출처 이름입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `type` | number label |
| 켜고 끄는 속성 | `icon` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | AI 답변처럼 서식 있는 글은 Markdown으로 감쌉니다. |
| **Do** | 코드는 Code Block에 넣습니다. |
| **Do** | 근거는 번호나 출처 칩(Citation)으로 붙입니다. |

## 예시

### 답변 문장 뒤에 번호로 근거 붙이기

AI 답변은 Markdown으로 감싸고, 근거가 된 문장 끝에 번호 Citation을 붙입니다. 번호를 누르면 답변 아래 출처 목록으로 옮겨 가 원문을 확인할 수 있습니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 520px">
  <div class="ds-chat-bubble" data-sender="user">받은 지 5일 된 상품도 환불돼요?</div>
  <div class="ds-markdown">
    <p>네, 상품을 받은 날부터 7일 안이면 환불을 신청할 수 있어요.<a class="ds-citation" data-type="number" href="#citation-ex1-ref1" aria-label="출처 1">1</a> 포장을 뜯었더라도 쓰지 않은 상품이면 돼요.<a class="ds-citation" data-type="number" href="#citation-ex1-ref2" aria-label="출처 2">2</a></p>
    <h4>출처</h4>
    <ol>
      <li id="citation-ex1-ref1"><a href="#">교환과 환불 규정</a></li>
      <li id="citation-ex1-ref2"><a href="#">환불 자주 묻는 질문</a></li>
    </ol>
  </div>
</div>
```

### 출처가 적으면 이름을 칩으로 보여 주기

출처가 한두 곳이면 번호 대신 출처 이름을 칩으로 붙여 어디서 온 내용인지 바로 보여 줍니다. 이름이 길면 칩 안에서 말줄임으로 줄어듭니다.

```html
<div class="ds-markdown" style="width: 100%; max-width: 520px">
  <h3>택배 상자 버리는 법</h3>
  <p>송장과 테이프를 떼고 상자를 접어서 종이류로 내놓으면 돼요.<a class="ds-citation" href="#"><span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span><span class="ds-citation__label">분리배출 안내</span></a></p>
  <p>비닐 완충재는 따로 모아 비닐류로 내놓아요.<a class="ds-citation" href="#"><span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span><span class="ds-citation__label">생활 쓰레기를 바르게 내놓는 방법 모음</span></a></p>
</div>
```

## 규격

### 크기와 여백

```
type: 기본 label(출처 이름 칩) / data-type="number"(글 뒤 위첨자 번호)
Figma: 높이 x5, t02, fg/neutral-muted / number 최소 폭 x5, 좌우 x1, pill, bg/brand-weak, SemiBold
  label 좌우 x2(아이콘이 있으면 왼쪽 x0_5), gap x1, shape/sm, 1px stroke/neutral-weak, 최대 15em / 아이콘 칸 x4 원, 아이콘 12
```
