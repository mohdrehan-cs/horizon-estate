import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Check, ShieldCheck, Sparkles } from "lucide-react";
import { img } from "@/data/images";
import { siteConfig } from "@/config/site";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in to your Horizon account",
  description:
    "Sign in to your buyer, seller or admin dashboard. Preview saved homes, listings, leads and platform operations in the Horizon Estates demo.",
};

const benefits = [
  "Shortlist homes and compare them side by side",
  "Track enquiries and site visits in one place",
  "Manage listings, leads and plan usage",
  "Admin view: moderation, users and revenue",
];

export default function LoginPage() {
  return (
    <div className="bg-cream">
      <div className="container-page py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted transition hover:text-forest"
        >
          <ArrowLeft className="size-3.5" /> Back to Horizon
        </Link>
      </div>

      <div className="container-page grid gap-6 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <section className="relative isolate hidden min-h-[600px] overflow-hidden rounded-3xl bg-forest lg:block">
          <Image src={img.heroSecondary} alt="" fill priority sizes="50vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/40 via-forest-dark/80 to-forest-dark" />
          <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-10">
            <div>
              <p className="flex items-center gap-2.5">
                <span className="grid size-10 place-items-center rounded-full border border-brass/40 bg-white/5 font-serif text-xl text-cream">
                  H
                </span>
                <span>
                  <span className="block font-serif text-xl text-cream">Horizon Estates</span>
                  <span className="block text-[8px] font-bold uppercase tracking-[0.3em] text-brass-light">
                    Delhi · Noida · Greater Noida
                  </span>
                </span>
              </p>
              <h1 className="mt-10 max-w-md text-[clamp(2rem,3.4vw,3rem)] leading-[1.08] text-cream">
                Your property file, in one calm place.
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
                One account for the homes you are considering, the enquiries you have made and the people helping you.
              </p>
              <ul className="mt-7 space-y-2.5">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-[12px] text-cream/75">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brass/20 text-brass-light">
                      <Check className="size-3" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-[13px] leading-relaxed text-cream/80">
                &ldquo;They told us not to buy the first flat we loved. Six weeks later we found a better one, on a
                quieter street, for less. That is worth paying for.&rdquo;
              </p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">
                Nandini &amp; Rohit · Greater Kailash
              </p>
              <div className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-3 text-[9px] text-cream/45">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3 text-brass-light" /> RERA-aware process
                </span>
                <span className="flex items-center gap-1">
                  <BadgeCheck className="size-3 text-brass-light" /> Verified listings
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="size-3 text-brass-light" /> 4.8 client rating
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-white p-6 sm:p-8">
            <p className="eyebrow text-brass">Welcome back</p>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.2rem)] leading-tight text-forest">Sign in to Horizon.</h2>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              Choose a perspective below. The demo includes buyer, seller and admin experiences — all simulated.
            </p>
            <div className="mt-6">
              <LoginForm />
            </div>
            <p className="mt-6 border-t border-line pt-4 text-center text-[9px] leading-relaxed text-muted">
              {siteConfig.name} · RERA {siteConfig.rera} · This is a demonstration environment. Do not enter real
              credentials.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
