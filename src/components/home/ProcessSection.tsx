import React from 'react';
import { Link } from 'react-router-dom';

export const ProcessSection: React.FC = () => {
  return (
    <section className="w-full bg-[#010101] text-white py-16 sm:py-24 border-b border-line">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
        {/* Eyebrow */}
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-white/60 block mb-3">
          THE PROCESS
        </span>

        {/* Heading: How it works. */}
        <h2 className="font-sans font-medium text-[44px] sm:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-1.8px] text-white mb-3">
          How it works<span className="text-[#e61919]">.</span>
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-[16px] sm:text-[18px] text-white/80 mb-14">
          Your next look, in three steps.
        </p>

        {/* 3 Columns Grid with Top Step Line */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 mb-14">
          {/* Step 01 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[13px] text-white/90">01</span>
              <div className="flex-1 h-[1px] bg-white/25" />
            </div>
            <h3 className="font-sans font-medium text-[22px] sm:text-[24px] text-white mb-3">
              Find your fit.
            </h3>
            <p className="font-sans text-[14px] sm:text-[15px] text-white/70 leading-relaxed">
              Select your car or bike, then choose its make, model and year.
            </p>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[13px] text-white/90">02</span>
              <div className="flex-1 h-[1px] bg-white/25" />
            </div>
            <h3 className="font-sans font-medium text-[22px] sm:text-[24px] text-white mb-3">
              Make it yours.
            </h3>
            <p className="font-sans text-[14px] sm:text-[15px] text-white/70 leading-relaxed">
              Choose your design, colour, finish and coverage, or ask WNK for a custom wrap.
            </p>
          </div>

          {/* Step 03 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[13px] text-white/90">03</span>
              <div className="flex-1 h-[1px] bg-white/25" />
            </div>
            <h3 className="font-sans font-medium text-[22px] sm:text-[24px] text-white mb-3">
              Review and order.
            </h3>
            <p className="font-sans text-[14px] sm:text-[15px] text-white/70 leading-relaxed">
              Confirm your vehicle details and delivery information. WNK then prepares and dispatches your kit.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/shop"
            className="h-[48px] px-7 bg-white text-[#010101] font-sans text-[14px] font-medium hover:bg-[#e8e8e8] transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore the shop</span>
            <span className="font-mono">→</span>
          </Link>
          <Link
            to="/custom-wrap"
            className="h-[48px] px-7 bg-transparent border border-white/40 text-white font-sans text-[14px] font-medium hover:border-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <span>Create a custom wrap</span>
            <span className="font-mono">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
