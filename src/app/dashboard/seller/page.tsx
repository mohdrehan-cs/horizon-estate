"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  Eye,
  Inbox,
  IndianRupee,
  MessageCircle,
  Phone,
  Plus,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import type { Enquiry } from "@/types";
import { enquiries, enquiryStats } from "@/data/enquiries";
import { properties } from "@/data/properties";
import { getAgentBySlug } from "@/data/agents";
import { getLocalityName } from "@/data/cities";
import { formatDate, formatPropertyPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useDemo } from "@/components/providers/DemoProvider";
import { useToast } from "@/components/providers/ToastProvider";

const statusVariant: Record<Enquiry["status"], "success" | "brass" | "sand" | "outline"> = {
  New: "brass",
  Contacted: "sand",
  Qualified: "success",
  Closed: "outline",
};

const extraLeads: Enquiry[] = [
  {
    id: "ENQ-1034",
    propertyTitle: "3 BHK with a golf-course view in Sector 150",
    name: "Ishita Rao",
    phone: "+91 98101 10112",
    status: "New",
    date: "2026-11-06",
    source: "WhatsApp",
    assignedTo: "Sanya Kapoor",
  },
  {
    id: "ENQ-1033",
    propertyTitle: "3 BHK in a new Noida Extension tower",
    name: "Manav Gupta",
    phone: "+91 98101 22334",
    status: "Qualified",
    date: "2026-11-05",
    source: "Property page",
    assignedTo: "Sanya Kapoor",
  },
];

const listingStatus = ["Live", "Live", "Live", "Under review", "Draft"];
const listingViews = [482, 311, 268, 96, 42];
const listingSaves = [38, 24, 21, 7, 3];

const weeks = [
  { label: "W1", value: 48 },
  { label: "W2", value: 62 },
  { label: "W3", value: 55 },
  { label: "W4", value: 71 },
  { label: "W5", value: 80 },
  { label: "W6", value: 66 },
  { label: "W7", value: 88 },
  { label: "W8", value: 100 },
];

