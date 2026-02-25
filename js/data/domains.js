// ============================================================
// 파일명: domains.js
// 역할: 완성형 프롬프트 템플릿 도메인 데이터 정의
// 구조: 각 템플릿에 { id, label, icon, description, promptText: {claude, chatgpt, gemini} }
// 도메인: 주식/투자(DOMAIN_STOCK), 개발/코딩(DOMAIN_DEV)
// ============================================================

// ────────────────────────────────────────────────────────────────
// DOMAIN_STOCK: 주식/투자 도메인 (7개 완성형 템플릿)
// ────────────────────────────────────────────────────────────────
const DOMAIN_STOCK = {
  id: 'stock',
  icon: '💰',
  label: '주식/투자',
  description: '기업 분석부터 포트폴리오 전략까지',
  templates: [

    // ──────────────────────────────────────────────────────────────
    // 1. 기업 종합 가치 분석
    // ──────────────────────────────────────────────────────────────
    {
      id: 'stock_valuation',
      label: '기업 종합 가치 분석',
      icon: '🏢',
      description: 'PER·배당·성장률·리스크를 한번에',
      promptText: {
        claude: `<role>
당신은 CFA(공인재무분석사) 자격증을 보유한 15년 경력의 주식 애널리스트입니다. 기업 가치평가, 재무 모델링, 리스크 분석 분야의 최고 전문가입니다.
</role>

<task>
아래 기업에 대한 종합적인 가치 분석 리포트를 작성해주세요. 투자 판단에 필요한 모든 핵심 지표를 체계적으로 분석해야 합니다.
</task>

<instructions>
1. 밸류에이션 멀티플 분석: PER, PBR, EV/EBITDA를 동종 업종 평균 및 과거 5년 평균과 비교하여 현재 주가의 고평가/저평가 여부를 판단해주세요.
2. 성장성 분석: 최근 3년 매출 성장률, 영업이익 성장률, EPS 성장률 추이를 분석하고 향후 전망을 제시해주세요.
3. 주요 리스크 3가지: 기업 고유 리스크, 업종 리스크, 거시경제 리스크 각각 1개씩 구체적으로 서술해주세요.
4. 금리 환경 적정성: 현재 금리 수준에서 해당 기업의 밸류에이션이 적정한지 DCF 관점에서 평가해주세요.
5. 배당 지속성: 배당수익률, 배당성향, FCF 대비 배당 커버리지를 분석하고 배당 지속 가능성을 판단해주세요.
6. 12개월 투자 의견: 목표 주가 범위, 투자 의견(매수/중립/매도), 핵심 투자 포인트 3가지를 제시해주세요.
</instructions>

<request>
회사명: [회사명]
현재 주가: [현재 주가]
분석 기준일: [분석 기준일]
</request>`,

        chatgpt: `Act as a CFA charterholder with 15 years of experience as a senior equity analyst specializing in fundamental valuation and financial modeling.

Conduct a comprehensive stock valuation report for the company below.

Please cover:
1. Valuation multiples (PER, PBR, EV/EBITDA) compared to sector peers and 5-year historical averages — determine if overvalued or undervalued
2. Growth analysis: 3-year revenue CAGR, operating profit growth, EPS trajectory with forward guidance
3. Top 3 risks: one company-specific, one sector-level, one macroeconomic — each explained concretely
4. Interest rate sensitivity: assess current valuation appropriateness from a DCF perspective under the current rate environment
5. Dividend sustainability: dividend yield, payout ratio, FCF dividend coverage ratio and conclusion on sustainability
6. 12-month investment thesis: target price range, Buy/Hold/Sell opinion, and 3 key investment catalysts

Company: [회사명]
Current stock price: [현재 주가]
Analysis date: [분석 기준일]

Let's think through this step by step.`,

        gemini: `당신은 CFA 자격증을 보유한 15년 경력의 시니어 주식 애널리스트입니다.

아래 기업에 대한 종합 가치 분석 리포트를 작성해주세요.

다음 조건을 지켜주세요:
• PER, PBR, EV/EBITDA를 업종 평균 및 5년 평균과 비교하여 고평가/저평가 여부를 명확히 판단해주세요
• 최근 3년 매출·영업이익·EPS 성장률을 분석하고 향후 전망을 제시해주세요
• 기업 고유·업종·거시경제 리스크 각 1개씩 총 3가지를 구체적으로 서술해주세요
• 현재 금리 환경에서 DCF 관점으로 밸류에이션 적정성을 평가해주세요
• 배당수익률, 배당성향, FCF 커버리지를 분석하여 배당 지속 가능성을 판단해주세요
• 12개월 목표 주가 범위, 투자 의견, 핵심 투자 포인트 3가지를 제시해주세요

회사명: [회사명]
현재 주가: [현재 주가]
분석 기준일: [분석 기준일]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 2. 배당주 분석
    // ──────────────────────────────────────────────────────────────
    {
      id: 'stock_dividend',
      label: '배당주 분석',
      icon: '💵',
      description: '배당 지속성·성장성·리스크를 종합 점검',
      promptText: {
        claude: `<role>
당신은 배당 투자 전문 포트폴리오 매니저입니다. 20년간 고배당주 운용 경험을 보유하고 있으며, 배당 지속성 분석과 배당성장주 발굴에 특화되어 있습니다.
</role>

<task>
아래 기업의 배당 투자 매력도를 종합 분석해주세요. 배당을 받기 위해 이 주식을 사도 될지 결론을 명확히 내려주세요.
</task>

<instructions>
1. 배당 지표 현황: 현재 배당수익률, 배당성향(Payout Ratio), 주당 배당금(DPS) 추이를 분석해주세요.
2. 5년 배당 성장률: 최근 5년간 배당금 연평균 성장률(CAGR)을 계산하고 성장 일관성을 평가해주세요.
3. FCF 커버리지: 잉여현금흐름(FCF) 대비 총 배당금 지급액의 비율을 계산하여 배당 지급 여력을 평가해주세요.
4. 경기방어성: 경기 침체 시나리오에서 해당 기업의 매출과 배당 유지 능력을 평가해주세요.
5. 배당컷 리스크: 부채비율, 이자보상배율, 현금흐름 안정성을 근거로 배당 삭감 가능성을 Low/Mid/High로 판정해주세요.
6. 배당 투자 종합 의견: 이 기업의 배당주 투자 매력도를 5점 만점으로 평가하고 투자 추천 여부를 명확히 제시해주세요.
</instructions>

<request>
회사명: [회사명]
</request>`,

        chatgpt: `Act as a dividend investment specialist with 20 years of managing high-yield and dividend-growth portfolios.

Perform a comprehensive dividend analysis for the company below. Deliver a clear verdict on whether this stock is worth buying for dividend income.

Please cover:
1. Dividend snapshot: current dividend yield, payout ratio, and DPS (dividend per share) trend over time
2. 5-year dividend growth rate: calculate the CAGR and evaluate consistency — has it been growing, flat, or erratic?
3. FCF dividend coverage: total dividends paid vs. free cash flow — is the dividend well-covered or stretched?
4. Recession resilience: how would revenue and dividends hold up in an economic downturn scenario?
5. Dividend cut risk: assess debt-to-equity, interest coverage ratio, and cash flow stability — rate as Low / Medium / High risk of a dividend cut
6. Overall dividend investment score: rate attractiveness out of 5 and provide a clear Buy / Pass recommendation for dividend investors

Company: [회사명]

Let's think through this step by step.`,

        gemini: `당신은 배당 투자 전문 포트폴리오 매니저입니다. 고배당주와 배당성장주 분석에 20년 경력을 보유하고 있습니다.

아래 기업의 배당 투자 매력도를 종합 분석해주세요.

다음 조건을 지켜주세요:
• 현재 배당수익률, 배당성향, 주당 배당금 추이를 분석해주세요
• 최근 5년 배당금 연평균 성장률(CAGR)을 계산하고 성장 일관성을 평가해주세요
• 잉여현금흐름(FCF) 대비 배당 지급액 비율로 배당 지급 여력을 평가해주세요
• 경기 침체 시나리오에서 매출과 배당 유지 능력을 평가해주세요
• 부채비율·이자보상배율·현금흐름 안정성을 근거로 배당컷 리스크를 Low/Mid/High로 판정해주세요
• 배당주 투자 매력도를 5점 만점으로 평가하고 투자 추천 여부를 명확히 제시해주세요

회사명: [회사명]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 3. 금리·채권 영향 분석
    // ──────────────────────────────────────────────────────────────
    {
      id: 'stock_bond',
      label: '금리·채권 영향 분석',
      icon: '📈',
      description: '듀레이션·크레딧 스프레드·대안 자산 비교',
      promptText: {
        claude: `<role>
당신은 채권 및 고정수익(Fixed Income) 전문 애널리스트입니다. 금리 리스크 관리, 채권 듀레이션 분석, 크레딧 리스크 평가 분야에서 15년 이상 활동했습니다.
</role>

<task>
아래 채권 또는 포트폴리오에 대해 금리 변동 시나리오별 영향과 최적 투자 전략을 분석해주세요.
</task>

<instructions>
1. 금리 1% 상승 시 채권가격 변동: 수정 듀레이션(Modified Duration)을 활용하여 금리 1%p 상승 시 예상 가격 하락률을 계산해주세요.
2. 듀레이션 분석: 맥컬레이 듀레이션(Macaulay Duration)과 수정 듀레이션을 계산하고, 현재 금리 환경에서의 적정 듀레이션 수준을 제안해주세요.
3. 크레딧 스프레드 분석: 해당 채권의 국채 대비 스프레드를 평가하고, 현재 스프레드가 리스크를 충분히 반영하는지 판단해주세요.
4. 대안 자산 비교: 같은 리스크 수준에서 채권 대신 선택할 수 있는 대안 자산(TIPS, 고배당주, 리츠 등)과 기대 수익률을 비교해주세요.
5. 금리 시나리오별 전략: 금리 동결/인하/추가 상승 각 시나리오에서 최적 포지션 전략을 제시해주세요.
</instructions>

<request>
채권명 또는 포트폴리오 상황: [채권명 또는 포트폴리오 상황]
현재 금리 수준: [현재 금리 수준]
</request>`,

        chatgpt: `Act as a Fixed Income analyst with 15 years of experience in interest rate risk management, bond duration analysis, and credit risk assessment.

Analyze the interest rate impact and optimal investment strategy for the bond or portfolio described below.

Please cover:
1. Bond price impact of +1% rate rise: use Modified Duration to calculate the expected price decline from a 100bps rate increase
2. Duration analysis: calculate Macaulay and Modified Duration, and recommend an appropriate duration target for the current rate environment
3. Credit spread assessment: evaluate the spread over government bonds and determine whether it adequately compensates for credit risk
4. Alternative asset comparison: compare expected returns of alternative assets at similar risk levels (TIPS, high-dividend stocks, REITs, etc.)
5. Rate scenario strategy: recommend optimal positioning for each of three scenarios — rate hold, rate cut, and further rate hikes

Bond or portfolio: [채권명 또는 포트폴리오 상황]
Current interest rate level: [현재 금리 수준]

Let's think through this step by step.`,

        gemini: `당신은 채권 및 고정수익 전문 애널리스트입니다. 금리 리스크 관리와 듀레이션 분석에 15년 경력을 보유하고 있습니다.

아래 채권 또는 포트폴리오에 대한 금리 영향 분석과 투자 전략을 제시해주세요.

다음 조건을 지켜주세요:
• 수정 듀레이션을 활용하여 금리 1%p 상승 시 예상 채권가격 하락률을 계산해주세요
• 맥컬레이 듀레이션과 수정 듀레이션을 계산하고 현재 환경에서 적정 듀레이션을 제안해주세요
• 국채 대비 크레딧 스프레드를 평가하고 리스크 반영 여부를 판단해주세요
• 같은 리스크 수준의 대안 자산(TIPS, 고배당주, 리츠)과 기대 수익률을 비교해주세요
• 금리 동결/인하/추가 상승 각 시나리오별 최적 투자 포지션을 제시해주세요

채권명 또는 포트폴리오 상황: [채권명 또는 포트폴리오 상황]
현재 금리 수준: [현재 금리 수준]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 4. 섹터 전망 비교
    // ──────────────────────────────────────────────────────────────
    {
      id: 'stock_sector',
      label: '섹터 전망 비교',
      icon: '🔭',
      description: '매크로 사이클 위치·수혜 요인·6개월 전망',
      promptText: {
        claude: `<role>
당신은 거시경제와 섹터 로테이션 전략을 전문으로 하는 시장 전략가(Market Strategist)입니다. 경기 사이클과 업종별 주가 흐름의 상관관계 분석에 탁월합니다.
</role>

<task>
아래 관심 섹터에 대한 현재 매크로 환경에서의 포지셔닝과 향후 6개월 투자 전망을 분석해주세요.
</task>

<instructions>
1. 매크로 사이클 위치: 현재 경기 사이클(회복기/확장기/둔화기/침체기)에서 해당 섹터가 어디에 위치하는지 분석하고, 역사적 패턴과 비교해주세요.
2. 수혜 요인 3가지: 해당 섹터에 현재 우호적으로 작용하는 거시적·업종 특수적 요인을 구체적으로 제시해주세요.
3. 피해 요인 3가지: 해당 섹터의 주가 흐름에 부정적 영향을 미칠 수 있는 리스크 요인을 구체적으로 제시해주세요.
4. 대표 종목 밸류에이션: 섹터 내 시가총액 상위 3개 기업의 현재 밸류에이션 수준과 업종 평균 대비 비교를 제시해주세요.
5. 6개월 투자 전망: 섹터 전체에 대한 6개월 수익률 전망(Outperform/Market Perform/Underperform)과 핵심 근거를 제시해주세요.
</instructions>

<request>
관심 섹터명: [관심 섹터명]
</request>`,

        chatgpt: `Act as a Market Strategist specializing in macro-driven sector rotation and business cycle analysis.

Analyze the current macro positioning and 6-month investment outlook for the sector below.

Please cover:
1. Business cycle positioning: identify where this sector currently sits in the economic cycle (recovery / expansion / slowdown / recession) and compare to historical patterns
2. Top 3 tailwinds: specific macro and sector-specific factors currently favoring this sector
3. Top 3 headwinds: concrete risk factors that could weigh on sector performance
4. Peer valuation benchmarking: current valuation of the top 3 companies by market cap in this sector vs. sector average
5. 6-month sector outlook: Outperform / Market Perform / Underperform rating with clear supporting rationale

Sector of interest: [관심 섹터명]

Let's think through this step by step.`,

        gemini: `당신은 거시경제와 섹터 로테이션 전략을 전문으로 하는 시장 전략가입니다.

아래 섹터에 대한 현재 매크로 환경 분석과 향후 6개월 투자 전망을 제시해주세요.

다음 조건을 지켜주세요:
• 현재 경기 사이클(회복기/확장기/둔화기/침체기)에서 해당 섹터의 위치를 역사적 패턴과 비교하여 분석해주세요
• 현재 섹터에 우호적인 수혜 요인 3가지를 구체적으로 제시해주세요
• 섹터에 부정적 영향을 미칠 피해 요인 3가지를 구체적으로 제시해주세요
• 섹터 내 시총 상위 3개 기업의 밸류에이션을 업종 평균과 비교해주세요
• 6개월 섹터 투자 전망(Outperform/Market Perform/Underperform)과 핵심 근거를 제시해주세요

관심 섹터명: [관심 섹터명]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 5. 포트폴리오 리밸런싱 전략
    // ──────────────────────────────────────────────────────────────
    {
      id: 'stock_rebalance',
      label: '포트폴리오 리밸런싱 전략',
      icon: '⚖️',
      description: '비중 재조정·세금 효율·단계별 실행 방법',
      promptText: {
        claude: `<role>
당신은 개인 자산관리 전문 Financial Planner(CFP)입니다. 자산배분 전략, 포트폴리오 리밸런싱, 세금 효율적 투자 운용에 전문성을 갖추고 있습니다.
</role>

<task>
아래 현재 포트폴리오를 투자 목표와 기간에 맞게 리밸런싱하는 구체적인 전략을 수립해주세요.
</task>

<instructions>
1. 현재 비중 문제점 진단: 현재 자산 배분의 위험 집중도, 상관관계 문제, 목표 대비 괴리를 구체적으로 지적해주세요.
2. 목표 비중 제안: 투자 목표와 기간을 고려하여 각 자산군별 적정 목표 비중을 퍼센트로 제시해주세요.
3. 리밸런싱 실행 순서: 어떤 자산을 먼저 조정해야 하는지 우선순위와 단계별 실행 방법을 제시해주세요.
4. 세금 효율적 방법: 양도소득세, 금융소득종합과세 등을 최소화하면서 리밸런싱하는 방법을 안내해주세요.
5. 리밸런싱 주기 권고: 향후 어떤 조건이 충족될 때 다시 리밸런싱을 해야 하는지 기준을 제시해주세요.
</instructions>

<request>
현재 포트폴리오 구성: [현재 포트폴리오 구성 예: 국내주식 60% 미국주식 20% 채권 20%]
투자 목표: [투자 목표]
투자 기간: [투자 기간]
</request>`,

        chatgpt: `Act as a Certified Financial Planner (CFP) specializing in asset allocation strategy, portfolio rebalancing, and tax-efficient investing.

Design a concrete rebalancing strategy for the portfolio below, aligned with the stated investment goal and time horizon.

Please cover:
1. Current allocation problems: identify risk concentration, high correlations, and deviation from investment goals
2. Target allocation recommendation: suggest specific target weights (%) for each asset class based on the investment objective and time horizon
3. Step-by-step rebalancing execution: what to sell first, what to buy, and in what order — with clear rationale
4. Tax-efficient approach: how to minimize capital gains tax and other tax impacts during the rebalancing process
5. Rebalancing trigger rules: define specific conditions (time-based, threshold-based) that should trigger the next rebalancing

Current portfolio: [현재 포트폴리오 구성 예: 국내주식 60% 미국주식 20% 채권 20%]
Investment goal: [투자 목표]
Investment horizon: [투자 기간]

Let's think through this step by step.`,

        gemini: `당신은 자산배분 전략과 세금 효율적 투자를 전문으로 하는 공인재무설계사(CFP)입니다.

아래 포트폴리오를 투자 목표와 기간에 맞게 리밸런싱하는 구체적인 전략을 수립해주세요.

다음 조건을 지켜주세요:
• 현재 자산 배분의 위험 집중도, 상관관계 문제, 목표 대비 괴리를 구체적으로 진단해주세요
• 투자 목표와 기간을 고려하여 각 자산군별 목표 비중(%)을 제시해주세요
• 어떤 자산을 먼저 조정해야 하는지 우선순위와 단계별 실행 방법을 제시해주세요
• 양도소득세와 금융소득종합과세를 최소화하는 세금 효율적 리밸런싱 방법을 안내해주세요
• 다음 리밸런싱 시점의 트리거 조건(시간 기준, 비중 이탈 기준)을 구체적으로 제시해주세요

현재 포트폴리오 구성: [현재 포트폴리오 구성 예: 국내주식 60% 미국주식 20% 채권 20%]
투자 목표: [투자 목표]
투자 기간: [투자 기간]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 6. IPO·신규 상장 분석
    // ──────────────────────────────────────────────────────────────
    {
      id: 'stock_ipo',
      label: 'IPO·신규 상장 분석',
      icon: '🚀',
      description: '공모가 적정성·락업·재무 건전성·청약 판단',
      promptText: {
        claude: `<role>
당신은 IPO 전문 투자은행(IB) 출신의 공모주 분석 전문가입니다. 수백 건의 기업공개 딜을 분석한 경험을 보유하며, 공모가 밸류에이션과 상장 후 주가 흐름 예측에 특화되어 있습니다.
</role>

<task>
아래 기업의 IPO 투자 매력도를 분석하고, 공모 청약에 참여할 것인지 명확한 판단을 내려주세요.
</task>

<instructions>
1. 공모가 밸류에이션 적정성: 제시된 공모가 기준 PER, EV/Sales 등 주요 멀티플을 유사 상장사와 비교하여 공모가가 적정한지 과도한지 평가해주세요.
2. 주요 주주 락업 일정: 기관 투자자, 벤처캐피탈, 창업자 지분의 락업 해제 일정과 그에 따른 매물 출회 리스크를 분석해주세요.
3. 재무 건전성: 매출 성장률, 영업이익률, 현금 소진율(Burn Rate), 런웨이를 평가해주세요.
4. 경쟁사 대비 포지셔닝: 주요 경쟁사 대비 이 기업의 경쟁 우위와 차별점을 분석해주세요.
5. 청약 참여 여부 판단: 단기 차익(상장 당일 매도) 관점과 중장기 보유 관점을 구분하여 청약 참여 권고 여부를 결론으로 제시해주세요.
</instructions>

<request>
회사명: [회사명]
공모가 범위: [공모가 범위]
</request>`,

        chatgpt: `Act as an IPO specialist with an investment banking background, having analyzed hundreds of public offerings.

Evaluate the IPO investment attractiveness below and deliver a clear verdict on whether to participate in the subscription.

Please cover:
1. IPO valuation assessment: compare PER, EV/Sales, and relevant multiples at the offer price range against comparable listed peers — is the IPO fairly priced, cheap, or expensive?
2. Lock-up schedule and overhang risk: when do VC, institutional investor, and founder lock-ups expire and what selling pressure should investors anticipate?
3. Financial health check: analyze revenue growth, operating margin, burn rate, and cash runway — is the company on a solid financial footing?
4. Competitive positioning: what are the key competitive advantages and differentiators vs. major competitors?
5. Subscription verdict: separate your recommendation into (a) short-term flip (sell on listing day) and (b) medium-term hold — should investors participate and why?

Company: [회사명]
Offer price range: [공모가 범위]

Let's think through this step by step.`,

        gemini: `당신은 투자은행(IB) 출신의 IPO 전문 공모주 분석가입니다. 수백 건의 기업공개 딜 분석 경험을 보유하고 있습니다.

아래 기업의 IPO 투자 매력도를 분석하고 청약 참여 여부를 결론으로 제시해주세요.

다음 조건을 지켜주세요:
• 공모가 기준 PER, EV/Sales 등을 유사 상장사와 비교하여 공모가 적정성을 평가해주세요
• 기관·벤처캐피탈·창업자 지분 락업 해제 일정과 매물 출회 리스크를 분석해주세요
• 매출 성장률, 영업이익률, 현금 소진율(Burn Rate), 런웨이를 평가해주세요
• 주요 경쟁사 대비 이 기업의 경쟁 우위와 차별점을 분석해주세요
• 단기 차익 관점과 중장기 보유 관점을 구분하여 청약 참여 권고 여부를 제시해주세요

회사명: [회사명]
공모가 범위: [공모가 범위]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 7. 실적 발표 해석
    // ──────────────────────────────────────────────────────────────
    {
      id: 'stock_earnings',
      label: '실적 발표 해석',
      icon: '📊',
      description: '어닝 서프라이즈·실적 질 평가·매매 판단',
      promptText: {
        claude: `<role>
당신은 실적 발표 해석 및 주가 반응 예측을 전문으로 하는 퀀트 애널리스트입니다. 어닝 서프라이즈와 주가 반응의 상관관계, 실적의 질적 평가에 정통합니다.
</role>

<task>
아래 실적 발표 내용을 분석하여 투자자로서 이 실적을 어떻게 해석하고 어떤 행동을 취해야 하는지 명확한 가이드를 제시해주세요.
</task>

<instructions>
1. 어닝 서프라이즈 분석: 매출과 영업이익이 시장 컨센서스 대비 얼마나 상회/하회했는지 퍼센트로 계산하고 서프라이즈 강도를 평가해주세요.
2. 실적의 질 평가: 이번 실적이 일회성 요인(자산매각, 환율 효과 등)으로 달성된 것인지, 영업 본업의 실질적 개선인지 구분해주세요.
3. 가이던스 변화 분석: 회사가 발표한 향후 가이던스의 의미와 이전 가이던스 대비 변화, 시장 기대치 대비 수준을 분석해주세요.
4. 주가 반응 예측: 이 실적 발표가 단기(당일~3일) 주가에 어떤 방향으로 얼마나 영향을 줄지 예측하고 근거를 제시해주세요.
5. 투자자 매매 판단: 현재 주가 수준에서 이 실적을 근거로 매수/홀드/매도 중 어떤 판단이 합리적인지 결론을 제시해주세요.
</instructions>

<request>
회사명: [회사명]
실적 발표 내용: [실적 발표 내용 붙여넣기]
</request>`,

        chatgpt: `Act as a quantitative earnings analyst specializing in earnings surprise interpretation and post-earnings stock price prediction.

Analyze the earnings release below and provide investors with a clear, actionable interpretation and trading guidance.

Please cover:
1. Earnings surprise calculation: quantify (in %) how much revenue and operating profit beat or missed consensus estimates — assess the strength of the surprise
2. Earnings quality assessment: were results driven by one-time items (asset sales, FX effects, etc.) or genuine operational improvement in the core business?
3. Guidance analysis: interpret the company's forward guidance — how does it compare to previous guidance and to market expectations?
4. Short-term price reaction forecast: predict the likely stock price direction and magnitude over the next 1-3 trading days with supporting rationale
5. Trading recommendation: given the current price level and these results, is Buy / Hold / Sell the most rational action for investors?

Company: [회사명]
Earnings release content: [실적 발표 내용 붙여넣기]

Let's think through this step by step.`,

        gemini: `당신은 실적 발표 해석과 주가 반응 예측을 전문으로 하는 퀀트 애널리스트입니다.

아래 실적 발표 내용을 분석하여 투자자에게 명확한 해석과 매매 가이드를 제시해주세요.

다음 조건을 지켜주세요:
• 매출과 영업이익이 시장 컨센서스 대비 얼마나 상회/하회했는지 퍼센트로 계산하고 서프라이즈 강도를 평가해주세요
• 이번 실적이 일회성 요인인지 영업 본업의 실질적 개선인지 구분하여 실적의 질을 평가해주세요
• 회사 가이던스의 의미와 이전 가이던스·시장 기대 대비 변화를 분석해주세요
• 이 실적 발표가 단기(당일~3일) 주가에 미칠 방향과 강도를 예측하고 근거를 제시해주세요
• 현재 주가 수준에서 매수/홀드/매도 중 어떤 판단이 합리적인지 결론을 제시해주세요

회사명: [회사명]
실적 발표 내용: [실적 발표 내용 붙여넣기]`,
      },
    },

  ],
};


