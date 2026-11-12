"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  GitCompareArrows,
  Heart,
  Menu,
  Phone,
  Plus,
  UserRound,
  X,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";
import { useSaved } from "@/components/providers/SavedProvider";
import { useCompare } from "@/components/providers/CompareProvider";
import { useDemo } from "@/components/providers/DemoProvider";

const nav = [
  {
    label: "Buy",
    children: [
      { label: "All homes for sale", href: "/properties?listingType=sale", note: "24 verified listings" },
      { label: "New projects", href: "/projects", note: "3 RERA launches" },
      { label: "Delhi", href: "/cities/delhi", note: "8 listings" },
      { label: "Noida", href: "/cities/noida", note: "9 listings" },
      { label: "Greater Noida", href: "/cities/greater-noida", note: "7 listings" },
    ],
  },
  {
    label: "Rent",
    children: [
      { label: "Homes for rent", href: "/properties?listingType=rent", note: "3 rentals" },
      { label: "Noida rentals", href: "/properties?listingType=rent&city=noida", note: "2 homes" },
      { label: "Greater Noida rentals", href: "/properties?listingType=rent&city=greater-noida", note: "1 home" },
      { label: "Rental management", href: "/services", note: "For owners" },
    ],
  },
  { label: "Projects", href: "/projects" },
  {
    label: "Services",
    children: [
      { label: "Buy with Horizon", href: "/services", note: "Buyer representation" },
      { label: "Sell with Horizon", href: "/services", note: "1.5% success fee" },
      { label: "Home loan advisory", href: "/services", note: "No advisory fee" },
      { label: "Plans & pricing", href: "/pricing", note: "For owners & agents" },
      { label: "List your property", href: "/list-property", note: "Free to start" },
    ],
  },
  {
    label: "Insights",
    children: [
      { label: "The Horizon Journal", href: "/blog", note: "Market guides" },
      { label: "EMI calculator", href: "/calculators", note: "Plan your loan" },
      { label: "Stamp duty calculator", href: "/calculators", note: "Delhi vs UP" },
      { label: "Home valuation", href: "/home-valuation", note: "What is it worth?" },
    ],
  },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { count: savedCount } = useSaved();
  const { count: compareCount } = useCompare();
  const { signedIn, user } = useDemo();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-forest-dark text-cream/80 sm:block">
        <div className="container-page flex h-9 items-center justify-between text-[11px]">
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brass-light" />
            RERA-aware listings across Delhi, Noida &amp; Greater Noida
          </p>
          <div className="flex items-center gap-5">
            <Link href="/blog/jewar-airport-property-corridor" className="group flex items-center gap-1 transition hover:text-cream">
              The Jewar Airport briefing
              <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
            </Link>
            <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 transition hover:text-cream">
              <Phone className="size-3" /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-line/80 bg-cream/92 backdrop-blur-xl transition-shadow",
          scrolled && "shadow-[0_10px_30px_-24px_rgba(18,42,35,0.4)]",
        )}
      >
        <div className="container-page flex h-[68px] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-full bg-forest text-cream">
              <span className="font-serif text-xl leading-none">H</span>
              <span className="absolute bottom-1.5 h-px w-4 bg-brass-light" />
              <span className="absolute bottom-[9px] h-px w-2.5 bg-brass-light/60" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-[21px] tracking-[-0.02em] text-forest">Horizon</span>
              <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.3em] text-brass">Estates · NCR</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold text-forest/80 transition hover:bg-forest/[0.05] hover:text-forest">
                    {item.label}
                    <ChevronDown className="size-3.5 text-muted transition group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-line bg-cream p-2 shadow-soft">
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white"
                        >
                          <span>
                            <span className="block text-[13px] font-semibold text-forest">{child.label}</span>
                            <span className="mt-0.5 block text-[10px] text-muted">{child.note}</span>
                          </span>
                          <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted/50" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-forest/80 transition hover:bg-forest/[0.05] hover:text-forest"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/saved"
              aria-label={`Saved homes (${savedCount})`}
              className="relative hidden size-10 place-items-center rounded-full text-forest/70 transition hover:bg-forest/[0.06] hover:text-forest sm:grid"
            >
              <Heart className="size-[18px]" />
              {savedCount > 0 ? (
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-terracotta text-[9px] font-bold text-white">
                  {savedCount}
                </span>
              ) : null}
            </Link>
            <Link
              href="/compare"
              aria-label={`Compare homes (${compareCount})`}
              className="relative hidden size-10 place-items-center rounded-full text-forest/70 transition hover:bg-forest/[0.06] hover:text-forest sm:grid"
            >
              <GitCompareArrows className="size-[18px]" />
              {compareCount > 0 ? (
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-brass text-[9px] font-bold text-white">
                  {compareCount}
                </span>
              ) : null}
            </Link>
            <Link
              href={signedIn ? "/dashboard" : "/login"}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[13px] font-semibold text-forest/80 transition hover:bg-forest/[0.05] hover:text-forest md:flex"
            >
              {signedIn ? (
                <span className="grid size-7 place-items-center rounded-full bg-forest text-[10px] font-bold text-cream">
                  {user.initials}
                </span>
              ) : (
                <UserRound className="size-[18px]" />
              )}
              {signedIn ? user.name.split(" ")[0] : "Sign in"}
            </Link>
            <Link
              href="/list-property"
              className="ml-1 hidden h-10 items-center gap-1.5 rounded-full bg-forest px-4 text-[12px] font-bold text-cream transition hover:bg-forest-dark active:scale-[0.98] sm:inline-flex"
            >
              <Plus className="size-4" /> List property
            </Link>
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-full text-forest transition hover:bg-forest/[0.06] lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-b border-line bg-cream shadow-soft lg:hidden">
          <div className="container-page py-4">
            <div className="flex flex-wrap gap-1.5 pb-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold text-forest"
                >
                  {city.name}
                </Link>
              ))}
              <Link href="/properties" className="rounded-full bg-forest px-3 py-1.5 text-[11px] font-semibold text-cream">
                All listings
              </Link>
            </div>
            <div className="divide-y divide-line">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="py-1">
                    <button
                      onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between py-2.5 text-left text-sm font-semibold text-forest"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("size-4 text-muted transition", openSection === item.label && "rotate-180")}
                      />
                    </button>
                    {openSection === item.label ? (
                      <div className="grid gap-1 pb-3 pl-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="flex items-center justify-between rounded-lg px-2 py-2 text-[13px] text-muted transition hover:bg-white hover:text-forest"
                          >
                            {child.label}
                            <ArrowRight className="size-3.5" />
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="flex items-center justify-between py-3 text-sm font-semibold text-forest"
                  >
                    {item.label}
                    <ArrowRight className="size-4 text-muted" />
                  </Link>
                ),
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={signedIn ? "/dashboard" : "/login"}
                className="flex h-11 items-center justify-center gap-2 rounded-full border border-forest/20 text-xs font-bold text-forest"
              >
                <UserRound className="size-4" /> {signedIn ? "My dashboard" : "Sign in"}
              </Link>
              <Link
                href="/list-property"
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-brass text-xs font-bold text-white"
              >
                <Plus className="size-4" /> List property
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
