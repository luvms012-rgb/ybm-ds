<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/snackbar.html -->

# Snackbar

작업 결과를 화면 아래에 잠깐 띄워 알려 주는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-snackbar" role="status" data-variant="positive" data-state="open">
  <i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i>
  <span class="ds-snackbar__message">저장했어요</span>
  [<button type="button" class="ds-snackbar__action">확인</button>]
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `variant` | default positive critical |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 4초 동안 보이고, 한 번에 하나만 띄웁니다. |

## 예시

```html
<button class="ds-btn" data-variant="neutralWeak" onclick="YBM.snackbar('저장했어요', { variant: 'positive' })">positive 띄우기</button>
<button class="ds-btn" data-variant="neutralWeak" onclick="YBM.snackbar('네트워크 연결을 확인해 주세요', { variant: 'critical', action: '다시 시도' })">critical 띄우기</button>
<button class="ds-btn" data-variant="neutralWeak" onclick="YBM.snackbar('링크를 복사했어요')">default 띄우기</button>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
variant: default / positive / critical
Figma: padding x2_5(+본문 좌우 x1_5) / min-h44 / max-w560 / shape/sm / bg/neutral-solid / elevation overlay
       message t04 fg/on-neutral-solid / action t04 Bold / gap x2_5 / 아이콘 Solid 24
       positive 아이콘 bg/positive-solid / critical 아이콘 bg/critical-solid
```
