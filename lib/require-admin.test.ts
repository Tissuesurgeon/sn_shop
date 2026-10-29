import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Session } from "next-auth";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { adminPing } from "@/app/admin/actions";

const authMock = auth as unknown as {
  mockReset: () => void;
  mockResolvedValue: (value: Session | null) => void;
};

function session(role: "OWNER" | "STAFF" | "CUSTOMER"): Session {
  return {
    expires: "2099-01-01T00:00:00.000Z",
    user: {
      id: "user_1",
      role,
      email: "person@snstitches.com",
      name: "Person",
    },
  };
}

describe("adminPing", () => {
  beforeEach(() => {
    authMock.mockReset();
  });

  it("rejects an anonymous session", async () => {
    authMock.mockResolvedValue(null);
    await expect(adminPing()).rejects.toThrow("You don't have access.");
  });

  it("rejects a customer session", async () => {
    authMock.mockResolvedValue(session("CUSTOMER"));
    await expect(adminPing()).rejects.toThrow("You don't have access.");
  });

  it("allows owner and staff", async () => {
    authMock.mockResolvedValue(session("OWNER"));
    await expect(adminPing()).resolves.toEqual({ ok: true });
    authMock.mockResolvedValue(session("STAFF"));
    await expect(adminPing()).resolves.toEqual({ ok: true });
  });
});
