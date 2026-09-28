import { MarketItem, WorldIndex, EconomicIndicator, EarningsItem, ChartPoint } from '../types/market';

export const TICKER_RIBBON_ITEMS = [
  { symbol: 'SPX', name: 'S&P 500', price: 5864.67, changePercent: 0.40, prefix: '' },
  { symbol: 'NDX', name: 'Nasdaq 100', price: 20412.30, changePercent: 0.70, prefix: '' },
  { symbol: 'DJI', name: 'Dow 30', price: 42863.86, changePercent: -0.28, prefix: '' },
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 84250.00, changePercent: 2.40, prefix: '$' },
  { symbol: 'GOLD', name: 'Gold', price: 2684.50, changePercent: 0.65, prefix: '$' },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0845, changePercent: 0.12, prefix: '' },
  { symbol: 'CRUDE OIL', name: 'Crude Oil', price: 71.20, changePercent: -0.45, prefix: '$' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 220.70, changePercent: 4.89, prefix: '$' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 138.25, changePercent: 3.17, prefix: '$' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 231.40, changePercent: 1.24, prefix: '$' },
];

export const PRIMARY_INDICES = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    exchange: 'INDEX • Cboe BZX',
    price: 5864.67,
    change: 23.40,
    changePercent: 0.40,
    badge: '500',
    badgeColor: 'bg-red-600',
    sparkline: [5840, 5845, 5842, 5850, 5855, 5852, 5860, 5864.67],
    chartColor: '#089981',
    description: 'Standard & Poor\'s 500 is a stock market index tracking the stock performance of 500 of the largest companies listed on stock exchanges in the United States.'
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100',
    exchange: 'INDEX • NASDAQ',
    price: 20412.30,
    change: 142.10,
    changePercent: 0.70,
    badge: '100',
    badgeColor: 'bg-cyan-600',
    sparkline: [20270, 20300, 20320, 20360, 20350, 20390, 20412.30],
    chartColor: '#089981',
    description: 'The Nasdaq-100 is a stock market index made up of 101 equity securities issued by 100 of the largest non-financial companies listed on the Nasdaq.'
  },
  {
    symbol: 'DJI',
    name: 'Dow 30',
    exchange: 'INDEX • DJ',
    price: 42863.86,
    change: -120.45,
    changePercent: -0.28,
    badge: '30',
    badgeColor: 'bg-sky-500',
    sparkline: [42984, 42950, 42920, 42890, 42910, 42870, 42863.86],
    chartColor: '#f23645',
    description: 'The Dow Jones Industrial Average is a price-weighted measurement stock market index of 30 prominent companies listed on stock exchanges in the United States.'
  },
  {
    symbol: 'RUT',
    name: 'US 2000 small',
    exchange: 'INDEX • Russell',
    price: 2215.10,
    change: 12.50,
    changePercent: 0.57,
    badge: '2000',
    badgeColor: 'bg-purple-600',
    sparkline: [2202, 2205, 2210, 2208, 2212, 2214, 2215.10],
    chartColor: '#089981',
    description: 'The Russell 2000 Index is a small-cap stock market index that makes up the smallest 2,000 stocks in the Russell 3000 Index.'
  },
  {
    symbol: 'IXIC',
    name: 'Nasdaq Comp',
    exchange: 'INDEX • NASDAQ',
    price: 18342.94,
    change: 115.30,
    changePercent: 0.63,
    badge: 'IXIC',
    badgeColor: 'bg-blue-700',
    sparkline: [18227, 18260, 18280, 18310, 18300, 18330, 18342.94],
    chartColor: '#089981',
    description: 'The Nasdaq Composite is a stock market index that includes almost all stocks listed on the Nasdaq stock exchange.'
  },
  {
    symbol: 'NYA',
    name: 'NYSE Comp',
    exchange: 'INDEX • NYSE',
    price: 19540.22,
    change: 45.20,
    changePercent: 0.23,
    badge: 'NYA',
    badgeColor: 'bg-slate-800',
    sparkline: [19495, 19510, 19500, 19525, 19530, 19540.22],
    chartColor: '#089981',
    description: 'The NYSE Composite Index is a float-adjusted market-capitalization weighted index which includes all common stocks listed on the New York Stock Exchange.'
  },
];

