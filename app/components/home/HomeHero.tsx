import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
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
  );
}
