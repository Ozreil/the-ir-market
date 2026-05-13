export function RegistryCta() {
  return (
    <section id="registry" className="bg-[#121212] px-5 py-20 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
            Follow the market
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-none sm:text-7xl">
            New affiliate finds, edited down.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/66">
            Get the next round of affiliate partner picks and merchant drops
            without the usual shopping noise.
          </p>
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
            Get updates
          </button>
        </form>
      </div>
    </section>
  );
}
