import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export interface LegalSection {
  title: string;
  body: string[];
  bullets?: string[];
}

export function LegalPage({
  title,
  intro,
  updated,
  sections,
  kind,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  kind: "Privacy" | "Terms";
}) {
  return (
    <div className="bg-cream pb-16">
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: kind }]} />
          <div className="mt-5 max-w-3xl">
            <p className="eyebrow text-brass">{kind} policy</p>
            <h1 className="display-balance mt-3 text-[clamp(2.1rem,4.8vw,3.5rem)] leading-[1.05] text-forest">
              {title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted">{intro}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="sand">
                <FileText className="size-3" /> Last updated {updated}
              </Badge>
              <Badge variant="brass">
                <ShieldCheck className="size-3" /> Demo document
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-line bg-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">On this page</p>
            <nav className="mt-3 space-y-1.5">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index + 1}`}
                  className="flex gap-2 text-[10px] leading-relaxed text-muted transition hover:text-forest"
                >
                  <span className="font-serif text-brass">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-3 rounded-2xl bg-forest p-4 text-cream">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Questions?</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-cream/65">
              Write to {siteConfig.email} and a person will respond.
            </p>
            <Link href="/contact" className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-brass-light">
              Contact us <ArrowRight className="size-3" />
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="rounded-2xl border border-brass/25 bg-brass/[0.06] p-4">
            <p className="text-[10px] leading-relaxed text-[#7a5720]">
              This is illustrative copy for a demonstration website. It is not legal advice and should be replaced with
              a reviewed policy before any live launch.
            </p>
          </div>

          <div className="mt-7 space-y-8">
            {sections.map((section, index) => (
              <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-28">
                <h2 className="flex items-baseline gap-3 text-[clamp(1.2rem,2.2vw,1.5rem)] leading-snug text-forest">
                  <span className="font-serif text-base text-brass">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <div className="mt-2.5 space-y-3 pl-7">
                  {section.body.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-[12.5px] leading-[1.85] text-forest/75">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-1.5 pt-1">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-[12.5px] leading-relaxed text-forest/75">
                          <span className="mt-[9px] size-1 shrink-0 rounded-full bg-brass" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-[10px] text-muted">
              Questions about this {kind.toLowerCase()} policy? Email{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-forest hover:text-brass">
                {siteConfig.email}
              </a>{" "}
              or write to {siteConfig.address}.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href="/contact" iconRight={ArrowRight}>
                Contact the team
              </ButtonLink>
              <ButtonLink href={kind === "Privacy" ? "/terms" : "/privacy"} variant="outline">
                Read the {kind === "Privacy" ? "terms" : "privacy policy"}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
