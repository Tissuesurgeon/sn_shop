import { cn } from "@/lib/cn";
import { formatGHS, formatGHSLabel } from "@/lib/format";

export function HangTag({
  amount,
  compareAt,
  size = "default",
  tone = "default",
  prefix,
  className,
}: {
  amount: number;
  compareAt?: number;
  size?: "default" | "big";
  tone?: "default" | "magenta";
  prefix?: string;
  className?: string;
}) {
  const spoken = compareAt
    ? `${formatGHSLabel(amount)}, was ${formatGHSLabel(compareAt)}`
    : formatGHSLabel(amount);

  return (
    <span
      className={cn("tag", size === "big" && "big", tone === "magenta" && "mag", className)}
      aria-label={spoken}
    >
      {prefix ? <span>{prefix}</span> : null}
      {formatGHS(amount)}
      {compareAt ? <s>{formatGHS(compareAt)}</s> : null}
    </span>
  );
}
