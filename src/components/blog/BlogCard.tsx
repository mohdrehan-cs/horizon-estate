import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function BlogCard({ post, featured, className }: { post: BlogPost; featured?: boolean; className?: string }) {
  if (featured) {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-3xl border border-line bg-white transition hover:shadow-card",
          className,
        )}
      >
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden bg-sand md:aspect-auto md:min-h-[340px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="eyebrow text-brass">{post.category}</p>
            <h3 className="mt-3 text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.15] text-forest">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <div className="mt-5 flex items-center gap-3 text-[11px] text-muted">
              <span className="font-semibold text-forest">{post.author}</span>
              <span className="size-1 rounded-full bg-line" />
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" /> {post.readTime}
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-forest transition group-hover:text-brass">
              Read the story <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group flex h-full flex-col", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-sand">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-forest backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="line-clamp-2 text-lg leading-snug text-forest">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-brass">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 pt-4 text-[10px] text-muted">
          <span className="font-semibold text-forest">{post.author}</span>
          <span className="size-1 rounded-full bg-line" />
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" /> {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
