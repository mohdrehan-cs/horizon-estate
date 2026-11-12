import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  Compass,
  FileCheck2,
  Globe2,
  Handshake,
  Home,
  KeyRound,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";
import { img } from "@/data/images";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Real estate services for buyers, sellers & NRI investors",
  description:
    "Buyer representation, sales, rental management, legal due diligence, home loan advisory and NRI concierge across Delhi, Noida and Greater Noida.",
};

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  key: KeyRound,
  building: Building2,
  scale: Scale,
  calculator: Calculator,
  globe: Globe2,
};

const process = [
  {
    icon: MessageCircle,
    title: "A real conversation",
    body: "We start with your budget, commute, family needs and timeline. No project pitch deck on the first call.",
  },
  {
    icon: Compass,
    title: "A short, candid list",
    body: "Three micro-markets, a handful of homes, and a written note on what each option does not solve.",
  },
  {
    icon: FileCheck2,
    title: "Diligence before deposit",
    body: "Title, RERA, approvals, dues and the agreement — reviewed before you commit any money.",
  },
  {
    icon: Handshake,
    title: "A managed close",
    body: "Negotiation, loan coordination, registration and handover. One accountable person throughout.",
  },
];

const faqs = [
  {
    question: "Can I use one service without the others?",
    answer:
      "Yes. Many clients start with a legal due-diligence review or a home loan advisory and handle the search themselves. Others ask us to run the entire purchase. Each engagement is scoped and priced separately, and we put the scope in writing.",
  },
  {
    question: "Do you represent buyers and sellers in the same transaction?",
    answer:
      "We avoid dual representation on resale transactions. If we are marketing a property, a buyer client is introduced to an independent advisor on our team and the fee arrangement is disclosed to both sides.",
  },
  {
    question: "How do NRI clients usually work with you?",
    answer:
      "Most NRI mandates start with video site visits and a documented shortlist, followed by power-of-attorney guidance, FEMA-compliant remittance coordination and registration support. We can also manage the property and rent it out after purchase.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "Our direct advisory covers Delhi, Noida and Greater Noida, including Noida Extension and the YEIDA / Jewar Airport corridor. For other NCR markets, we can make an introduction to a vetted local partner.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-cream pb-16">
      <section className="relative isolate overflow-hidden bg-forest-dark">
        <Image src={img.heroSecondary} alt="A home in Delhi NCR" fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/90 to-forest-dark/35" />
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
            className="[&_a]:text-cream/60 [&_span]:text-cream/80"
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div className="max-w-2xl text-cream">
              <p className="eyebrow text-brass-light">Advisory, not a lead funnel</p>
              <h1 className="display-balance mt-3 text-[clamp(2.3rem,5.2vw,3.9rem)] leading-[1.03]">
                The work that happens before the deal.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-cream/65">
                Search, pricing, paperwork, loans and rentals. Six services built around the parts of property that
                people most often get wrong — delivered by specialists in Delhi, Noida and Greater Noida.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="brass" iconRight={ArrowRight}>
                  Start a conversation
                </ButtonLink>
                <ButtonLink href="/pricing" variant="light">
                  See owner plans
                </ButtonLink>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur">
              <div>
                <p className="font-serif text-3xl text-cream">6</p>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">Service lines</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-cream">3</p>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">Cities covered</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-cream">4.8</p>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">Average rating</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-cream">12</p>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">Years in NCR</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <p className="flex items-center gap-2 text-[11px] text-muted">
            <ShieldCheck className="size-4 text-brass" />
            Fees disclosed in writing before engagement · RERA-aware process
          </p>
          <div className="flex items-center gap-4 text-[10px] font-semibold text-forest">
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="size-3.5 text-brass" /> Registered advisors
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5 text-brass" /> One point of contact
            </span>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Choose the help you actually need."
            description="Every service can stand alone. Most clients combine two or three. We scope the work and the fee before we begin."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] ?? Home;
              return (
                <Reveal key={service.slug} delay={(index % 3) * 0.05}>
                  <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition hover:border-forest/25 hover:shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-11 place-items-center rounded-2xl bg-sand text-forest">
                        <Icon className="size-5" />
                      </span>
                      <Badge variant="brass">{service.price}</Badge>
                    </div>
                    <h2 className="mt-4 text-xl text-forest">{service.name}</h2>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted">{service.description}</p>
                    <ul className="mt-4 space-y-2 border-t border-line pt-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-[11px] leading-relaxed text-forest/85">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-brass" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/contact?service=${service.slug}`}
                      className="mt-5 flex items-center gap-1.5 text-[11px] font-bold text-forest transition hover:text-brass"
                    >
                      Discuss this service <ArrowRight className="size-3.5" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand/45 py-14 sm:py-18">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow text-brass">How an engagement runs</p>
            <h2 className="mt-2 text-[clamp(1.7rem,3.5vw,2.5rem)] leading-tight text-forest">
              Four steps. No mystery about the next one.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We would rather set expectations early than rescue a transaction later. Here is the shape of a typical
              mandate.
            </p>
            <div className="mt-6 rounded-2xl bg-forest p-5 text-cream">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">
                <Sparkles className="size-3.5" /> The Horizon promise
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-cream/70">
                If we do not think a property is right for you, we will say so — even if it means losing the deal.
              </p>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-brass-light"
              >
                Ask us anything on WhatsApp <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={(index % 2) * 0.05}>
                  <div className="h-full rounded-2xl border border-line bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span className="grid size-9 place-items-center rounded-full bg-sand text-forest">
                        <Icon className="size-4" />
                      </span>
                      <span className="font-serif text-lg text-brass">0{index + 1}</span>
                    </div>
                    <h3 className="mt-4 text-lg text-forest">{step.title}</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{step.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <SectionHeading eyebrow="Engagement models" title="Pick the level of involvement." />
            <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
              {[
                {
                  name: "Search brief",
                  price: "No fee",
                  note: "A short, human shortlist for buyers who want a starting point.",
                },
                {
                  name: "Represented search",
                  price: "From 1% of value",
                  note: "End-to-end buyer representation, from shortlist to registration.",
                },
                {
                  name: "Sales mandate",
                  price: "1.5% success fee",
                  note: "Pricing, media, marketing and negotiation for owners.",
                },
                {
                  name: "Advisory retainer",
                  price: "Custom",
                  note: "For NRI buyers, investors and developers who need ongoing input.",
                },
              ].map((item) => (
                <div key={item.name} className="flex flex-col gap-1 border-b border-line px-5 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-forest">{item.name}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{item.note}</p>
                  </div>
                  <p className="shrink-0 text-[11px] font-bold text-brass">{item.price}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted">
              <ShieldCheck className="size-3.5 text-brass" /> Fees are illustrative for this demo. Every live mandate is
              quoted in writing.
            </p>
          </div>
          <div className="lg:pt-12">
            <SectionHeading eyebrow="Questions" title="Before you engage us." />
            <Accordion items={faqs} className="mt-6" />
          </div>
        </div>
      </section>

      <section className="container-page">
        <div className="rounded-3xl bg-forest px-6 py-10 text-center sm:px-10">
          <p className="eyebrow text-brass-light">Not sure where to start?</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-[clamp(1.7rem,3.6vw,2.5rem)] text-cream">
            Tell us the decision you are trying to make.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-cream/60">
            Buying, selling, renting or just comparing options — a 20-minute call is usually enough to find the right
            next step.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="brass" iconRight={ArrowRight}>
              Book a call
            </ButtonLink>
            <ButtonLink href="/agents" variant="light">
              Meet the advisors
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
