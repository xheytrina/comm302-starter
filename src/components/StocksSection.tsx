import React, { useState } from 'react';
import {
  TECH_HOT_CHIPS,
  HIGHEST_VOLUME_STOCKS,
  TOP_GAINERS_REGULAR,
  TOP_GAINERS_PRE,
  TOP_LOSERS_REGULAR,
  TOP_LOSERS_PRE,
  COMMUNITY_TRENDS,
} from '../data/mockMarketData';
import { MarketItem } from '../types/market';

interface StocksSectionProps {
  onSelectStock: (item: MarketItem | { symbol: string; name: string }) => void;
}

export const StocksSection: React.FC<StocksSectionProps> = ({ onSelectStock }) => {
  const [gainersSession, setGainersSession] = useState<'regular' | 'pre'>('regular');
  const [losersSession, setLosersSession] = useState<'regular' | 'pre'>('regular');

  const gainersList = gainersSession === 'regular' ? TOP_GAINERS_REGULAR : TOP_GAINERS_PRE;
  const losersList = losersSession === 'regular' ? TOP_LOSERS_REGULAR : TOP_LOSERS_PRE;

  return (
    <section id="section-stocks" className="flex flex-col gap-5 pt-4">
      {/* Header and Hot Tech Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div 
          onClick={() => onSelectStock({ symbol: 'NVDA', name: 'NVIDIA Corp' })}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-primary-container transition-colors tracking-tight">
            US stocks
          </h2>
          <span className="material-symbols-outlined text-[24px] text-text-secondary group-hover:text-primary-container group-hover:translate-x-0.5 transition-all">
            chevron_right
          </span>
        </div>

        {/* Tech Hot Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {TECH_HOT_CHIPS.map((chip) => {
            const isUp = chip.changePercent >= 0;
            return (
              <button
                key={chip.symbol}
                onClick={() => onSelectStock(chip)}
                className="px-3 py-1 rounded-full bg-surface-muted hover:bg-surface-container font-semibold text-xs text-text-primary transition-colors flex items-center gap-1.5 cursor-pointer border border-transparent hover:border-border-hairline"
                type="button"
              >
                <span>{chip.symbol}</span>
                <span className={`font-mono tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
                  {isUp ? `+${chip.changePercent.toFixed(2)}%` : `${chip.changePercent.toFixed(2)}%`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4-Column Market Movers Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Col 1: Highest volume */}
        <div className="bg-surface-base rounded-xl p-4 shadow-xs border border-border-hairline flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-hairline/60">
              <span className="text-base font-bold text-text-primary">Highest volume</span>
              <button
                onClick={() => onSelectStock(HIGHEST_VOLUME_STOCKS[0])}
                className="text-xs text-primary-container font-semibold hover:underline cursor-pointer"
              >
                All
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {HIGHEST_VOLUME_STOCKS.map((stock) => {
                const isUp = stock.changePercent >= 0;
                return (
                  <div
                    key={stock.symbol}
                    onClick={() => onSelectStock(stock)}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-surface-subtle transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-full ${stock.badgeColor} font-bold text-xs flex items-center justify-center flex-shrink-0`}>
                        {stock.symbol}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-text-primary truncate">{stock.name}</span>
                        <span className="text-[11px] text-text-secondary font-mono">Vol {stock.volume}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-text-primary tabular-nums">
                        ${stock.price.toFixed(2)}
                      </span>
                      <span className={`font-semibold text-[11px] font-mono tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
                        {isUp ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Col 2: Top gainers */}
        <div className="bg-surface-base rounded-xl p-4 shadow-xs border border-border-hairline flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-hairline/60">
              <span className="text-base font-bold text-text-primary">Top gainers</span>
              <div className="flex items-center bg-surface-muted rounded-full p-0.5 text-xs">
                <button
                  onClick={() => setGainersSession('regular')}
                  className={`px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                    gainersSession === 'regular'
                      ? 'bg-surface-base text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Regular
                </button>
                <button
                  onClick={() => setGainersSession('pre')}
                  className={`px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                    gainersSession === 'pre'
                      ? 'bg-surface-base text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Pre
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {gainersList.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock)}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-surface-subtle transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-market-up-bg text-market-up font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {stock.symbol.slice(0, 3)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-text-primary truncate">{stock.name}</span>
                      <span className="text-[11px] text-text-secondary font-mono">${stock.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.5 rounded bg-market-up-bg text-market-up font-mono font-bold text-xs tabular-nums">
                    +{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Top losers */}
        <div className="bg-surface-base rounded-xl p-4 shadow-xs border border-border-hairline flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-hairline/60">
              <span className="text-base font-bold text-text-primary">Top losers</span>
              <div className="flex items-center bg-surface-muted rounded-full p-0.5 text-xs">
                <button
                  onClick={() => setLosersSession('regular')}
                  className={`px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                    losersSession === 'regular'
                      ? 'bg-surface-base text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Regular
                </button>
                <button
                  onClick={() => setLosersSession('pre')}
                  className={`px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                    losersSession === 'pre'
                      ? 'bg-surface-base text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Pre
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {losersList.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock)}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-surface-subtle transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-market-down-bg text-market-down font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {stock.symbol.slice(0, 3)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-text-primary truncate">{stock.name}</span>
                      <span className="text-[11px] text-text-secondary font-mono">${stock.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.5 rounded bg-market-down-bg text-market-down font-mono font-bold text-xs tabular-nums">
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 4: Community trends */}
        <div className="bg-surface-base rounded-xl p-4 shadow-xs border border-border-hairline flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-hairline/60">
              <span className="text-base font-bold text-text-primary">Community trends</span>
              <span className="material-symbols-outlined text-[20px] text-amber-500">
                local_fire_department
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {COMMUNITY_TRENDS.map((item) => {
                const isUp = item.changePercent >= 0;
                return (
                  <div
                    key={item.symbol}
                    onClick={() => onSelectStock(item)}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-surface-subtle transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-full ${item.badgeColor} font-bold text-xs flex items-center justify-center flex-shrink-0`}>
                        {item.symbol.slice(0, 3)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-text-primary truncate">{item.name}</span>
                        <span className="text-[11px] text-text-secondary">{item.ideasCount}</span>
                      </div>
                    </div>

                    <span className={`font-semibold text-xs sm:text-sm font-mono tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
                      {isUp ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
