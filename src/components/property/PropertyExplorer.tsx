"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Bookmark,
  Building2,
  Grid3X3,
  Map as MapIcon,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import type { Property } from "@/types";
import { amenityOptions as amenityData, properties } from "@/data/properties";
import { cities, getCity } from "@/data/cities";
import { cn } from "@/lib/utils";
import { PropertyCard } from "./PropertyCard";
import { MapView } from "./MapView";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/providers/ToastProvider";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface Filters {
  listingType: string;
  city: string;
  locality: string;
  type: string;
  bhk: string;
  price: string;
  possession: string;
  furnishing: string;
  minArea: string;
  facing: string;
  authority: string;
  amenities: string[];
  verified: boolean;
  rera: boolean;
  q: string;
  sort: string;
}

const salePriceOptions = [
  { label: "Any budget", value: "" },
  { label: "Under ₹50 L", value: "0-5000000" },
  { label: "₹50 L – ₹1 Cr", value: "5000000-10000000" },
  { label: "₹1 Cr – ₹2 Cr", value: "10000000-20000000" },
  { label: "₹2 Cr – ₹4 Cr", value: "20000000-40000000" },
  { label: "₹4 Cr+", value: "40000000-" },
];

const rentPriceOptions = [
  { label: "Any rent", value: "" },
  { label: "Under ₹20,000", value: "0-20000" },
  { label: "₹20,000 – ₹35,000", value: "20000-35000" },
  { label: "₹35,000 – ₹60,000", value: "35000-60000" },
  { label: "₹60,000+", value: "60000-" },
];

const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Newest first", value: "newest" },
  { label: "Largest area", value: "area" },
];

const bhkChoices = ["1", "2", "3", "4", "5+"];

function priceMatch(property: Property, price: string) {
  if (!price) return true;
  const [minRaw, maxRaw] = price.split("-");
  const min = minRaw ? Number(minRaw) : 0;
  const max = maxRaw ? Number(maxRaw) : Number.POSITIVE_INFINITY;
  return property.price >= min && property.price <= max;
}

