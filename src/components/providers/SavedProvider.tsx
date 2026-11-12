"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useToast } from "./ToastProvider";

interface SavedContextValue {
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string, title?: string) => void;
  clearSaved: () => void;
  count: number;
}

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const { toast } = useToast();

  const isSaved = useCallback((slug: string) => saved.includes(slug), [saved]);

  const toggleSaved = useCallback(
    (slug: string, title?: string) => {
      setSaved((current) => {
        const exists = current.includes(slug);
        toast(
          exists
            ? `Removed${title ? ` “${title}”` : " property"} from saved homes.`
            : `Saved${title ? ` “${title}”` : " property"} to your shortlist.`,
          exists ? "info" : "success",
        );
        return exists ? current.filter((item) => item !== slug) : [...current, slug];
      });
    },
    [toast],
  );

  const clearSaved = useCallback(() => {
    setSaved([]);
    toast("Saved homes cleared.", "info");
  }, [toast]);

  const value = useMemo(
    () => ({ saved, isSaved, toggleSaved, clearSaved, count: saved.length }),
    [saved, isSaved, toggleSaved, clearSaved],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) throw new Error("useSaved must be used within SavedProvider");
  return context;
}
