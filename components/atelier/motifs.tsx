import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Seam({ className }: { className?: string }) {
  return <hr className={cn("seam", className)} />;
}

export function KenteBand({ thin = false }: { thin?: boolean }) {
  return <div className={cn("kente", thin && "thin")} role="presentation" />;
}

export function StitchedCard({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <div className={cn("box stitched", className)}>{children}</div>;
}

export function Foil({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cn("foil", className)}>{children}</div>;
}

export function Linen({ className }: { className?: string }) {
  return <div className={cn("linen", className)} role="presentation" />;
}

export function OutlinedNumeral({ children, size }: { children: ReactNode; size?: number }) {
  return (
    <span className="num" style={size ? { fontSize: size } : undefined}>
      {children}
    </span>
  );
}
