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
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-[#0d0d0d] text-white border-t border-[#262626] shadow-2xl">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.4px] text-white/50 mb-1">
            PRIVACY & COOKIE PREFERENCES
          </p>
          <p className="font-sans text-[13px] md:text-[14px] text-white/80 leading-relaxed">
            WNK uses minimal essential cookies to remember vehicle selections and cart configurations. No personal telemetry is sold to third parties.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={handleReject}
            className="flex-1 md:flex-none h-[42px] px-5 font-mono text-[12px] text-white/80 border border-white/20 hover:border-white hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="flex-1 md:flex-none h-[42px] px-4 font-mono text-[12px] text-white/80 border border-white/20 hover:border-white hover:text-white transition-colors"
          >
            Preferences
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none h-[42px] px-6 font-mono text-[12px] bg-white text-black hover:bg-[#e2e2e0] transition-colors font-medium"
          >
            Accept All
          </button>
        </div>
      </div>

      {showPreferences && (
        <div className="max-w-[1440px] mx-auto mt-4 pt-4 border-t border-[#262626] grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px]">
          <div className="p-3 bg-[#171717] border border-[#2b2b2b]">
            <span className="font-mono font-medium block text-white">Essential Cookies</span>
            <span className="text-white/60 block mt-1 text-[12px]">Vehicle selection, cart persistence. Always active.</span>
          </div>
          <div className="p-3 bg-[#171717] border border-[#2b2b2b] flex items-center justify-between">
            <div>
              <span className="font-mono font-medium block text-white">Analytics Cookies</span>
              <span className="text-white/60 block mt-1 text-[12px]">Anonymous page performance metrics.</span>
            </div>
            <input type="checkbox" defaultChecked className="size-4 accent-white" />
          </div>
          <div className="p-3 bg-[#171717] border border-[#2b2b2b] flex items-center justify-between">
            <div>
              <span className="font-mono font-medium block text-white">Marketing Cookies</span>
              <span className="text-white/60 block mt-1 text-[12px]">External campaign attribution.</span>
            </div>
            <input type="checkbox" className="size-4 accent-white" />
          </div>
        </div>
      )}
    </div>
  );
};

