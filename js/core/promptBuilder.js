// ============================================================
// 파일명: promptBuilder.js
// 역할: 선택된 옵션 + 사용자 입력을 AI별 최적 프롬프트로 조합
// 수정 시: AI별 프롬프트 구조를 바꾸고 싶을 때만 이 파일 수정
// 입력: AppState.selections, AppState.selectedAI, AppState.userRequest
// 출력: 완성된 프롬프트 문자열
// ============================================================

// ────────────────────────────────────────────────────────────────
// AI별 인디케이터 정보 (헤더의 AI 표시에 사용)
// ────────────────────────────────────────────────────────────────
const AI_INFO = {
  claude: {
    name:  'Claude',
    color: '#D4722A',
    tip:   'XML 태그 구조 최적화',
  },
  chatgpt: {
    name:  'ChatGPT',
    color: '#10A37F',
    tip:   'Act as + 번호 지시사항',
  },
  gemini: {
    name:  'Gemini',
    color: '#4285F4',
    tip:   '자연어 직접 지시',
  },
};

// ────────────────────────────────────────────────────────────────
// AI별 품질 힌트 메시지 (선택 수에 따라 다른 메시지 표시)
// ────────────────────────────────────────────────────────────────
const QUALITY_HINTS = [
  '카테고리를 선택해 프롬프트를 시작하세요',         // 0개
  '좋은 시작! 페르소나나 사고 방식을 추가해보세요',   // 1개
  '기본 프롬프트 완성! 사고 방식이 결과를 바꿉니다', // 2개
  '꽤 좋습니다. 출력 형식도 지정해보세요',          // 3개
  '훌륭한 프롬프트! 언어 설정으로 완성해보세요',     // 4개
  '거의 완성! 마지막 카테고리를 선택해보세요',       // 5개
  '완벽한 프롬프트가 완성되었습니다! 🎉',           // 6개
];

