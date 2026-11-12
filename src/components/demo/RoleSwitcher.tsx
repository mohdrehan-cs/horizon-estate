"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building2, ChevronUp, Shield, UserRound, X } from "lucide-react";
import { useState } from "react";
import type { Role } from "@/types";
import { cn } from "@/lib/utils";
import { useDemo } from "@/components/providers/DemoProvider";

const roles: { role: Role; label: string; description: string; href: string; icon: typeof UserRound }[] = [
  {
    role: "buyer",
    label: "Buyer",
    description: "Saved homes, enquiries and shortlist",
    href: "/dashboard",
    icon: UserRound,
  },
  {
    role: "seller",
    label: "Seller / Agent",
    description: "Listings, leads and plan usage",
    href: "/dashboard/seller",
    icon: Building2,
  },
  {
    role: "admin",
    label: "Admin",
    description: "Platform overview and moderation",
    href: "/dashboard/admin",
    icon: Shield,
  },
];

export function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const { role, setRole, user, signedIn } = useDemo();
  const active = roles.find((item) => item.role === role)!;

  return (
    <div className="fixed bottom-5 left-5 z-[60] print:hidden">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="mb-3 w-[300px] overflow-hidden rounded-2xl border border-line bg-cream shadow-soft"
          >
            <div className="flex items-start justify-between border-b border-line bg-white/60 px-4 py-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass">Demo controls</p>
                <p className="mt-1 text-[13px] font-bold text-forest">Switch perspective</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close demo controls"
                className="rounded-full p-1 text-muted transition hover:bg-sand hover:text-forest"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-1 p-2">
              {roles.map((item) => {
                const Icon = item.icon;
                const selected = item.role === role;
                return (
                  <div key={item.role}>
                    <button
                      onClick={() => setRole(item.role)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition",
                        selected ? "bg-forest text-cream" : "hover:bg-white",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full",
                          selected ? "bg-white/10 text-brass-light" : "bg-sand text-forest",
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={cn("block text-[12px] font-bold", selected ? "text-cream" : "text-forest")}>
                          {item.label}
                        </span>
                        <span className={cn("mt-0.5 block text-[10px]", selected ? "text-cream/60" : "text-muted")}>
                          {item.description}
                        </span>
                      </span>
                      <ArrowUpRight className={cn("mt-1 size-3.5", selected ? "text-brass-light" : "text-muted/50")} />
                    </button>
                    {selected ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="ml-11 mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-brass transition hover:text-forest"
                      >
                        Open {item.label.toLowerCase()} dashboard <ArrowUpRight className="size-3" />
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-line bg-sand/50 px-4 py-3">
              <p className="text-[10px] leading-relaxed text-muted">
                {signedIn
                  ? `Signed in as ${user.email}. This is a simulated session.`
                  : "You are browsing as a guest. The demo session is simulated; no real account is created."}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-forest/15 bg-forest px-3 py-2 text-cream shadow-soft transition hover:bg-forest-dark"
        aria-label="Open demo role switcher"
        aria-expanded={open}
      >
        <span className="grid size-6 place-items-center rounded-full bg-brass text-[10px] font-extrabold text-white">D</span>
        <span className="text-[11px] font-bold">
          Demo · <span className="text-brass-light">{active.label}</span>
        </span>
        <ChevronUp className={cn("size-3.5 text-cream/60 transition", open && "rotate-180")} />
      </button>
    </div>
  );
}
