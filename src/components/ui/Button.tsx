import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "brass" | "outline" | "ghost" | "light" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-cream hover:bg-forest-dark shadow-[0_10px_28px_-14px_rgba(18,42,35,0.5)]",
  brass: "bg-brass text-white hover:bg-[#a3762f] shadow-[0_10px_28px_-14px_rgba(184,134,59,0.55)]",
  outline: "border border-forest/25 bg-transparent text-forest hover:border-forest hover:bg-forest/[0.04]",
  ghost: "text-forest hover:bg-forest/[0.06]",
  light: "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20",
  danger: "bg-terracotta text-white hover:bg-[#9f4f35]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-1.5 rounded-full px-4 text-[13px] font-semibold",
  md: "h-11 gap-2 rounded-full px-5 text-sm font-semibold",
  lg: "h-13 gap-2.5 rounded-full px-7 text-[15px] font-semibold",
  icon: "size-10 rounded-full",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  className?: string;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  ...props
}: BaseProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "inline-flex select-none items-center justify-center whitespace-nowrap transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className={size === "sm" ? "size-4" : "size-[18px]"} /> : null}
      {children}
      {IconRight ? <IconRight className={size === "sm" ? "size-4" : "size-[18px]"} /> : null}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex select-none items-center justify-center whitespace-nowrap transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className={size === "sm" ? "size-4" : "size-[18px]"} /> : null}
      {children}
      {IconRight ? <IconRight className={size === "sm" ? "size-4" : "size-[18px]"} /> : null}
    </Link>
  );
}
