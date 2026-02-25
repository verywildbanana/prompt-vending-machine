// ============================================================
// 파일명: promptBuilder.js
// 역할: 선택된 옵션 + 사용자 입력을 AI별 최적 프롬프트로 조합
// 수정 시: AI별 프롬프트 구조를 바꾸고 싶을 때만 이 파일 수정
// 입력: AppState.selections, AppState.selectedAI, AppState.userRequest
// 출력: 완성된 프롬프트 문자열
//
// 아키텍처:
//   ① 5개 헬퍼 함수 (모듈 레벨 순수 함수)
//      - buildUseCaseTaskBody  : useCase별 단계 분해 블록
//      - buildConstraints      : useCase별 자동 제약조건
//      - detectUserInputSignals: userInput 키워드 감지 → 추가 제약
//      - buildVerificationBlock: 자체 검증 루프 (thinkingMode 조건부)
//      - buildOutputInstructions: 출력 형식 강제 스키마
//   ② 3개 AI 빌더 (buildClaude / buildChatGPT / buildGemini)
//      - Claude  : XML 태그 구조 (Anthropic 권장)
//      - ChatGPT : R-A-C-E 프레임워크 (영어 지시어)
//      - Gemini  : T-A-G 프레임워크 (한국어 자연어)
// ============================================================


// ============================================================
// 섹션 1: 헬퍼 함수 — 제약조건 · 단계분해 · 검증루프 생성
// ============================================================

// ── 헬퍼 ① buildUseCaseTaskBody ──────────────────────────────
// useCase별 단계 분해 블록을 반환한다.
// input : useCaseId (string), baseText (string, 짧은 레이블)
// output: 단계 분해가 포함된 task 본문 문자열
// ── 해당 없는 useCase → baseText 그대로 반환 ─────────────────
function buildUseCaseTaskBody(useCaseId, baseText) {
  switch (useCaseId) {

    case 'coding':
      return `${baseText}을(를) 수행합니다.

다음 단계를 명시적으로 완료하세요:
1. **요구사항 이해** — 모호한 부분을 먼저 명시
2. **솔루션 설계** — 데이터 구조·알고리즘 선택 이유 설명
3. **구현 코드 작성** — 완전히 동작하는 코드, 플레이스홀더 없음
4. **엣지 케이스 & 에러 처리** — 예외 상황 명시
5. **테스트 케이스 / 사용 예시** — 최소 2개 예시 제시`;

    case 'writing':
      return `${baseText}을(를) 수행합니다.

다음 단계를 명시적으로 완료하세요:
1. **독자 프로필 설정** — 타겟 독자, 목적, 기대 반응 정의
2. **핵심 주장(Thesis)** — 한 문장으로 명확히 진술
3. **구조 설계** — 서론·본론·결론 흐름 계획
4. **초안 작성 & 검토** — 채움 문구·반복 표현 제거
5. **헤드라인 & 도입부 최적화** — 첫 문장으로 독자를 끌어당길 것`;

    case 'analysis':
      return `${baseText}을(를) 수행합니다.

다음 단계를 명시적으로 완료하세요:
1. **범위 & 한계 명시** — 분석 대상·기간·데이터 출처 정의
2. **발견사항** — 각 항목에 신뢰도(높음/중간/낮음) 표기
3. **인사이트 도출** — 패턴·이상치·상관관계 해석
4. **권고안 제시** — 실행 가능한 다음 단계 명시
5. **가정 목록** — 분석에 사용된 가정을 마지막에 명시`;

    case 'planning':
      return `${baseText}을(를) 수행합니다.

다음 단계를 명시적으로 완료하세요:
1. **As-Is 현황 파악** — 현재 상태, 제약 조건 명시
2. **To-Be 목표 정의** — 성공 기준과 KPI 명시
3. **Gap 분석** — 현재와 목표의 차이 요인 도출
4. **로드맵 수립** — 단계별 일정·담당·우선순위
5. **리스크 & 대응 방안** — 상위 3개 리스크와 미티게이션`;

    case 'review':
      return `${baseText}을(를) 수행합니다.

다음 단계를 명시적으로 완료하세요:
1. **강점 먼저** — 잘된 점 3가지 이상 구체적으로 제시
2. **개선점 우선순위** — 중요도 순으로 정렬, 각 항목에 이유 포함
3. **대안 제시** — 개선 방향의 구체적 예시 또는 리소스 포함
4. **즉시 vs 장기 구분** — 바로 적용 가능한 것과 장기 과제 분리
5. **종합 평가** — 한 줄 요약 + 10점 만점 평가`;

    default:
      // coding/writing/analysis/planning/review 이외 → 단계 분해 없이 baseText 그대로
      return `${baseText}을(를) 수행합니다.`;
  }
}


