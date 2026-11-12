"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Eye,
  FileCheck2,
  Flag,
  Inbox,
  IndianRupee,
  MapPin,
  MessageCircle,
  Shield,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { enquiries } from "@/data/enquiries";
import { getAgent } from "@/data/agents";
import { getCityName } from "@/data/cities";
import { properties, propertyStats } from "@/data/properties";
import { formatDate, formatPropertyPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/providers/ToastProvider";

const queueSeed = properties.slice(6, 11).map((property, index) => ({
  property,
  status: "Pending" as "Pending" | "Approved" | "Rejected",
  submitted: ["Today, 09:12", "Today, 08:40", "Yesterday, 18:22", "Yesterday, 16:05", "Yesterday, 11:48"][index],
}));

const recentUsers = [
  { name: "Ananya Sethi", email: "ananya.sethi@example.com", role: "Buyer", city: "Delhi", joined: "2026-11-10" },
  { name: "Rahul Bansal", email: "rahul.b@example.com", role: "Buyer", city: "Noida", joined: "2026-11-10" },
  { name: "Noida Nest Realty", email: "hello@noidanest.in", role: "Agency", city: "Noida", joined: "2026-11-09" },
  { name: "Devendra Yadav", email: "devendra.y@example.com", role: "Buyer", city: "Greater Noida", joined: "2026-11-09" },
];

const dailyLeads = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 22 },
  { day: "Thu", value: 31 },
  { day: "Fri", value: 27 },
  { day: "Sat", value: 21 },
  { day: "Sun", value: 17 },
];