export function PropertyExplorer() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [view, setView] = useState<"grid" | "map">("grid");
  const [mobileFilters, setMobileFilters] = useState(false);

  const [filters, setFilters] = useState<Filters>(() => ({
    listingType: searchParams.get("listingType") === "rent" ? "rent" : "sale",
    city: searchParams.get("city") ?? "",
    locality: searchParams.get("locality") ?? "",
    type: searchParams.get("type") ?? "",
    bhk: searchParams.get("bhk") ?? "",
    price: searchParams.get("price") ?? "",
    possession: searchParams.get("possession") ?? "",
    furnishing: searchParams.get("furnishing") ?? "",
    minArea: searchParams.get("minArea") ?? "",
    facing: searchParams.get("facing") ?? "",
    authority: searchParams.get("authority") ?? "",
    amenities: searchParams.get("amenities")?.split(",").filter(Boolean) ?? [],
    verified: searchParams.get("verified") === "1",
    rera: searchParams.get("rera") === "1",
    q: searchParams.get("q") ?? "",
    sort: searchParams.get("sort") ?? "recommended",
  }));

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((current) => {
      const next = { ...current, [key]: value };
      if (key === "city") next.locality = "";
      if (key === "listingType") next.price = "";
      return next;
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.listingType) params.set("listingType", filters.listingType);
    if (filters.city) params.set("city", filters.city);
    if (filters.locality) params.set("locality", filters.locality);
    if (filters.type) params.set("type", filters.type);
    if (filters.bhk) params.set("bhk", filters.bhk);
    if (filters.price) params.set("price", filters.price);
    if (filters.possession) params.set("possession", filters.possession);
    if (filters.furnishing) params.set("furnishing", filters.furnishing);
    if (filters.minArea) params.set("minArea", filters.minArea);
    if (filters.facing) params.set("facing", filters.facing);
    if (filters.authority) params.set("authority", filters.authority);
    if (filters.amenities.length) params.set("amenities", filters.amenities.join(","));
    if (filters.verified) params.set("verified", "1");
    if (filters.rera) params.set("rera", "1");
    if (filters.q) params.set("q", filters.q);
    if (filters.sort !== "recommended") params.set("sort", filters.sort);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `/properties?${query}` : "/properties");
  }, [filters]);

  const localities = filters.city ? getCity(filters.city)?.localities ?? [] : [];

  const results = useMemo(() => {
    const query = filters.q.trim().toLowerCase();
    const filtered = properties.filter((property) => {
      if (property.listingType !== filters.listingType) return false;
      if (filters.city && property.city !== filters.city) return false;
      if (filters.locality && property.locality !== filters.locality) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.possession && property.possession !== filters.possession) return false;
      if (filters.furnishing && property.furnishing !== filters.furnishing) return false;
      if (filters.facing && property.facing !== filters.facing) return false;
      if (filters.authority && property.authority !== filters.authority) return false;
      if (filters.minArea && property.builtupArea < Number(filters.minArea)) return false;
      if (filters.verified && !property.verified) return false;
      if (filters.rera && !property.reraNumber) return false;
      if (!priceMatch(property, filters.price)) return false;
      if (filters.amenities.length && !filters.amenities.every((amenity) => property.amenities.includes(amenity))) {
        return false;
      }
      if (filters.bhk) {
        if (!property.bhk) return false;
        if (filters.bhk === "5+") {
          if (property.bhk < 5) return false;
        } else if (property.bhk !== Number(filters.bhk)) {
          return false;
        }
      }
      if (query) {
        const haystack = [
          property.title,
          property.description,
          property.locality,
          property.address,
          property.type,
          property.city,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        case "area":
          return b.builtupArea - a.builtupArea;
        default:
          return Number(b.featured) - Number(a.featured) || b.views - a.views;
      }
    });
  }, [filters]);

  const activeCount = [
    filters.city,
    filters.locality,
    filters.type,
    filters.bhk,
    filters.price,
    filters.possession,
    filters.furnishing,
    filters.minArea,
    filters.facing,
    filters.authority,
    filters.verified ? "1" : "",
    filters.rera ? "1" : "",
  ].filter(Boolean).length + filters.amenities.length;

  const cityLabel = filters.city ? getCity(filters.city)?.name : "Delhi NCR";

  function reset() {
    setFilters({
      listingType: filters.listingType,
      city: "",
      locality: "",
      type: "",
      bhk: "",
      price: "",
      possession: "",
      furnishing: "",
      minArea: "",
      facing: "",
      authority: "",
      amenities: [],
      verified: false,
      rera: false,
      q: "",
      sort: "recommended",
    });
  }

  const filterPanel = (
    <FilterPanel
      filters={filters}
      localities={localities}
      update={update}
      reset={reset}
      activeCount={activeCount}
    />
  );

  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-line bg-sand/50">
        <div className="container-page py-7">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Properties" }]} />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] leading-tight text-forest">
                Property in {cityLabel}
              </h1>
              <p className="mt-1.5 text-sm text-muted">
                {results.length} verified {filters.listingType === "rent" ? "rentals" : "homes for sale"}
                {filters.locality ? ` in ${filters.locality.replace(/-/g, " ")}` : ""} · updated for the demo
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={Bookmark}
                onClick={() => toast("Search saved. We'll email you new matches — in the live product, of course.")}
              >
                Save search
              </Button>
              <div className="flex rounded-full border border-line bg-white p-1">
                <button
                  onClick={() => setView("grid")}
                  className={cn(
                    "grid size-8 place-items-center rounded-full transition",
                    view === "grid" ? "bg-forest text-cream" : "text-muted hover:text-forest",
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="size-3.5" />
                </button>
                <button
                  onClick={() => setView("map")}
                  className={cn(
                    "grid size-8 place-items-center rounded-full transition",
                    view === "map" ? "bg-forest text-cream" : "text-muted hover:text-forest",
                  )}
                  aria-label="Map view"
                >
                  <MapIcon className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div className="flex rounded-full border border-line bg-white p-1">
              {[
                { label: "Buy", value: "sale" },
                { label: "Rent", value: "rent" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => update("listingType", tab.value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-[11px] font-bold transition",
                    filters.listingType === tab.value ? "bg-forest text-cream" : "text-muted hover:text-forest",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={filters.q}
                onChange={(event) => update("q", event.target.value)}
                placeholder="Search title, sector, locality…"
                className="h-10 w-full rounded-full border border-line bg-white pl-10 pr-4 text-xs text-forest outline-none placeholder:text-muted/60 focus:border-forest/50"
              />
            </div>
            <button
              onClick={() => setMobileFilters(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-[11px] font-bold text-forest lg:hidden"
            >
              <SlidersHorizontal className="size-3.5" />
              Filters
              {activeCount ? (
                <span className="grid size-5 place-items-center rounded-full bg-brass text-[9px] text-white">{activeCount}</span>
              ) : null}
            </button>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden text-[11px] text-muted sm:inline">Sort</span>
              <select
                value={filters.sort}
                onChange={(event) => update("sort", event.target.value)}
                className="h-10 rounded-full border border-line bg-white px-3 text-[11px] font-semibold text-forest outline-none focus:border-forest/50"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="grid gap-8 lg:grid-cols-[268px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-line bg-white p-5">
              {filterPanel}
            </div>
          </aside>

          <div>
            {results.length === 0 ? (
              <EmptyState
                icon={<Search className="size-6" />}
                title="No homes match this combination"
                description="Try widening the price range, removing a locality filter, or searching a nearby sector. Our advisors can also look off-market."
                action={
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button variant="primary" onClick={reset} icon={RotateCcw}>
                      Reset filters
                    </Button>
                    <Button variant="outline" onClick={() => toast("A shortlist brief has been started — demo only.")}>
                      Send a brief
                    </Button>
                  </div>
                }
              />
            ) : view === "map" ? (
              <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
                <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
                  {results.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                <div className="order-1 lg:order-2">
                  <div className="sticky top-24 h-[420px] overflow-hidden rounded-2xl lg:h-[calc(100vh-7rem)]">
                    <MapView properties={results} className="h-full" />
                  </div>
                  <p className="mt-2 text-center text-[10px] text-muted">
                    Prices are demo data. Map pins represent approximate locations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {results.length > 0 ? (
              <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-4 sm:flex-row">
                <p className="text-[11px] text-muted">
                  Showing all {results.length} results. Demo inventory is intentionally limited.
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-forest">
                  <MapPin className="size-3.5 text-brass" /> Need a locality we don&apos;t list? Ask us.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Modal
        open={mobileFilters}
        onClose={() => setMobileFilters(false)}
        title="Filter homes"
        description={`${results.length} results match your current filters.`}
        className="sm:max-w-md"
      >
        {filterPanel}
        <div className="sticky bottom-0 mt-4 bg-cream pt-2">
          <Button className="w-full" onClick={() => setMobileFilters(false)}>
            Show {results.length} homes
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function FilterPanel({
  filters,
  localities,
  update,
  reset,
  activeCount,
}: {
  filters: Filters;
  localities: { slug: string; name: string }[];
  update: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  reset: () => void;
  activeCount: number;
}) {
  const priceOptions = filters.listingType === "rent" ? rentPriceOptions : salePriceOptions;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-forest">
          <SlidersHorizontal className="size-3.5 text-brass" /> Filters
          {activeCount ? (
            <span className="grid size-4 place-items-center rounded-full bg-brass text-[9px] text-white">{activeCount}</span>
          ) : null}
        </p>
        <button onClick={reset} className="flex items-center gap-1 text-[10px] font-semibold text-muted transition hover:text-terracotta">
          <RotateCcw className="size-3" /> Reset
        </button>
      </div>

      <FilterBlock label="City">
        <select
          value={filters.city}
          onChange={(event) => update("city", event.target.value)}
          className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city.slug} value={city.slug}>
              {city.name}
            </option>
          ))}
        </select>
      </FilterBlock>

      {filters.city ? (
        <FilterBlock label="Locality">
          <select
            value={filters.locality}
            onChange={(event) => update("locality", event.target.value)}
            className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
          >
            <option value="">All localities</option>
            {localities.map((locality) => (
              <option key={locality.slug} value={locality.slug}>
                {locality.name}
              </option>
            ))}
          </select>
        </FilterBlock>
      ) : null}

      <FilterBlock label="Property type">
        <select
          value={filters.type}
          onChange={(event) => update("type", event.target.value)}
          className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">Any type</option>
          {["Apartment", "Builder Floor", "Villa", "Independent House", "Plot", "Commercial"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FilterBlock>

      <FilterBlock label="Bedrooms">
        <div className="flex flex-wrap gap-1.5">
          {bhkChoices.map((choice) => (
            <button
              key={choice}
              onClick={() => update("bhk", filters.bhk === choice ? "" : choice)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11px] font-semibold transition",
                filters.bhk === choice
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-cream text-muted hover:border-forest/40 hover:text-forest",
              )}
            >
              {choice} BHK
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock label={filters.listingType === "rent" ? "Monthly rent" : "Budget"}>
        <select
          value={filters.price}
          onChange={(event) => update("price", event.target.value)}
          className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
        >
          {priceOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FilterBlock>

      <FilterBlock label="Possession">
        <select
          value={filters.possession}
          onChange={(event) => update("possession", event.target.value)}
          className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">Any possession</option>
          <option>Ready to move</option>
          <option>Under construction</option>
          <option>New launch</option>
        </select>
      </FilterBlock>

      <FilterBlock label="Furnishing">
        <select
          value={filters.furnishing}
          onChange={(event) => update("furnishing", event.target.value)}
          className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">Any furnishing</option>
          <option>Unfurnished</option>
          <option>Semi-furnished</option>
          <option>Fully furnished</option>
        </select>
      </FilterBlock>

      <FilterBlock label="Minimum built-up area">
        <select
          value={filters.minArea}
          onChange={(event) => update("minArea", event.target.value)}
          className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">Any size</option>
          <option value="800">800+ sq ft</option>
          <option value="1200">1,200+ sq ft</option>
          <option value="1600">1,600+ sq ft</option>
          <option value="2200">2,200+ sq ft</option>
          <option value="3000">3,000+ sq ft</option>
        </select>
      </FilterBlock>

      <FilterBlock label="Facing">
        <select
          value={filters.facing}
          onChange={(event) => update("facing", event.target.value)}
          className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">Any facing</option>
          {["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"].map((facing) => (
            <option key={facing} value={facing}>
              {facing}
            </option>
          ))}
        </select>
      </FilterBlock>

      <FilterBlock label="Authority">
        <select
          value={filters.authority}
          onChange={(event) => update("authority", event.target.value)}
          className="h-10 w-full rounded-lg border border-line bg-cream px-3 text-xs font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">Any authority</option>
          {["DDA", "CGHS", "MCD", "Noida Authority", "Greater Noida Authority", "YEIDA", "Private"].map((authority) => (
            <option key={authority} value={authority}>
              {authority}
            </option>
          ))}
        </select>
      </FilterBlock>

      <FilterBlock label="Trust markers">
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-[11px] text-forest">
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={(event) => update("verified", event.target.checked)}
              className="size-3.5 rounded border-line accent-forest"
            />
            Verified listings only
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[11px] text-forest">
            <input
              type="checkbox"
              checked={filters.rera}
              onChange={(event) => update("rera", event.target.checked)}
              className="size-3.5 rounded border-line accent-forest"
            />
            RERA registered only
          </label>
        </div>
      </FilterBlock>

      <FilterBlock label="Amenities">
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          {amenityData.slice(0, 10).map((amenity) => (
            <label key={amenity} className="flex cursor-pointer items-start gap-1.5 text-[10px] leading-tight text-forest">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={(event) =>
                  update(
                    "amenities",
                    event.target.checked
                      ? [...filters.amenities, amenity]
                      : filters.amenities.filter((item) => item !== amenity),
                  )
                }
                className="mt-0.5 size-3 shrink-0 rounded border-line accent-forest"
              />
              {amenity}
            </label>
          ))}
        </div>
      </FilterBlock>

      <div className="rounded-xl bg-sand/70 p-3">
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-forest">
          <Building2 className="size-3.5 text-brass" /> Need a hand?
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-muted">
          Our advisors can add off-market inventory and shortlist three areas for your commute.
        </p>
        <a href="/contact" className="mt-2 inline-block text-[10px] font-bold text-brass">
          Request a shortlist →
        </a>
      </div>
    </div>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold text-forest">{label}</p>
      {children}
    </div>
  );
}
