import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { TopNavBar } from "../../components/TopNavBar";
import { CuratorTake } from "../../components/product-detail/CuratorTake";
import { ProductBuyPanel } from "../../components/product-detail/ProductBuyPanel";
import { ProductGallery } from "../../components/product-detail/ProductGallery";
import { RelatedRecommendations } from "../../components/product-detail/RelatedRecommendations";
import { getProduct, relatedProducts } from "../../data/catalog";
import {
  getProductById,
  getProductWithNeighbors,
  type ProductDto,
} from "../../lib/api-client";
import { productDtoToDisplayProduct } from "../../lib/product-display";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiProductData = await getApiProductData(id);
  const fallbackProduct = getProduct(id);
  const product =
    apiProductData?.product ??
    (fallbackProduct ? fallbackProduct : undefined);

  if (!product) {
    notFound();
  }

  const related =
    apiProductData?.neighbors ??
    (fallbackProduct ? relatedProducts(fallbackProduct) : []);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#121212]">
      <TopNavBar />
      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery product={product} />
          <ProductBuyPanel product={product} />
        </div>
      </section>

      <CuratorTake product={product} />
      <RelatedRecommendations products={related} />
      <Footer />
    </main>
  );
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
