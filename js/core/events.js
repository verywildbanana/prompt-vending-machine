// ============================================================
// 파일명: events.js
// 역할: 모든 이벤트 리스너 등록 및 사용자 인터랙션 처리
// 수정 시: 새 인터랙션 추가 또는 기존 동작 변경 시 이 파일 수정
// 의존성: state.js(AppState, StateManager), render.js(Renderer),
//         promptBuilder.js(PromptBuilder, AI_INFO, QUALITY_HINTS)
//         categories.js(CATEGORIES_DATA)
// ============================================================

// ────────────────────────────────────────────────────────────────
// [핵심 함수] 옵션 카드 선택 처리
// input: categoryKey (예: 'useCase'), optionId (예: 'writing')
// 동작: 같은 카드 재클릭 시 선택 해제(토글), 다른 카드 클릭 시 전환
// ────────────────────────────────────────────────────────────────
function handleOptionSelect(categoryKey, optionId) {
  const state  = StateManager.getState();
  const option = CATEGORIES_DATA[categoryKey]?.options.find(o => o.id === optionId);
  if (!option) return;

  // 토글 처리: 이미 선택된 카드를 다시 클릭하면 해제
  const isSame = state.selections[categoryKey]?.id === optionId;

  StateManager.update(s => {
    if (isSame) {
      // 선택 해제
      s.selections[categoryKey] = null;
    } else {
      // 새 옵션 선택
      s.selections[categoryKey] = {
        id:         option.id,
        label:      option.label,
        promptText: option.promptText,
        isCustom:   false,
      };
    }
    // 직접 입력 필드 초기화 (카드 선택으로 덮어씀)
    const customInput = document.getElementById(`custom-${categoryKey}`);
    if (customInput) customInput.value = '';
  });

  // UI 업데이트
  const newState = StateManager.getState();
  const selected  = newState.selections[categoryKey];

  Renderer.updateCardUI(categoryKey, selected?.id || null, !!selected);
  Renderer.updateBadge(categoryKey, selected?.label || null);
  updateAll();
}

// ────────────────────────────────────────────────────────────────
// [핵심 함수] 직접 입력 적용 처리
// input: categoryKey
// 동작: 입력 필드의 텍스트로 커스텀 옵션 생성
// ────────────────────────────────────────────────────────────────
function handleCustomInput(categoryKey) {
  const inputEl = document.getElementById(`custom-${categoryKey}`);
  if (!inputEl) return;

  const value = inputEl.value.trim();
  if (!value) return; // 빈 입력 무시

  StateManager.update(s => {
    // 커스텀 입력은 모든 AI에 동일한 텍스트 사용
    s.selections[categoryKey] = {
      id:    'custom',
      label: value,
      promptText: {
        claude:  value,
        chatgpt: value,
        gemini:  value,
      },
      isCustom: true,
    };
  });

  // 카드 선택 모두 해제 (직접 입력으로 대체됨)
  Renderer.updateCardUI(categoryKey, null, false);
  Renderer.updateBadge(categoryKey, `✏️ ${value}`);

  // 완료 상태 표시
  const section = document.querySelector(`.category-section[data-category="${categoryKey}"]`);
  if (section) section.classList.add('completed');

  updateAll();
}

// ────────────────────────────────────────────────────────────────
// [공통 함수] 상태 변경 후 모든 UI 일괄 업데이트
// updateChips: 카테고리 선택이 바뀔 때만 true — textarea 입력 시 false
//              (칩을 지웠다 다시 그리면 animation이 매번 실행되어 깜빡임 발생)
// ────────────────────────────────────────────────────────────────
function updateAll({ updateChips = true } = {}) {
  const state        = StateManager.getState();
  const selectedCount = StateManager.getSelectedCount();
  const qualityScore  = StateManager.getQualityScore();

  // 프롬프트 재생성
  const prompt = PromptBuilder.generate(
    state.selectedAI,
    state.selections,
    state.userRequest,
  );

  // 상태에 저장
  StateManager.update(s => { s.generatedPrompt = prompt; });

  // UI 업데이트
  Renderer.updatePreview(prompt);
  Renderer.updateProgress(selectedCount);
  // 선택이 바뀐 경우에만 칩 재생성 (textarea 입력 시 스킵 → 깜빡임 방지)
  if (updateChips) Renderer.updateSummaryChips(state.selections);
  Renderer.updateQualityMeter(qualityScore, QUALITY_HINTS[selectedCount]);
}

