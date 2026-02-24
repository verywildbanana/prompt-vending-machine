// ============================================================
// 파일명: state.js
// 역할: 앱 전체의 전역 상태(AppState) 관리
// 수정 시: 새 상태 항목이 필요할 때만 이 파일 수정
// 패턴: 단순 전역 객체 + 구독자 패턴 (프레임워크 없이 상태 변경 감지)
// ============================================================

// ────────────────────────────────────────────────────────────────
// AppState: 앱의 모든 상태를 하나의 객체에서 관리
// ────────────────────────────────────────────────────────────────
const AppState = {
  // 현재 선택된 AI 타겟 ('claude' | 'chatgpt' | 'gemini')
  selectedAI: 'claude',

  // 테마 ('dark' | 'light')
  theme: 'dark',

  // 각 카테고리별 선택 상태
  // null = 미선택, { id, label, promptText, isCustom } = 선택됨
  selections: {
    useCase:      null,
    persona:      null,
    thinkingMode: null,
    outputFormat: null,
    tone:         null,
    language:     null,
  },

  // 사용자가 직접 입력한 요청 내용
  userRequest: '',

  // 최종 생성된 프롬프트 문자열
  generatedPrompt: '',

  // 현재 활성화된 도메인 템플릿 (null = 카테고리 모드, 객체 = 도메인 템플릿 모드)
  // 설정 시: { id, label, icon, description, promptText: {claude, chatgpt, gemini} }
  // 이 값이 있으면 updateAll()이 카테고리 rebuild를 건너뛰고 이 프롬프트를 사용
  activeDomainTemplate: null,
};

// ────────────────────────────────────────────────────────────────
// 구독자 패턴: 상태 변경 시 등록된 콜백 실행
// 사용법: StateManager.subscribe(callback) → 상태 변경마다 callback()
// ────────────────────────────────────────────────────────────────
const StateManager = (() => {
  // 등록된 구독자 목록
  const subscribers = [];

  return {
    // 구독 등록
    // input: callback (상태 변경 시 호출될 함수)
    subscribe(callback) {
      subscribers.push(callback);
    },

    // 상태 업데이트 + 모든 구독자에게 알림
    // input: updater (AppState를 직접 수정하는 함수)
    update(updater) {
      updater(AppState); // 상태 변경
      // 등록된 모든 구독자에게 변경 알림
      subscribers.forEach(cb => cb(AppState));
    },

    // 현재 상태 스냅샷 반환 (읽기 전용 용도)
    getState() {
      return AppState;
    },

    // 선택 완료된 카테고리 수 계산
    // output: 0~6 숫자
    getSelectedCount() {
      return Object.values(AppState.selections)
        .filter(v => v !== null)
        .length;
    },

    // 품질 점수 계산 (선택 수 기반, 0~100%)
    // output: 0~100 숫자
    getQualityScore() {
      const count = this.getSelectedCount();
      const total = Object.keys(AppState.selections).length; // 6
      return Math.round((count / total) * 100);
    },
  };
})();
