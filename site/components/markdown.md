<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/markdown.html -->

# Markdown

AI 답변처럼 제목, 목록, 표가 섞인 글을 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-markdown">…변환된 HTML…</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 본문 t04, 제목과 블록 간격

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | AI 답변처럼 서식 있는 글은 Markdown으로 감쌉니다. |
| **Do** | 코드는 Code Block에 넣습니다. |
| **Do** | 근거는 번호나 출처 칩(Citation)으로 붙입니다. |

## 예시

### AI 답변을 Markdown으로 감싸기

AI 답변처럼 제목, 목록, 굵은 글이 섞인 글은 변환된 HTML을 Markdown으로 감싸기만 합니다. 크기와 간격이 정해져 있어 답변마다 모양이 같아집니다.

```html
<div class="u-col u-gap-4 u-full" style="max-width: 480px">
  <div class="ds-chat-bubble" data-sender="user">환불은 언제까지 할 수 있어요?</div>
  <div class="ds-markdown">
    <p>수강을 시작했는지에 따라 달라요.</p>
    <h3>환불할 수 있는 때</h3>
    <ul>
      <li><strong>수강 전</strong>: 결제한 날부터 7일 안이면 모두 돌려받아요.</li>
      <li><strong>수강 중</strong>: 들은 강의만큼 빼고 돌려받아요.</li>
    </ul>
    <p>환불 신청은 <a href="#">내 강의실</a>에서 할 수 있어요.</p>
  </div>
</div>
```

### 코드는 Code Block에 넣기

글 사이의 코드는 Markdown 안에 Code Block으로 넣어 언어 이름과 복사 버튼을 함께 보여 줍니다. 낱말 하나 정도의 짧은 코드는 `code`로 글 안에 둡니다.

```html
<div class="ds-markdown u-full" style="max-width: 480px">
  <p>고른 항목 수는 <code>filter</code>로 거른 뒤 길이를 세면 돼요.</p>
  <figure class="ds-codeblock">
    <figcaption class="ds-codeblock__header">
      <span class="ds-codeblock__language">javascript</span>
      <button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="코드 복사"><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button>
    </figcaption>
    <pre class="ds-codeblock__code"><code>const count = items.filter((item) =&gt; item.checked).length;</code></pre>
  </figure>
  <p>하나도 고르지 않았으면 <code>0</code>이 나와요.</p>
</div>
```

### 근거는 번호와 출처 칩으로 붙이기

근거가 된 문장 뒤에 번호 Citation을 붙이고, 답변 끝에 출처 이름 칩을 모아 둡니다. 사용자가 답의 근거를 바로 열어 볼 수 있어 믿고 읽을 수 있습니다.

```html
<div class="ds-markdown u-full" style="max-width: 480px">
  <p>주문 금액이 3만 원 이상이면 배송비가 없어요.<a class="ds-citation" data-type="number" href="#" aria-label="출처 1">1</a> 섬이나 산간 지역은 3,000원이 더 붙어요.<a class="ds-citation" data-type="number" href="#" aria-label="출처 2">2</a></p>
  <p>
    <a class="ds-citation" href="#"><span class="ds-citation__icon"><i class="ds-icon ds-icon--file-text" aria-hidden="true"></i></span><span class="ds-citation__label">배송 안내</span></a>
    <a class="ds-citation" href="#"><span class="ds-citation__icon"><i class="ds-icon ds-icon--file-text" aria-hidden="true"></i></span><span class="ds-citation__label">자주 묻는 질문</span></a>
  </p>
</div>
```

## 규격

### 크기와 여백

```
변환된 HTML 을 감싸기만 하면 제목, 문단, 목록, 인용, 표, 코드의 크기와 간격이 맞춰진다. 코드 묶음은 Code Block, 출처는 Citation.
Figma: 본문 t04 / h1 t09 Bold, h2 t07 Bold (앞뒤 x6 / x3) / h3 t06, h4 t05, h5/h6 t04 SemiBold (앞뒤 x4 / x2)
  문단, 목록, 그림 x3 / 코드, 인용, 표 x4 / 구분선 x6 / 인용 왼쪽 2px stroke/neutral-weak, fg/neutral-muted
```
