import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

type FieldState = "default" | "focus" | "error";

function FieldWrap({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      {label ? <span className="lab">{label}</span> : null}
      {children}
      {error ? <span className="fe">⚠ {error}</span> : null}
    </label>
  );
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  state?: FieldState;
  error?: string;
};

export function Input({
  label,
  state = "default",
  error,
  className,
  placeholder,
  ...props
}: InputProps) {
  return (
    <FieldWrap label={label} error={state === "error" ? error : undefined}>
      <input
        className={cn("in", state === "focus" && "f", state === "error" && "e", className)}
        placeholder={placeholder}
        aria-invalid={state === "error" || undefined}
        {...props}
      />
    </FieldWrap>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  state?: FieldState;
  error?: string;
};

export function Textarea({ label, state = "default", error, className, ...props }: TextareaProps) {
  return (
    <FieldWrap label={label} error={state === "error" ? error : undefined}>
      <textarea
        className={cn("in ta", state === "focus" && "f", state === "error" && "e", className)}
        aria-invalid={state === "error" || undefined}
        {...props}
      />
    </FieldWrap>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  state?: FieldState;
  error?: string;
};

export function Select({
  label,
  state = "default",
  error,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <FieldWrap label={label} error={state === "error" ? error : undefined}>
      <select
        className={cn("in sel", state === "focus" && "f", state === "error" && "e", className)}
        aria-invalid={state === "error" || undefined}
        {...props}
      >
        {children}
      </select>
    </FieldWrap>
  );
}

/** Presentational select face used by the design-system sheet. */
export function SelectFace({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="lab">{label}</span>
      <span className="in sel">{value}</span>
    </div>
  );
}
