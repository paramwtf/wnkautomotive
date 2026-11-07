import React, { createContext, useContext, useState, useEffect } from 'react';

interface SelectedVehicle {
  make: string;
  model: string;
  year: number | '';
  variant: string;
}

interface VehicleFilterContextType {
  selectedVehicle: SelectedVehicle;
  setVehicleMake: (make: string) => void;
  setVehicleModel: (model: string) => void;
  setVehicleYear: (year: number | '') => void;
  setVehicleVariant: (variant: string) => void;
  clearVehicle: () => void;
  isVehicleSet: boolean;
}

const initialVehicle: SelectedVehicle = {
  make: '',
  model: '',
  year: '',
  variant: '',
};

const VehicleFilterContext = createContext<VehicleFilterContextType | undefined>(undefined);

export const VehicleFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<SelectedVehicle>(() => {
    try {
      const saved = localStorage.getItem('wnk_selected_vehicle');
      return saved ? JSON.parse(saved) : initialVehicle;
    } catch {
      return initialVehicle;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wnk_selected_vehicle', JSON.stringify(selectedVehicle));
    } catch {
      // ignore
    }
  }, [selectedVehicle]);

  const setVehicleMake = (make: string) => {
    setSelectedVehicle({
      make,
      model: '',
      year: '',
      variant: '',
    });
  };

  const setVehicleModel = (model: string) => {
    setSelectedVehicle((prev) => ({
      ...prev,
      model,
      year: '',
      variant: '',
    }));
  };

  const setVehicleYear = (year: number | '') => {
    setSelectedVehicle((prev) => ({
      ...prev,
      year,
      variant: '',
    }));
  };

  const setVehicleVariant = (variant: string) => {
    setSelectedVehicle((prev) => ({
      ...prev,
      variant,
    }));
  };

  const clearVehicle = () => {
    setSelectedVehicle(initialVehicle);
  };

  const isVehicleSet = Boolean(selectedVehicle.make && selectedVehicle.model);

  return (
    <VehicleFilterContext.Provider
      value={{
        selectedVehicle,
        setVehicleMake,
        setVehicleModel,
        setVehicleYear,
        setVehicleVariant,
        clearVehicle,
        isVehicleSet,
      }}
    >
      {children}
    </VehicleFilterContext.Provider>
  );
};

export const useVehicleFilter = () => {
  const context = useContext(VehicleFilterContext);
  if (!context) {
    throw new Error('useVehicleFilter must be used within a VehicleFilterProvider');
  }
  return context;
};

