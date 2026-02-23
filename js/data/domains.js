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
