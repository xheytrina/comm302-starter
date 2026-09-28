export interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: 'indices' | 'stocks' | 'crypto' | 'futures' | 'forex' | 'bonds' | 'economy';
  exchange?: string;
  volume?: string;
  badge?: string;
  badgeColor?: string;
  sparkline?: number[];
  marketCap?: string;
  bid?: number;
  ask?: number;
  ideasCount?: string;
  peRatio?: number;
  weekHigh52?: number;
  weekLow52?: number;
}

export interface WorldIndex {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  badgeColor?: string;
  chartData: { [timeframe: string]: { time: string; value: number }[] };
}

export interface EconomicIndicator {
  country: string;
  flag: string;
  gdpYoY: number;
  interestRate: number;
  inflation: number;
  unemployment: number;
}

export interface EarningsItem {
  symbol: string;
  name: string;
  timing: 'After close' | 'Before open' | 'During market';
  estimate: string;
  actual: string;
  badgeColor?: string;
}

export interface ChartPoint {
  time: string;
  value: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}
