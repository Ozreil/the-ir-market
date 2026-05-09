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
  product_images?: ProductImageDto[];
};

export type ProductImageDto = {
  id: number;
  url: string;
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
  baseURL: getApiBaseUrl(),
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
  const endpoint = isBrowser() ? "/api/products/search" : "/search";

  try {
    const response = await apiClient.post<PageProductDto>(
      endpoint,
      compactParams(searchRequest),
      config,
    );

    if (process.env.NODE_ENV === "development") {
      console.log("[searchProducts] success", {
        request: compactParams(searchRequest),
        result: response.data,
      });
    }

    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[searchProducts] failed", {
        request: compactParams(searchRequest),
        status: axios.isAxiosError(error) ? error.response?.status : undefined,
        message: error instanceof Error ? error.message : String(error),
      });
    }

    throw error;
  }
}

export async function getProductsByCompanyAndCategory(
  query: ProductsQuery,
  config?: AxiosRequestConfig,
) {
  const endpoint = isBrowser() ? "/api/products" : "/products";
  const response = await apiClient.get<PageProductDto>(endpoint, {
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
    `/products/${id}`,
    config,
  );

  return response.data;
}

export async function getProductWithNeighbors(
  id: number,
  config?: AxiosRequestConfig,
) {
  const response = await apiClient.get<ProductWithNeighborsDto>(
    `/products/${id}/neighbors`,
    config,
  );

  return response.data;
}

export async function getAllCompanies(config?: AxiosRequestConfig) {
  const response = await apiClient.get<CompanyDto[]>("/companies", config);

  return response.data;
}

export async function getAllCategories(config?: AxiosRequestConfig) {
  const response = await apiClient.get<CategoryDto[]>("/categories", config);

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

function getApiBaseUrl() {
  if (isBrowser()) {
    return "";
  }

  return (
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://local.theirmarkets.com:9090"
  );
}

function isBrowser() {
  return typeof window !== "undefined";
}
