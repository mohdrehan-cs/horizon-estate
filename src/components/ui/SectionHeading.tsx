import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className={cn("eyebrow mb-3 flex items-center gap-2", tone === "light" ? "text-brass-light" : "text-brass")}>
            <span className={cn("h-px w-6", tone === "light" ? "bg-brass-light/60" : "bg-brass/60")} />
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "display-balance text-[clamp(1.8rem,4vw,2.85rem)] leading-[1.1]",
            tone === "light" ? "text-cream" : "text-forest",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-3 max-w-xl text-[15px] leading-relaxed",
              tone === "light" ? "text-cream/70" : "text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
