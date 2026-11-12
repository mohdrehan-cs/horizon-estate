import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Compass,
  Landmark,
  MapPin,
  Route,
  TrainFront,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { cities, getCity, getLocality } from "@/data/cities";
import { propertiesByCity, propertiesByLocality } from "@/data/properties";
import { agents } from "@/data/agents";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MapView } from "@/components/property/MapView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return cities.flatMap((city) =>
    city.localities.map((locality) => ({ city: city.slug, locality: locality.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; locality: string }>;
}): Promise<Metadata> {
  const { city: citySlug, locality: localitySlug } = await params;
  const city = getCity(citySlug);
  const locality = getLocality(citySlug, localitySlug);
  if (!city || !locality) return { title: "Locality not found" };
  return {
    title: `Property in ${locality.name}, ${city.name} — prices & listings`,
    description: `${locality.description.slice(0, 150)} Average price ${locality.avgPrice}, ${locality.priceTrend}.`,
    openGraph: {
      title: `Property in ${locality.name}, ${city.name}`,
      description: locality.description.slice(0, 160),
      images: [{ url: locality.image }],
    },
  };
}

export default async function LocalityPage({
  params,
}: {
  params: Promise<{ city: string; locality: string }>;
}) {
  const { city: citySlug, locality: localitySlug } = await params;
  const city = getCity(citySlug);
  const locality = getLocality(citySlug, localitySlug);
  if (!city || !locality) notFound();

  const localProperties = propertiesByLocality(locality.slug);
  const cityProperties = propertiesByCity(city.slug);
  const listings = localProperties.length ? localProperties : cityProperties.slice(0, 3);
  const agent =
    agents.find((item) => item.areas.some((area) => area.toLowerCase() === locality.name.toLowerCase())) ??
    agents.find((item) => item.city === city.slug) ??
    agents[0];
  const otherLocalities = city.localities.filter((item) => item.slug !== locality.slug);

  return (
    <div className="bg-cream pb-20">
      <section className="relative isolate overflow-hidden bg-forest-dark">
        <Image
          src={locality.image}
          alt={`${locality.name}, ${city.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/80 to-forest-dark/20" />
        <div className="container-page relative z-10 py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: city.name, href: `/cities/${city.slug}` },
              { label: locality.name },
            ]}
            className="[&_a]:text-cream/60 [&_span]:text-cream/80"
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="text-cream">
              <p className="eyebrow text-brass-light">
                {city.name} · {city.state}
              </p>
              <h1 className="display-balance mt-3 text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.04]">
                {locality.name}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/70">{locality.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="white">
                  <TrainFront className="size-3" /> {locality.metro}
                </Badge>
                <Badge variant="brass">{locality.rentalYield} rental yield</Badge>
                <Badge variant="success">{localProperties.length} listings here</Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">Avg. price</p>
                <p className="mt-1 text-[13px] font-bold text-cream">{locality.avgPrice}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">YoY trend</p>
                <p className="mt-1 flex items-center gap-1 text-[13px] font-bold text-brass-light">
                  <TrendingUp className="size-3" /> {locality.priceTrend.replace(" YoY", "")}
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-cream/45">Rental yield</p>
                <p className="mt-1 text-[13px] font-bold text-cream">{locality.rentalYield}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          {[
            { icon: Wallet, label: "Average price", value: locality.avgPrice },
            { icon: TrendingUp, label: "Price trend", value: locality.priceTrend },
            { icon: TrainFront, label: "Nearest metro", value: locality.metro },
            { icon: Building2, label: "Demo listings", value: `${localProperties.length} active` },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3 px-2 py-3 sm:px-5">
                <Icon className="size-4 shrink-0 text-brass" />
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-bold text-forest">{stat.value}</p>
                  <p className="text-[10px] text-muted">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <section>
            <h2 className="text-2xl text-forest">The neighbourhood, honestly</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              {locality.name} sits within {city.name} and is best understood through its daily rhythm — how you get to
              work, where children go to school, and what the market does when the broader cycle slows. The numbers below
              are demo estimates for this presentation.
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {locality.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3">
                  <BadgeCheck className="size-4 shrink-0 text-brass" />
                  <p className="text-[12px] font-semibold text-forest">{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-forest">
                <Route className="size-3.5 text-brass" /> Connectivity
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{locality.connectivity}</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-forest">
                <Landmark className="size-3.5 text-brass" /> Landmarks
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {locality.landmarks.map((landmark) => (
                  <span key={landmark} className="rounded-full bg-sand px-2.5 py-1 text-[10px] text-forest">
                    {landmark}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10">
            <SectionHeading
              eyebrow="On the market"
              title={localProperties.length ? `Homes in ${locality.name}` : `Nearby homes in ${city.name}`}
              description={
                localProperties.length
                  ? "A small, verified selection. Use compare to see how they stack up."
                  : "No active demo listings in this locality right now — here are the closest alternatives in the city."
              }
            />
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {listings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="mt-5">
              <ButtonLink href={`/properties?city=${city.slug}&locality=${locality.slug}`} variant="outline" iconRight={ArrowRight}>
                Search {locality.name} with filters
              </ButtonLink>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl text-forest">Where it sits</h2>
            <div className="mt-4">
              <MapView
                properties={listings.map((property) => ({
                  slug: property.slug,
                  title: property.title,
                  price: property.price,
                  listingType: property.listingType,
                  lat: property.lat,
                  lng: property.lng,
                  locality: property.locality,
                }))}
                center={[locality.lat, locality.lng]}
                zoom={13}
                className="h-[360px]"
              />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[10px] text-muted">
              <MapPin className="size-3 text-brass" /> Approximate pins; verify exact locations during a site visit.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl text-forest">Other {city.name} localities</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {otherLocalities.slice(0, 6).map((item) => (
                <Link
                  key={item.slug}
                  href={`/cities/${city.slug}/${item.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 transition hover:border-forest/25"
                >
                  <div>
                    <p className="text-[12px] font-bold text-forest">{item.name}</p>
                    <p className="text-[10px] text-muted">
                      {item.avgPrice} · {item.priceTrend}
                    </p>
                  </div>
                  <ArrowRight className="size-3.5 text-muted transition group-hover:text-brass" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-line bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Locality specialist</p>
            <div className="mt-3 flex items-center gap-3">
              <Image src={agent.avatar} alt={agent.name} width={56} height={56} className="size-14 rounded-2xl object-cover" />
              <div>
                <p className="text-sm font-bold text-forest">{agent.name}</p>
                <p className="text-[10px] text-muted">{agent.agency}</p>
                <p className="mt-0.5 text-[10px] text-muted">RERA {agent.rera}</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              Works across {agent.areas.slice(0, 3).join(", ")}. Ask for the streets that flood, the towers with delivery
              delays, and the resale that actually clears.
            </p>
            <div className="mt-4 grid gap-2">
              <ButtonLink href={`/agents/${agent.slug}`} variant="primary" size="sm" iconRight={ArrowRight}>
                Talk to {agent.name.split(" ")[0]}
              </ButtonLink>
              <a
                href={siteConfig.phoneHref}
                className="flex h-9 items-center justify-center rounded-full border border-line text-[11px] font-bold text-forest"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-forest p-5 text-cream">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Price check</p>
            <p className="mt-2 font-serif text-2xl leading-tight">Is your {locality.name} quote fair?</p>
            <p className="mt-2 text-[11px] leading-relaxed text-cream/60">
              Send us the listing. We&apos;ll compare it with recent transactions and tell you where it sits.
            </p>
            <ButtonLink href="/home-valuation" variant="brass" size="sm" className="mt-4 w-full" iconRight={ArrowRight}>
              Get a valuation
            </ButtonLink>
          </div>

          <div className="rounded-3xl border border-line bg-sand/60 p-5">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-forest">
              <Compass className="size-3.5 text-brass" /> Good to know
            </p>
            <ul className="mt-2 space-y-2 text-[10px] leading-relaxed text-muted">
              <li>Average prices are indicative and vary by tower, floor and age.</li>
              <li>Metro distances are approximate road distances.</li>
              <li>Always verify title, approvals and dues before paying token money.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
