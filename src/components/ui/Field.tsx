import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-forest/60 focus:ring-4 focus:ring-forest/5 disabled:bg-sand/50";

export function Label({ children, htmlFor, className }: { children: ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-1.5 block text-[13px] font-semibold text-forest", className)}>
      {children}
    </label>
  );
}

export function Input({
  label,
  error,
  hint,
  wrapClassName,
  className,
  id,
  ...props
}: ComponentProps<"input"> & {
  label?: string;
  error?: string;
  hint?: string;
  wrapClassName?: string;
}) {
  return (
    <div className={wrapClassName}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <input id={id} className={cn(fieldClass, error && "border-terracotta/60", className)} {...props} />
      {hint && !error ? <p className="mt-1.5 text-[11px] text-muted">{hint}</p> : null}
      {error ? <p className="mt-1.5 text-[11px] font-medium text-terracotta">{error}</p> : null}
    </div>
  );
}

export function Select({
  label,
  error,
  children,
  wrapClassName,
  className,
  id,
  ...props
}: ComponentProps<"select"> & {
  label?: string;
  error?: string;
  wrapClassName?: string;
}) {
  return (
    <div className={wrapClassName}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <div className="relative">
        <select
          id={id}
          className={cn(fieldClass, "appearance-none pr-9", error && "border-terracotta/60", className)}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error ? <p className="mt-1.5 text-[11px] font-medium text-terracotta">{error}</p> : null}
    </div>
  );
}

export function Textarea({
  label,
  error,
  wrapClassName,
  className,
  id,
  ...props
}: ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
  wrapClassName?: string;
}) {
  return (
    <div className={wrapClassName}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <textarea
        id={id}
        className={cn(fieldClass, "h-auto min-h-28 resize-y py-3", error && "border-terracotta/60", className)}
        {...props}
      />
      {error ? <p className="mt-1.5 text-[11px] font-medium text-terracotta">{error}</p> : null}
    </div>
  );
}

export { fieldClass };
