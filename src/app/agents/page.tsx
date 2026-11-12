import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Handshake, ShieldCheck, Users } from "lucide-react";
import { agents } from "@/data/agents";
import { AgentCard } from "@/components/agents/AgentCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Our property advisors in Delhi, Noida & Greater Noida",
  description:
    "Meet the RERA-registered Horizon Estates advisors. Sector specialists across South Delhi, West Delhi, Noida, Noida Extension and Greater Noida.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "One accountable advisor",
    body: "Your enquiry goes to a named specialist, not a rotating call centre. They own the relationship from brief to registration.",
  },
  {
    icon: BadgeCheck,
    title: "RERA registered",
    body: "Every advisor carries a valid agent registration. We publish the number, and we expect you to check it.",
  },
  {
    icon: Handshake,
    title: "Paid to tell the truth",
    body: "Our fees are disclosed upfront. We would rather lose a deal than push a property that does not fit.",
  },
];

export default function AgentsPage() {
  return (
    <div>
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Advisors" }]} />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <p className="eyebrow text-brass">The people</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5vw,3.7rem)] leading-[1.04] text-forest">
                Sector specialists, not generalists.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                Six advisors across three cities. Each works a defined patch, knows the buildings on it, and can tell you
                which streets to avoid. That is the whole model.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primary" iconRight={ArrowRight}>
                  Get matched with an advisor
                </ButtonLink>
                <ButtonLink href="/pricing" variant="outline">
                  Join the network
                </ButtonLink>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-line bg-white p-4">
              <div>
                <p className="font-serif text-2xl text-forest">6</p>
                <p className="text-[9px] uppercase tracking-wider text-muted">Advisors</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-forest">3</p>
                <p className="text-[9px] uppercase tracking-wider text-muted">Cities</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-forest">4.8</p>
                <p className="text-[9px] uppercase tracking-wider text-muted">Avg. rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading eyebrow="Meet the team" title="The Horizon advisory bench." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, index) => (
              <Reveal key={agent.id} delay={(index % 3) * 0.06}>
                <AgentCard agent={agent} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand/45 py-14">
        <div className="container-page">
          <SectionHeading eyebrow="How we work" title="Three promises we can actually keep." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-2xl border border-line bg-white p-6">
                  <span className="grid size-10 place-items-center rounded-full bg-sand text-forest">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-4 text-lg text-forest">{value.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-muted">{value.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid items-center gap-8 rounded-3xl bg-forest px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto]">
          <div>
            <Badge variant="white">
              <Users className="size-3" /> For agents &amp; agencies
            </Badge>
            <h2 className="mt-3 max-w-xl text-[clamp(1.6rem,3.4vw,2.3rem)] text-cream">
              Good agents deserve better tools.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/60">
              Listings, lead routing, locality insights and a brand that does not look like a classifieds page. Plans
              start free.
            </p>
          </div>
          <ButtonLink href="/pricing" variant="brass" iconRight={ArrowRight}>
            See agent plans
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
