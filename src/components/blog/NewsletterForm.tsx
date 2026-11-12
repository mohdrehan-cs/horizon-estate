"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Field";
import { useToast } from "@/components/providers/ToastProvider";

export function NewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      toast("Enter a valid email address.", "error");
      return;
    }
    setState("loading");
    setTimeout(() => {
      setState("done");
      toast("You are on the list — demo only. No email was stored.");
    }, 900);
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-[#c6dbc2] bg-[#e6efe4] px-4 py-2.5 text-[11px] font-semibold text-[#2f5a3c]">
        <Check className="size-4" /> Subscribed — demo only
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md items-center gap-2">
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        className="h-10"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-brass px-4 text-[11px] font-bold text-white transition hover:bg-[#a3762f] disabled:opacity-60"
      >
        {state === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : null}
        Subscribe
        {state !== "loading" ? <ArrowRight className="size-3.5" /> : null}
      </button>
    </form>
  );
}
