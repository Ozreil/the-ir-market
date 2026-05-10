import { AmazonProductTitle } from "../AmazonProductTitle";
import { RatingStars } from "../RatingStars";
import { CopyAffiliateLinkButton } from "./CopyAffiliateLinkButton";
import { amazonLinkAttributes } from "../../data/affiliate";
import type { Product } from "../../lib/product-display";

export function ProductBuyPanel({ product }: { product: Product }) {
  return (
    <div className="lg:sticky lg:top-28 lg:h-fit">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8f741f]">
        {product.brand} / {product.category}
      </p>
      <h1 className="mt-5 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
        <AmazonProductTitle asin={product.asin} fallbackTitle={product.name} />
      </h1>
      <p className="mt-6 max-w-xl text-lg font-light leading-8 text-[#5c574e]">
        {product.summary}
      </p>

      <div className="mt-8 grid grid-cols-2 border-y border-black/10">
        <div className="py-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]">
            Curated price
          </p>
          <p className="mt-2 text-4xl font-semibold">${product.price}</p>
        </div>
        <div className="border-l border-black/10 py-5 pl-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c735f]">
            Rating
          </p>
          <RatingStars rating={product.rating} className="mt-3 text-3xl" />
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href={product.amazonUrl}
          {...amazonLinkAttributes}
          className="inline-flex min-h-14 items-center justify-center bg-gold px-6 text-xs font-bold uppercase tracking-[0.22em] text-[#121212] transition hover:bg-[#121212] hover:text-white"
        >
          Buy on Amazon
        </a>
        <CopyAffiliateLinkButton url={product.amazonUrl} />
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-3xl tracking-[-0.03em]">
          Features and specs
        </h2>
        <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
          {product.specs.map((spec) => (
            <li
              key={spec}
              className="flex items-center justify-between gap-6 py-4 text-sm text-[#4f4a42]"
            >
              <span>{spec}</span>
              <span className="h-px w-12 bg-gold" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
