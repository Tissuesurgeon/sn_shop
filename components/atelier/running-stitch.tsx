import { cn } from "@/lib/cn";

export function RunningStitch({
  count = 6,
  light = false,
  className,
}: {
  count?: number;
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("running", className)} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i key={index} style={light ? { background: "#fff" } : undefined} />
      ))}
    </span>
  );
}
