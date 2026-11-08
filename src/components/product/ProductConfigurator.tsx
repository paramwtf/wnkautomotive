import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { VEHICLE_DATABASE } from '../../data/vehicles';
import { ACCESSORIES, Accessory } from '../../data/accessories';
import { useCart } from '../../context/CartContext';
import { useVehicleFilter } from '../../context/VehicleFilterContext';

interface ProductConfiguratorProps {
  product: Product;
}

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { selectedVehicle } = useVehicleFilter();

  const knownVariants = useMemo(() => {
    const makeObj = VEHICLE_DATABASE.find(
      (m) => m.name.toLowerCase() === product.make.toLowerCase()
    );
    const modelObj = makeObj?.models.find(
      (m) => m.name.toLowerCase() === product.model.toLowerCase()
    );
    return modelObj?.variants || [];
  }, [product.make, product.model]);

  // Initial options
  const [selectedColour, setSelectedColour] = useState(product.colourOptions[0] || 'Primary Livery');
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
    selectedVehicle.variant || product.variant || (knownVariants[0] || 'Standard')
  );

  // Finishing touches / Accessories selection
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);

  const toggleAccessory = (acc: Accessory) => {
    setSelectedAccessories((prev) =>
      prev.some((a) => a.id === acc.id)
        ? prev.filter((a) => a.id !== acc.id)
        : [...prev, acc]
    );
  };

  const accessoriesTotal = useMemo(() => {
    return selectedAccessories.reduce((sum, a) => sum + a.price, 0);
  }, [selectedAccessories]);

  const [addedState, setAddedState] = useState(false);

  // Dynamic price calculation:
  // In WNK, Full wrap on cars = ₹13,000, Partial wrap = ₹8,500
  const calculatedBasePrice = useMemo(() => {
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

  const finalTotalPrice = calculatedBasePrice + accessoriesTotal;

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
      accessories: selectedAccessories.map((a) => ({ id: a.id, name: a.name, price: a.price })),
      unitPrice: finalTotalPrice,
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
        <div className="mt-4 pt-4 border-t border-line/60 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-mono text-[10px] text-muted block mb-1.5 uppercase tracking-[0.3px]">
                01 / YEAR
              </label>
              <select
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                className="w-full h-[44px] px-3 bg-white border border-field text-[13px] font-sans text-ink outline-none focus:border-ink cursor-pointer"
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
              <label className="font-mono text-[10px] text-muted block mb-1.5 uppercase tracking-[0.3px]">
                02 / TRIM / VARIANT
              </label>
              {knownVariants.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 w-full">
                  {knownVariants.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVehicleVariant(v)}
                      className={`min-h-[44px] h-[44px] px-3 font-mono text-[12px] sm:text-[13px] transition-colors border flex items-center justify-center text-center cursor-pointer ${
                        vehicleVariant === v
                          ? 'bg-ink text-white border-ink font-medium'
                          : 'bg-white text-ink border-field hover:border-ink'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={vehicleVariant}
                  onChange={(e) => setVehicleVariant(e.target.value)}
                  className="w-full h-[44px] px-3 bg-white border border-field text-[13px] font-sans text-ink outline-none focus:border-ink"
                  placeholder="e.g. Standard"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Colour Selection (Wrap Livery Colourways) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block">
            WRAP COLOUR: <span className="text-ink font-medium">{selectedColour}</span>
          </label>
          <span className="font-mono text-[10px] text-muted">LIVERY PALETTE</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          {product.colourOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedColour(c)}
              className={`min-h-[44px] h-[44px] px-3 font-mono text-[12px] sm:text-[13px] transition-colors border flex items-center justify-center text-center cursor-pointer ${
                selectedColour === c
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-white text-ink border-field hover:border-ink'
              }`}
            >
              {c}
            </button>
          ))}
          {/* Currently unavailable secondary color variant: kept disabled and greyed out */}
          <button
            type="button"
            disabled
            className="min-h-[44px] h-[44px] px-3 font-mono text-[11px] sm:text-[12px] border border-line/60 bg-[#f9f9f9] text-muted/50 flex items-center justify-center text-center cursor-not-allowed opacity-60"
            title="Alternative colour variation launching soon"
          >
            <span>Alternate Edition (Coming Soon)</span>
          </button>
        </div>
        <span className="font-mono text-[10px] text-muted/80 block mt-1.5">
          Primary production colourway active. Alternative wrap colourways are currently unavailable.
        </span>
      </div>

      {/* 3. Finish Selection */}
      <div>
        <label className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
          SURFACE FINISH: <span className="text-ink font-medium">{selectedFinish}</span>
        </label>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full">
          {product.finishOptions.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFinish(f)}
              className={`min-h-[44px] h-[44px] px-4 font-mono text-[12px] sm:text-[13px] transition-colors border flex items-center justify-center text-center cursor-pointer ${
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
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 w-full">
          {product.coverageOptions.map((cov) => (
            <button
              key={cov}
              type="button"
              onClick={() => setSelectedCoverage(cov)}
              className={`min-h-[44px] h-[44px] px-4 font-mono text-[12px] sm:text-[13px] transition-colors border flex items-center justify-center text-center cursor-pointer ${
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
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full">
            {product.wheelSizes.map((ws) => (
              <button
                key={ws}
                type="button"
                onClick={() => setSelectedWheelSize(ws)}
                className={`min-h-[44px] h-[44px] px-4 font-mono text-[12px] sm:text-[13px] transition-colors border flex items-center justify-center text-center cursor-pointer ${
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

      {/* 6. Finishing Touches / Accessories (Figma node match to media_1794117457691_c21c36e2.png) */}
      <div className="pt-2 border-t border-line">
        <div className="flex items-center justify-between mb-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block">
            ADD-ONS / UPGRADE
          </label>
          {selectedAccessories.length > 0 && (
            <span className="font-mono text-[11px] text-ink font-medium">
              +{selectedAccessories.length} selected (+₹{accessoriesTotal.toLocaleString('en-IN')})
            </span>
          )}
        </div>
        <h3 className="font-sans font-medium text-[20px] text-ink mb-3.5">
          Add the finishing touches<span className="text-[#e61919]">.</span>
        </h3>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-2 gap-3">
          {ACCESSORIES.map((acc) => {
            const isSelected = selectedAccessories.some((a) => a.id === acc.id);
            return (
              <div
                key={acc.id}
                onClick={() => toggleAccessory(acc)}
                className={`p-3 bg-white border transition-all cursor-pointer flex flex-col justify-between group select-none ${
                  isSelected
                    ? 'border-ink ring-1 ring-ink shadow-sm'
                    : 'border-line hover:border-ink/60'
                }`}
              >
                {/* Accessory Artwork in Aspect Box */}
                <div className="w-full aspect-[4/3] bg-[#f4f4f6] border border-line/60 flex items-center justify-center p-2 mb-2.5 overflow-hidden">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title & Price Row */}
                <div>
                  <h4 className="font-sans font-medium text-[13px] sm:text-[14px] text-ink leading-tight truncate">
                    {acc.shortName}
                  </h4>
                  <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-line/50">
                    <span className="font-mono text-[12px] text-ink font-semibold">
                      + ₹{acc.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAccessory(acc);
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors font-mono text-[12px] cursor-pointer ${
                        isSelected
                          ? 'bg-ink text-white'
                          : 'border border-line text-ink hover:border-ink bg-white'
                      }`}
                      aria-label={isSelected ? `Remove ${acc.name}` : `Add ${acc.name}`}
                    >
                      {isSelected ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Price Block */}
      <div className="pt-4 border-t border-line">
        <div className="flex items-baseline justify-between">
          <span className="font-sans font-medium text-[32px] text-ink tracking-tight">
            ₹{finalTotalPrice.toLocaleString('en-IN')}
          </span>
          <span className="font-mono text-[11px] text-muted uppercase">
            GST & TAX INCLUDED
          </span>
        </div>
        {selectedAccessories.length > 0 ? (
          <p className="font-mono text-[11px] text-muted mt-1">
            Base livery: ₹{calculatedBasePrice.toLocaleString('en-IN')} + Add-ons: ₹{accessoriesTotal.toLocaleString('en-IN')} • FREE SHIPPING
          </p>
        ) : (
          <p className="font-mono text-[11px] text-muted mt-1">
            SAMPLE PRICE / AWAITING WNK APPROVAL • FREE NATIONWIDE SHIPPING
          </p>
        )}
      </div>

      {/* 8. Action Button with Dynamic Added State */}
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

