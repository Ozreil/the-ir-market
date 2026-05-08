import { amazonAffiliateLinks } from "./affiliate";

export type Product = {
  id: string | number;
  name: string;
  brand: string;
  category: string;
  collection: string;
  price: number;
  msrp: number;
  rating: number;
  image: string;
  gallery: string[];
  material: string;
  summary: string;
  curatorTake: string;
  amazonUrl: string;
  asin?: string;
  specs: string[];
};

export const collections = [
  {
    name: "Signature Electronics",
    slug: "electronics",
    description: "Quiet performance, sculptural audio, and desk technology.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=82",
  },
  {
    name: "Architectural Home",
    slug: "home",
    description: "Objects with weight, restraint, and daily presence.",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1400&q=82",
  },
  {
    name: "Ritual Kitchen",
    slug: "kitchen",
    description: "Premium tools for coffee, hosting, and slow mornings.",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1400&q=82",
  },
  {
    name: "Fine Leather",
    slug: "leather",
    description: "Travel pieces and desk companions with a refined hand.",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1400&q=82",
  },
];

export const products: Product[] = [
  {
    id: "sony-wh-1000xm5",
    name: "WH-1000XM5 Noise Canceling Headphones",
    brand: "Sony",
    category: "Electronics",
    collection: "electronics",
    price: 328,
    msrp: 399,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=900&q=82",
    ],
    material: "Soft-fit leather, carbon fiber composite",
    summary:
      "A flagship over-ear headphone selected for travel, focus, and understated daily carry.",
    curatorTake:
      "The XM5 earns its place because it feels less like a gadget and more like a private room. The sound is polished, the cancellation is calm, and the silhouette stays discreet enough for first class or a quiet desk.",
    amazonUrl: "https://www.amazon.com/s?k=Sony+WH-1000XM5",
    specs: [
      "Up to 30 hours battery life",
      "Adaptive noise cancellation",
      "Multipoint Bluetooth pairing",
      "Touch controls and quick attention mode",
    ],
  },
  {
    id: "bissell-little-green",
    name: "BISSELL Little Green Portable Carpet and Upholstery Cleaner",
    brand: "BISSELL",
    category: "Home",
    collection: "home",
    price: 99,
    msrp: 124,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=82",
    ],
    material: "Compact cleaner body, specialty upholstery tools",
    summary:
      "A compact upholstery and carpet spot cleaner selected for practical home care and auto detailing.",
    curatorTake:
      "This is not decorative luxury; it is the kind of useful maintenance object that protects the things you actually live with. The value is in restoring fabric, rugs, and car interiors before small stains become permanent compromises.",
    amazonUrl: amazonAffiliateLinks.curatedPick,
    asin: "B0016HF5GK",
    specs: [
      "Portable spot-cleaning form factor",
      "Designed for carpet, upholstery, and auto interiors",
      "Specialty tools for targeted stains",
      "Compact storage footprint",
    ],
  },
  {
    id: "dyson-gen5detect",
    name: "Gen5detect Cordless Vacuum",
    brand: "Dyson",
    category: "Home",
    collection: "home",
    price: 749,
    msrp: 949,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=82",
    ],
    material: "Aluminum wand, HEPA filtration, polycarbonate body",
    summary:
      "A technical cleaning instrument for homes where performance needs to look intentional.",
    curatorTake:
      "Luxury at home often means invisible labor. This is not decorative, but the engineering is precise enough to justify the space it takes.",
    amazonUrl: "https://www.amazon.com/s?k=Dyson+Gen5detect",
    specs: [
      "HEPA filtration system",
      "Cordless whole-home cleaning",
      "LCD performance display",
      "Laser dust illumination head",
    ],
  },
  {
    id: "smeg-espresso",
    name: "Retro Espresso Machine",
    brand: "Smeg",
    category: "Kitchen",
    collection: "kitchen",
    price: 489,
    msrp: 599,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=82",
    ],
    material: "Brushed metal, chrome accents, compact boiler",
    summary:
      "A countertop statement piece for espresso drinkers who care about the morning scene.",
    curatorTake:
      "The value is emotional as much as mechanical. It makes the first cup feel designed without demanding a cafe-scale footprint.",
    amazonUrl: "https://www.amazon.com/s?k=Smeg+espresso+machine",
    specs: [
      "15-bar pump pressure",
      "Steam wand for milk texture",
      "Compact profile",
      "Retro metal controls",
    ],
  },
  {
    id: "bellroy-weekender",
    name: "Premium Weekender Bag",
    brand: "Bellroy",
    category: "Travel",
    collection: "leather",
    price: 229,
    msrp: 289,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=82",
    ],
    material: "Premium eco-tanned leather, recycled woven body",
    summary:
      "A soft-structured travel bag selected for short stays and elegant overhead storage.",
    curatorTake:
      "A good weekender should look better once used. This one carries enough organization to be practical without losing the ease that makes a weekend feel like escape.",
    amazonUrl: "https://www.amazon.com/s?k=Bellroy+weekender+bag",
    specs: [
      "Dedicated shoe or laundry pocket",
      "Interior organization sleeves",
      "Soft carry handles",
      "Cabin-friendly proportions",
    ],
  },
  {
    id: "herman-miller-aeron",
    name: "Aeron Ergonomic Chair",
    brand: "Herman Miller",
    category: "Office",
    collection: "home",
    price: 1495,
    msrp: 1805,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=82",
    ],
    material: "Pellicle mesh, die-cast aluminum, graphite frame",
    summary:
      "An icon of ergonomic design for offices where the chair is part of the architecture.",
    curatorTake:
      "The Aeron remains a benchmark because it refuses softness as decoration. It is technical, balanced, and visually quiet in the right way.",
    amazonUrl: "https://www.amazon.com/s?k=Herman+Miller+Aeron",
    specs: [
      "Adjustable lumbar support",
      "Breathable suspension mesh",
      "Tilt limiter and seat angle controls",
      "Multiple size options",
    ],
  },
];

export const brands = Array.from(new Set(products.map((product) => product.brand)));
export const categories = Array.from(
  new Set(products.map((product) => product.category)),
);

export function getProduct(id: string) {
  return products.find((product) => String(product.id) === id);
}

export function relatedProducts(product: Product) {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id && candidate.collection === product.collection,
    )
    .concat(products.filter((candidate) => candidate.id !== product.id))
    .slice(0, 4);
}
