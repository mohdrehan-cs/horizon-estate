import Link from "next/link";
import { ArrowRight, Compass, Home, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const suggestions = [
  { label: "Homes for sale", href: "/properties?listingType=sale" },
  { label: "Homes for rent", href: "/properties?listingType=rent" },
  { label: "New projects", href: "/projects" },
  { label: "EMI calculator", href: "/calculators" },
  { label: "The Horizon Journal", href: "/blog" },
];

export default function NotFound() {
  return (
    <div className="bg-cream py-16 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-[clamp(5rem,16vw,9rem)] leading-none text-forest/10">404</p>
          <p className="eyebrow -mt-4 text-brass">The address is not on our map</p>
          <h1 className="display-balance mt-3 text-[clamp(1.9rem,4.4vw,3rem)] leading-tight text-forest">
            This page has moved, or never existed.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            Property links change when listings are withdrawn. Try the search, browse the current listings, or ask us to
            find what you were looking for.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/properties" icon={Search}>
              Search homes
            </ButtonLink>
            <ButtonLink href="/" variant="outline" icon={Home}>
              Back to home
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-line bg-white p-5">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brass">
            <Compass className="size-3.5" /> Popular starting points
          </p>
          <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {suggestions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-forest transition hover:bg-sand/60 hover:text-brass"
              >
                {item.label} <ArrowRight className="size-3" />
              </Link>
            ))}
          </div>
          <p className="mt-3 border-t border-line pt-3 text-[10px] text-muted">
            Still stuck?{" "}
            <Link href="/contact" className="font-semibold text-brass hover:underline">
              Tell us what you were looking for
            </Link>{" "}
            and we will point you to the right page.
          </p>
        </div>
      </div>
    </div>
  );
}
