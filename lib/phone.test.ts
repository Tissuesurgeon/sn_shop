import { describe, expect, it } from "vitest";
import { toE164 } from "./phone";

describe("toE164", () => {
  it("accepts local and international Ghana numbers", () => {
    expect(toE164("024 412 7788")).toBe("+233244127788");
    expect(toE164("+233546923596")).toBe("+233546923596");
    expect(toE164("0546923596")).toBe("+233546923596");
  });

  it("rejects short and non-Ghana numbers", () => {
    expect(toE164("024 41")).toBeNull();
    expect(toE164("0800123456")).toBeNull();
  });
});