export const WORLD_INDICES_DATA: WorldIndex[] = [
  {
    symbol: 'NI225',
    name: 'Japan 225 Nikkei Index',
    price: 39605.80,
    changePercent: 0.78,
    chartData: generateSampleChart(39605.80, 0.78)
  },
  {
    symbol: 'UKX',
    name: 'FTSE 100 Index',
    price: 8245.12,
    changePercent: 0.19,
    chartData: generateSampleChart(8245.12, 0.19)
  },
  {
    symbol: 'DAX',
    name: 'DAX 40 Germany',
    price: 19420.55,
    changePercent: 0.42,
    chartData: generateSampleChart(19420.55, 0.42)
  },
  {
    symbol: 'PX1',
    name: 'CAC 40 Paris',
    price: 7577.89,
    changePercent: -0.12,
    chartData: generateSampleChart(7577.89, -0.12)
  },
  {
    symbol: 'FTMIB',
    name: 'Milano FTSE MIB',
    price: 34920.40,
    changePercent: 0.35,
    chartData: generateSampleChart(34920.40, 0.35)
  },
  {
    symbol: 'HSI',
    name: 'Hang Seng Index HK',
    price: 20599.11,
    changePercent: -0.85,
    chartData: generateSampleChart(20599.11, -0.85)
  },
  {
    symbol: 'NIFTY',
    name: 'Nifty 50 India',
    price: 24964.25,
    changePercent: 0.41,
    chartData: generateSampleChart(24964.25, 0.41)
  },
  {
    symbol: 'AS51',
    name: 'S&P/ASX 200 Australia',
    price: 8284.40,
    changePercent: 0.28,
    chartData: generateSampleChart(8284.40, 0.28)
  },
  {
    symbol: 'SMI',
    name: 'Swiss Market Index',
    price: 12150.30,
    changePercent: 0.15,
    chartData: generateSampleChart(12150.30, 0.15)
  }
];

export const TECH_HOT_CHIPS = [
  { symbol: 'NVDA', changePercent: 3.17, name: 'NVIDIA Corp', price: 138.25 },
  { symbol: 'AAPL', changePercent: 1.24, name: 'Apple Inc', price: 231.40 },
  { symbol: 'AMZN', changePercent: 0.82, name: 'Amazon.com Inc', price: 186.40 },
  { symbol: 'GOOGL', changePercent: -0.42, name: 'Alphabet Inc', price: 165.20 },
  { symbol: 'TSLA', changePercent: 4.89, name: 'Tesla Inc', price: 220.70 },
  { symbol: 'MSFT', changePercent: 0.55, name: 'Microsoft Corp', price: 422.50 },
];

export const HIGHEST_VOLUME_STOCKS: MarketItem[] = [
  { symbol: 'MU', name: 'Micron Tech', price: 108.45, change: 6.37, changePercent: 6.24, volume: '88.4M', category: 'stocks', badgeColor: 'bg-blue-100 text-blue-700', marketCap: '120.4B', peRatio: 28.4, weekHigh52: 157.50, weekLow52: 65.40 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 138.25, change: 4.25, changePercent: 3.17, volume: '74.2M', category: 'stocks', badgeColor: 'bg-emerald-100 text-emerald-800', marketCap: '3.42T', peRatio: 64.2, weekHigh52: 140.76, weekLow52: 45.11 },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 220.70, change: 10.29, changePercent: 4.89, volume: '62.1M', category: 'stocks', badgeColor: 'bg-purple-100 text-purple-700', marketCap: '704.8B', peRatio: 58.1, weekHigh52: 271.00, weekLow52: 138.80 },
  { symbol: 'META', name: 'Meta Platforms', price: 589.34, change: 10.70, changePercent: 1.85, volume: '34.8M', category: 'stocks', badgeColor: 'bg-cyan-100 text-cyan-800', marketCap: '1.48T', peRatio: 27.5, weekHigh52: 602.95, weekLow52: 279.40 },
  { symbol: 'SNDK', name: 'Sandisk Corp', price: 44.10, change: -0.54, changePercent: -1.20, volume: '28.5M', category: 'stocks', badgeColor: 'bg-gray-100 text-gray-800', marketCap: '18.2B', peRatio: 16.8, weekHigh52: 56.40, weekLow52: 32.10 },
];

