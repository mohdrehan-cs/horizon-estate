"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Briefcase, Camera, Mail, MapPin, Phone, Play } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cities } from "@/data/cities";
import { useToast } from "@/components/providers/ToastProvider";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Properties for sale", href: "/properties?listingType=sale" },
      { label: "Homes for rent", href: "/properties?listingType=rent" },
      { label: "New projects", href: "/projects" },
      { label: "Localities", href: "/cities/delhi" },
      { label: "Saved homes", href: "/saved" },
      { label: "Compare homes", href: "/compare" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Buy with Horizon", href: "/services" },
      { label: "Sell with Horizon", href: "/services" },
      { label: "Rental management", href: "/services" },
      { label: "Legal due diligence", href: "/services" },
      { label: "Home loan advisory", href: "/services" },
      { label: "NRI concierge", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our agents", href: "/agents" },
      { label: "Plans & pricing", href: "/pricing" },
      { label: "The Horizon Journal", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "List a property", href: "/list-property" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "EMI calculator", href: "/calculators" },
      { label: "Stamp duty calculator", href: "/calculators" },
      { label: "Area converter", href: "/calculators" },
      { label: "Home valuation", href: "/home-valuation" },
      { label: "Buyer dashboard", href: "/dashboard" },
      { label: "Agent dashboard", href: "/dashboard/seller" },
    ],
  },
];

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  function subscribe(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      toast("Please enter a valid email address.", "error");
      return;
    }
    toast("You're on the list. The next Horizon Journal edition arrives on Friday.");
    setEmail("");
  }

  return (
    <footer className="mt-auto bg-forest-dark text-cream/70">
      <div className="border-b border-white/10">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow text-brass-light">The Horizon Journal</p>
            <h2 className="mt-2 max-w-lg text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-cream">
              One considered email a week. Market notes, new homes, no noise.
            </h2>
          </div>
          <form onSubmit={subscribe} className="flex flex-col gap-2 sm:flex-row">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Your email address"
              aria-label="Email address for newsletter"
              className="h-12 flex-1 rounded-full border border-white/15 bg-white/[0.06] px-5 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-brass-light/60"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brass px-6 text-sm font-bold text-white transition hover:bg-[#a3762f]"
            >
              Subscribe <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.25fr_2.75fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-cream text-forest">
              <span className="font-serif text-[22px] leading-none">H</span>
              <span className="absolute bottom-[7px] h-px w-4 bg-brass" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-[22px] tracking-[-0.02em] text-cream">Horizon</span>
              <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.3em] text-brass-light">
                Estates · NCR
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-cream/60">{siteConfig.description}</p>
          <div className="mt-5 space-y-2.5 text-[12px]">
            <a href={siteConfig.phoneHref} className="flex items-center gap-2.5 transition hover:text-cream">
              <Phone className="size-3.5 text-brass-light" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 transition hover:text-cream">
              <Mail className="size-3.5 text-brass-light" /> {siteConfig.email}
            </a>
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-brass-light" /> {siteConfig.address}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2">
            {[Camera, Briefcase, Play].map((Icon, index) => (
              <a
                key={index}
                href={index === 0 ? siteConfig.socials.instagram : index === 1 ? siteConfig.socials.linkedin : siteConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="Social link"
                className="grid size-9 place-items-center rounded-full border border-white/15 text-cream/60 transition hover:border-brass-light/50 hover:text-cream"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brass-light">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[12px] text-cream/55 transition hover:text-cream">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px]">
            <span className="font-semibold text-cream/70">Cities:</span>
            {cities.map((city) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="transition hover:text-cream">
                {city.name}
              </Link>
            ))}
            <span className="text-cream/25">·</span>
            <Link href="/privacy" className="transition hover:text-cream">Privacy</Link>
            <Link href="/terms" className="transition hover:text-cream">Terms</Link>
            <span className="text-cream/25">·</span>
            <span>RERA agent reg. {siteConfig.rera}</span>
          </div>
          <div className="mt-3 flex flex-col justify-between gap-2 text-[10px] leading-relaxed text-cream/35 sm:flex-row sm:items-end">
            <p>
              © 2026 {siteConfig.name}. A demonstration website. Listings, agents and prices are
              fictional. Not an offer or solicitation.
            </p>
            <p className="shrink-0">Made for Delhi, Noida &amp; Greater Noida.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
