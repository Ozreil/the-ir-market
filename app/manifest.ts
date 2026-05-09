import type { MetadataRoute } from "next";
import { defaultDescription, siteName } from "./lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#121212",
    description: defaultDescription,
    display: "standalone",
    icons: [
      {
        sizes: "398x419",
        src: "/logo.png",
        type: "image/png",
      },
      {
        sizes: "1536x1024",
        src: "/full-logo.jpeg",
        type: "image/jpeg",
      },
    ],
    name: siteName,
    short_name: "Their Markets",
    start_url: "/",
    theme_color: "#121212",
  };
}
