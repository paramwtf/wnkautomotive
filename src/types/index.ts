export interface CartItem {
  id: string; // unique item id: e.g. `${sku}-${colour}-${finish}-${coverage}-${wheelSize}`
  productId: number;
  sku: string;
  name: string;
  slug: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number | string;
  vehicleVariant: string;
  colour: string;
  finish: string;
  coverage: string;
  wheelSize?: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface Order {
  orderRef: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  status: 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'DISPATCHED';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  vehicle: string;
  wrapDesign: string;
  rating: number;
  date: string;
  quote: string;
}

export interface FAQ {
  id: string;
  category: 'Fitment' | 'Installation' | 'Materials & Care' | 'Orders & Shipping';
  question: string;
  answer: string;
}

export interface ShowcaseStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  vehicle: string;
  wrapCollection: string;
  finish: string;
  year: string;
  photographer: string;
  location: string;
  coverImage: string;
  gallery: string[];
  storyText: string[];
  specs: { label: string; value: string }[];
}

