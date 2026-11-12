import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Compass,
  Handshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { agents } from "@/data/agents";
import { siteConfig } from "@/config/site";
import { img } from "@/data/images";
import { AgentCard } from "@/components/agents/AgentCard";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Horizon Estates — a quieter way to move in Delhi NCR",
  description:
    "Horizon Estates is an independent property advisory and marketplace covering Delhi, Noida and Greater Noida. Meet the team, our values and how we work.",
};

const values = [
  {
    icon: Compass,
    title: "Local before loud",
    body: "We work the micro-markets we know — the lane, the society, the school run at 8am. A shortlist is only useful if it fits the day.",
  },
  {
    icon: Handshake,
    title: "Advice over inventory",
    body: "If a property is wrong for you, we say so. We would rather lose a fee than manage a regret two years later.",
  },
  {
    icon: ShieldCheck,
    title: "Diligence is the product",
    body: "Title, RERA, approvals and dues are checked before money moves. The unglamorous work is the work that protects you.",
  },
  {
    icon: Sparkles,
    title: "Clear, then calm",
    body: "Clear fees, clear trade-offs, clear next steps. The calm follows from knowing exactly what you are signing up for.",
  },
];

const milestones = [
  { year: "2014", title: "Founded in Noida", body: "Started as a two-person resale desk covering sectors 50–78." },
  { year: "2018", title: "Delhi practice", body: "Added South and West Delhi builder-floor and DDA expertise." },
  { year: "2022", title: "Rental management", body: "Launched managed rentals for NRI and busy professional owners." },
  { year: "2025", title: "YEIDA desk", body: "Opened a dedicated Jewar Airport corridor research practice." },
];

const stats = [
  { value: siteConfig.stats.years, label: "Years in NCR" },
  { value: siteConfig.stats.families, label: "Families advised" },
  { value: siteConfig.stats.listings, label: "Listings reviewed" },
  { value: siteConfig.stats.localities, label: "Localities covered" },
];

export default function AboutPage() {
  return (
    <div className="bg-cream pb-16">
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow text-brass">About Horizon</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5.2vw,3.9rem)] leading-[1.03] text-forest">
                An agency that behaves like a buyer.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                Horizon Estates is an independent advisory and listing platform for Delhi, Noida and Greater Noida. We
                are small on purpose: fewer mandates, deeper local knowledge and one accountable advisor from first
                call to handover.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="brass">
                  <BadgeCheck className="size-3" /> {siteConfig.rera}
                </Badge>
                <Badge variant="sand">
                  <MapPin className="size-3" /> 23 localities
                </Badge>
                <Badge variant="outline">
                  <Users className="size-3" /> 6 specialists
                </Badge>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/services" iconRight={ArrowRight}>
                  How we work
                </ButtonLink>
                <ButtonLink href="/agents" variant="outline">
                  Meet the team
                </ButtonLink>
              </div>
            </div>
            <Reveal>
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-sand">
                <Image
                  src={img.heroSecondary}
                  alt="A residential street in Delhi NCR"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/85 to-transparent p-5 pt-16">
                  <p className="font-serif text-2xl text-cream">Since 2014, quietly.</p>
                  <p className="mt-1 text-[11px] text-cream/65">
                    Independent. RERA-aware. Answerable to the people we advise.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-page grid grid-cols-2 divide-line py-6 sm:grid-cols-4 sm:divide-x">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-3 text-center sm:px-5">
              <p className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] leading-none text-forest">{stat.value}</p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow text-brass">Why we exist</p>
            <h2 className="mt-2 text-[clamp(1.8rem,3.8vw,2.7rem)] leading-tight text-forest">
              Property in India is sold with too much certainty and too little evidence.
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="sand">
                <Award className="size-3" /> 4.8 average client rating
              </Badge>
              <Badge variant="sand">
                <TrendingUp className="size-3" /> 68% repeat or referral
              </Badge>
            </div>
          </div>
          <div className="space-y-4 text-[13px] leading-relaxed text-forest/80">
            <p>
              We started in 2014 with a simple frustration: buyers were being shown properties that suited the
              broker&apos;s inventory, not the buyer&apos;s life. Sellers were being promised a price and then asked to
              reduce it quietly. The paperwork was treated as an afterthought.
            </p>
            <p>
              Horizon was built to do the opposite. We begin with your budget, commute and five-year plan. We give you
              three micro-markets, not thirty. We put the trade-offs in writing. And we stay through registration,
              because that is where good advice is tested.
            </p>
            <p>
              We are also a marketplace. Owners and agencies list with us because we screen enquiries and publish
              honestly. That combination — advisory plus platform — keeps our incentives visible. You can see whether
              we are representing you or the listing.
            </p>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Our promise</p>
              <p className="mt-2 text-[13px] leading-relaxed text-forest">
                If we would not buy it ourselves, we will tell you not to.
              </p>
              <p className="mt-1 text-[10px] text-muted">— The Horizon team</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand/45 py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we hold to"
            title="Four values that survive a difficult deal."
            description="These are not wall posters. They are the reasons we occasionally talk ourselves out of a fee."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={(index % 4) * 0.05}>
                  <article className="h-full rounded-2xl border border-line bg-white p-5">
                    <span className="grid size-10 place-items-center rounded-xl bg-sand text-forest">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg text-forest">{value.title}</h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted">{value.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <SectionHeading eyebrow="The path here" title="A small firm, deliberately." />
          <div className="grid gap-3 sm:grid-cols-2">
            {milestones.map((milestone, index) => (
              <Reveal key={milestone.year} delay={(index % 2) * 0.05}>
                <div className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                  <p className="font-serif text-2xl leading-none text-brass">{milestone.year}</p>
                  <div>
                    <p className="text-[13px] font-bold text-forest">{milestone.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted">{milestone.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line pt-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="The team"
            title="Specialists, not a call centre."
            description="Six advisors across the three cities. Every client gets a named lead and a direct number."
            action={
              <ButtonLink href="/agents" variant="outline" iconRight={ArrowRight}>
                View all advisors
              </ButtonLink>
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.slice(0, 6).map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page mt-14">
        <div className="grid gap-6 rounded-3xl bg-forest px-6 py-10 text-cream sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">
              <Building2 className="size-3.5" /> Registered & accountable
            </p>
            <h2 className="mt-2 max-w-xl text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight">
              A conversation costs nothing. A wrong purchase costs years.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/60">
              Tell us what you are trying to decide. We will tell you whether we can help — and where we cannot.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/contact" variant="brass" iconRight={ArrowRight}>
              Talk to us
            </ButtonLink>
            <ButtonLink href="/properties" variant="light">
              Browse homes
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
