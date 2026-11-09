import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { VEHICLE_DATABASE } from '../../data/vehicles';
import { useVehicleFilter } from '../../context/VehicleFilterContext';

interface VehicleFinderProps {
  className?: string;
}

export const VehicleFinder: React.FC<VehicleFinderProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const {
    selectedVehicle,
    setVehicleMake,
    setVehicleModel,
    setVehicleYear,
    setVehicleVariant,
    clearVehicle,
  } = useVehicleFilter();

  const selectedMakeObj = useMemo(() => {
    return VEHICLE_DATABASE.find((m) => m.name === selectedVehicle.make);
  }, [selectedVehicle.make]);

  const selectedModelObj = useMemo(() => {
    return selectedMakeObj?.models.find((m) => m.name === selectedVehicle.model);
  }, [selectedMakeObj, selectedVehicle.model]);

  const availableYears = selectedModelObj?.years || [];
  const availableVariants = selectedModelObj?.variants || [];

  const handleSearch = () => {
    if (!selectedVehicle.make) return;
    const params = new URLSearchParams();
    if (selectedVehicle.make) params.set('make', selectedVehicle.make);
    if (selectedVehicle.model) params.set('model', selectedVehicle.model);
    if (selectedVehicle.year) params.set('year', String(selectedVehicle.year));
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <div className={`w-full bg-paper border border-line p-6 md:p-8 ${className}`}>
      {/* Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
            VEHICLE FINDER / FITMENT CHECK
          </span>
          <h3 className="font-sans font-medium text-[20px] md:text-[24px] text-ink">
            Find wraps engineered for your exact ride<span className="text-red">.</span>
          </h3>
        </div>
        {(selectedVehicle.make || selectedVehicle.model) && (
          <button
            onClick={clearVehicle}
            className="font-mono text-[11px] text-muted hover:text-ink underline self-start sm:self-auto cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Cascading 4-Dropdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Make Selector */}
        <div className="flex flex-col">
          <label className="font-mono text-[11px] uppercase tracking-[0.3px] text-muted mb-1.5">
            Make
          </label>
          <select
            value={selectedVehicle.make}
            onChange={(e) => setVehicleMake(e.target.value)}
            className="h-[48px] px-3 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors cursor-pointer"
          >
            <option value="">Select Vehicle Make</option>
            <optgroup label="Cars (Coming Soon)">
              {VEHICLE_DATABASE.filter((m) => m.type === 'Car').map((m) => (
                <option key={m.name} value={m.name} disabled className="text-muted/60 bg-surface">
                  {m.name} (Coming Soon)
                </option>
              ))}
            </optgroup>
            <optgroup label="Bikes & Motorcycles">
              {VEHICLE_DATABASE.filter((m) => m.type === 'Bike').map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Model Selector */}
        <div className="flex flex-col">
          <label className="font-mono text-[11px] uppercase tracking-[0.3px] text-muted mb-1.5">
            Model
          </label>
          <select
            value={selectedVehicle.model}
            onChange={(e) => setVehicleModel(e.target.value)}
            disabled={!selectedVehicle.make}
            className="h-[48px] px-3 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors cursor-pointer disabled:bg-surface disabled:cursor-not-allowed disabled:text-muted"
          >
            <option value="">{selectedVehicle.make ? 'Select Model' : 'Select Make First'}</option>
            {selectedMakeObj?.models.map((mod) => (
              <option key={mod.name} value={mod.name}>
                {mod.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Selector */}
        <div className="flex flex-col">
          <label className="font-mono text-[11px] uppercase tracking-[0.3px] text-muted mb-1.5">
            Year
          </label>
          <select
            value={selectedVehicle.year}
            onChange={(e) => setVehicleYear(e.target.value ? parseInt(e.target.value, 10) : '')}
            disabled={!selectedVehicle.model}
            className="h-[48px] px-3 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors cursor-pointer disabled:bg-surface disabled:cursor-not-allowed disabled:text-muted"
          >
            <option value="">{selectedVehicle.model ? 'Select Year' : 'Select Model First'}</option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Variant Selector */}
        <div className="flex flex-col">
          <label className="font-mono text-[11px] uppercase tracking-[0.3px] text-muted mb-1.5">
            Variant
          </label>
          <select
            value={selectedVehicle.variant}
            onChange={(e) => setVehicleVariant(e.target.value)}
            disabled={!selectedVehicle.model}
            className="h-[48px] px-3 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors cursor-pointer disabled:bg-surface disabled:cursor-not-allowed disabled:text-muted"
          >
            <option value="">{selectedVehicle.model ? 'All Variants / Any' : 'Select Model First'}</option>
            {availableVariants.map((varName) => (
              <option key={varName} value={varName}>
                {varName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-5 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-sans text-[13px] text-secondary">
          {selectedVehicle.make && selectedVehicle.model ? (
            <span>
              Configured: <strong className="text-ink font-mono font-medium">{selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year}</strong> ({selectedVehicle.variant || 'All Variants'})
            </span>
          ) : (
            <span>Select your vehicle to filter our engineered catalogue.</span>
          )}
        </p>

        <button
          onClick={handleSearch}
          disabled={!selectedVehicle.make}
          className="w-full sm:w-auto h-[48px] px-8 bg-ink text-white hover:bg-charcoal font-mono text-[13px] transition-colors disabled:opacity-45 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Browse Matching Wraps</span>
          <span className="font-mono">→</span>
        </button>
      </div>
    </div>
  );
};

