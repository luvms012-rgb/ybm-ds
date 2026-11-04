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
