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

      {/* Black Features & Benefits Banner */}
      <div className="w-full bg-[#0d0d0d] text-white p-6 sm:p-10 border border-ink">
        <span className="font-mono text-[11px] uppercase tracking-[0.5px] text-white/60 block mb-6">
          FEATURES & BENEFITS
        </span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* 1. Easy Application */}
          <div className="flex flex-col items-start space-y-3">
            <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e61919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <span className="font-sans font-medium text-[15px] sm:text-[16px] text-white leading-snug">
              Easy<br />Application
            </span>
          </div>

          {/* 2. UV Resistant */}
          <div className="flex flex-col items-start space-y-3">
            <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e61919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <span className="font-sans font-medium text-[15px] sm:text-[16px] text-white leading-snug">
              UV<br />Resistant
            </span>
          </div>

          {/* 3. Scratch Resistant */}
          <div className="flex flex-col items-start space-y-3">
            <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e61919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="font-sans font-medium text-[15px] sm:text-[16px] text-white leading-snug">
              Scratch<br />Resistant
            </span>
          </div>

          {/* 4. Residue-Free Removal */}
          <div className="flex flex-col items-start space-y-3">
            <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e61919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <span className="font-sans font-medium text-[15px] sm:text-[16px] text-white leading-snug">
              Residue-Free<br />Removal
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Two-Column Information (Installation, Care, Materials, Colour note) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 pt-4">
        {/* Left Column: Installation, Care, Colour note */}
        <div className="space-y-8">
          <div>
            <h4 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink mb-2">
              Installation
            </h4>
            <p className="font-sans text-[14px] text-secondary leading-relaxed">
              Apply to a clean, dry surface free from wax and grease. Professional installation is recommended. Check surface suitability before applying over PPF, ceramic coating or repainted panels.
            </p>
          </div>

          <div>
            <h4 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink mb-2">
              Care
            </h4>
            <p className="font-sans text-[14px] text-secondary leading-relaxed">
              Wash gently with mild vehicle shampoo and a soft cloth. Avoid harsh solvents, abrasive cleaners and pressure-washer jets directed at the edges.
            </p>
          </div>

          <div>
            <h4 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink mb-2">
              Colour note
            </h4>
            <p className="font-sans text-[14px] text-secondary leading-relaxed">
              Printed colours may vary slightly from your screen and with lighting, finish and the vehicle's base colour.
            </p>
          </div>
        </div>

        {/* Right Column: Materials */}
        <div className="space-y-8">
          <div>
            <h4 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink mb-2">
              Materials
            </h4>
            <p className="font-sans text-[14px] text-secondary leading-relaxed mb-4">
              We use high-quality cast films from brands including Arlon, Avery, 3M and Hexis. Material is selected to suit the design and application.
            </p>
            <p className="font-sans text-[14px] text-secondary leading-relaxed">
              Quality films help deliver clear print detail, consistent colour and a smooth finish.
            </p>
          </div>

          <div className="p-5 bg-surface border border-line space-y-2 font-mono text-[12px] text-secondary">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="uppercase text-muted">Durability:</span>
              <span className="text-ink font-medium">3 to 5 Years Outdoor</span>
            </div>
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="uppercase text-muted">Adhesive:</span>
              <span className="text-ink font-medium">Micro Air-Release Matrix</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="uppercase text-muted">Origin:</span>
              <span className="text-ink font-medium">Engineered in Pune Studio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

