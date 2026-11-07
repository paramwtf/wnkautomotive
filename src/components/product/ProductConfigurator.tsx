import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useVehicleFilter } from '../../context/VehicleFilterContext';

interface ProductConfiguratorProps {
  product: Product;
}

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { selectedVehicle } = useVehicleFilter();

  // Initial options
  const [selectedColour, setSelectedColour] = useState(product.colourOptions[0] || 'Black');
  const [selectedFinish, setSelectedFinish] = useState(product.finishOptions[0] || 'Matte');
  const [selectedCoverage, setSelectedCoverage] = useState(product.coverageOptions[0] || 'Full wrap');
  const [selectedWheelSize, setSelectedWheelSize] = useState(
    product.wheelSizes ? product.wheelSizes[0] : undefined
  );
  
  // Custom vehicle overrides if universal or customer modifies
  const [vehicleYear, setVehicleYear] = useState<string>(
    selectedVehicle.year ? String(selectedVehicle.year) : String(product.yearTo)
  );
  const [vehicleVariant, setVehicleVariant] = useState<string>(
    selectedVehicle.variant || product.variant
  );

  const [addedState, setAddedState] = useState(false);

  // Dynamic price calculation:
  // In WNK, Full wrap on cars = ₹13,000, Partial wrap = ₹8,500
  const calculatedPrice = useMemo(() => {
    let base = product.priceInr;
    if (product.slug === 'swoosh-monochrome') {
      if (selectedCoverage === 'Full wrap') return 13000;
      return 8500;
    }
    if (product.slug === 'terrain-contour') {
      if (selectedCoverage === 'Partial wrap') return 9500;
      return 13000;
    }
    return base;
  }, [product, selectedCoverage]);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      vehicleMake: product.make !== 'Universal' ? product.make : selectedVehicle.make || 'Universal',
      vehicleModel: product.model !== 'Universal' ? product.model : selectedVehicle.model || 'Universal Fitment',
      vehicleYear: vehicleYear,
      vehicleVariant: vehicleVariant,
      colour: selectedColour,
      finish: selectedFinish,
      coverage: selectedCoverage,
      wheelSize: selectedWheelSize,
      unitPrice: calculatedPrice,
      quantity: 1,
      image: product.cardImage,
    });

    setAddedState(true);
    setTimeout(() => {
      setAddedState(false);
    }, 4000);
  };

  return (
    <div className="w-full bg-paper border border-line p-6 md:p-8 space-y-6">
      {/* Title & Eyebrow */}
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block mb-1">
          CONFIGURATION / {product.sku}
        </span>
        <h2 className="font-sans font-medium text-[24px] md:text-[30px] text-ink leading-tight">
          Graphic. Precise. Yours<span className="text-red">.</span>
        </h2>
      </div>

      {/* 1. Vehicle Fitment Notice & Callout */}
      <div className="p-4 bg-surface border border-line">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted">
            TARGET VEHICLE FITMENT
          </span>
          <span className="font-mono text-[10px] text-ink bg-white px-2 py-0.5 border border-line">
            CAD MATCHED
          </span>
        </div>
        <div className="font-sans font-medium text-[16px] text-ink">
          {product.make} {product.model} ({product.yearFrom}–{product.yearTo})
        </div>
        <p className="font-sans text-[12px] text-secondary mt-1">
          Precision laser-cut specifically for this vehicle. Final fitment guaranteed by WNK.
        </p>

        {/* Variant selection */}
        <div className="mt-3 pt-3 border-t border-line/60 grid grid-cols-2 gap-3">
          <div>
            <label className="font-mono text-[10px] text-muted block mb-1">YEAR</label>
            <select
              value={vehicleYear}
              onChange={(e) => setVehicleYear(e.target.value)}
              className="w-full h-[38px] px-2 bg-white border border-field text-[13px] font-sans text-ink outline-none"
            >
              {Array.from({ length: product.yearTo - product.yearFrom + 1 }, (_, i) => product.yearFrom + i).map(
                (yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="font-mono text-[10px] text-muted block mb-1">TRIM / VARIANT</label>
            <input
              type="text"
              value={vehicleVariant}
              onChange={(e) => setVehicleVariant(e.target.value)}
              className="w-full h-[38px] px-2 bg-white border border-field text-[13px] font-sans text-ink outline-none"
              placeholder="e.g. GT / Highline"
            />
          </div>
        </div>
      </div>

      {/* 2. Colour Selection (Segmented Pills) */}
      <div>
        <label className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
          COLOUR: <span className="text-ink font-medium">{selectedColour}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {product.colourOptions.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColour(c)}
              className={`h-[44px] px-4 font-mono text-[13px] transition-colors border ${
                selectedColour === c
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-white text-ink border-field hover:border-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Finish Selection */}
      <div>
        <label className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
          SURFACE FINISH: <span className="text-ink font-medium">{selectedFinish}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {product.finishOptions.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFinish(f)}
              className={`h-[44px] px-4 font-mono text-[13px] transition-colors border ${
                selectedFinish === f
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-white text-ink border-field hover:border-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Coverage Selection */}
      <div>
        <label className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
          WRAP COVERAGE: <span className="text-ink font-medium">{selectedCoverage}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {product.coverageOptions.map((cov) => (
            <button
              key={cov}
              onClick={() => setSelectedCoverage(cov)}
              className={`h-[44px] px-4 font-mono text-[13px] transition-colors border ${
                selectedCoverage === cov
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-white text-ink border-field hover:border-ink'
              }`}
            >
              {cov}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Wheel Size Selection (if decal product) */}
      {product.wheelSizes && (
        <div>
          <label className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
            WHEEL DIAMETER: <span className="text-ink font-medium">{selectedWheelSize}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.wheelSizes.map((ws) => (
              <button
                key={ws}
                onClick={() => setSelectedWheelSize(ws)}
                className={`h-[44px] px-4 font-mono text-[13px] transition-colors border ${
                  selectedWheelSize === ws
                    ? 'bg-ink text-white border-ink font-medium'
                    : 'bg-white text-ink border-field hover:border-ink'
                }`}
              >
                {ws}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. Price Block */}
      <div className="pt-4 border-t border-line">
        <div className="flex items-baseline justify-between">
          <span className="font-sans font-medium text-[32px] text-ink tracking-tight">
            ₹{calculatedPrice.toLocaleString('en-IN')}
          </span>
          <span className="font-mono text-[11px] text-muted uppercase">
            GST & TAX INCLUDED
          </span>
        </div>
        <p className="font-mono text-[11px] text-muted mt-1">
          SAMPLE PRICE / AWAITING WNK APPROVAL • FREE NATIONWIDE SHIPPING
        </p>
      </div>

      {/* 7. Action Button with Dynamic Added State */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className={`w-full h-[54px] font-mono text-[14px] transition-all flex items-center justify-center gap-2 ${
            addedState
              ? 'bg-ink text-white border border-ink'
              : 'bg-ink text-white hover:bg-charcoal active:bg-ink'
          }`}
        >
          {addedState ? (
            <>
              <span>Added to Cart</span>
              <span>✓</span>
            </>
          ) : (
            <>
              <span>Add to Cart</span>
              <span>→</span>
            </>
          )}
        </button>

        {addedState && (
          <div className="p-3 bg-surface border border-line flex items-center justify-between text-[13px] animate-in fade-in">
            <span className="font-sans text-ink">Item in your cart! Ready to checkout?</span>
            <Link to="/cart" className="font-mono font-medium text-ink underline hover:text-muted">
              View Cart →
            </Link>
          </div>
        )}
      </div>

      {/* Kit Contents & Production Note */}
      <div className="pt-4 border-t border-line text-[12px] font-mono text-muted space-y-1">
        <p>• Lead Time: {product.productionLeadDays} business days handcrafted in Pune</p>
        <p>• Kit contents: {product.kitContents}</p>
        <p>• {product.shippingNotes}</p>
      </div>
    </div>
  );
};

