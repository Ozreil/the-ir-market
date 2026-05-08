"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type AmazonProductImageProps = {
  asin?: string;
  alt: string;
  className?: string;
  fallbackSrc: string;
  priority?: boolean;
  sizes: string;
};

type AmazonImageResponse = {
  primaryImage?: {
    URL?: string;
  };
};

export function AmazonProductImage({
  asin,
  alt,
  className,
  fallbackSrc,
  priority,
  sizes,
}: AmazonProductImageProps) {
  const [src, setSrc] = useState(fallbackSrc);

  useEffect(() => {
    if (!asin) {
      return;
    }

    const controller = new AbortController();

    fetch(`/api/amazon/product-image?asin=${encodeURIComponent(asin)}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          return null;
        }

        return response.json() as Promise<AmazonImageResponse>;
      })
      .then((data) => {
        if (data?.primaryImage?.URL) {
          setSrc(data.primaryImage.URL);
        }
      })
      .catch(() => {
        setSrc(fallbackSrc);
      });

    return () => controller.abort();
  }, [asin, fallbackSrc]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