// ── 헬퍼 ② buildConstraints ──────────────────────────────────
// useCase + userRequest 기반 제약조건 블록을 반환한다.
// input : ai ('claude'|'chatgpt'|'gemini'), useCaseId (string), userRequest (string)
// output: 제약조건 문자열 (없으면 '' 반환)
// ── userRequest 신호는 detectUserInputSignals()에서 추가 처리 ─
function buildConstraints(ai, useCaseId, userRequest) {
  // useCase별 기본 제약조건 목록
  const constraintMap = {
    coding: [
      '완전히 동작하는 코드만 작성할 것 — 플레이스홀더나 TODO로 끝내지 말 것',
      '에러 처리를 반드시 포함할 것',
      '코드의 가정(assumption)은 주석으로 명시할 것',
      '외부 라이브러리 사용 시 버전 또는 대안을 명시할 것',
    ],
    writing: [
      '"~할 것입니다", "알겠습니다" 같은 채움 문구 금지',
      '모든 주장에 근거 또는 예시를 포함할 것',
      '같은 표현을 연속 2회 이상 반복하지 말 것',
      '독자가 다음 행동을 취할 수 있도록 명확한 결론 제시',
    ],
    analysis: [
      '데이터 한계와 출처를 반드시 명시할 것',
      '상관관계를 인과관계로 해석하지 말 것',
      '불확실한 항목은 신뢰도 수준을 명시할 것',
      '개인적 추측과 데이터 기반 결론을 명확히 구분할 것',
    ],
    planning: [
      '모든 권고안에 실행 리스크를 함께 제시할 것',
      '알고 있는 것(fact)과 가정(assumption)을 명확히 구분할 것',
      '일정은 현실적으로 — 낙관적 편향 없이 여유분 포함',
      '우선순위 결정 기준을 명시할 것',
    ],
    review: [
      '강점을 먼저 제시한 후 개선점을 논의할 것',
      '비판에는 반드시 대안 또는 개선 방향을 동반할 것',
      '개인 취향이 아닌 객관적 기준을 근거로 제시할 것',
      '피드백 항목은 중요도 순으로 우선순위를 매길 것',
    ],
    qa: [
      '불확실하거나 모르는 경우 솔직히 명시하고 추론 과정을 보여줄 것',
      '주장의 근거(출처·논리·실험)를 함께 제시할 것',
      '사실을 만들어내거나(confabulation) 추측을 사실처럼 제시하지 말 것',
      '복잡한 개념은 반드시 예시와 함께 설명할 것',
    ],
    summarize: [
      '원문의 의미를 변형하거나 왜곡하지 말 것',
      '중요도 순서로 핵심 내용을 배열할 것',
      '주관적 해석은 "[해석]" 태그로 구분할 것',
      '수치·고유명사·날짜는 원문 그대로 유지할 것',
    ],
  };

  const baseConstraints = constraintMap[useCaseId] || [];

  // userRequest 신호 기반 추가 제약
  const extraConstraints = detectUserInputSignals(userRequest, useCaseId);
  const all = [...baseConstraints, ...extraConstraints];

  if (all.length === 0) return '';

  // AI별 포맷 차이
  if (ai === 'claude') {
    const numbered = all.map((c, i) => `${i + 1}. ${c}`).join('\n');
    return `<constraints>\n${numbered}\n</constraints>`;
  } else if (ai === 'chatgpt') {
    const numbered = all.map((c, i) => `${i + 1}. ${c}`).join('\n');
    return `CONSTRAINTS (must follow strictly):\n${numbered}`;
  } else {
    // gemini
    const bulleted = all.map(c => `- ${c}`).join('\n');
    return `반드시 지켜야 할 제약 조건:\n${bulleted}`;
  }
}


