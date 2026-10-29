import { describe, expect, it } from "vitest";
import { filterCatalog, type CatalogProduct } from "./catalog";

const dresses = [
  {
    name: "Adwoa Ankara",
    pricePesewas: 45000,
    length: "MIDI",
    category: { slug: "ankara" },
    variants: [{ size: "M", stockQty: 2 }],
  },
  {
    name: "Ama Kente",
    pricePesewas: 78000,
    length: "MAXI",
    category: { slug: "kente" },
    variants: [{ size: "M", stockQty: 0 }],
  },
] as unknown as CatalogProduct[];

describe("filterCatalog", () => {
  it("filters by category, in-stock size, and price", () => {
    expect(filterCatalog(dresses, { category: "ankara" })).toHaveLength(1);
    expect(filterCatalog(dresses, { size: "M" }).map((item) => item.name)).toEqual(["Adwoa Ankara"]);
    expect(filterCatalog(dresses, { sort: "price-desc" })[0]?.name).toBe("Ama Kente");
    expect(filterCatalog(dresses, { stock: "1" })).toHaveLength(1);
  });
});
