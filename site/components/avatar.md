<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/avatar.html -->

# Avatar

사람이나 팀을 프로필 사진 또는 이름 첫 글자로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
사진   <span class="ds-avatar" data-size="48"><img src="…" alt="김민수"></span>
이니셜 <span class="ds-avatar" role="img" aria-label="김민수"><span class="ds-avatar__initials" aria-hidden="true">김</span></span>
기본   <span class="ds-avatar" role="img" aria-label="김민수"></span>
상태   … <span class="ds-avatar__status" data-tone="positive"></span></span>   ← 아바타 aria-label 에 "김민수, 온라인" 처럼 합쳐 적는다
배지   … <span class="ds-avatar__badge"><img src="…" alt=""></span></span>   ← 소속·서비스 로고 등 작은 이미지
링크   <a class="ds-avatar" href="…" aria-label="김민수 프로필">…</a>  /  <button type="button" class="ds-avatar" aria-label="…">
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Initials** `ds-avatar__initials` | 사진이 없을 때 보이는 이름 첫 글자입니다. |
| **Status** `ds-avatar__status` | 접속 상태를 알리는 점입니다. |
| **Badge** `ds-avatar__badge` | 개수나 새 소식을 알리는 배지입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | 20 24 36 42 48 56 64 80 96 108 |
| `shape` | circle rounded square |
| `status tone` | positive neutral critical |
| `group size` | 20~64 × shape |

그 밖에: `+N`

## 예시

### 사진이 없으면 이니셜로 채우기

사진이 없으면 이름 첫 글자를, 이름도 모르면 기본 모양을 보여 줍니다. 이름이 바로 옆에 있으면 Avatar에 `aria-hidden`을 붙여 이름을 두 번 읽지 않게 합니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-avatar" aria-hidden="true"><span class="ds-avatar__initials">김</span></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">김민수</span>
        <span class="ds-list-item__desc">minsu@example.com</span>
      </span>
      <span class="ds-list-item__suffix">소유자</span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-avatar" aria-hidden="true"><span class="ds-avatar__initials">이</span></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">이서연</span>
        <span class="ds-list-item__desc">seoyeon@example.com</span>
      </span>
      <span class="ds-list-item__suffix">편집 가능</span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-avatar" aria-hidden="true"></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">guest@example.com</span>
        <span class="ds-list-item__desc">초대를 아직 받지 않았어요</span>
      </span>
      <span class="ds-list-item__suffix">보기만 가능</span>
    </div>
  </li>
</ul>
```

### 접속 상태를 점과 글로 함께 알리기

상태 점은 색과 모양이 함께 달라 색을 구분하기 어려워도 알아볼 수 있습니다. 이름 아래에도 상태를 글로 적고, Avatar만 둘 때는 `aria-label`에 "이름, 상태"로 적습니다.

```html
<ul class="ds-list" data-divider style="width: 100%; max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><span class="ds-avatar" data-size="42" aria-hidden="true"><span class="ds-avatar__initials">정</span><span class="ds-avatar__status" data-tone="positive"></span></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">정하늘</span>
        <span class="ds-list-item__desc">온라인</span>
      </span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><span class="ds-avatar" data-size="42" aria-hidden="true"><span class="ds-avatar__initials">한</span><span class="ds-avatar__status" data-tone="neutral"></span></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">한지우</span>
        <span class="ds-list-item__desc">자리 비움</span>
      </span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><span class="ds-avatar" data-size="42" aria-hidden="true"><span class="ds-avatar__initials">오</span><span class="ds-avatar__status" data-tone="critical"></span></span></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">오세진</span>
        <span class="ds-list-item__desc">방해 금지, 오후 6시까지</span>
      </span>
    </a>
  </li>
</ul>
```

### 참여자가 많으면 몇 명만 겹쳐 보여 주기

아바타는 3개에서 5개까지만 겹쳐 두고 나머지는 +N으로 줄입니다. 묶음에는 `aria-label`로 전체 인원을 적어 숫자를 함께 알립니다.

```html
<article class="ds-card" style="width: 100%; max-width: 360px">
  <header class="ds-card__header">
    <h3 class="ds-card__title">영어 회화 스터디</h3>
    <p class="ds-card__desc">매주 화요일 저녁 8시</p>
  </header>
  <div class="ds-card__content u-flex u-center u-between">
    <div class="ds-avatar-group" data-size="24" role="group" aria-label="참여자 8명">
      <span class="ds-avatar" role="img" aria-label="김민수"><span class="ds-avatar__initials" aria-hidden="true">김</span></span>
      <span class="ds-avatar" role="img" aria-label="이서연"><span class="ds-avatar__initials" aria-hidden="true">이</span></span>
      <span class="ds-avatar" role="img" aria-label="박지훈"><span class="ds-avatar__initials" aria-hidden="true">박</span></span>
      <span class="ds-avatar-group__overflow" role="img" aria-label="외 5명">+5</span>
    </div>
    <span class="ds-t03 ds-fg-subtle">8명 참여 중</span>
  </div>
</article>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-avatar-size` | `36px` |
| `--ds-avatar-badge` | `14px` |
| `--ds-avatar-radius` | `var(--ds-shape-pill)` |
| `--ds-avatar-bg` | `var(--ds-color-palette-gray-300)` |
| `--ds-avatar-status-size` | `max(8px, calc(var(--ds-avatar-size) * 0.26))` |
| `--ds-avatar-status-ring` | `clamp(1.5px, calc(var(--ds-avatar-size) * 0.04), 4px)` |
| `--ds-avatar-status-color` | `var(--ds-color-bg-positive-solid)` |
| `--ds-avatar-group-size` | `36px` |
| `--ds-avatar-group-radius` | `var(--ds-shape-pill)` |
| `--ds-avatar-group-ring` | `max(1.5px, calc(var(--ds-avatar-group-size) * 0.05))` |
| `--ds-avatar-group-ring-color` | `var(--ds-color-bg-layer-default)` |

### 크기와 여백

```
size : 20 / 24 / 36(기본) / 42 / 48 / 56 / 64 / 80 / 96 / 108
shape: circle(기본) / rounded(크기의 1/4, 곡률 노브 따름) / square
내용 우선순위: 사진 > 이니셜 > 기본 실루엣(사진/이니셜이 없으면 자동)
※ 이니셜은 반드시 .ds-avatar__initials 로 감싼다(맨 글자만 넣으면 실루엣과 겹친다).
※ 사진 로드 실패 시 이니셜로 바꾸는 처리는 개발 영역.
상태 점(.ds-avatar__status) — 색 + 모양을 함께 써서 색만으로 구분하지 않는다 (WCAG 1.4.1)
  positive(기본) 온라인   = 초록 꽉 찬 점
  neutral        자리 비움 = 회색 링
  critical       방해 금지 = 빨강 점 + 흰 가로줄
  지름 = 아바타의 26% (최소 8px) / 배경색 링 / circle 은 4시 방향, rounded/square 는 우하단 모서리
Figma: 원 / 이미지 없을 때 palette/gray-300(실루엣 gray-600, 2026-11-04) / 이니셜 fg/neutral-muted(2026-11-03, 흰 글자에서 바꿈) / 1px ring stroke/neutral-subtle(INSIDE)
       shape rounded/square 는 badgeMask=none 에만 / status 속성(Avatar Status 인스턴스) / Avatar Group/Group Overflow 세트
       badge 지름 = 24→10 / 36→14 / 42→16 / 48→18 / 56→20 / 64→22 / 80→28 / 96→32 / 108→36 (우하단)
```
