"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Shield,
  UserRound,
} from "lucide-react";
import type { Role } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Field";
import { useDemo } from "@/components/providers/DemoProvider";

const roles: {
  role: Role;
  label: string;
  email: string;
  icon: typeof UserRound;
  href: string;
  note: string;
}[] = [
  {
    role: "buyer",
    label: "Buyer",
    email: "aarav.mehta@example.com",
    icon: UserRound,
    href: "/dashboard",
    note: "Saved homes, enquiries and shortlist",
  },
  {
    role: "seller",
    label: "Seller / Agent",
    email: "sanya@noidanest.in",
    icon: Building2,
    href: "/dashboard/seller",
    note: "Listings, leads and plan usage",
  },
  {
    role: "admin",
    label: "Admin",
    email: "ops@horizonestates.in",
    icon: Shield,
    href: "/dashboard/admin",
    note: "Platform overview and moderation",
  },
];

export function LoginForm() {
  const router = useRouter();
  const { signIn } = useDemo();
  const [active, setActive] = useState<Role>("buyer");
  const [email, setEmail] = useState(roles[0].email);
  const [password, setPassword] = useState("demo1234");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const role = roles.find((item) => item.role === active)!;

  function switchRole(next: (typeof roles)[number]) {
    setActive(next.role);
    setEmail(next.email);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signIn(active);
      router.push(role.href);
    }, 800);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 rounded-2xl border border-line bg-sand/60 p-1">
        {roles.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.role}
              type="button"
              onClick={() => switchRole(item)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-[11px] font-bold transition",
                active === item.role ? "bg-white text-forest shadow-sm" : "text-muted hover:text-forest",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-center text-[10px] text-muted">{role.note}</p>

      <form onSubmit={submit} className="mt-6">
        <div className="space-y-4">
          <Input
            id="login-email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label htmlFor="login-password" className="mb-0">
                Password
              </Label>
              <button type="button" className="text-[10px] font-semibold text-brass hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="login-password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="pr-11"
              />
              <button
                type="button"
                onClick={() => setShow((value) => !value)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-forest"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-[11px] text-muted">
            <input type="checkbox" defaultChecked className="size-3.5 accent-forest" />
            Keep me signed in
          </label>
          <span className="flex items-center gap-1 text-[10px] text-muted">
            <Lock className="size-3 text-brass" /> Simulated session
          </span>
        </div>

        <Button type="submit" className="mt-5 w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Signing in…" : `Sign in as ${role.label}`}
        </Button>
      </form>

      <div className="mt-5 rounded-xl border border-line bg-sand/50 p-3.5">
        <p className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
          <Check className="mt-0.5 size-3.5 shrink-0 text-brass" />
          Use the demo credentials above, or type any password. This is a simulated sign-in — no account is created and
          no credentials are sent anywhere.
        </p>
      </div>

      <div className="mt-5 flex flex-col items-center gap-1.5 text-center">
        <p className="text-[11px] text-muted">
          New to Horizon?{" "}
          <Link href="/list-property" className="font-bold text-forest hover:text-brass">
            List a property
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-bold text-forest hover:text-brass">
            talk to the team
          </Link>
          .
        </p>
        <Link href="/" className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-brass">
          Continue browsing without signing in <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
