"use client";

import { GitCompareArrows, Heart, Share2 } from "lucide-react";
import type { Property } from "@/types";
import { useSaved } from "@/components/providers/SavedProvider";
import { useCompare } from "@/components/providers/CompareProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { cn } from "@/lib/utils";

export function PropertyActions({ property }: { property: Property }) {
  const { isSaved, toggleSaved } = useSaved();
  const { isCompared, toggleCompare } = useCompare();
  const { toast } = useToast();
  const saved = isSaved(property.slug);
  const compared = isCompared(property.slug);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast("Link copied to clipboard.");
      }
    } catch {
      toast("Sharing was cancelled.", "info");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => toggleSaved(property.slug, property.title)}
        className={cn(
          "flex h-10 items-center gap-2 rounded-full border px-3.5 text-[11px] font-bold transition",
          saved
            ? "border-terracotta bg-terracotta text-white"
            : "border-line bg-white text-forest hover:border-forest/40",
        )}
      >
        <Heart className={cn("size-4", saved && "fill-current")} /> {saved ? "Saved" : "Save"}
      </button>
      <button
        onClick={() => toggleCompare(property.slug, property.title)}
        className={cn(
          "flex h-10 items-center gap-2 rounded-full border px-3.5 text-[11px] font-bold transition",
          compared ? "border-forest bg-forest text-cream" : "border-line bg-white text-forest hover:border-forest/40",
        )}
      >
        <GitCompareArrows className="size-4" /> {compared ? "Added" : "Compare"}
      </button>
      <button
        onClick={share}
        aria-label="Share property"
        className="grid size-10 place-items-center rounded-full border border-line bg-white text-forest transition hover:border-forest/40"
      >
        <Share2 className="size-4" />
      </button>
    </div>
  );
}
