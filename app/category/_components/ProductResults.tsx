"use client";

import { ProductCard } from "../../components/ProductCard";
import type { Product } from "../../data/catalog";
import type { PageProductDto } from "../../lib/api-client";

type ProductResultsProps = {
  apiError: string | null;
  apiPage: PageProductDto | null;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  pageNumber: number;
  products: Product[];
};

export function ProductResults({
  apiError,
  apiPage,
  isLoading,
  onPageChange,
  pageNumber,
  products,
}: ProductResultsProps) {
  return (
    <section>
      <div className="mb-6 flex items-end justify-between border-b border-black/10 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]">
            Product grid
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em]">
            {apiPage ? apiPage.totalElements : products.length} curated results
          </h2>
        </div>
        <div className="hidden items-center gap-2 text-sm text-[#756f65] sm:flex">
          <span className="h-px w-10 bg-gold" />
          {isLoading
            ? "Loading"
            : apiPage
              ? `Page ${apiPage.number + 1} of ${apiPage.totalPages || 1}`
              : "Fallback edit"}
        </div>
      </div>

      {apiError ? (
        <p className="mb-6 border border-gold/30 bg-[#fff8df] px-4 py-3 text-sm text-[#5c4a12]">
          {apiError}
        </p>
      ) : null}

      {products.length > 0 ? (
        <div
          className={`grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${
            isLoading ? "opacity-55" : ""
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border border-black/10 bg-white px-6 py-16 text-center">
          <h3 className="font-serif text-3xl">No pieces match this edit.</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#666056]">
            Loosen a filter or search a broader term, category, or price range.
          </p>
        </div>
      )}

      <nav
        aria-label="Pagination"
        className="mt-10 flex justify-center gap-2 text-sm"
      >
        {Array.from({
          length: Math.min(apiPage?.totalPages ?? 3, 5),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={`h-10 w-10 border ${
              index === pageNumber
                ? "border-[#121212] bg-[#121212] text-white"
                : "border-black/12 bg-white text-[#121212] hover:border-gold"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </nav>
    </section>
  );
}
