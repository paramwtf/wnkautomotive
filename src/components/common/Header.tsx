import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WnkLogo } from './WnkLogo';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalQuantity } = useCart();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Custom Wrap', path: '/custom-wrap' },
    { label: 'Showcase', path: '/showcase' },
    { label: 'Help & Contact', path: '/help' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-paper border-b border-line">
        <div className="max-w-[1440px] mx-auto h-[80px] lg:h-[96px] px-5 sm:px-8 lg:px-[57.6px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <WnkLogo className="h-[38px] lg:h-[48px] w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] text-ink font-normal font-sans" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-2 relative hover:text-charcoal ${
                    active ? 'underline decoration-1 underline-offset-8 font-medium' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Trigger (44x44 hit target) */}
            <button
              onClick={onOpenSearch}
              className="size-[44px] flex items-center justify-center hover:bg-surface transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
              aria-label="Search designs"
            >
              <img src="/assets/icons/icon-search.svg" alt="" className="size-[20px] lg:size-[22px]" />
            </button>

            {/* Shopping Cart Control (44x44 hit target) with quantity badge */}
            <Link
              to="/cart"
              className="size-[44px] relative flex items-center justify-center hover:bg-surface transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
              aria-label={`Shopping cart, ${totalQuantity} items`}
            >
              <img src="/assets/icons/icon-cart.svg" alt="" className="size-[20px] lg:size-[22px]" />
              {totalQuantity > 0 && (
                <span className="absolute top-[6px] right-[6px] min-w-[18px] h-[18px] px-1 bg-ink text-white text-[10px] font-mono flex items-center justify-center rounded-none font-medium leading-none">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden size-[44px] flex items-center justify-center hover:bg-surface transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <img
                src={mobileMenuOpen ? '/assets/icons/icon-close.svg' : '/assets/icons/icon-menu.svg'}
                alt=""
                className="size-[20px]"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-line bg-paper px-6 py-6 transition-all duration-200">
            <nav className="flex flex-col gap-4 font-sans text-[16px]">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 text-ink border-b border-surface-2 flex items-center justify-between ${
                      active ? 'font-medium underline decoration-1 underline-offset-4' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[12px] font-mono text-muted">→</span>
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="py-3 mt-2 flex items-center gap-3 text-left text-muted font-mono text-[13px] border border-line px-4"
              >
                <img src="/assets/icons/icon-search.svg" alt="" className="size-4" />
                <span>Search car & bike wraps...</span>
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

