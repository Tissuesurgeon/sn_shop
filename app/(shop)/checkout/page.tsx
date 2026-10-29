import { CheckoutForm } from "@/components/checkout/form";
import { demoPaymentsEnabled, paymentsConfigured } from "@/lib/paystack";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const [options, settings] = await Promise.all([
    prisma.deliveryOption.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    getSettings(),
  ]);

  return (
    <CheckoutForm
      options={options.map((option) => ({
        id: option.id,
        code: option.code,
        label: option.label,
        etaText: option.etaText,
        feePesewas: option.feePesewas,
        regions: option.regions,
        cutoffTime: option.cutoffTime,
        isPickup: option.isPickup,
      }))}
      freeThreshold={settings.freeDeliveryThresholdPesewas}
      paymentsReady={paymentsConfigured()}
      demo={demoPaymentsEnabled()}
    />
  );
}
