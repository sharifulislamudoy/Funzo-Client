export type ProductSpecifications = {
  scale: string;
  drive: string;
  motor: string;
  esc: string;
  battery: string;
  topSpeed: string;
  radio: string;
  tires: string;
  weight: string;
  suspension: string;
  drivetrain: string;
  wheelieBar: string;
};

export type FunzoProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  categorySlug: string;
  badge?: string;
  images: [string, string, ...string[]];
  price: number;
  compareAtPrice?: number;
  stock: number;
  rating?: number;
  reviewCount?: number;
  isFeatured: boolean;
  specifications: ProductSpecifications;
  href?: string;
};

export type ProductCardProps = {
  product: FunzoProduct;
};
