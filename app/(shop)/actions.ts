"use server";

import { revalidateTag } from "next/cache";
import { createOrder, priceCart, type CheckoutInput } from "@/lib/orders";
import { getSettings } from "@/lib/settings";

export async function validateCart(items: CheckoutInput["items"]) {
  const [priced, settings] = await Promise.all([priceCart(items), getSettings()]);
  return {
    ...priced,
    freeThresholdPesewas: settings.freeDeliveryThresholdPesewas,
  };
}

export async function placeOrder(input: CheckoutInput) {
  const result = await createOrder(input);
  if (result.ok) revalidateTag("products");
  return result;
}
