import { cn } from "@/lib/cn";

const tones = {
  pending: "st-pending",
  paid: "st-paid",
  processing: "st-processing",
  shipped: "st-shipped",
  delivered: "st-delivered",
  cancelled: "st-cancelled",
} as const;

export function StatusChip({ tone, children }: { tone: keyof typeof tones; children: string }) {
  return <span className={cn("st", tones[tone])}>{children}</span>;
}
