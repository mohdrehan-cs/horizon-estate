import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Download,
  IndianRupee,
  MapPin,
  Ruler,
  ShieldCheck,
  TrainFront,
} from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { properties } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { getCityName } from "@/data/cities";
import { formatINR } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { MapView } from "@/components/property/MapView";
import { AgentContactCard } from "@/components/property/AgentContactCard";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — ${project.locality}, ${getCityName(project.city)}`,
    description: project.description.slice(0, 160),
    openGraph: { title: project.name, description: project.description.slice(0, 160), images: [{ url: project.images[0] }] },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const agent = getAgent(project.agentId);
  const related = properties.filter((property) => property.projectId === project.slug);
  const otherProjects = projects.filter((item) => item.slug !== project.slug);
  const fallback = properties.filter((property) => property.locality === project.locality).slice(0, 3);
  const relatedListings = related.length ? related : fallback;

  const quickFacts = [
    { icon: Building2, label: "Configurations", value: project.configurations.join(" · ") },
    { icon: Ruler, label: "Inventory", value: project.units },
    { icon: TrainFront, label: "Possession", value: project.possession },
    { icon: IndianRupee, label: "Starting price", value: formatINR(project.priceFrom) },
  ];

  return (
    <div className="bg-cream pb-20">
      <div className="container-page pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.name },
          ]}
        />
      </div>

      <div className="container-page mt-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="forest">New launch</Badge>
              {project.verified ? <Badge variant="success">RERA verified</Badge> : null}
              <Badge variant="sand">{project.possession}</Badge>
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-brass">{project.developer}</p>
            <h1 className="display-balance mt-1.5 text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.05] text-forest">
              {project.name}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4" /> {project.address} · {getCityName(project.city)}
            </p>
          </div>
          <div className="shrink-0 lg:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Starting at</p>
            <p className="font-serif text-[clamp(2rem,4vw,2.8rem)] leading-none text-forest">
              {formatINR(project.priceFrom)}
            </p>
            <p className="mt-1.5 text-xs text-muted">{project.priceRange}</p>
            <div className="mt-4 flex flex-wrap gap-2 lg:justify-end">
              <ButtonLink href="#enquire" variant="primary" iconRight={ArrowRight}>
                Request details
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" icon={Download}>
                Brochure
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <PropertyGallery images={project.images} title={project.name} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quickFacts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className="rounded-2xl border border-line bg-white p-4">
                <Icon className="size-4 text-brass" />
                <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-muted">{fact.label}</p>
                <p className="mt-0.5 text-[12px] font-bold text-forest">{fact.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <section>
              <h2 className="text-2xl text-forest">The project</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{project.description}</p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <p key={highlight} className="flex items-start gap-2 text-[13px] text-forest">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brass" />
                    {highlight}
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl text-forest">Configurations &amp; pricing</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {project.configurations.map((config, index) => (
                  <div key={config} className="rounded-2xl border border-line bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Option {index + 1}</p>
                    <p className="mt-1 text-lg font-bold text-forest">{config}</p>
                    <p className="mt-2 text-[11px] text-muted">
                      Price on request · {index === 0 ? "Entry ticket" : index === 1 ? "Most enquired" : "Limited inventory"}
                    </p>
                    <p className="mt-3 text-[11px] font-bold text-brass">
                      {index === 0
                        ? `From ${formatINR(project.priceFrom)}`
                        : index === 1
                          ? `From ${formatINR(Math.round(project.priceFrom * 1.35))}`
                          : `From ${formatINR(Math.round(project.priceFrom * 1.7))}`}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-muted">
                Indicative demo pricing. Actual unit prices vary by floor, view and tower.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl text-forest">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {project.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-[11px] font-medium text-forest"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sand">
                      <CheckCircle2 className="size-3 text-brass" />
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl text-forest">Location</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {project.locality}, {getCityName(project.city)} — {project.address}. Use the map to sense the
                surrounding road network, metro access and daily conveniences.
              </p>
              <div className="mt-4">
                <MapView
                  properties={[
                    {
                      slug: project.slug,
                      title: project.name,
                      price: project.priceFrom,
                      listingType: "sale",
                      lat: project.lat,
                      lng: project.lng,
                      locality: project.locality,
                    },
                  ]}
                  center={[project.lat, project.lng]}
                  zoom={14}
                  className="h-[340px]"
                />
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl text-forest">RERA &amp; approvals</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-white p-4">
                  <p className="flex items-center gap-2 text-[11px] font-bold text-forest">
                    <ShieldCheck className="size-4 text-brass" /> RERA registration
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-muted">{project.reraNumber}</p>
                </div>
                <div className="rounded-2xl border border-line bg-white p-4">
                  <p className="flex items-center gap-2 text-[11px] font-bold text-forest">
                    <BadgeCheck className="size-4 text-brass" /> Developer
                  </p>
                  <p className="mt-1.5 text-[11px] text-muted">
                    {project.developer} · delivery record reviewed for this demo
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-muted">
                This is a fictional project for demonstration. RERA numbers are illustrative. Always verify a project
                registration on the relevant state RERA portal before paying any amount.
              </p>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div id="enquire" className="scroll-mt-28 rounded-3xl border border-forest/15 bg-forest p-5 text-cream">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass-light">Project desk</p>
              <h2 className="mt-2 font-serif text-2xl leading-tight">Get the floor plans and price sheet.</h2>
              <p className="mt-2 text-[11px] leading-relaxed text-cream/60">
                A project specialist will share availability, payment plans and an honest comparison with resale
                options nearby.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ButtonLink href="/contact" variant="brass" size="sm" iconRight={ArrowRight}>
                  Request a callback
                </ButtonLink>
                <span className="flex items-center gap-1 text-[9px] text-cream/45">
                  <Download className="size-3" /> Brochure on request
                </span>
              </div>
            </div>

            {agent ? <AgentContactCard agent={agent} propertyTitle={project.name} /> : null}

            <div className="rounded-3xl border border-line bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-forest">At a glance</p>
              <dl className="mt-3 space-y-2.5 text-[11px]">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Developer</dt>
                  <dd className="font-semibold text-forest">{project.developer}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Possession</dt>
                  <dd className="font-semibold text-forest">{project.possession}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Inventory</dt>
                  <dd className="font-semibold text-forest">{project.units}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Price band</dt>
                  <dd className="font-semibold text-forest">{project.priceRange}</dd>
                </div>
              </dl>
              <Link
                href="/calculators"
                className="mt-4 flex items-center justify-between rounded-xl bg-sand/70 px-3.5 py-2.5 text-[10px] font-bold text-forest transition hover:bg-sand"
              >
                Estimate stamp duty &amp; EMI <ArrowRight className="size-3.5 text-brass" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {relatedListings.length ? (
        <section className="container-page mt-16 border-t border-line pt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-brass">Available nearby</p>
              <h2 className="mt-2 text-2xl text-forest">Homes in and around {project.locality}</h2>
            </div>
            <Link href={`/properties?city=${project.city}`} className="flex items-center gap-1.5 text-xs font-bold text-forest hover:text-brass">
              View all in {getCityName(project.city)} <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedListings.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-page mt-14">
        <div>
          <p className="eyebrow text-brass">Also consider</p>
          <h2 className="mt-2 text-2xl text-forest">Other projects in the demo</h2>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {otherProjects.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
