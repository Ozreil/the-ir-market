import Image from "next/image";
import Link from "next/link";
import { collections } from "../../data/catalog";

export function FeaturedCollections() {
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

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/category?collection=${collection.slug}`}
              className={`group relative min-h-[420px] overflow-hidden bg-[#121212] ${
                index % 2 ? "xl:mt-16" : ""
              }`}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-76 transition duration-700 group-hover:scale-105 group-hover:opacity-92"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-serif text-3xl leading-none">
                  {collection.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/68">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
