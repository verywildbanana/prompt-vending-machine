// ============================================================
// 파일명: app.js
// 역할: 앱 진입점 — 모든 모듈을 올바른 순서로 초기화
// 수정 시: 초기화 순서 또는 시작 상태를 변경할 때만 수정
//
// 모듈 초기화 순서 (index.html의 스크립트 로드 순서와 일치):
//   1. categories.js  → CATEGORIES_DATA
//   2. state.js       → AppState, StateManager
//   3. promptBuilder  → PromptBuilder, AI_INFO, QUALITY_HINTS
//   4. render.js      → Renderer
//   5. theme.js       → ThemeManager
//   6. events.js      → handleOptionSelect, initEventListeners
//   7. app.js         → init() ← 여기서 시작
// ============================================================

// ────────────────────────────────────────────────────────────────
// init: 앱 초기화 함수
// DOMContentLoaded 이후 실행되므로 모든 DOM 요소가 준비된 상태
// ────────────────────────────────────────────────────────────────
function init() {
  // [1] 테마 복원 (가장 먼저 — 화면 깜빡임 방지)
  ThemeManager.init();

  // [2] 카테고리 카드 렌더링 (CATEGORIES_DATA 기반)
  Renderer.renderAllCategories();

  // [3] 이벤트 리스너 등록
  initEventListeners();

  // [4] 초기 AI 인디케이터 표시 (기본: Claude)
  Renderer.updateAIIndicator(AI_INFO['claude']);

  // [5] 초기 품질 메터 표시 (0% 상태)
  Renderer.updateQualityMeter(0, QUALITY_HINTS[0]);

  // [6] 초기 진행 바 표시 (0/6)
  Renderer.updateProgress(0);

  console.log('✅ 프롬프트 자판기 초기화 완료');
}

// DOM 준비 완료 후 초기화 실행
document.addEventListener('DOMContentLoaded', init);
