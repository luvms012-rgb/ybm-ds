<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/switch.html -->

# Switch

설정을 바로 켜고 끌 때 쓰는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<label class="ds-switch" data-size="24">
  <span class="ds-switch__label">알림 받기</span>
  <input type="checkbox" role="switch" class="ds-switch__control">
</label>
```

## 구조

| 부품 | 설명 |
| --- | --- |
| **Label**`ds-switch__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Control**`ds-switch__control` | 실제로 값을 입력하거나 고르는 부분입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `size` | 16 24 32 |
| 켜고 끄는 속성 | `tone` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 누르는 즉시 반영되는 설정에만 씁니다. |
| **Do** | 저장 버튼이 따로 있으면 Checkbox를 씁니다. |

## 예시

### 설정 목록에서 바로 켜고 끄기

알림 설정처럼 누르는 즉시 반영되는 항목에 Switch를 둡니다. 따로 저장 버튼이 없으므로 켜고 끈 상태가 곧 결과입니다.

```html
<ul class="ds-list" data-variant="inset" data-divider style="width: 100%; max-width: 420px">
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">수업 알림</span>
        <span class="ds-list-item__desc">수업 시작 10분 전에 알려 줘요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" checked></span></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">과제 마감 알림</span>
        <span class="ds-list-item__desc">마감 하루 전에 알려 줘요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" checked></span></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">혜택과 이벤트 소식</span>
        <span class="ds-list-item__desc">할인과 새 강의 소식을 보내 줘요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control"></span></span>
    </label>
  </li>
</ul>
```

### 카드 안 기능 하나를 라벨과 함께 켜기

카드 안에서 자동 연장 같은 기능 하나를 라벨 붙은 Switch로 켜고 끕니다. 켜는 순간 적용되고 언제든 다시 끌 수 있는 기능에 씁니다.
