// ============================================================
// 파일명: categories.js
// 역할: 6개 카테고리의 모든 옵션 데이터 정의
// 수정 시: 옵션 추가/수정/삭제 → 이 파일만 수정하면 됨
// 구조: 각 옵션에 { id, label, icon, description, promptText: {claude, chatgpt, gemini} }
// ============================================================

// ────────────────────────────────────────────────────────────────
// CATEGORIES_DATA: 앱 전체에서 사용하는 카테고리 데이터
// key = data-category 속성값과 일치해야 함
// ────────────────────────────────────────────────────────────────
const CATEGORIES_DATA = {

  // ──────────────────────────────────────────────────────────────
  // 01. 용도 / 목적 (useCase)
  // ──────────────────────────────────────────────────────────────
  useCase: {
    label: '용도 / 목적',
    icon:  '🎯',
    options: [
      {
        id: 'writing',
        label: '글쓰기',
        icon:  '✍️',
        description: '블로그, 기사, 보고서',
        promptText: {
          claude:  '글쓰기 및 콘텐츠 작성',
          chatgpt: 'writing and content creation',
          gemini:  '글쓰기 및 콘텐츠 작성',
        },
      },
      {
        id: 'coding',
        label: '코딩',
        icon:  '💻',
        description: '코드 작성, 리뷰, 디버깅',
        promptText: {
          claude:  '코드 작성 및 소프트웨어 개발',
          chatgpt: 'coding and software development',
          gemini:  '코드 작성 및 소프트웨어 개발',
        },
      },
      {
        id: 'analysis',
        label: '데이터 분석',
        icon:  '📊',
        description: '데이터 해석, 인사이트 도출',
        promptText: {
          claude:  '데이터 분석 및 인사이트 도출',
          chatgpt: 'data analysis and insight generation',
          gemini:  '데이터 분석 및 인사이트 도출',
        },
      },
      {
        id: 'creative',
        label: '창작',
        icon:  '🎨',
        description: '소설, 시, 스크립트',
        promptText: {
          claude:  '창의적 글쓰기 및 스토리텔링',
          chatgpt: 'creative writing and storytelling',
          gemini:  '창의적 글쓰기 및 스토리텔링',
        },
      },
      {
        id: 'translation',
        label: '번역',
        icon:  '🌐',
        description: '다국어 번역, 로컬라이징',
        promptText: {
          claude:  '번역 및 언어 현지화',
          chatgpt: 'translation and localization',
          gemini:  '번역 및 언어 현지화',
        },
      },
      {
        id: 'summarize',
        label: '요약',
        icon:  '📝',
        description: '문서, 기사 핵심 요약',
        promptText: {
          claude:  '핵심 내용 요약 및 정리',
          chatgpt: 'summarization and key point extraction',
          gemini:  '핵심 내용 요약 및 정리',
        },
      },
      {
        id: 'ideation',
        label: '아이디어',
        icon:  '💡',
        description: '브레인스토밍, 기획',
        promptText: {
          claude:  '아이디어 발굴 및 브레인스토밍',
          chatgpt: 'ideation and brainstorming',
          gemini:  '아이디어 발굴 및 브레인스토밍',
        },
      },
      {
        id: 'qa',
        label: '질의응답',
        icon:  '❓',
        description: '전문 지식 질문 및 설명',
        promptText: {
          claude:  '질문에 대한 상세한 전문적 답변',
          chatgpt: 'expert question answering and explanation',
          gemini:  '질문에 대한 상세한 전문적 답변',
        },
      },
      {
        id: 'planning',
        label: '기획/전략',
        icon:  '🗺️',
        description: '프로젝트 계획, 전략 수립',
        promptText: {
          claude:  '전략적 기획 및 로드맵 수립',
          chatgpt: 'strategic planning and roadmap creation',
          gemini:  '전략적 기획 및 로드맵 수립',
        },
      },
      {
        id: 'review',
        label: '검토/피드백',
        icon:  '🔍',
        description: '문서, 코드, 아이디어 검토',
        promptText: {
          claude:  '비판적 검토 및 개선 피드백 제공',
          chatgpt: 'critical review and constructive feedback',
          gemini:  '비판적 검토 및 개선 피드백 제공',
        },
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 02. 페르소나 / 역할 (persona)
  // ──────────────────────────────────────────────────────────────
  persona: {
    label: '페르소나 / 역할',
    icon:  '🎭',
    options: [
      {
        id: 'expert',
        label: '도메인 전문가',
        icon:  '🏆',
        description: '해당 분야 최고 권위자',
        promptText: {
          claude:  '당신은 해당 분야의 최고 전문가입니다',
          chatgpt: 'Act as a top-tier domain expert',
          gemini:  '해당 분야 최고 전문가로서 답변해주세요',
        },
      },
      {
        id: 'coach',
        label: '코치 / 멘토',
        icon:  '🎓',
        description: '성장을 돕는 조력자',
        promptText: {
          claude:  '당신은 경험이 풍부한 코치이자 멘토입니다',
          chatgpt: 'Act as a supportive coach and mentor',
          gemini:  '경험 풍부한 코치이자 멘토로서 답변해주세요',
        },
      },
      {
        id: 'analyst',
        label: '비즈니스 분석가',
        icon:  '📈',
        description: '데이터 기반 의사결정자',
        promptText: {
          claude:  '당신은 데이터 기반의 전략적 비즈니스 분석가입니다',
          chatgpt: 'Act as a strategic business analyst',
          gemini:  '데이터 기반 전략적 비즈니스 분석가로서 답변해주세요',
        },
      },
      {
        id: 'developer',
        label: '시니어 개발자',
        icon:  '👨‍💻',
        description: '10년+ 경력 소프트웨어 엔지니어',
        promptText: {
          claude:  '당신은 10년 이상 경력의 시니어 소프트웨어 엔지니어입니다',
          chatgpt: 'Act as a senior software engineer with 10+ years of experience',
          gemini:  '10년 이상 경력의 시니어 소프트웨어 엔지니어로서 답변해주세요',
        },
      },
      {
        id: 'writer',
        label: '전문 작가',
        icon:  '🖊️',
        description: '베스트셀러 작가 / 카피라이터',
        promptText: {
          claude:  '당신은 독자를 사로잡는 전문 작가이자 카피라이터입니다',
          chatgpt: 'Act as a professional writer and skilled copywriter',
          gemini:  '독자를 사로잡는 전문 작가로서 답변해주세요',
        },
      },
      {
        id: 'teacher',
        label: '교육자',
        icon:  '📚',
        description: '쉽고 명확하게 가르치는 선생님',
        promptText: {
          claude:  '당신은 복잡한 개념을 명확하게 설명하는 교육 전문가입니다',
          chatgpt: 'Act as an expert educator who explains complex concepts clearly',
          gemini:  '복잡한 개념을 쉽게 설명하는 교육 전문가로서 답변해주세요',
        },
      },
      {
        id: 'critic',
        label: '비평가',
        icon:  '⚖️',
        description: '객관적이고 날카로운 비평',
        promptText: {
          claude:  '당신은 건설적인 비평을 제공하는 전문 비평가입니다',
          chatgpt: 'Act as an objective and constructive critic',
          gemini:  '건설적이고 날카로운 전문 비평가로서 답변해주세요',
        },
      },
      {
        id: 'consultant',
        label: '전략 컨설턴트',
        icon:  '💼',
        description: 'McKinsey급 전략 컨설턴트',
        promptText: {
          claude:  '당신은 글로벌 전략 컨설팅 펌 출신의 전략 컨설턴트입니다',
          chatgpt: 'Act as a top-tier strategy consultant from a global consulting firm',
          gemini:  '글로벌 전략 컨설팅 전문가로서 답변해주세요',
        },
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 03. 사고 방식 (thinkingMode) — 핵심 차별화 카테고리
  // 출처: Anthropic/OpenAI/Google 공식 가이드 + 검증된 PE 기법
  // ──────────────────────────────────────────────────────────────
  thinkingMode: {
    label: '사고 방식',
    icon:  '🧠',
    options: [
      {
        id: 'cot',
        label: '단계별 사고',
        icon:  '🔗',
        description: 'Chain of Thought',
        promptText: {
          // Claude: <thinking> 태그로 감싸 사고 과정 명시
          claude:  '문제를 단계별로 분해하여 각 단계의 근거와 함께 체계적으로 사고해주세요',
          // ChatGPT: "Let's think step by step" 공식 기법
          chatgpt: "Let's think step by step. Break down the problem into clear stages, explaining your reasoning at each step",
          // Gemini: 한국어 자연어 직접 지시
          gemini:  '단계별로 나누어 각 단계의 근거와 함께 체계적으로 생각해주세요',
        },
      },
      {
        id: 'tot',
        label: '다중 경로 탐색',
        icon:  '🌳',
        description: 'Tree of Thoughts',
        promptText: {
          claude:  '3가지 이상의 다른 접근 경로를 동시에 탐색하고, 각 경로의 장단점을 비교한 후 최선의 방법을 선택해주세요',
          chatgpt: 'Explore at least 3 different solution paths simultaneously. Compare the pros and cons of each, then select the optimal approach',
          gemini:  '여러 가지 접근 방법을 동시에 탐색하고 각각의 장단점을 비교한 후 최선의 방법을 선택해주세요',
        },
      },
      {
        id: 'firstprinciples',
        label: '첫 원칙 사고',
        icon:  '🔬',
        description: 'First Principles',
        promptText: {
          claude:  '모든 당연하다고 생각하는 가정을 제거하고, 물리적·논리적 가장 기본 원칙부터 다시 구축하여 생각해주세요',
          chatgpt: 'Remove all assumptions and conventional wisdom. Rebuild your thinking from the most fundamental first principles, questioning everything',
          gemini:  '당연하게 여기는 모든 가정을 배제하고 가장 기본적인 원칙부터 다시 생각해주세요',
        },
      },
      {
        id: 'devils',
        label: '반론 우선 검토',
        icon:  '😈',
        description: "Devil's Advocate",
        promptText: {
          claude:  '먼저 제안이나 아이디어에 대한 가장 강력한 반론 3가지를 제시한 후, 그 반론들에 대한 대응 방안을 설명해주세요',
          chatgpt: "First, present the 3 strongest counterarguments against the idea. Then explain how to address each counterargument",
          gemini:  '먼저 가장 강력한 반론 3가지를 제시한 후 각 반론에 대한 대응 방안을 설명해주세요',
        },
      },
      {
        id: 'steelman',
        label: '최강 주장 구성',
        icon:  '🏆',
        description: 'Steelman 기법',
        promptText: {
          claude:  '상대방 관점의 가장 강력하고 설득력 있는 버전을 먼저 구성한 후, 그에 대한 공정한 응답을 제시해주세요',
          chatgpt: 'First construct the strongest possible version of the opposing view (steelman it), then provide a fair and thorough response',
          gemini:  '상대방 의견의 가장 강력한 버전을 먼저 구성하고 그에 대한 공정한 응답을 제시해주세요',
        },
      },
      {
        id: 'socratic',
        label: '소크라테스식 탐구',
        icon:  '❓',
        description: 'Socratic Method',
        promptText: {
          claude:  '소크라테스식 질문법으로 내가 가진 가정들을 하나씩 검증해주세요. 핵심 전제들에 질문을 던져 더 깊은 이해를 이끌어주세요',
          chatgpt: 'Use the Socratic method to question my underlying assumptions one by one. Guide me to deeper understanding through targeted questions',
          gemini:  '소크라테스식 방법으로 내 가정들을 질문으로 하나씩 검증하며 더 깊은 이해를 이끌어주세요',
        },
      },
      {
        id: 'selfconsistency',
        label: '자체 검증 반복',
        icon:  '✅',
        description: 'Self-Consistency',
        promptText: {
          claude:  '동일한 문제를 3가지 다른 방식으로 독립적으로 풀어보고, 가장 일관된 결론을 최종 답변으로 제시해주세요',
          chatgpt: 'Solve this problem in 3 different independent ways. Compare the results and present the most consistent conclusion as your final answer',
          gemini:  '같은 문제를 3가지 다른 방법으로 풀어보고 가장 일관된 답을 최종 답변으로 제시해주세요',
        },
      },
      {
        id: 'elon',
        label: '일론 머스크식',
        icon:  '🚀',
        description: '첫 원칙 + 10× 사고',
        promptText: {
          claude:  '물리 법칙과 논리적 필연성만 남기고 업계 관습·전통·"원래 그런 것"을 모두 제거하세요. 그 후 현재보다 10배 더 나은 해결책을 첫 원칙에서 구축해주세요',
          chatgpt: "Strip away industry conventions and 'the way things are done.' Keep only physical laws and logical necessities. Then build a solution 10x better from first principles",
          gemini:  '모든 관습을 제거하고 물리 법칙만 남긴 후 현재보다 10배 더 나은 해결책을 처음부터 구축해주세요',
        },
      },
      {
        id: 'feynman',
        label: '파인만 기법',
        icon:  '🧪',
        description: 'Feynman Technique',
        promptText: {
          claude:  '12살 아이에게 설명하듯 가장 단순한 언어로 설명해주세요. 전문 용어를 피하고, 핵심 개념을 명확하게 드러내되, 깊이 있는 이해를 담아주세요',
          chatgpt: 'Explain this as if teaching a 12-year-old. Use simple language, avoid jargon, but reveal the deep underlying concepts with clarity',
          gemini:  '12살 아이에게 설명하듯 가장 단순한 언어로 핵심 개념을 명확하고 깊이 있게 설명해주세요',
        },
      },
      {
        id: 'ultrathink',
        label: '울트라 씽킹',
        icon:  '🧠',
        description: 'Extended Thinking',
        promptText: {
          // Anthropic 공식 Extended Thinking 최적화
          claude:  '이 문제를 충분한 시간을 들여 모든 가능한 각도에서 깊이 검토해주세요. 표면적 답변이 아닌 진정한 통찰을 도출해주세요',
          chatgpt: 'Take your time to deeply examine this problem from every possible angle. Do not rush to surface-level answers — dig for genuine, non-obvious insights',
          gemini:  '충분한 시간을 들여 모든 각도에서 깊이 검토하여 표면적 답변이 아닌 진정한 통찰을 제공해주세요',
        },
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 04. 출력 형식 (outputFormat)
  // ──────────────────────────────────────────────────────────────
  outputFormat: {
    label: '출력 형식',
    icon:  '📄',
    options: [
      {
        id: 'markdown',
        label: '마크다운',
        icon:  '📋',
        description: '제목, 강조, 구조화',
        promptText: {
          claude:  '마크다운 형식으로 작성하되, 헤더(#, ##)와 **강조**, 목록을 적절히 활용해주세요',
          chatgpt: 'Format your response in Markdown with appropriate headers, bold emphasis, and lists',
          gemini:  '마크다운 형식으로 헤더와 강조를 활용하여 구조화하여 작성해주세요',
        },
      },
      {
        id: 'stepbystep',
        label: '단계별 가이드',
        icon:  '🔢',
        description: '번호 매긴 순서형',
        promptText: {
          claude:  'Step 1, Step 2, ... 형식으로 각 단계를 명확히 구분하여 순서대로 작성해주세요',
          chatgpt: 'Provide a numbered step-by-step guide with clear Step 1, Step 2, ... format',
          gemini:  '번호를 매겨 각 단계를 명확히 구분하여 단계별로 작성해주세요',
        },
      },
      {
        id: 'bulletlist',
        label: '글머리 리스트',
        icon:  '📌',
        description: '핵심 포인트를 리스트로',
        promptText: {
          claude:  '핵심 내용을 글머리 기호(•) 리스트로 간결하게 정리해주세요',
          chatgpt: 'Organize key points as concise bullet lists',
          gemini:  '핵심 내용을 글머리 기호 리스트로 간결하게 정리해주세요',
        },
      },
      {
        id: 'essay',
        label: '에세이',
        icon:  '📖',
        description: '서론-본론-결론 구조',
        promptText: {
          claude:  '서론, 본론, 결론의 에세이 구조로 작성해주세요',
          chatgpt: 'Write in essay format with a clear introduction, body, and conclusion',
          gemini:  '서론-본론-결론 구조의 에세이 형식으로 작성해주세요',
        },
      },
      {
        id: 'table',
        label: '표/비교표',
        icon:  '📊',
        description: '항목을 표 형태로 비교',
        promptText: {
          claude:  '마크다운 표(| 컬럼 | 컬럼 |) 형식으로 항목을 구조화하여 비교해주세요',
          chatgpt: 'Present information in a structured markdown table for easy comparison',
          gemini:  '표 형식으로 항목들을 구조화하여 비교 정리해주세요',
        },
      },
      {
        id: 'qa_format',
        label: 'Q&A 형식',
        icon:  '💬',
        description: '질문-답변 쌍으로 구성',
        promptText: {
          claude:  'Q: 와 A: 형식으로 질문-답변 쌍을 명확히 구분하여 작성해주세요',
          chatgpt: 'Structure as clear Q&A pairs with Q: and A: labels',
          gemini:  'Q&A 형식으로 질문과 답변을 명확히 구분하여 작성해주세요',
        },
      },
      {
        id: 'json',
        label: 'JSON 구조',
        icon:  '🔧',
        description: '개발자 친화적 JSON',
        promptText: {
          claude:  '결과를 유효한 JSON 형식으로 출력해주세요. 키 이름은 영문 camelCase를 사용해주세요',
          chatgpt: 'Output as valid JSON with descriptive camelCase keys',
          gemini:  '유효한 JSON 형식으로 결과를 출력해주세요',
        },
      },
      {
        id: 'tldr',
        label: 'TL;DR 요약',
        icon:  '⚡',
        description: '핵심만 3줄 이내로',
        promptText: {
          claude:  '먼저 TL;DR: 3줄 이내의 핵심 요약을 제시한 후, 상세 내용을 작성해주세요',
          chatgpt: 'Start with a TL;DR summary of 3 lines or less, then provide detailed content',
          gemini:  'TL;DR 요약(3줄 이내)을 먼저 제시하고 이후 상세 내용을 작성해주세요',
        },
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 05. 톤 / 스타일 (tone)
  // ──────────────────────────────────────────────────────────────
  tone: {
    label: '톤 / 스타일',
    icon:  '🎨',
    options: [
      {
        id: 'professional',
        label: '전문적',
        icon:  '👔',
        description: '격식체, 비즈니스 용어',
        promptText: {
          claude:  '전문적이고 격식 있는 톤으로 작성해주세요',
          chatgpt: 'Use a professional and formal tone throughout',
          gemini:  '전문적이고 격식 있는 어조로 작성해주세요',
        },
      },
      {
        id: 'friendly',
        label: '친근한',
        icon:  '😊',
        description: '대화체, 편안한 표현',
        promptText: {
          claude:  '친근하고 편안한 대화체 톤으로 작성해주세요',
          chatgpt: 'Use a friendly and conversational tone',
          gemini:  '친근하고 대화체로 편안한 어조로 작성해주세요',
        },
      },
      {
        id: 'concise',
        label: '간결한',
        icon:  '✂️',
        description: '핵심만, 군더더기 없이',
        promptText: {
          claude:  '불필요한 설명을 제거하고 핵심만 간결하게 작성해주세요',
          chatgpt: 'Be concise and to the point. Avoid unnecessary elaboration',
          gemini:  '군더더기 없이 핵심만 간결하게 작성해주세요',
        },
      },
      {
        id: 'detailed',
        label: '상세한',
        icon:  '🔬',
        description: '배경 설명, 예시 풍부',
        promptText: {
          claude:  '배경 설명, 구체적 예시, 관련 맥락을 충분히 포함하여 상세하게 작성해주세요',
          chatgpt: 'Provide detailed explanations with background context, specific examples, and related nuances',
          gemini:  '배경 설명과 구체적 예시를 충분히 포함하여 상세하게 작성해주세요',
        },
      },
      {
        id: 'creative',
        label: '창의적',
        icon:  '✨',
        description: '독창적 표현, 비유 활용',
        promptText: {
          claude:  '창의적인 비유와 독창적인 표현을 적극 활용하여 작성해주세요',
          chatgpt: 'Use creative metaphors and innovative expressions. Make it memorable and distinctive',
          gemini:  '창의적인 비유와 독창적인 표현을 활용하여 작성해주세요',
        },
      },
      {
        id: 'critical',
        label: '비판적 사고',
        icon:  '🤔',
        description: '다각도 분석, 반론 포함',
        promptText: {
          claude:  '비판적 시각으로 다양한 관점을 검토하고, 잠재적 약점과 반론도 포함하여 분석해주세요',
          chatgpt: 'Apply critical thinking, analyze from multiple perspectives, and include potential weaknesses and counterarguments',
          gemini:  '비판적 시각으로 다양한 관점을 검토하고 잠재적 약점도 포함하여 분석해주세요',
        },
      },
      {
        id: 'empathetic',
        label: '공감적',
        icon:  '❤️',
        description: '독자 입장에서 공감',
        promptText: {
          claude:  '독자의 감정과 입장에 공감하며 따뜻하고 지지하는 톤으로 작성해주세요',
          chatgpt: 'Write with genuine empathy, considering the reader\'s feelings and perspective with warmth',
          gemini:  '독자의 감정에 공감하며 따뜻하고 지지하는 어조로 작성해주세요',
        },
      },
      {
        id: 'humorous',
        label: '유머러스',
        icon:  '😄',
        description: '위트와 유머를 곁들여',
        promptText: {
          claude:  '적절한 유머와 위트를 활용하여 가볍고 재미있게 작성해주세요',
          chatgpt: 'Incorporate appropriate humor and wit to make the content engaging and enjoyable',
          gemini:  '유머와 위트를 적절히 활용하여 재미있게 작성해주세요',
        },
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 06. 언어 (language)
  // ──────────────────────────────────────────────────────────────
  language: {
    label: '언어',
    icon:  '🌍',
    options: [
      {
        id: 'korean',
        label: '한국어',
        icon:  '🇰🇷',
        description: '전체 한국어',
        promptText: {
          claude:  '모든 응답은 한국어로 작성해주세요',
          chatgpt: 'Respond entirely in Korean (한국어)',
          gemini:  '한국어로 응답해주세요',
        },
      },
      {
        id: 'english',
        label: 'English',
        icon:  '🇺🇸',
        description: '영어로 응답',
        promptText: {
          claude:  'Respond entirely in English',
          chatgpt: 'Respond entirely in English',
          gemini:  'Respond in English',
        },
      },
      {
        id: 'mixed',
        label: '한영 혼용',
        icon:  '🌐',
        description: '한국어 + 영문 전문용어',
        promptText: {
          claude:  '한국어로 작성하되, 전문 용어와 기술 용어는 영문을 병기해주세요 (예: 머신러닝(Machine Learning))',
          chatgpt: 'Write in Korean but include English technical terms in parentheses where appropriate',
          gemini:  '한국어로 작성하되 전문 용어는 영문을 함께 표기해주세요',
        },
      },
      {
        id: 'japanese',
        label: '日本語',
        icon:  '🇯🇵',
        description: '일본어로 응답',
        promptText: {
          claude:  'すべての回答を日本語で記述してください',
          chatgpt: 'Respond entirely in Japanese (日本語)',
          gemini:  '日本語で回答してください',
        },
      },
      {
        id: 'chinese',
        label: '中文',
        icon:  '🇨🇳',
        description: '중국어로 응답',
        promptText: {
          claude:  '请用中文（简体）回答所有问题',
          chatgpt: 'Respond entirely in Chinese (中文)',
          gemini:  '请用中文回答',
        },
      },
    ],
  },
};
