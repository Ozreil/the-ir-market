"use client";

import { useEffect, useState } from "react";

type AmazonProductTitleProps = {
  asin?: string;
  fallbackTitle: string;
  className?: string;
};

type AmazonTitleResponse = {
  title?: string;
};

export function AmazonProductTitle({
  asin,
  fallbackTitle,
  className,
}: AmazonProductTitleProps) {
  const [title, setTitle] = useState(fallbackTitle);

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

        return response.json() as Promise<AmazonTitleResponse>;
      })
      .then((data) => {
        if (data?.title) {
          setTitle(data.title);
        }
      })
      .catch(() => {
        setTitle(fallbackTitle);
      });

    return () => controller.abort();
  }, [asin, fallbackTitle]);

  return <>{className ? <span className={className}>{title}</span> : title}</>;
}
