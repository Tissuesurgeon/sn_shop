import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RunningStitch } from "./running-stitch";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "p",
      secondary: "",
      ghost: "g",
      gold: "gold",
      whatsapp: "wa",
    },
    size: {
      default: "",
      small: "s",
    },
    visual: {
      default: "",
      hover: "hov",
      focus: "foc",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    visual: "default",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href?: string;
    loading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  visual,
  asChild = false,
  href,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, visual }), disabled && "dis", className);
  const content: ReactNode = loading ? (
    <>
      <RunningStitch count={3} light />
      {children ?? "Processing"}
    </>
  ) : (
    children
  );

  if (asChild) {
    return (
      <Slot className={classes} {...props}>
        {content}
      </Slot>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} aria-disabled={disabled || loading || undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </button>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="lnk" href={href}>
      {children}
    </a>
  );
}
