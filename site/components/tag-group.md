<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/tag-group.html -->

# Tag Group

작성자, 날짜처럼 짧은 정보를 한 줄에 이어 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-tag-group" [data-size="t4"] [data-tone="neutral"]><span>홍길동</span><span>2026.10.02</span></span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

그 밖에: 작성자, 날짜, 조회수

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 태그마다 tone은 다르게 줄 수 있지만 size는 모두 같아야 합니다. |
| **Do** | 글자는 조사와 접속어를 빼고 6~10자 안으로, 한 줄에 들어가게 씁니다. |
| **Do** | 기본은 한 줄입니다. 말줄임 때문에 뜻이 흐려질 때만 줄을 바꿉니다. |
| **Do** | 자리가 모자라면 덜 중요한 태그부터 말줄임합니다. |

## 예시

```html
<span class="ds-tag-group"><span>운영팀</span><span>2026.10.22</span><span>조회 128</span></span><span class="ds-tag-group" data-size="t4" data-tone="neutral"><span>t4</span><span>neutral</span></span>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
size: t3(기본 13/20) / t4(14/21)   tone: neutralSubtle(기본) / neutral
Figma: 항목 사이 "/" 구분 / gap x1 / neutral fg/neutral-muted / neutralSubtle fg/neutral-subtle
```
