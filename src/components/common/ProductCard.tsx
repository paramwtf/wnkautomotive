import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const badgeText = product.coverageOptions[0] ? product.coverageOptions[0].toUpperCase() : 'WRAP KIT';

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block bg-paper border border-line hover:border-ink transition-all duration-200 overflow-hidden flex flex-col justify-between"
    >
      {/* Media Slot with Type Badge */}
      <div className="relative aspect-[4/3] bg-surface overflow-hidden border-b border-line">
        <img
          src={product.cardImage}
          alt={product.imageAlt || product.name}
          className="size-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-paper border border-line px-2 py-1 shadow-sm">
          <span className="font-mono text-[9px] uppercase tracking-[0.36px] text-ink block font-medium">
            {badgeText}
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className={`p-4 md:p-5 flex flex-col justify-between flex-1 ${compact ? 'p-3' : ''}`}>
        <div>
          {/* Vehicle Metadata Header */}
          <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted mb-1 truncate">
            {product.make} / {product.model}
          </div>

          {/* Design Title */}
          <h3 className="font-sans font-medium text-[17px] md:text-[20px] text-ink leading-snug group-hover:text-charcoal transition-colors mb-2">
            {product.name}
          </h3>

          {/* Brief info */}
          <p className="font-sans text-[13px] text-muted line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>
        </div>

        {/* Bottom Price & Action Row */}
        <div>
          <div className="h-px w-full bg-line mb-3" />
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-sans font-medium text-[16px] md:text-[18px] text-ink block leading-none">
                ₹{product.priceInr.toLocaleString('en-IN')}
              </span>
              <span className="font-mono text-[9px] text-muted block mt-1">
                SAMPLE PRICE / TAX INCLUDED
              </span>
            </div>

            <div className="h-[40px] px-3 bg-ink text-white font-sans text-[12px] font-medium flex items-center justify-center gap-1.5 shrink-0 group-hover:bg-charcoal transition-colors">
              <span>View</span>
              <span className="font-mono text-[11px]">↗</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

