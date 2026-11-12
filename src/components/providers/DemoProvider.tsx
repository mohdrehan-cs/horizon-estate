"use client";

import type { Role } from "@/types";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useToast } from "./ToastProvider";

export interface DemoUser {
  name: string;
  email: string;
  role: Role;
  initials: string;
  since: string;
}

const users: Record<Role, DemoUser> = {
  buyer: {
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    role: "buyer",
    initials: "AM",
    since: "2024",
  },
  seller: {
    name: "Sanya Kapoor",
    email: "sanya@noidanest.in",
    role: "seller",
    initials: "SK",
    since: "2023",
  },
  admin: {
    name: "Horizon Ops",
    email: "ops@horizonestates.in",
    role: "admin",
    initials: "HO",
    since: "2022",
  },
};

interface DemoContextValue {
  role: Role;
  user: DemoUser;
  signedIn: boolean;
  setRole: (role: Role) => void;
  signIn: (role?: Role) => void;
  signOut: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("buyer");
  const [signedIn, setSignedIn] = useState(false);
  const { toast } = useToast();

  const setRole = useCallback(
    (next: Role) => {
      setRoleState(next);
      toast(`Viewing as ${next.charAt(0).toUpperCase() + next.slice(1)} — ${users[next].name}`, "info");
    },
    [toast],
  );

  const signIn = useCallback(
    (next: Role = "buyer") => {
      setRoleState(next);
      setSignedIn(true);
      toast(`Welcome back, ${users[next].name.split(" ")[0]}. Demo session started.`);
    },
    [toast],
  );

  const signOut = useCallback(() => {
    setSignedIn(false);
    toast("Signed out of the demo session.", "info");
  }, [toast]);

  const value = useMemo(
    () => ({ role, user: users[role], signedIn, setRole, signIn, signOut }),
    [role, signedIn, setRole, signIn, signOut],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within DemoProvider");
  return context;
}