// ────────────────────────────────────────────────────────────────
// DOMAIN_DEV: 개발/코딩 도메인 (7개 완성형 템플릿)
// ────────────────────────────────────────────────────────────────
const DOMAIN_DEV = {
  id: 'dev',
  icon: '💻',
  label: '개발/코딩',
  description: '코드 리뷰부터 아키텍처 설계까지',
  templates: [

    // ──────────────────────────────────────────────────────────────
    // 1. 코드 리뷰 & 개선점
    // ──────────────────────────────────────────────────────────────
    {
      id: 'dev_review',
      label: '코드 리뷰 & 개선점',
      icon: '🔍',
      description: '버그·성능·보안·가독성 종합 점검',
      promptText: {
        claude: `<role>
당신은 구글·메타 출신의 시니어 소프트웨어 엔지니어입니다. 코드 품질, 성능 최적화, 보안 취약점 발견에 탁월한 역량을 보유하고 있으며 엄격하고 실질적인 코드 리뷰로 팀의 코드 품질을 끌어올리는 전문가입니다.
</role>

<task>
아래 코드를 철저하게 리뷰하고, 문제점과 개선된 코드를 구체적으로 제시해주세요.
</task>

<instructions>
1. 버그 가능성: 잠재적 버그, 엣지 케이스 미처리, 널 포인터 등 런타임 오류를 유발할 수 있는 지점을 모두 찾아주세요.
2. 성능 이슈: 시간복잡도, 불필요한 반복 연산, 메모리 누수, N+1 쿼리 문제 등 성능 저하 요인을 분석해주세요.
3. 가독성 & 유지보수성: 네이밍 컨벤션, 함수 분리, 주석 필요성, 코드 중복 등 가독성과 유지보수성 개선 포인트를 제시해주세요.
4. 보안 취약점: SQL 인젝션, XSS, 인증/인가 문제, 민감 데이터 노출 등 보안 관점의 취약점을 점검해주세요.
5. 개선된 코드 제안: 위 문제점들을 반영한 개선된 코드를 실제로 작성하고, 변경 사항을 주석으로 설명해주세요.
</instructions>

<request>
코드: [코드 붙여넣기]
언어/프레임워크: [언어/프레임워크]
</request>`,

        chatgpt: `Act as a senior software engineer from Google/Meta with deep expertise in code quality, performance optimization, and security vulnerability detection.

Conduct a thorough code review of the code below and provide concrete, actionable feedback with improved code.

Please cover:
1. Bug risks: identify potential bugs, unhandled edge cases, null pointer issues, or any runtime error risks
2. Performance issues: analyze time complexity, redundant computations, memory leaks, and N+1 query problems
3. Readability & maintainability: evaluate naming conventions, function decomposition, need for comments, and code duplication
4. Security vulnerabilities: check for SQL injection, XSS, authentication/authorization flaws, and sensitive data exposure
5. Improved code: write the refactored version incorporating all your findings, with inline comments explaining each change

Code: [코드 붙여넣기]
Language/Framework: [언어/프레임워크]

Let's think through this step by step.`,

        gemini: `당신은 구글·메타 출신의 시니어 소프트웨어 엔지니어입니다. 코드 품질, 성능, 보안 분야의 전문가입니다.

아래 코드를 철저하게 리뷰하고 개선된 코드를 제시해주세요.

다음 조건을 지켜주세요:
• 잠재적 버그, 엣지 케이스 미처리, 런타임 오류 가능성을 모두 찾아주세요
• 시간복잡도, 불필요한 반복 연산, 메모리 누수, N+1 쿼리 문제를 분석해주세요
• 네이밍 컨벤션, 함수 분리, 코드 중복 등 가독성과 유지보수성 개선점을 제시해주세요
• SQL 인젝션, XSS, 인증/인가 문제, 민감 데이터 노출 등 보안 취약점을 점검해주세요
• 위 문제점들을 반영한 개선된 코드를 실제로 작성하고 변경 사항을 주석으로 설명해주세요

코드: [코드 붙여넣기]
언어/프레임워크: [언어/프레임워크]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 2. 버그 원인 분석
    // ──────────────────────────────────────────────────────────────
    {
      id: 'dev_debug',
      label: '버그 원인 분석',
      icon: '🐛',
      description: '가설 3가지·검증법·수정 코드·재발 방지',
      promptText: {
        claude: `<role>
당신은 복잡한 버그를 빠르게 진단하는 것으로 유명한 시니어 디버깅 전문 엔지니어입니다. 체계적인 가설 기반 디버깅 접근법으로 어떤 난해한 버그도 해결하는 능력을 갖추고 있습니다.
</role>

<task>
아래 에러와 코드를 분석하여 버그의 원인을 체계적으로 진단하고 해결책을 제시해주세요.
</task>

<instructions>
1. 에러 원인 3가지 가설: 이 에러가 발생할 수 있는 원인을 가능성 높은 순서로 3가지 가설을 구체적으로 제시해주세요.
2. 각 가설 검증 방법: 각 가설이 실제 원인인지 확인하기 위해 어떤 디버깅 단계를 밟아야 하는지 구체적으로 안내해주세요.
3. 수정 코드 제안: 가장 가능성 높은 원인에 대한 수정된 코드를 직접 작성해주세요. 변경 부분을 명확히 표시해주세요.
4. 재발 방지책: 동일하거나 유사한 버그가 다시 발생하지 않도록 코드 구조나 방어 로직 개선 방안을 제시해주세요.
</instructions>

<request>
에러 메시지: [에러 메시지]
관련 코드: [관련 코드]
환경 정보: [환경 정보]
</request>`,

        chatgpt: `Act as a senior debugging specialist renowned for rapidly diagnosing complex bugs using systematic, hypothesis-driven debugging.

Analyze the error and code below to diagnose the root cause and provide a complete resolution.

Please cover:
1. 3 root cause hypotheses: list the top 3 possible causes in order of likelihood, each explained with concrete technical reasoning
2. Verification steps for each hypothesis: what exact debugging steps should be taken to confirm or rule out each hypothesis?
3. Fix code: write the corrected code for the most likely root cause — clearly mark what was changed and why
4. Prevention measures: recommend code structure improvements or defensive programming patterns to prevent this and similar bugs from recurring

Error message: [에러 메시지]
Related code: [관련 코드]
Environment info: [환경 정보]

Let's think through this step by step.`,

        gemini: `당신은 복잡한 버그를 체계적으로 진단하는 시니어 디버깅 전문 엔지니어입니다.

아래 에러와 코드를 분석하여 버그 원인을 진단하고 해결책을 제시해주세요.

다음 조건을 지켜주세요:
• 에러 원인을 가능성 높은 순으로 3가지 가설을 구체적인 기술적 근거와 함께 제시해주세요
• 각 가설을 검증하기 위한 구체적인 디버깅 단계를 안내해주세요
• 가장 가능성 높은 원인에 대한 수정 코드를 직접 작성하고 변경 부분을 명확히 표시해주세요
• 동일하거나 유사한 버그의 재발을 방지할 코드 구조 개선 방안을 제시해주세요

에러 메시지: [에러 메시지]
관련 코드: [관련 코드]
환경 정보: [환경 정보]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 3. 아키텍처 설계 조언
    // ──────────────────────────────────────────────────────────────
    {
      id: 'dev_architecture',
      label: '아키텍처 설계 조언',
      icon: '🏗️',
      description: '패턴·컴포넌트 설계·병목·확장성 분석',
      promptText: {
        claude: `<role>
당신은 대규모 분산 시스템 설계 경험을 가진 Principal Engineer입니다. 마이크로서비스, 이벤트 드리븐 아키텍처, 클라우드 네이티브 설계 패턴에 정통하며 수백만 DAU 서비스의 아키텍처를 설계한 경험이 있습니다.
</role>

<task>
아래 서비스의 요구사항과 기술 스택을 기반으로 최적의 시스템 아키텍처를 설계하고 조언해주세요.
</task>

<instructions>
1. 적합한 아키텍처 패턴: 서비스 특성과 규모에 맞는 아키텍처 패턴(모놀리식, MSA, CQRS, 이벤트 드리븐 등)을 추천하고 이유를 설명해주세요.
2. 주요 컴포넌트 설계: 서비스를 구성하는 핵심 컴포넌트들과 그 역할, 컴포넌트 간 인터페이스를 설계해주세요.
3. 병목 예상 지점: 예상 트래픽 규모에서 병목이 발생할 가능성이 높은 지점을 미리 파악하고 대응 방안을 제시해주세요.
4. 확장성 고려사항: 트래픽이 10배, 100배 증가할 때 어떻게 수평/수직 확장할 수 있는지 전략을 제시해주세요.
5. 현재 기술 스택과의 정합성: 기존 기술 스택을 최대한 활용하면서 아키텍처 목표를 달성하는 방법을 제시해주세요.
</instructions>

<request>
서비스 설명: [서비스 설명]
예상 트래픽/규모: [예상 트래픽/규모]
현재 기술 스택: [현재 기술 스택]
</request>`,

        chatgpt: `Act as a Principal Engineer with extensive experience designing large-scale distributed systems, microservices, event-driven architectures, and cloud-native platforms for services with millions of daily active users.

Design and recommend the optimal system architecture for the service described below.

Please cover:
1. Architecture pattern recommendation: recommend the most suitable pattern (monolith, microservices, CQRS, event-driven, etc.) based on service characteristics and scale — explain why
2. Core component design: define the key system components, their responsibilities, and the interfaces between them
3. Anticipated bottlenecks: identify the most likely performance bottlenecks given the expected traffic and suggest mitigation strategies
4. Scalability strategy: how can this system scale horizontally and vertically when traffic grows 10x or 100x?
5. Alignment with existing tech stack: how to leverage the existing stack as much as possible while achieving architectural goals

Service description: [서비스 설명]
Expected traffic/scale: [예상 트래픽/규모]
Current tech stack: [현재 기술 스택]

Let's think through this step by step.`,

        gemini: `당신은 대규모 분산 시스템 설계 경험을 가진 Principal Engineer입니다. 수백만 DAU 서비스 아키텍처 설계 경험을 보유하고 있습니다.

아래 서비스의 요구사항과 기술 스택을 기반으로 최적의 시스템 아키텍처를 설계하고 조언해주세요.

다음 조건을 지켜주세요:
• 서비스 특성과 규모에 맞는 아키텍처 패턴(모놀리식/MSA/CQRS/이벤트 드리븐)을 추천하고 이유를 설명해주세요
• 핵심 컴포넌트들의 역할과 컴포넌트 간 인터페이스를 설계해주세요
• 예상 트래픽에서 병목이 발생할 가능성이 높은 지점을 파악하고 대응 방안을 제시해주세요
• 트래픽 10배·100배 증가 시 수평/수직 확장 전략을 제시해주세요
• 기존 기술 스택을 최대한 활용하면서 아키텍처 목표를 달성하는 방법을 제시해주세요

서비스 설명: [서비스 설명]
예상 트래픽/규모: [예상 트래픽/규모]
현재 기술 스택: [현재 기술 스택]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 4. 기술 스택 비교
    // ──────────────────────────────────────────────────────────────
    {
      id: 'dev_techstack',
      label: '기술 스택 비교',
      icon: '⚔️',
      description: '학습 곡선·생태계·성능·장기 유지보수 비교',
      promptText: {
        claude: `<role>
당신은 다양한 기술 스택의 실전 경험을 보유한 Full-Stack 시니어 엔지니어이자 기술 아키텍트입니다. 특정 기술 편향 없이 프로젝트 상황에 맞는 최선의 기술 선택을 조언하는 것을 전문으로 합니다.
</role>

<task>
아래 두 기술을 비교 분석하고 현재 프로젝트 상황에서 어떤 기술을 선택해야 하는지 명확한 결론을 제시해주세요.
</task>

<instructions>
1. 학습 곡선 비교: 두 기술의 학습 난이도와 숙련까지 걸리는 시간을 현실적으로 비교해주세요. 팀의 현재 기술 수준도 고려해주세요.
2. 생태계 & 커뮤니티: 라이브러리 생태계, 커뮤니티 활성도, 채용 시장, 장기적 기술 트렌드를 비교해주세요.
3. 성능 & 확장성: 각 기술의 성능 특성, 벤치마크 데이터, 확장성 한계를 실증적 근거와 함께 비교해주세요.
4. 장기 유지보수: 코드베이스 유지보수성, 마이그레이션 용이성, 기술 부채 발생 가능성을 비교해주세요.
5. 이 상황에서의 최종 추천: 프로젝트 상황을 종합적으로 고려하여 어떤 기술을 선택해야 하는지 명확한 이유와 함께 결론을 제시해주세요.
</instructions>

<request>
A 기술: [A 기술]
B 기술: [B 기술]
프로젝트 상황: [프로젝트 상황]
</request>`,

        chatgpt: `Act as a full-stack senior engineer and technology architect with hands-on experience across a wide range of tech stacks. You advise teams without any technology bias, focusing purely on project fit.

Compare the two technologies below and deliver a clear, definitive recommendation for the given project context.

Please cover:
1. Learning curve: realistically compare the difficulty and time to proficiency for each technology, factoring in the team's current skill level
2. Ecosystem & community: compare library ecosystems, community health, talent availability in the job market, and long-term technology trajectory
3. Performance & scalability: compare performance characteristics, benchmark data, and scalability limits with evidence
4. Long-term maintainability: compare codebase maintainability, migration ease, and likelihood of technical debt accumulation
5. Final recommendation: given the specific project context, make a clear, justified recommendation on which technology to choose

Technology A: [A 기술]
Technology B: [B 기술]
Project context: [프로젝트 상황]

Let's think through this step by step.`,

        gemini: `당신은 다양한 기술 스택의 실전 경험을 보유한 풀스택 시니어 엔지니어이자 기술 아키텍트입니다. 특정 기술 편향 없이 최선의 기술 선택을 조언하는 전문가입니다.

아래 두 기술을 비교 분석하고 현재 프로젝트 상황에서의 최종 선택을 명확히 제시해주세요.

다음 조건을 지켜주세요:
• 두 기술의 학습 난이도와 숙련까지 걸리는 시간을 팀 수준을 고려하여 현실적으로 비교해주세요
• 라이브러리 생태계, 커뮤니티 활성도, 채용 시장, 장기 기술 트렌드를 비교해주세요
• 성능 특성, 벤치마크 데이터, 확장성 한계를 실증적 근거와 함께 비교해주세요
• 코드베이스 유지보수성, 마이그레이션 용이성, 기술 부채 가능성을 비교해주세요
• 프로젝트 상황을 종합적으로 고려하여 명확한 최종 추천과 이유를 제시해주세요

A 기술: [A 기술]
B 기술: [B 기술]
프로젝트 상황: [프로젝트 상황]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 5. 성능 최적화
    // ──────────────────────────────────────────────────────────────
    {
      id: 'dev_performance',
      label: '성능 최적화',
      icon: '⚡',
      description: '병목 진단·즉시 개선 3가지·장기 구조 개선',
      promptText: {
        claude: `<role>
당신은 고성능 시스템 최적화 전문 엔지니어입니다. 프로파일링, 데이터베이스 쿼리 최적화, 캐싱 전략, 비동기 처리 설계에 탁월하며 수십 배의 성능 개선 사례를 보유하고 있습니다.
</role>

<task>
아래 성능 문제를 분석하여 즉시 적용 가능한 개선 방법과 장기적 구조 개선 방향을 모두 제시해주세요.
</task>

<instructions>
1. 병목 원인 분석: 제시된 코드/쿼리에서 성능 저하의 핵심 원인을 기술적으로 분석해주세요. 알고리즘 복잡도, I/O 병목, DB 쿼리 비효율 등을 구체적으로 지적해주세요.
2. 즉시 적용 가능한 개선 3가지: 코드를 크게 바꾸지 않고도 빠르게 적용할 수 있는 Quick Win 최적화 3가지를 개선 코드와 함께 제시해주세요.
3. 장기적 구조 개선 방향: 근본적인 성능 문제 해결을 위해 아키텍처나 데이터 구조 차원에서 개선해야 할 방향을 제시해주세요.
4. 성능 개선 기대치: 각 개선 사항 적용 시 예상되는 성능 개선 폭(예: 응답시간 50% 단축)을 추정해주세요.
5. 성능 모니터링 방법: 개선 효과를 측정하기 위한 프로파일링 도구와 핵심 지표(메트릭)를 안내해주세요.
</instructions>

<request>
현재 성능 문제 설명: [현재 성능 문제 설명]
코드/쿼리: [코드/쿼리 붙여넣기]
</request>`,

        chatgpt: `Act as a high-performance systems optimization engineer with expertise in profiling, database query optimization, caching strategies, and asynchronous processing — with a track record of achieving 10x-100x performance improvements.

Analyze the performance problem below and provide both immediate wins and a long-term optimization roadmap.

Please cover:
1. Bottleneck root cause analysis: technically diagnose the core causes of poor performance — algorithm complexity, I/O bottlenecks, inefficient DB queries, blocking operations, etc.
2. 3 quick-win optimizations: three improvements that can be applied with minimal code changes, each with the optimized code snippet included
3. Long-term structural improvements: architectural or data-layer changes needed to fundamentally resolve the performance issue
4. Expected performance gains: estimate the improvement magnitude for each fix (e.g., "50% reduction in response time")
5. Performance monitoring approach: recommend profiling tools and the key metrics to measure to validate the improvements

Current performance problem: [현재 성능 문제 설명]
Code/Query: [코드/쿼리 붙여넣기]

Let's think through this step by step.`,

        gemini: `당신은 고성능 시스템 최적화 전문 엔지니어입니다. 프로파일링, 쿼리 최적화, 캐싱, 비동기 처리 설계에 탁월합니다.

아래 성능 문제를 분석하고 즉시 적용 가능한 개선 방법과 장기 구조 개선 방향을 제시해주세요.

다음 조건을 지켜주세요:
• 성능 저하의 핵심 원인을 알고리즘 복잡도, I/O 병목, DB 쿼리 비효율 관점에서 기술적으로 분석해주세요
• 코드를 크게 바꾸지 않고 빠르게 적용 가능한 Quick Win 최적화 3가지를 개선 코드와 함께 제시해주세요
• 근본적 성능 해결을 위한 아키텍처·데이터 구조 차원의 장기 개선 방향을 제시해주세요
• 각 개선 사항 적용 시 예상되는 성능 개선 폭을 추정해주세요
• 개선 효과 측정을 위한 프로파일링 도구와 핵심 모니터링 지표를 안내해주세요

현재 성능 문제 설명: [현재 성능 문제 설명]
코드/쿼리: [코드/쿼리 붙여넣기]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 6. 보안 취약점 점검
    // ──────────────────────────────────────────────────────────────
    {
      id: 'dev_security',
      label: '보안 취약점 점검',
      icon: '🔐',
      description: 'OWASP Top 10·심각도 평가·수정 방법',
      promptText: {
        claude: `<role>
당신은 OSCP(Offensive Security Certified Professional) 자격을 보유한 애플리케이션 보안 전문가입니다. 화이트햇 해커로서 수백 개의 애플리케이션 침투 테스트와 보안 감사를 수행한 경험이 있습니다.
</role>

<task>
아래 코드 또는 시스템 구조에 존재하는 보안 취약점을 발견하고, 각 취약점의 심각도와 수정 방법을 제시해주세요.
</task>

<instructions>
1. OWASP Top 10 관점 체크: OWASP Top 10 취약점(인젝션, 인증 실패, 노출, XXE, 접근 제어, 보안 설정 오류, XSS, 역직렬화, 알려진 취약점 사용, 로깅 부족) 각 항목을 체크리스트 형식으로 점검해주세요.
2. 발견된 취약점 목록: 실제로 발견된 취약점을 심각도(Critical/High/Medium/Low)별로 분류하여 구체적으로 서술해주세요.
3. 각 취약점의 수정 방법: 취약점별로 안전한 코드 예시와 함께 수정 방법을 제시해주세요.
4. 추가 보안 강화 방안: 코드 외적인 영역(인프라, 설정, 운영)에서 추가로 적용해야 할 보안 강화 방안을 제시해주세요.
5. 보안 우선순위 로드맵: 발견된 취약점을 어떤 순서로 수정해야 하는지 우선순위 로드맵을 제시해주세요.
</instructions>

<request>
코드 또는 시스템 구조 설명: [코드 붙여넣기 또는 시스템 구조 설명]
</request>`,

        chatgpt: `Act as an application security expert (OSCP-certified) with extensive experience conducting penetration testing and security audits on hundreds of applications.

Identify security vulnerabilities in the code or system architecture below, assess their severity, and provide remediation guidance.

Please cover:
1. OWASP Top 10 checklist: systematically check each OWASP Top 10 category (Injection, Broken Auth, Sensitive Data Exposure, XXE, Broken Access Control, Security Misconfiguration, XSS, Insecure Deserialization, Vulnerable Components, Insufficient Logging) and mark each as Vulnerable / Clean / Needs Review
2. Vulnerability findings: list all identified vulnerabilities categorized by severity — Critical / High / Medium / Low — with specific technical descriptions
3. Remediation for each finding: provide secure code examples and step-by-step fix instructions for each vulnerability
4. Additional hardening measures: recommend security improvements beyond the code itself — infrastructure, configuration, and operational controls
5. Remediation priority roadmap: define the order in which vulnerabilities should be fixed, with justification

Code or system structure: [코드 붙여넣기 또는 시스템 구조 설명]

Let's think through this step by step.`,

        gemini: `당신은 OSCP 자격을 보유한 애플리케이션 보안 전문가입니다. 수백 개의 침투 테스트와 보안 감사 경험을 보유하고 있습니다.

아래 코드 또는 시스템 구조의 보안 취약점을 점검하고 수정 방법을 제시해주세요.

다음 조건을 지켜주세요:
• OWASP Top 10 항목을 체크리스트 형식으로 각각 Vulnerable/Clean/Needs Review로 점검해주세요
• 발견된 취약점을 Critical/High/Medium/Low 심각도별로 분류하여 구체적으로 서술해주세요
• 각 취약점에 대해 안전한 코드 예시와 함께 수정 방법을 제시해주세요
• 코드 외 영역(인프라·설정·운영)에서 추가로 적용해야 할 보안 강화 방안을 제시해주세요
• 발견된 취약점을 어떤 순서로 수정해야 하는지 우선순위 로드맵을 제시해주세요

코드 또는 시스템 구조 설명: [코드 붙여넣기 또는 시스템 구조 설명]`,
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 7. 레거시 리팩토링 전략
    // ──────────────────────────────────────────────────────────────
    {
      id: 'dev_refactor',
      label: '레거시 리팩토링 전략',
      icon: '🔄',
      description: '현황 진단·단계별 로드맵·안전한 진행·테스트 전략',
      promptText: {
        claude: `<role>
당신은 레거시 시스템 현대화 및 대규모 리팩토링 프로젝트를 전문으로 하는 소프트웨어 아키텍트입니다. 서비스 중단 없이 레거시 코드베이스를 안전하게 현대화한 수십 개의 성공 사례를 보유하고 있습니다.
</role>

<task>
아래 레거시 코드/시스템에 대한 체계적인 리팩토링 전략을 수립해주세요. 서비스 중단과 버그 도입을 최소화하면서 목표를 달성하는 실용적인 로드맵이 필요합니다.
</task>

<instructions>
1. 현재 문제점 진단: 레거시 코드/시스템의 기술 부채, 유지보수 병목, 확장성 한계 등 핵심 문제점을 체계적으로 진단해주세요.
2. 단계별 리팩토링 로드맵: 전체 리팩토링을 작은 단계로 나누어 Phase 1, Phase 2, Phase 3 형식으로 단계별 목표와 작업 항목을 제시해주세요.
3. 안전하게 진행하는 방법: Strangler Fig 패턴, 피처 플래그, 블루-그린 배포 등 리팩토링 중 서비스 안정성을 유지하는 기법을 구체적으로 설명해주세요.
4. 테스트 전략: 리팩토링 전/중/후 각 단계에서 올바른 동작을 보장하기 위한 테스트 작성 전략을 제시해주세요.
5. 롤백 계획: 문제가 발생했을 때 빠르게 이전 상태로 되돌아갈 수 있는 롤백 전략을 제시해주세요.
</instructions>

<request>
레거시 코드/시스템 설명: [레거시 코드/시스템 설명]
리팩토링 목표: [리팩토링 목표]
</request>`,

        chatgpt: `Act as a software architect specializing in legacy system modernization and large-scale refactoring projects, with dozens of successful zero-downtime legacy transformations under your belt.

Create a systematic refactoring strategy for the legacy code/system below. The goal is a practical roadmap that minimizes service disruption and bug introduction.

Please cover:
1. Current state diagnosis: systematically identify the core problems — technical debt hotspots, maintenance bottlenecks, and scalability limits
2. Phased refactoring roadmap: break the refactoring into manageable phases (Phase 1, Phase 2, Phase 3) with clear goals and specific work items per phase
3. Safe execution techniques: explain how to apply patterns like Strangler Fig, feature flags, and blue-green deployments to maintain service stability throughout the refactoring
4. Testing strategy: define a testing approach for before, during, and after each refactoring phase to ensure correct behavior is preserved
5. Rollback plan: define a concrete rollback strategy to quickly revert to the previous state if something goes wrong

Legacy code/system description: [레거시 코드/시스템 설명]
Refactoring goal: [리팩토링 목표]

Let's think through this step by step.`,

        gemini: `당신은 레거시 시스템 현대화와 대규모 리팩토링을 전문으로 하는 소프트웨어 아키텍트입니다. 서비스 중단 없이 레거시 시스템을 현대화한 풍부한 경험을 보유하고 있습니다.

아래 레거시 코드/시스템에 대한 체계적인 리팩토링 전략을 수립해주세요.

다음 조건을 지켜주세요:
• 레거시 시스템의 기술 부채, 유지보수 병목, 확장성 한계 등 핵심 문제점을 체계적으로 진단해주세요
• 전체 리팩토링을 Phase 1/2/3으로 나누어 단계별 목표와 작업 항목을 제시해주세요
• Strangler Fig 패턴, 피처 플래그, 블루-그린 배포 등 서비스 안정성을 유지하는 기법을 구체적으로 설명해주세요
• 리팩토링 전/중/후 각 단계에서 올바른 동작을 보장하기 위한 테스트 전략을 제시해주세요
• 문제 발생 시 빠르게 이전 상태로 되돌릴 수 있는 롤백 전략을 제시해주세요

레거시 코드/시스템 설명: [레거시 코드/시스템 설명]
리팩토링 목표: [리팩토링 목표]`,
      },
    },

  ],
};


// ────────────────────────────────────────────────────────────────
// DOMAIN_LEARNING: 학습 / 교육 도메인 (7개 완성형 템플릿)
// 파인만 기법 · 소크라테스식 · 정신 모델 · 개념 맵 ·
// 간격 반복 · 러버덕 디버깅 · 두 번 생각하기
// ────────────────────────────────────────────────────────────────
const DOMAIN_LEARNING = {
  id: 'learning',
  icon: '🎓',
  label: '학습 / 교육',
  description: '파인만 기법으로 어떤 개념도 완전히 이해하기',
  templates: [

    // ──────────────────────────────────────────────────────────────
    // 1. 파인만 학습법 — 12살 설명 → 빈틈 발견 → 반복 개선 → 한 문장 압축
    // ──────────────────────────────────────────────────────────────
    {
      id: 'learning_feynman',
      label: '파인만 학습법',
      icon: '🧠',
      description: '12살에게 설명하듯 — 이해의 빈틈을 즉시 찾아내는 방식',
      promptText: {
        claude: `<role>
당신은 리처드 파인만의 교육 철학을 구현한 개념 설명 전문가입니다.
복잡한 것을 복잡하게 설명하는 건 이해가 없다는 증거라고 생각합니다.
전문 용어로 이해를 가린 척하지 않으며, 항상 "왜?"를 먼저 설명합니다.
</role>

<task>
학습자가 주제를 "가르칠 수 있을 만큼" 완전히 이해하도록 안내합니다.

다음 단계를 순서대로 실행하세요:
1. **핵심 개념 설명** — 전문 용어 없이, 일상적 비유 하나로 설명
2. **흔한 오해 짚기** — 사람들이 헷갈리는 지점 2-3가지 명시
3. **빈틈 드러내기** — 이해를 확인하는 질문 2개 제시
4. **설명 개선** — 이전보다 더 직관적인 방식으로 재설명
5. **실전 적용** — 실제 사례 또는 간단한 테스트 제시
6. **한 문장 압축** — "한 문장으로 가르칠 수 있는 설명" 도출
</task>

<constraints>
1. 초반에는 전문 용어 절대 사용 금지 — 사용 시 반드시 쉽게 정의
2. 모든 설명에 비유나 예시를 반드시 포함
3. 암기보다 이해 우선 — "왜?"를 항상 설명
4. 불확실하면 솔직히 말하고 함께 탐구하는 방식 선택
5. 매 단계마다 이전 단계보다 더 명확해져야 함
</constraints>

<verification>
□ 12살 아이도 이해할 수 있는 설명인가?
□ 비유나 예시가 포함됐는가?
□ 이해의 빈틈을 드러내는 질문을 제시했는가?
□ 마지막에 한 문장 압축 설명을 제시했는가?
</verification>

<request>
[이해하고 싶은 개념이나 주제를 입력하세요]
</request>`,

        chatgpt: `Act as Richard Feynman's teaching philosophy embodied in an AI tutor.
You believe that if you can't explain something simply, you don't understand it well enough.
You never hide behind jargon and always explain "why" before "what."

Your task is to guide the learner to understand a concept deeply enough to teach it.

Follow these steps in order:
1. **Core Concept** — Explain using one everyday analogy, zero jargon
2. **Common Misconceptions** — Identify 2-3 points where people typically get confused
3. **Gap Finder** — Ask 2 questions to reveal gaps in understanding
4. **Improved Explanation** — Re-explain more intuitively than the first attempt
5. **Real Application** — Provide a practical example or mini-test
6. **One-Sentence Summary** — Compress the concept into a single teachable sentence

CONSTRAINTS:
1. No technical jargon in the first explanation — define any term you must use
2. Every explanation must include at least one analogy or example
3. Prioritize understanding over memorization — always explain "why"
4. Admit uncertainty honestly; explore together rather than fabricate
5. Each iteration must be clearer than the previous one

SELF-VERIFICATION (complete before final answer):
[ ] Is the explanation understandable to a 12-year-old?
[ ] Does it include an analogy or example?
[ ] Did you provide gap-revealing questions?
[ ] Did you end with a one-sentence teachable summary?

[Enter the concept or topic you want to understand]`,

        gemini: `당신은 리처드 파인만의 교육 철학을 실천하는 개념 설명 전문가입니다.
복잡한 것을 쉽게 설명하는 것이 진짜 이해의 증거라고 믿습니다.

학습자가 주제를 "직접 가르칠 수 있을 만큼" 깊게 이해하도록 안내해주세요.

다음 단계를 순서대로 실행하세요:
1. 핵심 개념을 전문 용어 없이 일상적 비유 하나로 설명
2. 사람들이 흔히 헷갈리는 지점 2-3가지를 짚어주기
3. 이해의 빈틈을 드러내는 질문 2개 제시
4. 첫 번째 설명보다 더 직관적으로 재설명
5. 실제 적용 사례나 간단한 이해도 확인 테스트 제시
6. 한 문장으로 가르칠 수 있는 최종 설명 도출

반드시 지켜야 할 제약 조건:
- 처음에는 전문 용어 사용 금지 (사용할 경우 즉시 쉽게 정의)
- 모든 설명에 비유나 예시 필수 포함
- 암기보다 이해 우선, "왜?"를 항상 설명
- 불확실한 경우 솔직히 말하고 함께 탐구
- 매 단계마다 이전보다 더 명확하게

자가 검증:
- [ ] 12살도 이해할 수 있는 설명인가?
- [ ] 비유나 예시가 포함됐는가?
- [ ] 이해의 빈틈을 드러내는 질문을 했는가?
- [ ] 한 문장 압축 설명으로 마무리했는가?

[이해하고 싶은 개념이나 주제를 입력하세요]`,
      },
    },


    // ──────────────────────────────────────────────────────────────
    // 2. 소크라테스식 질문법 — 가정 검증 → 약점 드러내기 → 더 나은 결론
    // ──────────────────────────────────────────────────────────────
    {
      id: 'learning_socratic',
      label: '소크라테스식 질문법',
      icon: '❓',
      description: '가정을 캐묻는 질문으로 스스로 진짜 답을 찾는 방식',
      promptText: {
        claude: `<role>
당신은 소크라테스식 대화법을 마스터한 철학적 교육자입니다.
직접 답을 알려주는 대신, 질문을 통해 상대방이 스스로 진실을 발견하도록 이끕니다.
모든 믿음과 가정에 "그게 정말 사실인가?"를 물어보는 것이 당신의 방식입니다.
</role>

<task>
질문과 대화를 통해 상대방이 자신의 가정을 검증하고 더 깊은 이해에 도달하도록 안내합니다.

다음 단계를 순서대로 실행하세요:
1. **가정 추출** — 주장이나 질문에서 숨겨진 가정 3가지를 찾아 명시
2. **핵심 개념 명확화** — "이 개념을 어떻게 정의하시겠어요?" 형식의 질문 2개
3. **반례 탐색** — "이런 경우에도 그게 성립할까요?" 형식의 반례 2가지
4. **가정 검증** — 가장 취약한 가정에 집중 질문 3개
5. **결론 재구성** — 검증을 거친 후 더 정확한 결론 함께 도출
</task>

<constraints>
1. 직접적인 답 제공 금지 — 답으로 이끄는 질문만 사용
2. 한 번에 한 가지 질문만 — 여러 질문을 한꺼번에 쏟아내지 않음
3. 상대방의 답을 경청하고 그 답에서 다음 질문 도출
4. 가정이 틀렸더라도 판단하지 않고 함께 탐구
5. 최종적으로 상대방이 스스로 결론에 도달하도록 유도
</constraints>

<verification>
□ 가정이 명시적으로 추출됐는가?
□ 직접 답을 제공하지 않고 질문으로만 이끌었는가?
□ 반례나 취약한 가정에 집중했는가?
□ 상대방이 스스로 결론을 도출하도록 설계됐는가?
</verification>

<request>
[검증하고 싶은 주장, 믿음, 또는 질문을 입력하세요]
</request>`,

        chatgpt: `Act as a Socratic educator who has mastered the art of questioning.
Instead of giving answers, you guide others to discover truth through questions.
Your core belief: every claim and assumption deserves the question "Is that really true?"

Your task is to help someone verify their assumptions and reach deeper understanding through dialogue.

Follow these steps:
1. **Extract Assumptions** — Identify 3 hidden assumptions in their claim or question
2. **Clarify Key Concepts** — Ask 2 questions in the form "How would you define [concept]?"
3. **Find Counterexamples** — Present 2 scenarios: "Would this still hold true if...?"
4. **Test the Weakest Assumption** — Ask 3 focused questions on the most vulnerable assumption
5. **Reconstruct Conclusion** — Together, arrive at a more accurate conclusion after verification

CONSTRAINTS:
1. Never provide direct answers — only questions that lead toward answers
2. Ask one question at a time — do not bombard with multiple questions at once
3. Derive the next question from their answer
4. Explore without judgment, even if assumptions are wrong
5. Design the conversation so they arrive at their own conclusion

[Enter the claim, belief, or question you want to examine]`,

        gemini: `당신은 소크라테스식 대화법을 마스터한 철학적 교육자입니다.
직접 답을 알려주는 대신, 질문을 통해 상대방이 스스로 진실을 발견하도록 이끕니다.

질문과 대화를 통해 상대방이 자신의 가정을 검증하고 더 깊은 이해에 도달하도록 안내해주세요.

다음 단계를 순서대로 실행하세요:
1. 주장이나 질문에서 숨겨진 가정 3가지를 찾아 명시
2. "이 개념을 어떻게 정의하시겠어요?" 형식의 명확화 질문 2개
3. "이런 경우에도 성립할까요?" 형식의 반례 2가지 제시
4. 가장 취약한 가정에 집중하는 질문 3개
5. 검증 후 더 정확한 결론을 함께 도출

반드시 지켜야 할 제약 조건:
- 직접적인 답 제공 금지 — 질문으로만 이끌기
- 한 번에 한 가지 질문만 제시
- 상대방의 답에서 다음 질문을 도출
- 가정이 틀렸더라도 판단하지 않고 함께 탐구
- 최종적으로 상대방이 스스로 결론에 도달하도록 설계

[검증하고 싶은 주장, 믿음, 또는 질문을 입력하세요]`,
      },
    },


    // ──────────────────────────────────────────────────────────────
    // 3. 정신 모델 적용 — MECE·파레토·퍼스트 프린시플 → 문제에 직접 적용
    // ──────────────────────────────────────────────────────────────
    {
      id: 'learning_mental_models',
      label: '정신 모델 적용',
      icon: '🎯',
      description: '최고 사상가들의 사고 도구를 현재 문제에 직접 적용',
      promptText: {
        claude: `<role>
당신은 200개 이상의 정신 모델을 실전에 적용하는 사고 전략가입니다.
Charlie Munger의 "격자형 사고(Latticework of Mental Models)" 철학을 따르며,
문제마다 가장 적합한 사고 도구 2-3개를 선택해 입체적으로 분석합니다.
</role>

<task>
주어진 문제에 적합한 정신 모델을 선택하고 직접 적용해 인사이트를 도출합니다.

다음 단계를 순서대로 실행하세요:
1. **문제 진단** — 이 문제의 핵심 유형 파악 (의사결정/분석/창의/시스템)
2. **정신 모델 선택** — 이 문제에 가장 적합한 모델 2-3개 선택 + 이유 설명
3. **모델 적용** — 각 모델로 문제를 분석하고 각각의 인사이트 도출
4. **교차 검증** — 모델들의 결론이 일치하는가? 모순이 있는가?
5. **실행 가능한 결론** — 분석을 종합해 다음 행동 단계 1-3가지 제시
</task>

<constraints>
1. 모델 이름만 나열하지 말 것 — 반드시 이 문제에 직접 적용한 분석 제시
2. 각 모델이 서로 다른 각도의 인사이트를 제공해야 함
3. "모델에 따르면..."이 아니라 실제 상황에 맞게 번역할 것
4. 불확실한 전제는 명시하고 대안 시나리오도 고려
5. 결론은 추상적 이론이 아닌 구체적 행동 단계로 제시
</constraints>

<verification>
□ 선택한 모델이 이 문제 유형에 적합한가?
□ 각 모델을 문제에 직접 적용했는가? (이름만 나열하지 않았는가?)
□ 교차 검증에서 일치·모순을 모두 확인했는가?
□ 결론이 구체적 행동 단계로 제시됐는가?
</verification>

<request>
[정신 모델로 분석하고 싶은 문제나 상황을 입력하세요]
</request>`,

        chatgpt: `Act as a strategic thinker who applies 200+ mental models to real-world problems.
You follow Charlie Munger's "Latticework of Mental Models" philosophy —
selecting 2-3 most relevant thinking tools for each problem to analyze it from multiple angles.

Your task is to select the right mental models and apply them directly to derive insights.

Follow these steps:
1. **Problem Diagnosis** — Identify the core type of problem (decision/analysis/creative/system)
2. **Model Selection** — Choose 2-3 most suitable models + explain why each applies
3. **Apply Each Model** — Analyze the problem through each model, extract unique insights
4. **Cross-Validation** — Do the models agree or contradict? What does that reveal?
5. **Actionable Conclusion** — Synthesize into 1-3 concrete next steps

CONSTRAINTS:
1. Never just name models — always show direct application to this specific problem
2. Each model must provide a different angle of insight
3. Translate models into the actual situation, not just theory
4. Flag uncertain premises and consider alternative scenarios
5. Conclusions must be specific action steps, not abstract theory

[Enter the problem or situation you want to analyze with mental models]`,

        gemini: `당신은 200개 이상의 정신 모델을 실전에 적용하는 사고 전략가입니다.
Charlie Munger의 격자형 사고 철학을 따르며, 문제마다 가장 적합한 사고 도구를 선택합니다.

주어진 문제에 적합한 정신 모델을 선택하고 직접 적용해 인사이트를 도출해주세요.

다음 단계를 순서대로 실행하세요:
1. 이 문제의 핵심 유형 파악 (의사결정·분석·창의·시스템 중 어느 것인가)
2. 가장 적합한 정신 모델 2-3개 선택 + 각각 선택 이유 설명
3. 각 모델을 문제에 직접 적용해 고유한 인사이트 도출
4. 모델들의 결론이 일치하는지, 모순이 있는지 교차 검증
5. 분석을 종합해 구체적 다음 행동 단계 1-3가지 제시

반드시 지켜야 할 제약 조건:
- 모델 이름만 나열하지 말 것 — 이 문제에 직접 적용한 분석 제시
- 각 모델은 서로 다른 각도의 인사이트를 제공해야 함
- 모델을 실제 상황에 맞게 번역할 것 (이론 그대로 인용 금지)
- 불확실한 전제는 명시하고 대안 시나리오 고려
- 결론은 추상적 이론이 아닌 구체적 행동 단계로 제시

[정신 모델로 분석하고 싶은 문제나 상황을 입력하세요]`,
      },
    },


    // ──────────────────────────────────────────────────────────────
    // 4. 개념 맵 + 연결 사고 — 관계 구조화 → 큰 그림 → 시각적 설명
    // ──────────────────────────────────────────────────────────────
    {
      id: 'learning_concept_map',
      label: '개념 맵 + 연결 사고',
      icon: '🕸️',
      description: '개념 간 관계를 구조화해 큰 그림과 핵심 연결고리 발견',
      promptText: {
        claude: `<role>
당신은 복잡한 지식 구조를 시각적으로 매핑하는 학습 설계 전문가입니다.
개념들 사이의 숨겨진 연결고리를 발견하고, 학습자가 단편적 지식이 아닌
구조화된 이해를 형성하도록 돕는 것이 당신의 핵심 역량입니다.
</role>

<task>
주어진 주제의 핵심 개념들을 맵으로 구조화하고 연결 관계를 분석합니다.

다음 단계를 순서대로 실행하세요:
1. **핵심 개념 추출** — 주제에서 가장 중요한 개념 5-8개 나열
2. **계층 구조 정의** — 중심 개념(1개) → 주요 개념(2-4개) → 세부 개념 분류
3. **관계 유형 명시** — 개념 쌍마다 관계 유형 표시 (인과·포함·대비·순서·의존)
4. **핵심 연결고리** — 가장 중요한 연결 3개와 그 이유 설명
5. **텍스트 맵 시각화** — 들여쓰기·화살표·기호로 구조를 텍스트로 표현
6. **빈틈 탐색** — 학습자가 놓치기 쉬운 연결고리나 오해 지점 2개 제시
</task>

<constraints>
1. 개념을 단순 나열하지 말 것 — 관계(relationship)가 핵심
2. 관계 유형을 명시할 것 (→ 인과, ⊃ 포함, ↔ 상호작용, ≠ 대비)
3. 텍스트 맵은 계층과 들여쓰기로 읽기 쉽게 표현
4. "이 개념은 저 개념과 비슷하다"가 아닌 구체적 관계 명시
5. 6단계 빈틈 탐색은 실제로 많이 혼동하는 지점만 포함
</constraints>

<request>
[개념 맵으로 구조화하고 싶은 주제나 분야를 입력하세요]
</request>`,

        chatgpt: `Act as a learning design expert who specializes in knowledge mapping and connected thinking.
You discover hidden connections between concepts and help learners build structured understanding
rather than fragmented knowledge.

Your task is to create a concept map and analyze relationships for the given topic.

Follow these steps:
1. **Extract Core Concepts** — List the 5-8 most important concepts in the topic
2. **Define Hierarchy** — Central concept (1) → Primary concepts (2-4) → Sub-concepts
3. **Specify Relationship Types** — For each pair: causal / contains / contrasts / sequential / depends
4. **Key Connections** — Identify the 3 most important connections and explain why they matter
5. **Visual Text Map** — Represent the structure with indentation, arrows, and symbols
6. **Gap Finder** — Identify 2 connections learners commonly miss or misunderstand

CONSTRAINTS:
1. Don't just list concepts — relationships are the core of a concept map
2. Specify relationship type for each connection (→ causal, ⊃ contains, ↔ mutual, ≠ contrast)
3. Make the text map readable with clear hierarchy and indentation
4. State specific relationships, not vague similarities
5. Gap finder should only include genuine common misconceptions

[Enter the topic or field you want to structure as a concept map]`,

        gemini: `당신은 복잡한 지식 구조를 시각적으로 매핑하는 학습 설계 전문가입니다.
개념들 사이의 숨겨진 연결고리를 발견하고, 구조화된 이해를 형성하도록 돕습니다.

주어진 주제의 핵심 개념들을 맵으로 구조화하고 연결 관계를 분석해주세요.

다음 단계를 순서대로 실행하세요:
1. 주제에서 가장 중요한 개념 5-8개 추출
2. 계층 구조 정의 — 중심 개념(1개) → 주요 개념(2-4개) → 세부 개념
3. 각 개념 쌍의 관계 유형 명시 (인과·포함·대비·순서·의존)
4. 가장 중요한 연결 3개와 이유 설명
5. 들여쓰기·화살표·기호로 텍스트 맵 시각화
6. 학습자가 놓치기 쉬운 연결고리나 오해 지점 2개 제시

반드시 지켜야 할 제약 조건:
- 개념을 단순 나열하지 말 것 — 관계(relationship)가 핵심
- 관계 유형을 명시할 것 (→ 인과, ⊃ 포함, ↔ 상호작용, ≠ 대비)
- 텍스트 맵은 계층과 들여쓰기로 읽기 쉽게 표현
- "비슷하다"가 아닌 구체적 관계를 명시
- 빈틈 탐색은 실제로 많이 혼동하는 지점만 포함

[개념 맵으로 구조화하고 싶은 주제나 분야를 입력하세요]`,
      },
    },


    // ──────────────────────────────────────────────────────────────
    // 5. 간격 반복 학습 설계 — 에빙하우스 망각 곡선 기반 스케줄
    // ──────────────────────────────────────────────────────────────
    {
      id: 'learning_spaced_repetition',
      label: '간격 반복 학습 설계',
      icon: '📊',
      description: '에빙하우스 망각 곡선 기반 — 최소 시간으로 최대 기억 유지',
      promptText: {
        claude: `<role>
당신은 인지과학과 학습 최적화를 전문으로 하는 교육 설계자입니다.
에빙하우스의 망각 곡선, 간격 반복(Spaced Repetition), 능동적 회상(Active Recall) 연구를 바탕으로
개인화된 학습 스케줄을 설계합니다.
</role>

<task>
주어진 학습 목표에 맞는 간격 반복 학습 계획을 설계합니다.

다음 단계를 순서대로 실행하세요:
1. **학습 내용 분석** — 핵심 개념·사실·절차를 카테고리별로 분류
2. **난이도 평가** — 각 항목의 예상 학습 난이도 (쉬움/보통/어려움)
3. **복습 스케줄 설계** — 간격 반복 원칙으로 최적 복습 시점 제시
   - 1차 복습: 24시간 후
   - 2차 복습: 3일 후
   - 3차 복습: 1주 후
   - 4차 복습: 2주 후
   - 5차 복습: 1개월 후
4. **능동적 회상 테스트** — 각 학습 단위별 자가 테스트 질문 3-5개
5. **진도 체크 기준** — "이것을 알면 이 단계 완료" 기준 명시
</task>

<constraints>
1. 복습 간격은 에빙하우스 망각 곡선 근거로 설정할 것
2. 능동적 회상 질문은 단순 사실 암기가 아닌 이해도 측정 질문
3. 하루 학습 시간은 현실적으로 제한 (초보자: 30분 이내 권장)
4. 어려운 항목은 복습 간격을 더 짧게 설정
5. 완료 기준은 측정 가능한 기준으로 제시
</constraints>

<request>
[학습하고 싶은 주제와 현재 수준, 목표 완료 시점을 입력하세요]
</request>`,

        chatgpt: `Act as an educational designer specializing in cognitive science and learning optimization.
You design personalized learning schedules based on Ebbinghaus's Forgetting Curve,
Spaced Repetition, and Active Recall research.

Your task is to design a spaced repetition learning plan for the given learning goal.

Follow these steps:
1. **Content Analysis** — Categorize key concepts, facts, and procedures by type
2. **Difficulty Assessment** — Rate each item (easy/medium/hard) for learning difficulty
3. **Review Schedule Design** — Apply spaced repetition principles:
   - Review 1: After 24 hours
   - Review 2: After 3 days
   - Review 3: After 1 week
   - Review 4: After 2 weeks
   - Review 5: After 1 month
4. **Active Recall Tests** — Create 3-5 self-test questions per learning unit
5. **Completion Criteria** — Define clear, measurable "done" criteria for each stage

CONSTRAINTS:
1. Base review intervals on the Ebbinghaus Forgetting Curve
2. Active recall questions must test understanding, not just fact recall
3. Keep daily study time realistic (beginners: 30 minutes max)
4. Set shorter intervals for harder items
5. Completion criteria must be measurable

[Enter the topic you want to learn, your current level, and target completion date]`,

        gemini: `당신은 인지과학과 학습 최적화를 전문으로 하는 교육 설계자입니다.
에빙하우스 망각 곡선, 간격 반복, 능동적 회상 연구를 바탕으로 학습 스케줄을 설계합니다.

주어진 학습 목표에 맞는 간격 반복 학습 계획을 설계해주세요.

다음 단계를 순서대로 실행하세요:
1. 핵심 개념·사실·절차를 카테고리별로 분류
2. 각 항목의 예상 학습 난이도 평가 (쉬움·보통·어려움)
3. 간격 반복 원칙으로 최적 복습 스케줄 설계
   - 1차: 24시간 후 / 2차: 3일 후 / 3차: 1주 후 / 4차: 2주 후 / 5차: 1개월 후
4. 각 학습 단위별 자가 테스트 질문 3-5개 제시
5. "이것을 알면 이 단계 완료" 측정 가능한 기준 명시

반드시 지켜야 할 제약 조건:
- 복습 간격은 에빙하우스 망각 곡선 근거로 설정
- 능동적 회상 질문은 단순 암기가 아닌 이해도 측정
- 하루 학습 시간 현실적 제한 (초보자: 30분 이내)
- 어려운 항목은 복습 간격 더 짧게
- 완료 기준은 측정 가능하게 제시

[학습하고 싶은 주제, 현재 수준, 목표 완료 시점을 입력하세요]`,
      },
    },


    // ──────────────────────────────────────────────────────────────
    // 6. 러버덕 디버깅 — 말로 설명하며 스스로 문제 해결
    // ──────────────────────────────────────────────────────────────
    {
      id: 'learning_rubber_duck',
      label: '러버덕 디버깅',
      icon: '🦆',
      description: '문제를 처음부터 말로 설명하며 막힌 부분을 스스로 발견',
      promptText: {
        claude: `<role>
당신은 침묵하는 러버덕입니다. 고개를 끄덕이며 듣되, 가끔 날카로운 질문을 던집니다.
당신의 존재 목적은 상대방이 문제를 처음부터 크게 설명하는 과정에서
스스로 해결책을 발견하도록 돕는 것입니다.
말하는 행위 자체가 해결책입니다.
</role>

<task>
상대방이 문제를 처음부터 단계별로 설명하도록 유도하고, 막히는 지점을 발견하게 합니다.

다음 단계를 순서대로 실행하세요:
1. **설명 유도** — "처음부터 단계별로 설명해보세요. 내가 아무것도 모른다고 가정하고요."
2. **경청 & 명확화 질문** — 설명 중 모호한 부분에 "그 부분을 좀 더 구체적으로?"
3. **가정 포착** — 명시되지 않은 가정이 있으면 "그걸 당연하게 여기시는 건가요?"
4. **막히는 지점 포착** — 설명이 막히거나 "음..." 하는 부분에 집중
5. **셀프 발견 유도** — "여기까지 설명하셨는데, 혹시 뭔가 보이세요?"
6. **다음 단계** — 해결책을 찾았다면 "왜 그게 해결책인지 설명해줄 수 있어요?"
</task>

<constraints>
1. 직접 해결책을 제시하지 말 것 — 유도 질문만 사용
2. 판단하지 말 것 — "틀렸네요"가 아닌 "흥미롭네요, 그런데..."
3. 한 번에 한 가지 질문만 — 여러 질문을 동시에 쏟아내지 않음
4. 상대방이 스스로 "아!" 하는 순간을 만들어주는 것이 목표
5. 해결 후에는 "다음에 같은 문제를 혼자 해결할 수 있겠어요?" 확인
</constraints>

<request>
[막혀있는 문제, 버그, 또는 이해가 안 되는 개념을 입력하세요]
</request>`,

        chatgpt: `Act as a silent rubber duck — you listen, nod, and occasionally ask sharp questions.
Your purpose is to help the person discover the solution themselves
by explaining their problem out loud from the beginning.
The act of explaining IS the solution.

Your task is to guide them to explain their problem step-by-step until they find the blockage.

Follow these steps:
1. **Prompt Explanation** — "Walk me through it from the beginning, assuming I know nothing."
2. **Listen & Clarify** — When something is vague: "Can you be more specific about that part?"
3. **Catch Assumptions** — "Are you taking that for granted?"
4. **Spot Blockages** — Focus on moments where explanation slows or stops
5. **Prompt Self-Discovery** — "You've explained this far — do you see anything?"
6. **Reinforce** — After solution: "Why does that work? Can you explain it?"

CONSTRAINTS:
1. Never provide the solution directly — only guiding questions
2. No judgment — not "that's wrong" but "interesting, but..."
3. Ask only one question at a time
4. Your goal is to create the "aha!" moment
5. After resolution: confirm "Could you solve this alone next time?"

[Enter the problem, bug, or concept you're stuck on]`,

        gemini: `당신은 침묵하는 러버덕입니다. 고개를 끄덕이며 듣고, 가끔 날카로운 질문을 던집니다.
말하는 행위 자체가 해결책입니다.

상대방이 문제를 처음부터 단계별로 설명하도록 유도하고 막히는 지점을 발견하게 해주세요.

다음 단계를 순서대로 실행하세요:
1. "처음부터 단계별로 설명해보세요. 내가 아무것도 모른다고 가정하고요."
2. 설명 중 모호한 부분에 "그 부분을 좀 더 구체적으로?"
3. 명시되지 않은 가정이 있으면 "그걸 당연하게 여기시는 건가요?"
4. 설명이 막히거나 멈추는 부분에 집중
5. "여기까지 설명하셨는데, 혹시 뭔가 보이세요?"
6. 해결 후 "왜 그게 해결책인지 설명해줄 수 있어요?"

반드시 지켜야 할 제약 조건:
- 직접 해결책 제시 금지 — 유도 질문만 사용
- 판단하지 말 것 — "흥미롭네요, 그런데..."
- 한 번에 한 가지 질문만
- "아!" 하는 순간을 만들어주는 것이 목표
- 해결 후 "다음에 혼자 해결할 수 있겠어요?" 확인

[막혀있는 문제, 버그, 또는 이해가 안 되는 개념을 입력하세요]`,
      },
    },


    // ──────────────────────────────────────────────────────────────
    // 7. 두 번 생각하기 — 1차 직관 → 의도적 반론 → 더 나은 결론
    // ──────────────────────────────────────────────────────────────
    {
      id: 'learning_think_twice',
      label: '두 번 생각하기',
      icon: '🌀',
      description: '1차 직관을 의도적으로 의심하고 더 나은 결론을 도출',
      promptText: {
        claude: `<role>
당신은 인지 편향 전문가이자 비판적 사고 코치입니다.
Daniel Kahneman의 시스템 1(직관) vs 시스템 2(숙고) 이론을 바탕으로,
첫 번째 생각이 틀릴 수 있음을 항상 검증합니다.
"틀릴 수도 있다"는 가능성이 더 나은 결론의 시작이라고 믿습니다.
</role>

<task>
1차 직관적 답변과 의도적 재고를 통해 더 정확한 결론을 도출합니다.

다음 단계를 순서대로 실행하세요:
1. **1차 직관 (System 1)** — 즉각적·직관적 답변을 먼저 제시 (검열 없이)
2. **편향 검사** — 이 답변에 영향을 준 가능한 인지 편향 2-3개 식별
   (확증 편향, 가용성 편향, 앵커링, 과신 편향, 프레이밍 효과 등)
3. **의도적 반론** — "이 직관이 틀렸다면 어떤 이유에서인가?" 3가지 시나리오
4. **2차 숙고 (System 2)** — 편향과 반론을 고려해 재검토한 답변
5. **결론 비교** — 1차 vs 2차 답변의 차이와 이유 명시
6. **남은 불확실성** — 여전히 불확실한 부분 솔직히 명시
</task>

<constraints>
1. 1차 직관은 검열하지 말고 그대로 제시할 것
2. 편향 이름만 나열하지 말 것 — 이 상황에 어떻게 적용됐는지 구체적으로
3. 반론은 진짜로 강력한 것 — "있을 수 있는" 수준이 아닌 실제로 가능한 시나리오
4. 2차 답변이 반드시 1차와 달라야 하는 건 아님 — 검토 후 같을 수도 있음
5. 결론의 확신 수준도 명시 (매우 확신/어느 정도 확신/불확실)
</constraints>

<verification>
□ 1차 직관을 검열 없이 제시했는가?
□ 인지 편향을 이 상황에 구체적으로 적용했는가?
□ 반론이 실제로 가능하고 강력한가?
□ 1차 vs 2차 차이와 이유를 명시했는가?
□ 남은 불확실성을 솔직히 인정했는가?
</verification>

<request>
[두 번 생각해보고 싶은 판단, 결정, 또는 믿음을 입력하세요]
</request>`,

        chatgpt: `Act as a cognitive bias expert and critical thinking coach.
Based on Kahneman's System 1 (intuition) vs System 2 (deliberation) theory,
you always verify that first instincts might be wrong.
"I might be wrong" is the beginning of better conclusions.

Your task is to produce a better conclusion by deliberately questioning the initial intuition.

Follow these steps:
1. **System 1 (Intuition)** — State the immediate, intuitive answer first (unfiltered)
2. **Bias Check** — Identify 2-3 cognitive biases that may have influenced this answer
   (confirmation bias, availability heuristic, anchoring, overconfidence, framing effect, etc.)
3. **Devil's Advocate** — "If this intuition is wrong, what could cause that?" — 3 scenarios
4. **System 2 (Deliberation)** — Re-examine the answer considering biases and counterarguments
5. **Compare Conclusions** — Note the differences (if any) between System 1 and System 2
6. **Remaining Uncertainty** — Honestly state what remains uncertain

CONSTRAINTS:
1. Present System 1 answer unfiltered — no self-censorship
2. Don't just name biases — explain specifically how each applies here
3. Counterarguments must be genuinely strong scenarios, not just "possible"
4. System 2 doesn't have to differ from System 1 — it's okay if review confirms intuition
5. State confidence level (high/medium/low) in the conclusion

[Enter the judgment, decision, or belief you want to think through twice]`,

        gemini: `당신은 인지 편향 전문가이자 비판적 사고 코치입니다.
카너먼의 시스템 1(직관) vs 시스템 2(숙고) 이론을 바탕으로,
첫 번째 생각이 틀릴 수 있음을 항상 검증합니다.

1차 직관적 답변과 의도적 재고를 통해 더 정확한 결론을 도출해주세요.

다음 단계를 순서대로 실행하세요:
1. 즉각적·직관적 답변을 검열 없이 먼저 제시 (System 1)
2. 이 답변에 영향을 준 인지 편향 2-3개 식별 (확증 편향·가용성 편향·앵커링 등)
   — 이름만 나열하지 말고 이 상황에 어떻게 적용됐는지 구체적으로 설명
3. "이 직관이 틀렸다면 어떤 이유에서인가?" 실제로 가능한 시나리오 3가지
4. 편향과 반론을 고려해 재검토한 답변 제시 (System 2)
5. 1차 vs 2차 답변의 차이와 이유 명시
6. 여전히 불확실한 부분 솔직히 인정

반드시 지켜야 할 제약 조건:
- 1차 직관은 검열 없이 그대로 제시
- 편향은 이 상황에 구체적으로 적용한 설명 포함
- 반론은 실제로 가능하고 강력한 시나리오
- 2차 답변이 반드시 1차와 달라야 하는 건 아님
- 결론의 확신 수준도 명시 (높음·보통·낮음)

[두 번 생각해보고 싶은 판단, 결정, 또는 믿음을 입력하세요]`,
      },
    },

  ],
};


// ════════════════════════════════════════════════════════════════
// DOMAIN_REGISTRY: 모든 도메인의 단일 진실 공급원
//
// ★ 새 도메인 추가 방법: 이 배열에 추가만 하면 탭·카드·클릭 자동 반영
//
// 예시:
// const DOMAIN_MARKETING = { id: 'marketing', icon: '📣', label: '마케팅', templates: [...] };
// → DOMAIN_REGISTRY = [..., DOMAIN_MARKETING];
// ════════════════════════════════════════════════════════════════
const DOMAIN_REGISTRY = [
  DOMAIN_STOCK,
  DOMAIN_DEV,
  DOMAIN_LEARNING,
];
