"use client";

import { CompareProvider } from "./CompareProvider";
import { DemoProvider } from "./DemoProvider";
import { SavedProvider } from "./SavedProvider";
import { ToastProvider } from "./ToastProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DemoProvider>
        <SavedProvider>
          <CompareProvider>{children}</CompareProvider>
        </SavedProvider>
      </DemoProvider>
    </ToastProvider>
  );
}
