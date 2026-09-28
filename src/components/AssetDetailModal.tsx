import React, { useMemo } from 'react';
import { MarketItem } from '../types/market';

interface AssetDetailModalProps {
  item: MarketItem | { symbol: string; name: string } | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSuperchart: (symbol: string) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onOpenSuperchart,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  if (!isOpen || !item) return null;

  const symbol = item.symbol;
  const name = item.name;

  // Derive stats if not provided
  const price = 'price' in item ? item.price : 185.50;
  const changePercent = 'changePercent' in item ? item.changePercent : 2.45;
  const isUp = changePercent >= 0;
  const volume = 'volume' in item ? item.volume : '45.2M';
  const marketCap = 'marketCap' in item ? item.marketCap : '$1.24T';
  const peRatio = 'peRatio' in item ? item.peRatio : 32.4;
  const weekHigh = 'weekHigh52' in item && item.weekHigh52 ? item.weekHigh52 : +(price * 1.25).toFixed(2);
  const weekLow = 'weekLow52' in item && item.weekLow52 ? item.weekLow52 : +(price * 0.72).toFixed(2);

  const rangePercent = Math.max(0, Math.min(100, ((price - weekLow) / (weekHigh - weekLow)) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none">
      <div 
        className="w-full max-w-lg bg-surface-base rounded-2xl shadow-2xl border border-border-hairline overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border-hairline flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-sm border border-primary-container/20">
              {symbol.slice(0, 4)}
            </div>
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2">
                {name}
              </h2>
              <span className="text-xs text-text-secondary font-mono">
                {symbol} • NASDAQ / NYSE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(symbol)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-amber-100 text-amber-600'
                  : 'hover:bg-surface-muted text-text-secondary hover:text-text-primary'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isWatchlisted ? 'star' : 'star_outline'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface-muted text-text-secondary hover:text-text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Price & Change Banner */}
        <div className="px-5 py-4 bg-surface-subtle border-b border-border-hairline flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold font-mono text-text-primary tabular-nums">
              ${price.toLocaleString(undefined, { minimumFractionDigits: price < 1 ? 4 : 2 })}
            </span>
            <span className={`text-sm font-semibold flex items-center font-mono tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
              <span className="material-symbols-outlined text-[16px]">
                {isUp ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
              {isUp ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`}
            </span>
          </div>

          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-muted text-text-secondary">
            USD
          </span>
        </div>

        {/* 52-Week Range Bar */}
        <div className="px-5 py-4 border-b border-border-hairline flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-text-secondary font-mono">
            <span>52W Low: ${weekLow.toFixed(2)}</span>
            <span>52W High: ${weekHigh.toFixed(2)}</span>
          </div>
          <div className="relative w-full h-2 bg-surface-muted rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 bg-primary-container rounded-full"
              style={{ width: `${rangePercent}%` }}
            />
          </div>
          <div className="text-[11px] text-text-secondary text-right font-mono">
            Current at {rangePercent.toFixed(0)}% of 52W range
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="px-5 py-4 grid grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-surface-subtle flex flex-col">
            <span className="text-text-secondary">Market Capitalization</span>
            <span className="font-bold text-sm font-mono text-text-primary mt-0.5">{marketCap}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-subtle flex flex-col">
            <span className="text-text-secondary">P/E Ratio (TTM)</span>
            <span className="font-bold text-sm font-mono text-text-primary mt-0.5">{peRatio || '28.5'}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-subtle flex flex-col">
            <span className="text-text-secondary">Trading Volume</span>
            <span className="font-bold text-sm font-mono text-text-primary mt-0.5">{volume}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-subtle flex flex-col">
            <span className="text-text-secondary">Technical Rating</span>
            <span className="font-bold text-sm text-market-up mt-0.5 flex items-center gap-1">
              Strong Buy
            </span>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 bg-surface-muted border-t border-border-hairline flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleWatchlist(symbol)}
            className="flex-1 py-2 px-3 rounded-lg border border-border-hairline bg-surface-base text-xs font-semibold hover:bg-surface-subtle text-text-primary transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isWatchlisted ? 'check' : 'add'}
            </span>
            {isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenSuperchart(symbol);
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary-container/90 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Open Superchart</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
};
