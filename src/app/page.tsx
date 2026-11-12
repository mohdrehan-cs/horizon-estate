import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Compass,
  FileCheck2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cities, allLocalities } from "@/data/cities";
import { featuredProperties, propertiesByCity } from "@/data/properties";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog";
import { agents } from "@/data/agents";
import { img } from "@/data/images";
import { formatINR } from "@/lib/format";
import { SearchBar } from "@/components/property/SearchBar";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EmiTeaser } from "@/components/calculators/EmiTeaser";

const assurances = [
  { icon: ShieldCheck, label: "RERA-aware listings", note: "Every project checked" },
  { icon: BadgeCheck, label: "Verified inventory", note: "No phantom listings" },
  { icon: Compass, label: "Local specialists", note: "Sector-level knowledge" },
  { icon: FileCheck2, label: "Paperwork support", note: "Title to registration" },
];

const steps = [
  {
    number: "01",
    title: "Start with your real budget",
    body: "We map affordability after EMIs, stamp duty, registration and GST — not just the sticker price.",
  },
  {
    number: "02",
    title: "Compare micro-markets",
    body: "Three shortlisted localities, with honest notes on commute, schools, resale and what each one lacks.",
  },
  {
    number: "03",
    title: "Close with confidence",
    body: "Site visits, negotiation, legal checks and registration coordination from one accountable team.",
  },
];

const spotlightSlugs = ["greater-kailash", "sector-150", "noida-extension", "dwarka", "knowledge-park", "yeida"];

