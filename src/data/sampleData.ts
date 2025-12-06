export interface BestCall {
  market: string;
  entry_price: number;
  settlement_price: number;
  entry_date: string;
  resolution_date: string;
  context?: string;
}

export interface WorstMiss {
  market: string;
  exit_price: number;
  settlement_price: number;
  context?: string;
}

export interface RecommendedMarket {
  title: string;
  price: number;
  category: string;
}

export interface Worldview {
  favorites_vs_underdogs: number;
  sequels_vs_originals: number;
  chaos_vs_stability: number;
  critics_vs_crowds: number;
}

export interface WrappedData {
  user_id: string;
  total_predictions: number;
  total_markets: number;
  percentile: number;
  days_active: number;
  longest_streak: number;
  streak_dates: [string, string];
  streak_context?: string;
  top_category: string;
  category_breakdown: Record<string, number>;
  category_subtext?: string;
  contrarian_score: number;
  contrarian_percentile: number;
  best_call: BestCall;
  worst_miss: WorstMiss;
  avg_entry_price: number;
  timing_profile: 'early_mover' | 'wait_and_see' | 'balanced';
  timing_example?: string;
  worldview: Worldview;
  worldview_summary?: string;
  personality: string;
  personality_title: string;
  personality_description: string;
  personality_percentile: number;
  recommended_markets: RecommendedMarket[];
}

export const personalityTitles: Record<string, { title: string; description: string }> = {
  dynasty_killer: {
    title: 'The Dynasty Killer',
    description: 'You fade the favorites, back the underdogs, and believe momentum is a myth.',
  },
  tape_reader: {
    title: 'The Tape Reader',
    description: 'You wait for momentum, read the room, and strike when the time is right.',
  },
  hedge_fund: {
    title: 'The Hedge Fund',
    description: 'Diversified and deliberate. You never put all your eggs in one basket.',
  },
  true_believer: {
    title: 'The True Believer',
    description: 'You pick a side early and ride it. Conviction is your superpower.',
  },
  arbitrageur: {
    title: 'The Arbitrageur',
    description: 'You hunt mispricings across markets. Inefficiency is opportunity.',
  },
  oracle: {
    title: 'The Oracle',
    description: 'Your accuracy defies the odds. When you speak, the market should listen.',
  },
};

export const sampleData: WrappedData = {
  user_id: 'abc123',
  total_predictions: 147,
  total_markets: 89,
  percentile: 97,
  days_active: 211,
  longest_streak: 34,
  streak_dates: ['2025-01-06', '2025-02-09'],
  streak_context: 'NFL playoffs through Super Bowl Sunday. You didn\'t miss a game.',
  top_category: 'Sports',
  category_breakdown: {
    Sports: 0.54,
    Entertainment: 0.22,
    Economics: 0.15,
    Weather: 0.09,
  },
  category_subtext: 'When there\'s a game on the line, you\'re in.',
  contrarian_score: 0.61,
  contrarian_percentile: 92,
  best_call: {
    market: 'Eagles win Super Bowl LIX',
    entry_price: 0.22,
    settlement_price: 1.0,
    entry_date: '2024-11-12',
    resolution_date: '2025-02-09',
    context: 'Final score: Eagles 40, Chiefs 22. The three-peat died in New Orleans.',
  },
  worst_miss: {
    market: 'Anora wins Best Picture',
    exit_price: 0.34,
    settlement_price: 1.0,
    context: 'Sean Baker won 4 Oscars in one night. You bailed too early.',
  },
  avg_entry_price: 0.29,
  timing_profile: 'early_mover',
  timing_example: 'You bought \'Fed cuts 50bps in September 2024\' before most believed it.',
  worldview: {
    favorites_vs_underdogs: 0.8,
    sequels_vs_originals: 0.4,
    chaos_vs_stability: 0.7,
    critics_vs_crowds: 0.2,
  },
  worldview_summary: 'A believer in earned endings, not inherited ones.',
  personality: 'dynasty_killer',
  personality_title: 'The Dynasty Killer',
  personality_description:
    'You fade the favorites, back the underdogs, and believe momentum is a myth.',
  personality_percentile: 6,
  recommended_markets: [
    { title: 'Will the Fed cut rates in December 2025?', price: 0.47, category: 'Economics' },
    { title: 'Will any film gross $1B+ in Q1 2026?', price: 0.38, category: 'Entertainment' },
    { title: 'Eagles win Super Bowl LX', price: 0.18, category: 'Sports' },
  ],
};