// ────────────────────────────────────────────────────────────────
// PromptBuilder: AI별 프롬프트 생성 함수들
// ────────────────────────────────────────────────────────────────
const PromptBuilder = {

  // ── Claude 프롬프트 빌더 ──────────────────────────────────────
  // 전략: Anthropic 권장 XML 태그 구조
  // <role> 페르소나, <task> 목적, <thinking> 사고방식,
  // <instructions> 출력지시, <request> 실제 요청
  // ──────────────────────────────────────────────────────────────
  buildClaude(selections, userRequest) {
    const parts = [];

    // [1] 페르소나 → <role> 태그
    if (selections.persona) {
      parts.push(`<role>\n${selections.persona.promptText.claude}\n</role>`);
    }

    // [2] 용도/목적 → <task> 태그
    if (selections.useCase) {
      parts.push(`<task>\n${selections.useCase.promptText.claude}을(를) 수행합니다.\n</task>`);
    }

    // [3] 사고 방식 → <thinking_approach> 태그
    if (selections.thinkingMode) {
      parts.push(`<thinking_approach>\n${selections.thinkingMode.promptText.claude}\n</thinking_approach>`);
    }

    // [4] 출력형식 + 톤 + 언어 → <instructions> 태그 (번호 리스트)
    const instructions = [];
    if (selections.outputFormat) instructions.push(selections.outputFormat.promptText.claude);
    if (selections.tone)         instructions.push(selections.tone.promptText.claude);
    if (selections.language)     instructions.push(selections.language.promptText.claude);

    if (instructions.length > 0) {
      const numbered = instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n');
      parts.push(`<instructions>\n${numbered}\n</instructions>`);
    }

    // [5] 사용자 실제 요청 → <request> 태그
    const requestContent = userRequest.trim()
      ? userRequest.trim()
      : '[여기에 구체적인 요청 내용을 입력하세요]';
    parts.push(`<request>\n${requestContent}\n</request>`);

    return parts.join('\n\n');
  },

  // ── ChatGPT 프롬프트 빌더 ────────────────────────────────────
  // 전략: "Act as" 페르소나 + "Let's think" + 번호 지시사항
  // OpenAI 공식 권장 방식
  // ──────────────────────────────────────────────────────────────
  buildChatGPT(selections, userRequest) {
    const parts = [];

    // [1] 페르소나: "Act as" 형식
    if (selections.persona) {
      parts.push(`${selections.persona.promptText.chatgpt}.`);
    }

    // [2] 용도/목적: "Your task is to..." 형식
    if (selections.useCase) {
      parts.push(`Your task is to assist with ${selections.useCase.promptText.chatgpt}.`);
    }

    // [3] 사고방식: ChatGPT용 텍스트 (영어 지시어 포함)
    if (selections.thinkingMode) {
      parts.push(selections.thinkingMode.promptText.chatgpt + '.');
    }

    // [4] 출력형식 + 톤 + 언어: "Please follow these guidelines:" 리스트
    const guidelines = [];
    if (selections.outputFormat) guidelines.push(selections.outputFormat.promptText.chatgpt);
    if (selections.tone)         guidelines.push(selections.tone.promptText.chatgpt);
    if (selections.language)     guidelines.push(selections.language.promptText.chatgpt);

    if (guidelines.length > 0) {
      const numbered = guidelines.map((g, i) => `${i + 1}. ${g}`).join('\n');
      parts.push(`Please follow these guidelines:\n${numbered}`);
    }

    // [5] 사용자 실제 요청
    const requestContent = userRequest.trim()
      ? userRequest.trim()
      : '[여기에 구체적인 요청 내용을 입력하세요]';
    parts.push(`\n${requestContent}`);

    return parts.join('\n\n');
  },

  // ── Gemini 프롬프트 빌더 ─────────────────────────────────────
  // 전략: 자연어 문장형, 한국어 직접 지시
  // Google 권장: 맥락을 먼저, 조건을 나중에
  // ──────────────────────────────────────────────────────────────
  buildGemini(selections, userRequest) {
    const parts = [];

    // [1] 페르소나: "~로서 답변해주세요" 자연어 형식
    if (selections.persona) {
      parts.push(`${selections.persona.promptText.gemini}.`);
    }

    // [2] 용도/목적: "~을 도와주세요" 자연어 형식
    if (selections.useCase) {
      parts.push(`${selections.useCase.promptText.gemini}을(를) 도와주세요.`);
    }

    // [3] 사고방식: 한국어 자연어 직접 지시
    if (selections.thinkingMode) {
      parts.push(selections.thinkingMode.promptText.gemini + '.');
    }

    // [4] 출력형식 + 톤 + 언어: "다음 조건을 지켜주세요:" 리스트
    const conditions = [];
    if (selections.outputFormat) conditions.push(selections.outputFormat.promptText.gemini);
    if (selections.tone)         conditions.push(selections.tone.promptText.gemini);
    if (selections.language)     conditions.push(selections.language.promptText.gemini);

    if (conditions.length > 0) {
      const listed = conditions.map(c => `- ${c}`).join('\n');
      parts.push(`다음 조건을 지켜주세요:\n${listed}`);
    }

    // [5] 사용자 실제 요청
    const requestContent = userRequest.trim()
      ? userRequest.trim()
      : '[여기에 구체적인 요청 내용을 입력하세요]';
    parts.push(`\n${requestContent}`);

    return parts.join('\n\n');
  },

  // ── 메인 생성 함수 ────────────────────────────────────────────
  // input: selectedAI (string), selections (object), userRequest (string)
  // output: 완성된 프롬프트 문자열
  // ──────────────────────────────────────────────────────────────
  generate(selectedAI, selections, userRequest) {
    // 아무것도 선택되지 않은 경우 빈 문자열 반환
    const hasAny = Object.values(selections).some(v => v !== null);
    if (!hasAny) return '';

    // AI별 빌더 함수 호출
    switch (selectedAI) {
      case 'claude':  return this.buildClaude(selections, userRequest);
      case 'chatgpt': return this.buildChatGPT(selections, userRequest);
      case 'gemini':  return this.buildGemini(selections, userRequest);
      default:        return this.buildClaude(selections, userRequest);
    }
  },
};
