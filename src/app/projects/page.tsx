import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Compass, FileCheck2, ShieldCheck, TrendingUp } from "lucide-react";
import { projects } from "@/data/projects";
import { getCityName } from "@/data/cities";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/data/images";

export const metadata: Metadata = {
  title: "New residential projects in Noida & Greater Noida",
  description:
    "Three RERA-registered new launches: Aurora Heights in Sector 150, Northline Greens in Noida Extension and Crescent Park in Knowledge Park V.",
};

const checks = [
  {
    icon: FileCheck2,
    title: "RERA & approvals",
    body: "Registration, sanctioned plans, environmental clearance and the developer's delivery record.",
  },
  {
    icon: Compass,
    title: "Ground reality",
    body: "Site visits at different times of day, approach roads, infrastructure timelines and actual views.",
  },
  {
    icon: TrendingUp,
    title: "Pricing sanity",
    body: "Comparison with three resale alternatives, not just competing new launches.",
  },
  {
    icon: ShieldCheck,
    title: "Exit liquidity",
    body: "Resale demand, rental depth and the honest holding horizon for each project.",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-forest-dark">
        <Image src={img.construction} alt="New residential project under construction" fill sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/85 to-forest-dark/40" />
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "New projects" }]}
            className="[&_a]:text-cream/60 [&_span]:text-cream/80"
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div className="max-w-2xl text-cream">
              <p className="eyebrow text-brass-light">New launches · Delhi NCR</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.03]">
                New addresses, carefully vetted.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/65">
                Three projects in this demo, each chosen to show a different part of the market: a premium Sector 150
                address, a value-led Noida Extension launch and a completed Greater Noida community.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="brass" iconRight={ArrowRight}>
                  Book a project visit
                </ButtonLink>
                <ButtonLink href="/calculators" variant="light">
                  Run the numbers
                </ButtonLink>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur">
              <div>
                <p className="font-serif text-2xl text-cream">3</p>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">Projects</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-cream">1,064</p>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">Homes</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-cream">100%</p>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">RERA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="The shortlist"
            title="Three projects. Three different bets."
            description="Every project has a trade-off. These cards are deliberately candid about configuration, price band and possession."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.07}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand/45 py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our diligence"
            title="What we check before a project makes this page."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {checks.map((check, index) => {
              const Icon = check.icon;
              return (
                <Reveal key={check.title} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-line bg-white p-5">
                    <span className="grid size-10 place-items-center rounded-full bg-sand text-forest">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="mt-4 text-lg text-forest">{check.title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted">{check.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading eyebrow="At a glance" title="Compare the three launches." />
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[760px] text-left text-[12px]">
              <thead>
                <tr className="border-b border-line bg-sand/60 text-[10px] uppercase tracking-[0.1em] text-muted">
                  <th className="px-5 py-3.5 font-semibold">Project</th>
                  <th className="px-5 py-3.5 font-semibold">Locality</th>
                  <th className="px-5 py-3.5 font-semibold">Configurations</th>
                  <th className="px-5 py-3.5 font-semibold">Price from</th>
                  <th className="px-5 py-3.5 font-semibold">Possession</th>
                  <th className="px-5 py-3.5 font-semibold">RERA</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.slug} className="border-b border-line/70 last:border-0">
                    <td className="px-5 py-4">
                      <p className="font-bold text-forest">{project.name}</p>
                      <p className="text-[10px] text-muted">{project.developer}</p>
                    </td>
                    <td className="px-5 py-4 text-muted">
                      {project.locality}, {getCityName(project.city)}
                    </td>
                    <td className="px-5 py-4 text-muted">{project.configurations.join(", ")}</td>
                    <td className="px-5 py-4 font-semibold text-forest">{project.priceRange.split("–")[0].trim()}+</td>
                    <td className="px-5 py-4 text-muted">{project.possession}</td>
                    <td className="px-5 py-4">
                      <Badge variant="brass" className="whitespace-nowrap">
                        <BadgeCheck className="size-3" /> Verified
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/projects/${project.slug}`} className="font-bold text-brass hover:text-forest">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted">
            <Building2 className="size-3.5 text-brass" /> Prices are demo starting prices and exclude stamp duty, GST and
            registration where applicable.
          </p>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-3xl bg-forest px-6 py-10 text-center sm:px-10">
          <p className="eyebrow text-brass-light">Looking for something else?</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-[clamp(1.7rem,3.5vw,2.4rem)] text-cream">
            We track launches that never make the banner ads.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-cream/60">
            Share your budget and preferred sectors. We&apos;ll send a candid project shortlist — including which ones
            we would avoid.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="brass" iconRight={ArrowRight}>
              Talk to a project advisor
            </ButtonLink>
            <ButtonLink href="/properties" variant="light">
              Browse ready homes
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
