import React, { useEffect, useState } from 'react';
import { TICKER_RIBBON_ITEMS } from '../data/mockMarketData';

interface TickerRibbonProps {
  onSelectSymbol: (symbol: string) => void;
}

export const TickerRibbon: React.FC<TickerRibbonProps> = ({ onSelectSymbol }) => {
  const [tickers, setTickers] = useState(TICKER_RIBBON_ITEMS);
  const [flashingIndex, setFlashingIndex] = useState<{ idx: number; isUp: boolean } | null>(null);

  // Simulate real-time market ticks
  useEffect(() => {
    const interval = setInterval(() => {
      const targetIdx = Math.floor(Math.random() * tickers.length);
      const deltaPercent = (Math.random() - 0.49) * 0.08;
      const isUp = deltaPercent >= 0;

      setTickers((prev) => {
        const next = [...prev];
        const item = next[targetIdx];
        const newPrice = +(item.price * (1 + deltaPercent / 100)).toFixed(
          item.price < 10 ? 4 : 2
        );
        const newChange = +(item.changePercent + deltaPercent).toFixed(2);
        next[targetIdx] = {
          ...item,
          price: newPrice,
          changePercent: newChange,
        };
        return next;
      });

      setFlashingIndex({ idx: targetIdx, isUp });
      setTimeout(() => setFlashingIndex(null), 800);
    }, 3200);

    return () => clearInterval(interval);
  }, [tickers.length]);

  return (
    <div className="w-full bg-[#f0f3fa]/80 backdrop-blur-sm border-b border-border-hairline overflow-x-auto no-scrollbar py-1.5 px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto flex items-center gap-5 text-xs font-mono whitespace-nowrap min-w-max">
        {tickers.map((item, idx) => {
          const isUp = item.changePercent >= 0;
          const isFlashing = flashingIndex?.idx === idx;
          const flashColor = flashingIndex?.isUp ? 'bg-[#eef9f6]' : 'bg-[#fef0f1]';

          return (
            <React.Fragment key={item.symbol}>
              <div
                onClick={() => onSelectSymbol(item.symbol)}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded cursor-pointer transition-colors duration-300 hover:bg-surface-base ${
                  isFlashing ? flashColor : ''
                }`}
                title={`Click to view ${item.name}`}
              >
                <span className="font-semibold text-text-primary font-sans">{item.symbol}</span>
                <span className="text-text-secondary tabular-nums">
                  {item.prefix}{item.price.toLocaleString(undefined, { minimumFractionDigits: item.price < 10 ? 4 : 2 })}
                </span>
                <span className={`flex items-center font-semibold tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {isUp ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </span>
                  {isUp ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                </span>
              </div>
              {idx < tickers.length - 1 && (
                <div className="w-1 h-3 bg-border-hairline rounded-full" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
