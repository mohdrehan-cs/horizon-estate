"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Calculator,
  Clock,
  FileText,
  GitCompareArrows,
  Heart,
  Inbox,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Sparkles,
} from "lucide-react";
import type { Enquiry } from "@/types";
import { agents } from "@/data/agents";
import { enquiries } from "@/data/enquiries";
import { properties, getProperty } from "@/data/properties";
import { getCityName } from "@/data/cities";
import { formatDate } from "@/lib/format";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useSaved } from "@/components/providers/SavedProvider";
import { useCompare } from "@/components/providers/CompareProvider";
import { useDemo } from "@/components/providers/DemoProvider";

const statusVariant: Record<Enquiry["status"], "success" | "brass" | "sand" | "outline"> = {
  New: "brass",
  Contacted: "sand",
  Qualified: "success",
  Closed: "outline",
};

export default function BuyerDashboardPage() {
  const { user } = useDemo();
  const { saved } = useSaved();
  const { count: compareCount } = useCompare();
  const advisor = agents[0];
  const savedProperties = saved.map((slug) => getProperty(slug)).filter(Boolean);
  const recommended = properties.filter((property) => property.featured && property.listingType === "sale").slice(0, 3);
  const myEnquiries = enquiries.slice(0, 4);

  const stats = [
    { label: "Saved homes", value: savedProperties.length, icon: Heart, href: "/saved" },
    { label: "In comparison", value: compareCount, icon: GitCompareArrows, href: "/compare" },
    { label: "Open enquiries", value: 3, icon: Inbox, href: "#enquiries" },
    { label: "Site visits", value: 2, icon: CalendarDays, href: "#activity" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-brass">Thursday, 12 November 2026</p>
          <h1 className="mt-2 text-[clamp(1.7rem,3.6vw,2.5rem)] leading-tight text-forest">
            Good morning, {user.name.split(" ")[0]}.
          </h1>
          <p className="mt-1.5 text-[12px] text-muted">
            You have 3 open enquiries and 2 site visits this week. Here is where things stand.
          </p>
        </div>
        <ButtonLink href="/properties" iconRight={ArrowRight}>
          Find more homes
        </ButtonLink>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-2xl border border-line bg-white p-4 transition hover:border-forest/25 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-8 place-items-center rounded-lg bg-sand text-forest">
                  <Icon className="size-4" />
                </span>
                <ArrowRight className="size-3.5 text-muted/50" />
              </div>
              <p className="mt-3 font-serif text-2xl leading-none text-forest">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">Your shortlist</h2>
                <p className="text-[10px] text-muted">Homes you saved. Compare up to four at a time.</p>
              </div>
              <Link href="/saved" className="text-[10px] font-bold text-brass hover:underline">
                View all
              </Link>
            </div>
            {savedProperties.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {savedProperties.slice(0, 2).map((property) =>
                  property ? <PropertyCard key={property.slug} property={property} /> : null,
                )}
              </div>
            ) : (
              <EmptyState
                className="mt-4 border-line bg-cream/50 py-10"
                icon={<Heart className="size-5" />}
                title="Nothing saved yet"
                description="Tap the heart on any listing to start a shortlist. We will keep it here for this demo session."
                action={
                  <ButtonLink href="/properties" size="sm" iconRight={ArrowRight}>
                    Browse listings
                  </ButtonLink>
                }
              />
            )}
          </section>

          <section id="enquiries" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">Your enquiries</h2>
                <p className="text-[10px] text-muted">Replies and next steps from your advisors.</p>
              </div>
              <Badge variant="sand">{myEnquiries.length} active</Badge>
            </div>
            <div className="mt-4 divide-y divide-line">
              {myEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="flex flex-wrap items-start justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-bold text-forest">{enquiry.propertyTitle}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-muted">
                      <span>{enquiry.id}</span>
                      <span className="size-0.5 rounded-full bg-line" />
                      <span>{formatDate(enquiry.date)}</span>
                      <span className="size-0.5 rounded-full bg-line" />
                      <span>{enquiry.assignedTo}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant[enquiry.status]}>{enquiry.status}</Badge>
                    <a
                      href={`https://wa.me/919811045678`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Message advisor on WhatsApp"
                      className="grid size-7 place-items-center rounded-full bg-sand text-forest transition hover:bg-forest hover:text-cream"
                    >
                      <MessageCircle className="size-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">Picked for your brief</h2>
                <p className="text-[10px] text-muted">3 BHK, Noida &amp; South Delhi, ₹2–4 Cr, ready to move.</p>
              </div>
              <Link href="/properties" className="text-[10px] font-bold text-brass hover:underline">
                See all
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {recommended.slice(0, 2).map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </section>

          <section id="activity" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <h2 className="text-lg text-forest">Recent activity</h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  title: "Site visit confirmed",
                  note: "3 BHK in Sector 137 · Saturday, 10:30am with Sanya Kapoor",
                  date: "12 Nov",
                  icon: CalendarDays,
                },
                {
                  title: "Price revision on a saved home",
                  note: "Sunlit 3 BHK builder floor, Greater Kailash II · reduced by ₹5 L",
                  date: "11 Nov",
                  icon: Sparkles,
                },
                {
                  title: "Advisor note added",
                  note: "Aditi shared the society dues and title checklist for Saket.",
                  date: "09 Nov",
                  icon: FileText,
                },
                {
                  title: "Enquiry acknowledged",
                  note: "ENQ-1042 · Sunlit 3 BHK builder floor · WhatsApp",
                  date: "08 Nov",
                  icon: Inbox,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-sand text-forest">
                      <Icon className="size-3.5" />
                    </span>
                    <div className="min-w-0 flex-1 border-b border-line pb-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[12px] font-bold text-forest">{item.title}</p>
                        <p className="shrink-0 text-[9px] text-muted">{item.date}</p>
                      </div>
                      <p className="mt-0.5 text-[10px] leading-relaxed text-muted">{item.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-forest text-[11px] font-bold text-cream">
                {user.initials}
              </span>
              <div>
                <p className="text-[12px] font-bold text-forest">{user.name}</p>
                <p className="text-[9px] text-muted">Buyer · since {user.since}</p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 border-t border-line pt-3 text-[10px]">
              <p className="flex items-center justify-between gap-2">
                <span className="text-muted">Email</span>
                <span className="truncate font-semibold text-forest">{user.email}</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-muted">Budget</span>
                <span className="font-semibold text-forest">₹2–4 Cr</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-muted">Areas</span>
                <span className="font-semibold text-forest">South Delhi, Noida</span>
              </p>
            </div>
            <button className="mt-3 w-full rounded-full border border-line py-2 text-[10px] font-bold text-forest transition hover:border-forest/30">
              Edit preferences
            </button>
          </section>

          <section className="rounded-2xl bg-forest p-5 text-cream">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Your advisor</p>
            <div className="mt-3 flex items-center gap-3">
              <Image
                src={advisor.avatar}
                alt={advisor.name}
                width={44}
                height={44}
                className="size-11 rounded-full object-cover"
              />
              <div>
                <p className="text-[12px] font-bold">{advisor.name}</p>
                <p className="text-[9px] text-cream/55">{advisor.role}</p>
              </div>
            </div>
            <p className="mt-2 flex items-center gap-1 text-[9px] text-cream/50">
              <MapPin className="size-3" /> {advisor.areas.slice(0, 2).join(" · ")}
            </p>
            <div className="mt-3 flex gap-2">
              <a
                href={advisor.phone ? `tel:${advisor.phone.replace(/\s/g, "")}` : "#"}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/10 py-2 text-[9px] font-bold text-cream transition hover:bg-white/20"
              >
                <Phone className="size-3" /> Call
              </a>
              <a
                href="https://wa.me/919811045678"
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brass py-2 text-[9px] font-bold text-white transition hover:bg-[#a3762f]"
              >
                <MessageCircle className="size-3" /> WhatsApp
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-sand/60 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Plan before you buy</p>
            <div className="mt-3 space-y-2">
              <Link
                href="/calculators"
                className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 text-[11px] font-semibold text-forest transition hover:text-brass"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="size-3.5 text-brass" /> EMI calculator
                </span>
                <ArrowRight className="size-3" />
              </Link>
              <Link
                href="/calculators"
                className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 text-[11px] font-semibold text-forest transition hover:text-brass"
              >
                <span className="flex items-center gap-2">
                  <FileText className="size-3.5 text-brass" /> Stamp duty
                </span>
                <ArrowRight className="size-3" />
              </Link>
              <Link
                href="/home-valuation"
                className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 text-[11px] font-semibold text-forest transition hover:text-brass"
              >
                <span className="flex items-center gap-2">
                  <Clock className="size-3.5 text-brass" /> Home valuation
                </span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </section>

          <ButtonLink href="/list-property" variant="outline" size="sm" className="w-full" icon={Plus}>
            List a property instead
          </ButtonLink>
        </aside>
      </div>

      <p className="mt-8 flex items-center gap-1.5 text-[9px] text-muted">
        <Inbox className="size-3" /> Demo data only. Saved homes and comparison reset when you refresh.{" "}
        {getCityName("delhi")} · {getCityName("noida")} · {getCityName("greater-noida")}.
      </p>
    </div>
  );
}
