import React from 'react';
import { ECONOMIC_INDICATORS, EARNINGS_ITEMS } from '../data/mockMarketData';

interface MacroCalendarSectionProps {
  onSelectSymbol: (symbol: string) => void;
}

export const MacroCalendarSection: React.FC<MacroCalendarSectionProps> = ({ onSelectSymbol }) => {
  return (
    <section id="section-macro" className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4 pb-8">
      {/* Macro Economic Heatmap (7 cols) */}
      <div className="lg:col-span-7 bg-surface-base rounded-xl p-4 sm:p-5 shadow-xs border border-border-hairline flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-border-hairline/60">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-text-primary">
                Economic indicators heatmap
              </h3>
              <span className="material-symbols-outlined text-[20px] text-text-secondary">
                public
              </span>
            </div>
            <button
              onClick={() => alert('Viewing global macroeconomic trends & central bank rate tracker.')}
              className="text-xs text-primary-container hover:underline font-semibold cursor-pointer"
            >
              Explore macro trends
            </button>
          </div>

          {/* Heatmap Table */}
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-semibold text-text-secondary uppercase border-b border-border-hairline/60">
                  <th className="py-2 pr-2 font-semibold">Country</th>
                  <th className="py-2 px-2 text-right font-semibold">GDP YoY</th>
                  <th className="py-2 px-2 text-right font-semibold">Interest Rate</th>
                  <th className="py-2 px-2 text-right font-semibold">Inflation</th>
                  <th className="py-2 pl-2 text-right font-semibold">Unemp.</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm font-mono">
                {ECONOMIC_INDICATORS.map((indicator) => {
                  const isGdpPositive = indicator.gdpYoY >= 0;
                  const gdpBg = indicator.gdpYoY > 3 
                    ? 'bg-emerald-100 text-emerald-800 font-bold'
                    : indicator.gdpYoY > 0 
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'bg-red-50 text-red-700 font-bold';

                  return (
                    <tr
                      key={indicator.country}
                      className="hover:bg-surface-subtle transition-colors cursor-pointer border-b border-border-hairline/30 last:border-0"
                    >
                      <td className="py-2.5 pr-2 font-sans font-semibold text-text-primary flex items-center gap-2">
                        <span className="text-base">{indicator.flag}</span>
                        <span>{indicator.country}</span>
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-xs tabular-nums ${gdpBg}`}>
                          {isGdpPositive ? `+${indicator.gdpYoY.toFixed(1)}%` : `${indicator.gdpYoY.toFixed(1)}%`}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-right text-text-primary font-bold tabular-nums">
                        {indicator.interestRate.toFixed(2)}%
                      </td>
                      <td className="py-2.5 px-2 text-right text-text-primary tabular-nums">
                        {indicator.inflation.toFixed(1)}%
                      </td>
                      <td className="py-2.5 pl-2 text-right text-text-secondary tabular-nums">
                        {indicator.unemployment.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Earnings Calendar Mini (5 cols) */}
      <div className="lg:col-span-5 bg-surface-subtle rounded-xl p-4 sm:p-5 border border-border-hairline/60 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-border-hairline/60">
            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              Earnings Calendar
            </h3>
            <span className="px-2 py-0.5 bg-surface-base rounded-full text-xs font-semibold text-text-primary shadow-xs border border-border-hairline">
              Today
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {EARNINGS_ITEMS.map((item) => (
              <div
                key={item.symbol}
                onClick={() => onSelectSymbol(item.symbol)}
                className="flex items-center justify-between p-2.5 rounded-lg bg-surface-base hover:bg-surface-muted transition-colors cursor-pointer shadow-xs border border-border-hairline/50"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-full ${item.badgeColor} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                    {item.symbol}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-text-primary truncate">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-text-secondary font-medium">
                      {item.timing}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end font-mono">
                  <span className="text-xs text-text-secondary tabular-nums">
                    Est: {item.estimate}
                  </span>
                  <span className={`text-xs font-bold tabular-nums ${
                    item.actual !== '—' ? 'text-market-up' : 'text-text-primary'
                  }`}>
                    {item.actual !== '—' ? `Act: ${item.actual}` : `Actual: ${item.actual}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSelectSymbol('ADBE')}
          className="text-xs text-primary-container hover:underline font-semibold flex items-center gap-1 mt-3 pt-2 border-t border-border-hairline/40 cursor-pointer"
        >
          See full earnings schedule
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
