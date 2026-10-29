import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAdmin = vi.fn();

vi.mock("@/lib/require-admin", () => ({
  requireAdmin: () => requireAdmin(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {},
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("admin actions", () => {
  beforeEach(() => {
    requireAdmin.mockReset();
  });

  it("rejects a signed-out caller before touching the catalogue", async () => {
    requireAdmin.mockRejectedValue(new Error("You don't have access."));
    const { saveProduct, updateOrderStatus, uploadProductImage, saveSettings } = await import("./actions");
    const form = new FormData();
    await expect(saveProduct(form)).rejects.toThrow("You don't have access.");
    await expect(updateOrderStatus(form)).rejects.toThrow("You don't have access.");
    await expect(uploadProductImage(form)).rejects.toThrow("You don't have access.");
    await expect(saveSettings(form)).rejects.toThrow("You don't have access.");
  });
});
