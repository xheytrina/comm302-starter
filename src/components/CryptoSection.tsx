import React from 'react';
import { CRYPTO_ASSETS, WORLD_BIGGEST_COMPANIES } from '../data/mockMarketData';
import { MarketItem } from '../types/market';

interface CryptoSectionProps {
  onSelectAsset: (item: MarketItem | { symbol: string; name: string }) => void;
}

export const CryptoSection: React.FC<CryptoSectionProps> = ({ onSelectAsset }) => {
  return (
    <section id="section-crypto" className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4">
      {/* Crypto Rankings (7 cols) */}
      <div className="lg:col-span-7 bg-surface-subtle rounded-xl p-4 sm:p-5 flex flex-col justify-between border border-border-hairline/60">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => onSelectAsset(CRYPTO_ASSETS[0])}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-primary-container transition-colors tracking-tight">
                Crypto
              </h2>
              <span className="material-symbols-outlined text-[24px] text-text-secondary group-hover:text-primary-container transition-transform">
                chevron_right
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-text-secondary">Total MCap:</span>
              <span className="font-mono text-sm font-bold text-text-primary tabular-nums">$2.45T</span>
            </div>
          </div>

          {/* Crypto Table Header */}
          <div className="grid grid-cols-12 text-[11px] font-semibold text-text-secondary uppercase px-2 pb-1 border-b border-border-hairline/60">
            <span className="col-span-5">Coin</span>
            <span className="col-span-3 text-right">Price</span>
            <span className="col-span-2 text-right">24h Change</span>
            <span className="col-span-2 text-right">Market Cap</span>
          </div>

          {/* Crypto Rows */}
          <div className="flex flex-col gap-1">
            {CRYPTO_ASSETS.map((coin) => {
              const isUp = coin.changePercent >= 0;
              return (
                <div
                  key={coin.symbol}
                  onClick={() => onSelectAsset(coin)}
                  className="grid grid-cols-12 items-center p-2 rounded-lg hover:bg-surface-base transition-colors cursor-pointer"
                >
                  <div className="col-span-5 flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${coin.badgeColor} text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs`}>
                      {coin.badge}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-text-primary truncate">{coin.name}</span>
                      <span className="text-[11px] text-text-secondary font-mono">{coin.symbol}</span>
                    </div>
                  </div>

                  <span className="col-span-3 text-right font-mono text-xs sm:text-sm font-semibold text-text-primary tabular-nums">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: coin.price < 1 ? 4 : 2 })}
                  </span>

                  <span className={`col-span-2 text-right font-mono text-xs font-bold tabular-nums ${
                    isUp ? 'text-market-up' : coin.changePercent === 0 ? 'text-text-secondary' : 'text-market-down'
                  }`}>
                    {isUp ? `+${coin.changePercent.toFixed(2)}%` : `${coin.changePercent.toFixed(2)}%`}
                  </span>

                  <span className="col-span-2 text-right font-mono text-xs text-text-secondary font-medium tabular-nums">
                    {coin.marketCap}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => onSelectAsset(CRYPTO_ASSETS[0])}
          className="text-xs text-primary-container hover:underline font-semibold flex items-center gap-1 mt-3 pt-2 border-t border-border-hairline/40 cursor-pointer"
        >
          See all cryptocurrencies
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* World Biggest Companies (5 cols) */}
      <div className="lg:col-span-5 bg-surface-base rounded-xl p-4 sm:p-5 shadow-xs border border-border-hairline flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-border-hairline/60">
            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              World biggest companies
            </h3>
            <span className="text-[11px] font-semibold text-text-secondary uppercase">
              By Market Cap
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {WORLD_BIGGEST_COMPANIES.map((company) => (
              <div
                key={company.symbol}
                onClick={() => onSelectAsset({ symbol: company.symbol, name: company.name })}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-subtle transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-text-secondary w-4 text-center">
                    {company.rank}
                  </span>
                  <div className="w-7 h-7 rounded bg-surface-muted flex items-center justify-center text-text-primary font-bold text-xs flex-shrink-0">
                    {company.badge}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-text-primary truncate">
                      {company.name}
                    </span>
                    <span className="text-[11px] text-text-secondary font-mono">
                      {company.symbol}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs sm:text-sm font-bold text-text-primary tabular-nums whitespace-nowrap">
                  {company.marketCap}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSelectAsset({ symbol: 'NVDA', name: 'NVIDIA Corporation' })}
          className="text-xs text-primary-container hover:underline font-semibold flex items-center gap-1 mt-3 pt-2 border-t border-border-hairline/60 cursor-pointer"
        >
          See all world major companies
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
