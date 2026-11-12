import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { ListPropertyWizard } from "@/components/list-property/ListPropertyWizard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "List your property in Delhi, Noida & Greater Noida",
  description:
    "List a home, builder floor, plot or commercial property on Horizon Estates. Free to start, verified buyers, professional photography and a dedicated advisor.",
};

const assurances = [
  { icon: IndianRupee, title: "Free to start", note: "Your first listing costs nothing" },
  { icon: ShieldCheck, title: "Verified buyers", note: "Every enquiry screened before hand-off" },
  { icon: Camera, title: "Media support", note: "Photography and floor-plan guidance" },
  { icon: Users, title: "One advisor", note: "A named specialist owns your listing" },
];

const benefits = [
  {
    title: "Priced with evidence",
    body: "We benchmark your expectation against current listings and recent transactions — then tell you where it sits, even if that is uncomfortable.",
  },
  {
    title: "Presented properly",
    body: "Better photographs, a clear floor plan and a description that mentions the trade-offs. Buyers trust listings that do not oversell.",
  },
  {
    title: "Qualified, not just quantified",
    body: "Enquiries are screened for budget, timeline and loan readiness. You spend time with people who can actually transact.",
  },
];

export default function ListPropertyPage() {
  return (
    <div className="bg-cream pb-16">
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "List a property" }]} />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <p className="eyebrow text-brass">Sell or rent with Horizon</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5vw,3.7rem)] leading-[1.04] text-forest">
                A better listing starts with an honest brief.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                Four short steps. Add the property details, choose how you want to be contacted, and our team will
                review the draft before it goes live. No listing fee to start.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="brass">
                  <Sparkles className="size-3" /> 4-minute draft
                </Badge>
                <Badge variant="sand">
                  <BadgeCheck className="size-3" /> RERA-aware process
                </Badge>
                <Badge variant="outline">Demo — no listing created</Badge>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Owner helpline</p>
              <a href={siteConfig.phoneHref} className="mt-1.5 block font-serif text-2xl text-forest">
                {siteConfig.phone}
              </a>
              <p className="mt-1 text-[10px] text-muted">{siteConfig.hours}</p>
              <p className="mt-3 border-t border-line pt-3 text-[10px] leading-relaxed text-muted">
                Prefer to speak first? Ask for a pricing review before you list. We will not push you to publish.
              </p>
              <Link href="/home-valuation" className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-brass">
                Get a free valuation <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          {assurances.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3 px-2 py-3 sm:px-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-forest">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-forest">{item.title}</p>
                  <p className="text-[10px] text-muted">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page mt-10">
        <ListPropertyWizard />
      </section>

      <section className="container-page mt-16 border-t border-line pt-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow text-brass">Why Horizon</p>
            <h2 className="mt-2 text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight text-forest">
              A listing is not a classified. It is a small campaign.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              We are an agency and a marketplace. That means we can market your home properly, and we can tell you when
              the price needs a rethink.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/pricing" variant="outline" iconRight={ArrowRight}>
                Compare owner plans
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Talk to the team
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-sand">
                  <CheckCircle2 className="size-3.5 text-brass" />
                </span>
                <div>
                  <p className="text-sm font-bold text-forest">{benefit.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">{benefit.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
