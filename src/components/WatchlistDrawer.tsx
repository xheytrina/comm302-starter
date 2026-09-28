import React from 'react';
import { PRIMARY_INDICES, HIGHEST_VOLUME_STOCKS, CRYPTO_ASSETS } from '../data/mockMarketData';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: string[];
  onRemoveFromWatchlist: (symbol: string) => void;
  onSelectSymbol: (symbol: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemoveFromWatchlist,
  onSelectSymbol,
}) => {
  if (!isOpen) return null;

  // Lookup full details for symbols in watchlist
  const lookupMap = new Map<string, { symbol: string; name: string; price: number; changePercent: number }>();
  
  [...PRIMARY_INDICES, ...HIGHEST_VOLUME_STOCKS, ...CRYPTO_ASSETS].forEach((item) => {
    lookupMap.set(item.symbol, {
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      changePercent: item.changePercent,
    });
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs select-none">
      <div 
        className="w-full max-w-sm bg-surface-base h-full shadow-2xl border-l border-border-hairline flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-[22px]">star</span>
            <h3 className="font-bold text-base text-text-primary">My Watchlist</h3>
            <span className="text-xs px-2 py-0.5 bg-surface-muted rounded-full font-mono text-text-secondary">
              {watchlist.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-muted text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
          {watchlist.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-text-secondary">
              <span className="material-symbols-outlined text-[40px] text-text-tertiary mb-2">
                bookmark_border
              </span>
              <p className="text-sm font-semibold text-text-primary">Your watchlist is empty</p>
              <p className="text-xs mt-1">Click the star icon on any asset to track it in real time here.</p>
            </div>
          ) : (
            watchlist.map((symbol) => {
              const data = lookupMap.get(symbol) || {
                symbol,
                name: symbol,
                price: 150.00,
                changePercent: 1.25,
              };
              const isUp = data.changePercent >= 0;

              return (
                <div
                  key={symbol}
                  onClick={() => {
                    onSelectSymbol(symbol);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-subtle hover:bg-surface-muted transition-colors cursor-pointer group border border-border-hairline/60"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs font-bold px-2 py-1 bg-surface-base rounded text-text-primary border border-border-hairline">
                      {data.symbol}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-text-primary truncate">
                        {data.name}
                      </span>
                      <span className="text-[11px] text-text-secondary font-mono">
                        ${data.price.toFixed(data.price < 1 ? 4 : 2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
                      {isUp ? `+${data.changePercent.toFixed(2)}%` : `${data.changePercent.toFixed(2)}%`}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWatchlist(symbol);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-text-secondary hover:text-red-600 transition-all cursor-pointer"
                      title="Remove"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-border-hairline bg-surface-muted text-center text-xs text-text-secondary">
          Data streams via simulated ICE Data Services
        </div>
      </div>
    </div>
  );
};
