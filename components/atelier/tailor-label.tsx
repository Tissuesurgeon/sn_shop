import { cn } from "@/lib/cn";

export function TailorLabel({
  children,
  selected = false,
}: {
  children: string;
  selected?: boolean;
}) {
  return (
    <button type="button" className={cn("lbl", selected && "on")} aria-pressed={selected}>
      {children}
    </button>
  );
}