export default function HomePage() {
  const featured = featuredProperties.filter((property) => property.listingType === "sale").slice(0, 6);
  const spotlights = spotlightSlugs.flatMap((slug) => {
    const locality = allLocalities.find((item) => item.slug === slug);
    return locality ? [locality] : [];
  });
  const featuredPost = blogPosts[0];
  const sidePosts = blogPosts.slice(1, 3);
  const homeAgents = [agents[0], agents[2], agents[3]];

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-forest-dark">
        <Image
          src={img.hero}
          alt="A contemporary home in Delhi NCR at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-shade absolute inset-0" />
        <div className="container-page relative z-10 flex min-h-[86vh] flex-col justify-end pb-8 pt-20 sm:pb-10 lg:min-h-[88vh] lg:pt-24">
          <div className="grid items-end gap-10 lg:grid-cols-[1.55fr_0.75fr]">
            <div className="max-w-3xl text-cream">
              <p className="eyebrow flex items-center gap-2 text-brass-light">
                <span className="h-px w-8 bg-brass-light/70" />
                Delhi · Noida · Greater Noida
              </p>
              <h1 className="display-balance mt-5 text-[clamp(2.8rem,6.4vw,5.4rem)] font-medium leading-[0.98] text-cream">
                Find your place in the capital&apos;s orbit.
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/75 sm:text-base">
                Verified homes, builder floors and new launches across Delhi NCR — chosen with sector-level knowledge,
                priced honestly, and explained without the sales noise.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ButtonLink href="/properties" variant="brass" size="lg" iconRight={ArrowRight}>
                  Explore homes
                </ButtonLink>
                <ButtonLink href="/contact" variant="light" size="lg">
                  Talk to a local advisor
                </ButtonLink>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-5">
                <div>
                  <p className="font-serif text-2xl text-cream">{siteConfig.stats.listings}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-cream/50">homes curated</p>
                </div>
                <div className="hidden h-8 w-px bg-white/15 sm:block" />
                <div>
                  <p className="font-serif text-2xl text-cream">{siteConfig.stats.localities}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-cream/50">localities covered</p>
                </div>
                <div className="hidden h-8 w-px bg-white/15 sm:block" />
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {homeAgents.map((agent) => (
                      <Image
                        key={agent.id}
                        src={agent.avatar}
                        alt={agent.name}
                        width={28}
                        height={28}
                        className="size-7 rounded-full border-2 border-forest-dark object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-xs font-bold text-cream">
                      4.9 <Star className="size-3 fill-brass-light text-brass-light" />
                    </p>
                    <p className="text-[10px] text-cream/50">from 380 client reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <Link
                href="/projects/aurora-heights"
                className="group block overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md transition hover:bg-white/15"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={projects[0].images[0]}
                    alt={projects[0].name}
                    fill
                    sizes="320px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-forest">
                    This week&apos;s edit
                  </span>
                </div>
                <div className="px-2 pb-1 pt-3 text-cream">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-brass-light">
                    {projects[0].developer} · {projects[0].locality}
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="font-serif text-xl">{projects[0].name}</p>
                    <ArrowUpRight className="size-4 text-brass-light transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-0.5 text-[11px] text-cream/60">
                    {projects[0].configurations.join(" · ")} · from {formatINR(projects[0].priceFrom)}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-8 lg:mt-10">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ── Assurances ─────────────────────────────────────────────────────── */}
      <section className="border-b border-line bg-white">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:divide-x lg:grid-cols-4">
          {assurances.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 px-2 py-3 sm:px-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-forest">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-forest">{item.label}</p>
                  <p className="text-[10px] text-muted">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Cities ─────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Start with a city"
            title="Three cities. One considered shortlist."
            description="Each city behaves differently. Start with the one that fits your commute, budget and horizon — then go a level deeper into the locality."
            action={
              <ButtonLink href="/properties" variant="outline" iconRight={ArrowRight}>
                Browse all 24 homes
              </ButtonLink>
            }
          />

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {cities.map((city, index) => (
              <Reveal key={city.slug} delay={index * 0.08}>
                <Link
                  href={`/cities/${city.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-forest-dark"
                >
                  <Image
                    src={city.image}
                    alt={`Property in ${city.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-[900ms] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/20 to-transparent" />
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                    <Badge variant="white">{propertiesByCity(city.slug).length} homes</Badge>
                    <span className="grid size-9 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition group-hover:bg-brass group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <div className="absolute inset-x-5 bottom-5 text-cream">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brass-light">{city.state}</p>
                    <h3 className="mt-1.5 text-[2rem] leading-none">{city.name}</h3>
                    <p className="mt-2 text-[12px] text-cream/65">{city.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {city.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-white/20 px-2.5 py-1 text-[9px] font-medium text-cream/75"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured listings ──────────────────────────────────────────────── */}
      <section className="border-y border-line bg-sand/45 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Horizon edit"
            title="Homes worth a closer look."
            description="A small, intentionally varied selection from the 24 listings in this demo — chosen for light, location and a clean paper trail."
            action={
              <ButtonLink href="/properties?listingType=sale" variant="outline" iconRight={ArrowRight}>
                View all for sale
              </ButtonLink>
            }
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property, index) => (
              <Reveal key={property.id} delay={(index % 3) * 0.06}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4">
            <p className="flex items-center gap-2 text-[12px] text-muted">
              <Sparkles className="size-4 text-brass" />
              Looking for something specific? Send us a brief and we&apos;ll shortlist off-market options.
            </p>
            <Link href="/contact" className="flex items-center gap-1.5 text-xs font-bold text-forest transition hover:text-brass">
              Start a search brief <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="New launches"
            title="Three projects, three different bets."
            description="A low-density Sector 150 address, a value-led Noida Extension launch and a ready-to-move Greater Noida community."
            action={
              <ButtonLink href="/projects" variant="outline" iconRight={ArrowRight}>
                All new projects
              </ButtonLink>
            }
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.07}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial / approach ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-forest py-16 text-cream sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-[360px] rounded-full border border-white/10" />
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-white/15">
                <Image
                  src={img.heroSecondary}
                  alt="A verified home exterior in Delhi NCR"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/50 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-2 w-[220px] rounded-2xl border border-line bg-cream p-4 text-forest shadow-soft sm:right-6">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-brass" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em]">Verified inventory</p>
                </div>
                <p className="mt-2 font-serif text-3xl leading-none">24 / 24</p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted">
                  homes in this demo carry a verified owner or agent mandate.
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              tone="light"
              eyebrow="The Horizon way"
              title="Local knowledge, not a lead funnel."
              description="We are an agency and a marketplace — which means we can show you the homes that fit, and tell you when none of them do."
            />
            <div className="mt-8 space-y-5">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4 border-t border-white/12 pt-5">
                  <span className="font-serif text-lg text-brass-light">{step.number}</span>
                  <div>
                    <h3 className="text-lg text-cream">{step.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-cream/60">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services" variant="brass" iconRight={ArrowRight}>
                How we can help
              </ButtonLink>
              <ButtonLink href="/agents" variant="light">
                Meet the team
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Locality spotlight ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Know the ground"
            title="A locality is more than a pin on a map."
            description="Average prices, metro distances and the honest trade-offs — before you book the site visit."
            action={
              <ButtonLink href="/cities/noida" variant="outline" iconRight={ArrowRight}>
                Explore localities
              </ButtonLink>
            }
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spotlights.map((locality, index) => (
              <Reveal key={`${locality.city}-${locality.slug}`} delay={(index % 3) * 0.05}>
                <Link
                  href={`/cities/${locality.city}/${locality.slug}`}
                  className="group flex overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-forest/20 hover:shadow-card"
                >
                  <div className="relative w-[42%] shrink-0 overflow-hidden bg-sand">
                    <Image
                      src={locality.image}
                      alt={`${locality.name}, ${locality.cityName}`}
                      fill
                      sizes="(max-width: 640px) 42vw, 200px"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brass">{locality.cityName}</p>
                    <h3 className="mt-1 text-lg leading-tight text-forest">{locality.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                      <MapPin className="size-3" /> {locality.metro}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted">Avg. price</p>
                        <p className="text-[13px] font-bold text-forest">{locality.avgPrice}</p>
                      </div>
                      <span className="flex items-center gap-0.5 rounded-full bg-[#e9f0e7] px-2 py-1 text-[9px] font-bold text-[#33603f]">
                        <TrendingUp className="size-3" /> {locality.priceTrend}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMI band ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-forest-dark py-16 text-cream sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brass-light">
              <span className="h-px w-6 bg-brass-light/60" /> Plan before you visit
            </p>
            <h2 className="display-balance mt-3 text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-cream">
              Run the numbers before the site visit.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/65">
              A ₹2.5 crore home is not just a ₹2.5 crore decision. Factor in the down payment, EMI, stamp duty,
              registration and GST so the monthly number is never a surprise.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "EMI with principal and interest split",
                "Delhi vs Uttar Pradesh stamp duty tabs",
                "GST for under-construction vs ready homes",
                "Area converter for sq ft, sq yd and sq m",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2.5 text-[13px] text-cream/75">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brass-light" />
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-7">
              <ButtonLink href="/calculators" variant="brass" icon={Building2} iconRight={ArrowRight}>
                Open calculators
              </ButtonLink>
            </div>
          </div>
          <Reveal>
            <EmiTeaser />
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client notes"
            title="The best compliment is a referral."
            description="A few words from buyers, sellers and tenants across Delhi NCR. Names and details are illustrative for this demo."
            action={
              <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-3.5 fill-brass text-brass" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-forest">4.9 / 5 · 380 reviews</span>
              </div>
            }
          />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 0.06}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, star) => (
                      <Star key={star} className="size-3.5 fill-brass text-brass" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-forest/85">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-forest">{testimonial.name}</p>
                      <p className="text-[10px] text-muted">{testimonial.city}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agents ─────────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-sand/45 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="The people"
            title="Meet the specialists on the ground."
            description="Small teams, specific sectors, real accountability. Every advisor is RERA-registered and works a defined patch."
            action={
              <ButtonLink href="/agents" variant="outline" iconRight={ArrowRight}>
                All advisors
              </ButtonLink>
            }
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {homeAgents.map((agent, index) => (
              <Reveal key={agent.id} delay={index * 0.06}>
                <Link
                  href={`/agents/${agent.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-forest/20 hover:shadow-card"
                >
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={64}
                    height={64}
                    className="size-16 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-forest">{agent.name}</p>
                    <p className="truncate text-[10px] font-semibold text-brass">{agent.agency}</p>
                    <p className="mt-1 flex items-center gap-1 truncate text-[10px] text-muted">
                      <MapPin className="size-3 shrink-0" /> {agent.areas.slice(0, 2).join(" · ")}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1 text-[10px] text-muted">
                      <Star className="size-3 fill-brass text-brass" /> {agent.rating} · {agent.experience}
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted/50 transition group-hover:text-brass" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journal ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Horizon Journal"
            title="Research you can use before you decide."
            action={
              <ButtonLink href="/blog" variant="outline" iconRight={ArrowRight}>
                All articles
              </ButtonLink>
            }
          />
          <div className="mt-9">
            <BlogCard post={featuredPost} featured />
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {sidePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-forest-dark">
        <Image
          src={img.heroSecondary}
          alt="A home in Delhi NCR"
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/80 to-forest-dark/30" />
        <div className="container-page relative z-10 grid gap-8 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow text-brass-light">Thinking of selling?</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-cream">
              Start with a valuation you can defend.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/65">
              A data-backed estimate, a realistic pricing range and a plan to reach the right buyers — not just a
              number that wins the listing.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/home-valuation" variant="brass" size="lg" iconRight={ArrowRight}>
                Get a free valuation
              </ButtonLink>
              <ButtonLink href="/list-property" variant="light" size="lg" icon={Users}>
                List your property
              </ButtonLink>
            </div>
          </div>
          <div className="relative rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass-light">This month in NCR</p>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="font-serif text-2xl text-cream">+9.4%</p>
                <p className="text-[10px] text-cream/50">Noida avg. price growth YoY</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-cream">4.1%</p>
                <p className="text-[10px] text-cream/50">Gross rental yield, Noida Ext.</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-cream">₹12.5k</p>
                <p className="text-[10px] text-cream/50">Sector 150 avg. / sq ft</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-cream">18 km</p>
                <p className="text-[10px] text-cream/50">YEIDA to Jewar Airport</p>
              </div>
            </div>
            <p className="mt-4 border-t border-white/10 pt-3 text-[9px] leading-relaxed text-cream/40">
              Illustrative demo data compiled for this presentation. Not investment advice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
