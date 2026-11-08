export interface Accessory {
  id: string;
  name: string;
  shortName: string;
  price: number;
  image: string;
  description: string;
  sku: string;
}

export const ACCESSORIES: Accessory[] = [
  {
    id: 'acc-rim-stickers',
    name: 'Rim stickers',
    shortName: 'Rim stickers',
    price: 899,
    image: '/assets/images/accessories/rim-stickers.svg',
    description: 'Precision-curved reflective wheel rim tape set for 17" motorcycle wheels.',
    sku: 'WNK-ACC-RIM-01',
  },
  {
    id: 'acc-name-number',
    name: 'Name & number decals',
    shortName: 'Name & number',
    price: 499,
    image: '/assets/images/accessories/name-number.png',
    description: 'Custom race numbers and rider name decals in aerodynamic font.',
    sku: 'WNK-ACC-NUM-01',
  },
  {
    id: 'acc-sticker-set',
    name: 'Sticker set',
    shortName: 'Sticker set',
    price: 499,
    image: '/assets/images/accessories/sticker-set.svg',
    description: 'High-tack aerodynamic sponsor and accent sticker pack.',
    sku: 'WNK-ACC-STK-01',
  },
  {
    id: 'acc-microfibre-cloth',
    name: 'Microfibre cloth',
    shortName: 'Microfibre cloth',
    price: 199,
    image: '/assets/images/accessories/microfibre-cloth.png',
    description: '400 GSM edgeless microfibre cloth for scratch-free wrap cleaning.',
    sku: 'WNK-ACC-CLT-01',
  },
];
