import { describe, expect, it } from "vitest";
import { canTransition } from "./order-status";

describe("canTransition", () => {
  it("allows the paid pipeline and cancel before shipping", () => {
    expect(canTransition("PENDING", "PAID")).toBe(true);
    expect(canTransition("PAID", "PROCESSING")).toBe(true);
    expect(canTransition("PROCESSING", "SHIPPED")).toBe(true);
    expect(canTransition("SHIPPED", "DELIVERED")).toBe(true);
    expect(canTransition("PENDING", "CANCELLED")).toBe(true);
    expect(canTransition("PAID", "CANCELLED")).toBe(true);
    expect(canTransition("PROCESSING", "CANCELLED")).toBe(true);
  });

  it("rejects skips and changes after a terminal status", () => {
    expect(canTransition("PENDING", "SHIPPED")).toBe(false);
    expect(canTransition("SHIPPED", "CANCELLED")).toBe(false);
    expect(canTransition("DELIVERED", "REFUNDED")).toBe(false);
    expect(canTransition("CANCELLED", "PAID")).toBe(false);
  });
});
