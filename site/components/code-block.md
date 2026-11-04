<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/code-block.html -->

# Code Block

코드를 보여 주고 버튼 하나로 복사하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<figure class="ds-codeblock">
  [<figcaption class="ds-codeblock__header"><span class="ds-codeblock__language">javascript</span>
    <button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="코드 복사"><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button></figcaption>]
  <pre class="ds-codeblock__code"><code>…</code></pre>
</figure>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Header** `ds-codeblock__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Language** `ds-codeblock__language` | 코드 언어 이름입니다. |
| **Copy** `ds-codeblock__copy` | 코드를 복사하는 버튼입니다. |
| **Code** `ds-codeblock__code` | 코드 본문입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `header` | true false |

그 밖에: 복사 버튼

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- data-ds-copy 버튼으로 코드 복사

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | AI 답변처럼 서식 있는 글은 Markdown으로 감쌉니다. |
| **Do** | 코드는 Code Block에 넣습니다. |
| **Do** | 근거는 번호나 출처 칩(Citation)으로 붙입니다. |

## 예시

### AI 답변 안에서 코드 보여 주기

Markdown 답변 안의 코드는 Code Block에 넣고, 머리줄에 언어 이름과 복사 버튼을 둡니다. 복사 버튼에 `data-ds-copy`를 붙이면 누를 때 코드가 복사됩니다.

```html
<div class="ds-markdown" style="width: 100%; max-width: 560px">
  <p>오늘 날짜를 우리말 형식으로 보여 주려면 <code>toLocaleDateString</code>을 쓰면 돼요.</p>
  <figure class="ds-codeblock">
    <figcaption class="ds-codeblock__header">
      <span class="ds-codeblock__language">javascript</span>
      <button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="코드 복사"><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button>
    </figcaption>
    <pre class="ds-codeblock__code"><code>const today = new Date();
const text = today.toLocaleDateString("ko-KR");
console.log(text); // 2026. 11. 4.</code></pre>
  </figure>
  <p>다른 나라 형식이 필요하면 <code>"ko-KR"</code> 자리만 바꾸면 돼요.</p>
</div>
```

### 긴 한 줄은 줄을 바꿔 다 보이게

한 줄이 긴 코드는 `data-wrap`을 붙여 가로로 밀지 않고 줄을 바꿔 보여 줍니다. 주소처럼 끝까지 읽고 그대로 붙여 넣어야 하는 코드에 씁니다.

```html
<div class="ds-markdown" style="width: 100%; max-width: 480px">
  <p>아래 줄을 페이지의 <code>&lt;head&gt;</code> 안에 붙여 넣어 주세요.</p>
  <figure class="ds-codeblock" data-wrap>
    <figcaption class="ds-codeblock__header">
      <span class="ds-codeblock__language">html</span>
      <button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="코드 복사"><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button>
    </figcaption>
    <pre class="ds-codeblock__code"><code>&lt;link rel="stylesheet" href="https://cdn.example.com/design-system/1.4.0/dist/styles.css"&gt;</code></pre>
  </figure>
</div>
```

### 짧은 명령은 머리줄 없이 끼워 넣기

명령 한 줄처럼 짧고 무엇인지 분명한 코드는 머리줄을 빼고 코드 칸만 둡니다. 순서 안내 사이에 끼워도 글의 흐름이 끊기지 않습니다.

```html
<div class="ds-markdown" style="width: 100%; max-width: 480px">
  <h3>프로젝트 받기</h3>
  <ol>
    <li>터미널을 열어요.</li>
    <li>아래 명령을 입력해요.</li>
  </ol>
  <figure class="ds-codeblock">
    <pre class="ds-codeblock__code"><code>git clone https://example.com/team/web.git</code></pre>
  </figure>
</div>
```

## 규격

### 크기와 여백

```
header 에는 언어 이름과 복사 버튼. 복사 버튼(data-ds-copy)은 ybm-ds.js 가 코드를 복사하고 잠시 data-copied 를 붙인다.
data-wrap: 긴 줄을 가로로 넘기지 않고 줄바꿈한다(2026-10-30 추가).
Figma: shape/sm, 1px stroke/neutral-weak, bg/neutral / header padding x2 x4, 아래 1px 선, 언어 12 Medium fg/neutral-subtle, 복사 24 안에 16
  코드 padding x3 x4, 13 / 20, fg/neutral, 긴 줄은 가로 스크롤
```
