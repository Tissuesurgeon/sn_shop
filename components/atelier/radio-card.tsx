import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function RadioCard({
  title,
  detail,
  price,
  checked = false,
  name = "choice",
  value,
}: {
  title: string;
  detail?: string;
  price?: ReactNode;
  checked?: boolean;
  name?: string;
  value?: string;
}) {
  return (
    <label className={cn("rc", checked && "on")}>
      <input
        className="sr-only"
        type="radio"
        name={name}
        value={value ?? title}
        defaultChecked={checked}
      />
      <span className="rd" aria-hidden="true" />
      <span className="t">
        <b>{title}</b>
        {detail ? <small>{detail}</small> : null}
      </span>
      {price}
    </label>
  );
}
