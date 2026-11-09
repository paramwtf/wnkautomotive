import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CAR_MAKES, BIKE_MAKES, Product } from '../data/products';
import { ACCESSORIES } from '../data/accessories';
import { ProductCard } from '../components/common/ProductCard';
import { AccessoryCard } from '../components/shop/AccessoryCard';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { FilterDrawer } from '../components/shop/FilterDrawer';
import { VehicleFinder } from '../components/home/VehicleFinder';
import { useVehicleFilter } from '../context/VehicleFilterContext';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedVehicle, clearVehicle } = useVehicleFilter();

  // URL query params binding
  const typeParam = searchParams.get('type') || '';
  const makeParam = searchParams.get('make') || '';
  const wrapTypeParam = searchParams.get('wrapType') || '';
  const priceParam = searchParams.get('price') || '';
  const searchParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [selectedVehicleType, setSelectedVehicleType] = useState(typeParam);
  const [selectedWrapType, setSelectedWrapType] = useState(wrapTypeParam);
  const [selectedMake, setSelectedMake] = useState(makeParam);
  const [priceRange, setPriceRange] = useState(priceParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSelectedVehicleType(typeParam);
    setSelectedWrapType(wrapTypeParam);
    setSelectedMake(makeParam);
    setPriceRange(priceParam);
    setSearchQuery(searchParam);
    setSortBy(sortParam);
  }, [typeParam, wrapTypeParam, makeParam, priceParam, searchParam, sortParam]);

  const updateUrlParams = (updates: Record<string, string>) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val) {
        nextParams.set(key, val);
      } else {
        nextParams.delete(key);
      }
    });
    setSearchParams(nextParams);
  };

  const handleSelectVehicleType = (type: string) => {
    setSelectedVehicleType(type);
    updateUrlParams({ type });
  };

  const handleSelectWrapType = (wrapType: string) => {
    setSelectedWrapType(wrapType);
    updateUrlParams({ wrapType });
  };

  const handleSelectMake = (make: string) => {
    setSelectedMake(make);
    updateUrlParams({ make });
  };

  const handleSelectPriceRange = (range: string) => {
    setPriceRange(range);
    updateUrlParams({ price: range });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrlParams({ q: query });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateUrlParams({ sort });
  };

  const handleResetFilters = () => {
    clearVehicle();
    setSelectedVehicleType('');
    setSelectedWrapType('');
    setSelectedMake('');
    setPriceRange('');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams(new URLSearchParams());
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Vehicle type filter
      if (selectedVehicleType && p.vehicleType !== selectedVehicleType) {
        return false;
      }

      // Wrap type / coverage filter
      if (selectedWrapType && !p.coverageOptions.some((cov) => cov.toLowerCase().includes(selectedWrapType.toLowerCase()))) {
        return false;
      }

      // Make / brand filter (URL param or VehicleFinder selection)
      const effectiveMake = selectedMake || selectedVehicle.make || '';
      if (effectiveMake && p.make.toLowerCase() !== effectiveMake.toLowerCase()) {
        return false;
      }

      // Model filter (from VehicleFinder)
      if (selectedVehicle.model) {
        const normModel = selectedVehicle.model.toLowerCase();
        const pModel = p.model.toLowerCase();
        if (!pModel.includes(normModel) && !normModel.includes(pModel)) {
          return false;
        }
      }

      // Price range filter
      if (priceRange === 'under-5000' && p.priceInr >= 5000) return false;
      if (priceRange === '5000-9000' && (p.priceInr < 5000 || p.priceInr > 9000)) return false;
      if (priceRange === 'above-9000' && p.priceInr < 9000) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.make.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceInr - b.priceInr;
      if (sortBy === 'price-desc') return b.priceInr - a.priceInr;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0; // default / featured
    });
  }, [selectedVehicleType, selectedWrapType, selectedMake, selectedVehicle.make, selectedVehicle.model, priceRange, searchQuery, sortBy]);

  const isDecalsSelected = selectedWrapType === 'Decals' || selectedVehicleType === 'Universal';

  // Filter accessories based on search, price, and sort
  const filteredAccessories = useMemo(() => {
    return ACCESSORIES.filter((acc) => {
      if (priceRange === 'under-5000' && acc.price >= 5000) return false;
      if (priceRange === '5000-9000' && (acc.price < 5000 || acc.price > 9000)) return false;
      if (priceRange === 'above-9000' && acc.price < 9000) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          acc.name.toLowerCase().includes(q) ||
          acc.description.toLowerCase().includes(q) ||
          acc.sku.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [priceRange, searchQuery, sortBy]);

  const activeFilterCount = [selectedVehicleType, selectedWrapType, selectedMake || selectedVehicle.make, priceRange, selectedVehicle.model].filter(Boolean).length;

  return (
    <div className="w-full bg-paper min-h-screen">
      {/* Shop Header Banner matching Figma */}
      <section className="bg-surface-2 border-b border-line py-10 lg:py-14">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
            SHOP / WNK AUTOMOTIVE
          </span>
          <h1 className="font-sans font-medium text-[36px] sm:text-[48px] lg:text-[64px] text-ink leading-tight tracking-tight mb-3">
            Find your next identity<span className="text-red">.</span>
          </h1>
          <p className="font-sans text-[15px] sm:text-[17px] text-secondary max-w-2xl">
            Partial wraps designed for selected body panels. Check the kit contents for exact coverage.
          </p>
        </div>
      </section>

      {/* Main Shop Interface */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] py-8 lg:py-12">
        {/* Vehicle Finder Fitment Check directly on Shop page */}
        <VehicleFinder className="mb-10" />

        {/* Top Control Bar: Search, Mobile Filter Toggle, Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-line">
          {/* Search field */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by vehicle (e.g. Virtus, Ninja) or design..."
              className="w-full h-[46px] pl-10 pr-4 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none"
            />
            <img
              src="/assets/icons/icon-search.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-50"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-muted hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Controls: Filter Drawer Toggle (Mobile/Tablet) + Sort Selector */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden h-[46px] px-4 bg-white border border-field text-ink font-mono text-[13px] flex items-center gap-2 hover:border-ink"
            >
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              <span className="font-mono">▼</span>
            </button>

            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="sort-select" className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.3px] text-muted">
                SORT:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-[46px] px-3 bg-white border border-field text-ink font-mono text-[13px] rounded-none outline-none focus:border-ink cursor-pointer"
              >
                <option value="featured">Featured Liveries</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Design Name A–Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(selectedVehicleType || selectedWrapType || selectedMake || selectedVehicle.make || selectedVehicle.model || priceRange || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted mr-1">
              ACTIVE FILTERS:
            </span>
            {selectedVehicleType && (
              <button
                onClick={() => handleSelectVehicleType('')}
                className="h-[32px] px-3 bg-surface border border-line text-[12px] font-mono text-ink flex items-center gap-1.5 hover:border-ink"
              >
                <span>Category: {selectedVehicleType}</span>
                <span>×</span>
              </button>
            )}
            {selectedWrapType && (
              <button
                onClick={() => handleSelectWrapType('')}
                className="h-[32px] px-3 bg-surface border border-line text-[12px] font-mono text-ink flex items-center gap-1.5 hover:border-ink"
              >
                <span>Type: {selectedWrapType}</span>
                <span>×</span>
              </button>
            )}
            {(selectedMake || selectedVehicle.make) && (
              <button
                onClick={() => {
                  handleSelectMake('');
                  clearVehicle();
                }}
                className="h-[32px] px-3 bg-surface border border-line text-[12px] font-mono text-ink flex items-center gap-1.5 hover:border-ink"
              >
                <span>Make: {selectedMake || selectedVehicle.make}</span>
                <span>×</span>
              </button>
            )}
            {selectedVehicle.model && (
              <button
                onClick={clearVehicle}
                className="h-[32px] px-3 bg-surface border border-line text-[12px] font-mono text-ink flex items-center gap-1.5 hover:border-ink"
              >
                <span>Model: {selectedVehicle.model}</span>
                <span>×</span>
              </button>
            )}
            {priceRange && (
              <button
                onClick={() => handleSelectPriceRange('')}
                className="h-[32px] px-3 bg-surface border border-line text-[12px] font-mono text-ink flex items-center gap-1.5 hover:border-ink"
              >
                <span>Price: {priceRange}</span>
                <span>×</span>
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="h-[32px] px-3 bg-surface border border-line text-[12px] font-mono text-ink flex items-center gap-1.5 hover:border-ink"
              >
                <span>Query: "{searchQuery}"</span>
                <span>×</span>
              </button>
            )}
            <button
              onClick={handleResetFilters}
              className="font-mono text-[11px] text-muted underline hover:text-ink ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* 2-Column Layout: Sidebar (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <FilterSidebar
              selectedVehicleType={selectedVehicleType}
              onSelectVehicleType={handleSelectVehicleType}
              selectedWrapType={selectedWrapType}
              onSelectWrapType={handleSelectWrapType}
              selectedMake={selectedMake}
              onSelectMake={handleSelectMake}
              priceRange={priceRange}
              onSelectPriceRange={handleSelectPriceRange}
              onReset={handleResetFilters}
              carMakes={CAR_MAKES}
              bikeMakes={BIKE_MAKES}
            />
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {isDecalsSelected ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
                    SHOWING {filteredAccessories.length} DECALS & ACCESSORIES
                  </span>
                  <span className="font-mono text-[11px] text-muted hidden sm:inline">
                    PRECISION CUT VINYL & ESSENTIALS
                  </span>
                </div>

                {filteredAccessories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAccessories.map((acc) => (
                      <AccessoryCard key={acc.id} accessory={acc} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 px-6 text-center bg-surface border border-line">
                    <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
                      NO MATCH
                    </span>
                    <h3 className="font-sans font-medium text-[24px] text-ink mb-2">
                      No accessories found matching your criteria<span className="text-red">.</span>
                    </h3>
                    <button
                      onClick={handleResetFilters}
                      className="mt-4 h-[46px] px-6 bg-white border border-field text-ink font-mono text-[13px] hover:border-ink"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
                    SHOWING {filteredProducts.length} DESIGNS
                  </span>
                  <span className="font-mono text-[11px] text-muted hidden sm:inline">
                    PUNE STUDIO HANDCRAFTED
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 px-6 text-center bg-surface border border-line">
                    <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
                      NO EXACT MATCH
                    </span>
                    <h3 className="font-sans font-medium text-[24px] text-ink mb-2">
                      No wraps found matching your criteria<span className="text-red">.</span>
                    </h3>
                    <p className="font-sans text-[15px] text-secondary max-w-md mx-auto mb-6">
                      Try clearing your filters, or request a bespoke custom wrap designed from scratch for your vehicle.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={handleResetFilters}
                        className="h-[46px] px-6 bg-white border border-field text-ink font-mono text-[13px] hover:border-ink"
                      >
                        Reset Filters
                      </button>
                      <a
                        href="/custom-wrap"
                        className="h-[46px] px-6 bg-ink text-white font-mono text-[13px] hover:bg-charcoal flex items-center gap-2"
                      >
                        <span>Request Custom</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Decals & Accessories section on the main Shop view */}
                {(!selectedWrapType && !selectedVehicleType && !selectedMake && !selectedVehicle.make && !selectedVehicle.model && !searchQuery) && (
                  <div className="mt-16 pt-12 border-t border-line">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
                          ADD-ONS & EXTRAS
                        </span>
                        <h2 className="font-sans font-medium text-[26px] sm:text-[30px] text-ink tracking-tight">
                          Decals & Accessories<span className="text-red">.</span>
                        </h2>
                      </div>
                      <p className="font-sans text-[14px] text-secondary max-w-md">
                        Rim tapes, race numbers, aerodynamic stickers, and wrap maintenance cloths.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                      {ACCESSORIES.map((acc) => (
                        <AccessoryCard key={acc.id} accessory={acc} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Slide-in Mobile & Tablet Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        selectedVehicleType={selectedVehicleType}
        onSelectVehicleType={handleSelectVehicleType}
        selectedWrapType={selectedWrapType}
        onSelectWrapType={handleSelectWrapType}
        selectedMake={selectedMake}
        onSelectMake={handleSelectMake}
        priceRange={priceRange}
        onSelectPriceRange={handleSelectPriceRange}
        onReset={handleResetFilters}
        carMakes={CAR_MAKES}
        bikeMakes={BIKE_MAKES}
        resultCount={isDecalsSelected ? filteredAccessories.length : filteredProducts.length}
      />
    </div>
  );
};

