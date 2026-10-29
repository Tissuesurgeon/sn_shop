import { describe, expect, it } from "vitest";
import { NAV } from "./nav";

function active(path: string, search = "") {
  const query = new URLSearchParams(search);
  return NAV.filter((link) => link.isActive(path, query)).map((link) => link.label);
}

describe("NAV", () => {
  it("marks the current destination", () => {
    expect(active("/shop")).toEqual(["Shop"]);
    expect(active("/shop", "sort=new")).toEqual(["New in"]);
    expect(active("/shop/ankara")).toEqual(["Ankara"]);
    expect(active("/shop/kente")).toEqual(["Kente"]);
    expect(active("/shop/evening")).toEqual(["Shop"]);
    expect(active("/shop/casual")).toEqual(["Shop"]);
    expect(active("/made-to-measure")).toEqual(["Bespoke"]);
    expect(active("/about")).toEqual(["Our story"]);
  });
});
