import React from 'react';

export const ProductFeaturesSection: React.FC = () => {
  return (
    <div className="w-full mt-14 pt-12 border-t border-line space-y-10">
      {/* Title */}
      <div>
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
          ENGINEERED IN PUNE / STUDIO QUALITY
        </span>
        <h2 className="font-sans font-medium text-[28px] sm:text-[36px] text-ink leading-tight">
          Give your vehicle a look that's uniquely yours<span className="text-[#e61919]">.</span>
        </h2>
      </div>

      {/* Black Features & Benefits Strip — 3 Horizontal Items with Big Icons */}
      <div className="w-full bg-[#0d0d0d] text-white p-6 sm:p-8 lg:p-10 border border-ink">
        <span className="font-mono text-[11px] uppercase tracking-[0.5px] text-white/60 block mb-6">
          FEATURES & BENEFITS
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* 1. UV Resistant */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 border border-white/20 bg-white/[0.04] flex items-center justify-center">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 stroke-[#e61919]"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
            <div>
              <span className="font-sans font-medium text-[16px] sm:text-[17px] text-white leading-tight block">
                UV Resistant
              </span>
              <span className="font-mono text-[11px] text-white/50 block mt-0.5">
                Fade-proof protection
              </span>
            </div>
          </div>

          {/* 2. Easy Application */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 border border-white/20 bg-white/[0.04] flex items-center justify-center">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 stroke-[#e61919]"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m14 7 3-3 4 4-3 3" />
                <path d="m11 10-6.5 6.5a2.12 2.12 0 0 0 3 3L14 13" />
                <path d="M4 20l4-4" />
                <path d="M15 6l3 3" />
              </svg>
            </div>
            <div>
              <span className="font-sans font-medium text-[16px] sm:text-[17px] text-white leading-tight block">
                Easy Application
              </span>
              <span className="font-mono text-[11px] text-white/50 block mt-0.5">
                Bubble-free dry install
              </span>
            </div>
          </div>

          {/* 3. Residue-Free Removal */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 border border-white/20 bg-white/[0.04] flex items-center justify-center">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 stroke-[#e61919]"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <polyline points="9 10 12 13 16 9" />
              </svg>
            </div>
            <div>
              <span className="font-sans font-medium text-[16px] sm:text-[17px] text-white leading-tight block">
                Residue-Free Removal
              </span>
              <span className="font-mono text-[11px] text-white/50 block mt-0.5">
                Clean release on OEM paint
              </span>
            </div>
          </div>
        </div>

        {/* Asterisk Conditions Apply in lower-right of black box */}
        <div className="mt-5 pt-3 border-t border-white/10 text-right">
          <span className="font-mono text-[10px] text-white/50 tracking-wider">
            *Conditions apply
          </span>
        </div>
      </div>

      {/* Editorial Information: Installation, Materials, Care & Colour Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-8 pt-4">
        {/* Row 1 Col 1: Installation */}
        <div>
          <h4 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink mb-2">
            Installation
          </h4>
          <p className="font-sans text-[14px] text-secondary leading-relaxed">
            Apply to a clean, dry surface free from wax and grease. Professional installation is recommended. Check surface suitability before applying over PPF, ceramic coating or repainted panels.
          </p>
        </div>

        {/* Row 1 Col 2: Materials */}
        <div>
          <h4 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink mb-2">
            Materials
          </h4>
          <p className="font-sans text-[14px] text-secondary leading-relaxed">
            We use high-quality cast films from brands including Arlon, Avery, 3M and Starcast. Material is selected to suit the design and application.
          </p>
        </div>

        {/* Row 2 Col 1: Care */}
        <div className="pt-1 md:pt-3">
          <h4 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink mb-2">
            Care
          </h4>
          <p className="font-sans text-[14px] text-secondary leading-relaxed">
            Wash gently with mild vehicle shampoo and a soft cloth. Avoid harsh solvents, abrasive cleaners and pressure-washer jets directed at the edges.
          </p>
        </div>

        {/* Row 2 Col 2: Colour note */}
        <div className="pt-1 md:pt-3">
          <h4 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink mb-2">
            Colour note
          </h4>
          <p className="font-sans text-[14px] text-secondary leading-relaxed">
            Printed colours may vary slightly from your screen and with lighting, finish and the vehicle's base colour.
          </p>
        </div>
      </div>
    </div>
  );
};

