import { NextResponse } from "next/server";
import {
  getProductsByCompanyAndCategory,
  type ProductsQuery,
  type SortDirection,
  type SortValue,
} from "../../lib/api-client";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = Number(searchParams.get("company_id"));
  const categoryId = Number(searchParams.get("category_id"));

  if (!Number.isInteger(companyId) || !Number.isInteger(categoryId)) {
    return NextResponse.json(
      { error: "company_id and category_id are required" },
      { status: 400 },
    );
  }

  const query: ProductsQuery = {
    category_id: categoryId,
    company_id: companyId,
    page: numberParam(searchParams.get("page")),
    size: numberParam(searchParams.get("size")),
    sort_direction: sortDirectionParam(searchParams.get("sort_direction")),
    sort_value: sortValueParam(searchParams.get("sort_value")),
  };

  try {
    const result = await getProductsByCompanyAndCategory(query);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Product lookup failed",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}

function numberParam(value: string | null) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}

function sortDirectionParam(value: string | null): SortDirection | undefined {
  return value === "ASC" || value === "DESC" ? value : undefined;
}

function sortValueParam(value: string | null): SortValue | undefined {
  return value === "PRICE" ||
    value === "RATING" ||
    value === "NUMBER_OF_REVIEWS"
    ? value
    : undefined;
}
