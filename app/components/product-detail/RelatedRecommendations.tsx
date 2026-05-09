import { ProductCard } from "../ProductCard";
import type { Product } from "../../lib/product-display";

export function RelatedRecommendations({ products }: { products: Product[] }) {
  return (
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
          {products.map((item) => (
            <div key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
