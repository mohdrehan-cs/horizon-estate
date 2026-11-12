import { Suspense } from "react";
import { PropertyExplorer } from "@/components/property/PropertyExplorer";

export const metadata = {
  title: "Property for sale & rent in Delhi, Noida & Greater Noida",
  description:
    "Browse 24 verified homes, builder floors, villas, plots and rentals across Delhi, Noida and Greater Noida. Filter by BHK, budget, locality, RERA and amenities.",
};

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-10">
          <div className="h-6 w-52 rounded-full skeleton" />
          <div className="mt-4 h-10 w-80 rounded-xl skeleton" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[268px_1fr]">
            <div className="h-[600px] rounded-2xl skeleton" />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[380px] rounded-2xl skeleton" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <PropertyExplorer />
    </Suspense>
  );
}
