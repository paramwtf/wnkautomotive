import React, { useState } from 'react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, className = '' }) => {
  // Keep first open by default, or none. Let's make first open by default so visitors immediately see the format.
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-line bg-paper transition-colors duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface/60 transition-colors focus:outline-none"
            >
              <h3 className="font-sans font-medium text-[16px] sm:text-[17px] text-ink leading-snug">
                {item.question}
              </h3>
              <div
                className={`w-8 h-8 shrink-0 rounded-none border border-line bg-white flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isOpen ? 'border-ink bg-surface' : 'hover:border-ink'
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#171717"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-300 text-ink ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-line/40 text-secondary">
                  <p className="font-sans text-[14px] sm:text-[15px] leading-relaxed pt-3">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

