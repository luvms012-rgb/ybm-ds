<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/result-section.html -->

# Result Section

작업을 마친 뒤 결과를 알리고 다음에 할 일을 안내하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<section class="ds-result" [data-size="medium"]>
  [<div class="ds-result__asset"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></div>]
  <div class="ds-result__texts">
    <h2 class="ds-result__title">신청을 마쳤어요</h2>
    [<p class="ds-result__desc">처리 결과는 알림으로 알려 드릴게요</p>]
  </div>
  <div class="ds-result__actions">
    <button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium">확인</button>
    [<button type="button" class="ds-btn" data-variant="ghost" data-size="small">신청 내역 보기</button>]
  </div>
</section>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Asset** `ds-result__asset` | 결과를 보여 주는 그림입니다. |
| **Texts** `ds-result__texts` | 제목과 설명을 묶는 글자 영역입니다. |
| **Title** `ds-result__title` | 제목입니다. |
| **Desc** `ds-result__desc` | 제목에 덧붙이는 설명 글입니다. |
| **Actions** `ds-result__actions` | 버튼을 묶는 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | large medium |
| 켜고 끄는 속성 | `asset` `description` |

그 밖에: primary/secondary action

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 신청 완료, 오류, 빈 결과처럼 결과가 화면의 중심일 때 씁니다. |
| **Do** | 다음에 할 일 버튼은 하나만 위에 둡니다. |
| **Do** | 보조 동작은 ghost 버튼으로 아래에 둡니다. |
| **Do** | 목록이 비었다는 짧은 안내는 Empty를 씁니다. |

## 예시

### 마친 뒤에는 다음 할 일 하나만 위에

신청 완료처럼 결과가 화면의 중심일 때 Result Section을 가운데에 둡니다. 다음에 할 일은 위 버튼 하나로 두고, 나머지는 아래 ghost 버튼으로 낮춥니다.

```html
<div class="u-col u-full" style="max-width: 375px">
  <header class="ds-appbar">
    <div class="ds-appbar__left"></div>
    <div class="ds-appbar__main">
      <h1 class="ds-appbar__title">수강 신청</h1>
    </div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
  </header>
  <section class="ds-result">
    <div class="ds-result__asset" style="color: var(--ds-color-fg-positive)"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></div>
    <div class="ds-result__texts">
      <h2 class="ds-result__title">수강 신청을 마쳤어요</h2>
      <p class="ds-result__desc">지금 바로 첫 강의를 들을 수 있어요</p>
    </div>
    <div class="ds-result__actions">
      <button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium">강의 들으러 가기</button>
      <button type="button" class="ds-btn" data-variant="ghost" data-size="small">신청 내역 보기</button>
    </div>
  </section>
</div>
```

### 실패했을 때는 다시 시도를 먼저

결제처럼 다시 해 볼 수 있는 오류는 위 버튼을 다시 시도하는 동작으로 둡니다. 문의하기 같은 보조 동작은 아래 ghost 버튼으로 둡니다.

```html
<section class="ds-result u-full" data-size="medium" style="max-width: 420px">
  <div class="ds-result__asset ds-fg-critical"><i class="ds-icon ds-icon--circle-alert-solid" aria-hidden="true"></i></div>
  <div class="ds-result__texts">
    <h2 class="ds-result__title">결제를 마치지 못했어요</h2>
    <p class="ds-result__desc">카드 한도를 확인하고 다시 시도해 주세요</p>
  </div>
  <div class="ds-result__actions">
    <button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium">다시 결제하기</button>
    <button type="button" class="ds-btn" data-variant="ghost" data-size="small">고객센터에 문의하기</button>
  </div>
</section>
```

### 검색 결과가 없으면 다른 길 알려 주기

검색 결과가 화면의 전부일 때는 Result Section으로 이유와 다음 할 일을 알립니다. 목록 한쪽이 비었다는 짧은 안내라면 Empty를 씁니다.

```html
<div class="u-col u-gap-4 u-full" style="max-width: 420px">
  <div class="ds-input" data-variant="outline" data-size="medium">
    <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
    <input class="ds-input__control" type="search" aria-label="강의 검색" value="주말 원어민 회화 심화반">
    <button type="button" class="ds-input__clear" aria-label="지우기"></button>
  </div>
  <section class="ds-result" data-size="medium">
    <div class="ds-result__asset ds-fg-subtle"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></div>
    <div class="ds-result__texts">
      <h2 class="ds-result__title">찾는 강의가 없어요</h2>
      <p class="ds-result__desc">검색어를 줄이거나 다른 말로 찾아보세요</p>
    </div>
    <div class="ds-result__actions">
      <button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium">전체 강의 보기</button>
      <button type="button" class="ds-btn" data-variant="ghost" data-size="small">강의 요청하기</button>
    </div>
  </section>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-result-gap` | `var(--ds-space-x3)` |
| `--ds-result-text-bottom` | `var(--ds-space-x7)` |

### 크기와 여백

```
size: 기본 large(화면 전체) / data-size="medium"(화면 일부)
위쪽 그림은 40 아이콘(완료 fg/positive, 오류 fg/critical)이나 Progress Circle 40 으로 바꿔 쓴다.
Figma: 가운데 정렬, padding x4 x12 / 그림 아래 x4, 아이콘 40
  large 글자 사이 x3, 아래 x7, 제목 t08 Bold, 설명 t05 fg/neutral-muted / medium 글자 사이 x2, 아래 x6, 제목 t05 Bold, 설명 t04
  버튼 사이 x5, 위 Action Button neutralWeak medium, 아래 ghost small
```
