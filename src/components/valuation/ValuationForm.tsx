"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MapPin, Sparkles } from "lucide-react";
import { cities, getCity } from "@/data/cities";
import { formatINR, formatINRFull } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Label, Select } from "@/components/ui/Field";
import { useToast } from "@/components/providers/ToastProvider";

const typeMultiplier: Record<string, number> = {
  Apartment: 1,
  "Builder Floor": 1.06,
  Villa: 1.28,
  "Independent House": 1.2,
  Plot: 0.88,
  Commercial: 1.3,
};

const conditionMultiplier: Record<string, number> = {
  Excellent: 1.08,
  Good: 1,
  "Needs work": 0.87,
};

function parseRate(avgPrice: string) {
  const digits = avgPrice.replace(/[^\d]/g, "");
  return Number(digits) || 7000;
}

export function ValuationForm() {
  const { toast } = useToast();
  const [citySlug, setCitySlug] = useState("noida");
  const [localitySlug, setLocalitySlug] = useState("sector-150");
  const [type, setType] = useState("Apartment");
  const [bhk, setBhk] = useState("3");
  const [area, setArea] = useState(1750);
  const [age, setAge] = useState(5);
  const [condition, setCondition] = useState("Good");
  const [floor, setFloor] = useState("Middle floor");
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const city = getCity(citySlug) ?? cities[0];
  const locality = city.localities.find((item) => item.slug === localitySlug) ?? city.localities[0];
  const baseRate = parseRate(locality.avgPrice);

  const estimate = useMemo(() => {
    const floorFactor = floor === "Ground floor" ? 0.98 : floor === "Top floor" ? 1.01 : 1;
    const value = baseRate * area * (typeMultiplier[type] ?? 1) * (conditionMultiplier[condition] ?? 1) * Math.max(0.72, 1 - age * 0.012) * floorFactor;
    return {
      low: Math.round((value * 0.94) / 100000) * 100000,
      high: Math.round((value * 1.06) / 100000) * 100000,
      mid: Math.round(value / 100000) * 100000,
      rate: Math.round(value / area),
    };
  }, [baseRate, area, type, condition, age, floor]);

  function onCityChange(value: string) {
    setCitySlug(value);
    const next = getCity(value);
    setLocalitySlug(next?.localities[0]?.slug ?? "");
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) nextErrors.phone = "Enter a valid phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast("Valuation request received. This is a demo — no report will be emailed.");
    }, 1200);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
      <div className="rounded-3xl border border-line bg-white p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl text-forest">Tell us about the property</h2>
            <p className="mt-1 text-[11px] text-muted">The estimate updates as you adjust the details.</p>
          </div>
          <Badge variant="sand">Free demo tool</Badge>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Select
            id="valuation-city"
            label="City"
            value={citySlug}
            onChange={(event) => onCityChange(event.target.value)}
          >
            {cities.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
          <Select
            id="valuation-locality"
            label="Locality"
            value={localitySlug}
            onChange={(event) => setLocalitySlug(event.target.value)}
          >
            {city.localities.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
          <Select id="valuation-type" label="Property type" value={type} onChange={(event) => setType(event.target.value)}>
            {Object.keys(typeMultiplier).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select id="valuation-bhk" label="Configuration" value={bhk} onChange={(event) => setBhk(event.target.value)}>
            {["1", "2", "3", "4", "5+"].map((item) => (
              <option key={item} value={item}>
                {item} BHK
              </option>
            ))}
          </Select>
          <div>
            <Label htmlFor="valuation-area">Built-up area (sq ft)</Label>
            <input
              id="valuation-area"
              type="number"
              min={200}
              step={50}
              value={area}
              onChange={(event) => setArea(Math.max(0, Number(event.target.value)))}
              className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink outline-none transition focus:border-forest/60 focus:ring-4 focus:ring-forest/5"
            />
          </div>
          <div>
            <Label htmlFor="valuation-age">Age of property (years)</Label>
            <input
              id="valuation-age"
              type="number"
              min={0}
              max={50}
              value={age}
              onChange={(event) => setAge(Math.max(0, Number(event.target.value)))}
              className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink outline-none transition focus:border-forest/60 focus:ring-4 focus:ring-forest/5"
            />
          </div>
          <Select id="valuation-condition" label="Condition" value={condition} onChange={(event) => setCondition(event.target.value)}>
            {Object.keys(conditionMultiplier).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select id="valuation-floor" label="Floor" value={floor} onChange={(event) => setFloor(event.target.value)}>
            <option>Ground floor</option>
            <option>Middle floor</option>
            <option>Top floor</option>
          </Select>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-xl bg-sand/60 p-3.5">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-brass" />
          <p className="text-[10px] leading-relaxed text-muted">
            Using an indicative locality rate of <span className="font-semibold text-forest">{locality.avgPrice}</span>{" "}
            for {locality.name}, {city.name}. Actual valuations depend on exact location, view, floor rise, parking and
            maintenance.
          </p>
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl bg-forest text-cream">
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brass-light">
              <Sparkles className="size-3.5" /> Estimated value range
            </p>
          </div>
          <div className="px-5 py-6 sm:px-6">
            <p className="font-serif text-[clamp(2.2rem,5vw,3.2rem)] leading-none text-cream">
              {formatINR(estimate.low)}
              <span className="mx-2 text-brass-light">–</span>
              {formatINR(estimate.high)}
            </p>
            <p className="mt-2 text-[11px] text-cream/50">
              Indicative market range · roughly {formatINRFull(estimate.rate)} per sq ft
            </p>

            <div className="mt-5 space-y-2.5 text-[11px]">
              <div className="flex justify-between gap-3">
                <span className="text-cream/50">Mid-point estimate</span>
                <span className="font-semibold text-cream">{formatINR(estimate.mid)}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-cream/50">Built-up area</span>
                <span className="font-semibold text-cream">{area.toLocaleString("en-IN")} sq ft</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-cream/50">Configuration</span>
                <span className="font-semibold text-cream">
                  {bhk} BHK {type}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-cream/50">Locality</span>
                <span className="font-semibold text-cream">
                  {locality.name}, {city.name}
                </span>
              </div>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-brass-light" />
            </div>
            <p className="mt-2 text-[9px] leading-relaxed text-cream/35">
              A demo estimate generated from locality averages. Not a formal valuation or an offer to purchase.
            </p>
          </div>
        </div>

        {!unlocked ? (
          <button
            onClick={() => setUnlocked(true)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-left transition hover:border-forest/30"
          >
            <span>
              <span className="block text-[12px] font-bold text-forest">Unlock the detailed report</span>
              <span className="block text-[10px] text-muted">Comparable sales, pricing strategy and a site visit.</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-brass" />
          </button>
        ) : submitted ? (
          <div className="rounded-2xl border border-[#c6dbc2] bg-[#eef5ec] p-5 text-center">
            <CheckCircle2 className="mx-auto size-8 text-[#2f5a3c]" />
            <p className="mt-2 text-sm font-bold text-forest">Request received</p>
            <p className="mt-1 text-[10px] leading-relaxed text-muted">
              This is a demo. In the live product, a valuation specialist would call within one working day and email a
              comparable-sales report.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-5">
            <p className="text-[12px] font-bold text-forest">Get the detailed report</p>
            <p className="mt-1 text-[10px] text-muted">A specialist will call to verify the details.</p>
            <div className="mt-3 space-y-3">
              <Input id="valuation-name" name="name" label="Full name" placeholder="Your name" />
              <Input id="valuation-phone" name="phone" label="Phone / WhatsApp" placeholder="+91 98XXX XXXXX" type="tel" />
              <Input id="valuation-email" name="email" label="Email (optional)" placeholder="you@example.com" type="email" />
              {Object.keys(errors).length ? (
                <p className="text-[10px] font-medium text-terracotta">{Object.values(errors)[0]}</p>
              ) : null}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
                {submitting ? "Sending request…" : "Request my valuation"}
              </Button>
              <p className="text-center text-[9px] leading-relaxed text-muted">Demo form. No data is stored.</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
