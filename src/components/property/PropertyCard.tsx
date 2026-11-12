"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Heart, MapPin, ScanLine, SquareStack } from "lucide-react";
import type { Property } from "@/types";
import { formatArea, formatPropertyPrice, pricePerSqft } from "@/lib/format";
import { getAgent } from "@/data/agents";
import { getCityName } from "@/data/cities";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useSaved } from "@/components/providers/SavedProvider";
import { useCompare } from "@/components/providers/CompareProvider";

export function PropertyCard({ property, className }: { property: Property; className?: string }) {
  const { isSaved, toggleSaved } = useSaved();
  const { isCompared, toggleCompare } = useCompare();
  const agent = getAgent(property.agentId);
  const saved = isSaved(property.slug);
  const compared = isCompared(property.slug);
  const psf = pricePerSqft(property);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-0.5 hover:border-forest/20 hover:shadow-card",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Link href={`/properties/${property.slug}`} aria-label={property.title}>
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/35 via-transparent to-transparent" />
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="white">{property.listingType === "rent" ? "For Rent" : "For Sale"}</Badge>
            {property.verified ? <Badge variant="success">Verified</Badge> : null}
            {property.isNew ? <Badge variant="brass">New</Badge> : null}
          </div>
          <button
            onClick={() => toggleSaved(property.slug, property.title)}
            aria-label={saved ? "Remove from saved" : "Save property"}
            className={cn(
              "pointer-events-auto grid size-9 place-items-center rounded-full border border-white/70 bg-white/95 text-forest shadow-sm backdrop-blur transition hover:scale-105",
              saved && "bg-terracotta text-white",
            )}
          >
            <Heart className={cn("size-4", saved && "fill-current")} />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <p className="rounded-full bg-forest-dark/80 px-3 py-1.5 text-[13px] font-extrabold text-white backdrop-blur">
            {formatPropertyPrice(property)}
          </p>
          {psf > 0 ? (
            <p className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-forest backdrop-blur">
              ₹{psf.toLocaleString("en-IN")}/sq ft
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brass">
          <span>{property.type}</span>
          {property.reraNumber ? (
            <>
              <span className="size-1 rounded-full bg-brass/50" />
              <span>RERA</span>
            </>
          ) : null}
        </div>

        <h3 className="mt-1.5 line-clamp-2 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-forest">
          <Link href={`/properties/${property.slug}`} className="transition hover:text-brass">
            {property.title}
          </Link>
        </h3>

        <p className="mt-1.5 flex items-center gap-1 text-xs text-muted">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">
            {property.address.split(",")[0]}, {getCityName(property.city)}
          </span>
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line/80 py-3 text-[12px] text-forest/80">
          {property.bhk ? (
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-4 text-muted" />
              {property.bhk} BHK
            </span>
          ) : null}
          {property.bathrooms > 0 ? (
            <span className="flex items-center gap-1.5">
              <Bath className="size-4 text-muted" />
              {property.bathrooms} Bath
            </span>
          ) : null}
          <span className="flex items-center gap-1.5">
            {property.type === "Plot" ? <SquareStack className="size-4 text-muted" /> : <ScanLine className="size-4 text-muted" />}
            {formatArea(property.builtupArea, property.areaUnit)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          {agent ? (
            <div className="flex min-w-0 items-center gap-2">
              <Image
                src={agent.avatar}
                alt={agent.name}
                width={28}
                height={28}
                className="size-7 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-forest">{agent.name}</p>
                <p className="truncate text-[10px] text-muted">{agent.agency}</p>
              </div>
            </div>
          ) : (
            <span />
          )}
          <button
            onClick={() => toggleCompare(property.slug, property.title)}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1.5 text-[10px] font-bold transition",
              compared
                ? "border-forest bg-forest text-cream"
                : "border-line bg-cream text-muted hover:border-forest/40 hover:text-forest",
            )}
            aria-label={compared ? "Remove from compare" : "Add to compare"}
          >
            <ScanLine className="size-3" />
            {compared ? "Added" : "Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}
