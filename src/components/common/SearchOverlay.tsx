import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, Product } from '../../data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const searchResults: Product[] = trimmed
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.make.toLowerCase().includes(trimmed) ||
          p.model.toLowerCase().includes(trimmed) ||
          p.sku.toLowerCase().includes(trimmed) ||
          p.vehicleType.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed)
        );
      })
    : [];

  const defaultSuggestions = PRODUCTS.slice(0, 3); // Swoosh, Nightshade, Terrain

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-start items-center p-0 md:p-6 lg:p-10 animate-in fade-in duration-150">
      <div className="w-full max-w-[1000px] bg-paper border border-line shadow-overlay overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header & Search Input */}
        <div className="p-6 md:p-8 border-b border-line bg-paper">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
              SEARCH WNK DESIGNS & VEHICLES
            </h3>
            <button
              onClick={onClose}
              className="size-[40px] flex items-center justify-center border border-line hover:border-ink hover:bg-surface transition-colors focus:outline-none"
              aria-label="Close search"
            >
              <img src="/assets/icons/icon-close.svg" alt="" className="size-4" />
            </button>
          </div>

          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by vehicle (Virtus, Ninja 300, Thar) or design name..."
              className="w-full h-[60px] pl-4 pr-12 text-[18px] md:text-[22px] font-sans text-ink bg-white border border-field focus:border-ink rounded-none outline-none transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 text-muted hover:text-ink font-mono text-[14px]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results / Suggestions Container */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1 bg-surface-2">
          {trimmed ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
                  RESULTS ({searchResults.length})
                </span>
                <span className="font-mono text-[11px] text-muted">
                  Press ESC to close
                </span>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-4 bg-paper border border-line hover:border-ink transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.cardImage}
                          alt={product.name}
                          className="size-[64px] object-cover bg-surface border border-line shrink-0"
                        />
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block mb-0.5">
                            {product.make} / {product.model}
                          </span>
                          <h4 className="font-sans font-medium text-[16px] text-ink group-hover:text-charcoal">
                            {product.name}
                          </h4>
                          <span className="font-sans text-[13px] text-muted">
                            {product.vehicleType} • {product.coverageOptions.join(', ')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-medium text-[15px] text-ink block">
                          ₹{product.priceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[12px] font-mono text-muted group-hover:text-ink">
                          View →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-paper border border-line">
                  <p className="font-sans text-[18px] text-ink mb-1">No designs found matching "{query}"</p>
                  <p className="font-mono text-[13px] text-muted max-w-md mx-auto mb-6">
                    Looking for a wrap for a vehicle not in our catalog? Our studio crafts bespoke one-off designs.
                  </p>
                  <Link
                    to="/custom-wrap"
                    onClick={onClose}
                    className="inline-block px-5 py-3 bg-ink text-white font-mono text-[13px] hover:bg-charcoal"
                  >
                    Request Custom Wrap →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-4">
                POPULAR DESIGNS & VEHICLES
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {defaultSuggestions.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="p-4 bg-paper border border-line hover:border-ink transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-surface mb-3 overflow-hidden border border-line">
                        <img
                          src={product.cardImage}
                          alt={product.name}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block mb-1">
                        {product.make} / {product.model}
                      </span>
                      <h4 className="font-sans font-medium text-[16px] text-ink">
                        {product.name}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                      <span className="font-mono font-medium text-[14px] text-ink">
                        ₹{product.priceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="font-mono text-[11px] text-muted group-hover:text-ink">
                        View ↗
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

