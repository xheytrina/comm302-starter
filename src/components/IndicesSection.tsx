import React, { useState, useMemo } from 'react';
import { PRIMARY_INDICES, WORLD_INDICES_DATA } from '../data/mockMarketData';

interface IndicesSectionProps {
  onOpenSuperchart: (symbol: string) => void;
  onSelectSymbol: (symbol: string) => void;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  onOpenSuperchart,
  onSelectSymbol,
}) => {
  const [selectedIndexSymbol, setSelectedIndexSymbol] = useState('SPX');
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '1Y' | 'ALL'>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; time: string } | null>(null);

  // Find currently selected item among Primary Indices or World Indices
  const selectedIndex = useMemo(() => {
    const primary = PRIMARY_INDICES.find((i) => i.symbol === selectedIndexSymbol);
    if (primary) return primary;

    const world = WORLD_INDICES_DATA.find((w) => w.symbol === selectedIndexSymbol);
    if (world) {
      return {
        symbol: world.symbol,
        name: world.name,
        exchange: 'INDEX • GLOBAL',
        price: world.price,
        change: +(world.price * (world.changePercent / 100)).toFixed(2),
        changePercent: world.changePercent,
        badge: world.symbol.slice(0, 4),
        badgeColor: world.changePercent >= 0 ? 'bg-emerald-600' : 'bg-red-600',
        sparkline: [world.price * 0.99, world.price * 0.995, world.price * 1.002, world.price],
        chartColor: world.changePercent >= 0 ? '#089981' : '#f23645',
        description: `${world.name} benchmark index tracking performance of key listed equities.`
      };
    }
    return PRIMARY_INDICES[0];
  }, [selectedIndexSymbol]);

  // Generate dynamic chart points based on timeframe and current price/change
  const chartPoints = useMemo(() => {
    const count = timeframe === '1D' ? 24 : timeframe === '5D' ? 30 : timeframe === '1M' ? 32 : timeframe === '1Y' ? 48 : 56;
    const base = selectedIndex.price;
    const isUp = selectedIndex.changePercent >= 0;
    const drift = (selectedIndex.changePercent / 100) * base;
    const start = base - drift;
    
    const pts = [];
    for (let i = 0; i < count; i++) {
      const progress = i / (count - 1);
      // Realistic smooth wave + noise
      const sine = Math.sin(progress * Math.PI * 1.8) * (base * 0.0035);
      const interp = start + (base - start) * progress;
      const noise = (Math.sin(i * 1.4) + Math.cos(i * 0.7)) * (base * 0.0015);
      const val = +(interp + sine + noise).toFixed(2);
      
      const timeLabel = timeframe === '1D' 
        ? `${9 + Math.floor(i * 0.3)}:${((i % 4) * 15).toString().padStart(2, '0')}`
        : `P${i + 1}`;
      pts.push({ time: timeLabel, value: val });
    }
    pts[pts.length - 1].value = base;
    return pts;
  }, [selectedIndex.price, selectedIndex.changePercent, timeframe]);

  // Calculate SVG path
  const minVal = Math.min(...chartPoints.map((p) => p.value)) * 0.998;
  const maxVal = Math.max(...chartPoints.map((p) => p.value)) * 1.002;
  const range = maxVal - minVal || 1;

  const svgWidth = 400;
  const svgHeight = 160;

  const pathCoordinates = chartPoints.map((pt, idx) => {
    const x = (idx / (chartPoints.length - 1)) * svgWidth;
    const y = svgHeight - ((pt.value - minVal) / range) * (svgHeight - 20) - 10;
    return { x, y, value: pt.value, time: pt.time };
  });

  const pathD = pathCoordinates.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[i - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} C ${midX},${prev.y} ${midX},${pt.y} ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  const isPositive = selectedIndex.changePercent >= 0;
  const strokeColor = isPositive ? '#089981' : '#f23645';

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const ratio = mouseX / rect.width;
    const closestIdx = Math.round(ratio * (pathCoordinates.length - 1));
    const target = pathCoordinates[closestIdx];
    if (target) {
      setHoveredPoint(target);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const displayedPrice = hoveredPoint ? hoveredPoint.value : selectedIndex.price;

  return (
    <section id="section-indices" className="flex flex-col gap-5 pt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div 
          onClick={() => onSelectSymbol(selectedIndex.symbol)}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-primary-container transition-colors tracking-tight">
            Indices
          </h2>
          <span className="material-symbols-outlined text-[24px] text-text-secondary group-hover:text-primary-container group-hover:translate-x-0.5 transition-all">
            chevron_right
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => onOpenSuperchart(selectedIndex.symbol)}
            className="p-1.5 rounded-full hover:bg-surface-muted text-text-secondary hover:text-text-primary transition-colors cursor-pointer" 
            title="Widget code" 
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">code</span>
          </button>
          <button 
            onClick={() => onOpenSuperchart(selectedIndex.symbol)}
            className="p-1.5 rounded-full hover:bg-surface-muted text-text-secondary hover:text-text-primary transition-colors cursor-pointer" 
            title="Launch full chart view" 
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          </button>
        </div>
      </div>

      {/* 6 Quick Ticker Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {PRIMARY_INDICES.map((idx) => {
          const isSelected = selectedIndexSymbol === idx.symbol;
          const isUp = idx.changePercent >= 0;

          return (
            <div
              key={idx.symbol}
              onClick={() => setSelectedIndexSymbol(idx.symbol)}
              className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col justify-between gap-2.5 border ${
                isSelected
                  ? 'bg-surface-muted border-primary-container/40 shadow-xs ring-1 ring-primary-container/20'
                  : 'bg-surface-subtle hover:bg-surface-muted border-transparent hover:border-border-hairline'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${idx.badgeColor} text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0`}>
                  {idx.badge}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-text-primary truncate">{idx.name}</span>
                  <span className="text-[11px] text-text-secondary">{idx.symbol}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold text-text-primary tabular-nums">
                  {idx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold tabular-nums ${isUp ? 'text-market-up' : 'text-market-down'}`}>
                    {isUp ? `+${idx.change.toFixed(2)} (+${idx.changePercent.toFixed(2)}%)` : `${idx.change.toFixed(2)} (${idx.changePercent.toFixed(2)}%)`}
                  </span>
                  
                  {/* Mini Sparkline */}
                  <svg className={`w-12 h-5 overflow-visible ${isUp ? 'text-market-up' : 'text-market-down'}`} fill="none" viewBox="0 0 48 20">
                    <path
                      d={isUp ? "M 0,16 Q 10,18 20,11 T 36,7 T 48,2" : "M 0,4 Q 14,8 24,14 T 38,12 T 48,19"}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Split Interactive View: World Indices Table & Detail Chart Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: World Indices High Density List (7 cols) */}
        <div className="lg:col-span-7 bg-surface-subtle rounded-xl p-4 sm:p-5 flex flex-col gap-3 border border-border-hairline/60">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-text-primary">World indices</span>
              <span className="text-[11px] px-2 py-0.5 bg-surface-muted text-text-secondary rounded-full font-semibold">
                12 Major
              </span>
            </div>
            <button
              onClick={() => onSelectSymbol('NI225')}
              className="text-xs text-primary-container hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              See all major indices
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 text-[11px] font-semibold text-text-secondary uppercase px-2.5 pb-1 border-b border-border-hairline/60">
            <span className="col-span-6">Symbol</span>
            <span className="col-span-3 text-right">Last Price</span>
            <span className="col-span-3 text-right">Change %</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-0.5">
            {WORLD_INDICES_DATA.map((row) => {
              const isUp = row.changePercent >= 0;
              const isCurrent = selectedIndexSymbol === row.symbol;

              return (
                <div
                  key={row.symbol}
                  onClick={() => setSelectedIndexSymbol(row.symbol)}
                  className={`grid grid-cols-12 items-center p-2 rounded-lg transition-colors cursor-pointer ${
                    isCurrent ? 'bg-surface-base shadow-xs ring-1 ring-primary-container/20' : 'hover:bg-surface-base'
                  }`}
                >
                  <div className="col-span-6 flex items-center gap-2.5 min-w-0">
                    <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 bg-surface-muted rounded text-text-primary flex-shrink-0">
                      {row.symbol}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-text-primary truncate">
                      {row.name}
                    </span>
                  </div>

                  <span className="col-span-3 text-right font-mono text-xs sm:text-sm font-semibold text-text-primary tabular-nums">
                    {row.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>

                  <div className="col-span-3 text-right">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-bold tabular-nums ${
                      isUp ? 'bg-market-up-bg text-market-up' : 'bg-market-down-bg text-market-down'
                    }`}>
                      {isUp ? `+${row.changePercent.toFixed(2)}%` : `${row.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Detail Chart Preview (5 cols) */}
        <div className="lg:col-span-5 bg-surface-base rounded-xl p-4 sm:p-5 shadow-xs border border-border-hairline flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-full ${selectedIndex.badgeColor || 'bg-primary-container'} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                  {selectedIndex.badge || selectedIndex.symbol.slice(0, 3)}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-1.5">
                    {selectedIndex.name}
                  </h3>
                  <span className="text-xs text-text-secondary">{selectedIndex.exchange}</span>
                </div>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center gap-0.5 bg-surface-muted p-0.5 rounded-lg text-xs font-semibold">
                {(['1D', '5D', '1M', '1Y', 'ALL'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-1 rounded transition-all cursor-pointer ${
                      timeframe === tf
                        ? 'bg-surface-base shadow-xs text-text-primary font-bold'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    type="button"
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Callout */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-bold text-text-primary font-mono tabular-nums">
                {displayedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className={`text-xs font-semibold flex items-center tabular-nums ${isPositive ? 'text-market-up' : 'text-market-down'}`}>
                <span className="material-symbols-outlined text-[16px]">
                  {isPositive ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {isPositive ? `+${selectedIndex.change.toFixed(2)} (+${selectedIndex.changePercent.toFixed(2)}%)` : `${selectedIndex.change.toFixed(2)} (${selectedIndex.changePercent.toFixed(2)}%)`}
              </span>
            </div>

            {hoveredPoint && (
              <div className="text-[11px] text-text-secondary font-mono">
                {timeframe} Marker: {hoveredPoint.time} • <span className="font-semibold text-text-primary">${hoveredPoint.value.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Dynamic SVG Vector Area Chart */}
          <div className="w-full h-44 my-3 relative flex items-end select-none">
            <svg
              className="w-full h-full overflow-visible cursor-crosshair"
              preserveAspectRatio="none"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="chartGradientActive" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid guide lines */}
              <line x1="0" y1={svgHeight * 0.25} x2={svgWidth} y2={svgHeight * 0.25} stroke="#e0e3eb" strokeDasharray="3 3" strokeWidth="0.8" />
              <line x1="0" y1={svgHeight * 0.5} x2={svgWidth} y2={svgHeight * 0.5} stroke="#e0e3eb" strokeDasharray="3 3" strokeWidth="0.8" />
              <line x1="0" y1={svgHeight * 0.75} x2={svgWidth} y2={svgHeight * 0.75} stroke="#e0e3eb" strokeDasharray="3 3" strokeWidth="0.8" />

              {/* Area fill */}
              <path d={areaD} fill="url(#chartGradientActive)" />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeLinecap="round"
                strokeWidth="2.5"
              />

              {/* Interactive Crosshair */}
              {hoveredPoint && (
                <g>
                  <line
                    x1={hoveredPoint.x}
                    y1="0"
                    x2={hoveredPoint.x}
                    y2={svgHeight}
                    stroke="#737687"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                  />
                  <circle
                    cx={hoveredPoint.x}
                    cy={hoveredPoint.y}
                    r="5"
                    fill={strokeColor}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}

              {/* Current Price Pin (when not hovering) */}
              {!hoveredPoint && pathCoordinates.length > 0 && (
                <circle
                  className="animate-pulse"
                  cx={pathCoordinates[pathCoordinates.length - 1].x}
                  cy={pathCoordinates[pathCoordinates.length - 1].y}
                  fill={strokeColor}
                  r="4.5"
                />
              )}
            </svg>
          </div>

          {/* Chart Footer Bar */}
          <div className="flex items-center justify-between pt-1 bg-surface-muted/60 p-2.5 rounded-lg text-xs">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-market-up animate-pulse" />
              <span className="font-medium">Market Open</span>
            </div>

            <button
              onClick={() => onOpenSuperchart(selectedIndex.symbol)}
              className="text-primary-container font-semibold hover:underline flex items-center gap-1 text-xs cursor-pointer"
            >
              Full Superchart
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
