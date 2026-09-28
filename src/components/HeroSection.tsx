import React, { useState } from 'react';

interface HeroSectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ activeTab, onTabChange }) => {
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Global Markets');

  const tabs = [
    { id: 'indices', label: 'Indices', targetSection: 'section-indices' },
    { id: 'us-stocks', label: 'US stocks', targetSection: 'section-stocks' },
    { id: 'world-stocks', label: 'World stocks', targetSection: 'section-indices' },
    { id: 'crypto', label: 'Crypto', targetSection: 'section-crypto' },
    { id: 'futures', label: 'Futures', targetSection: 'section-commodities' },
    { id: 'forex', label: 'Forex', targetSection: 'section-commodities' },
    { id: 'bonds', label: 'Government bonds', targetSection: 'section-macro' },
    { id: 'corporate-bonds', label: 'Corporate bonds', targetSection: 'section-macro' },
    { id: 'etfs', label: 'ETFs', targetSection: 'section-stocks' },
    { id: 'economy', label: 'Economy', targetSection: 'section-macro' },
  ];

  const regions = ['Global Markets', 'North America', 'Europe / EMEA', 'Asia-Pacific', 'Emerging Markets'];

  const handleTabClick = (tabId: string, sectionId: string) => {
    onTabChange(tabId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-5 pt-4 pb-2">
      {/* Title with dropdown indicator */}
      <div className="relative">
        <button
          onClick={() => setRegionMenuOpen(!regionMenuOpen)}
          className="group inline-flex items-center gap-1.5 cursor-pointer select-none border-none bg-transparent hover:opacity-85 transition-opacity"
          type="button"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary tracking-tight leading-tight">
            {selectedRegion === 'Global Markets' ? 'Markets, everywhere' : selectedRegion}
          </h1>
          <span className="material-symbols-outlined text-[32px] sm:text-[40px] text-text-primary mt-1 transition-transform duration-200 group-hover:translate-y-0.5">
            keyboard_arrow_down
          </span>
        </button>

        {regionMenuOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-surface-base rounded-xl shadow-xl border border-border-hairline py-1.5 z-30">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => {
                  setSelectedRegion(region);
                  setRegionMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-surface-muted transition-colors flex items-center justify-between ${
                  selectedRegion === region ? 'text-primary-container font-bold bg-surface-muted/50' : 'text-text-primary'
                }`}
              >
                <span>{region}</span>
                {selectedRegion === region && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Segmented Filter Pills Tab Bar */}
      <div className="w-full overflow-x-auto no-scrollbar pb-1">
        <div className="inline-flex items-center justify-center gap-1 p-1 bg-surface-muted rounded-full mx-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id, tab.targetSection)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-surface-base text-text-primary shadow-xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-container/60'
                }`}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
