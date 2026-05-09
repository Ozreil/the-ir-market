import Image from "next/image";
import { AmazonProductImage } from "../AmazonProductImage";
import type { Product } from "../../data/catalog";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div>
      <div className="relative aspect-5/6 overflow-hidden bg-[#ededeb]">
        <AmazonProductImage
          asin={product.asin}
          fallbackSrc={product.image}
          alt={product.name}
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {product.gallery.map((image, index) => (
          <div
            key={image}
            className="relative aspect-square overflow-hidden border border-black/10 bg-white"
          >
            <Image
              src={image}
              alt={`${product.name} detail ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 16vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
