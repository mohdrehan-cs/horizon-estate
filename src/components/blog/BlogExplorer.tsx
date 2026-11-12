"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/blog/BlogCard";

export function BlogExplorer({
  posts,
  categories,
  featured,
}: {
  posts: BlogPost[];
  categories: string[];
  featured?: BlogPost;
}) {
  const [active, setActive] = useState("All");

  const visible = useMemo(() => {
    if (active !== "All") return posts.filter((post) => post.category === active);
    return featured ? posts.filter((post) => post.slug !== featured.slug) : posts;
  }, [active, featured, posts]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-5">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition",
              active === category
                ? "border-forest bg-forest text-cream"
                : "border-line bg-white text-muted hover:border-forest/30 hover:text-forest",
            )}
          >
            {category}
            <span className={cn("ml-1.5 text-[9px]", active === category ? "text-cream/50" : "text-muted/60")}>
              {category === "All" ? posts.length : posts.filter((post) => post.category === category).length}
            </span>
          </button>
        ))}
      </div>

      {active === "All" && featured ? (
        <div className="mt-8">
          <BlogCard post={featured} featured />
        </div>
      ) : null}

      <div className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">No stories in this category yet.</p>
      ) : null}
    </div>
  );
}