// ── 헬퍼 ③ detectUserInputSignals ────────────────────────────
// userInput 키워드를 감지해 추가 제약 조건 배열을 반환한다.
// input : userInput (string), useCaseId (string)
// output: string[] (추가 제약 항목 배열, 없으면 [])
// ── 이 함수는 buildConstraints() 내부에서만 호출됨 ───────────
function detectUserInputSignals(userInput, useCaseId) {
  if (!userInput || !userInput.trim()) return [];
  const text = userInput.toLowerCase();
  const extras = [];

  if (useCaseId === 'coding') {
    // 언어별 모범 사례
    if (/python|파이썬/.test(text))
      extras.push('Python 모범 사례 준수 — PEP 8 스타일, 타입 힌트 권장');
    if (/javascript|js|node/.test(text))
      extras.push('JavaScript/Node.js 현대 문법 사용 — ES2020+ 문법, async/await 권장');
    if (/react|vue|svelte/.test(text))
      extras.push('컴포넌트 재사용성·상태 최소화·사이드 이펙트 격리 원칙 준수');
    if (/typescript|ts/.test(text))
      extras.push('TypeScript strict 모드 가정 — any 타입 사용 최소화, 명시적 타입 선언');
    if (/sql|database|db|데이터베이스/.test(text))
      extras.push('SQL 인젝션 방지, 인덱스 활용, N+1 쿼리 문제 고려');
    if (/test|테스트|spec|jest|pytest/.test(text))
      extras.push('단위 테스트 케이스 반드시 포함 — 정상 케이스·엣지 케이스·실패 케이스 각 1개 이상');
    if (/api|rest|graphql/.test(text))
      extras.push('API 응답 형식·HTTP 상태 코드·에러 응답 구조를 명시할 것');
  }

  if (useCaseId === 'writing') {
    if (/블로그|blog/.test(text))
      extras.push('SEO를 고려한 헤딩 구조(H1→H2→H3) 사용, 메타 설명 포함');
    if (/보고서|report/.test(text))
      extras.push('BLUF 구조 사용 — 결론을 첫 단락에 먼저 제시');
    if (/이메일|email|메일/.test(text))
      extras.push('명확한 제목 라인 + 행동 요청(CTA)을 본문 마지막에 포함');
    if (/sns|소셜|instagram|트위터|twitter/.test(text))
      extras.push('플랫폼별 글자 수 제한 준수, 해시태그 전략 포함');
    if (/마케팅|광고|카피/.test(text))
      extras.push('AIDA 구조(주의→관심→욕구→행동) 또는 PAS(문제→공감→해결) 구조 활용');
  }

  return extras;
}


