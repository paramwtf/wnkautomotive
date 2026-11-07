import React from 'react';
import { Link } from 'react-router-dom';

interface WnkLogoProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export const WnkLogo: React.FC<WnkLogoProps> = ({ className = 'h-[44px] w-auto', theme = 'dark' }) => {
  return (
    <Link to="/" className="inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-ink" aria-label="WNK Automotive Home">
      <img
        src="/assets/icons/wnk-logo.svg"
        alt="WNK Automotive"
        className={`${className} ${theme === 'light' ? 'filter invert' : ''}`}
        width="130"
        height="57"
      />
    </Link>
  );
};