export const TOP_GAINERS_REGULAR: MarketItem[] = [
  { symbol: 'AXG', name: 'Solowin Holdings', price: 18.42, change: 5.12, changePercent: 38.45, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '14.2M' },
  { symbol: 'MSGY', name: 'Masonglory Ltd', price: 4.95, change: 0.96, changePercent: 24.12, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '8.7M' },
  { symbol: 'WYY', name: 'WidePoint Corp', price: 3.80, change: 0.60, changePercent: 18.75, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '5.1M' },
  { symbol: 'GIPR', name: 'Generation Income', price: 2.14, change: 0.28, changePercent: 15.05, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '3.4M' },
  { symbol: 'TDIC', name: 'Dreamland Ltd', price: 7.20, change: 0.82, changePercent: 12.80, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '2.9M' },
];

export const TOP_GAINERS_PRE: MarketItem[] = [
  { symbol: 'CRTX', name: 'Cortexyme Inc', price: 5.40, change: 1.80, changePercent: 50.00, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '4.8M' },
  { symbol: 'BFRG', name: 'Bullfrog AI', price: 6.82, change: 1.74, changePercent: 34.25, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '3.2M' },
  { symbol: 'ENVX', name: 'Enovix Corp', price: 12.10, change: 2.30, changePercent: 23.47, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '7.5M' },
  { symbol: 'VERB', name: 'Verb Tech', price: 1.88, change: 0.32, changePercent: 20.51, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '6.1M' },
  { symbol: 'MIRA', name: 'Mira Pharma', price: 3.45, change: 0.52, changePercent: 17.75, category: 'stocks', badgeColor: 'bg-market-up-bg text-market-up', volume: '1.9M' },
];

export const TOP_LOSERS_REGULAR: MarketItem[] = [
  { symbol: 'ALAR', name: 'Alarum Tech', price: 11.20, change: -3.05, changePercent: -21.40, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '12.4M' },
  { symbol: 'IFBD', name: 'Infobird Co', price: 1.02, change: -0.23, changePercent: -18.66, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '9.1M' },
  { symbol: 'DRTS', name: 'Alpha Tau Medical', price: 2.68, change: -0.44, changePercent: -14.10, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '4.6M' },
  { symbol: 'FRTT', name: 'Fort Technology', price: 0.88, change: -0.11, changePercent: -11.25, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '3.8M' },
  { symbol: 'CRESY', name: 'Cresud S.A.', price: 9.30, change: -0.91, changePercent: -8.92, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '1.7M' },
];

export const TOP_LOSERS_PRE: MarketItem[] = [
  { symbol: 'ALLR', name: 'Allarity Bio', price: 1.45, change: -0.45, changePercent: -23.68, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '2.1M' },
  { symbol: 'CELZ', name: 'Creative Medical', price: 3.10, change: -0.72, changePercent: -18.85, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '1.5M' },
  { symbol: 'INM', name: 'InMed Pharma', price: 2.05, change: -0.38, changePercent: -15.64, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '3.7M' },
  { symbol: 'LGVN', name: 'Longeveron Inc', price: 1.15, change: -0.17, changePercent: -12.88, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '4.2M' },
  { symbol: 'BCAN', name: 'BYND Cannasoft', price: 0.42, change: -0.05, changePercent: -10.64, category: 'stocks', badgeColor: 'bg-market-down-bg text-market-down', volume: '1.1M' },
];

export const COMMUNITY_TRENDS: MarketItem[] = [
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 156.80, change: 4.33, changePercent: 2.84, ideasCount: '1.4k ideas', category: 'stocks', badgeColor: 'bg-red-100 text-red-700' },
  { symbol: 'COIN', name: 'Coinbase Global', price: 218.40, change: 15.42, changePercent: 7.60, ideasCount: '920 ideas', category: 'stocks', badgeColor: 'bg-blue-100 text-blue-700' },
  { symbol: 'AVGO', name: 'Broadcom Inc', price: 178.60, change: 2.03, changePercent: 1.15, ideasCount: '640 ideas', category: 'stocks', badgeColor: 'bg-indigo-100 text-indigo-700' },
  { symbol: 'ERIC', name: 'Ericsson ADR', price: 6.84, change: -0.03, changePercent: -0.45, ideasCount: '310 ideas', category: 'stocks', badgeColor: 'bg-slate-100 text-slate-800' },
  { symbol: 'AMZN', name: 'Amazon.com', price: 186.40, change: 1.52, changePercent: 0.82, ideasCount: '2.8k ideas', category: 'stocks', badgeColor: 'bg-amber-100 text-amber-800' },
];

