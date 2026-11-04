<!-- https://luvms012-rgb.github.io/yds/site/components/text-link.html -->

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

### 로그인 버튼 아래 보조 이동 두기

주요 버튼 아래에 아이디 찾기, 비밀번호 재설정 같은 보조 이동을 Text Link로 둡니다. 버튼보다 약하게 보여 로그인 버튼이 먼저 눈에 띕니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 360px">
  <div class="ds-input" data-variant="outline">
    <input class="ds-input__control" aria-label="아이디" placeholder="아이디" autocomplete="username">
  </div>
  <div class="ds-input" data-variant="outline">
    <input class="ds-input__control" type="password" aria-label="비밀번호" placeholder="비밀번호" autocomplete="current-password">
  </div>
  <button type="button" class="ds-btn" data-size="large" data-width="fill">로그인</button>
  <div class="u-flex u-center u-gap-3">
    <a class="ds-link" href="#">아이디 찾기</a>
    <span class="ds-divider" role="separator" aria-orientation="vertical" data-orientation="vertical"></span>
    <a class="ds-link" href="#">비밀번호 재설정</a>
    <span class="ds-divider" role="separator" aria-orientation="vertical" data-orientation="vertical"></span>
    <a class="ds-link" href="#">회원가입</a>
  </div>
</div>
```

### 묶음 제목 옆에 전체 보기 두기

묶음 제목 오른쪽에 작은 Text Link로 전체 보기를 둡니다. `data-size="small"`은 제목 옆, 표, 칸 머리처럼 보조 자리에 씁니다.

```html
<section class="u-col u-gap-3" style="width: 100%; max-width: 420px">
  <div class="u-flex u-center u-between">
    <h3 class="ds-t06 ds-fw-bold">최근 주문</h3>
    <a class="ds-link" data-size="small" href="#">전체 보기</a>
  </div>
  <ul class="ds-list" data-variant="inset" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">무선 이어폰 외 1건</span>
          <span class="ds-list-item__desc">11월 2일 주문</span>
        </span>
        <span class="ds-list-item__suffix">배송 중</span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">텀블러 500ml</span>
          <span class="ds-list-item__desc">10월 28일 주문</span>
        </span>
        <span class="ds-list-item__suffix">배송 완료</span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</section>
```

### 동의 항목 옆에서 약관 원문 열기

동의 체크박스 오른쪽에 작은 Text Link로 약관 원문을 엽니다. 링크를 체크박스 라벨 밖에 두어 원문을 열 때 체크가 바뀌지 않게 합니다.

```html
<div class="u-col u-gap-2" style="width: 100%; max-width: 360px">
  <div class="u-flex u-center u-between u-gap-3">
    <label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" id="text-link-ex3-terms"><span class="ds-checkbox__label">(필수) 이용 약관에 동의해요</span></label>
    <a class="ds-link" data-size="small" href="#" aria-label="이용 약관 보기">보기</a>
  </div>
  <div class="u-flex u-center u-between u-gap-3">
    <label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" id="text-link-ex3-privacy"><span class="ds-checkbox__label">(필수) 개인 정보 수집과 이용에 동의해요</span></label>
    <a class="ds-link" data-size="small" href="#" aria-label="개인 정보 수집과 이용 보기">보기</a>
  </div>
  <div class="u-flex u-center u-between u-gap-3">
    <label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" id="text-link-ex3-ads"><span class="ds-checkbox__label">(선택) 할인과 이벤트 소식을 받을래요</span></label>
    <a class="ds-link" data-size="small" href="#" aria-label="마케팅 정보 수신 보기">보기</a>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-link-color` | `var(--ds-color-fg-neutral-subtle)` |
| `--ds-link-color-hover` | `var(--ds-color-fg-neutral)` |

### 크기와 여백

```
size: medium(기본, t05) / small(t03, 본문 옆이나 표, 칸 머리처럼 보조 자리) (2026-11-03 추가)
```
