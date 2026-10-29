import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SewnButton } from "./sewn-button";

export function Toast({
  children,
  tone = "ink",
  icon = tone === "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "success" | "error";
  icon?: boolean;
}) {
  return (
    <span
      className={cn("toast", tone === "success" && "toast-ok", tone === "error" && "toast-err")}
      role="status"
    >
      {icon ? <SewnButton /> : null}
      {children}
    </span>
  );
}