export const CRYPTO_ASSETS: MarketItem[] = [
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 84250.00, change: 1970.00, changePercent: 2.40, marketCap: '1.67T', category: 'crypto', badge: '₿', badgeColor: 'bg-amber-500' },
  { symbol: 'ETHUSD', name: 'Ethereum', price: 3140.20, change: 55.60, changePercent: 1.80, marketCap: '323.1B', category: 'crypto', badge: 'Ξ', badgeColor: 'bg-indigo-600' },
  { symbol: 'USDTUSD', name: 'Tether USDt', price: 1.0002, change: 0.00, changePercent: 0.00, marketCap: '183.7B', category: 'crypto', badge: '₮', badgeColor: 'bg-teal-600' },
  { symbol: 'SOLUSD', name: 'Solana', price: 182.40, change: 9.02, changePercent: 5.20, marketCap: '92.7B', category: 'crypto', badge: 'S', badgeColor: 'bg-gradient-to-br from-purple-500 to-teal-400' },
  { symbol: 'BNBUSD', name: 'BNB', price: 598.60, change: -3.92, changePercent: -0.65, marketCap: '101.2B', category: 'crypto', badge: 'B', badgeColor: 'bg-yellow-500' },
  { symbol: 'XRPUSD', name: 'XRP', price: 0.584, change: 0.018, changePercent: 3.18, marketCap: '33.1B', category: 'crypto', badge: '✕', badgeColor: 'bg-slate-700' },
  { symbol: 'DOGEUSD', name: 'Dogecoin', price: 0.142, change: 0.006, changePercent: 4.41, marketCap: '20.8B', category: 'crypto', badge: 'Ð', badgeColor: 'bg-amber-600' },
];

export const WORLD_BIGGEST_COMPANIES = [
  { rank: 1, symbol: 'NVDA', name: 'NVIDIA Corporation', badge: 'NV', marketCap: '3.42 TUSD', country: 'US', sector: 'Semiconductors' },
  { rank: 2, symbol: 'AAPL', name: 'Apple Inc.', badge: 'AP', marketCap: '3.38 TUSD', country: 'US', sector: 'Technology Hardware' },
  { rank: 3, symbol: 'MSFT', name: 'Microsoft Corporation', badge: 'MS', marketCap: '3.19 TUSD', country: 'US', sector: 'Software & Cloud' },
  { rank: 4, symbol: 'GOOGL', name: 'Alphabet Inc.', badge: 'GO', marketCap: '2.15 TUSD', country: 'US', sector: 'Internet Content' },
  { rank: 5, symbol: 'AMZN', name: 'Amazon.com Inc.', badge: 'AZ', marketCap: '2.05 TUSD', country: 'US', sector: 'E-Commerce & Cloud' },
  { rank: 6, symbol: '2222', name: 'Saudi Aramco', badge: 'SA', marketCap: '1.82 TUSD', country: 'SA', sector: 'Oil & Gas' },
  { rank: 7, symbol: 'META', name: 'Meta Platforms Inc.', badge: 'ME', marketCap: '1.48 TUSD', country: 'US', sector: 'Social Media' },
];

