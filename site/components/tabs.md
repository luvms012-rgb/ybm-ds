<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/tabs.html -->

# Tabs

한 화면의 내용을 여러 탭으로 나눠 보여 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-tabs" role="tablist" [data-size="medium"] [data-layout="hug"]>
  <button class="ds-tabs__trigger" role="tab" aria-selected="true">탭</button>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `layout` | fill hug |
| 켜고 끄는 속성 | `size` |

## 예시

### 모바일 화면을 주요 영역으로 나누기

한 화면의 주요 영역을 Tabs로 나누고, 탭이 화면 폭을 똑같이 나눠 가집니다. 탭이 2~4개이고 이름이 짧을 때 기본 fill 모양을 씁니다.

```html
<div style="width: 100%; max-width: 375px">
  <header class="ds-appbar">
    <div class="ds-appbar__left"></div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">내 강의실</h1></div>
    <div class="ds-appbar__right"><button type="button" class="ds-appbar__button" aria-label="강의 찾기"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button></div>
  </header>
  <div class="ds-tabs" role="tablist" aria-label="강의 구분">
    <button type="button" class="ds-tabs__trigger" role="tab" aria-selected="true">수강 중</button>
    <button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">수강 완료</button>
    <button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">찜한 강의</button>
  </div>
  <div role="tabpanel" aria-label="수강 중">
    <ul class="ds-list" data-divider>
      <li>
        <a class="ds-list-item" href="#">
          <span class="ds-list-item__content">
            <span class="ds-list-item__title">비즈니스 영어 회화</span>
            <span class="ds-list-item__desc">12강 가운데 5강을 들었어요</span>
          </span>
          <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a class="ds-list-item" href="#">
          <span class="ds-list-item__content">
            <span class="ds-list-item__title">엑셀 실무 완성</span>
            <span class="ds-list-item__desc">24강 가운데 20강을 들었어요</span>
          </span>
          <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  </div>
</div>
```

### 콘텐츠 칸 안에서 제목과 끝 맞추기

PC 상세 화면에서는 `data-layout="hug"`로 탭이 글자만큼만 차지하게 합니다. `data-inset="none"`을 더해 위 제목과 왼쪽 끝을 맞춥니다.

```html
<div class="u-col u-gap-4" style="width: 100%">
  <h2 class="ds-t09 ds-fw-bold">비즈니스 영어 회화</h2>
  <div class="ds-tabs" role="tablist" aria-label="강의 정보" data-layout="hug" data-inset="none" data-size="medium">
    <button type="button" class="ds-tabs__trigger" role="tab" aria-selected="true">소개</button>
    <button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">커리큘럼</button>
    <button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">수강 후기 128</button>
    <button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">문의</button>
  </div>
  <div role="tabpanel" aria-label="소개" class="u-col u-gap-2">
    <p class="ds-t05">회의와 이메일에서 바로 쓰는 표현을 12주 동안 익혀요.</p>
    <p class="ds-t04 ds-fg-muted">매주 한 번 강사와 말하기 연습을 하고, 수업 뒤에는 녹음 파일로 다시 들을 수 있어요.</p>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-tabs-height` | `40px` |

### 크기와 여백

```
size: small(기본 40) / medium 44   triggerLayout: fill(기본) / hug
Figma: bg/layer-default / 하단 1px stroke/neutral-muted / trigger padding x2_5 / t04 Medium fg/neutral-subtle(2026-11-03, placeholder 에서 진하게)
  selected t04 SemiBold fg/neutral + 하단 2px fg/neutral 인디케이터(트리거 폭) / disabled fg/disabled
  hug: 좌우 x4 / 트리거는 내용 폭
```
