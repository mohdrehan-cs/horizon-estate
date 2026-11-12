import type { Metadata } from "next";
import { BarChart3, BadgeCheck, CalendarCheck, FileText, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { ValuationForm } from "@/components/valuation/ValuationForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Free home valuation in Delhi, Noida & Greater Noida",
  description:
    "Get an indicative home valuation based on locality averages, property type, age and condition. Then book a detailed comparable-sales report with a Horizon advisor.",
};

const steps = [
  {
    icon: MapPin,
    title: "Locality benchmark",
    body: "We start with recent asking and transaction data for your micro-market, not a city-wide average.",
  },
  {
    icon: BarChart3,
    title: "Property adjustment",
    body: "Floor, facing, age, condition, parking and view are applied to the benchmark to reach a realistic range.",
  },
  {
    icon: FileText,
    title: "Strategy, not just a number",
    body: "A good valuation includes a launch price, a negotiation floor and an honest view of time-to-sell.",
  },
];

const faqs = [
  {
    question: "Is this the same as a bank valuation?",
    answer:
      "No. A bank valuation is conducted by an empanelled valuer for loan purposes. Our estimate is a market-facing range to help you plan a sale or purchase. The two can differ, especially for older builder floors or properties with mixed use.",
  },
  {
    question: "How accurate is the estimate?",
    answer:
      "The demo estimate applies locality average rates and standard adjustments. A real valuation requires a site visit, comparable transactions and a review of title, approvals and dues. Treat this tool as a starting point, not a formal appraisal.",
  },
  {
    question: "What documents should I keep ready?",
    answer:
      "For a detailed valuation, keep the sale deed or allotment letter, latest property tax receipt, society maintenance statement, sanctioned plan and any approved drawings. For a rental valuation, a recent lease agreement helps.",
  },
  {
    question: "Do you charge for a valuation?",
    answer:
      "The initial indicative estimate is free. A formal written valuation with comparable sales may carry a fee depending on the property type and mandate. We disclose it before you engage us.",
  },
];

export default function ValuationPage() {
  return (
    <div className="bg-cream pb-16">
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Home valuation" }]} />
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow text-brass">Sell with clarity</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] text-forest">
                What is your home actually worth?
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                An indicative range in under a minute, built from locality averages and adjusted for your property. No
                obligation, no pushy follow-up.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Badge variant="brass">Free estimate</Badge>
              <Badge variant="sand">
                <ShieldCheck className="size-3" /> No obligation
              </Badge>
              <Badge variant="outline">
                <BadgeCheck className="size-3" /> RERA-aware team
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page mt-8">
        <ValuationForm />
      </section>

      <section className="container-page mt-14">
        <SectionHeading
          eyebrow="How it works"
          title="From a number to a plan."
          description="A valuation is only useful if it helps you decide what to do next. Here is how we build the range."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-2xl border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-full bg-sand text-forest">
                    <Icon className="size-4" />
                  </span>
                  <span className="font-serif text-lg text-brass">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg text-forest">{step.title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">{step.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page mt-14 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <SectionHeading eyebrow="Questions" title="The honest answers." />
          <Accordion items={faqs} className="mt-6" />
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-line bg-white p-6">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-forest">
              <TrendingUp className="size-3.5 text-brass" /> What moves the number
            </p>
            <ul className="mt-3 space-y-3">
              {[
                "Exact street, block and view — not just the sector",
                "Carpet area vs built-up area, and the loading factor",
                "Age, upkeep and the quality of the society",
                "Parking, lift, power backup and floor rise",
                "Recent transactions, not current asking prices",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[11px] leading-relaxed text-muted">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brass" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-forest p-6 text-cream">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Prefer a conversation?</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight">Book a 20-minute pricing review.</h3>
            <p className="mt-2 text-[11px] leading-relaxed text-cream/60">
              Bring the property details. We&apos;ll bring recent comparables, a launch strategy and an honest view on
              timing.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink href="/contact" variant="brass" size="sm" icon={CalendarCheck}>
                Book a review
              </ButtonLink>
              <ButtonLink href="/list-property" variant="light" size="sm">
                List my property
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
