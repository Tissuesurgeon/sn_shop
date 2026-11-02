/**
 * Idempotent import of the four showcase listings.
 * Prices stay null until Richard sets them in pesewas (GH₵1 = 100).
 */
import { execFile } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { PrismaClient, type ProductStatus, type Size } from "@prisma/client";
import sharp from "sharp";
import { loadEnvFile } from "../lib/load-env";

const execFileAsync = promisify(execFile);

function parseEnvFile(file: string): Record<string, string> {
  const values: Record<string, string> = {};
  if (!existsSync(file)) return values;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function loadShowcaseEnv() {
  loadEnvFile();
  const local = parseEnvFile(path.resolve(process.cwd(), ".env.local"));
  for (const [key, value] of Object.entries(local)) {
    const current = process.env[key];
    if ((current === undefined || current.trim() === "") && value.trim()) process.env[key] = value;
  }
  const token = local.BLOB_READ_WRITE_TOKEN?.trim();
  if (token) process.env.BLOB_READ_WRITE_TOKEN = token;
}

loadShowcaseEnv();

const prisma = new PrismaClient();

/** TODO(Richard): set price in pesewas (GH₵1 = 100). null does not invent a price. */
const PRICES: Record<string, number | null> = {
  "dzifa-adire-kaftan-dress": null,
  "kukua-ankara-wide-leg-trousers": null,
  "afia-kente-ruffle-dress": null,
  "nana-xo-batik-sailor-dress": null,
};

/** TODO(Richard): set stock per size. null leaves an existing variant's stock alone. */
const STOCK: Partial<Record<Size, number | null>> = {
  XS: null,
  S: null,
  M: null,
  L: null,
  XL: null,
};

const DRESS_SIZES: Size[] = ["XS", "S", "M", "L", "XL"];
const KAFTAN_SIZES: Size[] = ["S", "M", "L", "XL"];

type Shot = { base: string; alt: string };

type ShowcaseProduct = {
  name: string;
  slug: string;
  category: "casual" | "ankara" | "kente";
  length: "MINI" | "MIDI" | "MAXI";
  colourName: string;
  colourHex: string;
  sizes: Size[];
  description: string;
  details: string[];
  shots: Shot[];
};

const PRODUCTS: ShowcaseProduct[] = [
  {
    name: "Dzifa Adire Kaftan Dress",
    slug: "dzifa-adire-kaftan-dress",
    category: "casual",
    length: "MAXI",
    colourName: "Lilac & Green Adire",
    colourHex: "#8E7CC3",
    sizes: KAFTAN_SIZES,
    description:
      "Easy, breezy and made for Accra heat. Hand-dyed adire in lilac and green falls from a glossy purple satin yoke with a crisp shirt collar. Oversized, so one size of comfort for brunch, church or travel.",
    details: ["Hand-dyed adire cotton", "Satin yoke and shirt collar", "Relaxed oversized fit", "Made in Ghana"],
    shots: [
      {
        base: "01-adire-kaftan",
        alt: "Dzifa Adire Kaftan Dress — lilac and green adire with purple satin yoke, front view",
      },
    ],
  },
  {
    name: "Kukua Ankara Wide-Leg Trousers",
    slug: "kukua-ankara-wide-leg-trousers",
    category: "ankara",
    length: "MAXI",
    colourName: "Red, Blue & Yellow Print",
    colourHex: "#C8312B",
    sizes: DRESS_SIZES,
    description:
      "Bold wax print, wide leg, all day. A high-waisted trouser in red, blue and yellow Ankara that looks just as good with a plain white tee as it does dressed up.",
    details: ["100% cotton wax print", "High waist, wide leg", "Side pockets (TODO confirm)", "Tee not included"],
    shots: [
      { base: "02-print-trousers-white-tee", alt: "Kukua Ankara Wide-Leg Trousers styled with a white tee" },
      { base: "03-print-trousers-black-tee", alt: "Kukua Ankara Wide-Leg Trousers styled with a black ringer tee" },
      { base: "04-print-trousers-blue-tee", alt: "Kukua Ankara Wide-Leg Trousers styled with a royal-blue tee" },
    ],
  },
  {
    name: "Afia Kente Ruffle Dress",
    slug: "afia-kente-ruffle-dress",
    category: "kente",
    length: "MIDI",
    colourName: "Olive Kente",
    colourHex: "#6B6B2A",
    sizes: DRESS_SIZES,
    description:
      "Kente-print drama with a soft finish: black satin V-neck, flounce sleeves and a full ruffle hem. Wear it belted for weddings, outdoorings and Sunday best.",
    details: [
      "Kente-inspired print",
      "Black satin V-neck",
      "Flounce sleeves, ruffle hem",
      "Belt shown for styling (TODO: included?)",
    ],
    shots: [
      { base: "06-kente-ruffle-dress-front", alt: "Afia Kente Ruffle Dress, belted front view" },
      { base: "05-kente-ruffle-dress-angle", alt: "Afia Kente Ruffle Dress, angled view" },
    ],
  },
  {
    name: "Nana XO Batik Sailor Dress",
    slug: "nana-xo-batik-sailor-dress",
    category: "casual",
    length: "MINI",
    colourName: "Black & White with Red Collar",
    colourHex: "#111111",
    sizes: DRESS_SIZES,
    description:
      "Playful XO batik in black and white, finished with a red sailor collar and cuffs. A clean shift shape you can wear to work, lunch or out on the weekend.",
    details: ["Batik-print cotton", "Red sailor collar and cuffs", "Shift silhouette", "Made in Ghana"],
    shots: [
      { base: "07-xo-batik-dress", alt: "Nana XO Batik Sailor Dress, front" },
      { base: "08-xo-batik-dress-angle", alt: "Nana XO Batik Sailor Dress, angled view" },
    ],
  },
];

export function decideListing(input: {
  mapPrice: number | null;
  existingPrice: number | null;
  existingStatus: ProductStatus | null;
}): { pricePesewas: number; status: ProductStatus; writePrice: boolean } {
  if (input.mapPrice !== null && input.mapPrice > 0) {
    return { pricePesewas: input.mapPrice, status: "ACTIVE", writePrice: true };
  }
  if (input.existingPrice !== null && input.existingPrice > 0 && input.mapPrice === null) {
    return {
      pricePesewas: input.existingPrice,
      status: input.existingStatus ?? "ACTIVE",
      writePrice: false,
    };
  }
  return { pricePesewas: 0, status: "DRAFT", writePrice: true };
}

export function decideStockQty(
  mapQty: number | null,
  existingQty: number | null,
): { stockQty: number; writeStock: boolean } {
  if (existingQty === null) return { stockQty: mapQty ?? 0, writeStock: true };
  if (mapQty === null) return { stockQty: existingQty, writeStock: false };
  return { stockQty: mapQty, writeStock: true };
}

function skuFor(slug: string, size: Size, colour: string): string {
  const colourCode = colour
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `SN-${slug}-${size}-${colourCode}`;
}

export function requireBlobToken(token: string | undefined, allowLocal: boolean): void {
  if (token?.trim() || allowLocal) return;
  throw new Error(
    "BLOB_READ_WRITE_TOKEN is missing. Set it before writing to the shared database, or pass --allow-local to write public/products files that must be committed.",
  );
}

export type MediaPlanRow = { kind: "IMAGE" | "VIDEO"; alt: string; base: string; model: boolean };

export function buildMediaPlan(product: { name: string; shots: Shot[] }): MediaPlanRow[] {
  const mannequin = product.shots.map((shot) => ({ kind: "IMAGE" as const, alt: shot.alt, base: shot.base, model: false }));
  const worn = product.shots.map((shot) => ({
    kind: "IMAGE" as const,
    alt: `${shot.alt}, worn by model`,
    base: shot.base,
    model: true,
  }));
  const videos = product.shots.map((shot) => ({
    kind: "VIDEO" as const,
    alt: `${product.name}, worn by model, short video`,
    base: shot.base,
    model: true,
  }));
  return [...mannequin, ...worn, ...videos];
}

function isDirectRun(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

type PreparedMedia = {
  kind: "IMAGE" | "VIDEO";
  url: string;
  pathname: string;
  alt: string;
  width: number | null;
  height: number | null;
  posterUrl: string | null;
  base: string;
  model: boolean;
};

let ffmpegReady: boolean | null = null;

async function hasFfmpeg(): Promise<boolean> {
  if (ffmpegReady !== null) return ffmpegReady;
  try {
    await execFileAsync("ffmpeg", ["-version"]);
    ffmpegReady = true;
  } catch {
    ffmpegReady = false;
    console.warn("ffmpeg is not installed. Videos stay at source size and use the on-model photo as the poster.");
  }
  return ffmpegReady;
}

async function storeBytes(
  pathname: string,
  body: Buffer,
  contentType: string,
  allowLocal: boolean,
): Promise<{ url: string; pathname: string }> {
  if (allowLocal) {
    const dest = path.join(process.cwd(), "public", pathname);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, body);
    console.warn(`Wrote /${pathname}. Commit public/products before deploying.`);
    return { url: `/${pathname}`, pathname };
  }
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is missing.");
  const { put } = await import("@vercel/blob");
  const blob = await put(pathname, body, {
    access: "public",
    token,
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return { url: blob.url, pathname: blob.pathname };
}

async function prepareImage(
  slug: string,
  base: string,
  alt: string,
  model: boolean,
  allowLocal: boolean,
): Promise<PreparedMedia | null> {
  const folder = model ? "on-model" : "showcase";
  const sourceName = model ? `${base}-model.jpg` : `${base}.jpg`;
  const source = path.join(process.cwd(), "docs", "listing-images", folder, sourceName);
  try {
    await access(source);
  } catch {
    const message = `Missing ${folder} photo ${sourceName}`;
    if (process.argv.includes("--require-model") || !model) throw new Error(message);
    console.warn(`${message}. Skipping it.`);
    return null;
  }

  const nn = base.slice(0, 2);
  const filename = model ? `model-${nn}.webp` : `${nn}.webp`;
  const pathname = `products/${slug}/${filename}`;
  const written = await sharp(source)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer({ resolveWithObject: true });
  const stored = await storeBytes(pathname, written.data, "image/webp", allowLocal);
  return {
    kind: "IMAGE",
    url: stored.url,
    pathname: stored.pathname,
    alt,
    width: written.info.width,
    height: written.info.height,
    posterUrl: null,
    base,
    model,
  };
}

async function prepareVideo(
  slug: string,
  base: string,
  alt: string,
  allowLocal: boolean,
): Promise<PreparedMedia | null> {
  const sourceName = `${base}-model.mp4`;
  const source = path.join(process.cwd(), "docs", "listing-images", "videos", sourceName);
  try {
    await access(source);
  } catch {
    console.warn(`Missing video ${sourceName}. Skipping it.`);
    return null;
  }

  const nn = base.slice(0, 2);
  let videoBody = await readFile(source);
  let posterBody: Buffer | null = null;
  if (await hasFfmpeg()) {
    const dir = path.join(tmpdir(), `sn-video-${slug}-${nn}`);
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });
    const out = path.join(dir, "out.mp4");
    const poster = path.join(dir, "poster.webp");
    await execFileAsync("ffmpeg", [
      "-y",
      "-i",
      source,
      "-an",
      "-vf",
      "scale=900:-2",
      "-c:v",
      "libx264",
      "-crf",
      "26",
      "-preset",
      "slow",
      "-movflags",
      "+faststart",
      out,
    ]);
    await execFileAsync("ffmpeg", ["-y", "-ss", "0.5", "-i", source, "-frames:v", "1", "-vf", "scale=900:-2", poster]);
    videoBody = await readFile(out);
    posterBody = await readFile(poster);
    await rm(dir, { recursive: true, force: true });
  }

  const stored = await storeBytes(`products/${slug}/video-${nn}.mp4`, videoBody, "video/mp4", allowLocal);
  let posterUrl: string | null = null;
  if (posterBody) {
    const poster = await storeBytes(`products/${slug}/video-${nn}-poster.webp`, posterBody, "image/webp", allowLocal);
    posterUrl = poster.url;
  }
  return {
    kind: "VIDEO",
    url: stored.url,
    pathname: stored.pathname,
    alt,
    width: null,
    height: null,
    posterUrl,
    base,
    model: true,
  };
}

async function sampleFingerprint() {
  const rows = await prisma.product.findMany({
    where: { isSample: true },
    orderBy: { slug: "asc" },
    select: {
      slug: true,
      pricePesewas: true,
      status: true,
      _count: { select: { images: true, variants: true } },
    },
  });
  return JSON.stringify(rows);
}

async function revalidateShop() {
  const flag = process.argv.indexOf("--revalidate-url");
  if (flag === -1) return;
  const url = process.argv[flag + 1];
  if (!url || url.startsWith("--")) throw new Error("--revalidate-url needs a URL");
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) throw new Error("CRON_SECRET is missing, so the shop cache was not cleared.");
  const response = await fetch(url, { method: "POST", headers: { authorization: `Bearer ${secret}` } });
  if (!response.ok) throw new Error(`Revalidate failed: ${response.status}`);
  console.log(`Revalidated ${url}`);
}

