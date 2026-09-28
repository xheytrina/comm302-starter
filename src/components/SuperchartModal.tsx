import React, { useState, useMemo } from 'react';

interface SuperchartModalProps {
  symbol: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SuperchartModal: React.FC<SuperchartModalProps> = ({
  symbol,
  isOpen,
  onClose,
}) => {
  const [chartType, setChartType] = useState<'candles' | 'area' | 'line'>('candles');
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W'>('1D');
  const [showVolume, setShowVolume] = useState(true);
  const [showRsi, setShowRsi] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('cursor');
  const [mousePos, setMousePos] = useState<{ x: number; y: number; price: number; date: string } | null>(null);

  // Determine base price based on symbol
  const symbolInfo = useMemo(() => {
    if (symbol === 'SPX') return { name: 'S&P 500 Index', basePrice: 5864.67, prefix: '' };
    if (symbol === 'NDX') return { name: 'Nasdaq 100 Index', basePrice: 20412.30, prefix: '' };
    if (symbol === 'DJI') return { name: 'Dow Jones Industrial', basePrice: 42863.86, prefix: '' };
    if (symbol === 'BTCUSD') return { name: 'Bitcoin / US Dollar', basePrice: 84250.00, prefix: '$' };
    if (symbol === 'NVDA') return { name: 'NVIDIA Corporation', basePrice: 138.25, prefix: '$' };
    if (symbol === 'TSLA') return { name: 'Tesla Inc', basePrice: 220.70, prefix: '$' };
    if (symbol === 'GOLD') return { name: 'Gold Comex', basePrice: 2684.50, prefix: '$' };
    if (symbol === 'EURUSD' || symbol === 'EUR/USD') return { name: 'EUR / USD', basePrice: 1.0845, prefix: '' };
    return { name: `${symbol} Market`, basePrice: 150.00, prefix: '$' };
  }, [symbol]);

  // Generate realistic OHLC candlesticks
  const candles = useMemo(() => {
    const count = 48;
    const base = symbolInfo.basePrice;
    const volatility = base * 0.004;
    const list = [];
    let current = base * 0.96;

    for (let i = 0; i < count; i++) {
      const open = current;
      const change = (Math.random() - 0.48) * volatility;
      const close = +(open + change).toFixed(2);
      const high = +(Math.max(open, close) + Math.random() * (volatility * 0.6)).toFixed(2);
      const low = +(Math.min(open, close) - Math.random() * (volatility * 0.6)).toFixed(2);
      const volume = Math.floor(Math.random() * 800000 + 200000);
      current = close;

      list.push({
        idx: i,
        time: `Oct ${1 + Math.floor(i / 2)}, ${10 + (i % 6)}:00`,
        open,
        high,
        low,
        close,
        volume,
        isUp: close >= open,
      });
    }
    // set last close close to basePrice
    list[list.length - 1].close = base;
    return list;
  }, [symbolInfo.basePrice, timeframe]);

  const minPrice = Math.min(...candles.map((c) => c.low)) * 0.998;
  const maxPrice = Math.max(...candles.map((c) => c.high)) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const width = 850;
  const height = 400;
  const candleSlotWidth = width / candles.length;
  const candleBodyWidth = Math.max(3, candleSlotWidth * 0.65);

  const getY = (val: number) => height - ((val - minPrice) / priceRange) * (height - 60) - 30;

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const candleIdx = Math.min(
      candles.length - 1,
      Math.max(0, Math.floor((x / rect.width) * candles.length))
    );
    const targetCandle = candles[candleIdx];
    const priceAtY = maxPrice - (y / rect.height) * priceRange;

    setMousePos({
      x,
      y,
      price: priceAtY,
      date: targetCandle ? targetCandle.time : '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="w-full max-w-6xl h-[92vh] bg-surface-base rounded-2xl shadow-2xl border border-border-hairline flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Terminal Bar */}
        <div className="h-14 bg-surface-base border-b border-border-hairline px-4 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {/* Symbol Tag */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold px-2.5 py-1 bg-surface-muted rounded-md text-text-primary border border-border-hairline">
                {symbol}
              </span>
              <span className="text-xs font-semibold text-text-secondary truncate hidden md:inline">
                {symbolInfo.name}
              </span>
            </div>

            <div className="w-[1px] h-6 bg-border-hairline hidden sm:block" />

            {/* Timeframe Selector */}
            <div className="flex items-center bg-surface-muted rounded-lg p-0.5 text-xs font-semibold">
              {(['1m', '5m', '15m', '1h', '4h', '1D', '1W'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-surface-base text-primary-container shadow-xs font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="w-[1px] h-6 bg-border-hairline hidden sm:block" />

            {/* Chart Type Toggle */}
            <div className="flex items-center bg-surface-muted rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setChartType('candles')}
                className={`p-1.5 rounded cursor-pointer ${chartType === 'candles' ? 'bg-surface-base text-primary shadow-xs' : 'text-text-secondary'}`}
                title="Candlestick Chart"
              >
                <span className="material-symbols-outlined text-[18px]">candlestick_chart</span>
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`p-1.5 rounded cursor-pointer ${chartType === 'line' ? 'bg-surface-base text-primary shadow-xs' : 'text-text-secondary'}`}
                title="Line Chart"
              >
                <span className="material-symbols-outlined text-[18px]">show_chart</span>
              </button>
              <button
                onClick={() => setChartType('area')}
                className={`p-1.5 rounded cursor-pointer ${chartType === 'area' ? 'bg-surface-base text-primary shadow-xs' : 'text-text-secondary'}`}
                title="Area Chart"
              >
                <span className="material-symbols-outlined text-[18px]">area_chart</span>
              </button>
            </div>

            {/* Indicators Toggle */}
            <div className="hidden lg:flex items-center gap-1 text-xs">
              <button
                onClick={() => setShowVolume(!showVolume)}
                className={`px-2.5 py-1 rounded-md border text-xs font-semibold cursor-pointer ${
                  showVolume
                    ? 'bg-surface-muted border-primary-container text-primary-container'
                    : 'border-border-hairline text-text-secondary'
                }`}
              >
                Volume
              </button>
              <button
                onClick={() => setShowRsi(!showRsi)}
                className={`px-2.5 py-1 rounded-md border text-xs font-semibold cursor-pointer ${
                  showRsi
                    ? 'bg-surface-muted border-primary-container text-primary-container'
                    : 'border-border-hairline text-text-secondary'
                }`}
              >
                RSI (14)
              </button>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Quick Paper Trade Buttons */}
            <div className="hidden sm:flex items-center gap-1 font-mono text-xs">
              <button 
                onClick={() => alert(`Simulated market SELL order placed for ${symbol} at $${(symbolInfo.basePrice * 0.999).toFixed(2)}`)}
                className="px-2.5 py-1 bg-market-down text-white rounded font-bold hover:opacity-90 cursor-pointer"
              >
                Sell {(symbolInfo.basePrice * 0.999).toFixed(symbolInfo.basePrice < 10 ? 4 : 2)}
              </button>
              <button 
                onClick={() => alert(`Simulated market BUY order placed for ${symbol} at $${symbolInfo.basePrice.toFixed(2)}`)}
                className="px-2.5 py-1 bg-market-up text-white rounded font-bold hover:opacity-90 cursor-pointer"
              >
                Buy {symbolInfo.basePrice.toFixed(symbolInfo.basePrice < 10 ? 4 : 2)}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface-muted text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              title="Close Superchart"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Chart Layout: Left Drawing Toolbar + Main Canvas */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Drawing Tools Sidebar */}
          <div className="w-12 bg-surface-subtle border-r border-border-hairline flex flex-col items-center py-2 gap-1.5 flex-shrink-0">
            {[
              { id: 'cursor', icon: 'near_me', label: 'Crosshair' },
              { id: 'trendline', icon: 'straighten', label: 'Trend Line' },
              { id: 'fibonacci', icon: 'format_align_justify', label: 'Fibonacci' },
              { id: 'brush', icon: 'edit', label: 'Brush' },
              { id: 'text', icon: 'title', label: 'Text Note' },
              { id: 'measure', icon: 'square_foot', label: 'Measure' },
              { id: 'trash', icon: 'delete', label: 'Clear Drawings' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  activeTool === tool.id
                    ? 'bg-surface-base text-primary-container shadow-xs border border-border-hairline'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-muted'
                }`}
                title={tool.label}
              >
                <span className="material-symbols-outlined text-[18px]">{tool.icon}</span>
              </button>
            ))}
          </div>

          {/* Interactive Chart Workspace */}
          <div className="flex-1 flex flex-col bg-surface-base relative overflow-hidden">
            {/* OHLC Status bar */}
            <div className="h-8 border-b border-border-hairline/60 px-4 flex items-center gap-4 text-xs font-mono text-text-secondary bg-surface-subtle/30">
              <span>{symbol}</span>
              <span>O: <strong className="text-text-primary">{candles[candles.length - 1].open}</strong></span>
              <span>H: <strong className="text-market-up">{candles[candles.length - 1].high}</strong></span>
              <span>L: <strong className="text-market-down">{candles[candles.length - 1].low}</strong></span>
              <span>C: <strong className="text-text-primary">{candles[candles.length - 1].close}</strong></span>
            </div>

            {/* SVG Chart Engine */}
            <div className="flex-1 relative cursor-crosshair">
              <svg
                className="w-full h-full"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePos(null)}
              >
                <defs>
                  <linearGradient id="superchartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2962ff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal price grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                  const y = height * ratio;
                  const price = maxPrice - ratio * priceRange;
                  return (
                    <g key={ratio}>
                      <line x1="0" y1={y} x2={width} y2={y} stroke="#e0e3eb" strokeDasharray="3 3" strokeWidth="0.8" />
                      <text x={width - 4} y={y - 4} fill="#6a6d78" fontSize="10" textAnchor="end" fontFamily="monospace">
                        {price.toFixed(symbolInfo.basePrice < 10 ? 4 : 2)}
                      </text>
                    </g>
                  );
                })}

                {/* Volume Bars Sub-layer */}
                {showVolume &&
                  candles.map((c, i) => {
                    const x = i * candleSlotWidth + candleSlotWidth / 2;
                    const maxVol = 1200000;
                    const barHeight = (c.volume / maxVol) * 60;
                    const y = height - barHeight;
                    return (
                      <rect
                        key={`vol-${i}`}
                        x={x - candleBodyWidth / 2}
                        y={y}
                        width={candleBodyWidth}
                        height={barHeight}
                        fill={c.isUp ? 'rgba(8, 153, 129, 0.25)' : 'rgba(242, 54, 69, 0.25)'}
                      />
                    );
                  })}

                {/* Candlesticks Layer */}
                {chartType === 'candles' &&
                  candles.map((c, i) => {
                    const x = i * candleSlotWidth + candleSlotWidth / 2;
                    const openY = getY(c.open);
                    const closeY = getY(c.close);
                    const highY = getY(c.high);
                    const lowY = getY(c.low);
                    const bodyTop = Math.min(openY, closeY);
                    const bodyHeight = Math.max(2, Math.abs(openY - closeY));
                    const color = c.isUp ? '#089981' : '#f23645';

                    return (
                      <g key={i}>
                        {/* Upper and Lower Wick */}
                        <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1.2" />
                        {/* Candle Body */}
                        <rect
                          x={x - candleBodyWidth / 2}
                          y={bodyTop}
                          width={candleBodyWidth}
                          height={bodyHeight}
                          fill={color}
                          stroke={color}
                          rx="1"
                        />
                      </g>
                    );
                  })}

                {/* Line or Area Chart Layer */}
                {chartType !== 'candles' && (
                  <>
                    {chartType === 'area' && (
                      <path
                        d={`M 0,${getY(candles[0].close)} ${candles
                          .map((c, i) => `L ${i * candleSlotWidth + candleSlotWidth / 2},${getY(c.close)}`)
                          .join(' ')} L ${width},${height} L 0,${height} Z`}
                        fill="url(#superchartGradient)"
                      />
                    )}
                    <path
                      d={`M 0,${getY(candles[0].close)} ${candles
                        .map((c, i) => `L ${i * candleSlotWidth + candleSlotWidth / 2},${getY(c.close)}`)
                        .join(' ')}`}
                      fill="none"
                      stroke="#2962ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {/* Crosshair Cursor & Axis Badges */}
                {mousePos && (
                  <g>
                    {/* Vertical line */}
                    <line x1={mousePos.x} y1="0" x2={mousePos.x} y2={height} stroke="#737687" strokeDasharray="3 3" strokeWidth="1" />
                    {/* Horizontal line */}
                    <line x1="0" y1={mousePos.y} x2={width} y2={mousePos.y} stroke="#737687" strokeDasharray="3 3" strokeWidth="1" />

                    {/* Price tag on right edge */}
                    <rect x={width - 70} y={mousePos.y - 10} width="70" height="20" fill="#131722" rx="3" />
                    <text x={width - 5} y={mousePos.y + 4} fill="#ffffff" fontSize="11" textAnchor="end" fontFamily="monospace">
                      {mousePos.price.toFixed(symbolInfo.basePrice < 10 ? 4 : 2)}
                    </text>

                    {/* Date tag at bottom */}
                    <rect x={mousePos.x - 45} y={height - 20} width="90" height="18" fill="#131722" rx="3" />
                    <text x={mousePos.x} y={height - 7} fill="#ffffff" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {mousePos.date}
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
