import { describe, expect, it } from "vitest";
import { formatGHS, formatGHSLabel } from "./format";

describe("formatGHS", () => {
  it("formats whole cedis with grouping and no decimals", () => {
    expect(formatGHS(125000)).toBe("GH₵1,250");
    expect(formatGHS(45000)).toBe("GH₵450");
    expect(formatGHS(100)).toBe("GH₵1");
    expect(formatGHS(0)).toBe("GH₵0");
  });

  it("keeps pesewas when the amount is not a whole cedi", () => {
    expect(formatGHS(45050)).toBe("GH₵450.50");
  });

  it("reads the amount in words for screen readers", () => {
    expect(formatGHSLabel(45000)).toBe("450 Ghana cedis");
    expect(formatGHSLabel(125050)).toBe("1250.50 Ghana cedis");
  });
});