export default function SellerDashboardPage() {
  const { user } = useDemo();
  const { toast } = useToast();
  const agent = getAgentBySlug("sanya-kapoor");
  const myListings = properties.filter((property) => property.agentId === "sanya-kapoor").slice(0, 5);
  const sanyaLeads = [...enquiries.filter((enquiry) => enquiry.assignedTo === "Sanya Kapoor"), ...extraLeads];
  const [leads, setLeads] = useState<Enquiry[]>(sanyaLeads);

  const stats = [
    { label: "Active listings", value: myListings.length, note: "3 live · 1 review · 1 draft", icon: Building2 },
    { label: "New leads this month", value: 12, note: "+3 vs October", icon: Inbox },
    { label: "Listing views", value: "2,847", note: "+18% over 30 days", icon: Eye },
    { label: "Plan", value: "Signature", note: "Renews 1 Dec 2026", icon: CreditCard },
  ];

  function markContacted(id: string) {
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status: "Contacted" as const } : lead)),
    );
    toast(`${id} marked as contacted. Demo only.`);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-brass">Seller workspace</p>
          <h1 className="mt-2 text-[clamp(1.7rem,3.6vw,2.5rem)] leading-tight text-forest">
            {agent?.agency ?? "Your agency"} at a glance.
          </h1>
          <p className="mt-1.5 text-[12px] text-muted">
            Signed in as {user.name}. You have {leads.filter((lead) => lead.status === "New").length} new leads waiting
            for a first reply.
          </p>
        </div>
        <div className="flex gap-2">
          <ButtonLink href="/list-property" icon={Plus}>
            Add listing
          </ButtonLink>
          <ButtonLink href="/pricing" variant="outline">
            Manage plan
          </ButtonLink>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="grid size-8 place-items-center rounded-lg bg-sand text-forest">
                  <Icon className="size-4" />
                </span>
                <span className="text-[9px] font-semibold text-brass">{stat.note}</span>
              </div>
              <p className="mt-3 font-serif text-2xl leading-none text-forest">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">Performance</h2>
                <p className="text-[10px] text-muted">Listing views, last 8 weeks. Week 8 is current.</p>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="size-2 rounded-full bg-forest" /> Views
                </span>
                <Badge variant="success">
                  <TrendingUp className="size-3" /> +18%
                </Badge>
              </div>
            </div>
            <div className="mt-6 flex h-36 items-end gap-2 sm:gap-3">
              {weeks.map((week) => (
                <div key={week.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[9px] font-semibold text-forest/60">{Math.round((week.value / 100) * 420)}</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-forest to-forest/65 transition hover:from-brass hover:to-brass/70"
                    style={{ height: `${Math.max(week.value, 8)}%` }}
                    title={`${week.label}: ${Math.round((week.value / 100) * 420)} views`}
                  />
                  <span className="text-[8px] text-muted">{week.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 divide-x divide-line border-t border-line pt-3 text-center">
              <div>
                <p className="text-sm font-bold text-forest">12</p>
                <p className="text-[9px] text-muted">Leads this month</p>
              </div>
              <div>
                <p className="text-sm font-bold text-forest">4.1%</p>
                <p className="text-[9px] text-muted">View-to-lead rate</p>
              </div>
              <div>
                <p className="text-sm font-bold text-forest">18 hrs</p>
                <p className="text-[9px] text-muted">Avg. first reply</p>
              </div>
            </div>
          </section>

          <section id="listings" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">My listings</h2>
                <p className="text-[10px] text-muted">Pause, edit or review any listing from here.</p>
              </div>
              <Link href="/list-property" className="text-[10px] font-bold text-brass hover:underline">
                + New listing
              </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[540px] text-left">
                <thead>
                  <tr className="border-b border-line text-[9px] uppercase tracking-wider text-muted">
                    <th className="pb-2 font-semibold">Property</th>
                    <th className="pb-2 font-semibold">Price</th>
                    <th className="pb-2 font-semibold">Status</th>
                    <th className="pb-2 text-right font-semibold">Views</th>
                    <th className="pb-2 text-right font-semibold">Saves</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {myListings.map((property, index) => (
                    <tr key={property.slug} className="text-[11px]">
                      <td className="py-3 pr-3">
                        <Link href={`/properties/${property.slug}`} className="flex items-center gap-2.5 group">
                          <Image
                            src={property.images[0]}
                            alt=""
                            width={44}
                            height={36}
                            className="h-9 w-11 rounded-md object-cover"
                          />
                          <span className="min-w-0">
                            <span className="block max-w-[220px] truncate font-semibold text-forest group-hover:text-brass">
                              {property.title}
                            </span>
                            <span className="block text-[9px] text-muted">{getLocalityName(property.city, property.locality)}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="py-3 pr-3 font-semibold text-forest">{formatPropertyPrice(property)}</td>
                      <td className="py-3 pr-3">
                        <Badge
                          variant={
                            listingStatus[index] === "Live"
                              ? "success"
                              : listingStatus[index] === "Under review"
                                ? "brass"
                                : "outline"
                          }
                        >
                          {listingStatus[index]}
                        </Badge>
                      </td>
                      <td className="py-3 text-right text-muted">{listingViews[index]}</td>
                      <td className="py-3 text-right text-muted">{listingSaves[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="leads" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">Lead inbox</h2>
                <p className="text-[10px] text-muted">
                  {enquiryStats.new} new across the platform · {leads.length} assigned to you.
                </p>
              </div>
              <Badge variant="brass">{leads.filter((lead) => lead.status === "New").length} new</Badge>
            </div>
            <div className="mt-4 space-y-2">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-cream/40 p-3"
                >
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-forest">
                      {lead.name}
                      <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
                    </p>
                    <p className="mt-0.5 max-w-md truncate text-[10px] text-muted">{lead.propertyTitle}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-[9px] text-muted">
                      <span>{lead.id}</span>
                      <span className="size-0.5 rounded-full bg-line" />
                      <span>{lead.source}</span>
                      <span className="size-0.5 rounded-full bg-line" />
                      <span>{formatDate(lead.date)}</span>
                      <span className="size-0.5 rounded-full bg-line" />
                      <span>{lead.phone}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {lead.status === "New" ? (
                      <Button size="sm" variant="outline" onClick={() => markContacted(lead.id)}>
                        Mark contacted
                      </Button>
                    ) : null}
                    <a
                      href={`https://wa.me/91${lead.phone.replace(/\D/g, "").slice(-10)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`WhatsApp ${lead.name}`}
                      className="grid size-8 place-items-center rounded-full bg-forest text-cream transition hover:bg-forest-dark"
                    >
                      <MessageCircle className="size-3.5" />
                    </a>
                    <a
                      href={`tel:${lead.phone.replace(/\s/g, "")}`}
                      aria-label={`Call ${lead.name}`}
                      className="grid size-8 place-items-center rounded-full border border-line bg-white text-forest transition hover:border-forest/30"
                    >
                      <Phone className="size-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section id="plan" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Plan &amp; usage</p>
              <Badge variant="brass">
                <Sparkles className="size-3" /> Signature
              </Badge>
            </div>
            <div className="mt-3 space-y-3">
              {[
                { label: "Active listings", used: myListings.length, limit: 8 },
                { label: "Featured slots", used: 2, limit: 2 },
                { label: "Team seats", used: 1, limit: 3 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted">{item.label}</span>
                    <span className="font-semibold text-forest">
                      {item.used} / {item.limit}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-sand">
                    <div
                      className={`h-full rounded-full ${item.used >= item.limit ? "bg-brass" : "bg-forest"}`}
                      style={{ width: `${Math.min((item.used / item.limit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-sand/60 p-3">
              <p className="flex items-center justify-between text-[10px]">
                <span className="text-muted">Next invoice</span>
                <span className="font-bold text-forest">₹2,999 + GST</span>
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[9px] text-muted">
                <Clock className="size-3" /> Due 1 December 2026
              </p>
            </div>
            <ButtonLink href="/pricing" variant="outline" size="sm" className="mt-3 w-full" iconRight={ArrowRight}>
              Change plan
            </ButtonLink>
          </section>

          <section className="rounded-2xl bg-forest p-5 text-cream">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">
              <Star className="size-3.5" /> Agency profile
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-brass text-white">
                <Building2 className="size-4" />
              </span>
              <div>
                <p className="text-[12px] font-bold">{agent?.agency}</p>
                <p className="text-[9px] text-cream/55">{agent?.areas.slice(0, 2).join(" · ")}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 text-[9px] text-cream/55">
              <span className="flex items-center gap-1">
                <Star className="size-3 fill-brass-light text-brass-light" /> {agent?.rating} · {agent?.reviews} reviews
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="size-3 text-brass-light" /> RERA verified
              </span>
            </div>
            <ButtonLink href={`/agents/${agent?.slug ?? "sanya-kapoor"}`} variant="brass" size="sm" className="mt-4 w-full" iconRight={ArrowRight}>
              View public profile
            </ButtonLink>
          </section>

          <section className="rounded-2xl border border-line bg-sand/60 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Quick actions</p>
            <div className="mt-3 space-y-2">
              {[
                { label: "Add a new listing", href: "/list-property", icon: Plus },
                { label: "Compare plans", href: "/pricing", icon: IndianRupee },
                { label: "See buyer activity", href: "/properties", icon: Eye },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 text-[11px] font-semibold text-forest transition hover:text-brass"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="size-3.5 text-brass" /> {action.label}
                    </span>
                    <ArrowRight className="size-3" />
                  </Link>
                );
              })}
            </div>
          </section>

          <p className="rounded-xl border border-line bg-white p-3 text-[9px] leading-relaxed text-muted">
            Demo workspace. Leads, views and invoices are illustrative and do not represent real transactions.
          </p>
        </aside>
      </div>
    </div>
  );
}
