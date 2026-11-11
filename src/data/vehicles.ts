export interface VehicleVariant {
  name: string;
  bodyStyle?: string;
}

export interface VehicleModel {
  name: string;
  type: 'Car' | 'Bike';
  years: number[];
  variants: string[];
}

export interface VehicleMake {
  name: string;
  type: 'Car' | 'Bike';
  models: VehicleModel[];
}

export const VEHICLE_DATABASE: VehicleMake[] = [
  {
    name: 'Volkswagen',
    type: 'Car',
    models: [
      {
        name: 'Virtus',
        type: 'Car',
        years: [2022, 2023, 2024, 2025],
        variants: ['GT 1.5 TSI', 'Highline 1.0 TSI', 'Topline 1.0 TSI', 'Comfortline'],
      },
      {
        name: 'Taigun',
        type: 'Car',
        years: [2022, 2023, 2024, 2025],
        variants: ['GT Plus', 'Topline', 'Highline'],
      },
      {
        name: 'Polo',
        type: 'Car',
        years: [2018, 2019, 2020, 2021, 2022],
        variants: ['GT TSI', 'Highline Plus', 'Comfortline'],
      },
    ],
  },
  {
    name: 'Mahindra',
    type: 'Car',
    models: [
      {
        name: 'Thar',
        type: 'Car',
        years: [2020, 2021, 2022, 2023, 2024, 2025],
        variants: ['LX Hard Top 4x4', 'LX Soft Top 4x4', 'AX Opt', 'Earth Edition'],
      },
      {
        name: 'Scorpio-N',
        type: 'Car',
        years: [2022, 2023, 2024, 2025],
        variants: ['Z8L 4x4', 'Z8', 'Z6', 'Z4'],
      },
      {
        name: 'XUV700',
        type: 'Car',
        years: [2021, 2022, 2023, 2024, 2025],
        variants: ['AX7 L AWD', 'AX7', 'AX5', 'MX'],
      },
    ],
  },
  {
    name: 'Toyota',
    type: 'Car',
    models: [
      {
        name: 'Hilux',
        type: 'Car',
        years: [2022, 2023, 2024, 2025],
        variants: ['High 4x4 AT', 'High 4x4 MT', 'Standard 4x4 MT'],
      },
      {
        name: 'Fortuner',
        type: 'Car',
        years: [2020, 2021, 2022, 2023, 2024, 2025],
        variants: ['GR-S 4x4 AT', '4x4 AT Diesel', '4x2 AT Petrol'],
      },
    ],
  },
  {
    name: 'BMW (Car)',
    type: 'Car',
    models: [
      {
        name: '3 Series (M340i)',
        type: 'Car',
        years: [2021, 2022, 2023, 2024, 2025],
        variants: ['xDrive M340i', 'Gran Limousine M Sport'],
      },
      {
        name: 'M2',
        type: 'Car',
        years: [2023, 2024, 2025],
        variants: ['Coupe AT', 'Coupe MT'],
      },
    ],
  },
  {
    name: 'Kawasaki',
    type: 'Bike',
    models: [
      {
        name: 'Ninja 300',
        type: 'Bike',
        years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
        variants: ['Standard', 'ABS Standard', 'Special Edition'],
      },
      {
        name: 'Ninja ZX-6R',
        type: 'Bike',
        years: [2023, 2024, 2025, 2026],
        variants: ['Standard', 'KRT Edition'],
      },
      {
        name: 'ZX-10R',
        type: 'Bike',
        years: [2021, 2022, 2023, 2024, 2025],
        variants: ['Standard ABS', 'KRT Edition'],
      },
      {
        name: 'Z900',
        type: 'Bike',
        years: [2021, 2022, 2023, 2024, 2025],
        variants: ['Standard', 'Standard ABS', 'SE Edition'],
      },
      {
        name: 'Z1000',
        type: 'Bike',
        years: [2017, 2018, 2019, 2020],
        variants: ['Standard'],
      },
      {
        name: 'Z1100',
        type: 'Bike',
        years: [2017],
        variants: ['Standard'],
      },
    ],
  },
  {
    name: 'KTM',
    type: 'Bike',
    models: [
      {
        name: 'Duke 390',
        type: 'Bike',
        years: [2021, 2022, 2023, 2024, 2025],
        variants: ['Gen 3 (2024+)', 'Gen 2 (2021-2023)'],
      },
      {
        name: 'Duke 250',
        type: 'Bike',
        years: [2021, 2022, 2023, 2024, 2025],
        variants: ['Standard ABS'],
      },
      {
        name: '390 Adventure',
        type: 'Bike',
        years: [2020, 2021, 2022, 2023, 2024, 2025],
        variants: ['X', 'R'],
      },
      {
        name: 'RC 390',
        type: 'Bike',
        years: [2022, 2023, 2024, 2025],
        variants: ['GP Edition', 'Standard'],
      },
    ],
  },
  {
    name: 'Aprilia',
    type: 'Bike',
    models: [
      {
        name: 'RS 457',
        type: 'Bike',
        years: [2024, 2025],
        variants: ['Standard', 'GP Replica'],
      },
    ],
  },
  {
    name: 'BMW',
    type: 'Bike',
    models: [
      {
        name: 'F 450 GS',
        type: 'Bike',
        years: [2026],
        variants: ['Base', 'Exclusive', 'GS Trophy'],
      },
      {
        name: 'R 1250 GS',
        type: 'Bike',
        years: [2020, 2021, 2022, 2023, 2024, 2025],
        variants: ['Adventure Rallye', 'Triple Black', 'Standard'],
      },
      {
        name: 'G 310 GS',
        type: 'Bike',
        years: [2020, 2021, 2022, 2023, 2024, 2025],
        variants: ['Standard', 'Rallye Style', 'Triple Black'],
      },
    ],
  },
  {
    name: 'TVS',
    type: 'Bike',
    models: [
      {
        name: 'Apache RR 310',
        type: 'Bike',
        years: [2020, 2021, 2022, 2023, 2024, 2025],
        variants: ['BTO Dynamic Kit', 'BTO Race Kit', 'Standard'],
      },
    ],
  },
  {
    name: 'Royal Enfield',
    type: 'Bike',
    models: [
      {
        name: 'Himalayan 450',
        type: 'Bike',
        years: [2023, 2024, 2025],
        variants: ['Kamet White', 'Hanle Black', 'Kaza Brown'],
      },
      {
        name: 'Continental GT 650',
        type: 'Bike',
        years: [2020, 2021, 2022, 2023, 2024, 2025],
        variants: ['Apex Grey', 'Mr Clean', 'Rocker Red'],
      },
    ],
  },
];

