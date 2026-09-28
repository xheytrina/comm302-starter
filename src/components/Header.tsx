import React, { useState } from 'react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenGetStarted,
  onOpenWatchlist,
  watchlistCount,
}) => {
  const [activeNav, setActiveNav] = useState('markets');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const languages = ['EN', 'ES', 'DE', 'JA', 'FR', 'ZH', 'IT'];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-base border-b border-border-hairline select-none">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Brand + Primary Nav */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img 
              alt="TradingView Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1UYyPFVNlMx2X88RozyfG0skdaswg8o4zOpxPaQMBkibh7TNkHyvyfRXCw2OzuFdUxDc5vlrJo0J5xBvj99R60f2ZDpS4AKSW6EtZCAMVVPpWbrCscFtKxDmuN7CZyvLwobsAVOnb0hlIllina7C0Eii0ERz0omkTJGPk9R_B1lEIqb0xpWYJYpzQZYtknGP12G8A5XbbXVQfyUJC4o99ylKKTqQw9nPQtCm5PJuobfamjBFOXC7jpVkHP_" 
            />
            <span className="font-bold text-lg tracking-tight text-text-primary">
              TradingView
            </span>
          </div>

          <nav className="hidden xl:flex items-center gap-6 h-16">
            <button
              onClick={() => setActiveNav('markets')}
              className={`h-16 flex items-center transition-colors text-sm font-semibold cursor-pointer ${
                activeNav === 'markets' 
                  ? 'text-primary-container border-b-2 border-primary-container' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Markets
            </button>
            <button
              onClick={() => setActiveNav('products')}
              className={`h-16 flex items-center transition-colors text-sm font-medium cursor-pointer ${
                activeNav === 'products' 
                  ? 'text-primary-container border-b-2 border-primary-container' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveNav('community')}
              className={`h-16 flex items-center transition-colors text-sm font-medium cursor-pointer ${
                activeNav === 'community' 
                  ? 'text-primary-container border-b-2 border-primary-container' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Community
            </button>
            <button
              onClick={() => setActiveNav('brokers')}
              className={`h-16 flex items-center transition-colors text-sm font-medium cursor-pointer ${
                activeNav === 'brokers' 
                  ? 'text-primary-container border-b-2 border-primary-container' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Brokers
            </button>
            <button
              onClick={() => setActiveNav('more')}
              className={`h-16 flex items-center transition-colors text-sm font-medium cursor-pointer ${
                activeNav === 'more' 
                  ? 'text-primary-container border-b-2 border-primary-container' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              More
            </button>
          </nav>
        </div>

        {/* Center: Search Trigger */}
        <div className="flex-1 max-w-md mx-3 hidden md:block">
          <div 
            onClick={onOpenSearch}
            className="relative flex items-center bg-surface-muted hover:bg-surface-container transition-colors h-10 px-3 rounded-full cursor-pointer border border-border-hairline group"
          >
            <span className="material-symbols-outlined text-text-secondary text-[20px] mr-2 group-hover:text-primary-container transition-colors">
              search
            </span>
            <span className="text-sm text-text-secondary flex-1 truncate">
              Search markets, stocks, crypto or ideas
            </span>
            <div className="flex items-center gap-0.5 bg-surface-base px-2 py-0.5 rounded border border-border-hairline text-text-secondary text-xs shadow-sm font-mono">
              <kbd>Ctrl</kbd>
              <span>+</span>
              <kbd>K</kbd>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Mobile search trigger */}
          <button 
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-full hover:bg-surface-muted text-text-secondary"
            title="Search"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-2 rounded-full hover:bg-surface-muted text-text-secondary hover:text-text-primary transition-colors"
            title="My Watchlist"
          >
            <span className="material-symbols-outlined text-[20px]">star</span>
            {watchlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary-container text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-surface-muted text-text-primary text-xs font-semibold transition-colors cursor-pointer border border-transparent hover:border-border-hairline" 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-text-secondary">language</span>
              <span>{currentLang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-surface-base rounded-xl shadow-lg border border-border-hairline py-1 z-50 animate-in fade-in zoom-in-95">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-surface-muted transition-colors flex items-center justify-between ${
                      currentLang === lang ? 'text-primary-container font-bold bg-surface-muted/50' : 'text-text-primary'
                    }`}
                  >
                    <span>{lang}</span>
                    {currentLang === lang && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Get Started CTA */}
          <button 
            onClick={onOpenGetStarted}
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-full bg-gradient-to-r from-primary-container via-surface-tint to-purple-600 text-white font-medium text-xs shadow-sm hover:opacity-95 transition-opacity cursor-pointer" 
            type="button"
          >
            Get started
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <button 
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary-container/30 transition-all text-white"
              title="User Account"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-base rounded-xl shadow-xl border border-border-hairline py-2 z-50">
                <div className="px-4 py-2 border-b border-border-hairline">
                  <div className="font-semibold text-xs text-text-primary">Guest Trader</div>
                  <div className="text-[11px] text-text-secondary">Pro Trader Plan Active</div>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onOpenWatchlist();
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-text-primary hover:bg-surface-muted flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">bookmark</span>
                    My Watchlist ({watchlistCount})
                  </button>
                  <button
                    onClick={() => {
                      onOpenSearch();
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-text-primary hover:bg-surface-muted flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">search</span>
                    Symbol Search
                  </button>
                  <button
                    onClick={() => {
                      onOpenGetStarted();
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-text-primary hover:bg-surface-muted flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">login</span>
                    Sign in / Register
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
