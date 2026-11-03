<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/code-block.html -->

# Code Block

코드를 보여 주고 한 번에 복사하게 하는 컴포넌트입니다.

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
| **Header**`ds-codeblock__header` | 제목과 닫기 버튼이 놓이는 머리 영역입니다. |
| **Language**`ds-codeblock__language` | 코드 언어 이름입니다. |
| **Copy**`ds-codeblock__copy` | 코드를 복사하는 버튼입니다. |
| **Code**`ds-codeblock__code` | 코드 본문입니다. |

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
| **Do** | 코드는 Code Block으로, 근거는 번호나 출처 칩(Citation)으로 붙입니다. |

## 예시

```html
<figure class="ds-codeblock"><pre class="ds-codeblock__code"><code>npm install ybm-ds</code></pre></figure>
```

## 규격

### 크기와 여백

```
header 에는 언어 이름과 복사 버튼. 복사 버튼(data-ds-copy)은 ybm-ds.js 가 코드를 복사하고 잠시 data-copied 를 붙인다.
data-wrap: 긴 줄을 가로로 넘기지 않고 줄바꿈한다(2026-10-30 추가).
Figma: shape/sm, 1px stroke/neutral-weak, bg/neutral / header padding x2 x4, 아래 1px 선, 언어 12 Medium fg/neutral-subtle, 복사 24 안에 16
  코드 padding x3 x4, 13 / 20, fg/neutral, 긴 줄은 가로 스크롤
```
