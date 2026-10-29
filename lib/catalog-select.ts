import type { Prisma } from "@prisma/client";

/** Fields the storefront may read. Internal flags and SKUs stay off this select. */
export const activeProductSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  details: true,
  length: true,
  pricePesewas: true,
  compareAtPesewas: true,
  isFeatured: true,
  madeToMeasure: true,
  mtmFeePesewas: true,
  leadTimeDays: true,
  category: { select: { name: true, slug: true } },
  images: {
    orderBy: { sortOrder: "asc" },
    select: { url: true, alt: true, width: true, height: true, sortOrder: true },
  },
  variants: {
    where: { isActive: true },
    select: {
      id: true,
      size: true,
      colourName: true,
      colourHex: true,
      stockQty: true,
      priceOverridePesewas: true,
    },
  },
} satisfies Prisma.ProductSelect;
