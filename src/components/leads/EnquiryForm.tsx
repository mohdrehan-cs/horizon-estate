"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export function EnquiryForm({
  propertyTitle,
  agentName,
  className,
  compact,
}: {
  propertyTitle?: string;
  agentName?: string;
  className?: string;
  compact?: boolean;
}) {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) nextErrors.phone = "Enter a valid phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("sent");
      toast(
        propertyTitle
          ? `Enquiry sent to ${agentName ?? "the Horizon team"}. They will call you shortly.`
          : "Thank you. A Horizon advisor will be in touch within one working day.",
      );
    }, 1100);
  }

  if (status === "sent") {
    return (
      <div className={cn("rounded-2xl border border-[#c6dbc2] bg-[#eef5ec] p-6 text-center", className)}>
        <CheckCircle2 className="mx-auto size-10 text-[#2f5a3c]" />
        <h3 className="mt-3 text-xl text-forest">Enquiry received</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This is a demo confirmation — no message has been sent. In the live site, this lead would appear in the agent
          dashboard and trigger a WhatsApp notification.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 text-xs font-bold text-white"
          >
            <MessageCircle className="size-4" /> Continue on WhatsApp
          </a>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-line bg-white px-4 text-xs font-bold text-forest"
          >
            <Phone className="size-4" /> {siteConfig.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("space-y-3.5", className)}>
      {propertyTitle ? (
        <p className="rounded-xl bg-sand/70 px-3.5 py-2.5 text-[11px] leading-relaxed text-muted">
          Enquiring about <span className="font-semibold text-forest">{propertyTitle}</span>
        </p>
      ) : null}
      <div className={cn("grid gap-3.5", !compact && "sm:grid-cols-2")}>
        <Input id="lead-name" name="name" label="Full name" placeholder="Your name" autoComplete="name" />
        <Input
          id="lead-phone"
          name="phone"
          label="Phone / WhatsApp"
          placeholder="+91 98XXX XXXXX"
          type="tel"
          autoComplete="tel"
        />
      </div>
      <Input id="lead-email" name="email" label="Email (optional)" placeholder="you@example.com" type="email" />
      {!compact ? (
        <Select id="lead-budget" name="budget" label="Budget" defaultValue="">
          <option value="">Select a budget</option>
          <option>Under ₹1 Cr</option>
          <option>₹1 Cr – ₹2 Cr</option>
          <option>₹2 Cr – ₹4 Cr</option>
          <option>₹4 Cr+</option>
          <option>Rental enquiry</option>
        </Select>
      ) : null}
      <Textarea
        id="lead-message"
        name="message"
        label="Anything we should know?"
        placeholder="Preferred locality, timeline, loan requirement…"
        rows={3}
      />
      {Object.keys(errors).length ? (
        <p className="text-[11px] font-medium text-terracotta">{Object.values(errors)[0]}</p>
      ) : null}
      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : null}
        {status === "submitting" ? "Sending enquiry…" : "Request a callback"}
      </Button>
      <p className="text-center text-[10px] leading-relaxed text-muted">
        Demo form. No data is stored or transmitted. By continuing you agree to our privacy policy.
      </p>
    </form>
  );
}
