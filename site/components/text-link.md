<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/text-link.html -->

# Text Link

다른 화면이나 외부 페이지로 이동하는 글자 링크입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<a class="ds-link" href="…" [data-size="small"]>비밀번호를 잊으셨나요?</a>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `Figma state` | enabled hover |

그 밖에: `--ds-link-color(-hover)`

## 예시

```html
<a class="ds-link" href="#">아이디 찾기</a><a class="ds-link" href="#">비밀번호 재설정</a>

<a class="ds-link" data-size="small" href="#">비밀번호를 잊으셨나요?</a><a class="ds-link" data-size="small" href="#">전체 보기</a>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-link-color` | `var(--ybm-color-fg-neutral-subtle)` |
| `--ds-link-color-hover` | `var(--ybm-color-fg-neutral)` |

### 크기와 여백

```
size: medium(기본, t05) / small(t03, 본문 옆이나 표, 칸 머리처럼 보조 자리) (2026-11-03 추가)
```
