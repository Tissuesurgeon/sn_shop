/**
 * SAMPLE DATA.
 * Names, prices, and photos are placeholders from the reference prototype
 * plus the Sika Tie-Dye Playsuit. Replace them before a real launch.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient, type GhanaRegion, type Size } from "@prisma/client";
import bcrypt from "bcryptjs";
import { loadEnvFile } from "../lib/load-env";

loadEnvFile();

const prisma = new PrismaClient();

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

const BASE_STOCK: Record<Size, number> = {
  XS: 4,
  S: 6,
  M: 8,
  L: 3,
  XL: 5,
  XXL: 0,
};

const REGIONAL_REGIONS: GhanaRegion[] = [
  "ASHANTI",
  "CENTRAL",
  "EASTERN",
  "WESTERN",
  "WESTERN_NORTH",
  "VOLTA",
  "OTI",
  "NORTHERN",
  "SAVANNAH",
  "NORTH_EAST",
  "UPPER_EAST",
  "UPPER_WEST",
  "BONO",
  "BONO_EAST",
  "AHAFO",
];

type Colour = { name: string; hex: string };

type SampleProduct = {
  slug: string;
  name: string;
  category: "Ankara" | "Kente" | "Evening" | "Casual";
  length: "MINI" | "MIDI" | "MAXI" | "PLAYSUIT";
  pricePesewas: number;
  compareAtPesewas?: number;
  colours: Colour[];
  sizes: Size[];
  images: string[];
  featured: boolean;
  description: string;
  details: string[];
  madeToMeasure?: boolean;
  mtmFeePesewas?: number;
  leadTimeDays?: number;
  stockOverrides?: Partial<Record<Size, number>>;
};

const products: SampleProduct[] = [
  {
    slug: "adwoa-ankara-wrap-midi",
    name: "Adwoa Ankara Wrap Midi",
    category: "Ankara",
    length: "MIDI",
    pricePesewas: 45000,
    colours: [{ name: "Fuchsia & Gold", hex: "#B0185E" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["d1.webp", "d1-b.webp", "d1-c.webp"],
    featured: true,
    description:
      "Our signature wrap dress in a bold fuchsia-and-gold wax print. Flutter sleeves, a self-tie waist and an asymmetric hem that moves beautifully.",
    details: [
      "100% cotton wax print",
      "Adjustable self-tie wrap",
      "Hand-finished in Accra",
      "Model wears size S",
    ],
  },
  {
    slug: "ama-kente-maxi",
    name: "Ama Kente-Inspired Maxi",
    category: "Kente",
    length: "MAXI",
    pricePesewas: 78000,
    colours: [{ name: "Heritage Gold", hex: "#C9952B" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["d2.webp", "d2-b.webp", "d2-c.webp"],
    featured: true,
    description:
      "A floor-sweeping maxi in a kente-inspired weave print. Fitted waist, kimono sleeves and a full skirt made for weddings, outdoorings and Sunday best.",
    details: [
      "Kente-inspired printed cotton",
      "Concealed back zip",
      "Side seam pockets",
      "Fully lined bodice",
    ],
  },
  {
    slug: "esi-emerald-satin-gown",
    name: "Esi Emerald Satin Gown",
    category: "Evening",
    length: "MAXI",
    pricePesewas: 125000,
    compareAtPesewas: 145000,
    colours: [{ name: "Emerald", hex: "#0F5B3E" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["d3.webp", "d3-b.webp", "d3-c.webp"],
    featured: true,
    description:
      "Liquid satin, one shoulder, draped cascade at the hip. An evening gown for dinners, award nights and every red carpet in between.",
    details: ["Heavy satin with stretch", "One-shoulder drape", "Thigh-high slit", "Dry clean only"],
  },
  {
    slug: "akosua-linen-shirt-dress",
    name: "Akosua Linen Shirt Dress",
    category: "Casual",
    length: "MIDI",
    pricePesewas: 38000,
    colours: [{ name: "Terracotta", hex: "#B4583F" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["d4.webp", "d4-b.webp", "d4-c.webp"],
    featured: false,
    description:
      "Breathable washed linen cut for Accra heat. Band collar, roll-up sleeves, tie belt and side slits — dress it up or down.",
    details: ["100% washed linen", "Removable tie belt", "Chest pocket", "Machine wash cold"],
  },
  {
    slug: "efua-tiered-ankara-maxi",
    name: "Efua Tiered Ankara Maxi",
    category: "Ankara",
    length: "MAXI",
    pricePesewas: 62000,
    colours: [{ name: "Royal Blue", hex: "#1F3E8C" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["d5.webp", "d5-b.webp", "d5-c.webp"],
    featured: true,
    description:
      "Romantic puff sleeves and three swishing tiers in an indigo-blue wax print. Square neckline, smocked back for an easy fit.",
    details: ["100% cotton wax print", "Smocked elastic back", "Puff sleeves", "Model wears size M"],
  },
  {
    slug: "abena-geometric-midi",
    name: "Abena Geometric Bodycon Midi",
    category: "Casual",
    length: "MIDI",
    pricePesewas: 34000,
    colours: [{ name: "Mustard", hex: "#D4A437" }],
    sizes: ["XS", "S", "M", "L"],
    images: ["d6.webp", "d6-b.webp", "d6-c.webp"],
    featured: false,
    description:
      "A sculpted square-neck midi in textured mustard jacquard with a subtle geometric motif. Office to after-work in one.",
    details: ["Stretch jacquard", "Square neckline", "Back vent", "Hand wash"],
  },
  {
    slug: "yaa-velvet-evening-maxi",
    name: "Yaa Velvet Evening Maxi",
    category: "Evening",
    length: "MAXI",
    pricePesewas: 98000,
    colours: [{ name: "Magenta", hex: "#A3145A" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["d7.webp", "d7-b.webp", "d7-c.webp"],
    featured: true,
    description:
      "Plush magenta velvet with a surplice neckline, bishop sleeves and a hand-finished gold statement belt.",
    details: ["Stretch velvet", "Gold-tone belt included", "Front slit", "Dry clean only"],
  },
  {
    slug: "akua-black-gold-mermaid",
    name: "Akua Black & Gold Mermaid Gown",
    category: "Evening",
    length: "MAXI",
    pricePesewas: 110000,
    colours: [{ name: "Black & Gold", hex: "#1A1A1A" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["d8.webp", "d8-b.webp", "d8-c.webp"],
    featured: false,
    description:
      "Off-shoulder ruffle, fitted to the knee, flaring into a dramatic mermaid train. Black-and-gold print made for the spotlight.",
    details: [
      "Cotton-sateen print",
      "Boned bodice",
      "Mermaid flare with train",
      "Made to order: 5–7 days",
    ],
    madeToMeasure: true,
    leadTimeDays: 7,
  },
  {
    slug: "afia-ankara-sundress",
    name: "Afia Ankara Sundress",
    category: "Casual",
    length: "MINI",
    pricePesewas: 29000,
    colours: [{ name: "Pink & Orange", hex: "#E9677E" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["d9.webp", "d9-b.webp", "d9-c.webp"],
    featured: false,
    description:
      "Our everyday favourite: a sleeveless A-line sundress in a sunburst wax print — with pockets, of course.",
    details: ["100% cotton wax print", "Hidden side pockets", "Back zip", "Machine wash cold"],
  },
  {
    slug: "adjoa-kente-panel-midi",
    name: "Adjoa Kente Panel Midi",
    category: "Kente",
    length: "MIDI",
    pricePesewas: 69000,
    colours: [{ name: "Ivory & Kente", hex: "#F3EBDD" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["d10.webp", "d10-b.webp", "d10-c.webp"],
    featured: true,
    description:
      "Clean ivory crepe framed with kente-woven panels at the bodice and hem. Perfect for engagements, church and graduations.",
    details: ["Crepe with kente-strip panels", "Bishop sleeves", "Concealed back zip", "Lined"],
  },
  {
    slug: "adwoa-wrap-mini",
    name: "Adwoa Wrap Mini",
    category: "Ankara",
    length: "MINI",
    pricePesewas: 36000,
    colours: [{ name: "Fuchsia & Gold", hex: "#B0185E" }],
    sizes: ["XS", "S", "M", "L"],
    images: ["d1-b.webp", "d1.webp", "d1-c.webp"],
    featured: false,
    description:
      "The Adwoa wrap you love, cut to a flirty above-the-knee length for brunches and day parties.",
    details: [
      "100% cotton wax print",
      "Self-tie wrap",
      "Flutter sleeves",
      "Hand-finished in Accra",
    ],
  },
  {
    slug: "ama-kente-maxi-custom",
    name: "Ama Kente Maxi — Made to Measure",
    category: "Kente",
    length: "MAXI",
    pricePesewas: 95000,
    colours: [{ name: "Heritage Gold", hex: "#C9952B" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["d2-b.webp", "d2.webp", "d2-c.webp"],
    featured: false,
    description:
      "The Ama maxi, tailored to your exact measurements by our Accra studio. We'll call or WhatsApp you for measurements after ordering.",
    details: [
      "Custom-fitted",
      "Ready in 7–10 working days",
      "Free alterations within 14 days",
      "Choose nearest size as a guide",
    ],
    madeToMeasure: true,
    leadTimeDays: 10,
  },
  {
    slug: "sika-tie-dye-playsuit",
    name: "Sika Tie-Dye Playsuit",
    category: "Casual",
    length: "PLAYSUIT",
    pricePesewas: 42000,
    colours: [{ name: "Harmattan Sunset", hex: "#E07A1F" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["playsuit-2.webp", "playsuit-1.webp"],
    featured: true,
    description:
      "Hand-dyed in Aburi in burnt orange, charcoal and gold. A relaxed camp collar, short sleeves and a self-tie waist over easy shorts with pockets — Saturday in Osu, sorted.",
    details: [
      "100% cotton poplin, hand tie-dyed",
      "Camp collar, button front",
      "Self-tie belt",
      "Side pockets",
      "Model is 5'8\" and wears S",
      "Cold hand wash inside out, dry in shade to protect the dye",
    ],
    madeToMeasure: true,
    mtmFeePesewas: 8000,
    leadTimeDays: 10,
    stockOverrides: { M: 2, XXL: 0 },
  },
];

const uploaded = new Map<string, { url: string; pathname: string }>();

function stockQty(size: Size, offered: Size[], overrides?: Partial<Record<Size, number>>): number {
  if (overrides && Object.prototype.hasOwnProperty.call(overrides, size)) {
    return overrides[size] ?? 0;
  }
  if (!offered.includes(size)) return 0;
  if (size === "XXL") return 0;
  const last = offered[offered.length - 1];
  if (last === size && !offered.includes("XXL")) return 0;
  return BASE_STOCK[size];
}

function skuFor(slug: string, size: Size, colour: string): string {
  const colourCode = colour
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `SN-${slug}-${size}-${colourCode}`;
}

async function resolveImage(filename: string): Promise<{ url: string; pathname: string }> {
  const pathname = `sample/${filename}`;
  const cached = uploaded.get(pathname);
  if (cached) return cached;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    const local = { url: `/sample/${filename}`, pathname };
    uploaded.set(pathname, local);
    return local;
  }

  const { put } = await import("@vercel/blob");
  const body = await readFile(path.join(process.cwd(), "public", "sample", filename));
  const blob = await put(pathname, body, {
    access: "public",
    token,
    contentType: "image/webp",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  const stored = { url: blob.url, pathname: blob.pathname };
  uploaded.set(pathname, stored);
  return stored;
}

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();

  const categories = [
    { name: "Ankara", slug: "ankara", sortOrder: 0, description: "Wax-print dresses." },
    { name: "Kente", slug: "kente", sortOrder: 1, description: "Kente-inspired dresses." },
    { name: "Evening", slug: "evening", sortOrder: 2, description: "Gowns for the occasion." },
    {
      name: "Casual",
      slug: "casual",
      sortOrder: 3,
      description: "Everyday dresses and playsuits.",
    },
  ] as const;

  const categoryIds = new Map<string, string>();
  for (const category of categories) {
    const row = await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: {
        name: category.name,
        description: category.description,
        sortOrder: category.sortOrder,
        isActive: true,
      },
    });
    categoryIds.set(category.name, row.id);
  }

  for (const product of products) {
    const categoryId = categoryIds.get(product.category);
    if (!categoryId) throw new Error(`Missing category ${product.category}`);

    const saved = await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        details: product.details,
        length: product.length,
        pricePesewas: product.pricePesewas,
        compareAtPesewas: product.compareAtPesewas ?? null,
        status: "ACTIVE",
        isFeatured: product.featured,
        madeToMeasure: product.madeToMeasure ?? false,
        mtmFeePesewas: product.mtmFeePesewas ?? null,
        leadTimeDays: product.leadTimeDays ?? null,
        isSample: true,
        categoryId,
      },
      update: {
        name: product.name,
        description: product.description,
        details: product.details,
        length: product.length,
        pricePesewas: product.pricePesewas,
        compareAtPesewas: product.compareAtPesewas ?? null,
        status: "ACTIVE",
        isFeatured: product.featured,
        madeToMeasure: product.madeToMeasure ?? false,
        mtmFeePesewas: product.mtmFeePesewas ?? null,
        leadTimeDays: product.leadTimeDays ?? null,
        isSample: true,
        categoryId,
      },
    });

    const images = [];
    for (const [index, filename] of product.images.entries()) {
      const image = await resolveImage(filename);
      images.push({
        productId: saved.id,
        url: image.url,
        pathname: image.pathname,
        alt: product.name,
        sortOrder: index,
      });
    }
    await prisma.productImage.deleteMany({ where: { productId: saved.id } });
    await prisma.productImage.createMany({ data: images });

    const colour = product.colours[0];
    if (!colour) throw new Error(`Missing colour for ${product.slug}`);
    for (const size of SIZES) {
      const sku = skuFor(product.slug, size, colour.name);
      const data = {
        size,
        colourName: colour.name,
        colourHex: colour.hex,
        stockQty: stockQty(size, product.sizes, product.stockOverrides),
        isActive: true,
      };
      await prisma.productVariant.upsert({
        where: { sku },
        create: { ...data, sku, productId: saved.id },
        update: data,
      });
    }
  }

  const delivery = [
    {
      code: "ACCRA_SAME_DAY",
      label: "Accra same-day",
      etaText: "Order before 12:00 · arrives by 7pm today",
      feePesewas: 4000,
      regions: ["GREATER_ACCRA"] as GhanaRegion[],
      cutoffTime: "12:00",
      isPickup: false,
      sortOrder: 0,
    },
    {
      code: "ACCRA_NEXT_DAY",
      label: "Accra next-day",
      etaText: "Arrives the next working day",
      feePesewas: 2500,
      regions: ["GREATER_ACCRA"] as GhanaRegion[],
      cutoffTime: null,
      isPickup: false,
      sortOrder: 1,
    },
    {
      code: "REGIONAL",
      label: "Regional courier",
      etaText: "Courier or VIP-bus parcel in 2–4 working days",
      feePesewas: 5500,
      regions: REGIONAL_REGIONS,
      cutoffTime: null,
      isPickup: false,
      sortOrder: 2,
    },
    {
      code: "STUDIO_PICKUP",
      label: "Pick up at the studio",
      etaText: "Accra · Mon–Sat 9am–6pm · we'll WhatsApp when ready",
      feePesewas: 0,
      regions: [] as GhanaRegion[],
      cutoffTime: null,
      isPickup: true,
      sortOrder: 3,
    },
  ];

  for (const option of delivery) {
    await prisma.deliveryOption.upsert({
      where: { code: option.code },
      create: option,
      update: {
        label: option.label,
        etaText: option.etaText,
        feePesewas: option.feePesewas,
        regions: { set: option.regions },
        cutoffTime: option.cutoffTime,
        isPickup: option.isPickup,
        isActive: true,
        sortOrder: option.sortOrder,
      },
    });
  }

  await prisma.storeSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      freeDeliveryThresholdPesewas: 150000,
      whatsappNumber: "233546923596",
      contactPhone: "0546923596",
      instagram: "sn_stitches_",
      tiktok: "sn_stitches",
    },
    update: {
      freeDeliveryThresholdPesewas: 150000,
      whatsappNumber: "233546923596",
      contactPhone: "0546923596",
      instagram: "sn_stitches_",
      tiktok: "sn_stitches",
    },
  });

  const password = process.env.SEED_ADMIN_PASSWORD;
  const passwordHash = password ? await bcrypt.hash(password, 12) : null;
  if (!email) {
    console.log(`Seeded ${products.length} sample dresses. Set SEED_ADMIN_EMAIL to create the owner.`);
    return;
  }
  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: "SN Stitches Owner",
      role: "OWNER",
      passwordHash,
      emailVerified: new Date(),
    },
    update: {
      name: "SN Stitches Owner",
      role: "OWNER",
      ...(passwordHash ? { passwordHash } : {}),
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@snstitches.com" },
    create: {
      email: "customer@snstitches.com",
      name: "Sample customer",
      role: "CUSTOMER",
      passwordHash,
      emailVerified: new Date(),
    },
    update: {
      role: "CUSTOMER",
      ...(passwordHash ? { passwordHash } : {}),
    },
  });

  console.log(`Seeded ${products.length} sample dresses and owner ${email}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
