"use server";

import { requireAdmin } from "@/lib/require-admin";

export async function adminPing() {
  await requireAdmin();
  return { ok: true as const };
}
