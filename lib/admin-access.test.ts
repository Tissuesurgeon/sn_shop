import { describe, expect, it } from "vitest";
import { canAccessAdminPath } from "./admin-access";

describe("canAccessAdminPath", () => {
  it("lets anyone open the login page", () => {
    expect(canAccessAdminPath("/admin/login", undefined)).toBe(true);
    expect(canAccessAdminPath("/admin/login", "CUSTOMER")).toBe(true);
  });

  it("rejects anonymous and customer sessions on the rest of admin", () => {
    expect(canAccessAdminPath("/admin", undefined)).toBe(false);
    expect(canAccessAdminPath("/admin/products", "CUSTOMER")).toBe(false);
  });

  it("allows owner and staff", () => {
    expect(canAccessAdminPath("/admin", "OWNER")).toBe(true);
    expect(canAccessAdminPath("/admin/orders", "STAFF")).toBe(true);
  });
});
