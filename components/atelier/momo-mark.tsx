import { cn } from "@/lib/cn";

const marks = {
  mtn: { className: "mtn", label: "MTN MoMo" },
  tel: { className: "tel", label: "Telecel Cash" },
  at: { className: "at", label: "AirtelTigo" },
  visa: { className: "visa", label: "VISA" },
  mc: { className: "mc", label: "MC" },
} as const;

export function MomoMark({ network }: { network: keyof typeof marks }) {
  const mark = marks[network];
  return <span className={cn("momo", mark.className)}>{mark.label}</span>;
}
