"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Building2, Search } from "lucide-react";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

const saleBudgets = [
  { label: "Any budget", value: "" },
  { label: "Under ₹50 L", value: "0-5000000" },
  { label: "₹50 L – ₹1 Cr", value: "5000000-10000000" },
  { label: "₹1 Cr – ₹2 Cr", value: "10000000-20000000" },
  { label: "₹2 Cr – ₹4 Cr", value: "20000000-40000000" },
  { label: "₹4 Cr+", value: "40000000-" },
];

const rentBudgets = [
  { label: "Any rent", value: "" },
  { label: "Under ₹20,000", value: "0-20000" },
  { label: "₹20,000 – ₹35,000", value: "20000-35000" },
  { label: "₹35,000 – ₹60,000", value: "35000-60000" },
  { label: "₹60,000+", value: "60000-" },
];

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [listingType, setListingType] = useState<"sale" | "rent">("sale");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [query, setQuery] = useState("");

  const budgets = listingType === "sale" ? saleBudgets : rentBudgets;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("listingType", listingType);
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (budget) params.set("price", budget);
    if (query.trim()) params.set("q", query.trim());
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        "rounded-3xl border border-white/30 bg-cream/97 p-2 shadow-[0_30px_80px_-30px_rgba(10,25,20,0.55)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-1 px-2 pt-1.5">
        {(["sale", "rent"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setListingType(tab);
              setBudget("");
            }}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-bold transition",
              listingType === tab ? "bg-forest text-cream" : "text-muted hover:text-forest",
            )}
          >
            {tab === "sale" ? "Buy" : "Rent"}
          </button>
        ))}
        <span className="ml-auto hidden items-center gap-1.5 pr-2 text-[10px] font-semibold text-muted sm:flex">
          <Building2 className="size-3.5" /> 24 verified listings
        </span>
      </div>

      <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_0.9fr_1.4fr_auto]">
        <select
          value={city}
          onChange={(event) => setCity(event.target.value)}
          aria-label="City"
          className="h-12 rounded-2xl border border-line bg-white px-3.5 text-sm font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">All cities</option>
          {cities.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          aria-label="Property type"
          className="h-12 rounded-2xl border border-line bg-white px-3.5 text-sm font-medium text-forest outline-none focus:border-forest/50"
        >
          <option value="">All property types</option>
          {["Apartment", "Builder Floor", "Villa", "Independent House", "Plot", "Commercial"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          aria-label="Budget"
          className="h-12 rounded-2xl border border-line bg-white px-3.5 text-sm font-medium text-forest outline-none focus:border-forest/50"
        >
          {budgets.map((item) => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Locality, sector or project"
          aria-label="Search by locality or project"
          className="h-12 rounded-2xl border border-line bg-white px-3.5 text-sm text-forest outline-none placeholder:text-muted/60 focus:border-forest/50"
        />

        <button
          type="submit"
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-brass px-6 text-sm font-bold text-white transition hover:bg-[#a3762f] active:scale-[0.98] lg:px-5"
        >
          <Search className="size-4" />
          <span className="lg:hidden">Search properties</span>
        </button>
      </div>
    </form>
  );
}
