// ============================================================
// 파일명: app.js
// 역할: 앱 진입점 — 모든 모듈을 올바른 순서로 초기화
// 수정 시: 초기화 순서 또는 시작 상태를 변경할 때만 수정
//
// 모듈 초기화 순서 (index.html의 스크립트 로드 순서와 일치):
//   1. categories.js  → CATEGORIES_DATA
//   2. domains.js     → DOMAIN_STOCK, DOMAIN_DEV, DOMAIN_LEARNING, DOMAIN_REGISTRY
//   3. state.js       → AppState, StateManager
//   4. promptBuilder  → PromptBuilder, AI_INFO, QUALITY_HINTS
//   5. render.js      → Renderer
//   6. theme.js       → ThemeManager
//   7. events.js      → handleOptionSelect, initEventListeners
//   8. app.js         → init() ← 여기서 시작
//
// 도메인 확장 방법:
//   domains.js에 새 도메인 상수 + DOMAIN_REGISTRY 배열에 추가만 하면
//   탭·카드·클릭·AI전환 모두 자동 반영 (이 파일 수정 불필요)
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

  // [2-b] 도메인 탭 + 템플릿 카드 렌더링 (DOMAIN_REGISTRY 기반)
  // ★ 레지스트리가 있으면 탭을 동적 생성 → 없으면 DOMAIN_STOCK 단독 폴백
  if (typeof DOMAIN_REGISTRY !== 'undefined' && DOMAIN_REGISTRY.length > 0) {
    Renderer.renderDomainTabs(DOMAIN_REGISTRY);          // 탭 버튼 동적 생성
    Renderer.renderDomainTemplates(DOMAIN_REGISTRY[0]); // 첫 번째 도메인 카드 표시
  } else if (typeof DOMAIN_STOCK !== 'undefined') {
    // 폴백: 레지스트리 없을 때 기존 정적 탭 구조 사용
    Renderer.renderDomainTemplates(DOMAIN_STOCK);
  }

  // [3] 이벤트 리스너 등록
  initEventListeners();

  // [4] 초기 AI 인디케이터 표시 (기본: Claude)
  Renderer.updateAIIndicator(AI_INFO['claude']);

  // [5] 초기 품질 메터 표시 (0% 상태)
  Renderer.updateQualityMeter(0, QUALITY_HINTS[0]);

  // [6] 초기 진행 바 표시 (0/6)
  Renderer.updateProgress(0);

  console.log('✅ 프롬프트 자판기 v2 초기화 완료 — 도메인 수:', typeof DOMAIN_REGISTRY !== 'undefined' ? DOMAIN_REGISTRY.length : 1);
}

// DOM 준비 완료 후 초기화 실행
document.addEventListener('DOMContentLoaded', init);
