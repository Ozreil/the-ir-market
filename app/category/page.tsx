import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { TopNavBar } from "../components/TopNavBar";
import { getAllCategories, searchProducts } from "../lib/api-client";
import { absoluteUrl, defaultDescription, siteName } from "../lib/seo";
import { CategoryExperience } from "./CategoryExperience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Curated Product Index",
  description:
    "Search and filter premium affiliate products from partner companies by category, price, brand, rating, and reviews.",
  alternates: {
    canonical: "/category",
  },
  openGraph: {
    description:
      "Search and filter premium affiliate products from partner companies by category, price, brand, rating, and reviews.",
    images: [
      {
        alt: "Their Markets product index",
        height: 1024,
        url: absoluteUrl("/full-logo.jpeg"),
        width: 1536,
      },
    ],
    siteName,
    title: "Curated Product Index",
    type: "website",
    url: absoluteUrl("/category"),
  },
  twitter: {
    card: "summary_large_image",
    description: defaultDescription,
    images: [absoluteUrl("/full-logo.jpeg")],
    title: "Curated Product Index",
  },
};

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; collection?: string }>;
}) {
  const params = await searchParams;
  const apiCategories = await getAllCategories().catch(() => []);
  const initialCategory = params.collection
    ? apiCategories.find(
        (category) => slugify(category.title) === params.collection,
      )
    : undefined;
  const initialPage = await searchProducts({
    categories: initialCategory ? [initialCategory.id] : undefined,
    page: 0,
    size: 12,
    term: params.query,
  }).catch(() => null);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#121212]">
      <TopNavBar />
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
            Search and categories
          </p>
          <div className="mt-5 grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <h1 className="font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
              The curated index.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#5c574e]">
              Filter the luxury edit by collection, brand, price, and rating.
              Each recommendation is built to move cleanly from editorial
              discovery to a partner company purchase.
            </p>
          </div>
          <div className="mt-10">
            <CategoryExperience
              apiCategories={apiCategories}
              initialCategoryId={
                initialCategory ? String(initialCategory.id) : undefined
              }
              initialPage={initialPage}
              initialQuery={params.query}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
