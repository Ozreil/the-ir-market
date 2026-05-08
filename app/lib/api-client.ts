import axios, { type AxiosRequestConfig } from "axios";

export type SortValue = "PRICE" | "RATING" | "NUMBER_OF_REVIEWS";
export type SortDirection = "ASC" | "DESC";

export type ProductSearchRequest = {
  term?: string;
  categories?: number[];
  min_price?: number;
  max_price?: number;
  page?: number;
  size?: number;
  sort_value?: SortValue;
  sort_direction?: SortDirection;
};

export type CategoryDto = {
  id: number;
  title: string;
  description: string;
};

export type CompanyDto = {
  id: number;
  title: string;
  description: string;
};

export type SortObject = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type PageableObject = {
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  offset: number;
  sort: SortObject;
};

export type ProductDto = {
  id: number;
  category: CategoryDto;
  company: CompanyDto;
  title: string;
  description: string;
  affiliate_link: string;
  product_link: string;
  slug: string;
  rating: number;
  number_of_reviews: number;
  info_date: string;
  price: number;
};

export type PageProductDto = {
  totalPages: number;
  totalElements: number;
  pageable: PageableObject;
  first: boolean;
  last: boolean;
  size: number;
  content: ProductDto[];
  number: number;
  sort: SortObject;
  numberOfElements: number;
  empty: boolean;
};

export type ProductWithNeighborsDto = {
  product: ProductDto;
  neighbors: ProductDto[];
};

export type ProductsQuery = {
  company_id: number;
  category_id: number;
  page?: number;
  size?: number;
  sort_value?: SortValue;
  sort_direction?: SortDirection;
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://theirmarkets.com",
  headers: {
    Accept: "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
});

export async function getHealthCheck(config?: AxiosRequestConfig) {
  const response = await apiClient.get<void>("/healthz", config);

  return response.data;
}

export async function searchProducts(
  searchRequest: ProductSearchRequest,
  config?: AxiosRequestConfig,
) {
  const response = await apiClient.get<PageProductDto>("/api/search", {
    ...config,
    params: compactParams(searchRequest),
  });

  return response.data;
}

export async function getProductsByCompanyAndCategory(
  query: ProductsQuery,
  config?: AxiosRequestConfig,
) {
  const response = await apiClient.get<PageProductDto>("/api/products", {
    ...config,
    params: compactParams(query),
  });

  return response.data;
}

export async function getProductById(
  id: number,
  config?: AxiosRequestConfig,
) {
  const response = await apiClient.get<ProductDto>(
    `/api/products/${id}`,
    config,
  );

  return response.data;
}

export async function getProductWithNeighbors(
  id: number,
  config?: AxiosRequestConfig,
) {
  const response = await apiClient.get<ProductWithNeighborsDto>(
    `/api/products/${id}/neighbors`,
    config,
  );

  return response.data;
}

export async function getAllCompanies(config?: AxiosRequestConfig) {
  const response = await apiClient.get<CompanyDto[]>("/api/companies", config);

  return response.data;
}

export async function getAllCategories(config?: AxiosRequestConfig) {
  const response = await apiClient.get<CategoryDto[]>("/api/categories", config);

  return response.data;
}

function compactParams<T extends Record<string, unknown>>(params: T) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (value === undefined || value === null || value === "") {
        return false;
      }

      return !Array.isArray(value) || value.length > 0;
    }),
  );
}
