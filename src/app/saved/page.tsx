"use client";

import Link from "next/link";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { properties } from "@/data/properties";
import { useSaved } from "@/components/providers/SavedProvider";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SavedPage() {
  const { saved, clearSaved } = useSaved();
  const savedProperties = properties.filter((property) => saved.includes(property.slug));

  return (
    <div className="min-h-[70vh] bg-cream">
      <div className="border-b border-line bg-sand/50">
        <div className="container-page py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Saved homes" }]} />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-brass">Your shortlist</p>
              <h1 className="mt-2 text-[clamp(2rem,4vw,2.8rem)] leading-tight text-forest">Saved homes</h1>
              <p className="mt-1.5 text-sm text-muted">
                {savedProperties.length
                  ? `${savedProperties.length} ${savedProperties.length === 1 ? "home" : "homes"} saved in this demo session.`
                  : "Homes you save will appear here for this demo session."}
              </p>
            </div>
            {savedProperties.length ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={Trash2} onClick={clearSaved}>
                  Clear all
                </Button>
                <ButtonLink href="/compare" size="sm" iconRight={ArrowRight}>
                  Compare shortlist
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        {savedProperties.length ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4 sm:flex-row">
              <p className="text-[12px] text-muted">
                Like these? Send the shortlist to an advisor and we&apos;ll add off-market options.
              </p>
              <ButtonLink href="/contact" variant="outline" size="sm" iconRight={ArrowRight}>
                Share my shortlist
              </ButtonLink>
            </div>
          </>
        ) : (
          <EmptyState
            icon={<Heart className="size-6" />}
            title="No saved homes yet"
            description="Tap the heart on any listing to build a shortlist. Saved homes stay here for this demo session."
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <ButtonLink href="/properties" iconRight={ArrowRight}>
                  Browse homes
                </ButtonLink>
                <ButtonLink href="/projects" variant="outline">
                  Explore projects
                </ButtonLink>
              </div>
            }
          />
        )}

        {savedProperties.length ? (
          <div className="mt-14">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="eyebrow text-brass">Keep exploring</p>
                <h2 className="mt-2 text-xl text-forest">More homes worth a look</h2>
              </div>
              <Link href="/properties" className="flex items-center gap-1 text-[11px] font-bold text-forest hover:text-brass">
                View all <ArrowRight className="size-3" />
              </Link>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {properties
                .filter((property) => !saved.includes(property.slug) && property.featured)
                .slice(0, 3)
                .map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
