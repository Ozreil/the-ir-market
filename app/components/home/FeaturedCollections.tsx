import Link from "next/link";
import type { CategoryDto } from "../../lib/api-client";

export function FeaturedCollections({
  categories,
}: {
  categories: CategoryDto[];
}) {
  return (
    <section className="px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
              Featured collections
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
              The best version of the everyday.
            </h2>
          </div>
          <p className="max-w-2xl text-lg font-light leading-8 text-[#5c574e]">
            Browse categories shaped like an editorial wardrobe: precise,
            useful, and calm enough to make comparison feel intentional.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/category?collection=${slugify(category.title)}`}
                className={`group relative min-h-[320px] overflow-hidden bg-[#121212] ${
                  index % 2 ? "xl:mt-16" : ""
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.28),transparent_34%),linear-gradient(135deg,#121212,#34302a)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl leading-none">
                    {category.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/68">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-black/10 bg-white px-6 py-14 text-center">
            <h3 className="font-serif text-3xl">No API categories available.</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#666056]">
              Start the category API or adjust the API base URL to populate
              collections.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
