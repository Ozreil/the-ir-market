import Image from "next/image";
import { notFound } from "next/navigation";
import { AmazonProductImage } from "../../components/AmazonProductImage";
import { AmazonProductTitle } from "../../components/AmazonProductTitle";
import { Footer } from "../../components/Footer";
import { ProductCard } from "../../components/ProductCard";
import { TopNavBar } from "../../components/TopNavBar";
import { amazonLinkAttributes } from "../../data/affiliate";
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
          <div>
            <div className="relative aspect-5/6 overflow-hidden bg-[#ededeb]">
              <AmazonProductImage
                asin={product.asin}
                fallbackSrc={product.image}
                alt={product.name}
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {product.gallery.map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-square overflow-hidden border border-black/10 bg-white"
                >
                  <Image
                    src={image}
                    alt={`${product.name} detail ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 16vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
              {product.brand} / {product.category}
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
              <AmazonProductTitle
                asin={product.asin}
                fallbackTitle={product.name}
              />
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-8 text-[#5c574e]">
              {product.summary}
            </p>

            <div className="mt-8 grid grid-cols-2 border-y border-black/10">
              <div className="py-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]">
                  Curated price
                </p>
                <p className="mt-2 text-4xl font-semibold">${product.price}</p>
              </div>
              <div className="border-l border-black/10 py-5 pl-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]">
                  MSRP
                </p>
                <p className="mt-2 text-4xl font-light text-[#7c735f] line-through">
                  ${product.msrp}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={product.amazonUrl}
                {...amazonLinkAttributes}
                className="inline-flex min-h-14 items-center justify-center bg-gold px-6 text-xs font-bold uppercase tracking-[0.22em] text-[#121212] transition hover:bg-[#121212] hover:text-white"
              >
                Buy on Amazon
              </a>
              <a
                href="mailto:concierge@theirmarket.example"
                className="inline-flex min-h-14 items-center justify-center border border-[#121212] px-6 text-xs font-bold uppercase tracking-[0.18em] transition hover:border-gold hover:text-[#8f741f]"
              >
                Request Concierge Assistance
              </a>
            </div>

            <div className="mt-10">
              <h2 className="font-serif text-3xl tracking-[-0.03em]">
                Features and specs
              </h2>
              <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
                {product.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center justify-between gap-6 py-4 text-sm text-[#4f4a42]"
                  >
                    <span>{spec}</span>
                    <span className="h-px w-12 bg-gold" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
              Expert&apos;s Take
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.04em]">
              The Curator on why it matters.
            </h2>
          </div>
          <blockquote className="border-l border-gold pl-8 font-serif text-3xl leading-[1.35] tracking-[-0.03em] text-[#2a2722]">
            {product.curatorTake}
            <footer className="mt-7 font-sans text-xs font-bold uppercase tracking-[0.24em] text-[#7c735f]">
              The Curator / Their Market Luxury
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
                Complete the set
              </p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em]">
                Related recommendations
              </h2>
            </div>
          </div>
          <div className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-6 overflow-x-auto pb-4">
            {related.map((item) => (
              <div key={item.id} className="w-[320px]">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
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
