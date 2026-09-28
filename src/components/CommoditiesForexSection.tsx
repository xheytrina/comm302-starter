import React from 'react';
import { COMMODITIES_FOREX } from '../data/mockMarketData';

interface CommoditiesForexSectionProps {
  onSelectAsset: (item: { symbol: string; name: string }) => void;
}

export const CommoditiesForexSection: React.FC<CommoditiesForexSectionProps> = ({ onSelectAsset }) => {
  return (
    <section id="section-commodities" className="flex flex-col gap-4 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
          Futures, Commodities & Currencies
        </h2>

        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-market-up opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-market-up" />
          </span>
          <span className="font-medium">Live CME & FX feeds</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMMODITIES_FOREX.map((item) => {
          const isUp = item.changePercent >= 0;

          return (
            <div
              key={item.symbol}
              onClick={() => onSelectAsset({ symbol: item.symbol, name: item.name })}
              className="bg-surface-base rounded-xl p-4 shadow-xs border border-border-hairline flex flex-col justify-between cursor-pointer hover:bg-surface-subtle transition-all duration-150"
            >
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${item.badgeColor} flex items-center justify-center text-white font-bold text-[10px] shadow-xs`}>
                    {item.badge}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-text-primary truncate">
                    {item.name}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-text-secondary font-semibold">
                  {item.exchange}
                </span>
              </div>

              <div className="my-2">
                <div className="font-mono text-xl sm:text-2xl font-bold text-text-primary tabular-nums">
                  {item.type === 'forex' ? item.price.toFixed(item.price > 100 ? 3 : 5) : `$${item.price.toFixed(2)}`}
                </div>
                <div className={`flex items-center gap-1 font-semibold text-xs font-mono tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {isUp ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </span>
                  {isUp
                    ? `+${item.type === 'forex' ? item.change.toFixed(5) : `$${item.change.toFixed(2)}`} (+${item.changePercent.toFixed(2)}%)`
                    : `${item.type === 'forex' ? item.change.toFixed(5) : `-$${Math.abs(item.change).toFixed(2)}`} (${item.changePercent.toFixed(2)}%)`}
                </div>
              </div>

              {/* Sparkline for commodities or Bid/Ask gauge for forex */}
              {item.type === 'commodity' ? (
                <div className="w-full pt-1">
                  <svg className={`w-full h-8 overflow-visible ${isUp ? 'text-market-up' : 'text-market-down'}`} fill="none" viewBox="0 0 100 24">
                    <path
                      d={isUp ? "M 0,20 Q 25,18 40,12 T 70,8 T 100,2" : "M 0,4 Q 30,6 50,14 T 80,18 T 100,22"}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex flex-col gap-1 w-full pt-1">
                  <div className="flex justify-between text-[11px] text-text-secondary font-mono tabular-nums">
                    <span>Bid {item.bid?.toFixed(item.price > 100 ? 3 : 5)}</span>
                    <span>Ask {item.ask?.toFixed(item.price > 100 ? 3 : 5)}</span>
                  </div>
                  <div className="w-full bg-surface-muted h-1.5 rounded-full overflow-hidden flex">
                    <div className="bg-market-up h-full transition-all" style={{ width: `${item.bidPercent}%` }} />
                    <div className="bg-market-down h-full transition-all" style={{ width: `${item.askPercent}%` }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
