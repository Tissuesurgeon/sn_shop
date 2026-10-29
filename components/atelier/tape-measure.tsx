"use client";

import { cn } from "@/lib/cn";

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export function TapeMeasure({
  sizes = DEFAULT_SIZES,
  value,
  soldOut = [],
  label = "Size",
  onSelect,
}: {
  sizes?: readonly string[];
  value?: string;
  soldOut?: readonly string[];
  label?: string;
  onSelect?: (size: string) => void;
}) {
  return (
    <div className="tape" role="radiogroup" aria-label={label}>
      {sizes.map((size) => {
        const unavailable = soldOut.includes(size);
        const selected = value === size;
        return (
          <button
            key={size}
            type="button"
            className={cn("tk", selected && "on", unavailable && "x")}
            aria-pressed={selected}
            aria-disabled={unavailable || undefined}
            disabled={unavailable}
            onClick={() => onSelect?.(size)}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
