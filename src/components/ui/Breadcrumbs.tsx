import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-1.5 text-xs text-muted", className)}>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
          {index > 0 ? <ChevronRight className="size-3 text-muted/50" /> : null}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-forest">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-forest">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
