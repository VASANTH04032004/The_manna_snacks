/* ============================================================
   Product Type — Category is a FREE-FORM string, never an enum
   ============================================================ */

export interface ProductPrice {
  retail: number;
  wholesale: Record<string, number>; // tier label → price, e.g. "50+ packs": 35
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // Free-form — dynamically drives all filter UI
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  price: ProductPrice;
  weight: string;
  nutrition?: Record<string, string>;
  badges?: string[];
  featured?: boolean;
  inStock: boolean;
}

/* ============================================================
   Cart Types
   ============================================================ */

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WholesaleInquiryItem {
  productId: string;
  quantity: number;
  tier: string;
}

export interface WholesaleInquiry {
  items: WholesaleInquiryItem[];
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  };
}
