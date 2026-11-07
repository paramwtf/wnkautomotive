/**
 * WNK Automotive — Central Product Image & Asset Configuration
 * 
 * Manages verified mappings between catalogue products, multi-angle studio photography,
 * and editorial hero cards across Aprilia RS 457, KTM, and automotive lines.
 */

export interface ProductAssetDefinition {
  slug: string;
  sku: string;
  name: string;
  make: 'Aprilia' | 'KTM' | 'Volkswagen' | 'BMW' | 'Kawasaki' | 'Mahindra' | 'Toyota' | 'TVS' | 'Universal';
  model: string;
  yearRange: string;
  cardImage: string;
  galleryImages: string[];
  heroPoster?: string;
  alt: string;
  category: 'Bike' | 'Car' | 'Universal';
}

export const PRODUCT_ASSETS: Record<string, ProductAssetDefinition> = {
  // ==========================================
  // APRILIA RS 457 PRODUCTS
  // ==========================================
  'lightning-mcqueen-aprilia-rs457': {
    slug: 'lightning-mcqueen-aprilia-rs457',
    sku: 'WNK-BIK-RS457-MCQ',
    name: 'Lightning McQueen 95 Edition',
    make: 'Aprilia',
    model: 'RS 457',
    yearRange: '2024-2025',
    cardImage: '/assets/images/rs457/web/rs457-lightning-mcqueen-01.webp',
    galleryImages: [
      '/assets/images/rs457/web/rs457-lightning-mcqueen-01.webp',
      '/assets/images/rs457/web/rs457-lightning-mcqueen-02.webp',
      '/assets/images/hero/web/lighning-mcqueen-edition-aprilia-rs457.webp',
    ],
    heroPoster: '/assets/images/hero/web/lighning-mcqueen-edition-aprilia-rs457.webp',
    alt: 'Aprilia RS 457 Lightning McQueen 95 Racing Wrap',
    category: 'Bike',
  },
  'marlboro-racing-aprilia-rs457': {
    slug: 'marlboro-racing-aprilia-rs457',
    sku: 'WNK-BIK-RS457-MAR',
    name: 'Marlboro Racing Heritage Edition',
    make: 'Aprilia',
    model: 'RS 457',
    yearRange: '2024-2025',
    cardImage: '/assets/images/rs457/web/rs457-marlboro-01.webp',
    galleryImages: [
      '/assets/images/rs457/web/rs457-marlboro-01.webp',
      '/assets/images/rs457/web/rs457-marlboro-02.webp',
    ],
    alt: 'Aprilia RS 457 Marlboro Heritage Racing Livery',
    category: 'Bike',
  },
  'mayhem-cyberpunk-aprilia-rs457': {
    slug: 'mayhem-cyberpunk-aprilia-rs457',
    sku: 'WNK-BIK-RS457-MAY',
    name: 'Mayhem Neon Edition',
    make: 'Aprilia',
    model: 'RS 457',
    yearRange: '2024-2025',
    cardImage: '/assets/images/rs457/web/rs457-mayhem-01.webp',
    galleryImages: [
      '/assets/images/rs457/web/rs457-mayhem-01.webp',
      '/assets/images/rs457/web/rs457-mayhem-02.webp',
    ],
    alt: 'Aprilia RS 457 Mayhem Neon Cyberpunk Wrap',
    category: 'Bike',
  },
  'monza-blue-aprilia-rs457': {
    slug: 'monza-blue-aprilia-rs457',
    sku: 'WNK-BIK-RS457-MNZ',
    name: 'Monza Blue Trophy Edition',
    make: 'Aprilia',
    model: 'RS 457',
    yearRange: '2024-2025',
    cardImage: '/assets/images/rs457/web/rs457-monza-blue-01.webp',
    galleryImages: [
      '/assets/images/rs457/web/rs457-monza-blue-01.webp',
      '/assets/images/rs457/web/rs457-monza-blue-02.webp',
    ],
    alt: 'Aprilia RS 457 Monza Blue Trophy Livery',
    category: 'Bike',
  },
  'spiderman-miles-morales-aprilia-rs457': {
    slug: 'spiderman-miles-morales-aprilia-rs457',
    sku: 'WNK-BIK-RS457-SPM',
    name: 'Miles Morales Edition',
    make: 'Aprilia',
    model: 'RS 457',
    yearRange: '2024-2025',
    cardImage: '/assets/images/rs457/web/rs457-miles-morales-01.webp',
    galleryImages: [
      '/assets/images/rs457/web/rs457-miles-morales-01.webp',
      '/assets/images/rs457/web/rs457-miles-morales-02.webp',
    ],
    alt: 'Aprilia RS 457 Spider-Man Miles Morales Edition Wrap',
    category: 'Bike',
  },
  'venom-dark-aprilia-rs457': {
    slug: 'venom-dark-aprilia-rs457',
    sku: 'WNK-BIK-RS457-VNM',
    name: 'Venom Dark Edition',
    make: 'Aprilia',
    model: 'RS 457',
    yearRange: '2024-2025',
    cardImage: '/assets/images/rs457/web/rs457-venom-01.webp',
    galleryImages: [
      '/assets/images/rs457/web/rs457-venom-01.webp',
      '/assets/images/rs457/web/rs457-venom-02.webp',
    ],
    alt: 'Aprilia RS 457 Venom Dark Edition Wrap',
    category: 'Bike',
  },
  'corsa-frost-aprilia-rs457': {
    slug: 'corsa-frost-aprilia-rs457',
    sku: 'WNK-BIK-RS457',
    name: 'Corsa Frost Edition',
    make: 'Aprilia',
    model: 'RS 457',
    yearRange: '2024-2025',
    cardImage: '/assets/images/hero/web/corsa-frost-edition-aprilia-rs457.webp',
    galleryImages: [
      '/assets/images/hero/web/corsa-frost-edition-aprilia-rs457.webp',
      '/assets/images/vehicle-01-aprilia.jpg',
    ],
    heroPoster: '/assets/images/hero/web/corsa-frost-edition-aprilia-rs457.webp',
    alt: 'Aprilia RS 457 Corsa Frost Aerodynamic Wrap',
    category: 'Bike',
  },

  // ==========================================
  // KTM PRODUCTS
  // ==========================================
  'punisher-ktm-390-adventure': {
    slug: 'punisher-ktm-390-adventure',
    sku: 'WNK-BIK-390ADV-PUN',
    name: 'Punisher Tactical Edition',
    make: 'KTM',
    model: '390 Adventure',
    yearRange: '2020-2025',
    cardImage: '/assets/images/ktm/web/ktm-adv390-punisher-01.webp',
    galleryImages: [
      '/assets/images/ktm/web/ktm-adv390-punisher-01.webp',
      '/assets/images/ktm/web/ktm-adv390-punisher-02.webp',
    ],
    alt: 'KTM 390 Adventure Punisher Tactical Livery',
    category: 'Bike',
  },
  'corsa-apex-ktm-duke-390': {
    slug: 'corsa-apex-ktm-duke-390',
    sku: 'WNK-BIK-DUKE390',
    name: 'Corsa Apex Livery',
    make: 'KTM',
    model: 'Duke 390',
    yearRange: '2021-2025',
    cardImage: '/assets/images/vehicle-18-duke.jpg',
    galleryImages: ['/assets/images/vehicle-18-duke.jpg'],
    alt: 'KTM Duke 390 Corsa Apex Livery',
    category: 'Bike',
  },
  'stealth-ktm-duke-250': {
    slug: 'stealth-ktm-duke-250',
    sku: 'WNK-BIK-DUKE250',
    name: 'Stealth Edition Wrap',
    make: 'KTM',
    model: 'Duke 250',
    yearRange: '2021-2025',
    cardImage: '/assets/images/vehicle-18-duke.jpg',
    galleryImages: ['/assets/images/vehicle-18-duke.jpg'],
    alt: 'KTM Duke 250 Stealth Wrap',
    category: 'Bike',
  },
  'rally-ktm-390-adventure': {
    slug: 'rally-ktm-390-adventure',
    sku: 'WNK-BIK-390ADV',
    name: 'Rally Edition Wrap',
    make: 'KTM',
    model: '390 Adventure',
    yearRange: '2020-2025',
    cardImage: '/assets/images/vehicle-18-duke.jpg',
    galleryImages: ['/assets/images/vehicle-18-duke.jpg'],
    alt: 'KTM 390 Adventure Rally Wrap',
    category: 'Bike',
  },

  // ==========================================
  // HERO EDITORIAL SHOWCASE POSTERS
  // ==========================================
  'swoosh-monochrome': {
    slug: 'swoosh-monochrome',
    sku: 'WNK-CAR-SWOOSH',
    name: 'Swoosh / Monochrome',
    make: 'Volkswagen',
    model: 'Virtus',
    yearRange: '2022-2025',
    cardImage: '/assets/images/hero/web/swoosh-collection.webp',
    galleryImages: [
      '/assets/images/hero/web/swoosh-collection.webp',
      '/assets/images/virtus-swoosh.png',
      '/assets/images/vehicle-08-virtus-black.jpg',
      '/assets/images/vehicle-09-virtus-grey.png',
      '/assets/images/vehicle-11-virtus-blue.jpg',
      '/assets/images/vehicle-13-virtus-red.jpg',
    ],
    heroPoster: '/assets/images/hero/web/swoosh-collection.webp',
    alt: 'Volkswagen Virtus Swoosh Collection Livery',
    category: 'Car',
  },
  'nightshade-violet': {
    slug: 'nightshade-violet',
    sku: 'WNK-BIK-NIGHTSHADE',
    name: 'Nightshade / Violet',
    make: 'Kawasaki',
    model: 'Ninja 300',
    yearRange: '2020-2025',
    cardImage: '/assets/images/hero/web/nightshade-edition-kawasaki-ninja-300.webp',
    galleryImages: [
      '/assets/images/hero/web/nightshade-edition-kawasaki-ninja-300.webp',
      '/assets/images/vehicle-06-ninja300.jpg',
      '/assets/images/vehicle-19-zx6r.jpg',
    ],
    heroPoster: '/assets/images/hero/web/nightshade-edition-kawasaki-ninja-300.webp',
    alt: 'Kawasaki Ninja 300 Nightshade Violet Wrap',
    category: 'Bike',
  },
  'hornet-edition-bmw-f450gs': {
    slug: 'hornet-edition-bmw-f450gs',
    sku: 'WNK-BIK-F450GS',
    name: 'Hornet Edition Livery',
    make: 'BMW',
    model: 'F 450GS',
    yearRange: '2022-2025',
    cardImage: '/assets/images/hero/web/hornet-edition-f-450gs.webp',
    galleryImages: [
      '/assets/images/hero/web/hornet-edition-f-450gs.webp',
      '/assets/images/hero/web/top-gun-edition-f-450gs.webp',
      '/assets/images/hero/web/gs-dynamic-edition-f-450gs.webp',
      '/assets/images/vehicle-04-bmw-hornet.jpg',
    ],
    heroPoster: '/assets/images/hero/web/hornet-edition-f-450gs.webp',
    alt: 'BMW F 450GS Hornet Edition Wrap',
    category: 'Bike',
  },
  'glacier-ridge-bmw-r1250gs': {
    slug: 'glacier-ridge-bmw-r1250gs',
    sku: 'WNK-BIK-R1250GS',
    name: 'Glacier Ridge Edition',
    make: 'BMW',
    model: 'R1250 GS',
    yearRange: '2020-2025',
    cardImage: '/assets/images/hero/web/glacier-ridge-edition.webp',
    galleryImages: [
      '/assets/images/hero/web/glacier-ridge-edition.webp',
      '/assets/images/vehicle-12-bmw-glacier.jpg',
    ],
    heroPoster: '/assets/images/hero/web/glacier-ridge-edition.webp',
    alt: 'BMW R1250 GS Glacier Ridge Wrap',
    category: 'Bike',
  },
  'martini-racing-toyota-hilux': {
    slug: 'martini-racing-toyota-hilux',
    sku: 'WNK-CAR-HILUX',
    name: 'Martini Racing Collection',
    make: 'Toyota',
    model: 'Hilux',
    yearRange: '2022-2025',
    cardImage: '/assets/images/hero/web/hilux-martini-collection.webp',
    galleryImages: [
      '/assets/images/hero/web/hilux-martini-collection.webp',
      '/assets/images/vehicle-03-hilux.jpg',
      '/assets/images/vehicle-14-hilux-martini.jpg',
    ],
    heroPoster: '/assets/images/hero/web/hilux-martini-collection.webp',
    alt: 'Toyota Hilux Martini Racing Livery',
    category: 'Car',
  },
  'terrain-contour': {
    slug: 'terrain-contour',
    sku: 'WNK-CAR-TERRAIN',
    name: 'Terrain / Contour',
    make: 'Mahindra',
    model: 'Thar',
    yearRange: '2020-2025',
    cardImage: '/assets/images/vehicle-15-thar.jpg',
    galleryImages: ['/assets/images/vehicle-15-thar.jpg'],
    alt: 'Mahindra Thar Terrain Contour Wrap',
    category: 'Car',
  },
  'rim-stripe-decal-set': {
    slug: 'rim-stripe-decal-set',
    sku: 'WNK-DEC-RIMSTRIPE',
    name: 'Rim Stripe Decal Set',
    make: 'Universal',
    model: 'Universal',
    yearRange: '2018-2025',
    cardImage: '/assets/images/vehicle-16-decal.jpg',
    galleryImages: ['/assets/images/vehicle-16-decal.jpg', '/assets/images/vehicle-17-wheel.png'],
    alt: 'Universal Wheel Rim Stripe Decals',
    category: 'Universal',
  },
  'track-spec-tvs-apache-rr310': {
    slug: 'track-spec-tvs-apache-rr310',
    sku: 'WNK-BIK-RR310',
    name: 'Track Spec Livery',
    make: 'TVS',
    model: 'Apache RR 310',
    yearRange: '2020-2025',
    cardImage: '/assets/images/vehicle-01-aprilia.jpg',
    galleryImages: ['/assets/images/vehicle-01-aprilia.jpg'],
    alt: 'TVS Apache RR 310 Track Spec Livery',
    category: 'Bike',
  },
  'krt-stealth-kawasaki-zx6r': {
    slug: 'krt-stealth-kawasaki-zx6r',
    sku: 'WNK-BIK-ZX6R',
    name: 'KRT Stealth Edition',
    make: 'Kawasaki',
    model: 'ZX-6R',
    yearRange: '2023-2025',
    cardImage: '/assets/images/vehicle-19-zx6r.jpg',
    galleryImages: ['/assets/images/vehicle-19-zx6r.jpg'],
    alt: 'Kawasaki ZX-6R KRT Stealth Livery',
    category: 'Bike',
  },
  'superbike-kawasaki-zx10r': {
    slug: 'superbike-kawasaki-zx10r',
    sku: 'WNK-BIK-ZX10R',
    name: 'Superbike Livery',
    make: 'Kawasaki',
    model: 'ZX-10R',
    yearRange: '2021-2025',
    cardImage: '/assets/images/vehicle-19-zx6r.jpg',
    galleryImages: ['/assets/images/vehicle-19-zx6r.jpg'],
    alt: 'Kawasaki ZX-10R Superbike Livery',
    category: 'Bike',
  },
  'predator-dark-kawasaki-z900': {
    slug: 'predator-dark-kawasaki-z900',
    sku: 'WNK-BIK-Z900',
    name: 'Predator Dark Livery',
    make: 'Kawasaki',
    model: 'Z900',
    yearRange: '2021-2025',
    cardImage: '/assets/images/vehicle-20-z900.png',
    galleryImages: ['/assets/images/vehicle-20-z900.png'],
    alt: 'Kawasaki Z900 Predator Dark Livery',
    category: 'Bike',
  },
};

/**
 * Helper to fetch verified assets for any product by slug
 */
export function getProductAssets(slug: string): ProductAssetDefinition | undefined {
  return PRODUCT_ASSETS[slug];
}

/**
 * Filter products strictly by manufacturer make
 */
export function getProductsByMake(make: string): ProductAssetDefinition[] {
  return Object.values(PRODUCT_ASSETS).filter((p) => p.make.toLowerCase() === make.toLowerCase());
}

/**
 * Get all verified RS 457 products
 */
export function getApriliaRS457Products(): ProductAssetDefinition[] {
  return getProductsByMake('Aprilia');
}

/**
 * Get all verified KTM products
 */
export function getKTMProducts(): ProductAssetDefinition[] {
  return getProductsByMake('KTM');
}

