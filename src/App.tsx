import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TickerRibbon } from './components/TickerRibbon';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { StocksSection } from './components/StocksSection';
import { CryptoSection } from './components/CryptoSection';
import { CommoditiesForexSection } from './components/CommoditiesForexSection';
import { MacroCalendarSection } from './components/MacroCalendarSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SuperchartModal } from './components/SuperchartModal';
import { AssetDetailModal } from './components/AssetDetailModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { GetStartedModal } from './components/GetStartedModal';
import { MarketItem } from './types/market';
import { PRIMARY_INDICES, HIGHEST_VOLUME_STOCKS, CRYPTO_ASSETS } from './data/mockMarketData';

export default function App() {
  const [activeTab, setActiveTab] = useState('indices');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSuperchartOpen, setIsSuperchartOpen] = useState(false);
  const [superchartSymbol, setSuperchartSymbol] = useState('SPX');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<MarketItem | { symbol: string; name: string } | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // Watchlist state (default with key symbols)
  const [watchlist, setWatchlist] = useState<string[]>(['SPX', 'NVDA', 'BTCUSD', 'TSLA', 'AAPL']);

  const handleToggleWatchlist = (symbol: string) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const handleOpenSuperchart = (symbol: string) => {
    setSuperchartSymbol(symbol);
    setIsSuperchartOpen(true);
  };

  const handleSelectSymbol = (symbol: string) => {
    // Find asset details across data sources
    const found =
      PRIMARY_INDICES.find((i) => i.symbol === symbol) ||
      HIGHEST_VOLUME_STOCKS.find((s) => s.symbol === symbol) ||
      CRYPTO_ASSETS.find((c) => c.symbol === symbol);

    if (found) {
      setSelectedAsset(found);
    } else {
      setSelectedAsset({ symbol, name: `${symbol}` });
    }
    setIsDetailModalOpen(true);
  };

  const handleSelectStock = (item: MarketItem | { symbol: string; name: string }) => {
    setSelectedAsset(item);
    setIsDetailModalOpen(true);
  };

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-surface-base text-text-primary flex flex-col font-sans">
      {/* 1. Fixed Top Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
      />

      {/* Main Content Area (padding-top 64px for fixed header) */}
      <main className="w-full pt-16 flex-1 flex flex-col">
        {/* 2. Top Global Streaming Ticker Ribbon */}
        <TickerRibbon onSelectSymbol={handleSelectSymbol} />

        {/* 3. Main Container Wrapper */}
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-10">
          {/* Hero Section: Markets, Everywhere + Category Filter Tabs */}
          <HeroSection
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* Section 1: Indices Overview & Interactive Detail Chart */}
          <IndicesSection
            onOpenSuperchart={handleOpenSuperchart}
            onSelectSymbol={handleSelectSymbol}
          />

          {/* Section 2: US Stocks & Market Movers Dense Bento */}
          <StocksSection onSelectStock={handleSelectStock} />

          {/* Section 3: Crypto & World Enterprise Rankings */}
          <CryptoSection onSelectAsset={handleSelectStock} />

          {/* Section 4: Futures, Commodities & Currencies */}
          <CommoditiesForexSection onSelectAsset={handleSelectStock} />

          {/* Section 5: Macro Heatmap & Earnings Calendar */}
          <MacroCalendarSection onSelectSymbol={handleSelectSymbol} />
        </div>
      </main>

      {/* 4. Complete TradingView Directory Footer */}
      <Footer />

      {/* 5. Modals and Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />

      <SuperchartModal
        symbol={superchartSymbol}
        isOpen={isSuperchartOpen}
        onClose={() => setIsSuperchartOpen(false)}
      />

      <AssetDetailModal
        item={selectedAsset}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onOpenSuperchart={handleOpenSuperchart}
        isWatchlisted={selectedAsset ? watchlist.includes(selectedAsset.symbol) : false}
        onToggleWatchlist={handleToggleWatchlist}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemoveFromWatchlist={handleToggleWatchlist}
        onSelectSymbol={handleSelectSymbol}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
