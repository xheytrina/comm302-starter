import React, { useState, useEffect, useMemo } from 'react';
import {
  PRIMARY_INDICES,
  WORLD_INDICES_DATA,
  TECH_HOT_CHIPS,
  HIGHEST_VOLUME_STOCKS,
  TOP_GAINERS_REGULAR,
  CRYPTO_ASSETS,
  COMMODITIES_FOREX,
} from '../data/mockMarketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'stocks' | 'crypto' | 'forex' | 'indices' | 'futures'>('all');

  // Gather all searchable symbols
  const allSearchableItems = useMemo(() => {
    const list: Array<{
      symbol: string;
      name: string;
      category: 'stocks' | 'crypto' | 'forex' | 'indices' | 'futures';
      price: number;
      changePercent: number;
      exchange: string;
    }> = [];

    PRIMARY_INDICES.forEach((i) =>
      list.push({
        symbol: i.symbol,
        name: i.name,
        category: 'indices',
        price: i.price,
        changePercent: i.changePercent,
        exchange: i.exchange,
      })
    );

    WORLD_INDICES_DATA.forEach((i) =>
      list.push({
        symbol: i.symbol,
        name: i.name,
        category: 'indices',
        price: i.price,
        changePercent: i.changePercent,
        exchange: 'GLOBAL',
      })
    );

    HIGHEST_VOLUME_STOCKS.forEach((s) =>
      list.push({
        symbol: s.symbol,
        name: s.name,
        category: 'stocks',
        price: s.price,
        changePercent: s.changePercent,
        exchange: 'NASDAQ',
      })
    );

    TECH_HOT_CHIPS.forEach((s) => {
      if (!list.some((item) => item.symbol === s.symbol)) {
        list.push({
          symbol: s.symbol,
          name: s.name,
          category: 'stocks',
          price: s.price,
          changePercent: s.changePercent,
          exchange: 'NASDAQ',
        });
      }
    });

    TOP_GAINERS_REGULAR.forEach((s) => {
      if (!list.some((item) => item.symbol === s.symbol)) {
        list.push({
          symbol: s.symbol,
          name: s.name,
          category: 'stocks',
          price: s.price,
          changePercent: s.changePercent,
          exchange: 'NYSE/NASDAQ',
        });
      }
    });

    CRYPTO_ASSETS.forEach((c) =>
      list.push({
        symbol: c.symbol,
        name: c.name,
        category: 'crypto',
        price: c.price,
        changePercent: c.changePercent,
        exchange: 'CRYPTO',
      })
    );

    COMMODITIES_FOREX.forEach((cf) =>
      list.push({
        symbol: cf.symbol,
        name: cf.name,
        category: cf.type === 'forex' ? 'forex' : 'futures',
        price: cf.price,
        changePercent: cf.changePercent,
        exchange: cf.exchange,
      })
    );

    return list;
  }, []);

  const filteredItems = useMemo(() => {
    return allSearchableItems.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const q = query.trim().toLowerCase();
      if (!q) return matchesCat;
      const matchesQuery =
        item.symbol.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [allSearchableItems, activeCategory, query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-surface-base rounded-2xl shadow-2xl border border-border-hairline overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-border-hairline gap-3">
          <span className="material-symbols-outlined text-text-secondary text-[24px]">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, market, company or cryptocurrency..."
            className="flex-1 bg-transparent text-sm sm:text-base text-text-primary placeholder:text-text-secondary outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-surface-muted text-text-secondary cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold bg-surface-muted rounded-md text-text-secondary hover:text-text-primary cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 px-4 py-2 bg-surface-subtle border-b border-border-hairline overflow-x-auto no-scrollbar">
          {(['all', 'stocks', 'crypto', 'forex', 'indices', 'futures'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-surface-base text-primary-container shadow-xs font-bold border border-border-hairline'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto max-h-[460px] p-2 flex flex-col gap-0.5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-text-secondary text-sm">
              No symbols found matching "{query}"
            </div>
          ) : (
            filteredItems.map((item) => {
              const isUp = item.changePercent >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectSymbol(item.symbol);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-muted transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold px-2 py-1 bg-surface-muted group-hover:bg-surface-base rounded text-text-primary border border-border-hairline/60">
                      {item.symbol}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-text-primary truncate">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-text-secondary uppercase">
                        {item.category} • {item.exchange}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="font-mono text-sm font-bold text-text-primary tabular-nums">
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: item.price < 1 ? 4 : 2 })}
                    </span>
                    <span className={`text-xs font-mono font-semibold tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
                      {isUp ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-surface-muted border-t border-border-hairline flex items-center justify-between text-[11px] text-text-secondary">
          <span>Tip: Press <kbd className="px-1 py-0.5 bg-surface-base rounded border border-border-hairline font-mono">↑</kbd> <kbd className="px-1 py-0.5 bg-surface-base rounded border border-border-hairline font-mono">↓</kbd> to navigate, <kbd className="px-1 py-0.5 bg-surface-base rounded border border-border-hairline font-mono">Enter</kbd> to select</span>
          <span>{filteredItems.length} results</span>
        </div>
      </div>
    </div>
  );
};
