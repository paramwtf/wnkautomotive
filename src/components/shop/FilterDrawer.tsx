import React, { useEffect } from 'react';
import { FilterSidebar } from './FilterSidebar';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicleType: string;
  onSelectVehicleType: (type: string) => void;
  selectedWrapType: string;
  onSelectWrapType: (type: string) => void;
  selectedMake: string;
  onSelectMake: (make: string) => void;
  priceRange: string;
  onSelectPriceRange: (range: string) => void;
  onReset: () => void;
  carMakes: string[];
  bikeMakes: string[];
  resultCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedVehicleType,
  onSelectVehicleType,
  selectedWrapType,
  onSelectWrapType,
  selectedMake,
  onSelectMake,
  priceRange,
  onSelectPriceRange,
  onReset,
  carMakes,
  bikeMakes,
  resultCount,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-[420px] bg-paper h-full flex flex-col shadow-overlay border-l border-line animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-line flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block">
              FILTER & REFINE
            </span>
            <h3 className="font-sans font-medium text-[18px] text-ink">
              Catalogue Filters
            </h3>
          </div>
          <button
            onClick={onClose}
            className="size-[40px] flex items-center justify-center border border-line hover:border-ink hover:bg-surface"
            aria-label="Close filters"
          >
            <img src="/assets/icons/icon-close.svg" alt="" className="size-4" />
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="p-6 overflow-y-auto flex-1">
          <FilterSidebar
            selectedVehicleType={selectedVehicleType}
            onSelectVehicleType={onSelectVehicleType}
            selectedWrapType={selectedWrapType}
            onSelectWrapType={onSelectWrapType}
            selectedMake={selectedMake}
            onSelectMake={onSelectMake}
            priceRange={priceRange}
            onSelectPriceRange={onSelectPriceRange}
            onReset={onReset}
            carMakes={carMakes}
            bikeMakes={bikeMakes}
          />
        </div>

        {/* Drawer Action Bar */}
        <div className="p-4 border-t border-line bg-surface flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex-1 h-[48px] bg-white border border-field text-ink font-mono text-[12px] hover:border-ink"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-[48px] bg-ink text-white font-mono text-[12px] hover:bg-charcoal flex items-center justify-center gap-2"
          >
            <span>Apply ({resultCount})</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

