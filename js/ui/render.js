// ============================================================
// 파일명: render.js
// 역할: 카테고리 카드, 배지, 진행바, 품질 메터 등 DOM 렌더링
// 수정 시: UI 표시 방식을 바꾸고 싶을 때 이 파일 수정
//          (카드 모양, 배지 텍스트, 진행 바 동작 등)
// 패턴: 이벤트 위임 — grid 부모에서 클릭을 처리해 메모리 효율화
// ============================================================

// ────────────────────────────────────────────────────────────────
// Renderer: 모든 DOM 업데이트 담당
// ────────────────────────────────────────────────────────────────
const Renderer = {

  // ── 카테고리 카드 그리드 렌더링 ─────────────────────────────
  // input: categoryKey (예: 'useCase'), options (배열)
  // 역할: option-grid 안에 카드 버튼들을 동적으로 생성
  // ──────────────────────────────────────────────────────────────
  renderCategoryGrid(categoryKey, options) {
    const grid = document.getElementById(`grid-${categoryKey}`);
    if (!grid) return;

    // 카드 HTML 생성 (템플릿 리터럴)
    grid.innerHTML = options.map(option => `
      <button
        class="option-card"
        data-category="${categoryKey}"
        data-option-id="${option.id}"
        aria-label="${option.label}: ${option.description}"
        aria-pressed="false"
        type="button"
      >
        <span class="card-check" aria-hidden="true">✓</span>
        <span class="card-icon" aria-hidden="true">${option.icon}</span>
        <span class="card-label">${option.label}</span>
        <span class="card-desc">${option.description}</span>
      </button>
    `).join('');

    // 주의: 클릭 이벤트는 events.js의 initEventListeners에서
    //       document 레벨 위임으로 단일 등록됨 (중복 등록 방지)
  },

  // ── 모든 카테고리 카드 한번에 렌더링 ─────────────────────────
  // CATEGORIES_DATA(categories.js)의 모든 카테고리를 순회
  // ──────────────────────────────────────────────────────────────
  renderAllCategories() {
    Object.entries(CATEGORIES_DATA).forEach(([key, category]) => {
      this.renderCategoryGrid(key, category.options);
    });
  },

  // ── 특정 카드 선택/해제 UI 업데이트 ─────────────────────────
  // input: categoryKey, optionId, isSelected (boolean)
  // ──────────────────────────────────────────────────────────────
  updateCardUI(categoryKey, optionId, isSelected) {
    const grid    = document.getElementById(`grid-${categoryKey}`);
    const badgeEl = document.getElementById(`badge-${categoryKey}`);
    const section = document.querySelector(`.category-section[data-category="${categoryKey}"]`);
    if (!grid) return;

    // 해당 카테고리의 모든 카드 선택 해제
    grid.querySelectorAll('.option-card').forEach(card => {
      card.classList.remove('selected');
      card.setAttribute('aria-pressed', 'false');
    });

    if (isSelected && optionId) {
      // 선택된 카드에 selected 클래스 추가
      const targetCard = grid.querySelector(`[data-option-id="${optionId}"]`);
      if (targetCard) {
        targetCard.classList.add('selected');
        targetCard.setAttribute('aria-pressed', 'true');
      }
    }

    // 카테고리 섹션 완료 상태 표시
    if (section) {
      section.classList.toggle('completed', isSelected);
    }
  },

  // ── 선택 배지 텍스트 업데이트 ────────────────────────────────
  // input: categoryKey, label (null이면 배지 숨김)
  // ──────────────────────────────────────────────────────────────
  updateBadge(categoryKey, label) {
    const badgeEl = document.getElementById(`badge-${categoryKey}`);
    if (!badgeEl) return;

    if (label) {
      badgeEl.textContent = label;
      badgeEl.classList.add('visible');
    } else {
      badgeEl.textContent = '';
      badgeEl.classList.remove('visible');
    }
  },

  // ── 진행 바 업데이트 ─────────────────────────────────────────
  // input: selectedCount (0~6)
  // ──────────────────────────────────────────────────────────────
  updateProgress(selectedCount) {
    const fillEl   = document.getElementById('progressFill');
    const textEl   = document.getElementById('progressText');
    const total    = 6; // 전체 카테고리 수
    const percent  = (selectedCount / total) * 100;

    if (fillEl) {
      fillEl.style.width = `${percent}%`;
      // progressbar aria 속성 업데이트
      fillEl.closest('[role="progressbar"]')
            ?.setAttribute('aria-valuenow', selectedCount);
    }
    if (textEl) {
      textEl.textContent = `${selectedCount} / ${total} 선택됨`;
    }
  },

  // ── 프롬프트 미리보기 업데이트 ───────────────────────────────
  // input: prompt (string, 빈 문자열이면 빈 상태 표시)
  // ──────────────────────────────────────────────────────────────
  updatePreview(prompt) {
    const emptyEl   = document.getElementById('previewEmpty');
    const contentEl = document.getElementById('previewContent');
    const textEl    = document.getElementById('promptText');
    const copyBtn   = document.getElementById('copyBtn');
    const regenBtn  = document.getElementById('regenerateBtn');

    if (!prompt) {
      // 빈 상태: 안내 메시지 표시
      if (emptyEl)   emptyEl.style.display   = '';
      if (contentEl) contentEl.style.display = 'none';
      if (copyBtn)   copyBtn.disabled         = true;
      if (regenBtn)  regenBtn.disabled        = true;
    } else {
      // 프롬프트 있음: 텍스트 표시
      if (emptyEl)   emptyEl.style.display   = 'none';
      if (contentEl) contentEl.style.display = '';
      if (textEl)    textEl.textContent       = prompt;
      if (copyBtn)   copyBtn.disabled         = false;
      if (regenBtn)  regenBtn.disabled        = false;
    }
  },

  // ── 선택 요약 칩 업데이트 ─────────────────────────────────────
  // input: selections (AppState.selections 객체)
  // XSS 방지: innerHTML 대신 createElement + textContent 사용
  //           (사용자가 직접 입력한 label이 포함될 수 있음)
  // ──────────────────────────────────────────────────────────────
  updateSummaryChips(selections) {
    const summaryEl = document.getElementById('selectionSummary');
    if (!summaryEl) return;

    // 기존 칩 모두 제거
    summaryEl.innerHTML = '';

    // 선택된 항목만 안전하게 DOM 요소로 생성
    Object.entries(selections).forEach(([key, v]) => {
      if (v === null) return;

      const chip = document.createElement('span');
      chip.className = 'summary-chip';
      chip.setAttribute('role', 'listitem');

      const catIcon = CATEGORIES_DATA[key]?.icon || '';
      // textContent: HTML 태그 이스케이프 — XSS 방지
      chip.textContent = `${catIcon} ${v.label}`;

      summaryEl.appendChild(chip);
    });
  },

  // ── 품질 메터 업데이트 ────────────────────────────────────────
  // input: score (0~100), hint (string)
  // ──────────────────────────────────────────────────────────────
  updateQualityMeter(score, hint) {
    const fillEl  = document.getElementById('qualityFill');
    const scoreEl = document.getElementById('qualityScore');
    const hintEl  = document.getElementById('qualityHint');
    const trackEl = fillEl?.closest('[role="progressbar"]');

    if (fillEl) {
      fillEl.style.width = `${score}%`;

      // 점수에 따른 색상 변경
      if (score < 34) {
        fillEl.style.background = 'var(--quality-low)';       // 빨강
      } else if (score < 67) {
        fillEl.style.background = 'var(--quality-mid)';       // 노랑
      } else {
        fillEl.style.background = 'var(--quality-high)';      // 초록
      }
    }

    if (scoreEl) {
      scoreEl.textContent = `${score}%`;
      // 점수별 색상
      if (score < 34)      scoreEl.style.color = 'var(--quality-low)';
      else if (score < 67) scoreEl.style.color = 'var(--quality-mid)';
      else                 scoreEl.style.color = 'var(--quality-high)';
    }

    if (hintEl && hint) {
      hintEl.textContent = hint;
    }

    if (trackEl) {
      trackEl.setAttribute('aria-valuenow', score);
    }
  },

  // ── AI 인디케이터 업데이트 ────────────────────────────────────
  // input: aiInfo { name, color, tip }
  // ──────────────────────────────────────────────────────────────
  updateAIIndicator(aiInfo) {
    const dotEl  = document.getElementById('aiIndicatorDot');
    const nameEl = document.getElementById('aiIndicatorName');
    const tipEl  = document.getElementById('aiIndicatorTip');

    if (dotEl)  dotEl.style.background  = aiInfo.color;
    if (nameEl) nameEl.textContent       = aiInfo.name;
    if (tipEl)  tipEl.textContent        = aiInfo.tip;
  },

  // ── 토스트 알림 표시 ─────────────────────────────────────────
  // input: duration (ms, 기본 2500)
  // ──────────────────────────────────────────────────────────────
  showToast(duration = 2500) {
    const toast = document.getElementById('copyToast');
    if (!toast) return;

    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), duration);
  },

  // ── 복사 버튼 아이콘 전환 (📋 → ✅ → 📋) ──────────────────
  // input: duration (ms, 기본 1500)
  // ──────────────────────────────────────────────────────────────
  flashCopySuccess(duration = 1500) {
    const labelEl = document.getElementById('copyBtnLabel');
    if (!labelEl) return;

    const original = '클립보드 복사';
    labelEl.textContent = '복사 완료 ✅';

    setTimeout(() => {
      labelEl.textContent = original;
    }, duration);
  },

  // ── 도메인 탭 동적 렌더링 ─────────────────────────────────────
  // input: registry (DOMAIN_REGISTRY 배열 — domains.js 전역 상수)
  // 역할: DOMAIN_REGISTRY를 읽어 탭 버튼을 자동 생성
  //       → 새 도메인을 domains.js에 추가하면 탭이 자동 추가됨
  // 수정 시: 탭 UI 모양/스타일을 바꾸고 싶을 때만 이 메서드 수정
  // ──────────────────────────────────────────────────────────────
  renderDomainTabs(registry) {
    const tabsEl = document.getElementById('domain-tabs');
    if (!tabsEl || !registry || registry.length === 0) return;

    // 기존 탭 제거 후 재생성
    tabsEl.innerHTML = '';

    registry.forEach((domain, i) => {
      const btn = document.createElement('button');
      btn.className = 'domain-tab' + (i === 0 ? ' active' : '');
      btn.dataset.domain = domain.id;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', domain.label + ' 도메인 탭');

      // 하드코딩 데이터이므로 innerHTML 사용 가능
      btn.innerHTML =
        '<span class="domain-tab-icon" aria-hidden="true">' + domain.icon + '</span> ' +
        '<span class="domain-tab-label">' + domain.label + '</span>';

      tabsEl.appendChild(btn);
    });
  },

  // ── 도메인 템플릿 카드 렌더링 ────────────────────────────────
  // domain: DOMAIN_REGISTRY 배열의 개별 도메인 객체
  // 수정 시: 도메인 카드 레이아웃/내용 바꾸고 싶을 때만 이 메서드 수정
  // ──────────────────────────────────────────────────────────────
  renderDomainTemplates(domain) {
    const grid = document.getElementById('domain-grid');
    if (!grid) return;

    // 기존 카드 제거
    grid.innerHTML = '';

    domain.templates.forEach(tpl => {
      // 카드 요소 생성
      const card = document.createElement('div');
      card.className = 'domain-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', tpl.label + ': ' + tpl.description);
      card.dataset.domainId = tpl.id;

      // 하드코딩 데이터(categories.js/domains.js 상수)이므로 innerHTML 사용 가능
      card.innerHTML =
        '<span class="domain-card-icon" aria-hidden="true">' + tpl.icon + '</span>' +
        '<span class="domain-card-label">' + tpl.label + '</span>' +
        '<span class="domain-card-desc">' + tpl.description + '</span>';

      grid.appendChild(card);
    });
  },

  // ── 전체 UI 초기화 ────────────────────────────────────────────
  // 모든 선택, 배지, 진행 바를 초기 상태로 되돌림
  // ──────────────────────────────────────────────────────────────
  resetAll() {
    // 모든 카드 선택 해제
    document.querySelectorAll('.option-card').forEach(card => {
      card.classList.remove('selected');
      card.setAttribute('aria-pressed', 'false');
    });

    // 모든 배지 숨김
    document.querySelectorAll('.selected-badge').forEach(badge => {
      badge.textContent = '';
      badge.classList.remove('visible');
    });

    // 모든 섹션 완료 표시 해제
    document.querySelectorAll('.category-section').forEach(section => {
      section.classList.remove('completed');
    });

    // 직접 입력 필드 초기화
    document.querySelectorAll('.custom-input').forEach(input => {
      input.value = '';
    });

    // 도메인 템플릿 선택 해제 (active 카드 하이라이트 제거 + 상태 초기화)
    document.querySelectorAll('.domain-card').forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-pressed', 'false');
    });
    StateManager.update(s => { s.activeDomainTemplate = null; });

    // 진행 바 초기화
    this.updateProgress(0);

    // 미리보기 초기화
    this.updatePreview('');

    // 요약 칩 초기화
    const summaryEl = document.getElementById('selectionSummary');
    if (summaryEl) summaryEl.innerHTML = '';

    // 품질 메터 초기화
    this.updateQualityMeter(0, QUALITY_HINTS[0]);
  },
};
