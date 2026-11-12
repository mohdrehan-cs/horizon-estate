import type { Metadata } from "next";
import { ArrowRight, BookOpen, MapPin, PenLine } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Horizon Journal — property guides, market insight & checklists",
  description:
    "Practical guides to buying, selling and renting in Delhi, Noida and Greater Noida. Stamp duty explainers, locality comparisons, DDA checklists and market insight from our advisors.",
};

export default function BlogPage() {
  const [editorPick, ...rest] = blogPosts;

  return (
    <div className="bg-cream pb-16">
      <section className="border-b border-line bg-sand/50">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="eyebrow text-brass">The Horizon Journal</p>
              <h1 className="display-balance mt-3 text-[clamp(2.2rem,5vw,3.7rem)] leading-[1.04] text-forest">
                Property, with the noise turned down.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                We write for the decisions people actually make: which sector to shortlist, what stamp duty really
                costs, and when a listing is not worth your Saturday. No sponsored rankings.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="brass">
                  <PenLine className="size-3" /> Written by our advisors
                </Badge>
                <Badge variant="sand">
                  <MapPin className="size-3" /> Delhi · Noida · Greater Noida
                </Badge>
                <Badge variant="outline">
                  <BookOpen className="size-3" /> {blogPosts.length} stories
                </Badge>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Weekly note</p>
              <h2 className="mt-1.5 text-lg leading-snug text-forest">One useful email, every Thursday.</h2>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                New listings worth seeing, one market chart and a short read. No forwarded brochures.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
              <p className="mt-2 text-[9px] text-muted">Demo form — no email is stored.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page mt-10">
        <BlogExplorer posts={blogPosts} categories={blogCategories} featured={editorPick} />
      </section>

      <section className="container-page mt-16 border-t border-line pt-12">
        <div className="grid gap-8 rounded-3xl bg-forest px-6 py-10 text-cream sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow text-brass-light">Beyond the reading</p>
            <h2 className="mt-2 max-w-xl text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight">
              Get a second opinion before you decide.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/60">
              Send us the three properties you are comparing. We will tell you what each one does not solve — pricing,
              approvals, commute or resale.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/contact" variant="brass" iconRight={ArrowRight}>
              Ask an advisor
            </ButtonLink>
            <ButtonLink href="/properties" variant="light">
              Browse listings
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
