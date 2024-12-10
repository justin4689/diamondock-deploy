export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    rating: number;
    totalReviews: number;
    images: string[];
    colors: string[];
    sizes: string[];
    inStock: boolean;
    category: string;
    brand: string;
    specifications: { [key: string]: string };
  }