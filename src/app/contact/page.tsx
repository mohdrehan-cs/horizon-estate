import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ArrowRight,
  Building2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Horizon Estates — Delhi, Noida & Greater Noida",
  description:
    "Talk to a Horizon Estates advisor in Delhi, Noida or Greater Noida. Call, WhatsApp or send a short brief. No call centre, no lead resale.",
};

const offices = [
  {
    city: "Noida",
    label: "Head office",
    address: siteConfig.address,
    phone: siteConfig.phone,
    hours: siteConfig.hours,
    map: "Sector 18, Noida",
  },
  {
    city: "Delhi",
    label: "South Delhi desk",
    address: "2nd Floor, M-42, Greater Kailash Part II, New Delhi 110048",
    phone: "+91 98110 45672",
    hours: "Mon–Sat, 10:00am – 6:30pm",
    map: "Greater Kailash II",
  },
  {
    city: "Greater Noida",
    label: "YEIDA / Greater Noida desk",
    address: "Office 14, Alpha Commercial Belt, Greater Noida 201310",
    phone: "+91 98110 45674",
    hours: "Mon–Sat, 10:00am – 6:30pm",
    map: "Alpha, Greater Noida",
  },
];

const faqs = [
  {
    question: "How quickly will someone respond?",
    answer:
      "Enquiries received during working hours are usually acknowledged the same day. Briefs that need a specialist are routed to the right advisor within one working day. Urgent possession or paperwork issues can be flagged on WhatsApp.",
  },
  {
    question: "Do I need to share my budget upfront?",
    answer:
      "A range helps us avoid wasting your time, but you do not need to share your full financial picture. We can start with the localities and property types you are considering and refine from there.",
  },
  {
    question: "Can I visit without a commitment?",
    answer:
      "Yes. Most first meetings are a 20-minute call or a no-obligation site visit. We do not ask for an exclusivity agreement to show you a property we are marketing, though buyer representation mandates are scoped in writing.",
  },
  {
    question: "Do you work with NRI buyers?",
    answer:
      "Yes. Our NRI concierge covers video site visits, power-of-attorney guidance, FEMA-compliant remittance coordination, registration and post-purchase rental management across the three cities.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-cream pb-16">
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow text-brass">Contact</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5vw,3.7rem)] leading-[1.04] text-forest">
                Let&apos;s start with the decision.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                Buying, selling, renting or simply trying to understand a locality — a short brief is enough. You will
                speak to a named advisor, not a rotating call centre.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="brass">
                  <Clock className="size-3" /> Replies within one working day
                </Badge>
                <Badge variant="sand">
                  <ShieldCheck className="size-3" /> No lead resale
                </Badge>
                <Badge variant="outline">Demo — forms not connected</Badge>
              </div>
            </div>
            <div className="grid gap-2 rounded-2xl border border-line bg-white p-4">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-sand/70"
              >
                <span className="grid size-9 place-items-center rounded-full bg-sand text-forest">
                  <Phone className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-muted">Call</span>
                  <span className="block text-[12px] font-bold text-forest">{siteConfig.phone}</span>
                </span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-sand/70"
              >
                <span className="grid size-9 place-items-center rounded-full bg-sand text-forest">
                  <MessageCircle className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-muted">WhatsApp</span>
                  <span className="block text-[12px] font-bold text-forest">Message the team</span>
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-sand/70"
              >
                <span className="grid size-9 place-items-center rounded-full bg-sand text-forest">
                  <Mail className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-muted">Email</span>
                  <span className="block text-[12px] font-bold text-forest">{siteConfig.email}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <Suspense
            fallback={
              <div className="h-[560px] animate-pulse rounded-3xl border border-line bg-white/60" aria-hidden="true" />
            }
          >
            <ContactForm />
          </Suspense>

          <aside className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <iframe
                title="Horizon Estates office location in Sector 18, Noida"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.3095%2C28.5605%2C77.3345%2C28.5805&layer=mapnik&marker=28.5705%2C77.3220"
                className="h-52 w-full border-0"
                loading="lazy"
              />
              <div className="p-4">
                <p className="flex items-center gap-1.5 text-[11px] font-bold text-forest">
                  <MapPin className="size-3.5 text-brass" /> Sector 18, Noida
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted">{siteConfig.address}</p>
                <p className="mt-1 text-[10px] text-muted">{siteConfig.hours}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-forest p-5 text-cream">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">
                <Building2 className="size-3.5" /> For developers
              </p>
              <p className="mt-2 text-sm leading-snug">Launching a project in NCR?</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-cream/60">
                Ask for the projects desk. We can share channel-partner terms, RERA documentation requirements and a
                campaign timeline.
              </p>
              <a
                href={`mailto:${siteConfig.email}?subject=Developer%20enquiry`}
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-brass-light"
              >
                Email the projects desk <ArrowRight className="size-3.5" />
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-sand/60 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Response promise</p>
              <ul className="mt-3 space-y-2.5 text-[11px] leading-relaxed text-muted">
                <li className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brass" />
                  A human reads every brief before it is routed.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brass" />
                  We will tell you if we are not the right fit.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brass" />
                  Your number is not sold or shared with third-party brokers.
                </li>
              </ul>
            </div>

            <ButtonLink href="/agents" variant="outline" className="w-full" iconRight={ArrowRight}>
              Choose an advisor
            </ButtonLink>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-white py-14">
        <div className="container-page">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-brass">Find us</p>
              <h2 className="mt-2 text-[clamp(1.6rem,3.2vw,2.3rem)] text-forest">Three desks, one team.</h2>
            </div>
            <p className="text-[11px] text-muted">Visits by appointment — please call ahead.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {offices.map((office) => (
              <div key={office.city} className="rounded-2xl border border-line bg-cream/60 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-forest">{office.city}</p>
                  <Badge variant={office.label === "Head office" ? "brass" : "outline"}>{office.label}</Badge>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-muted">{office.address}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-forest">
                  <Phone className="size-3 text-brass" /> {office.phone}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[10px] text-muted">
                  <Clock className="size-3 text-brass" /> {office.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow text-brass">Before you write</p>
            <h2 className="mt-2 text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight text-forest">
              Questions we are often asked.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              If your question is not here, ask it in the form. There is no such thing as a question that is too basic
              for a first call.
            </p>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
