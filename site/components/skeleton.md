<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/skeleton.html -->

# Skeleton

내용을 불러오는 동안 그 자리를 미리 보여 주는 컴포넌트입니다. 기다리는 시간이 덜 지루해집니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-skeleton" style="width:220px;height:16px"></span>
<span class="ds-skeleton" data-shape="circle" style="--ds-skeleton-size:48px"></span>
<span class="ds-skeleton" data-shape="text" data-lines="3"></span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `shape` | rect circle text |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 목록이나 카드처럼 곧 나타날 모양을 미리 보여 줄 수 있는 곳에 씁니다. |
| **Do** | 모서리는 나중에 들어올 콘텐츠와 똑같이 맞춥니다. |
| **Do** | 1~10초 걸리고 모양을 미리 보여 줄 수 있으면 Skeleton을 씁니다. 1~4초 동안 기다림만 알리면 될 때는 Progress Circle을 씁니다. |
| **Don't** | Progress Circle과 함께 쓰지 않습니다. 같은 로딩을 두 번 알리게 됩니다. |

## 예시

### 목록 모양 그대로 자리 잡기

목록을 불러오는 동안 줄마다 사진, 제목, 설명 자리를 Skeleton으로 미리 그립니다. 곧 나타날 모양을 알 수 있고, 내용이 들어와도 줄 높이가 그대로라 화면이 덜컹거리지 않습니다.

```html
<ul class="ds-list u-full" data-variant="inset" data-divider aria-busy="true" aria-label="강의 목록 불러오는 중" style="max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-skeleton" style="width: 48px; height: 48px"></span></span>
      <span class="ds-list-item__content u-gap-2">
        <span class="ds-skeleton" style="width: 60%; height: 16px"></span>
        <span class="ds-skeleton" style="width: 35%; height: 12px"></span>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-skeleton" style="width: 48px; height: 48px"></span></span>
      <span class="ds-list-item__content u-gap-2">
        <span class="ds-skeleton" style="width: 72%; height: 16px"></span>
        <span class="ds-skeleton" style="width: 40%; height: 12px"></span>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-skeleton" style="width: 48px; height: 48px"></span></span>
      <span class="ds-list-item__content u-gap-2">
        <span class="ds-skeleton" style="width: 52%; height: 16px"></span>
        <span class="ds-skeleton" style="width: 30%; height: 12px"></span>
      </span>
    </div>
  </li>
</ul>
```

### 모서리를 들어올 사진과 맞추기

사진 자리는 나중에 들어올 Image Frame과 같은 모서리가 되도록 `--ds-skeleton-radius`를 맞춥니다. 모서리가 다르면 사진이 들어오는 순간 모양이 바뀌어 보입니다.

```html
<ul class="u-col u-gap-4 u-full" style="max-width: 420px">
  <li class="u-flex u-gap-4">
    <div class="ds-imageframe" data-radius="lg" style="width: 88px">
      <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=200&q=70" alt="">
    </div>
    <div class="u-col u-gap-1">
      <span class="ds-t05 ds-fw-semibold">영어 단어장 기본편</span>
      <span class="ds-t04 ds-fg-subtle">15,000원</span>
    </div>
  </li>
  <li class="u-flex u-gap-4" aria-busy="true" aria-label="상품 불러오는 중">
    <span class="ds-skeleton" style="width: 88px; height: 88px; --ds-skeleton-radius: var(--ds-shape-lg)"></span>
    <div class="u-col u-gap-2 u-grow">
      <span class="ds-skeleton" style="width: 65%; height: 16px"></span>
      <span class="ds-skeleton" style="width: 30%; height: 14px"></span>
    </div>
  </li>
</ul>
```

### 긴 글은 줄 모양으로 미리 보여 주기

공지 본문처럼 여러 줄 글이 들어올 자리는 `data-shape="text"`로 줄 모양을 그립니다. 같은 자리에 Progress Circle을 함께 돌리면 로딩을 두 번 알리게 되니 Skeleton 하나만 둡니다.

```html
<article class="u-col u-gap-4 u-full" aria-busy="true" aria-label="공지 불러오는 중" style="max-width: 420px">
  <div class="u-col u-gap-2">
    <span class="ds-skeleton" style="width: 75%; height: 24px"></span>
    <span class="ds-skeleton" style="width: 35%; height: 14px"></span>
  </div>
  <hr class="ds-divider">
  <span class="ds-skeleton" data-shape="text" data-lines="3"></span>
  <span class="ds-skeleton" data-shape="text" data-lines="3"></span>
</article>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-skeleton-color` | `var(--ds-color-palette-gray-200)` |
| `--ds-skeleton-radius` | `var(--ds-shape-sm)` |
| `--ds-skeleton-size` | `48px` |

### 크기와 여백

```
shape: rectangle(기본) / circle / text
Figma: palette/gray-200 / rectangle shape/sm / circle pill / text 줄 높이 14 / 줄 사이 x2 / 마지막 줄 64%
모서리(2026-11-03): --ds-skeleton-radius 로 나중에 들어올 콘텐츠와 같게 맞춘다
움직임 줄이기(2026-11-03): 설정을 켠 사람에게는 깜빡이지 않는다
```
