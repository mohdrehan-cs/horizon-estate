"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2, MessageCircle, Phone } from "lucide-react";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import { useToast } from "@/components/providers/ToastProvider";

const interests = [
  "Buying a home",
  "Selling a property",
  "Renting or leasing",
  "NRI advisory",
  "Developer / project enquiry",
  "Something else",
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const requestedService = services.find((service) => service.slug === searchParams.get("service"));
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: requestedService ? requestedService.name : interests[0],
    message: requestedService ? `I would like to discuss ${requestedService.name.toLowerCase()}.` : "",
    contact: "WhatsApp",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      toast("Add your name and either a phone number or email.", "error");
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      toast("Enquiry simulated — demo only. Nothing was sent.");
    }, 1100);
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-white p-7 text-center sm:p-10">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#e6efe4] text-[#2f5a3c]">
          <Check className="size-7" />
        </div>
        <h2 className="mt-4 text-2xl text-forest">Thank you, {form.name.split(" ")[0]}.</h2>
        <p className="mx-auto mt-2 max-w-sm text-[12px] leading-relaxed text-muted">
          In the live site, your enquiry would now be routed to a named advisor and acknowledged on{" "}
          {form.contact.toLowerCase()} within one working day. Nothing was actually sent in this demo.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send another enquiry
          </Button>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              `Hi Horizon, I'd like to discuss ${form.interest.toLowerCase()}.`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-forest px-5 text-sm font-semibold text-cream transition hover:bg-forest-dark"
          >
            <MessageCircle className="size-4" /> Continue on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-brass">Start here</p>
          <h2 className="mt-2 text-2xl text-forest">Tell us what you are deciding.</h2>
          <p className="mt-1.5 text-[11px] text-muted">A short brief is enough. We will ask the rest on the call.</p>
        </div>
        {requestedService ? (
          <span className="rounded-full bg-sand px-3 py-1.5 text-[10px] font-bold text-forest">
            Enquiring about: {requestedService.name}
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          id="contact-name"
          label="Full name"
          placeholder="Aarav Mehta"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          required
        />
        <Input
          id="contact-phone"
          label="Phone"
          type="tel"
          placeholder="+91 98xxx xxxxx"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
          hint="Used only for this enquiry."
        />
        <Input
          id="contact-email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
        />
        <Select
          id="contact-interest"
          label="I am interested in"
          value={form.interest}
          onChange={(event) => update("interest", event.target.value)}
        >
          {interests.map((interest) => (
            <option key={interest}>{interest}</option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <Textarea
          id="contact-message"
          label="What would help most?"
          placeholder="Budget, preferred localities, timeline, or the decision you are stuck on…"
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          rows={5}
        />
      </div>

      <div className="mt-4">
        <Label>Preferred reply</Label>
        <div className="flex flex-wrap gap-2">
          {["WhatsApp", "Phone call", "Email"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update("contact", option)}
              className={`rounded-full border px-3.5 py-2 text-[11px] font-semibold transition ${
                form.contact === option
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-white text-muted hover:border-forest/30 hover:text-forest"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[10px] leading-relaxed text-muted">
          Demo form. No data is stored or transmitted. In the live site, enquiries are screened before hand-off.
        </p>
        <Button type="submit" disabled={status === "sending"} iconRight={status === "sending" ? undefined : ArrowRight}>
          {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : null}
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
