"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calculator,
  IndianRupee,
  Info,
  Landmark,
  Ruler,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { calculateEmi } from "@/lib/emi";
import { calculateStampDuty, stampDutyLabel, type BuyerType, type StampDutyState } from "@/lib/stamp-duty";
import { formatINR, formatINRFull, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

type Tab = "emi" | "stamp" | "area";

const tabs: { id: Tab; label: string; icon: typeof Calculator }[] = [
  { id: "emi", label: "EMI calculator", icon: Calculator },
  { id: "stamp", label: "Stamp duty", icon: Landmark },
  { id: "area", label: "Area converter", icon: Ruler },
];

export function CalculatorTabs() {
  const [tab, setTab] = useState<Tab>("emi");

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex w-full max-w-2xl gap-1 rounded-full border border-line bg-white p-1.5 shadow-sm sm:w-auto">
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[11px] font-bold transition sm:px-5",
                  tab === item.id ? "bg-forest text-cream shadow-sm" : "text-muted hover:bg-sand/70 hover:text-forest",
                )}
              >
                <Icon className="size-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        {tab === "emi" ? <EmiCalculator /> : null}
        {tab === "stamp" ? <StampDutyCalculator /> : null}
        {tab === "area" ? <AreaConverter /> : null}
      </div>
    </div>
  );
}

