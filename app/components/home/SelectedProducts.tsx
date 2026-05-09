import Link from "next/link";
import { ProductCard } from "../ProductCard";
import type { Product } from "../../data/catalog";

export function SelectedProducts({ products }: { products: Product[] }) {
  return (
    <section id="selected" className="bg-white px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
              Curated excellence
            </p>
            <h2 className="mt-4 font-serif text-5xl tracking-[-0.04em]">
              Selected for you.
            </h2>
          </div>
          <Link
            href="/category"
            className="w-fit border border-[#121212] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-gold hover:bg-gold"
          >
            View all products
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
