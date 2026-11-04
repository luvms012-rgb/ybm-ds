<!-- https://luvms012-rgb.github.io/yds/site/components/status-dot.html -->

# Status Dot

작은 색 점으로 상태를 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<span class="ds-statusdot" data-tone="positive" [data-pulse]></span> <span>연결됨</span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `tone` | positive warning critical brand neutral |
| 켜고 끄는 속성 | `data-pulse` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 색만으로 뜻을 전하지 않도록 글자와 함께 씁니다. |
| **Do** | 프로필 사진 위의 상태는 Avatar의 Status를 씁니다. |

## 예시

### 글자와 함께 서비스 상태 알리기

점 옆에 정상, 지연, 중단 같은 글자를 함께 적습니다. 색을 구분하기 어려운 사람도 글자로 상태를 읽을 수 있습니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">결제</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-statusdot" data-tone="positive"></span>정상</span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">알림 발송</span>
        <span class="ds-list-item__desc">평소보다 5분쯤 늦어요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-statusdot" data-tone="warning"></span>지연</span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">강의 영상 재생</span>
        <span class="ds-list-item__desc">복구하고 있어요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-statusdot" data-tone="critical"></span>중단</span>
    </div>
  </li>
</ul>
```

### 진행 중인 항목만 깜빡이기

지금 방송 중인 강의 하나에만 `data-pulse`를 켭니다. 시작 전인 강의는 깜빡이지 않는 회색 점으로 두어 지금 움직이는 것이 바로 눈에 띕니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">비즈니스 영어 회화</span>
        <span class="ds-list-item__desc">실시간 강의, 김지은 강사</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-statusdot" data-tone="brand" data-pulse></span>방송 중</span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">기초 회계 원리</span>
        <span class="ds-list-item__desc">실시간 강의, 박도윤 강사</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-statusdot"></span>오후 3시 시작</span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">엑셀 데이터 정리</span>
        <span class="ds-list-item__desc">실시간 강의, 이서준 강사</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-statusdot"></span>오후 7시 시작</span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
</ul>
```

### 표의 상태 열 채우기

관리 표의 상태 칸에도 점과 글자를 함께 넣고 가운데에 맞춥니다. 상태처럼 짧고 길이가 비슷한 값은 가운데에 두어야 위아래로 비교하기 쉽습니다.

```html
<div class="ds-table-wrap">
  <table class="ds-table">
    <thead>
      <tr>
        <th scope="col">장비</th>
        <th scope="col">위치</th>
        <th scope="col" data-align="center" style="width: 136px">상태</th>
        <th scope="col" data-align="center" style="width: 120px">마지막 확인</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1강의실 프로젝터</td>
        <td>본관 2층</td>
        <td data-align="center"><span class="u-flex u-center u-gap-1_5"><span class="ds-statusdot" data-tone="positive"></span>정상</span></td>
        <td data-align="center">10분 전</td>
      </tr>
      <tr>
        <td>2강의실 마이크</td>
        <td>본관 2층</td>
        <td data-align="center"><span class="u-flex u-center u-gap-1_5"><span class="ds-statusdot" data-tone="warning"></span>점검 필요</span></td>
        <td data-align="center">1시간 전</td>
      </tr>
      <tr>
        <td>3강의실 카메라</td>
        <td>별관 1층</td>
        <td data-align="center"><span class="u-flex u-center u-gap-1_5"><span class="ds-statusdot" data-tone="critical"></span>연결 끊김</span></td>
        <td data-align="center">어제</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 규격

### 크기와 여백

```
tone: positive / warning / critical / brand / neutral(기본)   data-pulse: 진행 중일 때 깜빡임
Figma: x2 원 / positive bg/positive-solid, warning bg/warning-solid, critical bg/critical-solid, brand bg/brand-solid, neutral fg/neutral-subtle
  깜빡임 2초, 투명도 1 → 0.5 → 1 (동작 줄이기 설정에서는 멈춤)
```
