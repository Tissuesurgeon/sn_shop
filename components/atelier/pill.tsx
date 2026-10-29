import { cn } from "@/lib/cn";

const tones = {
  new: "p-new",
  sale: "p-sale",
  sold: "p-sold",
  sample: "p-sample",
} as const;

export function Pill({ tone, children }: { tone: keyof typeof tones; children: string }) {
  return <span className={cn("pill", tones[tone])}>{children}</span>;
}