async function main() {
  const allowLocal = process.argv.includes("--allow-local");
  requireBlobToken(process.env.BLOB_READ_WRITE_TOKEN, allowLocal);
  if (allowLocal) console.warn("Writing files under public/products. Commit those files before deploying.");
  const before = await sampleFingerprint();
  const categories = await prisma.category.findMany({
    where: { slug: { in: ["ankara", "kente", "casual"] } },
    select: { id: true, slug: true },
  });
  const categoryId = new Map(categories.map((category) => [category.slug, category.id]));
  for (const slug of ["ankara", "kente", "casual"]) {
    if (!categoryId.has(slug)) throw new Error(`Missing category ${slug}. Run the seed before this script.`);
  }

  const statuses: ProductStatus[] = [];
  for (const product of PRODUCTS) {
    const mapPrice = PRICES[product.slug] ?? null;
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
      select: { pricePesewas: true, status: true },
    });
    const listing = decideListing({
      mapPrice,
      existingPrice: existing?.pricePesewas ?? null,
      existingStatus: existing?.status ?? null,
    });
    if (mapPrice === null) {
      console.warn(`${product.slug}: price is still TODO. ${listing.writePrice ? "Keeping it as a draft." : "Leaving the admin price in place."}`);
    }

    const category = categoryId.get(product.category);
    if (!category) throw new Error(`Missing category ${product.category}`);
    const saved = await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        details: product.details,
        length: product.length,
        pricePesewas: listing.pricePesewas,
        status: listing.status,
        isFeatured: false,
        madeToMeasure: false,
        isSample: false,
        categoryId: category,
      },
      update: {
        name: product.name,
        description: product.description,
        details: product.details,
        length: product.length,
        isFeatured: false,
        madeToMeasure: false,
        isSample: false,
        categoryId: category,
        ...(listing.writePrice ? { pricePesewas: listing.pricePesewas, status: listing.status } : {}),
      },
    });

    if (allowLocal) {
      await rm(path.join(process.cwd(), "public", "products", product.slug), { recursive: true, force: true });
    }
    const media: PreparedMedia[] = [];
    for (const row of buildMediaPlan(product)) {
      const prepared =
        row.kind === "IMAGE"
          ? await prepareImage(product.slug, row.base, row.alt, row.model, allowLocal)
          : await prepareVideo(product.slug, row.base, row.alt, allowLocal);
      if (prepared) media.push(prepared);
    }
    for (const clip of media) {
      if (clip.kind !== "VIDEO" || clip.posterUrl) continue;
      const still = media.find((item) => item.kind === "IMAGE" && item.model && item.base === clip.base);
      clip.posterUrl = still?.url ?? null;
    }
    await prisma.productImage.deleteMany({ where: { productId: saved.id } });
    await prisma.productImage.createMany({
      data: media.map((image, sortOrder) => ({
        kind: image.kind,
        url: image.url,
        pathname: image.pathname,
        alt: image.alt,
        width: image.width,
        height: image.height,
        posterUrl: image.posterUrl,
        productId: saved.id,
        sortOrder,
      })),
    });

    for (const size of product.sizes) {
      const sku = skuFor(product.slug, size, product.colourName);
      const current = await prisma.productVariant.findUnique({ where: { sku }, select: { stockQty: true } });
      const stock = decideStockQty(STOCK[size] ?? null, current?.stockQty ?? null);
      const data = {
        size,
        colourName: product.colourName,
        colourHex: product.colourHex,
        isActive: true,
        ...(stock.writeStock ? { stockQty: stock.stockQty } : {}),
      };
      await prisma.productVariant.upsert({
        where: { sku },
        create: { ...data, sku, productId: saved.id, stockQty: stock.stockQty },
        update: data,
      });
    }

    const counts = await prisma.product.findUnique({
      where: { id: saved.id },
      select: {
        status: true,
        pricePesewas: true,
        images: { orderBy: { sortOrder: "asc" }, select: { kind: true, url: true } },
        _count: { select: { variants: true } },
      },
    });
    if (counts) statuses.push(counts.status);
    const imageCount = counts?.images.filter((image) => image.kind === "IMAGE").length ?? 0;
    const videoCount = counts?.images.filter((image) => image.kind === "VIDEO").length ?? 0;
    console.log(
      `${product.slug}: ${counts?.status} price=${counts?.pricePesewas} images=${imageCount} videos=${videoCount} variants=${counts?._count.variants}`,
    );
    for (const image of counts?.images ?? []) console.log(`  ${image.kind} ${image.url}`);
  }

  const after = await sampleFingerprint();
  if (before !== after) throw new Error("Showcase import changed a sample product. Aborting.");
  const drafts = statuses.filter((status) => status === "DRAFT").length;
  console.log(`${drafts} products are DRAFT because their price is TODO.`);
  console.log("Fill in STOCK in scripts/add-showcase-products.ts so these pieces are not sold out once you set a price.");
  if (!allowLocal) {
    await rm(path.join(process.cwd(), "public", "listing-images"), { recursive: true, force: true });
    console.log("Removed public/listing-images.");
  }
  await revalidateShop();
}

if (isDirectRun()) {
  main()
    .catch((error: unknown) => {
      console.error(error);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
