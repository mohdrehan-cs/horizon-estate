import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Info, ShieldCheck } from "lucide-react";
import { CalculatorTabs, CalculatorSidebar } from "@/components/calculators/CalculatorTabs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EMI, stamp duty & area calculators",
  description:
    "Plan a property purchase in Delhi NCR with our EMI calculator, Delhi vs Uttar Pradesh stamp duty calculator and square feet / square yard area converter.",
};

const faqs = [
  {
    question: "How is home loan EMI calculated?",
    answer:
      "EMI is calculated on a reducing balance using the loan amount, annual interest rate and tenure. The formula is EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate and n is the number of months. Our calculator also shows the split between principal and interest over the full tenure.",
  },
  {
    question: "Are the stamp duty rates accurate for 2026?",
    answer:
      "This demo uses Delhi rates of 6% for male buyers, 4% for female buyers and 5% for joint registration, plus 1% registration and a ₹100 pasting fee. Uttar Pradesh rates are 7% male, 6% female and 6.5% joint, plus 1% registration. Rates and rebates can change, and circle rates vary by locality. Always verify with the sub-registrar or a lawyer before closing.",
  },
  {
    question: "Is GST included in stamp duty?",
    answer:
      "No. Stamp duty is a state tax. GST is a central tax that applies only to under-construction properties: 5% for non-affordable housing and 1% for affordable housing. Ready-to-move resale does not attract GST. Our stamp duty calculator lets you toggle under-construction and affordable status.",
  },
  {
    question: "What is the difference between carpet area and super area?",
    answer:
      "Carpet area is the usable floor area inside the walls. Built-up area adds internal walls, balcony and utility spaces. Super area adds a share of common areas such as lobbies and staircases. Two apartments with the same super area can have very different carpet areas, so always compare the carpet number.",
  },
];

export default function CalculatorsPage() {
  return (
    <div className="bg-cream pb-16">
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow text-brass">Plan with real numbers</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] text-forest">
                Calculators for the expensive decisions.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                EMI, stamp duty, GST and area conversion — the four numbers buyers most often get wrong. Adjust the
                inputs, then take the output to your advisor.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Badge variant="brass">
                <Calculator className="size-3" /> 3 tools
              </Badge>
              <Badge variant="sand">
                <ShieldCheck className="size-3" /> Delhi & UP rates
              </Badge>
              <Badge variant="outline">2026 demo data</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page mt-8">
        <CalculatorTabs />
      </section>

      <section className="container-page mt-8">
        <CalculatorSidebar />
      </section>

      <section className="container-page mt-14 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="eyebrow text-brass">Read before you sign</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,2.3rem)] text-forest">The fine print, in plain English.</h2>
          <Accordion items={faqs} className="mt-6" />
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-line bg-white p-6">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-forest">
              <Info className="size-3.5 text-brass" /> A note on the numbers
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-muted">
              These calculators are planning tools, not financial advice. Stamp duty, registration, GST and circle rates
              change. Interest rates vary by lender. Before you pay a token amount, ask for a written cost sheet and
              have a lawyer review the title and agreement.
            </p>
            <ButtonLink href="/contact" variant="outline" size="sm" className="mt-4" iconRight={ArrowRight}>
              Ask an advisor
            </ButtonLink>
          </div>
          <div className="rounded-3xl bg-forest p-6 text-cream">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Use our guide</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight">Stamp duty in Delhi and UP, explained.</h3>
            <p className="mt-2 text-[11px] leading-relaxed text-cream/60">
              Worked examples for male, female and joint registration, plus where GST fits in.
            </p>
            <Link
              href="/blog/stamp-duty-delhi-up-explained"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-brass-light"
            >
              Read the guide <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
