export type FlowerCategory =
  | 'bouquets'
  | 'roses'
  | 'tulips'
  | 'peonies'
  | 'luxury'
  | 'wedding'
  | 'birthday'
  | 'romance'
  | 'custom'
  | 'vases-gifts';

export type FlowerOccasion =
  | 'anniversary'
  | 'birthday'
  | 'sympathy'
  | 'congratulations'
  | 'romance'
  | 'wedding'
  | 'everyday'
  | 'corporate';

export type ColorTone =
  | 'blush'
  | 'crimson'
  | 'white'
  | 'peach'
  | 'pastel'
  | 'sunlit'
  | 'burgundy'
  | 'lavender';

export interface ProductStem {
  name: string;
  count: number;
  origin?: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  botanicalName: string;
  slug: string;
  category: FlowerCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'Seasonal' | 'Exclusive' | 'New' | 'Signature';
  badgeAr?: string;
  shortDescription: string;
  shortDescriptionAr: string;
  fullDescription: string;
  fullDescriptionAr: string;
  images: string[];
  colorTone: ColorTone;
  occasion: FlowerOccasion[];
  stemCount: number;
  stems: ProductStem[];
  dimensions: string; // e.g., "55cm H × 45cm W"
  scentProfile: 'Delicate & Fresh' | 'Rich & Velvet' | 'Subtle Sweet' | 'Green & Crisp' | 'Unscented';
  scentProfileAr: string;
  careInstructions: string[];
  careInstructionsAr: string[];
  inStock: boolean;
  vaseIncluded: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: 'Classic' | 'Grand' | 'Majestic';
  includeVase: boolean;
  vasePrice: number;
  giftCardMessage?: string;
  deliveryDate?: string;
  deliverySlot?: string;
}

export interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  area: string;
  address: string;
  buildingDetails?: string;
  deliveryInstructions?: string;
  deliveryDate: string;
  deliverySlot: string;
  isGift: boolean;
  recipientName?: string;
  recipientPhone?: string;
  giftMessage?: string;
}

export type PaymentMethod = 'card' | 'apple-pay' | 'cod' | 'bank-transfer';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  delivery: DeliveryDetails;
  paymentMethod: PaymentMethod;
  status: 'confirmed' | 'crafting' | 'courier_dispatched' | 'delivered';
}

export interface CustomBouquetSelection {
  baseFlower: string;
  accentFlowers: string[];
  greenery: string;
  wrappingStyle: 'French Silk Paper' | 'Linen Ribbon & Kraft' | 'Minimalist Black Box' | 'Vase Arrangement';
  vaseOption?: 'Signature Matte Ceramic' | 'Fluted Crystal Glass' | 'None';
  giftMessage: string;
  stemTier: 'Petite (15 stems)' | 'Signature (28 stems)' | 'Grand (45 stems)';
}
