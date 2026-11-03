<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/markdown.html -->

# Markdown

AI 답변처럼 제목, 목록, 표가 섞인 글을 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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
| **Do** | 코드는 Code Block으로, 근거는 번호나 출처 칩(Citation)으로 붙입니다. |

## 예시

```html
  <div class="ds-markdown">
    <h2>제목 2</h2>
    <p>본문 문단은 14 크기로 쓰고, 문단 사이는 12를 띄웁니다. <code>inline code</code>와 <a href="#">링크</a>를 함께 쓸 수 있어요.<a class="ds-citation" data-type="number" href="#" aria-label="출처 1">1</a></p>
    <h3>제목 3</h3>
    <ul><li>목록 항목 하나</li><li>목록 항목 둘</li></ul>
    <blockquote>인용문은 왼쪽 선으로 구분합니다.</blockquote>
    <figure class="ds-codeblock">
      <figcaption class="ds-codeblock__header"><span class="ds-codeblock__language">javascript</span><button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="코드 복사"><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button></figcaption>
      <pre class="ds-codeblock__code"><code>const total = items
.filter((item) =&gt; item.checked)
.length;</code></pre>
    </figure>
    <p>출처: <a class="ds-citation" href="#"><span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span><span class="ds-citation__label">출처 이름</span></a><a class="ds-citation" href="#"><span class="ds-citation__label">아주 긴 출처 이름은 말줄임으로 끝납니다</span></a></p>
  </div>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
변환된 HTML 을 감싸기만 하면 제목, 문단, 목록, 인용, 표, 코드의 크기와 간격이 맞춰진다. 코드 묶음은 Code Block, 출처는 Citation.
Figma: 본문 t04 / h1 t09 Bold, h2 t07 Bold (앞뒤 x6 / x3) / h3 t06, h4 t05, h5/h6 t04 SemiBold (앞뒤 x4 / x2)
  문단, 목록, 그림 x3 / 코드, 인용, 표 x4 / 구분선 x6 / 인용 왼쪽 2px stroke/neutral-weak, fg/neutral-muted
```
