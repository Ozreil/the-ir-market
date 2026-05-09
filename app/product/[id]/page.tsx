import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { JsonLd } from "../../components/JsonLd";
import { TopNavBar } from "../../components/TopNavBar";
import { CuratorTake } from "../../components/product-detail/CuratorTake";
import { ProductBuyPanel } from "../../components/product-detail/ProductBuyPanel";
import { ProductGallery } from "../../components/product-detail/ProductGallery";
import { RelatedRecommendations } from "../../components/product-detail/RelatedRecommendations";
import {
  getProductById,
  getProductWithNeighbors,
  type ProductDto,
} from "../../lib/api-client";
import { productDtoToDisplayProduct } from "../../lib/product-display";
import { absoluteUrl, productJsonLd, siteName } from "../../lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const apiProductData = await getApiProductData(id);
  const product = apiProductData?.product;

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const description = truncate(product.summary, 156);
  const productUrl = absoluteUrl(`/product/${id}`);
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : absoluteUrl(product.image)
    : absoluteUrl("/full-logo.jpeg");

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      description,
      images: [
        {
          alt: product.name,
          url: imageUrl,
        },
      ],
      siteName,
      title: product.name,
      type: "website",
      url: productUrl,
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [imageUrl],
      title: product.name,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiProductData = await getApiProductData(id);

  if (!apiProductData?.product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#121212]">
      <JsonLd data={productJsonLd(apiProductData.product)} />
      <TopNavBar />
      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery product={apiProductData.product} />
          <ProductBuyPanel product={apiProductData.product} />
        </div>
      </section>

      <CuratorTake product={apiProductData.product} />
      <RelatedRecommendations products={apiProductData.neighbors} />
      <Footer />
    </main>
  );
}

function truncate(value: string, maxLength: number) {
  return value.length > maxLength
    ? `${value.slice(0, maxLength - 1).trim()}...`
    : value;
}

async function getApiProductData(id: string) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return null;
  }

  try {
    const result = await getProductWithNeighbors(numericId);

    return {
      neighbors: result.neighbors.map(productDtoToDisplayProduct),
      product: productDtoToDisplayProduct(result.product),
    };
  } catch {
    try {
      const product = await getProductById(numericId);

      return {
        neighbors: [] as ReturnType<typeof productDtoToDisplayProduct>[],
        product: productDtoToDisplayProduct(product as ProductDto),
      };
    } catch {
      return null;
    }
  }
}
