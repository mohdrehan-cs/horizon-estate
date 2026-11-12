"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2 print:hidden">
      {open ? (
        <div className="w-[280px] overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-white/15">
                <MessageCircle className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold leading-none">Horizon Concierge</p>
                <p className="mt-1 flex items-center gap-1 text-[9px] text-white/70">
                  <span className="size-1.5 rounded-full bg-[#25D366]" />
                  Typically replies in 10 min
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close WhatsApp chat" className="text-white/70 hover:text-white">
              <X className="size-4" />
            </button>
          </div>
          <div className="p-4">
            <div className="rounded-xl rounded-tl-sm bg-[#f0f2f5] p-3 text-[11px] leading-relaxed text-ink">
              Hi! Looking to buy, rent or list in Delhi NCR? Tell us your budget and preferred locality — we&apos;ll send
              a short, human shortlist.
            </div>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                "Hi Horizon Estates, I'd like help with a property in Delhi NCR.",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] text-xs font-bold text-white transition hover:bg-[#1fb857]"
            >
              <MessageCircle className="size-4" />
              Start on WhatsApp
            </a>
            <p className="mt-2 text-center text-[9px] text-muted">
              Demo link · opens WhatsApp with a prefilled message
            </p>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setOpen((value) => !value)}
        aria-label="Chat with Horizon on WhatsApp"
        className="group flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_-10px_rgba(37,211,102,0.65)] transition hover:scale-105"
      >
        <MessageCircle className="size-6" />
        <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-cream bg-brass" />
      </button>
    </div>
  );
}
