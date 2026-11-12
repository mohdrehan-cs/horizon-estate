"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, ChevronDown, MessageCircle, Phone, Star } from "lucide-react";
import type { Agent } from "@/types";
import { siteConfig } from "@/config/site";
import { EnquiryForm } from "@/components/leads/EnquiryForm";
import { cn } from "@/lib/utils";

export function AgentContactCard({
  agent,
  propertyTitle,
}: {
  agent: Agent;
  propertyTitle: string;
}) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-line bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Image src={agent.avatar} alt={agent.name} width={56} height={56} className="size-14 rounded-2xl object-cover" />
          {agent.verified ? (
            <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-white bg-forest text-cream">
              <BadgeCheck className="size-3" />
            </span>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">{agent.agency}</p>
          <p className="mt-0.5 truncate text-base font-bold text-forest">{agent.name}</p>
          <p className="flex items-center gap-1 text-[10px] text-muted">
            <Star className="size-3 fill-brass text-brass" /> {agent.rating} · {agent.experience} · RERA verified
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-sand/70 px-3.5 py-2.5">
        <p className="text-[10px] leading-relaxed text-muted">
          <span className="font-semibold text-forest">Knows this property.</span> Usually responds within 15 minutes
          during business hours.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
            `Hi ${agent.name.split(" ")[0]}, I'm interested in "${propertyTitle}" on Horizon Estates.`,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[11px] font-bold text-white transition hover:bg-[#1fb857]"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </a>
        <a
          href={siteConfig.phoneHref}
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-forest/20 text-[11px] font-bold text-forest transition hover:bg-forest/[0.04]"
        >
          <Phone className="size-4" /> Call
        </a>
      </div>

      <button
        onClick={() => setFormOpen((value) => !value)}
        className="mt-2 flex w-full items-center justify-between rounded-full bg-forest px-4 py-3 text-[11px] font-bold text-cream transition hover:bg-forest-dark"
      >
        Request a callback
        <ChevronDown className={cn("size-4 transition", formOpen && "rotate-180")} />
      </button>

      {formOpen ? (
        <div className="mt-4 border-t border-line pt-4">
          <EnquiryForm propertyTitle={propertyTitle} agentName={agent.name} compact />
        </div>
      ) : (
        <p className="mt-3 text-center text-[9px] leading-relaxed text-muted">
          Your details stay private. No spam, no lead resale. Demo form only.
        </p>
      )}
    </div>
  );
}
