<!-- https://luvms012-rgb.github.io/yds/site/foundations/icons.html -->

# Iconography

아이콘은 정보와 기능을 빠르게 알아보도록 돕습니다.

## 개요

아이콘은 Lucide 한 가지만 씁니다. 선이 고르고 모양이 단순해 처음 보는 사람도 뜻을 바로 압니다. 지금 바로 쓸 수 있는 아이콘은 155개이고, 필요하면 Lucide 1,999개 가운데서 더 넣습니다. 모든 아이콘은 [Library](https://luvms012-rgb.github.io/yds/site/foundations/icons-library.md)에서 찾아 바로 복사합니다.

```html
<!-- 글자 옆: 꾸밈용이라 aria-hidden -->
<button class="ds-btn" data-variant="neutralWeak" data-size="medium">
  <i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i>찾기
</button>

<!-- 아이콘만 있는 버튼: 뜻을 aria-label로 -->
<button class="ds-btn" data-variant="ghost" data-size="medium" data-layout="iconOnly" aria-label="닫기">
  <i class="ds-icon ds-icon--x" aria-hidden="true"></i>
</button>
```

## 종류

| 종류 | 모양 | 쓰는 곳 |
| --- | --- | --- |
| 선 | `ds-icon--house` | 대부분의 자리. 기본 모양입니다. |
| 채움 | `ds-icon--house-solid` | 선택된 탭, 상태 표시처럼 더 강하게 보여야 할 때. 이름 끝에 `-solid`가 붙습니다. |

## 이름 규칙

- 이름은 쓰임이 아니라 생김새로 붙입니다. 닫기 버튼이어도 이름은 `x`입니다.
- 이름은 Lucide 이름을 그대로 씁니다. 클래스는 `ds-icon--` 뒤에 이름을 붙입니다.
- Library에서는 영어 이름, 영어 태그, 한국어 쓰임으로 찾을 수 있습니다.

## 크기와 색

크기는 기본 20이고, `ds-icon--sm` 16, `ds-icon--lg` 24 두 가지가 더 있습니다. 그 밖의 크기가 꼭 필요하면 `--ds-icon-size` 변수로 바꿉니다. 색은 부모의 글자색을 바꾸면 따라옵니다.

```html
<i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i>  <!-- 16 -->
<i class="ds-icon ds-icon--search" aria-hidden="true"></i>              <!-- 20 기본 -->
<i class="ds-icon ds-icon--search ds-icon--lg" aria-hidden="true"></i>  <!-- 24 -->

<!-- 색은 부모 글자색 -->
<span style="color: var(--ds-color-fg-brand)"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></span>
<span style="color: var(--ds-color-fg-critical)"><i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i></span>
```

## 쓰임

자주 쓰는 아이콘의 쓰임입니다. 같은 뜻에는 늘 같은 아이콘을 씁니다. 채움 모양은 이름 끝에 `-solid`를 붙입니다.

### 이동

| 이름 | 쓰임 |
| --- | --- |
| `chevron-down` | 펼치기, 드롭다운 열기 |
| `chevron-up` | 접기 |
| `chevron-left` | 뒤로, 이전 |
| `chevron-right` | 다음, 목록 행의 이동 표시 |
| `chevrons-left` | 맨 처음으로 |
| `chevrons-right` | 맨 끝으로 |
| `arrow-right` | 다음 단계, 바로 가기 |
| `arrow-up` | 맨 위로, 보내기 |
| `corner-down-right` | 답글, 하위 항목 |
| `menu` | 메뉴 열기 |
| `panel-left` | 왼쪽 메뉴 열고 닫기 |
| `house` | 홈 |
| `external-link` | 새 창으로 열기 |

### 동작

| 이름 | 쓰임 |
| --- | --- |
| `x` | 닫기, 지우기 |
| `check` | 선택됨, 확인 |
| `plus` | 추가, 수량 늘리기 |
| `minus` | 빼기, 수량 줄이기 |
| `search` | 찾기 |
| `copy` | 복사 |
| `share` | 공유 |
| `link` | 링크 복사, 제목 링크 |
| `trash` | 삭제 |
| `upload` | 올리기 |
| `paperclip` | 파일 첨부 |
| `rotate-ccw` | 새로 고침, 되돌리기 |
| `ellipsis` | 더 보기 메뉴 |
| `eye` | 비밀번호 보이기 |
| `eye-off` | 비밀번호 숨기기 |
| `image` | 사진 자리, 사진 올리기 |
| `square` | 멈춤 (AI 답변 생성 중단) |

### 상태

| 이름 | 쓰임 |
| --- | --- |
| `circle-check` | 성공, 완료 |
| `circle-alert` | 오류, 주의 |
| `triangle-alert` | 경고 |
| `info` | 안내 |
| `circle-x` | 실패, 입력 지우기 |
| `inbox` | 비어 있음 (Empty) |
| `sparkles` | AI 기능, 새 기능 |

### 사물

| 이름 | 쓰임 |
| --- | --- |
| `calendar` | 날짜 고르기 |
| `clock` | 시간 고르기, 시각 |
| `file-text` | 문서, 파일 |
| `id-card` | 계정, 신분 정보 |
| `credit-card` | 결제, 카드 |
| `globe` | 언어, 지역 |
| `monitor` | PC 화면 보기 |
| `smartphone` | 모바일 화면 보기 |
| `headset` | 고객센터 |
| `message-circle` | 댓글, 대화 |
| `map-pin` | 위치, 주소 |
| `shopping-cart` | 장바구니 |

### 앱

| 이름 | 쓰임 |
| --- | --- |
| `folder` | 폴더 |
| `folder-open` | 열린 폴더 |
| `folder-tree` | 폴더 구조 |
| `folder-input` | 폴더로 옮기기 |
| `file` | 파일 |
| `file-code` | 코드 파일 |
| `archive` | 보관 |
| `download` | 내려받기 |
| `save` | 저장 |
| `printer` | 인쇄 |
| `mail` | 메일 |
| `bell` | 알림 |
| `settings` | 설정 |
| `log-out` | 로그아웃 |
| `user` | 사람, 내 정보 |
| `users` | 여러 사람, 팀 |
| `lock` | 잠금, 보안 |
| `key-round` | 열쇠, SSO 로그인 |
| `shield-check` | 안전, 인증됨 |
| `building` | 회사, 기업 |
| `package` | 상품, 꾸러미 |
| `truck` | 배송 |
| `receipt` | 영수증, 청구 |
| `wallet` | 지갑, 자산 |
| `tag` | 태그, 분류 |
| `flag` | 깃발, 표시 |
| `at-sign` | 아이디, 멘션 |
| `phone` | 전화 |
| `cloud` | 클라우드 |
| `database` | 데이터베이스 |
| `server` | 서버 |
| `globe-lock` | 보안 연결 |
| `link-2` | 연결된 계정 |
| `book-open` | 문서, 배우기 |
| `lightbulb` | 도움말, 팁 |
| `rocket` | 빠르게, 시작 |
| `bug` | 버그, 문제 |
| `wand-sparkles` | AI 도구 사용 |
| `sparkle` | 반짝, 새로움 |

### 편집

| 이름 | 쓰임 |
| --- | --- |
| `layout-grid` | 바둑판 보기 |
| `list` | 목록 보기 |
| `list-checks` | 체크 목록 |
| `list-filter` | 목록 거르기 |
| `list-music` | 재생 목록 |
| `columns-3` | 열 보기 |
| `grip-vertical` | 끌어 옮기기 손잡이 |
| `move` | 옮기기 |
| `zoom-in` | 확대 |
| `zoom-out` | 축소 |
| `type` | 글자 도구 |
| `layers` | 레이어 |
| `pen-tool` | 펜 도구 |
| `mouse-pointer-2` | 선택 도구 |
| `hand` | 화면 이동 도구 |
| `crop` | 자르기 |
| `scissors` | 오려 두기 |
| `palette` | 색, 만들기 |
| `square-pen` | 새로 쓰기 |
| `pencil` | 고치기 |
| `text-align-start` | 글 블록 |
| `italic` | 기울임 |
| `undo-2` | 되돌리기 |
| `redo-2` | 다시 하기 |
| `undo` | 되돌리기 |
| `terminal` | 터미널 |
| `code` | 코드 |
| `git-branch` | 브랜치 |
| `git-commit-horizontal` | 커밋 |
| `git-pull-request` | 풀 리퀘스트 |
| `panel-right` | 오른쪽 패널, 태블릿 보기 |
| `maximize-2` | 크게 보기 |
| `play` | 실행, 재생 |
| `pause` | 멈춤 |
| `video` | 영상 |
| `mic` | 말로 입력 |
| `chart-line` | 선 그래프 |
| `chart-column` | 막대 그래프 |
| `chart-pie` | 원 그래프 |
| `calendar-days` | 달력 보기 |

### 그 밖에

| 이름 | 쓰임 |
| --- | --- |
| `funnel` | 거르기 |
| `sliders-horizontal` | 보기 설정, 고급 검색 |
| `arrow-down` | 아래로 |
| `arrow-left` | 왼쪽, 이전 |
| `arrow-up-down` | 정렬 |
| `chevrons-up-down` | 모두 펼치기 |
| `ellipsis-vertical` | 세로 더 보기 |
| `refresh-cw` | 새로 고침 |
| `circle` | 빈 동그라미 |
| `circle-dot` | 선택된 동그라미 |
| `circle-dashed` | 예정, 빈 상태 |
| `sun` | 밝은 화면 |
| `moon` | 어두운 화면 |
| `command` | 명령, 단축키 |

### 반응

| 이름 | 쓰임 |
| --- | --- |
| `heart` | 좋아요, 찜 |
| `bookmark` | 저장, 북마크 |
| `star` | 평점, 즐겨찾기 |
| `thumbs-up` | 도움이 됐어요 |
| `thumbs-down` | 도움이 안 됐어요 |

## 새 아이콘 넣기

되도록 지금 있는 아이콘을 씁니다. 새 아이콘이 꼭 필요하면 아래 순서를 따릅니다.

1. [Library](https://luvms012-rgb.github.io/yds/site/foundations/icons-library.md)의 Lucide 전체에서 알맞은 아이콘을 고릅니다.
2. 오른쪽 칸의 **icons.css 줄**을 복사해 `dist/icons.css` 끝에 붙입니다.
3. 그다음부터 `ds-icon--이름` 클래스로 씁니다.

```html
/* Lucide heart - 복사된 줄을 dist/icons.css 끝에 붙인다 */
:root { --ds-icon-heart: url("data:image/svg+xml,…"); }
.ds-icon--heart { --ds-icon: var(--ds-icon-heart); }

<!-- 그다음부터 -->
<i class="ds-icon ds-icon--heart" aria-hidden="true"></i>
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 같은 뜻에는 늘 같은 아이콘을 씁니다. 닫기는 x, 더 보기는 ellipsis입니다. |
| **Do** | 아이콘만 있는 버튼에는 aria-label을 붙입니다. |
| **Do** | 색은 글자색을 따라가게 둡니다. 상태 색이 필요하면 부모 글자색을 바꿉니다. |
| **Do** | 크기는 16, 20, 24 셋 중에서 고릅니다. |
| **Don't** | 이모지나 다른 아이콘 세트를 섞지 않습니다. |
| **Don't** | 아이콘 그림을 손으로 고치지 않습니다. Lucide 원본 그대로 씁니다. |
| **Don't** | 아이콘 하나로 긴 뜻을 대신하지 않습니다. 뜻이 분명하지 않으면 글자를 같이 씁니다. |

아이콘 그림은 Lucide(ISC 라이선스)입니다. [라이선스 전문](https://luvms012-rgb.github.io/yds/site/assets/lucide-LICENSE.txt)