// ────────────────────────────────────────────────────────────────
// 이벤트 리스너 초기화 (app.js에서 호출)
// ────────────────────────────────────────────────────────────────
function initEventListeners() {

  // ── 옵션 카드 클릭 — document 레벨 이벤트 위임 ──────────────
  // render.js의 renderCategoryGrid가 여러 번 호출되어도 리스너는 여기서
  // 단 한 번만 등록됨 → 중복 리스너 누적 방지
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.option-card');
    if (!card) return;
    handleOptionSelect(card.dataset.category, card.dataset.optionId);
  });

  // ── AI 탭 전환 ──────────────────────────────────────────────
  document.querySelectorAll('.ai-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const ai = tab.dataset.ai;
      if (!ai) return;

      // 탭 활성화 표시
      document.querySelectorAll('.ai-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // 상태 업데이트
      StateManager.update(s => { s.selectedAI = ai; });

      // AI 인디케이터 업데이트
      Renderer.updateAIIndicator(AI_INFO[ai]);

      // 프롬프트 재생성 (AI 전환 시 — 카테고리 선택은 안 바뀌므로 칩 스킵)
      updateAll({ updateChips: false });
    });
  });

  // ── 직접 입력 "적용" 버튼 ───────────────────────────────────
  document.querySelectorAll('.custom-apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleCustomInput(btn.dataset.category);
    });
  });

  // ── 직접 입력 필드 — 엔터 키 ────────────────────────────────
  document.querySelectorAll('.custom-input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const categoryKey = input.id.replace('custom-', '');
        handleCustomInput(categoryKey);
      }
    });
  });

  // ── 사용자 요청 텍스트에어리어 — 실시간 반영 ────────────────
  // updateChips: false — 텍스트 입력 시 카테고리 선택이 바뀌지 않으므로
  //              칩 재생성 스킵 → 깜빡임/흔들림 방지
  const userRequestInput = document.getElementById('userRequestInput');
  if (userRequestInput) {
    userRequestInput.addEventListener('input', () => {
      StateManager.update(s => {
        s.userRequest = userRequestInput.value;
      });
      updateAll({ updateChips: false });
    });
  }

  // ── 클립보드 복사 버튼 ──────────────────────────────────────
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const prompt = StateManager.getState().generatedPrompt;
      if (!prompt) return;

      try {
        // Clipboard API (최신 브라우저)
        await navigator.clipboard.writeText(prompt);
      } catch {
        // 폴백: execCommand (구형 브라우저 대응)
        const textarea = document.createElement('textarea');
        textarea.value = prompt;
        textarea.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // 복사 성공 UI 피드백
      Renderer.showToast();
      Renderer.flashCopySuccess();
    });
  }

  // ── 재생성 버튼 ─────────────────────────────────────────────
  const regenBtn = document.getElementById('regenerateBtn');
  if (regenBtn) {
    regenBtn.addEventListener('click', () => {
      // 현재 선택 그대로 프롬프트 재생성 — 칩은 변하지 않으므로 스킵
      updateAll({ updateChips: false });
    });
  }

  // ── 전체 초기화 버튼 ────────────────────────────────────────
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // 상태 초기화
      StateManager.update(s => {
        Object.keys(s.selections).forEach(key => {
          s.selections[key] = null;
        });
        s.userRequest     = '';
        s.generatedPrompt = '';
      });

      // 요청 텍스트에어리어 초기화
      const textarea = document.getElementById('userRequestInput');
      if (textarea) textarea.value = '';

      // 전체 UI 초기화
      Renderer.resetAll();
    });
  }
}
