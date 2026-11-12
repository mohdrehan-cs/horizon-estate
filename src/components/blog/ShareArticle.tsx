"use client";

import { useState } from "react";
import { Briefcase, Check, Link2, MessageCircle } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";

export function ShareArticle({ title, slug }: { title: string; slug: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const url = `https://horizonestates.in/blog/${slug}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast("Article link copied.");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Could not copy the link in this browser.", "error");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Share</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on WhatsApp"
        className="grid size-8 place-items-center rounded-full border border-line bg-white text-forest transition hover:border-forest/30 hover:text-brass"
      >
        <MessageCircle className="size-3.5" />
      </a>
      <a
        href="https://www.linkedin.com/sharing/share-offsite/"
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
        className="grid size-8 place-items-center rounded-full border border-line bg-white text-forest transition hover:border-forest/30 hover:text-brass"
      >
        <Briefcase className="size-3.5" />
      </a>
      <button
        onClick={copy}
        aria-label="Copy article link"
        className="grid size-8 place-items-center rounded-full border border-line bg-white text-forest transition hover:border-forest/30 hover:text-brass"
      >
        {copied ? <Check className="size-3.5 text-[#2f5a3c]" /> : <Link2 className="size-3.5" />}
      </button>
    </div>
  );
}
