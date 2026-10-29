import { describe, expect, it } from "vitest";
import { activeProductSelect } from "./catalog-select";

describe("activeProductSelect", () => {
  it("leaves sample flags and SKUs off the public catalogue read", () => {
    expect(activeProductSelect).not.toHaveProperty("isSample");
    expect(activeProductSelect).not.toHaveProperty("status");
    expect(activeProductSelect.variants.select).not.toHaveProperty("sku");
  });
});