// ── 헬퍼 ④ buildVerificationBlock ────────────────────────────
// 자체 검증 루프 블록을 반환한다.
// 특정 thinkingMode일 때만 추가 (cot, tot, selfconsistency, ultrathink, firstprinciples)
// input : ai (string), useCaseId (string), thinkingModeId (string|null)
// output: 검증 블록 문자열 (조건 미충족 시 '' 반환)
// ─────────────────────────────────────────────────────────────
function buildVerificationBlock(ai, useCaseId, thinkingModeId) {
  // 검증 루프를 적용할 thinkingMode ID 목록
  const verificationModes = ['cot', 'tot', 'selfconsistency', 'ultrathink', 'firstprinciples', 'elon'];
  if (!thinkingModeId || !verificationModes.includes(thinkingModeId)) return '';

  // useCase별 추가 체크 항목
  const useCaseChecks = {
    coding:   ['코드가 실제로 동작하는가? 플레이스홀더·TODO가 없는가?', '에러 처리가 포함됐는가?'],
    writing:  ['핵심 주장이 명확한가?', '채움 문구·반복 표현이 없는가?'],
    analysis: ['데이터 한계가 명시됐는가?', '상관관계를 인과관계로 오해하지 않았는가?'],
    planning: ['가정(assumption)이 fact와 구분됐는가?', '리스크가 포함됐는가?'],
    review:   ['강점을 먼저 제시했는가?', '모든 비판에 대안이 동반됐는가?'],
  };

  // 공통 체크 항목
  const commonChecks = [
    '요청사항의 모든 항목을 충족했는가?',
    '제약 조건을 위반한 항목이 없는가?',
    '가정한 내용이 있다면 명시했는가?',
  ];

  const specific = useCaseChecks[useCaseId] || [];
  const allChecks = [...commonChecks, ...specific];

  if (ai === 'claude') {
    const checklist = allChecks.map(c => `□ ${c}`).join('\n');
    return `<verification>\n최종 답변 전 아래 항목을 자체 검토하세요:\n${checklist}\n위 체크를 모두 통과한 후에만 최종 답변을 출력하세요.\n</verification>`;
  } else if (ai === 'chatgpt') {
    const checklist = allChecks.map(c => `[ ] ${c}`).join('\n');
    return `SELF-VERIFICATION (complete before final answer):\n${checklist}\nOnly output your final answer after all boxes are checked.`;
  } else {
    // gemini
    const checklist = allChecks.map(c => `- [ ] ${c}`).join('\n');
    return `자가 검증 (최종 답변 전 확인):\n${checklist}\n위 항목을 모두 확인한 후 최종 답변을 작성하세요.`;
  }
}


// ── 헬퍼 ⑤ buildOutputInstructions ──────────────────────────
// 출력 형식 강제 스키마 + 톤 + 언어 지시를 반환한다.
// input : ai (string), selections (AppState.selections 객체)
// output: 출력 지시사항 문자열 목록 (번호 또는 불릿)
// ─────────────────────────────────────────────────────────────
function buildOutputInstructions(ai, selections) {
  const items = [];

  // 출력 형식별 강제 스키마
  if (selections.outputFormat) {
    const fmtId = selections.outputFormat.id;
    const fmtBase = selections.outputFormat.promptText[ai];

    if (fmtId === 'stepbystep') {
      items.push(fmtBase + ' — 각 Step은 "**Step N: [제목]** → [내용] → ✅ [체크포인트]" 형식으로 작성');
    } else if (fmtId === 'json') {
      items.push(fmtBase + ' — ```json 코드블록 사용, 각 키에 인라인 주석(// 설명) 포함');
    } else if (fmtId === 'table') {
      items.push(fmtBase + ' — 빈 셀은 "N/A" 또는 "-" 사용, 헤더 행 굵게 표시');
    } else if (fmtId === 'tldr') {
      items.push(fmtBase + ' — "TL;DR:" 로 시작하는 1-2문장 요약 먼저, 그 다음 "---" 구분선 후 상세 내용');
    } else {
      items.push(fmtBase);
    }
  }

  // 톤/스타일
  if (selections.tone) {
    items.push(selections.tone.promptText[ai]);
  }

  // 언어
  if (selections.language) {
    items.push(selections.language.promptText[ai]);
  }

  return items;
}


// ============================================================
// AI별 인디케이터 정보 (헤더의 AI 표시에 사용)
// ============================================================
const AI_INFO = {
  claude: {
    name:  'Claude',
    color: '#D4722A',
    tip:   'XML 태그 + 제약조건 + 검증 루프',
  },
  chatgpt: {
    name:  'ChatGPT',
    color: '#10A37F',
    tip:   'R-A-C-E 프레임워크 + CONSTRAINTS',
  },
  gemini: {
    name:  'Gemini',
    color: '#4285F4',
    tip:   'T-A-G 프레임워크 + 자연어 지시',
  },
};