function EmiCalculator() {
  const [value, setValue] = useState(25000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const downPayment = Math.round((value * downPct) / 100);
  const principal = value - downPayment;
  const result = useMemo(() => calculateEmi(principal, rate, years), [principal, rate, years]);

  const circumference = 2 * Math.PI * 52;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-3xl border border-line bg-white p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl text-forest">Loan details</h2>
            <p className="mt-1 text-[11px] text-muted">Adjust the sliders to see how each input moves the EMI.</p>
          </div>
          <Badge2>Indicative</Badge2>
        </div>

        <div className="mt-6 space-y-6">
          <SliderRow
            id="calc-value"
            label="Property value"
            value={value}
            display={formatINR(value)}
            min={2500000}
            max={100000000}
            step={500000}
            onChange={setValue}
            hint={`${formatINRFull(value)}`}
          />

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="calc-down" className="text-[11px] font-semibold text-forest">
                Down payment
              </label>
              <span className="text-[11px] font-bold text-forest">
                {downPct}% · {formatINR(downPayment)}
              </span>
            </div>
            <input
              id="calc-down"
              type="range"
              min={5}
              max={60}
              step={5}
              value={downPct}
              onChange={(event) => setDownPct(Number(event.target.value))}
              className="w-full accent-forest"
            />
            <div className="mt-1 flex justify-between text-[9px] text-muted">
              <span>5%</span>
              <span>60%</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="calc-rate" className="mb-2 block text-[11px] font-semibold text-forest">
                Interest rate
              </label>
              <select
                id="calc-rate"
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                className="h-11 w-full rounded-xl border border-line bg-cream px-3 text-[12px] font-semibold text-forest outline-none focus:border-forest/50"
              >
                {[7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.5, 10].map((item) => (
                  <option key={item} value={item}>
                    {item}% p.a.
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="calc-years" className="mb-2 block text-[11px] font-semibold text-forest">
                Loan tenure
              </label>
              <select
                id="calc-years"
                value={years}
                onChange={(event) => setYears(Number(event.target.value))}
                className="h-11 w-full rounded-xl border border-line bg-cream px-3 text-[12px] font-semibold text-forest outline-none focus:border-forest/50"
              >
                {[5, 10, 15, 20, 25, 30].map((item) => (
                  <option key={item} value={item}>
                    {item} years
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-sand/60 p-4">
          <p className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
            <Info className="mt-0.5 size-3.5 shrink-0 text-brass" />
            EMI is calculated on a reducing balance. Actual offers depend on lender policy, credit score and property
            approval. This tool is for planning, not a loan offer.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-forest p-5 text-cream sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass-light">Your estimated EMI</p>
        <p className="mt-2 font-serif text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-cream">
          {formatINRFull(result.emi)}
        </p>
        <p className="mt-1 text-[11px] text-cream/50">per month · {years} years</p>

        <div className="mt-6 flex items-center gap-5">
          <div className="relative size-32 shrink-0">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#d9b26b"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(result.principalShare / 100) * circumference} ${circumference}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[9px] uppercase tracking-wider text-cream/40">Principal</span>
              <span className="text-lg font-extrabold text-cream">{Math.round(result.principalShare)}%</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-cream/40">Loan amount</p>
              <p className="text-sm font-bold text-cream">{formatINR(principal)}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-cream/40">Total interest</p>
              <p className="text-sm font-bold text-brass-light">{formatINR(result.totalInterest)}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-cream/40">Total payment</p>
              <p className="text-sm font-bold text-cream">{formatINR(result.totalPayment)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-[11px]">
          <div className="flex justify-between gap-3">
            <span className="text-cream/50">Down payment</span>
            <span className="font-semibold text-cream">{formatINR(downPayment)}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-cream/50">Interest rate</span>
            <span className="font-semibold text-cream">{rate}% p.a.</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-cream/50">Total interest share</span>
            <span className="font-semibold text-cream">{Math.round(result.interestShare)}%</span>
          </div>
        </div>

        <ButtonLink
          href={`/properties?listingType=sale&price=0-${value}`}
          variant="brass"
          className="mt-5 w-full"
          iconRight={ArrowRight}
        >
          Homes within this budget
        </ButtonLink>
      </div>
    </div>
  );
}

function StampDutyCalculator() {
  const [state, setState] = useState<StampDutyState>("delhi");
  const [buyer, setBuyer] = useState<BuyerType>("male");
  const [value, setValue] = useState(15000000);
  const [underConstruction, setUnderConstruction] = useState(false);
  const [affordable, setAffordable] = useState(false);

  const result = calculateStampDuty({ state, buyer, propertyValue: value, underConstruction, affordable });
  const delhi = calculateStampDuty({ state: "delhi", buyer, propertyValue: value, underConstruction, affordable });
  const up = calculateStampDuty({ state: "uttar-pradesh", buyer, propertyValue: value, underConstruction, affordable });

  const rates: Record<BuyerType, number> = state === "delhi" ? { male: 6, female: 4, joint: 5 } : { male: 7, female: 6, joint: 6.5 };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-3xl border border-line bg-white p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl text-forest">Purchase details</h2>
            <p className="mt-1 text-[11px] text-muted">Rates vary by state and buyer registration.</p>
          </div>
          <Badge2>2026 demo rates</Badge2>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-[11px] font-semibold text-forest">State</p>
          <div className="grid grid-cols-2 gap-2">
            {(["delhi", "uttar-pradesh"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setState(item)}
                className={cn(
                  "rounded-xl border px-3 py-3 text-left transition",
                  state === item ? "border-forest bg-forest text-cream" : "border-line bg-cream text-forest hover:border-forest/40",
                )}
              >
                <p className="text-[11px] font-bold">{item === "delhi" ? "Delhi" : "Uttar Pradesh"}</p>
                <p className={cn("mt-0.5 text-[9px]", state === item ? "text-cream/60" : "text-muted")}>
                  {item === "delhi" ? "NCT of Delhi" : "Noida & Greater Noida"}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-[11px] font-semibold text-forest">Buyer registration</p>
          <div className="grid grid-cols-3 gap-2">
            {(["male", "female", "joint"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setBuyer(item)}
                className={cn(
                  "rounded-xl border px-2 py-2.5 text-center transition",
                  buyer === item ? "border-brass bg-brass/10 text-forest" : "border-line bg-cream text-muted hover:border-forest/30",
                )}
              >
                <p className="text-[11px] font-bold capitalize">{item}</p>
                <p className="text-[9px] text-muted">{rates[item]}% stamp duty</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="stamp-value" className="mb-1.5 block text-[11px] font-semibold text-forest">
            Property value
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">₹</span>
            <input
              id="stamp-value"
              type="number"
              min={1000000}
              step={100000}
              value={value}
              onChange={(event) => setValue(Math.max(0, Number(event.target.value)))}
              className="h-11 w-full rounded-xl border border-line bg-cream pl-8 pr-3 text-sm font-semibold text-forest outline-none focus:border-forest/50"
            />
          </div>
          <p className="mt-1 text-[10px] text-muted">Enter the transaction value or circle rate, whichever is higher.</p>
        </div>

        <div className="mt-5 space-y-3">
          <ToggleRow
            label="Under-construction property"
            description="Adds GST at 5% (1% if affordable housing)."
            checked={underConstruction}
            onChange={(checked) => {
              setUnderConstruction(checked);
              if (!checked) setAffordable(false);
            }}
          />
          <ToggleRow
            label="Affordable housing"
            description="Applies only to eligible under-construction homes."
            checked={affordable}
            onChange={setAffordable}
            disabled={!underConstruction}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-forest p-5 text-cream sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass-light">Estimated total</p>
        <p className="mt-2 font-serif text-[clamp(2.2rem,4.6vw,3.1rem)] leading-none text-cream">{formatINRFull(result.total)}</p>
        <p className="mt-1 text-[11px] text-cream/50">
          {stampDutyLabel(state)} · {buyer} buyer · effective {result.effectiveRate.toFixed(2)}%
        </p>

        <div className="mt-6 space-y-3 border-y border-white/10 py-4 text-[11px]">
          <div className="flex justify-between gap-3">
            <span className="text-cream/50">Stamp duty ({result.stampDutyRate}%)</span>
            <span className="font-semibold text-cream">{formatINRFull(result.stampDuty)}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-cream/50">Registration ({result.registrationRate}%)</span>
            <span className="font-semibold text-cream">{formatINRFull(result.registration)}</span>
          </div>
          {result.gst > 0 ? (
            <div className="flex justify-between gap-3">
              <span className="text-cream/50">GST ({result.gstRate}%)</span>
              <span className="font-semibold text-cream">{formatINRFull(result.gst)}</span>
            </div>
          ) : null}
          {result.pastingFee > 0 ? (
            <div className="flex justify-between gap-3">
              <span className="text-cream/50">Pasting fee</span>
              <span className="font-semibold text-cream">₹100</span>
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brass-light">Delhi vs UP</p>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-[1fr_auto] border-b border-white/10 px-3 py-2 text-[10px]">
              <span className="text-cream/60">Delhi total</span>
              <span className="font-bold text-cream">{formatINR(delhi.total)}</span>
            </div>
            <div className="grid grid-cols-[1fr_auto] px-3 py-2 text-[10px]">
              <span className="text-cream/60">Uttar Pradesh total</span>
              <span className="font-bold text-cream">{formatINR(up.total)}</span>
            </div>
          </div>
          <p className="mt-2 text-[9px] leading-relaxed text-cream/40">
            Difference of roughly {formatINR(Math.abs(up.total - delhi.total))} on this transaction. Verify current
            rates with the sub-registrar before closing.
          </p>
        </div>

        <div className="mt-5 rounded-xl bg-white/[0.07] p-3">
          <p className="flex items-start gap-2 text-[9px] leading-relaxed text-cream/55">
            <Info className="mt-0.5 size-3 shrink-0 text-brass-light" />
            Delhi includes a ₹100 pasting fee. UP registration is 1%. GST applies to under-construction homes only;
            ready-to-move resale is outside GST.
          </p>
        </div>
      </div>
    </div>
  );
}

const areaUnits = [
  { id: "sqft", label: "Square feet", factor: 1 },
  { id: "sqyd", label: "Square yards", factor: 9 },
  { id: "sqm", label: "Square metres", factor: 10.7639 },
  { id: "acre", label: "Acres", factor: 43560 },
  { id: "hectare", label: "Hectares", factor: 107639.104 },
] as const;

function AreaConverter() {
  const [value, setValue] = useState(1000);
  const [from, setFrom] = useState<(typeof areaUnits)[number]["id"]>("sqft");
  const [to, setTo] = useState<(typeof areaUnits)[number]["id"]>("sqyd");

  const fromUnit = areaUnits.find((unit) => unit.id === from)!;
  const toUnit = areaUnits.find((unit) => unit.id === to)!;
  const inSqft = value * fromUnit.factor;
  const converted = inSqft / toUnit.factor;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-3xl border border-line bg-white p-5 sm:p-7">
        <h2 className="text-xl text-forest">Convert any area</h2>
        <p className="mt-1 text-[11px] text-muted">
          Builders quote built-up area, carpet area and super area differently. Convert the unit, then read the fine
          print.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <label htmlFor="area-value" className="mb-1.5 block text-[11px] font-semibold text-forest">
              Area
            </label>
            <input
              id="area-value"
              type="number"
              min={0}
              value={value}
              onChange={(event) => setValue(Math.max(0, Number(event.target.value)))}
              className="h-11 w-full rounded-xl border border-line bg-cream px-3 text-sm font-semibold text-forest outline-none focus:border-forest/50"
            />
          </div>
          <div className="hidden pb-2 text-center text-[11px] font-bold text-brass sm:block">→</div>
          <div>
            <label htmlFor="area-from" className="mb-1.5 block text-[11px] font-semibold text-forest">
              From
            </label>
            <select
              id="area-from"
              value={from}
              onChange={(event) => setFrom(event.target.value as typeof from)}
              className="h-11 w-full rounded-xl border border-line bg-cream px-3 text-[12px] font-semibold text-forest outline-none focus:border-forest/50"
            >
              {areaUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="area-to" className="mb-1.5 block text-[11px] font-semibold text-forest">
            To
          </label>
          <select
            id="area-to"
            value={to}
            onChange={(event) => setTo(event.target.value as typeof to)}
            className="h-11 w-full rounded-xl border border-line bg-cream px-3 text-[12px] font-semibold text-forest outline-none focus:border-forest/50"
          >
            {areaUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 rounded-2xl bg-sand/60 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Converted area</p>
          <p className="mt-1 font-serif text-[clamp(2rem,4vw,2.7rem)] leading-none text-forest">
            {formatNumber(Number(converted.toFixed(2)))} <span className="text-lg text-brass">{toUnit.label.toLowerCase()}</span>
          </p>
          <p className="mt-2 text-[11px] text-muted">
            {formatNumber(value)} {fromUnit.label.toLowerCase()} = {formatNumber(Number((value * fromUnit.factor).toFixed(2)))} sq ft
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            { label: "1 sq yd", value: "9 sq ft" },
            { label: "1 sq m", value: "10.764 sq ft" },
            { label: "1 acre", value: "43,560 sq ft" },
            { label: "1 hectare", value: "2.471 acres" },
            { label: "1 sq km", value: "100 hectares" },
            { label: "1 guntha", value: "1,089 sq ft" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-line bg-cream p-3">
              <p className="text-[10px] font-semibold text-forest">{item.label}</p>
              <p className="mt-0.5 text-[10px] text-muted">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-forest p-5 text-cream sm:p-7">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brass-light">
          <Sparkles className="size-3.5" /> Quick reference
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-tight">The three areas that matter</h3>
        <div className="mt-5 space-y-4">
          {[
            {
              title: "Carpet area",
              body: "Usable floor area within the walls. The number that affects daily life.",
            },
            {
              title: "Built-up area",
              body: "Carpet area plus internal walls, balcony and utility. Usually 10–18% more.",
            },
            {
              title: "Super area",
              body: "Built-up plus a share of common areas. Can be 20–35% more than carpet.",
            },
          ].map((item, index) => (
            <div key={item.title} className="flex gap-3 border-t border-white/10 pt-4 first:border-0 first:pt-0">
              <span className="font-serif text-lg text-brass-light">0{index + 1}</span>
              <div>
                <p className="text-sm font-bold text-cream">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-cream/55">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl bg-white/[0.07] p-3">
          <p className="flex items-start gap-2 text-[10px] leading-relaxed text-cream/60">
            <Info className="mt-0.5 size-3.5 shrink-0 text-brass-light" />
            Always ask for the carpet area in writing and compare it with the sanctioned plan. The brochure number is
            rarely the one you can furnish.
          </p>
        </div>
        <ButtonLink href="/properties" variant="brass" className="mt-5 w-full" iconRight={ArrowRight}>
          Browse homes by area
        </ButtonLink>
      </div>
    </div>
  );
}

function SliderRow({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  hint: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <label htmlFor={id} className="text-[11px] font-semibold text-forest">
            {label}
          </label>
          <p className="text-[9px] text-muted">{hint}</p>
        </div>
        <span className="text-sm font-extrabold text-forest">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-forest"
      />
      <div className="mt-1 flex justify-between text-[9px] text-muted">
        <span>{formatINR(min)}</span>
        <span>{formatINR(max)}</span>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-line bg-cream p-3.5",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <span>
        <span className="block text-[11px] font-semibold text-forest">{label}</span>
        <span className="mt-0.5 block text-[9px] leading-relaxed text-muted">{description}</span>
      </span>
      <span className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="block h-5 w-9 rounded-full bg-line transition peer-checked:bg-forest" />
        <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-4" />
      </span>
    </label>
  );
}

function Badge2({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-cream px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
      {children}
    </span>
  );
}

export function CalculatorSidebar() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        { icon: Building2, title: "Find homes in budget", href: "/properties", note: "Filter by price and area" },
        { icon: IndianRupee, title: "Check stamp duty", href: "/blog/stamp-duty-delhi-up-explained", note: "Delhi vs UP guide" },
        { icon: TrendingUp, title: "Value your home", href: "/home-valuation", note: "Free demo estimate" },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.title}
            href={item.href}
            className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-forest/25"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-forest">
              <Icon className="size-4" />
            </span>
            <span>
              <span className="block text-[11px] font-bold text-forest">{item.title}</span>
              <span className="block text-[9px] text-muted">{item.note}</span>
            </span>
            <ArrowRight className="ml-auto size-3.5 text-muted/50 transition group-hover:text-brass" />
          </Link>
        );
      })}
    </div>
  );
}
