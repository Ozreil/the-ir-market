import Link from "next/link";
import { ProductCard } from "../ProductCard";
import type { Product } from "../../lib/product-display";

export function SelectedProducts({ products }: { products: Product[] }) {
  return (
    <section id="selected" className="bg-white px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
              Popular affiliate picks
            </p>
            <h2 className="mt-4 font-serif text-5xl">
              Start with what people already compare.
            </h2>
          </div>
          <Link
            href="/category"
            className="w-fit border border-[#121212] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-gold hover:bg-gold"
          >
            View all products
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="border border-black/10 px-6 py-14 text-center">
            <h3 className="font-serif text-3xl">
              Product picks are loading soon.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#666056]">
              The homepage will show the most reviewed products once the
              product feed is available.
            </p>
            <Link
              href="/category"
              className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#121212] px-6 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-[#121212]"
            >
              Open catalog
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
