import React from 'react';
import { Link } from 'react-router-dom';
import { WnkLogo } from './WnkLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f4f4f2] border-t border-line text-ink pt-16 sm:pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
        {/* Navigation Grid (Figma: Logo, Explore, Support, Policies) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          {/* Col 1: WNK Logo */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <Link to="/" aria-label="WNK Automotive Home">
              <WnkLogo className="h-[44px] sm:h-[48px] w-auto" />
            </Link>
          </div>

          {/* Col 2: EXPLORE */}
          <div className="lg:col-span-3 flex flex-col items-start space-y-3">
            <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted mb-1">
              EXPLORE
            </h4>
            <Link
              to="/shop?type=Car"
              className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors"
            >
              Car wraps
            </Link>
            <Link
              to="/shop?type=Bike"
              className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors"
            >
              Bike wraps
            </Link>
            <Link
              to="/showcase"
              className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors"
            >
              Showcase
            </Link>
            <Link
              to="/custom-wrap"
              className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors"
            >
              Custom projects
            </Link>
          </div>

          {/* Col 3: SUPPORT */}
          <div className="lg:col-span-3 flex flex-col items-start space-y-3">
            <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted mb-1">
              SUPPORT
            </h4>
            <Link
              to="/help"
              className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors"
            >
              Help & FAQs
            </Link>
            <Link
              to="/help"
              className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors"
            >
              About WNK
            </Link>
          </div>

          {/* Col 4: POLICIES (Split into 2 sub-columns) */}
          <div className="lg:col-span-3 flex flex-col items-start space-y-3">
            <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted mb-1">
              POLICIES
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/policies/shipping"
                  className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors whitespace-nowrap"
                >
                  Shipping
                </Link>
                <Link
                  to="/policies/returns"
                  className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors whitespace-nowrap"
                >
                  Returns & refunds
                </Link>
                <Link
                  to="/policies/privacy"
                  className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors whitespace-nowrap"
                >
                  Privacy
                </Link>
              </div>

              <div className="flex flex-col space-y-3">
                <Link
                  to="/policies/terms"
                  className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors whitespace-nowrap"
                >
                  Terms
                </Link>
                <Link
                  to="/policies/custom-wraps"
                  className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors whitespace-nowrap"
                >
                  Custom Wraps
                </Link>
                <Link
                  to="/policies/warranty"
                  className="font-sans text-[14px] sm:text-[15px] text-ink hover:text-muted transition-colors whitespace-nowrap"
                >
                  Installation & care
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* GIANT Typographic Statement: BE UNIQUE. */}
        <div className="w-full my-10 sm:my-16 lg:my-20 flex items-baseline overflow-visible">
          <h2 className="font-sans font-black text-[9.5vw] sm:text-[10.2vw] lg:text-[10.8vw] xl:text-[145px] tracking-[-0.03em] leading-[0.9] text-ink select-none whitespace-nowrap inline-flex items-baseline pr-2">
            <span>BE UNIQUE</span>
            <span
              className="inline-block font-black select-none text-[#e61919] ml-[0.03em]"
              style={{ color: '#e61919' }}
            >
              .
            </span>
          </h2>
        </div>

        {/* Bottom Bar: © 2026 WNK AUTOMOTIVE | DESIGNED IN INDIA */}
        <div className="pt-6 border-t border-[#e2e2e0] flex items-center justify-between font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.4px] text-muted">
          <span>© 2026 WNK AUTOMOTIVE</span>
          <span>DESIGNED IN INDIA</span>
        </div>
      </div>
    </footer>
  );
};
