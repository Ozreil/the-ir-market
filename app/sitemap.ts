import type { MetadataRoute } from "next";
import { searchProducts } from "./lib/api-client";
import { absoluteUrl, siteUrl } from "./lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await searchProducts({
    page: 0,
    size: 100,
    sort_direction: "DESC",
    sort_value: "NUMBER_OF_REVIEWS",
  })
    .then((page) => page.content)
    .catch(() => []);

  return [
    {
      changeFrequency: "daily",
      lastModified: now,
      priority: 1,
      url: siteUrl,
    },
    {
      changeFrequency: "daily",
      lastModified: now,
      priority: 0.8,
      url: absoluteUrl("/category"),
    },
    ...products.map((product) => ({
      changeFrequency: "weekly" as const,
      lastModified: product.info_date ? new Date(product.info_date) : now,
      priority: 0.7,
      url: absoluteUrl(`/product/${product.id}`),
    })),
  ];
}
