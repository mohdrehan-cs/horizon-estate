"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, Plus, X } from "lucide-react";
import { properties } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { getCityName, getLocalityName } from "@/data/cities";
import { formatArea, formatINR, formatPropertyPrice, pricePerSqft } from "@/lib/format";
import { useCompare } from "@/components/providers/CompareProvider";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const { compare, removeCompare, clearCompare, toggleCompare, isFull } = useCompare();
  const selected = compare.flatMap((slug) => {
    const property = properties.find((item) => item.slug === slug);
    return property ? [property] : [];
  });
  const available = properties.filter((property) => !compare.includes(property.slug)).slice(0, 6);

  const rows: { label: string; render: (property: (typeof properties)[number]) => React.ReactNode }[] = [
    { label: "Price", render: (p) => <span className="font-bold text-forest">{formatPropertyPrice(p)}</span> },
    { label: "Price per sq ft", render: (p) => (pricePerSqft(p) ? `₹${pricePerSqft(p).toLocaleString("en-IN")}` : "—") },
    { label: "Listing type", render: (p) => (p.listingType === "rent" ? "Rent" : "Sale") },
    { label: "Property type", render: (p) => p.type },
    { label: "Locality", render: (p) => `${getLocalityName(p.city, p.locality)}, ${getCityName(p.city)}` },
    { label: "Bedrooms", render: (p) => (p.bhk ? `${p.bhk} BHK` : "—") },
    { label: "Bathrooms", render: (p) => p.bathrooms || "—" },
    { label: "Built-up area", render: (p) => formatArea(p.builtupArea, p.areaUnit) },
    { label: "Carpet area", render: (p) => (p.carpetArea ? formatArea(p.carpetArea, p.areaUnit) : "—") },
    { label: "Furnishing", render: (p) => p.furnishing },
    { label: "Possession", render: (p) => p.possession },
    { label: "Floor", render: (p) => (p.floor !== undefined ? `${p.floor === 0 ? "Ground" : p.floor}${p.totalFloors ? ` / ${p.totalFloors}` : ""}` : "—") },
    { label: "Facing", render: (p) => p.facing ?? "—" },
    { label: "Age", render: (p) => p.age ?? "—" },
    { label: "Ownership", render: (p) => p.ownership },
    { label: "Authority", render: (p) => p.authority ?? "—" },
    { label: "RERA", render: (p) => (p.reraNumber ? <span className="font-mono text-[10px]">{p.reraNumber}</span> : "—") },
    { label: "Metro", render: (p) => `${p.metro.station} · ${p.metro.distance}` },
    { label: "Amenities", render: (p) => `${p.amenities.length} listed` },
    { label: "Advisor", render: (p) => getAgent(p.agentId)?.name ?? "Horizon team" },
  ];

  return (
    <div className="min-h-[70vh] bg-cream pb-20">
      <div className="border-b border-line bg-sand/50">
        <div className="container-page py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-brass">Side by side</p>
              <h1 className="mt-2 text-[clamp(2rem,4vw,2.8rem)] leading-tight text-forest">Compare homes</h1>
              <p className="mt-1.5 text-sm text-muted">
                {selected.length
                  ? `${selected.length} of 4 homes selected. Compare price, area, possession and paperwork.`
                  : "Select up to four homes from any listing card to compare them here."}
              </p>
            </div>
            {selected.length ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearCompare}>
                  Clear all
                </Button>
                <ButtonLink href="/properties" size="sm" iconRight={ArrowRight}>
                  Add more homes
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        {selected.length === 0 ? (
          <EmptyState
            icon={<GitCompareArrows className="size-6" />}
            title="Your comparison is empty"
            description="Open any property and tap Compare, or add one of these featured homes to get started."
            action={
              <ButtonLink href="/properties" iconRight={ArrowRight}>
                Browse all homes
              </ButtonLink>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-[150px] border-b border-line bg-sand/50 p-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Home
                    </th>
                    {selected.map((property) => (
                      <th key={property.id} className="border-b border-l border-line p-3 align-top">
                        <div className="relative overflow-hidden rounded-xl">
                          <div className="relative aspect-[16/10] bg-sand">
                            <Image src={property.images[0]} alt={property.title} fill sizes="220px" className="object-cover" />
                          </div>
                          <button
                            onClick={() => removeCompare(property.slug)}
                            aria-label={`Remove ${property.title}`}
                            className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-white/90 text-forest shadow-sm transition hover:bg-terracotta hover:text-white"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                        <Link href={`/properties/${property.slug}`} className="mt-2 line-clamp-2 block text-[11px] font-bold leading-snug text-forest hover:text-brass">
                          {property.title}
                        </Link>
                        <p className="mt-1 text-[10px] text-muted">
                          {getLocalityName(property.city, property.locality)}, {getCityName(property.city)}
                        </p>
                      </th>
                    ))}
                    {selected.length < 4 ? (
                      <th className="w-[180px] border-b border-l border-line bg-sand/30 p-4 align-middle">
                        <Link
                          href="/properties"
                          className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line bg-white/70 px-3 py-8 text-center transition hover:border-forest/30"
                        >
                          <span className="grid size-9 place-items-center rounded-full bg-sand text-forest">
                            <Plus className="size-4" />
                          </span>
                          <span className="text-[10px] font-bold text-forest">Add another home</span>
                          <span className="text-[9px] text-muted">{4 - selected.length} slot{selected.length === 3 ? "" : "s"} left</span>
                        </Link>
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={row.label} className={rowIndex % 2 ? "bg-cream/50" : undefined}>
                      <td className="border-b border-line p-3.5 align-top text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">
                        {row.label}
                      </td>
                      {selected.map((property) => (
                        <td key={property.id} className="border-b border-l border-line p-3.5 align-top text-[11px] text-forest/85">
                          {row.render(property)}
                        </td>
                      ))}
                      {selected.length < 4 ? <td className="border-b border-l border-line" /> : null}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-3.5" />
                    {selected.map((property) => (
                      <td key={property.id} className="border-l border-line p-3.5">
                        <ButtonLink href={`/properties/${property.slug}`} size="sm" variant="outline" className="w-full">
                          View home
                        </ButtonLink>
                      </td>
                    ))}
                    {selected.length < 4 ? <td className="border-l border-line" /> : null}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="sand">Tip</Badge>
              <p className="text-[11px] text-muted">
                Compare carpet area, not built-up. Two homes with the same built-up number can differ by 150–250 sq ft of usable space.
              </p>
            </div>
          </>
        )}

        <section className="mt-14">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-brass">Quick add</p>
              <h2 className="mt-2 text-xl text-forest">Popular homes to compare</h2>
            </div>
            <Link href="/properties" className="flex items-center gap-1 text-[11px] font-bold text-forest hover:text-brass">
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((property) => (
              <div key={property.id} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image src={property.images[0]} alt={property.title} fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-forest">{property.title}</p>
                  <p className="text-[10px] text-muted">
                    {formatINR(property.price)} · {property.bhk ? `${property.bhk} BHK` : property.type}
                  </p>
                </div>
                <button
                  onClick={() => toggleCompare(property.slug, property.title)}
                  disabled={isFull}
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border border-line text-forest transition hover:border-forest hover:bg-forest hover:text-cream",
                    isFull && "cursor-not-allowed opacity-40",
                  )}
                  aria-label={`Add ${property.title} to compare`}
                >
                  <Plus className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
