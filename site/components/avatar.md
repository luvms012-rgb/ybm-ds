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
| **Initials**`ds-avatar__initials` | 사진이 없을 때 보이는 이름 첫 글자입니다. |
| **Status**`ds-avatar__status` | 접속 상태를 알리는 점입니다. |
| **Badge**`ds-avatar__badge` | 개수나 새 소식을 알리는 배지입니다. |

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

```html
<span class="ds-avatar" data-size="20" role="img" aria-label="사용자"></span>
<span class="ds-avatar" data-size="24" role="img" aria-label="사용자"></span>
<span class="ds-avatar" role="img" aria-label="사용자"></span>
<span class="ds-avatar" data-size="48" role="img" aria-label="김민수"><span class="ds-avatar__initials" aria-hidden="true">김</span></span>
<span class="ds-avatar" data-size="64" role="img" aria-label="이서연"><span class="ds-avatar__initials" aria-hidden="true">이</span></span>
<span class="ds-avatar" data-size="80" role="img" aria-label="사용자"><span class="ds-avatar__badge"></span></span>

<span class="ds-avatar" data-size="48" role="img" aria-label="김민수, 온라인"><span class="ds-avatar__initials" aria-hidden="true">김</span><span class="ds-avatar__status" data-tone="positive"></span></span>
<span class="ds-avatar" data-size="48" role="img" aria-label="박지훈, 자리 비움"><span class="ds-avatar__initials" aria-hidden="true">박</span><span class="ds-avatar__status" data-tone="neutral"></span></span>
<span class="ds-avatar" data-size="48" role="img" aria-label="최유나, 방해 금지"><span class="ds-avatar__initials" aria-hidden="true">최</span><span class="ds-avatar__status" data-tone="critical"></span></span>
<span class="ds-avatar" data-size="24" role="img" aria-label="사용자, 온라인"><span class="ds-avatar__status"></span></span>
<span class="ds-avatar" data-size="96" role="img" aria-label="사용자, 방해 금지"><span class="ds-avatar__status" data-tone="critical"></span></span>

<span class="ds-avatar" data-size="56" role="img" aria-label="김민수, 온라인"><span class="ds-avatar__initials" aria-hidden="true">김</span><span class="ds-avatar__status"></span></span>
<span class="ds-avatar" data-size="56" data-shape="rounded" role="img" aria-label="운영팀, 온라인"><span class="ds-avatar__initials" aria-hidden="true">운</span><span class="ds-avatar__status"></span></span>
<span class="ds-avatar" data-size="56" data-shape="square" role="img" aria-label="운영팀, 자리 비움"><span class="ds-avatar__initials" aria-hidden="true">운</span><span class="ds-avatar__status" data-tone="neutral"></span></span>
<button type="button" class="ds-avatar" data-size="56" aria-label="김민수 프로필 보기"><span class="ds-avatar__initials" aria-hidden="true">김</span></button>

<div class="ds-avatar-group" data-size="24" role="group" aria-label="참여자 6명">
  <span class="ds-avatar" role="img" aria-label="김민수"><span class="ds-avatar__initials" aria-hidden="true">김</span></span><span class="ds-avatar" role="img" aria-label="이서연"><span class="ds-avatar__initials" aria-hidden="true">이</span></span><span class="ds-avatar" role="img" aria-label="박지훈"><span class="ds-avatar__initials" aria-hidden="true">박</span></span><span class="ds-avatar-group__overflow" role="img" aria-label="외 3명">+3</span>
</div>
<div class="ds-avatar-group" role="group" aria-label="참여자 16명">
  <span class="ds-avatar" role="img" aria-label="김민수, 온라인"><span class="ds-avatar__initials" aria-hidden="true">김</span><span class="ds-avatar__status"></span></span><span class="ds-avatar" role="img" aria-label="이서연"><span class="ds-avatar__initials" aria-hidden="true">이</span></span><span class="ds-avatar" role="img" aria-label="박지훈"><span class="ds-avatar__initials" aria-hidden="true">박</span></span><span class="ds-avatar" role="img" aria-label="사용자"></span><button type="button" class="ds-avatar-group__overflow" aria-label="참여자 12명 더 보기">+12</button>
</div>
<div class="ds-avatar-group" data-size="48" data-shape="rounded" role="group" aria-label="팀 104개">
  <span class="ds-avatar" role="img" aria-label="운영팀"><span class="ds-avatar__initials" aria-hidden="true">운</span></span><span class="ds-avatar" role="img" aria-label="개발팀"><span class="ds-avatar__initials" aria-hidden="true">개</span></span><span class="ds-avatar" role="img" aria-label="디자인팀"><span class="ds-avatar__initials" aria-hidden="true">디</span></span><span class="ds-avatar-group__overflow" role="img" aria-label="외 101개">99+</span>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-avatar-size` | `36px` |
| `--ds-avatar-badge` | `14px` |
| `--ds-avatar-radius` | `var(--ds-shape-pill)` |
| `--ds-avatar-bg` | `var(--ds-color-palette-gray-500)` |
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
Figma: 원 / 이미지 없을 때 palette/gray-500 / 이니셜 fg/neutral-muted(2026-11-03, 흰 글자에서 바꿈) / 1px ring stroke/neutral-subtle(INSIDE)
       shape rounded/square 는 badgeMask=none 에만 / status 속성(Avatar Status 인스턴스) / Avatar Group/Group Overflow 세트
       badge 지름 = 24→10 / 36→14 / 42→16 / 48→18 / 56→20 / 64→22 / 80→28 / 96→32 / 108→36 (우하단)
```
