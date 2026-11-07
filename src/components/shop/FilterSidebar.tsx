import React from 'react';

interface FilterSidebarProps {
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
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
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
}) => {
  const vehicleTypes = [
    { label: 'All Vehicles', value: '' },
    { label: 'Cars', value: 'Car' },
    { label: 'Bikes & Motorcycles', value: 'Bike' },
    { label: 'Universal / Decals', value: 'Universal' },
  ];

  const wrapTypes = [
    { label: 'All Wraps', value: '' },
    { label: 'Full wrap', value: 'Full wrap' },
    { label: 'Partial wrap', value: 'Partial wrap' },
    { label: 'Pre-cut wrap', value: 'Pre-cut wrap' },
    { label: 'Decals', value: 'Decals' },
  ];

  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under ₹5,000', value: 'under-5000' },
    { label: '₹5,000 — ₹9,000', value: '5000-9000' },
    { label: '₹9,000 & above', value: 'above-9000' },
  ];

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-line">
        <h4 className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
          FILTER CATALOGUE
        </h4>
        {(selectedVehicleType || selectedWrapType || selectedMake || priceRange) && (
          <button
            onClick={onReset}
            className="font-mono text-[11px] text-muted hover:text-ink underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* 1. Vehicle Type Tabs */}
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block mb-3">
          VEHICLE CATEGORY
        </label>
        <div className="flex flex-col gap-1.5">
          {vehicleTypes.map((vt) => (
            <button
              key={vt.value}
              onClick={() => onSelectVehicleType(vt.value)}
              className={`w-full text-left px-3 py-2 text-[14px] transition-colors border ${
                selectedVehicleType === vt.value
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-white text-ink border-transparent hover:bg-surface'
              }`}
            >
              {vt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Wrap Type / Coverage */}
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block mb-3">
          WRAP TYPE / COVERAGE
        </label>
        <div className="flex flex-col gap-1.5">
          {wrapTypes.map((wt) => (
            <button
              key={wt.value}
              onClick={() => onSelectWrapType(wt.value)}
              className={`w-full text-left px-3 py-2 text-[14px] transition-colors border ${
                selectedWrapType === wt.value
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-white text-ink border-transparent hover:bg-surface'
              }`}
            >
              {wt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Brands / Makes */}
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block mb-3">
          VEHICLE BRAND
        </label>
        <div className="space-y-1 max-h-[220px] overflow-y-auto pr-2">
          <button
            onClick={() => onSelectMake('')}
            className={`w-full text-left px-3 py-1.5 text-[13px] border ${
              !selectedMake ? 'bg-surface font-medium text-ink border-field' : 'text-muted border-transparent hover:text-ink'
            }`}
          >
            All Brands
          </button>
          <div className="pt-2 text-[11px] font-mono text-muted uppercase">Cars</div>
          {carMakes.map((m) => (
            <button
              key={m}
              onClick={() => onSelectMake(m)}
              className={`w-full text-left px-3 py-1.5 text-[13px] border ${
                selectedMake === m ? 'bg-surface font-medium text-ink border-field' : 'text-muted border-transparent hover:text-ink'
              }`}
            >
              {m}
            </button>
          ))}
          <div className="pt-2 text-[11px] font-mono text-muted uppercase">Bikes</div>
          {bikeMakes.map((m) => (
            <button
              key={m}
              onClick={() => onSelectMake(m)}
              className={`w-full text-left px-3 py-1.5 text-[13px] border ${
                selectedMake === m ? 'bg-surface font-medium text-ink border-field' : 'text-muted border-transparent hover:text-ink'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Price Ranges */}
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block mb-3">
          PRICE BRACKET
        </label>
        <div className="flex flex-col gap-1.5">
          {priceRanges.map((pr) => (
            <button
              key={pr.value}
              onClick={() => onSelectPriceRange(pr.value)}
              className={`w-full text-left px-3 py-2 text-[13px] border ${
                priceRange === pr.value
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-white text-ink border-transparent hover:bg-surface'
              }`}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

