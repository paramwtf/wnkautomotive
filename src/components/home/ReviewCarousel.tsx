import React from 'react';
import { REVIEWS, CustomerReview } from '../../data/reviews';

interface ReviewCardProps {
  review: CustomerReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="w-[320px] sm:w-[380px] lg:w-[420px] shrink-0 bg-[#f4f4f2] border border-[#e5e5e3] p-7 sm:p-8 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] transition-all hover:border-ink/50 hover:shadow-sm select-none">
      {/* Top Label & Star Rating */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="font-mono text-[10px] tracking-[0.4px] text-muted uppercase">
            {review.badge || 'GOOGLE VERIFIED REVIEW'}
          </span>
          <div
            className="flex items-center gap-0.5 text-[#f59e0b] text-[12px] sm:text-[13px]"
            aria-label={`${review.rating || 5} out of 5 stars`}
          >
            ★★★★★
          </div>
        </div>

        {/* Quote */}
        <blockquote className="font-sans font-normal text-[16px] sm:text-[17px] text-ink leading-[1.5]">
          "{review.quote}"
        </blockquote>
      </div>

      {/* Bottom Section: Author, Vehicle, Time */}
      <div className="pt-6 border-t border-[#e5e5e3]/60 mt-6">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-sans font-medium text-[15px] text-ink">
            {review.author}
          </p>
          {review.timeAgo && (
            <span className="font-mono text-[10px] text-muted/70">
              {review.timeAgo}
            </span>
          )}
        </div>
        <p className="font-mono text-[11px] text-muted mt-1 uppercase tracking-[0.2px]">
          {review.vehicle}
        </p>
      </div>
    </div>
  );
};

export const ReviewCarousel: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header: What riders are saying. */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
              CLIENT TESTIMONIALS / GOOGLE REVIEWS
            </span>
            <h2 className="font-sans font-medium text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.08] tracking-[-1.5px] text-ink">
              What riders are saying<span className="text-[#e61919]">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[12px] text-muted self-start sm:self-auto">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Google Verified Reviews • 5.0 ★ Rating ({REVIEWS.length})</span>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Scrolling Track Wrapper */}
      <div className="relative w-full overflow-hidden marquee-group py-2">
        {/* Left & Right gradient edge fades for smooth entry/exit */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-paper to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-paper to-transparent"
          aria-hidden="true"
        />

        {/* Marquee Track flex container */}
        <div className="flex w-max marquee-scroll-container">
          {/* Primary Track Set */}
          <div className="flex shrink-0 gap-6 pr-6 animate-wnk-marquee">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Duplicate Track Set for Seamless Infinite Loop */}
          <div className="flex shrink-0 gap-6 pr-6 animate-wnk-marquee" aria-hidden="true">
            {REVIEWS.map((review) => (
              <ReviewCard key={`dup-${review.id}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
