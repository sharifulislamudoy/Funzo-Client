import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetails from "@/components/product/ProductDetails";
import { getProductBySlug, products } from "@/data/featuredProducts";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product not found | Funzo" };

  return {
    title: `${product.name} | Funzo`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}
