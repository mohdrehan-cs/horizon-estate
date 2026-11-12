"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useToast } from "./ToastProvider";

const MAX_COMPARE = 4;

interface CompareContextValue {
  compare: string[];
  isCompared: (slug: string) => boolean;
  toggleCompare: (slug: string, title?: string) => void;
  removeCompare: (slug: string) => void;
  clearCompare: () => void;
  count: number;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compare, setCompare] = useState<string[]>([]);
  const { toast } = useToast();

  const isCompared = useCallback((slug: string) => compare.includes(slug), [compare]);

  const toggleCompare = useCallback(
    (slug: string, title?: string) => {
      setCompare((current) => {
        if (current.includes(slug)) {
          toast(`Removed${title ? ` “${title}”` : ""} from comparison.`, "info");
          return current.filter((item) => item !== slug);
        }
        if (current.length >= MAX_COMPARE) {
          toast(`You can compare up to ${MAX_COMPARE} homes. Remove one to add another.`, "error");
          return current;
        }
        toast(`Added${title ? ` “${title}”` : ""} to comparison (${current.length + 1}/${MAX_COMPARE}).`);
        return [...current, slug];
      });
    },
    [toast],
  );

  const removeCompare = useCallback((slug: string) => {
    setCompare((current) => current.filter((item) => item !== slug));
  }, []);

  const clearCompare = useCallback(() => {
    setCompare([]);
    toast("Comparison cleared.", "info");
  }, [toast]);

  const value = useMemo(
    () => ({
      compare,
      isCompared,
      toggleCompare,
      removeCompare,
      clearCompare,
      count: compare.length,
      isFull: compare.length >= MAX_COMPARE,
    }),
    [compare, isCompared, toggleCompare, removeCompare, clearCompare],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}
