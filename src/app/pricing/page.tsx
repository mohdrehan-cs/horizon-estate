import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  Megaphone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { plans, planComparison } from "@/data/plans";
import { pricingFaqs } from "@/data/services";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Plans & pricing for owners, agents and developers",
  description:
    "Transparent listing plans for owners, brokers and developers across Delhi, Noida and Greater Noida. Start free, upgrade for featured placement, lead routing and project microsites.",
};

const included = [
  "RERA-aware listing review",
  "WhatsApp and call enquiry routing",
  "Verified owner or agent badge",
  "Performance reporting dashboard",
];

const addOns = [
  {
    icon: Star,
    name: "Featured placement",
    price: "₹1,499 / week",
    body: "Top-of-search placement in your city and locality, plus a homepage rotation slot.",
  },
  {
    icon: Camera,
    name: "Professional media",
    price: "₹4,999 / property",
    body: "Half-day shoot, 20 edited photographs, a floor plan and a 45-second walkthrough reel.",
  },
  {
    icon: BarChart3,
    name: "Locality insights pack",
    price: "₹2,499",
    body: "A written pricing and demand brief for one micro-market, refreshed quarterly.",
  },
  {
    icon: Megaphone,
    name: "Launch campaign",
    price: "From ₹24,999",
    body: "A two-week campaign for a new project: landing page, paid social and lead qualification.",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-cream pb-16">
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow text-brass">Plans for owners & agencies</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5vw,3.7rem)] leading-[1.04] text-forest">
                Clear pricing. No lead-farming theatre.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                Publish a listing for free, or pay for visibility when you are ready. Every plan routes enquiries
                directly to you — we do not resell your leads to four competing brokers.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="brass">
                  <Sparkles className="size-3" /> Free plan available
                </Badge>
                <Badge variant="sand">
                  <ShieldCheck className="size-3" /> No lock-in monthly
                </Badge>
                <Badge variant="outline">Demo pricing — no billing</Badge>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Every paid plan includes</p>
              <ul className="mt-3 space-y-2">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] leading-relaxed text-forest/85">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-brass" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-line pt-3 text-[10px] leading-relaxed text-muted">
                Prices exclude 18% GST. Annual billing gives you two months free.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-[clamp(1.6rem,3.2vw,2.2rem)] leading-tight text-forest">
            Start where you are.
          </h2>
          <p className="mt-2 text-sm text-muted">
            Switch plans as your portfolio grows. The demo checkout does not collect any payment details.
          </p>
        </div>
        <PricingPlans plans={plans} />
      </section>

      <section className="border-y border-line bg-white py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="Side by side"
            title="Compare every plan."
            description="The practical differences, without a wall of tick boxes that all say the same thing."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="bg-sand/70">
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`px-5 py-4 text-[12px] font-bold ${
                        plan.popular ? "bg-forest text-cream" : "text-forest"
                      }`}
                    >
                      {plan.name}
                      {plan.popular ? (
                        <span className="ml-2 rounded-full bg-brass px-2 py-0.5 text-[8px] uppercase tracking-wide text-white">
                          Popular
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planComparison.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? "bg-white" : "bg-cream/60"}>
                    <th scope="row" className="px-5 py-3.5 text-[11px] font-semibold text-forest">
                      {row.feature}
                    </th>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={`${row.feature}-${plans[valueIndex]?.name ?? valueIndex}`}
                        className={`px-5 py-3.5 text-[11px] ${
                          plans[valueIndex]?.popular ? "bg-forest/[0.035] font-semibold text-forest" : "text-muted"
                        }`}
                      >
                        {value === "Yes" ? (
                          <Check className="size-4 text-brass" aria-label="Included" />
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] text-muted">
            Need something unusual — a developer portfolio, a co-working brand or a bulk rental mandate?{" "}
            <a href="/contact" className="font-semibold text-brass underline-offset-2 hover:underline">
              Talk to us
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="Add-ons"
            title="Pay for attention only when it helps."
            description="Available on any paid plan. Add-ons are priced per property or per campaign, with no long-term commitment."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((addOn, index) => {
              const Icon = addOn.icon;
              return (
                <Reveal key={addOn.name} delay={(index % 4) * 0.05}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition hover:border-forest/25 hover:shadow-card">
                    <span className="grid size-10 place-items-center rounded-xl bg-sand text-forest">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="mt-4 text-base text-forest">{addOn.name}</h3>
                    <p className="mt-1 text-[11px] font-bold text-brass">{addOn.price}</p>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted">{addOn.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-sand/40 py-14 sm:py-18">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow text-brass">Billing questions</p>
            <h2 className="mt-2 text-[clamp(1.7rem,3.5vw,2.5rem)] leading-tight text-forest">
              The small print, in plain language.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Still unsure which plan fits? Send us your portfolio and we will tell you — including when the free plan
              is the right answer.
            </p>
            <div className="mt-6 rounded-2xl bg-forest p-5 text-cream">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">
                <MessageCircle className="size-3.5" /> Human support
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-cream/70">
                Billing is never a chatbot. A named account manager handles paid plans, invoices and cancellations.
              </p>
              <ButtonLink href="/contact" variant="brass" size="sm" className="mt-4" iconRight={ArrowRight}>
                Ask a pricing question
              </ButtonLink>
            </div>
          </div>
          <Accordion items={pricingFaqs} />
        </div>
      </section>

      <section className="container-page pt-14">
        <div className="rounded-3xl border border-line bg-white px-6 py-10 text-center sm:px-10">
          <p className="eyebrow text-brass">Ready to list?</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-[clamp(1.7rem,3.6vw,2.5rem)] text-forest">
            Draft your listing before you choose a plan.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            The listing wizard takes about four minutes. You can review the draft and decide on visibility later.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/list-property" iconRight={ArrowRight}>
              List a property
            </ButtonLink>
            <ButtonLink href="/home-valuation" variant="outline">
              Check your home value
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
