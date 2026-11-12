import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  CheckCircle2,
  Compass,
  IndianRupee,
  Info,
  Layers,
  MapPin,
  ScanLine,
  ShieldCheck,
  TrainFront,
  TrendingUp,
} from "lucide-react";
import { getProperty, properties, similarProperties } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { getCityName, getLocalityName } from "@/data/cities";
import { formatArea, formatDate, formatINR, formatINRFull, formatPropertyPrice, pricePerSqft } from "@/lib/format";
import { calculateEmi } from "@/lib/emi";
import { calculateStampDuty } from "@/lib/stamp-duty";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyActions } from "@/components/property/PropertyActions";
import { AgentContactCard } from "@/components/property/AgentContactCard";
import { MapView } from "@/components/property/MapView";
import { PropertyCard } from "@/components/property/PropertyCard";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.title} — ${getCityName(property.city)}`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: [{ url: property.images[0] }],
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const agent = getAgent(property.agentId);
  const cityName = getCityName(property.city);
  const similar = similarProperties(property, 3);
  const psf = pricePerSqft(property);
  const isRent = property.listingType === "rent";

  const loanAmount = Math.round(property.price * 0.8);
  const emi = calculateEmi(loanAmount, 8.5, 20);
  const stampState = property.city === "delhi" ? "delhi" : "uttar-pradesh";
  const stamp = calculateStampDuty({
    state: stampState,
    buyer: "male",
    propertyValue: property.price,
    underConstruction: property.possession !== "Ready to move",
    affordable: property.price <= 4500000,
  });

  const facts = [
    { icon: BedDouble, label: "Bedrooms", value: property.bhk ? `${property.bhk} BHK` : "—" },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms ? String(property.bathrooms) : "—" },
    {
      icon: ScanLine,
      label: "Built-up area",
      value: formatArea(property.builtupArea, property.areaUnit),
    },
    {
      icon: Layers,
      label: "Floor",
      value:
        property.type === "Plot"
          ? "Plot"
          : property.floor !== undefined
            ? `${property.floor === 0 ? "Ground" : property.floor}${property.totalFloors ? ` of ${property.totalFloors}` : ""}`
            : "—",
    },
  ];

  const details = [
    { label: "Property type", value: property.type },
    { label: "Transaction", value: property.transaction },
    { label: "Furnishing", value: property.furnishing },
    { label: "Possession", value: property.possession },
    { label: "Facing", value: property.facing ?? "—" },
    { label: "Age", value: property.age ?? "—" },
    { label: "Ownership", value: property.ownership },
    { label: "Authority", value: property.authority ?? "—" },
    { label: "Carpet area", value: property.carpetArea ? formatArea(property.carpetArea, property.areaUnit) : "On request" },
    { label: "Balconies", value: property.balconies ? String(property.balconies) : "—" },
    ...(property.maintenance ? [{ label: "Maintenance", value: `${formatINRFull(property.maintenance)}/month` }] : []),
    ...(property.deposit ? [{ label: "Security deposit", value: formatINRFull(property.deposit) }] : []),
    ...(property.reraNumber ? [{ label: "RERA number", value: property.reraNumber }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: property.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: cityName,
      addressRegion: property.city === "delhi" ? "Delhi" : "Uttar Pradesh",
      addressCountry: "IN",
    },
    numberOfRooms: property.bhk,
    floorSize: { "@type": "QuantitativeValue", value: property.builtupArea, unitCode: "FTK" },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="bg-cream pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-page pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Properties", href: "/properties" },
            { label: cityName, href: `/cities/${property.city}` },
            { label: getLocalityName(property.city, property.locality) },
          ]}
        />
      </div>

      <div className="container-page mt-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="forest">{isRent ? "For rent" : "For sale"}</Badge>
              {property.verified ? <Badge variant="success">Verified</Badge> : null}
              {property.reraNumber ? <Badge variant="brass">RERA registered</Badge> : null}
              {property.isNew ? <Badge variant="terracotta">New listing</Badge> : null}
            </div>
            <h1 className="display-balance mt-3 text-[clamp(1.75rem,3.6vw,2.7rem)] leading-[1.12] text-forest">
              {property.title}
            </h1>
            <p className="mt-2 flex items-start gap-1.5 text-sm text-muted">
              <MapPin className="mt-0.5 size-4 shrink-0" /> {property.address}
            </p>
            <p className="mt-2 text-[11px] text-muted">
              Listed {formatDate(property.postedAt)} · {property.views.toLocaleString("en-IN")} views ·{" "}
              {property.saves} saves · Ref {property.id.toUpperCase()}
            </p>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="font-serif text-[clamp(2rem,4vw,2.8rem)] leading-none text-forest">
              {formatPropertyPrice(property)}
            </p>
            <p className="mt-1.5 text-xs text-muted">
              {isRent
                ? `${formatINRFull(property.deposit ?? 0)} deposit · ${property.brokerage ?? "No brokerage"}`
                : psf
                  ? `₹${psf.toLocaleString("en-IN")} per sq ft · ${formatArea(property.builtupArea, property.areaUnit)}`
                  : ""}
            </p>
            <div className="mt-4 flex lg:justify-end">
              <PropertyActions property={property} />
            </div>
          </div>
        </div>

        <div className="mt-7">
          <PropertyGallery images={property.images} title={property.title} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="rounded-2xl border border-line bg-white p-4">
                    <Icon className="size-4 text-brass" />
                    <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-muted">{fact.label}</p>
                    <p className="mt-0.5 text-[13px] font-bold text-forest">{fact.value}</p>
                  </div>
                );
              })}
            </div>

            <section className="mt-10">
              <h2 className="text-2xl text-forest">About this home</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{property.description}</p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {property.highlights.map((highlight) => (
                  <p key={highlight} className="flex items-start gap-2 text-[13px] text-forest">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brass" />
                    {highlight}
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl text-forest">Property details</h2>
              <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-0 rounded-2xl border border-line bg-white px-5 sm:grid-cols-3">
                {details.map((detail) => (
                  <div key={detail.label} className="border-b border-line/70 py-3.5">
                    <dt className="text-[10px] uppercase tracking-[0.1em] text-muted">{detail.label}</dt>
                    <dd className="mt-1 text-[12px] font-semibold text-forest">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl text-forest">Amenities &amp; features</h2>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-[11px] font-medium text-forest"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-sand">
                      <CheckCircle2 className="size-3 text-brass" />
                    </span>
                    {amenity}
                  </div>
                ))}
                {property.amenities.includes("Covered Parking") ? (
                  <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-[11px] font-medium text-forest">
                    <span className="grid size-5 place-items-center rounded-full bg-sand">
                      <Car className="size-3 text-brass" />
                    </span>
                    Dedicated parking
                  </div>
                ) : null}
                {property.facing ? (
                  <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-[11px] font-medium text-forest">
                    <span className="grid size-5 place-items-center rounded-full bg-sand">
                      <Compass className="size-3 text-brass" />
                    </span>
                    {property.facing}-facing
                  </div>
                ) : null}
              </div>
            </section>

            <section className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-2xl text-forest">Location &amp; connectivity</h2>
                <p className="flex items-center gap-1.5 text-[11px] text-muted">
                  <TrainFront className="size-3.5 text-brass" /> {property.metro.station} · {property.metro.distance} ·{" "}
                  {property.metro.line}
                </p>
              </div>
              <div className="mt-4">
                <MapView
                  properties={[property]}
                  center={[property.lat, property.lng]}
                  zoom={14}
                  className="h-[340px]"
                  activeSlug={property.slug}
                />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {property.nearby.map((place) => (
                  <div key={place.name} className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brass" />
                    <div>
                      <p className="text-[11px] font-semibold text-forest">{place.name}</p>
                      <p className="text-[10px] text-muted">
                        {place.type} · {place.distance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {property.priceHistory?.length ? (
              <section className="mt-10">
                <h2 className="text-2xl text-forest">Price history</h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
                  {property.priceHistory.map((entry, index) => (
                    <div
                      key={entry.date}
                      className="flex items-center justify-between gap-4 border-b border-line/70 px-4 py-3 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-full bg-sand">
                          <TrendingUp className="size-3.5 text-brass" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold text-forest">{entry.event}</p>
                          <p className="text-[10px] text-muted">{formatDate(entry.date)}</p>
                        </div>
                      </div>
                      <p className="text-[12px] font-bold text-forest">{formatINR(entry.price)}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-sand/60 p-4">
              <Info className="mt-0.5 size-4 shrink-0 text-brass" />
              <p className="text-[10px] leading-relaxed text-muted">
                This is a demonstration listing. Details, images and prices are illustrative and do not constitute an
                offer. In a live listing, RERA numbers, title documents and owner mandates would be verified before
                publication.
              </p>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {agent ? <AgentContactCard agent={agent} propertyTitle={property.title} /> : null}

            {!isRent ? (
              <>
                <div className="rounded-3xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-forest">
                      <IndianRupee className="size-3.5 text-brass" /> Home loan estimate
                    </p>
                    <Badge variant="outline">Indicative</Badge>
                  </div>
                  <p className="mt-3 font-serif text-3xl leading-none text-forest">{formatINRFull(emi.emi)}</p>
                  <p className="mt-1 text-[10px] text-muted">per month · 80% loan at 8.5% for 20 years</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sand">
                    <div className="flex h-full">
                      <span className="h-full bg-brass" style={{ width: `${emi.principalShare}%` }} />
                      <span className="h-full bg-terracotta/70" style={{ width: `${emi.interestShare}%` }} />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-[9px] text-muted">
                    <span>Principal {Math.round(emi.principalShare)}%</span>
                    <span>Interest {Math.round(emi.interestShare)}%</span>
                  </div>
                  <ButtonLink href="/calculators" variant="outline" size="sm" className="mt-4 w-full" iconRight={ArrowRight}>
                    Calculate precisely
                  </ButtonLink>
                </div>

                <div className="rounded-3xl border border-line bg-white p-5">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-forest">
                    <ShieldCheck className="size-3.5 text-brass" /> Buying costs
                  </p>
                  <p className="mt-1 text-[10px] text-muted">
                    Estimated for a male buyer in {property.city === "delhi" ? "Delhi" : "Uttar Pradesh"}.
                  </p>
                  <div className="mt-3 space-y-2 text-[11px]">
                    <div className="flex justify-between gap-3">
                      <span className="text-muted">Stamp duty ({stamp.stampDutyRate}%)</span>
                      <span className="font-semibold text-forest">{formatINR(stamp.stampDuty)}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-muted">Registration (1%)</span>
                      <span className="font-semibold text-forest">{formatINR(stamp.registration)}</span>
                    </div>
                    {stamp.gst > 0 ? (
                      <div className="flex justify-between gap-3">
                        <span className="text-muted">GST ({stamp.gstRate}%)</span>
                        <span className="font-semibold text-forest">{formatINR(stamp.gst)}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between gap-3 border-t border-line pt-2">
                      <span className="font-semibold text-forest">Estimated total</span>
                      <span className="font-bold text-brass">{formatINR(stamp.total)}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[9px] leading-relaxed text-muted">
                    Before maintenance deposit, brokerage and interiors. Verify current rates before registration.
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-line bg-white p-5">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-forest">
                  <CalendarDays className="size-3.5 text-brass" /> Rental snapshot
                </p>
                <div className="mt-3 space-y-2 text-[11px]">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted">Monthly rent</span>
                    <span className="font-semibold text-forest">{formatINRFull(property.price)}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted">Security deposit</span>
                    <span className="font-semibold text-forest">{formatINRFull(property.deposit ?? 0)}</span>
                  </div>
                  <div className="flex justify-between gap-3 border-t border-line pt-2">
                    <span className="text-muted">Brokerage</span>
                    <span className="font-semibold text-forest">{property.brokerage ?? "—"}</span>
                  </div>
                </div>
                <p className="mt-2 text-[9px] leading-relaxed text-muted">
                  Rent is exclusive of electricity, water and society charges unless stated.
                </p>
              </div>
            )}

            <div className="rounded-3xl border border-forest/15 bg-forest p-5 text-cream">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Not quite right?</p>
              <p className="mt-2 font-serif text-xl leading-tight text-cream">
                Tell us what you actually need.
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-cream/60">
                We&apos;ll shortlist three better-fit homes and flag the trade-offs — even if that means waiting.
              </p>
              <ButtonLink href="/contact" variant="light" size="sm" className="mt-4 w-full" iconRight={ArrowRight}>
                Start a search brief
              </ButtonLink>
            </div>
          </aside>
        </div>
      </div>

      <section className="container-page mt-16 border-t border-line pt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-brass">Keep comparing</p>
            <h2 className="mt-2 text-2xl text-forest">Similar homes you may like</h2>
          </div>
          <Link href={`/cities/${property.city}`} className="flex items-center gap-1.5 text-xs font-bold text-forest hover:text-brass">
            More in {cityName} <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      </section>

      <section className="container-page mt-12">
        <div className="grid gap-4 rounded-3xl border border-line bg-sand/60 p-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 text-brass" />
            <div>
              <p className="text-xs font-bold text-forest">Verified mandate</p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted">Owner or agent mandate checked before listing.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 size-5 text-brass" />
            <div>
              <p className="text-xs font-bold text-forest">RERA-aware</p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted">
                {property.reraNumber ? property.reraNumber : "Resale / ready property — RERA project registration not applicable."}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 text-brass" />
            <div>
              <p className="text-xs font-bold text-forest">No lead resale</p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted">Your enquiry goes to one accountable advisor, not ten.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
