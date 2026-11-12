import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-4 grid size-14 place-items-center rounded-full bg-sand text-forest">{icon}</div> : null}
      <h3 className="text-xl text-forest">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
