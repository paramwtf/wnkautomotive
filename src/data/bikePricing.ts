// Central common pricing configuration for motorcycle models
// Base wrap starting prices for reference, custom quotes, and configurator pricing.

export interface BikeModelPricing {
  make: string;
  model: string;
  basePriceInr: number;
  category: 'Entry / Middleweight' | 'Sport / Supersport' | 'Liter Class / Flagship Tourer';
  leadDays: number;
}

export const BIKE_MODEL_PRICING: BikeModelPricing[] = [
  { make: 'KTM', model: 'Duke 250', basePriceInr: 6000, category: 'Entry / Middleweight', leadDays: 3 },
  { make: 'KTM', model: 'Duke 390', basePriceInr: 6000, category: 'Entry / Middleweight', leadDays: 3 },
  { make: 'KTM', model: '390 Adventure', basePriceInr: 6000, category: 'Entry / Middleweight', leadDays: 3 },
  { make: 'BMW', model: 'F 450GS', basePriceInr: 6000, category: 'Entry / Middleweight', leadDays: 3 },
  { make: 'Aprilia', model: 'RS 457', basePriceInr: 7000, category: 'Sport / Supersport', leadDays: 3 },
  { make: 'Kawasaki', model: 'Ninja 300', basePriceInr: 7000, category: 'Sport / Supersport', leadDays: 3 },
  { make: 'TVS', model: 'Apache RR 310', basePriceInr: 7000, category: 'Sport / Supersport', leadDays: 3 },
  { make: 'Kawasaki', model: 'Z900', basePriceInr: 8000, category: 'Sport / Supersport', leadDays: 3 },
  { make: 'Kawasaki', model: 'Ninja ZX-6R', basePriceInr: 10000, category: 'Liter Class / Flagship Tourer', leadDays: 4 },
  { make: 'Kawasaki', model: 'Ninja ZX-10R', basePriceInr: 10000, category: 'Liter Class / Flagship Tourer', leadDays: 4 },
  { make: 'BMW', model: 'R 1250GS', basePriceInr: 12000, category: 'Liter Class / Flagship Tourer', leadDays: 4 },
];

export function getBikePricing(make: string, model: string): BikeModelPricing | undefined {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const mMake = norm(make);
  const mModel = norm(model);
  return BIKE_MODEL_PRICING.find(
    (b) => norm(b.make) === mMake && norm(b.model).includes(mModel)
  );
}

export function formatPriceINR(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

