"use client";

import { FilterSelect } from "./FilterSelect";
import type { CategoryDto, SortDirection, SortValue } from "../../lib/api-client";

type PriceRange = {
  label: string;
  min?: number;
  max?: number;
};

type CategoryFiltersProps = {
  apiCategories: CategoryDto[];
  categoryId: string;
  companyId: string;
  onCategoryChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onQueryChange: (value: string) => void;
  onSortDirectionChange: (value: SortDirection) => void;
  onSortValueChange: (value: SortValue) => void;
  priceIndex: number;
  priceRanges: PriceRange[];
  query: string;
  sortDirection: SortDirection;
  sortOptions: Array<{ label: string; value: SortValue }>;
  sortValue: SortValue;
};

export function CategoryFilters({
  apiCategories,
  categoryId,
  companyId,
  onCategoryChange,
  onCompanyChange,
  onPriceChange,
  onQueryChange,
  onSortDirectionChange,
  onSortValueChange,
  priceIndex,
  priceRanges,
  query,
  sortDirection,
  sortOptions,
  sortValue,
}: CategoryFiltersProps) {
  return (
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
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Headphones, leather, coffee"
          className="mt-3 h-11 w-full border border-black/12 px-3 text-sm outline-none transition focus:border-gold"
        />
      </div>

      <div className="mt-7 grid gap-5">
        <FilterSelect
          label="Category"
          value={categoryId}
          onChange={onCategoryChange}
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
            onChange={(event) => onCompanyChange(event.target.value)}
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
          onChange={(value) => onSortValueChange(value as SortValue)}
          options={sortOptions}
        />

        <FilterSelect
          label="Direction"
          value={sortDirection}
          onChange={(value) => onSortDirectionChange(value as SortDirection)}
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
                onChange={() => onPriceChange(index)}
                className="accent-[#d4af37]"
              />
              {range.label}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
