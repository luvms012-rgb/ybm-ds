<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/progress-circle.html -->

# Progress Circle

작업이 진행 중임을 원으로 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-progress-circle" data-size="40" data-tone="brand" role="progressbar" aria-valuenow="40" style="--ds-progress-value: 40">
  <svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg>
</span>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Track** `ds-progress-circle__track` | 막대의 바탕입니다. |
| **Range** `ds-progress-circle__range` | 진행한 양을 보여 주는 호입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `tone` | neutral brand staticWhite |
| `type` | determinate indeterminate |
| 켜고 끄는 속성 | `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 로딩은 Progress Circle의 indeterminate로 보여 줍니다. |
| **Do** | Spinner 부품은 따로 없습니다. |
| **Do** | staticWhite는 어두운 배경이나 사진 위에서만 씁니다. |
| **Do** | determinate는 진행률을 실제로 알 수 있을 때만 씁니다. 모를 때는 indeterminate를 씁니다. |

## 예시

### 걸리는 시간을 모르면 indeterminate로

목록 끝에서 다음 내용을 불러올 때처럼 언제 끝날지 모르면 `data-type="indeterminate"`로 돌립니다. 알 수 없는 진행률을 지어내 채우면 멈춘 것처럼 보입니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 420px">
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">겨울 방학 특강 안내</span>
          <span class="ds-list-item__desc">12월 2일</span>
        </span>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">시스템 점검으로 잠시 쉬어요</span>
          <span class="ds-list-item__desc">11월 28일</span>
        </span>
      </a>
    </li>
  </ul>
  <div class="u-flex u-center">
    <span class="ds-progress-circle" data-type="indeterminate" role="progressbar" aria-label="공지를 더 불러오는 중"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
  </div>
</div>
```

### 진행률을 알 때만 determinate로

파일을 내려받을 때처럼 얼마나 됐는지 알 수 있으면 determinate로 채웁니다. 옆에 "72%"처럼 값을 함께 적어 남은 양을 알려 줍니다.

```html
<ul class="ds-list u-full" data-variant="inset" data-divider style="max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix">
        <span class="ds-progress-circle" data-size="40" data-tone="brand" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="3주차 강의 자료 내려받기" style="--ds-progress-value: 72"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
      </span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">3주차 강의 자료.pdf</span>
        <span class="ds-list-item__desc">24MB 중 17MB, 72%</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small">취소</button>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">2주차 강의 자료.pdf</span>
        <span class="ds-list-item__desc">18MB, 내려받았어요</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small">열기</button>
      </span>
    </div>
  </li>
</ul>
```

### 사진 위에서는 staticWhite로

사진처럼 어두운 바탕 위에서는 `data-tone="staticWhite"`를 씁니다. 다크 모드에서도 흰색 그대로라 사진 위에서 늘 잘 보입니다.

```html
<div class="u-col u-gap-2 u-full" style="max-width: 420px">
  <span class="ds-t05 ds-fw-medium">사진 첨부</span>
  <div class="u-flex u-gap-2">
    <div class="ds-imageframe" data-radius="md" style="width: 96px">
      <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=70" alt="첨부한 사진 1">
    </div>
    <div class="ds-imageframe" data-radius="md" style="width: 96px">
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=200&q=70" alt="올리는 중인 사진 2">
      <div class="ds-imageframe__floater" data-position="bottom-end">
        <span class="ds-progress-circle" data-tone="staticWhite" data-type="indeterminate" role="progressbar" aria-label="사진 올리는 중"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
      </div>
    </div>
  </div>
  <p class="ds-t03 ds-fg-subtle">사진 2장 중 1장을 올리고 있어요</p>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-progress-value` | `40` |

### 크기와 여백

```
tone: neutral(기본) / brand / staticWhite   size: 24(기본) / 40 / 56   type: determinate / indeterminate
  indeterminate: data-type="indeterminate" (회전하는 25% 호)
Figma: 두께 24→3 / 40→5 / 56→7 / 둥근 끝 / 12시 시작
  neutral 트랙 palette/gray-200 + 호 palette/gray-500 / brand palette/brand-200 + bg/brand-solid
  staticWhite palette/static-white-alpha-300 + palette/static-white (팔레트 직참은 의도된 예외)
```
