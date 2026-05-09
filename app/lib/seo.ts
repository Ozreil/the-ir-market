import type { Product } from "./product-display";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://theirmarkets.com";

export const siteName = "Their Markets";

export const defaultDescription =
  "Their Markets is a curated affiliate shopping market for Amazon products, trusted picks, home essentials, electronics, kitchen finds, and gift ideas.";

export const homeTitle =
  "Their Markets | Curated Amazon Affiliate Shopping Market";

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, siteUrl).toString();
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    description: product.summary,
    image: product.gallery.map((image) =>
      image.startsWith("http") ? image : absoluteUrl(image),
    ),
    name: product.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: product.price,
      priceCurrency: "USD",
      url: product.amazonUrl,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    description: defaultDescription,
    logo: absoluteUrl("/logo.png"),
    name: siteName,
    sameAs: ["https://github.com/Ozreil/the-ir-market"],
    url: siteUrl,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: defaultDescription,
    name: siteName,
    potentialAction: {
      "@type": "SearchAction",
      query: "required name=search_term_string",
      target: `${absoluteUrl("/category")}?query={search_term_string}`,
    },
    url: siteUrl,
  };
}

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    description: defaultDescription,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    name: homeTitle,
    url: siteUrl,
  };
}
