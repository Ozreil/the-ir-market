"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CategoryFilters } from "./_components/CategoryFilters";
import { ProductResults } from "./_components/ProductResults";
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
  initialCategoryId?: string;
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
  initialCategoryId = "",
  initialQuery = "",
  initialPage,
}: CategoryExperienceProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
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
  const hasMounted = useRef(false);

  const visibleProducts = useMemo(() => {
    if (apiPage?.content?.length) {
      return apiPage.content.map(productDtoToDisplayProduct);
    }

    return [];
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
        "Live product API is unavailable. No local fallback products are being used.",
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
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const timeout = window.setTimeout(() => {
      void fetchProducts();
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [fetchProducts]);

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      <CategoryFilters
        apiCategories={apiCategories}
        categoryId={categoryId}
        companyId={companyId}
        onCategoryChange={(value) => {
          setCategoryId(value);
          setPageNumber(0);
        }}
        onCompanyChange={(value) => {
          setCompanyId(value);
          setPageNumber(0);
        }}
        onPriceChange={(index) => {
          setPriceIndex(index);
          setPageNumber(0);
        }}
        onQueryChange={(value) => {
          setQuery(value);
          setPageNumber(0);
        }}
        onSortDirectionChange={(value) => {
          setSortDirection(value);
          setPageNumber(0);
        }}
        onSortValueChange={(value) => {
          setSortValue(value);
          setPageNumber(0);
        }}
        priceIndex={priceIndex}
        priceRanges={priceRanges}
        query={query}
        sortDirection={sortDirection}
        sortOptions={sortOptions}
        sortValue={sortValue}
      />
      <ProductResults
        apiError={apiError}
        apiPage={apiPage}
        isLoading={isLoading}
        onPageChange={setPageNumber}
        pageNumber={pageNumber}
        products={visibleProducts}
      />
    </div>
  );
}
