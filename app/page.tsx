import { Footer } from "./components/Footer";
import { TopNavBar } from "./components/TopNavBar";
import { BrandValues } from "./components/home/BrandValues";
import { FeaturedCollections } from "./components/home/FeaturedCollections";
import { HomeHero } from "./components/home/HomeHero";
import { RegistryCta } from "./components/home/RegistryCta";
import { SelectedProducts } from "./components/home/SelectedProducts";
import { products as fallbackProducts } from "./data/catalog";
import { searchProducts } from "./lib/api-client";
import { productDtoToDisplayProduct } from "./lib/product-display";

export const dynamic = "force-dynamic";

export default async function Home() {
  const selectedProducts = await searchProducts({
    page: 0,
    size: 3,
    sort_direction: "DESC",
    sort_value: "RATING",
  })
    .then((page) => page.content.map(productDtoToDisplayProduct))
    .catch(() => fallbackProducts.slice(0, 3));

  if (process.env.NODE_ENV === "development") {
    console.log("[Home] displayed selected products", selectedProducts);
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#121212]">
      <TopNavBar variant="dark" />
      <HomeHero />
      <FeaturedCollections />
      <SelectedProducts products={selectedProducts} />
      <BrandValues />
      <RegistryCta />
      <Footer />
    </main>
  );
}