export const COMMODITIES_FOREX = [
  {
    symbol: 'GOLD',
    name: 'Gold',
    exchange: 'COMEX-GC1!',
    price: 2684.50,
    change: 17.40,
    changePercent: 0.65,
    badge: 'AU',
    badgeColor: 'bg-amber-400',
    type: 'commodity',
    sparkline: [2667, 2670, 2668, 2675, 2678, 2682, 2684.50]
  },
  {
    symbol: 'CRUDE_OIL',
    name: 'Light Crude Oil',
    exchange: 'NYMEX-CL1!',
    price: 71.20,
    change: -0.32,
    changePercent: -0.45,
    badge: 'OIL',
    badgeColor: 'bg-slate-800',
    type: 'commodity',
    sparkline: [71.8, 71.7, 71.6, 71.4, 71.3, 71.20]
  },
  {
    symbol: 'EURUSD',
    name: 'EUR to USD',
    exchange: 'FX_IDC',
    price: 1.08450,
    change: 0.00130,
    changePercent: 0.12,
    badge: '€$',
    badgeColor: 'bg-blue-600',
    type: 'forex',
    bid: 1.08448,
    ask: 1.08452,
    bidPercent: 50,
    askPercent: 50
  },
  {
    symbol: 'USDJPY',
    name: 'USD to JPY',
    exchange: 'FX_IDC',
    price: 152.302,
    change: -0.380,
    changePercent: -0.25,
    badge: '¥$',
    badgeColor: 'bg-rose-600',
    type: 'forex',
    bid: 152.298,
    ask: 152.305,
    bidPercent: 40,
    askPercent: 60
  }
];

export const ECONOMIC_INDICATORS: EconomicIndicator[] = [
  { country: 'USA', flag: '🇺🇸', gdpYoY: 2.8, interestRate: 4.75, inflation: 2.4, unemployment: 4.1 },
  { country: 'China', flag: '🇨🇳', gdpYoY: 4.6, interestRate: 3.10, inflation: 0.4, unemployment: 5.1 },
  { country: 'Euro Area', flag: '🇪🇺', gdpYoY: 0.9, interestRate: 3.40, inflation: 1.7, unemployment: 6.3 },
  { country: 'Germany', flag: '🇩🇪', gdpYoY: -0.2, interestRate: 3.40, inflation: 1.6, unemployment: 6.0 },
  { country: 'Japan', flag: '🇯🇵', gdpYoY: 0.5, interestRate: 0.25, inflation: 2.5, unemployment: 2.5 },
  { country: 'United Kingdom', flag: '🇬🇧', gdpYoY: 0.7, interestRate: 5.00, inflation: 2.2, unemployment: 4.0 },
];

export const EARNINGS_ITEMS: EarningsItem[] = [
  {
    symbol: 'MTN',
    name: 'Vail Resorts, Inc.',
    timing: 'After close',
    estimate: '-5.35 USD',
    actual: '—',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    symbol: 'TRAK',
    name: 'ReposiTrak, Inc.',
    timing: 'Before open',
    estimate: '0.09 USD',
    actual: '0.11 USD',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    symbol: 'TAYD',
    name: 'Taylor Devices',
    timing: 'During market',
    estimate: '0.92 USD',
    actual: '—',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  {
    symbol: 'ADBE',
    name: 'Adobe Inc.',
    timing: 'After close',
    estimate: '4.65 USD',
    actual: '4.68 USD',
    badgeColor: 'bg-red-100 text-red-800'
  },
  {
    symbol: 'COST',
    name: 'Costco Wholesale',
    timing: 'After close',
    estimate: '5.08 USD',
    actual: '5.29 USD',
    badgeColor: 'bg-amber-100 text-amber-800'
  }
];

function generateSampleChart(basePrice: number, changePercent: number) {
  const isUp = changePercent >= 0;
  const timeframes = ['1D', '5D', '1M', '1Y', 'ALL'];
  const res: { [tf: string]: { time: string; value: number }[] } = {};

  timeframes.forEach((tf) => {
    const pointsCount = tf === '1D' ? 24 : tf === '5D' ? 30 : tf === '1M' ? 30 : tf === '1Y' ? 52 : 60;
    const series: { time: string; value: number }[] = [];
    const drift = (changePercent / 100) * basePrice;
    const startVal = isUp ? basePrice - drift : basePrice - drift;

    let current = startVal;
    for (let i = 0; i < pointsCount; i++) {
      const progress = i / (pointsCount - 1);
      const noise = (Math.random() - 0.48) * (basePrice * 0.005);
      const trend = startVal + (basePrice - startVal) * progress;
      current = Math.max(1, +(trend + noise).toFixed(2));
      const timeStr = tf === '1D' 
        ? `${9 + Math.floor(i * 0.25)}:${((i % 4) * 15).toString().padStart(2, '0')}`
        : `Day ${i + 1}`;
      series.push({ time: timeStr, value: current });
    }
    // ensure last is basePrice
    series[series.length - 1].value = basePrice;
    res[tf] = series;
  });

  return res;
}