const chartMax = Math.max(...dailyLeads.map((item) => item.value));

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [queue, setQueue] = useState(queueSeed);

  const pending = queue.filter((item) => item.status === "Pending").length;

  function decide(index: number, status: "Approved" | "Rejected") {
    setQueue((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, status } : item)));
    toast(`Listing ${status.toLowerCase()} — demo action. No live listing was changed.`, status === "Approved" ? "success" : "info");
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-brass">Platform operations</p>
          <h1 className="mt-2 text-[clamp(1.7rem,3.6vw,2.5rem)] leading-tight text-forest">Thursday, 12 November.</h1>
          <p className="mt-1.5 text-[12px] text-muted">
            {pending} listings need review. Lead volume is 14% above the 30-day average.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            icon={Download}
            onClick={() => toast("Report export simulated — no file generated.", "info")}
          >
            Export report
          </Button>
          <Link
            href="/properties"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-forest px-5 text-sm font-semibold text-cream transition hover:bg-forest-dark"
          >
            <Eye className="size-4" /> View site
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { label: "Active listings", value: "1,200", note: "+42 this month", icon: Building2, trend: true },
          { label: "Registered users", value: "3,400", note: "+128 this month", icon: Users, trend: true },
          { label: "Leads this month", value: "148", note: "+14% vs Oct", icon: Inbox, trend: true },
          { label: "MRR", value: "₹4.82 L", note: "+₹38k vs Oct", icon: IndianRupee, trend: true },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="grid size-8 place-items-center rounded-lg bg-sand text-forest">
                  <Icon className="size-4" />
                </span>
                <span className="flex items-center gap-1 text-[9px] font-semibold text-[#2f5a3c]">
                  <TrendingUp className="size-3" /> {stat.note}
                </span>
              </div>
              <p className="mt-3 font-serif text-2xl leading-none text-forest">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-6">
          <section id="moderation" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">Moderation queue</h2>
                <p className="text-[10px] text-muted">New listings awaiting RERA and content checks.</p>
              </div>
              <Badge variant="brass">
                <Flag className="size-3" /> {pending} pending
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              {queue.map((item, index) => {
                const agent = getAgent(item.property.agentId);
                return (
                  <div
                    key={item.property.slug}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-cream/40 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-forest">
                        <Link href={`/properties/${item.property.slug}`} className="hover:text-brass">
                          {item.property.title}
                        </Link>
                        <Badge
                          variant={
                            item.status === "Approved" ? "success" : item.status === "Rejected" ? "terracotta" : "sand"
                          }
                        >
                          {item.status}
                        </Badge>
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-2 text-[9px] text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-2.5" /> {getCityName(item.property.city)}
                        </span>
                        <span className="size-0.5 rounded-full bg-line" />
                        <span>{agent?.name}</span>
                        <span className="size-0.5 rounded-full bg-line" />
                        <span>{formatPropertyPrice(item.property)}</span>
                        <span className="size-0.5 rounded-full bg-line" />
                        <span className="flex items-center gap-1">
                          <Clock className="size-2.5" /> {item.submitted}
                        </span>
                      </p>
                    </div>
                    {item.status === "Pending" ? (
                      <div className="flex items-center gap-1.5">
                        <Button size="sm" variant="outline" onClick={() => decide(index, "Approved")} icon={Check}>
                          Approve
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => decide(index, "Rejected")} icon={X}>
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="flex items-center gap-1 text-[9px] font-semibold text-muted">
                        {item.status === "Approved" ? (
                          <CheckCircle2 className="size-3.5 text-[#2f5a3c]" />
                        ) : (
                          <AlertTriangle className="size-3.5 text-terracotta" />
                        )}
                        {item.status}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg text-forest">Lead volume</h2>
                  <p className="text-[10px] text-muted">Enquiries per day, last 7 days.</p>
                </div>
                <Badge variant="success">
                  <TrendingUp className="size-3" /> 14%
                </Badge>
              </div>
              <div className="mt-5 flex h-32 items-end gap-2">
                {dailyLeads.map((day) => (
                  <div key={day.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <span className="text-[8px] font-semibold text-forest/60">{day.value}</span>
                    <div
                      className="w-full rounded-t-md bg-forest/80 transition hover:bg-brass"
                      style={{ height: `${(day.value / chartMax) * 100}%` }}
                      title={`${day.day}: ${day.value} leads`}
                    />
                    <span className="text-[8px] text-muted">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <h2 className="text-lg text-forest">City mix</h2>
              <p className="text-[10px] text-muted">Share of enquiries by city.</p>
              <div className="mt-4 flex items-center gap-5">
                <div
                  className="relative grid size-28 shrink-0 place-items-center rounded-full"
                  style={{
                    background: "conic-gradient(#1f3d33 0 42%, #b8863b 42% 77%, #d8c6a5 77% 100%)",
                  }}
                >
                  <div className="grid size-20 place-items-center rounded-full bg-white text-center">
                    <div>
                      <p className="font-serif text-xl leading-none text-forest">148</p>
                      <p className="mt-0.5 text-[8px] uppercase tracking-wider text-muted">Leads</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-[10px]">
                  {[
                    { city: "Noida", value: "42%", color: "bg-[#1f3d33]" },
                    { city: "Delhi", value: "35%", color: "bg-brass" },
                    { city: "Greater Noida", value: "23%", color: "bg-[#d8c6a5]" },
                  ].map((item) => (
                    <div key={item.city} className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${item.color}`} />
                      <span className="min-w-[74px] text-muted">{item.city}</span>
                      <span className="font-bold text-forest">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 flex items-center gap-1 border-t border-line pt-3 text-[9px] text-muted">
                <CheckCircle2 className="size-3 text-brass" /> Property pages drive 61% of qualified leads.
              </p>
            </div>
          </section>

          <section id="leads" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">Recent platform leads</h2>
                <p className="text-[10px] text-muted">Screened and routed by the ops team.</p>
              </div>
              <Badge variant="sand">{enquiries.length} shown</Badge>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left">
                <thead>
                  <tr className="border-b border-line text-[9px] uppercase tracking-wider text-muted">
                    <th className="pb-2 font-semibold">Lead</th>
                    <th className="pb-2 font-semibold">Property</th>
                    <th className="pb-2 font-semibold">Source</th>
                    <th className="pb-2 font-semibold">Assigned</th>
                    <th className="pb-2 font-semibold">Status</th>
                    <th className="pb-2 text-right font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="text-[10px]">
                      <td className="py-2.5 pr-3">
                        <p className="font-semibold text-forest">{enquiry.name}</p>
                        <p className="text-[9px] text-muted">{enquiry.phone}</p>
                      </td>
                      <td className="max-w-[190px] truncate py-2.5 pr-3 text-muted">{enquiry.propertyTitle}</td>
                      <td className="py-2.5 pr-3 text-muted">{enquiry.source}</td>
                      <td className="py-2.5 pr-3 text-muted">{enquiry.assignedTo}</td>
                      <td className="py-2.5 pr-3">
                        <Badge
                          variant={
                            enquiry.status === "Qualified"
                              ? "success"
                              : enquiry.status === "New"
                                ? "brass"
                                : enquiry.status === "Closed"
                                  ? "outline"
                                  : "sand"
                          }
                        >
                          {enquiry.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 text-right text-muted">{formatDate(enquiry.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="users" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg text-forest">Recent accounts</h2>
                <p className="text-[10px] text-muted">Buyers, owners and agencies who joined this week.</p>
              </div>
              <Badge variant="sand">
                <Users className="size-3" /> 128 new
              </Badge>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {recentUsers.map((account) => (
                <div
                  key={account.email}
                  className="flex items-center justify-between gap-2 rounded-xl border border-line bg-cream/40 p-3"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand text-[9px] font-bold text-forest">
                      {account.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-forest">{account.name}</p>
                      <p className="truncate text-[9px] text-muted">
                        {account.role} · {account.city}
                      </p>
                    </div>
                  </div>
                  <Badge variant={account.role === "Agency" ? "brass" : "outline"}>{account.role}</Badge>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section id="revenue" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Revenue</p>
              <Badge variant="success">
                <TrendingUp className="size-3" /> On track
              </Badge>
            </div>
            <p className="mt-3 font-serif text-3xl text-forest">₹4.82 L</p>
            <p className="text-[10px] text-muted">Monthly recurring revenue · Nov 2026</p>
            <div className="mt-4 space-y-3">
              {[
                { plan: "Explorer", share: 42, value: "—", color: "bg-[#d8c6a5]" },
                { plan: "Signature", share: 35, value: "₹1.68 L", color: "bg-forest" },
                { plan: "Prime", share: 18, value: "₹2.31 L", color: "bg-brass" },
                { plan: "Bespoke", share: 5, value: "₹83k", color: "bg-forest/40" },
              ].map((item) => (
                <div key={item.plan}>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-semibold text-forest">{item.plan}</span>
                    <span className="text-muted">{item.value}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-sand">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.share}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[10px]">
              <span className="flex items-center gap-1 text-muted">
                <CreditCard className="size-3" /> Paid subscriptions
              </span>
              <span className="font-bold text-forest">186</span>
            </div>
          </section>

          <section className="rounded-2xl bg-forest p-5 text-cream">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">
              <Shield className="size-3.5" /> Trust &amp; safety
            </p>
            <div className="mt-3 space-y-2.5 text-[10px]">
              {[
                { label: "RERA registry sync", status: "Healthy" },
                { label: "WhatsApp Business API", status: "Healthy" },
                { label: "Payment gateway", status: "Healthy" },
                { label: "Duplicate listing scan", status: "2 flags" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-2">
                  <span className="text-cream/65">{item.label}</span>
                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      item.status === "Healthy" ? "text-[#a9d3a0]" : "text-brass-light"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${item.status === "Healthy" ? "bg-[#a9d3a0]" : "bg-brass-light"}`}
                    />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => toast("Moderation log opened — demo only.", "info")}
              className="mt-4 flex w-full items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-[10px] font-bold text-cream transition hover:bg-white/15"
            >
              Open moderation log <ArrowRight className="size-3" />
            </button>
          </section>

          <section className="rounded-2xl border border-line bg-sand/60 p-5">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brass">
              <FileCheck2 className="size-3.5" /> Inventory
            </p>
            <div className="mt-3 space-y-2 text-[10px]">
              <p className="flex items-center justify-between">
                <span className="text-muted">For sale</span>
                <span className="font-bold text-forest">{propertyStats.forSale}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted">For rent</span>
                <span className="font-bold text-forest">{propertyStats.forRent}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted">Verified</span>
                <span className="font-bold text-forest">
                  {properties.filter((property) => property.verified).length}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted">New this week</span>
                <span className="font-bold text-forest">+42</span>
              </p>
            </div>
            <Link
              href="/properties"
              className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 text-[10px] font-semibold text-forest transition hover:text-brass"
            >
              <span className="flex items-center gap-2">
                <BadgeCheck className="size-3.5 text-brass" /> Review listings
              </span>
              <ArrowRight className="size-3" />
            </Link>
          </section>

          <section className="rounded-2xl border border-line bg-white p-4">
            <p className="flex items-center gap-2 text-[10px] font-bold text-forest">
              <MessageCircle className="size-3.5 text-brass" /> Ops note
            </p>
            <p className="mt-2 text-[9px] leading-relaxed text-muted">
              The demo admin workspace is illustrative. Moderation actions do not persist beyond your session and no
              real listing is changed.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
