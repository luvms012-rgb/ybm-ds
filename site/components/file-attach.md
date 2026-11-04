<!-- https://luvms012-rgb.github.io/yds/site/components/file-attach.html -->

# File Attach

파일을 끌어다 놓거나 골라서 첨부하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 씁니다. 대괄호 `[ ]` 안은 필요할 때만 넣습니다.

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

## 구조

| 부품 | 설명 |
| --- | --- |
| **Dropzone** `ds-fileattach__dropzone` | 파일을 끌어 놓는 칸입니다. |
| **Input** `ds-fileattach__input` | 실제 입력 칸입니다. |
| **Label** `ds-fileattach__label` | 이름이나 값을 보여 주는 글자입니다. |
| **Items** `ds-fileattach__items` | 첨부한 파일 목록입니다. |
| **Trigger** `ds-fileattach__trigger` | 누르면 열리거나 바뀌는 버튼입니다. |
| **Count** `ds-fileattach__count` | 개수나 글자 수를 보여 줍니다. |
| **Thumbnail** `ds-fileitem__thumbnail` | 파일 종류나 사진을 보여 주는 작은 그림입니다. |
| **Texts** `ds-fileitem__texts` | 제목과 설명을 묶는 글자 영역입니다. |
| **Name** `ds-fileitem__name` | 파일 이름입니다. |
| **Size** `ds-fileitem__size` | 파일 크기입니다. |
| **Image** `ds-fileitem__image` | 사진 미리보기입니다. |
| **Badge** `ds-fileitem__badge` | 개수나 새 소식을 알리는 배지입니다. |
| **Remove** `ds-fileitem__remove` | 항목을 지우는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 씁니다.

| 속성 | 값 |
| --- | --- |
| `Dropzone state` | enabled dragOver disabled |
| `Item type` | file image |
| `state` | enabled readonly |
| 켜고 끄는 속성 | `badge` |

그 밖에: Trigger state

## 동작

`ybm-ds.js`를 불러오면 알아서 동작합니다.

- 파일을 끌어 놓는 칸 위로 끌고 오면 data-state="dragover", 벗어나거나 놓으면 뺀다

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 끌어 놓는 칸은 PC 화면에만 둡니다. |
| **Do** | 모바일에서는 추가 버튼(Trigger)과 파일 줄만 씁니다. |
| **Do** | 추가 버튼에는 지금 개수와 최대 개수를 적습니다. |
| **Do** | 파일이 최대 개수만큼 차면 추가 버튼을 disabled로 바꿉니다. |

## 예시

### PC 폼에는 끌어 놓는 칸 두기

PC 화면의 문의 폼에는 파일을 끌어 놓는 칸을 두고, 올린 파일은 그 아래 줄에 보여 줍니다. 받을 수 있는 형식과 개수는 Field Label 안내 문구로 미리 알립니다.

```html
<div class="ds-field u-full" style="max-width: 480px">
  <div class="ds-field__header">
    <span class="ds-field__label">첨부 파일</span>
    <span class="ds-field__indicator">선택</span>
  </div>
  <div class="ds-fileattach">
    <label class="ds-fileattach__dropzone">
      <input type="file" class="ds-fileattach__input" multiple accept=".pdf,.jpg,.png">
      <span class="ds-fileattach__label">파일을 끌어 놓거나 눌러서 추가하세요</span>
    </label>
    <div class="ds-fileattach__items">
      <div class="ds-fileitem">
        <span class="ds-fileitem__thumbnail"><i class="ds-icon ds-icon--file-text" aria-hidden="true"></i></span>
        <span class="ds-fileitem__texts"><span class="ds-fileitem__name">주문서.pdf</span><span class="ds-fileitem__size">1.2MB</span></span>
        <button type="button" class="ds-fileitem__remove" aria-label="주문서.pdf 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
      </div>
      <div class="ds-fileitem">
        <span class="ds-fileitem__thumbnail"><i class="ds-icon ds-icon--image" aria-hidden="true"></i></span>
        <span class="ds-fileitem__texts"><span class="ds-fileitem__name">받은 상품.jpg</span><span class="ds-fileitem__size">840KB</span></span>
        <button type="button" class="ds-fileitem__remove" aria-label="받은 상품.jpg 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
      </div>
    </div>
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">PDF, JPG, PNG 파일을 5개까지 올릴 수 있어요.</p>
  </div>
</div>
```

