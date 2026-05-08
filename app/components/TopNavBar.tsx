import Image from "next/image";
import Link from "next/link";
import { collections } from "../data/catalog";

export function TopNavBar({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-[#121212]/82 text-white"
          : "border-black/10 bg-[#f9f9f9]/86 text-[#121212]"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="Their Markets home"
          >
            <Image
              src="/logo.png"
              alt=""
              width={398}
              height={419}
              priority={isDark}
              className="h-10 w-10 shrink-0 rounded-full border border-gold/30 object-cover p-1 sm:h-11 sm:w-11"
            />
          </Link>

          <details className="group relative lg:hidden">
            <summary
              className={`flex h-10 cursor-pointer list-none items-center gap-2 border px-4 text-xs font-bold uppercase tracking-[0.18em] transition marker:hidden ${
                isDark
                  ? "border-white/18 text-white hover:border-gold"
                  : "border-black/12 text-[#121212] hover:border-gold"
              }`}
            >
              Menu
              <span className="text-base leading-none text-gold transition group-open:rotate-45">
                +
              </span>
            </summary>
            <div
              className={`absolute right-0 top-12 w-[min(88vw,360px)] border p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)] ${
                isDark
                  ? "border-white/12 bg-[#121212] text-white"
                  : "border-black/10 bg-white text-[#121212]"
              }`}
            >
              <div className="grid gap-3 border-b border-current/10 pb-4 text-sm">
                <Link href="/category" className="transition hover:text-gold">
                  Collections
                </Link>
                <Link href="/#selected" className="transition hover:text-gold">
                  Selected
                </Link>
                <Link href="/#registry" className="transition hover:text-gold">
                  Registry
                </Link>
              </div>
              <form action="/category" className="mt-4 grid gap-3">
                <label className="sr-only" htmlFor="mobile-site-search">
                  Search luxury products
                </label>
                <input
                  id="mobile-site-search"
                  name="query"
                  type="search"
                  placeholder="Search the edit"
                  className={`h-11 min-w-0 border px-4 text-sm outline-none transition focus:border-gold ${
                    isDark
                      ? "border-white/15 bg-white/8 text-white placeholder:text-white/42"
                      : "border-black/12 bg-white text-[#121212] placeholder:text-[#121212]/42"
                  }`}
                />
                <label className="sr-only" htmlFor="mobile-site-category">
                  Category
                </label>
                <select
                  id="mobile-site-category"
                  name="collection"
                  className={`h-11 border px-3 text-sm outline-none transition focus:border-gold ${
                    isDark
                      ? "border-white/15 bg-[#121212] text-white"
                      : "border-black/12 bg-white text-[#121212]"
                  }`}
                  defaultValue=""
                >
                  <option value="">All collections</option>
                  {collections.map((collection) => (
                    <option key={collection.slug} value={collection.slug}>
                      {collection.name}
                    </option>
                  ))}
                </select>
                <button className="h-11 bg-gold px-5 text-xs font-bold uppercase tracking-[0.2em] text-[#121212] transition hover:bg-[#121212] hover:text-white">
                  Search
                </button>
              </form>
            </div>
          </details>
        </div>

        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-current/70 lg:flex">
          <Link href="/category" className="transition hover:text-gold">
            Collections
          </Link>
          <Link href="/#selected" className="transition hover:text-gold">
            Selected
          </Link>
          <Link href="/#registry" className="transition hover:text-gold">
            Registry
          </Link>
        </div>

        <form
          action="/category"
          className="hidden gap-2 lg:grid lg:grid-cols-[minmax(180px,1fr)_150px_auto] lg:justify-self-end"
        >
          <label className="sr-only" htmlFor="site-search">
            Search luxury products
          </label>
          <input
            id="site-search"
            name="query"
            type="search"
            placeholder="Search the edit"
            className={`h-10 min-w-0 border px-4 text-sm outline-none transition focus:border-gold ${
              isDark
                ? "border-white/15 bg-white/8 text-white placeholder:text-white/42"
                : "border-black/12 bg-white text-[#121212] placeholder:text-[#121212]/42"
            }`}
          />
          <label className="sr-only" htmlFor="site-category">
            Category
          </label>
          <select
            id="site-category"
            name="collection"
            className={`h-10 border px-3 text-sm outline-none transition focus:border-gold ${
              isDark
                ? "border-white/15 bg-[#121212] text-white"
                : "border-black/12 bg-white text-[#121212]"
            }`}
            defaultValue=""
          >
            <option value="">All</option>
            {collections.map((collection) => (
              <option key={collection.slug} value={collection.slug}>
                {collection.name}
              </option>
            ))}
          </select>
          <button className="h-10 bg-gold px-5 text-xs font-bold uppercase tracking-[0.2em] text-[#121212] transition hover:bg-[#121212] hover:text-white">
            Search
          </button>
        </form>
      </nav>
    </header>
  );
}
