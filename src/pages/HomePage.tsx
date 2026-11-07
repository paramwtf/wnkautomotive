import React from 'react';
import { Link } from 'react-router-dom';
import { VideoHero } from '../components/home/VideoHero';
import { VehicleFinder } from '../components/home/VehicleFinder';
import { ProcessSection } from '../components/home/ProcessSection';
import { ReviewCarousel } from '../components/home/ReviewCarousel';
import { FaqAccordion } from '../components/home/FaqAccordion';
import { ProductCard } from '../components/common/ProductCard';
import { PRODUCTS } from '../data/products';
import { FAQS } from '../data/faqs';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4); // First 4 flagship motorcycle wraps
  const sampleFaqs = FAQS.slice(0, 4);

  return (
    <div className="w-full bg-paper">
      {/* 1. Master Figma Hero Section with Video Hero (Color-matched pure white #FFFFFF) */}
      <section className="relative w-full bg-white border-b border-line overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20">
        {/* Title area */}
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] text-center mb-6 sm:mb-8">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted mb-4 sm:mb-6">
            WNK / VEHICLE WRAPS / DESIGN THAT MOVES
          </p>
          <h1 className="font-sans font-medium text-[48px] sm:text-[68px] lg:text-[84px] leading-[1.05] tracking-[-2.4px] text-ink">
            Make it yours<span className="text-[#e61919]">.</span>
          </h1>
        </div>

        {/* Video Hero — 100% Color-matched with pure white video background */}
        <VideoHero />

        {/* Subtext and CTA Action Buttons */}
        <div className="relative max-w-xl mx-auto px-5 text-center mt-10 sm:mt-12 flex flex-col items-center">
          <p className="font-sans text-[16px] sm:text-[18px] text-secondary leading-[1.4] mb-8">
            Choose a ready-made wrap or create a custom design<br className="hidden sm:inline" /> for your car or bike.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/shop"
              className="h-[52px] px-7 bg-[#010101] text-white font-sans text-[14px] font-medium hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore the shop</span>
              <span className="font-mono">→</span>
            </Link>
            <Link
              to="/custom-wrap"
              className="h-[52px] px-7 bg-white text-[#010101] border border-[#cecece] font-sans text-[14px] font-medium hover:border-ink transition-colors flex items-center justify-center gap-2"
            >
              <span>Create a custom wrap</span>
              <span className="font-mono">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Interactive Vehicle Finder Section */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] py-12 lg:py-16">
        <VehicleFinder />
      </section>

      {/* 4. Featured Bestsellers Grid */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] py-12 lg:py-16 border-t border-line">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
              CURATED SELECTION / POPULAR KITS
            </span>
            <h2 className="font-sans font-medium text-[28px] md:text-[40px] text-ink leading-tight">
              Best Sellers<span className="text-red">.</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-mono text-[13px] text-ink hover:text-muted flex items-center gap-1.5 self-start sm:self-auto underline underline-offset-4"
          >
            <span>View all {PRODUCTS.length} designs</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Outside the lines. Section */}
      <section className="w-full bg-white border-y border-line py-16 sm:py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Eyebrow, Outside the lines., Description, CTA */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted mb-4 sm:mb-6 block">
                YOUR IDEA. OUR DESIGN.
              </span>
              <h2 className="font-sans font-medium text-[48px] sm:text-[64px] lg:text-[76px] leading-[1.02] tracking-[-2px] text-ink mb-6">
                Outside<br />
                the lines<span className="text-[#e61919]">.</span>
              </h2>
              <p className="font-sans text-[16px] sm:text-[18px] text-secondary leading-relaxed max-w-md mb-8">
                A favourite world. A racing influence. An idea that only makes sense to you. Let's turn it into a wrap.
              </p>
              <Link
                to="/custom-wrap"
                className="h-[52px] px-8 bg-[#010101] text-white font-sans text-[14px] font-medium hover:bg-charcoal transition-colors inline-flex items-center gap-2"
              >
                <span>Create a custom wrap</span>
                <span className="font-mono">→</span>
              </Link>
            </div>

            {/* Right Column: Aprilia RS 457 Mayhem Edition */}
            <div className="lg:col-span-7 flex items-center justify-center w-full">
              <div className="w-full aspect-[16/10] bg-[#f4f4f2] border border-line overflow-hidden relative shadow-sm">
                <img
                  src="/assets/images/rs457/web/rs457-mayhem-01.webp"
                  alt="Aprilia RS 457 Mayhem Edition"
                  className="w-full h-full object-cover object-center filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Production Process */}
      <ProcessSection />

      {/* 7. Client Reviews Infinite Marquee */}
      <section className="w-full py-16 sm:py-20 overflow-hidden">
        <ReviewCarousel />
      </section>

      {/* 8. FAQ Preview Section */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] py-16 border-t border-line">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
              QUESTIONS & ASSISTANCE
            </span>
            <h2 className="font-sans font-medium text-[28px] md:text-[36px] text-ink leading-tight mb-4">
              Frequently Asked Questions<span className="text-red">.</span>
            </h2>
            <p className="font-sans text-[15px] text-secondary leading-relaxed mb-6">
              Learn about our cast vinyl specifications, bubble-free dry install matrix, and nationwide delivery protocols.
            </p>
            <Link
              to="/help"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-ink underline underline-offset-4 hover:text-muted"
            >
              <span>View all questions & support channels</span>
              <span>→</span>
            </Link>
          </div>

          <div className="lg:col-span-8">
            <FaqAccordion items={sampleFaqs} />
          </div>
        </div>
      </section>

      {/* 9. Final Call-to-Action Banner */}
      <section className="w-full bg-ink text-white py-20 px-5 sm:px-8 lg:px-[57.6px] border-t border-line">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-white/60 block mb-2">
              START YOUR TRANSFORMATION
            </span>
            <h2 className="font-sans font-medium text-[36px] md:text-[56px] leading-tight tracking-tight">
              Ready to redefine your ride<span className="text-red">?</span>
            </h2>
            <p className="font-sans text-[16px] text-white/80 max-w-xl mt-2">
              Explore the complete catalogue or commission a one-off bespoke project with WNK Automotive studio.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="h-[52px] px-8 bg-white text-ink hover:bg-surface font-mono text-[13px] flex items-center justify-center gap-2"
            >
              <span>Explore Shop</span>
              <span>→</span>
            </Link>
            <a
              href="https://wa.me/919284247387?text=Hi%20WNK%20Automotive%2C%20I%20want%20to%20discuss%20a%20wrap%20for%20my%20vehicle"
              target="_blank"
              rel="noreferrer"
              className="h-[52px] px-8 bg-transparent border border-white text-white hover:bg-white/10 font-mono text-[13px] flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

