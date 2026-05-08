import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/Footer";
import { ProductCard } from "./components/ProductCard";
import { TopNavBar } from "./components/TopNavBar";
import { collections, products as fallbackProducts } from "./data/catalog";
import { searchProducts } from "./lib/api-client";
import { productDtoToDisplayProduct } from "./lib/product-display";

export const dynamic = "force-dynamic";

const values = [
  {
    title: "Authenticity guaranteed",
    text: "Each piece is checked against brand signals, material claims, and marketplace trust indicators.",
  },
  {
    title: "Sustainably sourced",
    text: "Preference is given to durable objects, repairable designs, and long-life materials.",
  },
  {
    title: "Global white-glove delivery",
    text: "Our edit favors products with reliable fulfillment, clear returns, and gift-worthy presentation.",
  },
];

export default async function Home() {
  const selectedProducts = await searchProducts({
    page: 0,
    size: 3,
    sort_direction: "DESC",
    sort_value: "RATING",
  })
    .then((page) => page.content.map(productDtoToDisplayProduct))
    .catch(() => fallbackProducts.slice(0, 3));

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#121212]">
      <TopNavBar variant="dark" />

      <section className="relative -mt-[73px] min-h-[96svh] overflow-hidden bg-[#121212] px-5 pt-28 text-white lg:px-8 lg:pt-36">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
            alt="Refined interior with sculptural furniture"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-52"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,18,0.92),rgba(18,18,18,0.54)_42%,rgba(18,18,18,0.14)),linear-gradient(0deg,rgba(18,18,18,0.96),transparent_34%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(96svh-9rem)] max-w-7xl content-end pb-16">
          <div className="animate-rise max-w-4xl">
            {/* <Image
              src="/logo.png"
              alt="Their Markets. Discover. Choose. Elevate."
              width={1536}
              height={1024}
              priority
              className="mb-8 h-auto w-[min(72vw,420px)] border border-white/10 object-contain shadow-[0_28px_80px_rgba(0,0,0,0.4)]"
            /> */}
            {/* <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
              Amazon affiliate luxury curation
            </p> */}
            <h1 className="mt-6 font-serif text-6xl leading-[0.92] tracking-[-0.05em] sm:text-8xl lg:text-9xl">
              Quiet Luxury for the Modern Discerning.
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-light leading-9 text-white/74">
              Their Market Luxury edits Amazon into a polished registry of
              high-end electronics, home objects, kitchen rituals, and
              gift-worthy essentials.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/category"
                className="inline-flex min-h-12 items-center justify-center bg-gold px-8 text-xs font-bold uppercase tracking-[0.22em] text-[#121212] transition hover:bg-white"
              >
                Enter the edit
              </Link>
              <Link
                href="#selected"
                className="inline-flex min-h-12 items-center justify-center border border-white/26 px-8 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:border-gold hover:text-gold"
              >
                Selected for you
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      <section id="selected" className="bg-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
                Curated excellence
              </p>
              <h2 className="mt-4 font-serif text-5xl tracking-[-0.04em]">
                Selected for you.
              </h2>
            </div>
            <Link
              href="/category"
              className="w-fit border border-[#121212] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-gold hover:bg-gold"
            >
              View all products
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
              Brand values
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
              Luxury is an editing discipline.
            </h2>
          </div>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {values.map((value, index) => (
              <article
                key={value.title}
                className="grid gap-8 py-9 md:grid-cols-[120px_1fr]"
              >
                <span className="font-serif text-5xl text-gold">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-serif text-3xl tracking-[-0.03em]">
                    {value.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-lg font-light leading-8 text-[#5c574e]">
                    {value.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="registry" className="bg-[#121212] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
              Join the Registry
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
              Early access to the next private edit.
            </h2>
          </div>
          <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="sr-only" htmlFor="registry-email">
              Email address
            </label>
            <input
              id="registry-email"
              type="email"
              placeholder="name@example.com"
              className="h-14 border border-white/16 bg-white/8 px-5 text-white outline-none transition placeholder:text-white/42 focus:border-gold"
            />
            <button className="h-14 bg-gold px-7 text-xs font-bold uppercase tracking-[0.22em] text-[#121212] transition hover:bg-white">
              Request access
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
