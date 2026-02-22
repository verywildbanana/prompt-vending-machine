# 프롬프트 자판기 — 유지보수 가이드

## 프로젝트 개요
AI 프롬프트 자동 생성 웹앱. 카테고리별 옵션 선택 → Claude/ChatGPT/Gemini 최적화 프롬프트 생성.
- 배포: https://verywildbanana.github.io/prompt-vending-machine/
- 기술 스택: 순수 HTML/CSS/JS (빌드 없음, 서버 없음)
- 저장소: https://github.com/verywildbanana/prompt-vending-machine

---

## 파일 구조 & 수정 위치

```
index.html          ← HTML 뼈대, GA4 스크립트, 피드백 버튼
style.css           ← 전체 스타일 (CSS 변수로 테마 관리)
js/
  data/
    categories.js   ← ★ 프롬프트 옵션 추가/수정 시 이 파일만 수정
  core/
    state.js        ← 전역 상태 (AppState, StateManager)
    promptBuilder.js← AI별 프롬프트 조합 로직
    events.js       ← 이벤트 리스너, GA4 커스텀 이벤트
  ui/
    render.js       ← DOM 렌더링
    theme.js        ← 다크/라이트 테마
  app.js            ← 초기화 진입점
```

### 수정 목적별 파일 안내
| 하고 싶은 것 | 수정 파일 |
|-------------|---------|
| 옵션 텍스트/아이콘 변경 | `js/data/categories.js` |
| 새 옵션 카드 추가 | `js/data/categories.js` |
| 새 카테고리 추가 | `js/data/categories.js` + `index.html` (섹션 추가) |
| AI별 프롬프트 구조 변경 | `js/core/promptBuilder.js` |
| 스타일/색상 변경 | `style.css` (:root 변수) |
| 피드백 폼 URL 교체 | `index.html` (feedback-btn href) |

---

## 자주 하는 작업

### 1. 옵션 카드 추가 (categories.js)
```javascript
// js/data/categories.js — options 배열에 객체 추가
{
  id:          'newOption',       // 고유 ID (영문)
  label:       '새 옵션',         // 카드에 표시될 텍스트
  icon:        '🆕',              // 이모지 아이콘
  description: '이 옵션의 설명',   // 카드 호버 설명
  promptText: {
    claude:  'Claude용 프롬프트 텍스트',
    chatgpt: 'ChatGPT용 프롬프트 텍스트',
    gemini:  'Gemini용 프롬프트 텍스트',
  },
},
```

### 2. 피드백 폼 연결 (Google Forms)
1. Google Forms에서 폼 생성
2. 우측 상단 전송 → 링크 복사
3. `index.html`에서 아래 부분 URL 교체:
```html
<a class="feedback-btn" href="여기에_폼_URL" ...>
```

### 3. 배포 (변경사항 반영)
```bash
git add -A
git commit -m "설명"
git push origin main
# → GitHub Actions가 자동으로 GitHub Pages 재배포 (1~2분 소요)
```

---

## GA4 분석 활용법
- 측정 ID: `G-TTWZW10WF3`
- 대시보드: https://analytics.google.com

### 추적 중인 커스텀 이벤트
| 이벤트 이름 | 발생 시점 | 파라미터 |
|-----------|---------|---------|
| `option_select` | 카드 클릭 시 | `category`, `option` |
| `prompt_copy` | 복사 버튼 클릭 시 | `selected_ai`, `selected_count` |
| `feedback_click` | 피드백 버튼 클릭 시 | `source` |

### 주요 분석 질문
- 어떤 카테고리가 가장 많이 선택되나? → `option_select` 이벤트
- 실제 프롬프트가 사용되나? → `prompt_copy` 이벤트
- 어떤 AI가 인기인가? → `prompt_copy.selected_ai` 파라미터

---

## 아키텍처 핵심 패턴

### 이벤트 위임 (중복 리스너 방지)
카드 클릭은 document 레벨에서 단일 위임으로 처리 (`events.js`).
`render.js`에서 카드를 아무리 많이 재생성해도 리스너는 1개.

### 칩 깜빡임 방지
`updateAll({ updateChips: false })` — textarea 입력, AI 탭 전환, 재생성 버튼은
카테고리 선택이 안 바뀌므로 칩 재생성 스킵.
칩 재생성이 필요한 경우만 `updateAll()` (기본값 `updateChips: true`).

### XSS 방지
사용자 입력(`v.label`)은 반드시 `textContent`로 삽입 (innerHTML 금지).
하드코딩 데이터(`categories.js` 상수)만 innerHTML 사용 가능.

---

## 향후 개선 아이디어
- [ ] 프롬프트 즐겨찾기 저장 (localStorage)
- [ ] 사용자 커스텀 카테고리 추가
- [ ] 프롬프트 공유 URL 생성 (쿼리스트링 직렬화)
- [ ] 새 AI 추가 (Grok, Perplexity 등)
- [ ] 다국어 UI (영문 버전)
