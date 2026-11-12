import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { blogPosts, getBlogPost } from "@/data/blog";
import { agents } from "@/data/agents";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/format";
import { BlogCard } from "@/components/blog/BlogCard";
import { ShareArticle } from "@/components/blog/ShareArticle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Story not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

function anchor(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const author = agents.find((agent) => agent.name === post.author);
  const headings = post.content.filter((section) => section.heading);
  const related = [
    ...blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category),
    ...blogPosts.filter((item) => item.slug !== post.slug && item.category !== post.category),
  ].slice(0, 3);

  return (
    <div className="bg-cream pb-16">
      <article>
        <section className="border-b border-line bg-sand/50">
          <div className="container-page py-9 sm:py-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Journal", href: "/blog" },
                { label: post.category },
              ]}
            />
            <div className="mx-auto mt-6 max-w-3xl text-center">
              <Badge variant="brass">{post.category}</Badge>
              <h1 className="display-balance mt-4 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06] text-forest">
                {post.title}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-muted">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-brass" /> {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-brass" /> {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-brass" /> Delhi NCR
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container-page -mt-0 pt-8">
          <div className="relative mx-auto aspect-[16/8] max-w-5xl overflow-hidden rounded-3xl border border-line bg-sand">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="container-page mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-3">
                {author ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="text-[12px] font-bold text-forest">{post.author}</p>
                  <p className="text-[10px] text-muted">{post.authorRole}</p>
                </div>
              </div>
              <ShareArticle title={post.title} slug={post.slug} />
            </div>

            <div className="mt-7 max-w-[68ch]">
              {post.content.map((section, index) => (
                <section key={section.heading ?? `intro-${index}`} className={index === 0 ? "" : "mt-8"}>
                  {section.heading ? (
                    <h2
                      id={anchor(section.heading)}
                      className="scroll-mt-24 text-[clamp(1.3rem,2.4vw,1.7rem)] leading-snug text-forest"
                    >
                      {section.heading}
                    </h2>
                  ) : null}
                  <div className={section.heading ? "mt-3 space-y-4" : "space-y-4"}>
                    {section.body.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${index}-${paragraphIndex}`}
                        className={`text-[14px] leading-[1.85] text-forest/80 ${
                          index === 0 && paragraphIndex === 0
                            ? "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[3.1rem] first-letter:leading-[0.85] first-letter:text-forest"
                            : ""
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="mt-9 flex flex-wrap items-center gap-2 border-t border-line pt-6">
                <Tag className="size-3.5 text-brass" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-semibold text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-line bg-white p-4">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brass" />
                <p className="text-[10px] leading-relaxed text-muted">
                  This article is general market commentary, not legal, tax or investment advice. Rates and prices
                  change; verify current rules and project approvals before transacting.
                </p>
              </div>

              {author ? (
                <div className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={64}
                      height={64}
                      className="size-16 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">About the author</p>
                      <p className="mt-1 text-base font-bold text-forest">{author.name}</p>
                      <p className="text-[10px] text-muted">
                        {author.role} · {author.experience}
                      </p>
                      <p className="mt-2 text-[11px] leading-relaxed text-muted">{author.bio}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <ButtonLink href={`/agents/${author.slug}`} variant="outline" size="sm">
                          View profile
                        </ButtonLink>
                        <ButtonLink
                          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                            `Hi ${author.name.split(" ")[0]}, I read your article on ${post.title} and have a question.`,
                          )}`}
                          variant="ghost"
                          size="sm"
                          icon={MessageCircle}
                        >
                          WhatsApp
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-forest transition hover:text-brass"
                >
                  <ArrowLeft className="size-3.5" /> All stories
                </Link>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-forest transition hover:text-brass"
                >
                  Browse properties <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            {headings.length ? (
              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">In this article</p>
                <ol className="mt-3 space-y-2">
                  {headings.map((section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#${anchor(section.heading as string)}`}
                        className="flex gap-2 text-[11px] leading-relaxed text-muted transition hover:text-forest"
                      >
                        <span className="font-serif text-brass">0{index + 1}</span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {author ? (
              <div className="rounded-2xl bg-forest p-5 text-cream">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass-light">Have a question?</p>
                <p className="mt-2 text-sm leading-snug">
                  {author.name.split(" ")[0]} can help you apply this to your own search.
                </p>
                <p className="mt-2 text-[10px] leading-relaxed text-cream/55">
                  {author.areas.slice(0, 3).join(" · ")}
                </p>
                <div className="mt-4 space-y-2">
                  <a
                    href={author.phone ? `tel:${author.phone.replace(/\s/g, "")}` : siteConfig.phoneHref}
                    className="flex items-center gap-2 text-[11px] font-semibold text-cream/80 transition hover:text-brass-light"
                  >
                    <Phone className="size-3.5 text-brass-light" /> {author.phone}
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[11px] font-semibold text-cream/80 transition hover:text-brass-light"
                  >
                    <MessageCircle className="size-3.5 text-brass-light" /> WhatsApp the team
                  </a>
                </div>
                <ButtonLink href="/contact" variant="brass" size="sm" className="mt-4 w-full" iconRight={ArrowRight}>
                  Book a call
                </ButtonLink>
              </div>
            ) : null}

            <div className="rounded-2xl border border-line bg-sand/60 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brass">Useful next</p>
              <div className="mt-3 space-y-2.5">
                {[
                  { label: "Stamp duty calculator", href: "/calculators" },
                  { label: "EMI calculator", href: "/calculators" },
                  { label: "Home valuation", href: "/home-valuation" },
                  { label: "Compare localities", href: "/cities/noida" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between gap-2 text-[11px] font-semibold text-forest transition hover:text-brass"
                  >
                    {item.label} <ArrowRight className="size-3" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="container-page mt-16 border-t border-line pt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-brass">Keep reading</p>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] text-forest">Related stories.</h2>
          </div>
          <Link href="/blog" className="hidden items-center gap-1.5 text-[11px] font-bold text-forest sm:flex">
            All stories <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-7 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <BlogCard key={item.slug} post={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
