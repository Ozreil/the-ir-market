"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { products as fallbackProducts } from "../data/catalog";
import {
  getProductsByCompanyAndCategory,
  searchProducts,
  type CategoryDto,
  type PageProductDto,
  type SortDirection,
  type SortValue,
} from "../lib/api-client";
import { productDtoToDisplayProduct } from "../lib/product-display";

type CategoryExperienceProps = {
  apiCategories: CategoryDto[];
  initialQuery?: string;
  initialPage?: PageProductDto | null;
};

const priceRanges = [
  { label: "All prices", min: undefined, max: undefined },
  { label: "Under $250", min: undefined, max: 250 },
  { label: "$250 - $750", min: 250, max: 750 },
  { label: "$750+", min: 750, max: undefined },
];

const sortOptions: Array<{ label: string; value: SortValue }> = [
  { label: "Price", value: "PRICE" },
  { label: "Rating", value: "RATING" },
  { label: "Reviews", value: "NUMBER_OF_REVIEWS" },
];

export function CategoryExperience({
  apiCategories,
  initialQuery = "",
  initialPage,
}: CategoryExperienceProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [priceIndex, setPriceIndex] = useState(0);
  const [sortValue, setSortValue] = useState<SortValue>("RATING");
  const [sortDirection, setSortDirection] = useState<SortDirection>("DESC");
  const [pageNumber, setPageNumber] = useState(0);
  const [apiPage, setApiPage] = useState<PageProductDto | null>(
    initialPage ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const visibleProducts = useMemo(() => {
    if (apiPage?.content?.length) {
      return apiPage.content.map(productDtoToDisplayProduct);
    }

    return fallbackProducts;
  }, [apiPage]);

  const fetchProducts = useCallback(async () => {
    const selectedPrice = priceRanges[priceIndex];

    setIsLoading(true);
    setApiError(null);

    try {
      const page =
        companyId && categoryId
          ? await getProductsByCompanyAndCategory({
              category_id: Number(categoryId),
              company_id: Number(companyId),
              page: pageNumber,
              size: 12,
              sort_direction: sortDirection,
              sort_value: sortValue,
            })
          : await searchProducts({
              categories: categoryId ? [Number(categoryId)] : undefined,
              max_price: selectedPrice.max,
              min_price: selectedPrice.min,
              page: pageNumber,
              size: 12,
              sort_direction: sortDirection,
              sort_value: sortValue,
              term: query,
            });

      setApiPage(page);
    } catch {
      setApiError(
        "Live product API is unavailable. Showing curated fallback products.",
      );
      setApiPage(null);
    } finally {
      setIsLoading(false);
    }
  }, [
    categoryId,
    companyId,
    pageNumber,
    priceIndex,
    query,
    sortDirection,
    sortValue,
  ]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void fetchProducts();
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [fetchProducts]);

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      <aside className="h-fit border border-black/10 bg-white p-5 lg:sticky lg:top-28">
        <div>
          <label
            htmlFor="category-query"
            className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]"
          >
            Search
          </label>
          <input
            id="category-query"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPageNumber(0);
            }}
            placeholder="Headphones, leather, coffee"
            className="mt-3 h-11 w-full border border-black/12 px-3 text-sm outline-none transition focus:border-gold"
          />
        </div>

        <div className="mt-7 grid gap-5">
          <FilterSelect
            label="Category"
            value={categoryId}
            onChange={(value) => {
              setCategoryId(value);
              setPageNumber(0);
            }}
            options={apiCategories.map((item) => ({
              label: item.title,
              value: String(item.id),
            }))}
          />

          <div>
            <label
              htmlFor="company-id"
              className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]"
            >
              Company ID
            </label>
            <input
              id="company-id"
              inputMode="numeric"
              min={1}
              type="number"
              value={companyId}
              onChange={(event) => {
                setCompanyId(event.target.value);
                setPageNumber(0);
              }}
              placeholder="Optional"
              className="mt-3 h-11 w-full border border-black/12 px-3 text-sm outline-none transition focus:border-gold"
            />
            <p className="mt-2 text-xs leading-5 text-[#756f65]">
              When company and category are set, this page uses the dedicated
              company/category endpoint.
            </p>
          </div>

          <FilterSelect
            label="Sort by"
            value={sortValue}
            onChange={(value) => {
              setSortValue(value as SortValue);
              setPageNumber(0);
            }}
            options={sortOptions}
          />

          <FilterSelect
            label="Direction"
            value={sortDirection}
            onChange={(value) => {
              setSortDirection(value as SortDirection);
              setPageNumber(0);
            }}
            options={[
              { label: "Descending", value: "DESC" },
              { label: "Ascending", value: "ASC" },
            ]}
          />
        </div>

        <fieldset className="mt-7 border-t border-black/10 pt-6">
          <legend className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]">
            Price range
          </legend>
          <div className="mt-4 grid gap-3">
            {priceRanges.map((range, index) => (
              <label
                key={range.label}
                className="flex items-center gap-3 text-sm text-[#3d3932]"
              >
                <input
                  type="radio"
                  name="price"
                  checked={priceIndex === index}
                  onChange={() => {
                    setPriceIndex(index);
                    setPageNumber(0);
                  }}
                  className="accent-[#d4af37]"
                />
                {range.label}
              </label>
            ))}
          </div>
        </fieldset>
      </aside>

      <section>
        <div className="mb-6 flex items-end justify-between border-b border-black/10 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]">
              Product grid
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em]">
              {apiPage ? apiPage.totalElements : visibleProducts.length} curated
              results
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

        {visibleProducts.length > 0 ? (
          <div className={`grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${isLoading ? "opacity-55" : ""}`}>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="border border-black/10 bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-3xl">No pieces match this edit.</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#666056]">
              Loosen a filter or search a broader term, category, or price
              range.
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
              onClick={() => setPageNumber(index)}
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
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 h-11 w-full border border-black/12 bg-white px-3 text-sm outline-none transition focus:border-gold"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
