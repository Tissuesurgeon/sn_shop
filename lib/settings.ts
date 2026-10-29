import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getSettings = cache(async () => {
  return prisma.storeSettings.upsert({
    where: { id: "default" },
    create: { id: "default" },
    update: {},
  });
});

export function whatsappHref(number = "233546923596", text?: string): string {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
