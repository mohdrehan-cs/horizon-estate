"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { calculateEmi } from "@/lib/emi";
import { formatINR, formatINRFull } from "@/lib/format";

export function EmiTeaser() {
  const [value, setValue] = useState(25000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const downPayment = Math.round((value * downPct) / 100);
  const principal = value - downPayment;
  const result = useMemo(() => calculateEmi(principal, rate, years), [principal, rate, years]);

  return (
    <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-brass-light">
          <Calculator className="size-4" />
          <span className="text-[10px] font-bold uppercase tracking-[0.16em]">EMI preview</span>
        </div>
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold text-cream/60">
          Indicative
        </span>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor="teaser-value" className="text-[11px] font-semibold text-cream/60">
              Property value
            </label>
            <span className="text-sm font-extrabold text-cream">{formatINR(value)}</span>
          </div>
          <input
            id="teaser-value"
            type="range"
            min={5000000}
            max={100000000}
            step={1000000}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="w-full accent-[#d9b26b]"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="teaser-down" className="mb-1.5 block text-[10px] font-semibold text-cream/60">
              Down payment
            </label>
            <select
              id="teaser-down"
              value={downPct}
              onChange={(event) => setDownPct(Number(event.target.value))}
              className="h-10 w-full rounded-lg border border-white/15 bg-white/[0.08] px-2 text-[11px] font-semibold text-cream outline-none"
            >
              {[10, 15, 20, 25, 30].map((pct) => (
                <option key={pct} value={pct} className="text-ink">
                  {pct}%
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="teaser-rate" className="mb-1.5 block text-[10px] font-semibold text-cream/60">
              Interest rate
            </label>
            <select
              id="teaser-rate"
              value={rate}
              onChange={(event) => setRate(Number(event.target.value))}
              className="h-10 w-full rounded-lg border border-white/15 bg-white/[0.08] px-2 text-[11px] font-semibold text-cream outline-none"
            >
              {[7.5, 8, 8.25, 8.5, 8.75, 9, 9.5].map((item) => (
                <option key={item} value={item} className="text-ink">
                  {item}%
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="teaser-years" className="mb-1.5 block text-[10px] font-semibold text-cream/60">
              Tenure
            </label>
            <select
              id="teaser-years"
              value={years}
              onChange={(event) => setYears(Number(event.target.value))}
              className="h-10 w-full rounded-lg border border-white/15 bg-white/[0.08] px-2 text-[11px] font-semibold text-cream outline-none"
            >
              {[10, 15, 20, 25, 30].map((item) => (
                <option key={item} value={item} className="text-ink">
                  {item} yrs
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-2xl bg-forest-dark/70 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/45">Estimated monthly EMI</p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="font-serif text-[2.1rem] leading-none text-cream">{formatINRFull(result.emi)}</p>
            <p className="pb-1 text-[10px] text-cream/50">
              {formatINR(principal)} loan · {years} yrs
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="flex h-full">
              <span className="h-full bg-brass-light" style={{ width: `${result.principalShare}%` }} />
              <span className="h-full bg-terracotta/80" style={{ width: `${result.interestShare}%` }} />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-cream/45">
            <span>Principal {Math.round(result.principalShare)}%</span>
            <span>Interest {Math.round(result.interestShare)}%</span>
          </div>
        </div>
      </div>

      <Link
        href="/calculators"
        className="mt-4 flex items-center justify-between rounded-xl border border-white/12 px-4 py-3 text-[11px] font-bold text-cream transition hover:border-brass-light/50 hover:bg-white/[0.05]"
      >
        Open the full EMI &amp; stamp duty calculators
        <ArrowRight className="size-3.5 text-brass-light" />
      </Link>
    </div>
  );
}
