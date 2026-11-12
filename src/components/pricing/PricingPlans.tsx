"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import type { Plan } from "@/types";
import { formatINRFull } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/providers/ToastProvider";

function monthlyValue(plan: Plan) {
  const digits = plan.price.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

export function PricingPlans({ plans }: { plans: Plan[] }) {
  const { toast } = useToast();
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState<Plan | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  function openPlan(plan: Plan) {
    setSelected(plan);
    setPaid(false);
    setProcessing(false);
  }

  function close() {
    if (processing) return;
    setSelected(null);
    setPaid(false);
  }

  function pay() {
    if (!selected) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      toast(
        selected.name === "Explorer"
          ? "Explorer plan activated — demo only. No account was created."
          : `${selected.name} plan confirmed — demo only. No payment was collected.`,
      );
    }, 1400);
  }

  const base = selected ? (annual ? monthlyValue(selected) * 10 : monthlyValue(selected)) : 0;
  const gst = Math.round(base * 0.18);
  const total = base + gst;

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex rounded-full border border-line bg-white p-1 shadow-sm">
          <button
            onClick={() => setAnnual(false)}
            className={cn(
              "rounded-full px-4 py-2 text-[11px] font-bold transition",
              !annual ? "bg-forest text-cream" : "text-muted hover:text-forest",
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold transition",
              annual ? "bg-forest text-cream" : "text-muted hover:text-forest",
            )}
          >
            Annual
            <span className={cn("rounded-full px-1.5 py-0.5 text-[8px]", annual ? "bg-brass text-white" : "bg-sand text-brass")}>
              2 months free
            </span>
          </button>
        </div>
        <p className="text-[10px] text-muted">All prices exclude 18% GST. Cancel monthly plans anytime.</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const bespoke = plan.name === "Bespoke";
          const price = annual && monthlyValue(plan) ? `₹${(monthlyValue(plan) * 10).toLocaleString("en-IN")}` : plan.price;
          const period = annual && monthlyValue(plan) ? "per year" : plan.period;
          return (
            <article
              key={plan.name}
              className={cn(
                "relative flex h-full flex-col rounded-3xl border p-5 transition",
                plan.popular
                  ? "border-forest bg-forest text-cream shadow-card"
                  : "border-line bg-white hover:border-forest/25",
              )}
            >
              {plan.popular ? (
                <span className="absolute -top-2.5 left-5 rounded-full bg-brass px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                  Most popular
                </span>
              ) : null}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={cn("text-xl", plan.popular ? "text-cream" : "text-forest")}>{plan.name}</h3>
                  <p className={cn("mt-1 text-[10px] leading-relaxed", plan.popular ? "text-cream/55" : "text-muted")}>
                    {plan.description}
                  </p>
                </div>
                {plan.popular ? <Sparkles className="mt-1 size-4 shrink-0 text-brass-light" /> : null}
              </div>

              <div className="mt-5 flex items-end gap-1.5">
                <p className={cn("font-serif text-[2rem] leading-none", plan.popular ? "text-cream" : "text-forest")}>{price}</p>
                <p className={cn("pb-1 text-[9px]", plan.popular ? "text-cream/45" : "text-muted")}>{period}</p>
              </div>

              <div className={cn("mt-4 space-y-1 border-y py-3 text-[10px]", plan.popular ? "border-white/10" : "border-line")}>
                <p className={cn("flex justify-between gap-2", plan.popular ? "text-cream/70" : "text-forest/80")}>
                  <span>Listings</span>
                  <span className="font-semibold">{plan.listings}</span>
                </p>
                <p className={cn("flex justify-between gap-2", plan.popular ? "text-cream/70" : "text-forest/80")}>
                  <span>Featured</span>
                  <span className="font-semibold">{plan.featured}</span>
                </p>
                <p className={cn("flex justify-between gap-2", plan.popular ? "text-cream/70" : "text-forest/80")}>
                  <span>Leads</span>
                  <span className="text-right font-semibold">{plan.leads}</span>
                </p>
              </div>

              <ul className="mt-4 flex-1 space-y-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn("flex items-start gap-1.5 text-[10px] leading-relaxed", plan.popular ? "text-cream/70" : "text-muted")}
                  >
                    <Check className={cn("mt-0.5 size-3 shrink-0", plan.popular ? "text-brass-light" : "text-brass")} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                {bespoke ? (
                  <ButtonLink
                    href="/contact"
                    variant={plan.popular ? "light" : "outline"}
                    size="sm"
                    className="w-full"
                    iconRight={ArrowRight}
                  >
                    Talk to sales
                  </ButtonLink>
                ) : (
                  <Button
                    onClick={() => openPlan(plan)}
                    variant={plan.popular ? "brass" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {plan.name === "Explorer" ? "Start free" : `Choose ${plan.name}`}
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] text-muted">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-brass" /> No lock-in on monthly plans
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle className="size-3.5 text-brass" /> WhatsApp lead routing included
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-brass" /> Demo checkout — no card details collected
        </span>
      </div>

      <Modal
        open={Boolean(selected)}
        onClose={close}
        title={paid ? "Plan confirmed" : selected?.name === "Explorer" ? "Start with Explorer" : "Demo checkout"}
        description={
          paid
            ? "This is a demonstration. No payment was taken and no subscription was created."
            : `${selected?.name} plan · ${annual && monthlyValue(selected ?? plans[0]) ? "billed annually" : "billed monthly"}`
        }
      >
        {selected ? (
          paid ? (
            <div className="text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#eef5ec] text-[#2f5a3c]">
                <Check className="size-7" />
              </div>
              <p className="mt-4 text-sm font-bold text-forest">
                {selected.name === "Explorer" ? "Free plan activated" : `${selected.name} plan activated`}
              </p>
              <p className="mx-auto mt-2 max-w-sm text-[11px] leading-relaxed text-muted">
                In the live product you would now be able to publish listings, connect WhatsApp enquiries and track
                leads from your seller dashboard.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
                <ButtonLink href="/dashboard/seller" iconRight={ArrowRight}>
                  Open seller dashboard
                </ButtonLink>
                <Button variant="outline" onClick={close}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="rounded-2xl border border-line bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-bold text-forest">{selected.name} plan</p>
                    <p className="text-[10px] text-muted">
                      {annual && monthlyValue(selected) ? "Annual billing · 2 months free" : selected.period}
                    </p>
                  </div>
                  <p className="text-[14px] font-bold text-forest">
                    {base ? formatINRFull(base) : selected.price}
                  </p>
                </div>
                {base ? (
                  <div className="mt-3 space-y-1.5 border-t border-line pt-3 text-[10px]">
                    <div className="flex justify-between text-muted">
                      <span>Subtotal</span>
                      <span>{formatINRFull(base)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>GST (18%)</span>
                      <span>{formatINRFull(gst)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-forest">
                      <span>Total due today</span>
                      <span>{formatINRFull(total)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-[10px] text-muted">No payment required.</p>
                )}
              </div>

              <div className="mt-4 rounded-xl bg-sand/60 p-3.5">
                <p className="text-[10px] leading-relaxed text-muted">
                  This is a simulated checkout. No card fields, no payment gateway and no data is collected. In the live
                  product, this step would use a Razorpay or Stripe subscription flow.
                </p>
              </div>

              <Button onClick={pay} className="mt-4 w-full" disabled={processing}>
                {processing ? <Loader2 className="size-4 animate-spin" /> : null}
                {processing
                  ? "Processing demo payment…"
                  : selected.name === "Explorer"
                    ? "Activate free plan (demo)"
                    : `Pay ${formatINRFull(total)} (demo)`}
              </Button>
            </div>
          )
        ) : null}
      </Modal>
    </>
  );
}
