import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "forest" | "brass" | "sand" | "white" | "outline" | "success" | "terracotta";

const variants: Record<Variant, string> = {
  forest: "bg-forest text-cream",
  brass: "bg-brass/15 text-[#7a5720] border border-brass/25",
  sand: "bg-sand text-forest border border-line",
  white: "bg-white/95 text-forest backdrop-blur border border-white/60",
  outline: "border border-forest/20 text-forest",
  success: "bg-[#e6efe4] text-[#2f5a3c] border border-[#c6dbc2]",
  terracotta: "bg-terracotta/12 text-terracotta border border-terracotta/25",
};

export function Badge({
  children,
  variant = "sand",
  className,
  dot,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none tracking-wide",
        variants[variant],
        className,
      )}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