### 모바일에서는 추가 버튼과 파일 줄만 쓰기

모바일에서는 끌어 놓는 칸 없이 추가 버튼과 사진 줄만 씁니다. 추가 버튼에는 지금 개수와 최대 개수를 적어 몇 장 더 올릴 수 있는지 알립니다.

```html
<div class="u-col u-gap-5 u-full" style="max-width: 375px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="file-attach-ex2-text">모임 후기</label>
    </div>
    <textarea class="ds-textarea" id="file-attach-ex2-text" data-size="medium" rows="3" placeholder="모임은 어땠나요?">오늘은 단어 시험을 보고 서로 틀린 문제를 풀었어요.</textarea>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <span class="ds-field__label">사진</span>
      <span class="ds-field__indicator">선택</span>
    </div>
    <div class="ds-fileattach">
      <div class="ds-fileattach__items">
        <label class="ds-fileattach__trigger">
          <input type="file" class="ds-fileattach__input" accept="image/*" multiple aria-label="사진 추가">
          <i class="ds-icon ds-icon--plus" aria-hidden="true"></i>
          <span class="ds-fileattach__count"><b>2</b>/10</span>
        </label>
        <div class="ds-fileitem" data-type="image">
          <img class="ds-fileitem__image" src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=160&q=70" alt="공책에 단어를 적는 모습">
          <span class="ds-fileitem__badge">대표</span>
          <button type="button" class="ds-fileitem__remove" aria-label="첫 번째 사진 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
        </div>
        <div class="ds-fileitem" data-type="image">
          <img class="ds-fileitem__image" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=160&q=70" alt="책상 위에 쌓인 책">
          <button type="button" class="ds-fileitem__remove" aria-label="두 번째 사진 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 최대 개수가 차면 추가 버튼 끄기

파일이 최대 개수만큼 차면 추가 버튼의 입력 요소를 `disabled`로 바꿉니다. 더 올리려면 먼저 한 장을 빼야 한다는 것을 안내 문구로 함께 알립니다.

```html
<div class="ds-field u-full" style="max-width: 375px">
  <div class="ds-field__header">
    <span class="ds-field__label">후기 사진</span>
  </div>
  <div class="ds-fileattach">
    <div class="ds-fileattach__items">
      <label class="ds-fileattach__trigger">
        <input type="file" class="ds-fileattach__input" accept="image/*" multiple aria-label="사진 추가" disabled>
        <i class="ds-icon ds-icon--plus" aria-hidden="true"></i>
        <span class="ds-fileattach__count"><b>3</b>/3</span>
      </label>
      <div class="ds-fileitem" data-type="image">
        <img class="ds-fileitem__image" src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=160&q=70" alt="커피 두 잔">
        <span class="ds-fileitem__badge">대표</span>
        <button type="button" class="ds-fileitem__remove" aria-label="첫 번째 사진 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
      </div>
      <div class="ds-fileitem" data-type="image">
        <img class="ds-fileitem__image" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=160&q=70" alt="커피 잔을 부딪치는 손">
        <button type="button" class="ds-fileitem__remove" aria-label="두 번째 사진 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
      </div>
      <div class="ds-fileitem" data-type="image">
        <img class="ds-fileitem__image" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=160&q=70" alt="샐러드 한 그릇">
        <button type="button" class="ds-fileitem__remove" aria-label="세 번째 사진 빼기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
      </div>
    </div>
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">사진은 3장까지 올릴 수 있어요. 바꾸려면 먼저 한 장을 빼 주세요.</p>
  </div>
</div>
```

## 규격

### 크기와 여백

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
