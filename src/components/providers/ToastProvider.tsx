"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current.slice(-2), { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3800);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {toasts.map((item) => {
            const Icon = icons[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-forest/10 bg-forest px-4 py-3 text-cream shadow-soft"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-brass-light" />
                <p className="flex-1 text-sm leading-snug">{item.message}</p>
                <button
                  onClick={() => setToasts((current) => current.filter((t) => t.id !== item.id))}
                  className="rounded-full p-1 text-cream/60 transition hover:bg-white/10 hover:text-cream"
                  aria-label="Dismiss notification"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { toast: (message: string) => console.info(message) };
  }
  return context;
}
