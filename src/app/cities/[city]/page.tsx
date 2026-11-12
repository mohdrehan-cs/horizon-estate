import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Compass,
  MapPin,
  TrendingUp,
  TrainFront,
} from "lucide-react";
import { cities, getCity } from "@/data/cities";
import { propertiesByCity } from "@/data/properties";
import { blogPosts } from "@/data/blog";
import { img } from "@/data/images";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PropertyCard } from "@/components/property/PropertyCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return { title: "City not found" };
  return {
    title: `Property in ${city.name} — projects, resale & rentals`,
    description: `Explore verified property in ${city.name}. Locality guides, average prices, new projects and homes for sale or rent across ${city.name}.`,
    openGraph: { title: `Property in ${city.name}`, description: city.description.slice(0, 160), images: [{ url: city.image }] },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const cityProperties = propertiesByCity(city.slug);
  const forSale = cityProperties.filter((property) => property.listingType === "sale");
  const featured = [...forSale].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 6);
  const relatedPosts = blogPosts.filter((post) => post.tags.includes(city.name)).slice(0, 2);

  return (
    <div className="bg-cream">
      <section className="relative isolate overflow-hidden bg-forest-dark">
        <Image src={city.image} alt={`Property in ${city.name}`} fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/80 to-forest-dark/25" />
        <div className="container-page relative z-10 py-14 sm:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/properties" }, { label: city.name }]}
            className="[&_a]:text-cream/60 [&_span]:text-cream/80"
          />
          <div className="mt-6 max-w-2xl text-cream">
            <div className="flex flex-wrap gap-2">
              <Badge variant="white">{city.state}</Badge>
              <Badge variant="brass">{cityProperties.length} demo listings</Badge>
              <Badge variant="success">RERA-aware</Badge>
            </div>
            <h1 className="display-balance mt-4 text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.02]">
              Property in {city.name}
            </h1>
            <p className="mt-2 font-serif text-lg text-brass-light">{city.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">{city.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`/properties?city=${city.slug}&listingType=sale`} variant="brass" iconRight={ArrowRight}>
                Homes for sale
              </ButtonLink>
              <ButtonLink href={`/properties?city=${city.slug}&listingType=rent`} variant="light">
                Rentals in {city.name}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          {[
            { label: "Active listings", value: cityProperties.length, icon: Building2 },
            { label: "Localities covered", value: city.localities.length, icon: MapPin },
            { label: "For sale", value: forSale.length, icon: BadgeCheck },
            { label: "For rent", value: cityProperties.length - forSale.length, icon: TrainFront },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3 px-2 py-3 sm:px-6">
                <Icon className="size-4 text-brass" />
                <div>
                  <p className="text-lg font-extrabold text-forest">{stat.value}</p>
                  <p className="text-[10px] text-muted">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="Go a level deeper"
            title={`The ${city.name} locality guide.`}
            description="Average prices, metro access and the character of each micro-market — written for buyers, not search engines."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {city.localities.map((locality, index) => (
              <Reveal key={locality.slug} delay={(index % 3) * 0.05}>
                <Link
                  href={`/cities/${city.slug}/${locality.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-forest/20 hover:shadow-card"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand">
                    <Image
                      src={locality.image}
                      alt={`${locality.name}, ${city.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/45 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold text-forest">
                      {locality.metro}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg text-forest">{locality.name}</h3>
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#33603f]">
                        <TrendingUp className="size-3" /> {locality.priceTrend}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted">{locality.description}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted">Average</p>
                        <p className="text-[12px] font-bold text-forest">{locality.avgPrice}</p>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-brass">
                        Explore <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand/45 py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="The city edit"
            title={`Homes we'd shortlist in ${city.name}.`}
            action={
              <ButtonLink href={`/properties?city=${city.slug}&listingType=sale`} variant="outline" iconRight={ArrowRight}>
                All {forSale.length} for sale
              </ButtonLink>
            }
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brass">Why {city.name}</p>
            <h2 className="mt-2 text-[clamp(1.7rem,3.5vw,2.4rem)] text-forest">The case for this city.</h2>
            <div className="mt-5 space-y-3">
              {city.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sand">
                    <Compass className="size-3.5 text-brass" />
                  </span>
                  <p className="text-[12px] font-semibold text-forest">{highlight}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-forest p-5 text-cream">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Local note</p>
              <p className="mt-2 text-[13px] leading-relaxed text-cream/70">
                {city.slug === "delhi"
                  ? "Delhi rewards patience. The best buys are often in buildings with clean title chains and realistic sellers — not the loudest listings."
                  : city.slug === "noida"
                    ? "Noida is a sector market. A 10-minute drive can change the price per sq ft by 30%. Compare at least three sectors before you decide."
                    : "Greater Noida is a horizon market. Buy for space and infrastructure, and be honest with yourself about the holding period."}
              </p>
              <Link href="/contact" className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-brass-light">
                Ask a local advisor <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-line" />
              <p className="eyebrow text-muted">Further reading</p>
              <span className="h-px flex-1 bg-line" />
            </div>
            {(relatedPosts.length ? relatedPosts : blogPosts.slice(0, 2)).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="relative overflow-hidden rounded-3xl">
          <Image src={img.heroSecondary} alt="Horizon Estates" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-forest-dark/85" />
          <div className="relative z-10 px-6 py-10 text-center sm:px-10">
            <p className="eyebrow text-brass-light">Looking in {city.name}?</p>
            <h2 className="mx-auto mt-2 max-w-xl text-[clamp(1.6rem,3.4vw,2.3rem)] text-cream">
              Tell us the commute, the budget and the non-negotiables.
            </h2>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" variant="brass" iconRight={ArrowRight}>
                Start a search brief
              </ButtonLink>
              <ButtonLink href="/home-valuation" variant="light">
                Value my property
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
