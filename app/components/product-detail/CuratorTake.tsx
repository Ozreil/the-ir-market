import type { Product } from "../../lib/product-display";

export function CuratorTake({ product }: { product: Product }) {
  return (
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
          {product.curatorTake || product.summary}
          <footer className="mt-7 font-sans text-xs font-bold uppercase tracking-[0.24em] text-[#7c735f]">
            The Curator / Their Market Luxury
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