// ============================================================
// 품질 힌트 메시지 (선택 수에 따라 다른 메시지 표시)
// ============================================================
const QUALITY_HINTS = [
  '카테고리를 선택해 프롬프트를 시작하세요',         // 0개
  '좋은 시작! 페르소나나 사고 방식을 추가해보세요',   // 1개
  '기본 프롬프트 완성! 사고 방식이 결과를 바꿉니다', // 2개
  '꽤 좋습니다. 출력 형식도 지정해보세요',          // 3개
  '훌륭한 프롬프트! 언어 설정으로 완성해보세요',     // 4개
  '거의 완성! 마지막 카테고리를 선택해보세요',       // 5개
  '완벽한 프롬프트가 완성되었습니다! 🎉',           // 6개
];


// ============================================================
// 섹션 2: PromptBuilder — AI별 프롬프트 빌더 + 메인 generate()
// ============================================================
const PromptBuilder = {

  // ── Claude 프롬프트 빌더 ──────────────────────────────────────
  // 전략: Anthropic 권장 XML 태그 구조
  // 순서: <role> → <task+단계분해> → <constraints> → <thinking_approach>
  //       → <instructions> → <verification> → <request>
  // ──────────────────────────────────────────────────────────────
  buildClaude(selections, userRequest) {
    const parts = [];

    // [1] 페르소나 → <role> 태그
    if (selections.persona) {
      parts.push(`<role>\n${selections.persona.promptText.claude}\n</role>`);
    }

    // [2] 용도/목적 → <task> 태그 (단계 분해 포함)
    if (selections.useCase) {
      const taskBody = buildUseCaseTaskBody(
        selections.useCase.id,
        selections.useCase.promptText.claude
      );
      parts.push(`<task>\n${taskBody}\n</task>`);
    }

    // [3] 제약조건 → <constraints> 태그 (useCase가 있을 때만)
    if (selections.useCase) {
      const constraintBlock = buildConstraints('claude', selections.useCase.id, userRequest);
      if (constraintBlock) parts.push(constraintBlock);
    }

    // [4] 사고 방식 → <thinking_approach> 태그
    if (selections.thinkingMode) {
      parts.push(`<thinking_approach>\n${selections.thinkingMode.promptText.claude}\n</thinking_approach>`);
    }

    // [5] 출력형식 + 톤 + 언어 → <instructions> 태그 (강제 스키마 포함)
    const instrItems = buildOutputInstructions('claude', selections);
    if (instrItems.length > 0) {
      const numbered = instrItems.map((inst, i) => `${i + 1}. ${inst}`).join('\n');
      parts.push(`<instructions>\n${numbered}\n</instructions>`);
    }

    // [6] 자체 검증 루프 → <verification> 태그 (thinkingMode 조건부)
    const verificationBlock = buildVerificationBlock(
      'claude',
      selections.useCase ? selections.useCase.id : '',
      selections.thinkingMode ? selections.thinkingMode.id : null
    );
    if (verificationBlock) parts.push(verificationBlock);

    // [7] 사용자 실제 요청 → <request> 태그
    const requestContent = userRequest.trim()
      ? userRequest.trim()
      : '[여기에 구체적인 요청 내용을 입력하세요]';
    parts.push(`<request>\n${requestContent}\n</request>`);

    return parts.join('\n\n');
  },


  // ── ChatGPT 프롬프트 빌더 ────────────────────────────────────
  // 전략: R-A-C-E 프레임워크
  //   R(Role) → A(Action + 단계분해) → CONSTRAINTS → C(Context/thinkingMode)
  //   → HARD RULES(출력스키마) → SELF-VERIFICATION → E(Execute/request)
  // ──────────────────────────────────────────────────────────────
  buildChatGPT(selections, userRequest) {
    const parts = [];

    // [R] Role: "Act as..." 페르소나
    if (selections.persona) {
      parts.push(`${selections.persona.promptText.chatgpt}.`);
    }

    // [A] Action: "Your task is to..." + 단계 분해
    if (selections.useCase) {
      const taskBody = buildUseCaseTaskBody(
        selections.useCase.id,
        selections.useCase.promptText.chatgpt
      );
      parts.push(`Your task is to assist with ${taskBody}`);
    }

    // [CONSTRAINTS] 제약조건 블록
    if (selections.useCase) {
      const constraintBlock = buildConstraints('chatgpt', selections.useCase.id, userRequest);
      if (constraintBlock) parts.push(constraintBlock);
    }

    // [C] Context: 사고방식 (ChatGPT용 영어 지시어)
    if (selections.thinkingMode) {
      parts.push(selections.thinkingMode.promptText.chatgpt + '.');
    }

    // [HARD RULES] 출력 형식 강제 스키마 + 톤 + 언어
    const instrItems = buildOutputInstructions('chatgpt', selections);
    if (instrItems.length > 0) {
      const numbered = instrItems.map((inst, i) => `${i + 1}. ${inst}`).join('\n');
      parts.push(`Please follow these guidelines:\n${numbered}`);
    }

    // [SELF-VERIFICATION] 자체 검증 (thinkingMode 조건부)
    const verificationBlock = buildVerificationBlock(
      'chatgpt',
      selections.useCase ? selections.useCase.id : '',
      selections.thinkingMode ? selections.thinkingMode.id : null
    );
    if (verificationBlock) parts.push(verificationBlock);

    // [E] Execute: 사용자 실제 요청
    const requestContent = userRequest.trim()
      ? userRequest.trim()
      : '[여기에 구체적인 요청 내용을 입력하세요]';
    parts.push(`\n${requestContent}`);

    return parts.join('\n\n');
  },


  // ── Gemini 프롬프트 빌더 ─────────────────────────────────────
  // 전략: T-A-G 프레임워크 (한국어 자연어)
  //   T(Task+단계분해) → A(Action 제약조건) → G(Goal 사고방식)
  //   → 출력조건 → 자가검증 → 요청
  // Google 권장: 맥락 먼저, 조건 나중에, 자연어 직접 지시
  // ──────────────────────────────────────────────────────────────
  buildGemini(selections, userRequest) {
    const parts = [];

    // [T] Task: 페르소나 + 용도
    if (selections.persona) {
      parts.push(`${selections.persona.promptText.gemini}.`);
    }

    // [A] Action: 단계 분해 포함한 task
    if (selections.useCase) {
      const taskBody = buildUseCaseTaskBody(
        selections.useCase.id,
        selections.useCase.promptText.gemini
      );
      parts.push(`${taskBody}`);
    }

    // [제약조건] 한국어 자연어로 제약 명시
    if (selections.useCase) {
      const constraintBlock = buildConstraints('gemini', selections.useCase.id, userRequest);
      if (constraintBlock) parts.push(constraintBlock);
    }

    // [G] Goal: 사고방식 — 한국어 자연어 직접 지시
    if (selections.thinkingMode) {
      parts.push(selections.thinkingMode.promptText.gemini + '.');
    }

    // [출력조건] 형식 + 톤 + 언어 — 불릿 리스트
    const instrItems = buildOutputInstructions('gemini', selections);
    if (instrItems.length > 0) {
      const listed = instrItems.map(c => `- ${c}`).join('\n');
      parts.push(`다음 조건을 지켜주세요:\n${listed}`);
    }

    // [자가검증] thinkingMode 조건부
    const verificationBlock = buildVerificationBlock(
      'gemini',
      selections.useCase ? selections.useCase.id : '',
      selections.thinkingMode ? selections.thinkingMode.id : null
    );
    if (verificationBlock) parts.push(verificationBlock);

    // [요청] 사용자 실제 요청
    const requestContent = userRequest.trim()
      ? userRequest.trim()
      : '[여기에 구체적인 요청 내용을 입력하세요]';
    parts.push(`\n${requestContent}`);

    return parts.join('\n\n');
  },


  // ── 메인 generate() — 시그니처 변경 없음 ─────────────────────
  // input: selectedAI (string), selections (object), userRequest (string)
  // output: 완성된 프롬프트 문자열
  // events.js, state.js 수정 불필요
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
