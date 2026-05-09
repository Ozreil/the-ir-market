import Link from "next/link";
import { AmazonProductImage } from "./AmazonProductImage";
import { AmazonProductTitle } from "./AmazonProductTitle";
import { amazonLinkAttributes } from "../data/affiliate";
import type { Product } from "../lib/product-display";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group border border-black/10 bg-white">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#eeeeeb]">
          {product.image ? (
            <AmazonProductImage
              asin={product.asin}
              fallbackSrc={product.image}
              alt={product.name}
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center px-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#7c735f]">
              Image unavailable
            </div>
          )}
          <div className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#121212]">
            {product.category}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c735f]">
          {product.brand}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="mt-2 min-h-14 font-serif text-2xl leading-7 tracking-[-0.02em] transition group-hover:text-[#8f741f]">
            <AmazonProductTitle
              asin={product.asin}
              fallbackTitle={product.name}
            />
          </h3>
        </Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#57524a]">
          {product.summary}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
          <div>
            <p className="text-lg font-semibold">${product.price}</p>
            <p className="text-xs text-[#777]">{product.rating} rating</p>
          </div>
          <a
            href={product.amazonUrl}
            {...amazonLinkAttributes}
            className="border border-[#121212] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition hover:border-gold hover:bg-gold"
          >
            View
          </a>
        </div>
      </div>
    </article>
  );
}
