import type { Product } from "../data/catalog";
import type { ProductDto } from "./api-client";

const categoryImages: Record<string, string> = {
  electronics:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=82",
  home:
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=82",
  kitchen:
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=82",
  travel:
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=82",
  default:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
};

export function productDtoToDisplayProduct(product: ProductDto): Product {
  const categoryTitle = product.category?.title ?? "Curated";
  const image = imageForCategory(categoryTitle);
  const affiliateLink = product.affiliate_link || product.product_link || "#";

  return {
    id: product.id,
    name: product.title,
    brand: product.company?.title ?? "Their Markets",
    category: categoryTitle,
    collection: slugify(categoryTitle),
    price: product.price,
    msrp: Math.ceil(product.price * 1.18),
    rating: Number(product.rating ?? 0),
    image,
    gallery: [
      image,
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=82",
    ],
    material: product.category?.description ?? "Curated marketplace selection",
    summary: product.description || "Selected from the live Their Markets API.",
    curatorTake:
      product.description ||
      "This piece entered the edit through the live product catalog and is presented with current marketplace details.",
    amazonUrl: affiliateLink,
    asin: extractAmazonAsin(affiliateLink),
    specs: [
      `Rating: ${product.rating ?? 0}`,
      `Reviews: ${product.number_of_reviews ?? 0}`,
      `Category: ${categoryTitle}`,
      `Company: ${product.company?.title ?? "Unknown"}`,
    ],
  };
}

function imageForCategory(category: string) {
  const key = slugify(category);

  return categoryImages[key] ?? categoryImages.default;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractAmazonAsin(value: string) {
  if (/^[A-Z0-9]{10}$/i.test(value)) {
    return value.toUpperCase();
  }

  try {
    const url = new URL(value);
    const match = url.pathname.match(
      /\/(?:dp|gp\/product|exec\/obidos\/ASIN)\/([A-Z0-9]{10})/i,
    );

    return match?.[1]?.toUpperCase();
  } catch {
    return undefined;
  }
}
