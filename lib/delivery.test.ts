import { describe, expect, it } from "vitest";
import { quoteDelivery, sameDayOpen, type DeliveryRule } from "./delivery";

const sameDay: DeliveryRule = {
  code: "ACCRA_SAME_DAY",
  label: "Accra same-day",
  etaText: "today",
  feePesewas: 4000,
  regions: ["GREATER_ACCRA"],
  cutoffTime: "12:00",
  isPickup: false,
};

describe("sameDayOpen", () => {
  it("is open on a Thursday morning in Accra and closed after noon and on Sunday", () => {
    expect(sameDayOpen(new Date("2026-10-29T11:30:00Z"))).toBe(true);
    expect(sameDayOpen(new Date("2026-10-29T12:00:00Z"))).toBe(false);
    expect(sameDayOpen(new Date("2026-10-25T10:00:00Z"))).toBe(false);
  });
});

describe("quoteDelivery", () => {
  it("hides same-day outside Accra, after the cutoff, and for made-to-measure", () => {
    const base = {
      region: "GREATER_ACCRA",
      subtotalPesewas: 42000,
      freeThresholdPesewas: 150000,
      now: new Date("2026-10-29T11:00:00Z"),
      hasMadeToMeasure: false,
    };
    expect(quoteDelivery(sameDay, base).available).toBe(true);
    expect(quoteDelivery(sameDay, { ...base, region: "ASHANTI" }).available).toBe(false);
    expect(quoteDelivery(sameDay, { ...base, hasMadeToMeasure: true }).available).toBe(false);
    expect(
      quoteDelivery(sameDay, { ...base, subtotalPesewas: 150000 }).feePesewas,
    ).toBe(0);
  });
});
