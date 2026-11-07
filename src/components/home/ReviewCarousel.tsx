import React, { useState } from 'react';
import { REVIEWS } from '../../data/reviews';

export const ReviewCarousel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // 3 reviews per page for desktop (18 reviews total = 6 pages: 01 / 06)
  const itemsPerPage = 3;
  const totalPages = Math.ceil(REVIEWS.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleReviews = REVIEWS.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="w-full">
      {/* Header: What riders are saying. (Matching Figma / user screenshot) */}
      <div className="mb-8 sm:mb-12">
        <h2 className="font-sans font-medium text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.08] tracking-[-1.5px] text-ink">
          What riders are saying<span className="text-[#e61919]">.</span>
        </h2>
      </div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#f4f4f2] border border-[#e5e5e3] p-8 sm:p-9 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] transition-all hover:border-ink/40"
          >
            {/* Top Label */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.4px] text-muted uppercase block mb-6">
                GOOGLE VERIFIED REVIEW
              </span>

              {/* Quote */}
              <blockquote className="font-sans font-normal text-[17px] sm:text-[18px] text-ink leading-[1.45]">
                "{review.quote}"
              </blockquote>
            </div>

            {/* Bottom: Author & Vehicle */}
            <div className="pt-8 border-t border-[#e5e5e3]/60 mt-6">
              <p className="font-sans font-medium text-[15px] text-ink">
                {review.author}
              </p>
              <p className="font-mono text-[11px] text-muted mt-1 uppercase tracking-[0.2px]">
                {review.vehicle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Pagination & Controls (Figma node: 01 / 06 counter + arrows) */}
      <div className="flex items-center justify-between mt-8 pt-4">
        {/* Counter */}
        <span className="font-mono text-[12px] sm:text-[13px] text-muted tracking-wide">
          {String(currentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
        </span>

        {/* Square Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous reviews slide"
            className="w-10 h-10 sm:w-11 sm:h-11 border border-line bg-white hover:bg-[#f4f4f2] text-ink flex items-center justify-center transition-colors font-mono text-[14px] cursor-pointer shadow-sm active:scale-95"
          >
            ←
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next reviews slide"
            className="w-10 h-10 sm:w-11 sm:h-11 border border-line bg-white hover:bg-[#f4f4f2] text-ink flex items-center justify-center transition-colors font-mono text-[14px] cursor-pointer shadow-sm active:scale-95"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
