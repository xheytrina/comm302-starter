import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-base border-t border-border-hairline py-12 mt-12 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase tracking-wider text-text-secondary font-bold">
              Products
            </h3>
            <nav className="flex flex-col gap-2">
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Supercharts</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Pine Script™</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Stock Screener</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Crypto Screener</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Forex Screener</a>
            </nav>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase tracking-wider text-text-secondary font-bold">
              Screeners & Heatmaps
            </h3>
            <nav className="flex flex-col gap-2">
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Stock Heatmaps</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Crypto Heatmaps</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">ETF Screener</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Bonds Screener</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Technical Ratings</a>
            </nav>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase tracking-wider text-text-secondary font-bold">
              Calendars
            </h3>
            <nav className="flex flex-col gap-2">
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Economic Calendar</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Earnings Calendar</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Dividends Calendar</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">IPO Calendar</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Stock Splits</a>
            </nav>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase tracking-wider text-text-secondary font-bold">
              Community
            </h3>
            <nav className="flex flex-col gap-2">
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Trading Ideas</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Educational Ideas</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Community Scripts</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Live Streams</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">House Rules</a>
            </nav>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase tracking-wider text-text-secondary font-bold">
              Tools & Subscriptions
            </h3>
            <nav className="flex flex-col gap-2">
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Pricing & Plans</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Desktop App</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Mobile Apps</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Broker Integration</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Financial Widgets</a>
            </nav>
          </div>

          {/* Column 6 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase tracking-wider text-text-secondary font-bold">
              Company
            </h3>
            <nav className="flex flex-col gap-2">
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">About Us</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Features</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Careers</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Press & Media</a>
              <a className="text-xs text-text-primary hover:text-primary-container transition-colors" href="#">Security</a>
            </nav>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 border-t border-border-hairline flex flex-col md:flex-row items-center justify-between gap-4 text-text-secondary text-xs">
          <div>
            © 2024 TradingView, Inc. All rights reserved. Selected market data provided by ICE Data Services.
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-text-primary transition-colors" href="#">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
