import { describe, expect, it } from "vitest";
import { paystackSignature, verifyPaystackSignature } from "./paystack";

describe("verifyPaystackSignature", () => {
  it("accepts a matching HMAC and rejects a bad one", () => {
    const body = JSON.stringify({ event: "charge.success" });
    const signature = paystackSignature(body, "sk_test_secret");
    expect(verifyPaystackSignature(body, signature, "sk_test_secret")).toBe(true);
    expect(verifyPaystackSignature(body, signature, "wrong")).toBe(false);
    expect(verifyPaystackSignature(body, null, "sk_test_secret")).toBe(false);
  });
});
