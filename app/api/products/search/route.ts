import { NextResponse } from "next/server";
import { searchProducts, type ProductSearchRequest } from "../../../lib/api-client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductSearchRequest;
    const result = await searchProducts(body);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Product search failed",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}
