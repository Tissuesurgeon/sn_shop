import { describe, expect, it } from "vitest";
import { buildMediaPlan, decideListing, decideStockQty, requireBlobToken } from "./add-showcase-products";

describe("decideListing", () => {
  it("creates a draft at zero while the price is still TODO", () => {
    expect(decideListing({ mapPrice: null, existingPrice: null, existingStatus: null })).toEqual({
      pricePesewas: 0,
      status: "DRAFT",
      writePrice: true,
    });
  });

  it("publishes only when the map has a positive pesewa price", () => {
    expect(decideListing({ mapPrice: 42000, existingPrice: 0, existingStatus: "DRAFT" })).toEqual({
      pricePesewas: 42000,
      status: "ACTIVE",
      writePrice: true,
    });
  });

  it("leaves an admin price alone when the map is still empty", () => {
    expect(decideListing({ mapPrice: null, existingPrice: 45000, existingStatus: "ACTIVE" })).toEqual({
      pricePesewas: 45000,
      status: "ACTIVE",
      writePrice: false,
    });
  });
});

describe("requireBlobToken", () => {
  it("fails when the token is missing unless local files are explicitly allowed", () => {
    expect(() => requireBlobToken(undefined, false)).toThrow(/BLOB_READ_WRITE_TOKEN/);
    expect(() => requireBlobToken("  ", false)).toThrow(/BLOB_READ_WRITE_TOKEN/);
    expect(() => requireBlobToken(undefined, true)).not.toThrow();
    expect(() => requireBlobToken("token", false)).not.toThrow();
  });
});

describe("buildMediaPlan", () => {
  it("keeps the cover as a still, then on-model photos, then videos", () => {
    const plan = buildMediaPlan({
      name: "Afia Kente Ruffle Dress",
      shots: [
        { base: "06-kente-ruffle-dress-front", alt: "front" },
        { base: "05-kente-ruffle-dress-angle", alt: "angle" },
      ],
    });
    expect(plan.map((row) => `${row.kind}:${row.base}:${row.model}`)).toEqual([
      "IMAGE:06-kente-ruffle-dress-front:false",
      "IMAGE:05-kente-ruffle-dress-angle:false",
      "IMAGE:06-kente-ruffle-dress-front:true",
      "IMAGE:05-kente-ruffle-dress-angle:true",
      "VIDEO:06-kente-ruffle-dress-front:true",
      "VIDEO:05-kente-ruffle-dress-angle:true",
    ]);
    expect(plan[0]?.kind).toBe("IMAGE");
    expect(plan.at(-1)?.alt).toBe("Afia Kente Ruffle Dress, worn by model, short video");
  });
});

describe("decideStockQty", () => {
  it("starts a new size at zero and does not reset stock that is already set", () => {
    expect(decideStockQty(null, null)).toEqual({ stockQty: 0, writeStock: true });
    expect(decideStockQty(null, 4)).toEqual({ stockQty: 4, writeStock: false });
    expect(decideStockQty(2, 4)).toEqual({ stockQty: 2, writeStock: true });
  });
});
