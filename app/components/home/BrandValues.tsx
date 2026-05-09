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

export function BrandValues() {
  return (
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
  );
}
