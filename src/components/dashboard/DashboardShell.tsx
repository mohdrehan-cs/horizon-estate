"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Building2,
  Calculator,
  CreditCard,
  ExternalLink,
  Flag,
  GitCompareArrows,
  Heart,
  Inbox,
  LayoutDashboard,
  LogOut,
  Shield,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import type { Role } from "@/types";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useCompare } from "@/components/providers/CompareProvider";
import { useDemo } from "@/components/providers/DemoProvider";
import { useSaved } from "@/components/providers/SavedProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function roleFromPath(pathname: string): Role {
  if (pathname.startsWith("/dashboard/seller")) return "seller";
  if (pathname.startsWith("/dashboard/admin")) return "admin";
  return "buyer";
}

const meta: Record<Role, { label: string; blurb: string; icon: typeof UserRound; modules: string[] }> = {
  buyer: {
    label: "Buyer workspace",
    blurb: "Track your shortlist, enquiries and site visits.",
    icon: UserRound,
    modules: ["Saved homes and comparisons", "Enquiry timeline", "Site visits and advisor notes"],
  },
  seller: {
    label: "Seller workspace",
    blurb: "Manage listings, leads and your plan.",
    icon: Building2,
    modules: ["Listing performance", "Lead inbox and status", "Plan usage and billing"],
  },
  admin: {
    label: "Admin workspace",
    blurb: "Platform overview, moderation and revenue.",
    icon: Shield,
    modules: ["Listing moderation queue", "Platform lead volume", "Revenue and city mix"],
  },
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const view = roleFromPath(pathname);
  const { signedIn, role, user, signIn, signOut } = useDemo();
  const { count: savedCount } = useSaved();
  const { count: compareCount } = useCompare();

  const nav =
    view === "buyer"
      ? [
          { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
          { label: "Saved homes", href: "/saved", icon: Heart, count: savedCount },
          { label: "Compare", href: "/compare", icon: GitCompareArrows, count: compareCount },
          { label: "Calculators", href: "/calculators", icon: Calculator },
          { label: "Browse listings", href: "/properties", icon: Building2 },
        ]
      : view === "seller"
        ? [
            { label: "Overview", href: "/dashboard/seller", icon: LayoutDashboard },
            { label: "My listings", href: "#listings", icon: Building2 },
            { label: "Leads", href: "#leads", icon: Inbox },
            { label: "Plan & billing", href: "#plan", icon: CreditCard },
            { label: "Pricing", href: "/pricing", icon: TrendingUp },
            { label: "Add a listing", href: "/list-property", icon: ArrowRight },
          ]
        : [
            { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
            { label: "Moderation", href: "#moderation", icon: Flag },
            { label: "Leads", href: "#leads", icon: Inbox },
            { label: "Users", href: "#users", icon: Users },
            { label: "Revenue", href: "#revenue", icon: TrendingUp },
          ];

  const info = meta[view];
  const Icon = info.icon;

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") !== "1") return;
    if (!signedIn || role !== view) signIn(view);
  }, [role, signedIn, signIn, view]);

  if (!signedIn || role !== view) {
    return (
      <div className="bg-cream py-14">
        <div className="container-page">
          <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <div className="border-b border-line bg-sand/50 p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-forest text-cream">
                <Icon className="size-5" />
              </span>
              <h1 className="mt-4 text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight text-forest">
                Enter the {info.label.toLowerCase()}.
              </h1>
              <p className="mt-2 text-sm text-muted">{info.blurb}</p>
            </div>
            <div className="p-6 sm:p-8">
              <ul className="space-y-2">
                {info.modules.map((module) => (
                  <li key={module} className="flex items-center gap-2 text-[12px] text-forest/80">
                    <span className="size-1.5 rounded-full bg-brass" /> {module}
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-sand/60 p-3.5">
                <p className="text-[10px] leading-relaxed text-muted">
                  {signedIn
                    ? `You are signed in as ${role} (${user.name}). This workspace uses the ${view} demo account for the walkthrough.`
                    : "This is a protected demo area. Sign in to open the workspace — no real account, password or data is involved."}
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Button onClick={() => signIn(view)} iconRight={ArrowRight} className="flex-1">
                  Continue as {view} (demo)
                </Button>
                <ButtonLink href="/login" variant="outline" className="flex-1">
                  Use sign-in page
                </ButtonLink>
              </div>
              <p className="mt-3 text-center text-[9px] text-muted">
                {siteConfig.name} demo · sessions reset when you refresh the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream py-8">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-3">
              <div className="flex items-center gap-2.5 px-2 py-2">
                <span className="grid size-9 place-items-center rounded-full bg-forest text-cream">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-forest">{info.label}</p>
                  <p className="text-[9px] text-muted">Horizon Estates</p>
                </div>
              </div>
              <nav className="mt-2 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label="Dashboard">
                {nav.map((item) => {
                  const NavIcon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-semibold transition",
                        active ? "bg-forest text-cream" : "text-muted hover:bg-sand/70 hover:text-forest",
                      )}
                    >
                      <NavIcon className={cn("size-4", active ? "text-brass-light" : "text-brass/80")} />
                      <span className="whitespace-nowrap">{item.label}</span>
                      {"count" in item && item.count ? (
                        <span
                          className={cn(
                            "ml-auto rounded-full px-1.5 py-0.5 text-[8px]",
                            active ? "bg-white/15 text-cream" : "bg-sand text-brass",
                          )}
                        >
                          {item.count}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-3 hidden border-t border-line pt-3 lg:block">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-[10px] font-semibold text-muted transition hover:text-forest"
                >
                  <ExternalLink className="size-3.5" /> View marketplace
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[10px] font-semibold text-muted transition hover:text-terracotta"
                >
                  <LogOut className="size-3.5" /> Sign out
                </button>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <Badge variant="brass" dot>
                  Demo session
                </Badge>
                <p className="text-[10px] text-muted">
                  Signed in as <span className="font-semibold text-forest">{user.name}</span> · {user.email}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="relative grid size-8 place-items-center rounded-full text-muted transition hover:bg-sand hover:text-forest"
                  aria-label="Notifications"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-terracotta" />
                </button>
                <span className="grid size-8 place-items-center rounded-full bg-forest text-[9px] font-bold text-cream">
                  {user.initials}
                </span>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
