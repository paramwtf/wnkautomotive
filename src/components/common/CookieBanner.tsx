import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('wnk_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('wnk_cookie_consent', 'accepted');
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleReject = () => {
    localStorage.setItem('wnk_cookie_consent', 'rejected');
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-paper/95 backdrop-blur-md border-t border-line shadow-overlay">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted mb-1">
            PRIVACY & COOKIE PREFERENCES
          </p>
          <p className="font-sans text-[13px] md:text-[14px] text-secondary leading-relaxed">
            WNK uses minimal essential cookies to remember vehicle selections and cart configurations. No personal telemetry is sold to third parties.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="flex-1 md:flex-none h-[42px] px-4 font-mono text-[12px] text-ink border border-field hover:border-ink"
          >
            Preferences
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none h-[42px] px-6 font-mono text-[12px] bg-ink text-white hover:bg-charcoal"
          >
            Accept All
          </button>
        </div>
      </div>

      {showPreferences && (
        <div className="max-w-[1440px] mx-auto mt-4 pt-4 border-t border-line grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px]">
          <div className="p-3 bg-surface border border-line">
            <span className="font-mono font-medium block text-ink">Essential Cookies</span>
            <span className="text-muted block mt-1 text-[12px]">Vehicle selection, cart persistence. Always active.</span>
          </div>
          <div className="p-3 bg-surface border border-line flex items-center justify-between">
            <div>
              <span className="font-mono font-medium block text-ink">Analytics Cookies</span>
              <span className="text-muted block mt-1 text-[12px]">Anonymous page performance metrics.</span>
            </div>
            <input type="checkbox" defaultChecked className="size-4 accent-ink" />
          </div>
          <div className="p-3 bg-surface border border-line flex items-center justify-between">
            <div>
              <span className="font-mono font-medium block text-ink">Marketing Cookies</span>
              <span className="text-muted block mt-1 text-[12px]">External campaign attribution.</span>
            </div>
            <input type="checkbox" className="size-4 accent-ink" />
          </div>
        </div>
      )}
    </div>
  );
};

