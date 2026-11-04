<!-- https://luvms012-rgb.github.io/yds/site/components/scroll-fog.html -->

# Scroll Fog

스크롤 영역 끝을 흐리게 해 내용이 더 있음을 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-scrollfog" [data-direction="horizontal"]>…스크롤 되는 내용…</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `direction` | vertical horizontal |

그 밖에: 끝 20

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 흐려지는 쪽에 20 이상 여백을 둡니다. |
| **Do** | 화면 전체 세로 스크롤에는 위 20, 아래 80을 둡니다. |

## 예시

### 긴 약관 상자의 위아래 흐리게

정해진 높이 안에서 스크롤되는 약관 상자에 Scroll Fog를 씌웁니다. 흐려지는 위아래에 20 이상 여백을 두어 첫 줄과 끝 줄이 흐림에 가려지지 않게 합니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 420px">
  <span class="ds-t05 ds-fw-semibold" id="scroll-fog-ex1-title">서비스 이용 약관</span>
  <div class="ds-scrollfog u-col u-gap-3" tabindex="0" aria-labelledby="scroll-fog-ex1-title" style="max-height: 200px; padding-block: var(--ds-space-x5)">
    <p class="ds-t04 ds-fg-muted">제1조 (목적) 이 약관은 온라인 강의 서비스를 이용하는 조건과 절차를 정해요.</p>
    <p class="ds-t04 ds-fg-muted">제2조 (회원 가입) 가입 신청서를 내고 약관에 동의하면 회원이 돼요.</p>
    <p class="ds-t04 ds-fg-muted">제3조 (수강 기간) 수강 기간은 결제한 날부터 강의마다 정한 기간까지예요.</p>
    <p class="ds-t04 ds-fg-muted">제4조 (환불) 수강을 시작하기 전에는 결제한 금액을 모두 돌려받을 수 있어요.</p>
    <p class="ds-t04 ds-fg-muted">제5조 (개인 정보) 회원 정보는 개인 정보 처리 방침에 따라 안전하게 다뤄요.</p>
    <p class="ds-t04 ds-fg-muted">제6조 (약관 변경) 약관을 바꿀 때는 7일 전에 공지로 알려 드려요.</p>
  </div>
  <label class="ds-checkbox" data-tone="neutral">
    <input type="checkbox" class="ds-checkbox__control">
    <span>약관을 읽고 동의해요</span>
  </label>
</div>
```

### 가로로 넘기는 칩 줄의 양 끝 흐리게

가로로 넘기는 필터 칩 줄에는 `data-direction="horizontal"`을 붙입니다. 양 끝이 흐려져 옆으로 넘기면 칩이 더 있다는 것을 알 수 있습니다.

```html
<div class="ds-scrollfog u-flex u-gap-2 u-full" data-direction="horizontal" role="group" aria-label="강의 분야" style="max-width: 360px; padding-inline: var(--ds-space-x5)">
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-pressed="true">전체</button>
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-pressed="false">어학</button>
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-pressed="false">자격증</button>
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-pressed="false">취업</button>
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-pressed="false">컴퓨터</button>
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-pressed="false">비즈니스</button>
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-pressed="false">여행 회화</button>
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-pressed="false">교양</button>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-scrollfog-size` | `20px` |
| `--ds-scrollfog-direction` | `to bottom` |

### 크기와 여백

```
direction: 기본 세로 / data-direction="horizontal"   흐려지는 쪽에 최소 20 의 여백을 둔다(화면 전체 세로 스크롤은 위 20, 아래 80)
Figma: 끝 20 을 투명 → 불투명으로 / 코드는 배경색 덮개가 아니라 mask 라 어떤 배경 위에서도 쓴다
```
