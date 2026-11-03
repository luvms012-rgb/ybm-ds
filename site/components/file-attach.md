<!-- https://luvms012-rgb.github.io/ybm-ds/site/components/file-attach.html -->

# File Attach

파일을 끌어다 놓거나 골라서 첨부하는 컴포넌트입니다.

## 사용법

아래 구조를 그대로 복사해 쓰세요. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

```html
<div class="ds-fileattach">
  <label class="ds-fileattach__dropzone">
    <input type="file" class="ds-fileattach__input" multiple>
    <span class="ds-fileattach__label">파일을 끌어 놓거나 눌러서 추가하세요</span>
  </label>
  <div class="ds-fileattach__items">
    <label class="ds-fileattach__trigger">
      <input type="file" class="ds-fileattach__input" multiple aria-label="파일 추가">
      <i class="ds-icon ds-icon--plus" aria-hidden="true"></i>
      <span class="ds-fileattach__count"><b>2</b>/10</span>
    </label>
    <div class="ds-fileitem" [data-type="image"] [data-readonly]>
      <span class="ds-fileitem__thumbnail"><i class="ds-icon ds-icon--file-text" aria-hidden="true"></i></span>
      <span class="ds-fileitem__texts"><span class="ds-fileitem__name">보고서.pdf</span><span class="ds-fileitem__size">2.4MB</span></span>
      (image 는 <img class="ds-fileitem__image" src="…" alt="…"> [<span class="ds-fileitem__badge">대표</span>])
      <button type="button" class="ds-fileitem__remove" aria-label="보고서.pdf 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
  </div>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `Dropzone state` | enabled dragOver disabled |
| `Item type` | file image |
| `state` | enabled readonly |
| 켜고 끄는 속성 | `badge` |

그 밖에: Trigger state

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 끌어 놓는 칸은 끌어 놓기가 되는 PC 화면에서만 둡니다. |
| **Do** | 모바일에서는 추가 버튼(Trigger)과 파일 줄만 씁니다. |
| **Do** | 추가 버튼에는 지금 개수와 최대 개수를 적고, 다 차면 disabled로 바꿉니다. |

## 예시

```html
<div class="ds-fileattach" style="width:343px">
  <label class="ds-fileattach__dropzone">
    <input type="file" class="ds-fileattach__input" multiple>
    <span class="ds-fileattach__label">파일을 끌어 놓거나 눌러서 추가하세요</span>
  </label>
  <div class="ds-fileattach__items">
    <label class="ds-fileattach__trigger">
      <input type="file" class="ds-fileattach__input" multiple aria-label="파일 추가">
      <i class="ds-icon ds-icon--plus" aria-hidden="true"></i>
      <span class="ds-fileattach__count"><b>3</b>/10</span>
    </label>
    <div class="ds-fileitem">
      <span class="ds-fileitem__thumbnail"><i class="ds-icon ds-icon--file-text" aria-hidden="true"></i></span>
      <span class="ds-fileitem__texts"><span class="ds-fileitem__name">회의록_10월_전체_정리본.docx</span><span class="ds-fileitem__size">2.4MB</span></span>
      <button type="button" class="ds-fileitem__remove" aria-label="회의록_10월_전체_정리본.docx 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
    <div class="ds-fileitem" data-type="image">
      <span class="ds-fileitem__thumbnail" style="width:100%;height:100%;background:none"><i class="ds-icon ds-icon--image" aria-hidden="true"></i></span>
      <span class="ds-fileitem__badge">대표</span>
      <button type="button" class="ds-fileitem__remove" aria-label="사진 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
    <div class="ds-fileitem" data-readonly>
      <span class="ds-fileitem__thumbnail"><i class="ds-icon ds-icon--file-text" aria-hidden="true"></i></span>
      <span class="ds-fileitem__texts"><span class="ds-fileitem__name">보고서.pdf</span><span class="ds-fileitem__size">1.1MB</span></span>
    </div>
  </div>
</div>
<label class="ds-fileattach__dropzone" style="width:343px">
  <input type="file" class="ds-fileattach__input" disabled>
  <span class="ds-fileattach__label">지금은 파일을 올릴 수 없어요</span>
</label>
```

## 규격

Figma와 CSS가 함께 따르는 크기, 여백, 색입니다.

```
끌어 놓는 칸(Dropzone) 아래에 고르기 버튼(Trigger)과 파일(Item)을 한 줄로 놓는다. 넘치면 옆으로 넘긴다.
Dropzone 은 파일을 끌고 오면 ybm-ds.js 가 data-state="dragover" 를 붙인다(점선 → 실선).
Figma: 전체 gap x2 / 줄 gap x2
  Dropzone 높이 120, gap x2, 좌우 padding x4, shape/lg, 1px 점선 palette/gray-500 / dragOver 실선 stroke/neutral-solid / 글자 t04 Medium fg/neutral-subtle
  Trigger x20 정사각, gap x1, shape/lg, 1px stroke/neutral-weak, plus 24 fg/neutral-subtle, 개수 t02 (지금 fg/neutral, 최대 fg/neutral-subtle) / pressed bg/transparent-pressed
  Item file 160 × x20, 좌우 padding x4, gap x2_5, shape/lg, 1px stroke/neutral-weak / 썸네일 x12 shape/sm bg/neutral, 아이콘 24
    이름 t02 Medium 두 줄 / 크기 t01 fg/neutral-subtle / readonly 글자와 아이콘 fg/disabled
  Item image x20 정사각, 1px stroke/neutral-subtle / 대표 표시 높이 x6, 좌우 x1, shape/lg, bg/overlay, t02 Medium 흰색 / readonly 투명도 0.5
  지우기 버튼 x5 원, 위 오른쪽 x1 안쪽, bg/layer-default, 1px stroke/neutral-weak, x 10 fg/neutral / readonly 에서는 숨김
```
