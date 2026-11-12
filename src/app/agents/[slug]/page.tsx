import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Building2, Globe2, Languages, MapPin, Phone, Star } from "lucide-react";
import { agents, getAgentBySlug } from "@/data/agents";
import { properties } from "@/data/properties";
import { getCityName } from "@/data/cities";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyCard } from "@/components/property/PropertyCard";
import { EnquiryForm } from "@/components/leads/EnquiryForm";

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) return { title: "Advisor not found" };
  return {
    title: `${agent.name} — ${agent.role}`,
    description: agent.bio.slice(0, 160),
    openGraph: { title: agent.name, description: agent.bio.slice(0, 160), images: [{ url: agent.avatar }] },
  };
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const listings = properties.filter((property) => property.agentId === agent.id);
  const reviews = testimonials.slice(0, 3);

  return (
    <div className="bg-cream pb-20">
      <div className="container-page pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Advisors", href: "/agents" },
            { label: agent.name },
          ]}
        />
      </div>

      <section className="container-page mt-5">
        <div className="overflow-hidden rounded-3xl border border-line bg-white">
          <div className="h-28 bg-forest sm:h-36">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,rgba(217,178,107,0.35),transparent_55%)]" />
          </div>
          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={112}
                    height={112}
                    className="size-[104px] rounded-2xl border-4 border-white object-cover shadow-card sm:size-28"
                  />
                  {agent.verified ? (
                    <span className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full border-2 border-white bg-forest text-cream">
                      <BadgeCheck className="size-4" />
                    </span>
                  ) : null}
                </div>
                <div className="pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">{agent.agency}</p>
                  <h1 className="mt-0.5 text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight text-forest">{agent.name}</h1>
                  <p className="text-xs text-muted">{agent.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pb-1">
                <ButtonLink href="#enquire" variant="primary" size="sm" icon={Phone}>
                  Contact
                </ButtonLink>
                <ButtonLink href="/properties" variant="outline" size="sm" iconRight={ArrowRight}>
                  Browse homes
                </ButtonLink>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge variant="brass">
                <Star className="size-3 fill-current" /> {agent.rating} · {agent.reviews} reviews
              </Badge>
              <Badge variant="sand">{agent.experience} experience</Badge>
              <Badge variant="outline">RERA {agent.rera}</Badge>
              <Badge variant="outline">
                <MapPin className="size-3" /> {getCityName(agent.city)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <section>
              <h2 className="text-2xl text-forest">About {agent.name.split(" ")[0]}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{agent.bio}</p>
            </section>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: agent.listings, label: "Active listings" },
                { value: agent.deals, label: "Closed value" },
                { value: `${agent.rating}/5`, label: "Client rating" },
                { value: agent.experience.replace(" years", ""), label: "Years" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-white p-4 text-center">
                  <p className="text-lg font-extrabold text-forest">{stat.value}</p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-wider text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <section className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-forest">
                  <MapPin className="size-3.5 text-brass" /> Areas covered
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {agent.areas.map((area) => (
                    <span key={area} className="rounded-full bg-sand px-3 py-1.5 text-[10px] font-semibold text-forest">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-forest">
                  <Languages className="size-3.5 text-brass" /> Languages
                </p>
                <p className="mt-3 text-[12px] text-muted">{agent.languages.join(" · ")}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted">
                  <Globe2 className="size-3 text-brass" /> NRI conversations welcome
                </p>
              </div>
            </section>

            <section className="mt-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-2xl text-forest">Listings by {agent.name.split(" ")[0]}</h2>
                <Link href={`/properties?q=${encodeURIComponent(agent.areas[0])}`} className="flex items-center gap-1 text-[11px] font-bold text-brass">
                  All in {agent.areas[0]} <ArrowRight className="size-3" />
                </Link>
              </div>
              {listings.length ? (
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {listings.slice(0, 4).map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-line bg-white/60 p-8 text-center">
                  <Building2 className="mx-auto size-8 text-muted/40" />
                  <p className="mt-2 text-sm font-semibold text-forest">No active demo listings right now</p>
                  <p className="mt-1 text-[11px] text-muted">Speak to {agent.name.split(" ")[0]} about off-market options.</p>
                </div>
              )}
            </section>

            <section className="mt-10">
              <h2 className="text-2xl text-forest">What clients say</h2>
              <div className="mt-4 space-y-3">
                {reviews.map((review) => (
                  <figure key={review.id} className="rounded-2xl border border-line bg-white p-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star key={index} className="size-3.5 fill-brass text-brass" />
                      ))}
                    </div>
                    <blockquote className="mt-2 text-[13px] leading-relaxed text-forest/80">“{review.quote}”</blockquote>
                    <figcaption className="mt-3 flex items-center gap-2 text-[10px] text-muted">
                      <Image src={review.avatar} alt={review.name} width={24} height={24} className="size-6 rounded-full object-cover" />
                      <span className="font-semibold text-forest">{review.name}</span> · {review.city}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-muted">Review content is illustrative for this demo and not attributed to real clients.</p>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div id="enquire" className="scroll-mt-28 rounded-3xl border border-line bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Work with {agent.name.split(" ")[0]}</p>
              <h2 className="mt-2 text-xl text-forest">Tell us what you need.</h2>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                A short brief is enough. {agent.name.split(" ")[0]} will reply with three options and honest notes.
              </p>
              <EnquiryForm agentName={agent.name} className="mt-4" compact />
            </div>

            <div className="rounded-3xl bg-forest p-5 text-cream">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Direct line</p>
              <a href={agent.phone ? `tel:${agent.phone.replace(/\s/g, "")}` : siteConfig.phoneHref} className="mt-2 block font-serif text-2xl text-cream">
                {agent.phone}
              </a>
              <p className="mt-1 text-[10px] text-cream/50">{siteConfig.hours}</p>
              <p className="mt-3 border-t border-white/10 pt-3 text-[9px] leading-relaxed text-cream/40">
                Demo contact details. In the live product, calls would route through a tracked number.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
