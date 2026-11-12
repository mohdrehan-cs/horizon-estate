import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MapPin, Star } from "lucide-react";
import type { Agent } from "@/types";
import { getCityName } from "@/data/cities";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function AgentCard({ agent, className }: { agent: Agent; className?: string }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-forest/20 hover:shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="relative">
          <Image
            src={agent.avatar}
            alt={agent.name}
            width={72}
            height={72}
            className="size-[72px] rounded-2xl object-cover"
          />
          {agent.verified ? (
            <span className="absolute -bottom-1.5 -right-1.5 grid size-6 place-items-center rounded-full border-2 border-white bg-forest text-cream">
              <BadgeCheck className="size-3.5" />
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-[11px] font-bold text-forest">
          <Star className="size-3 fill-brass text-brass" />
          {agent.rating}
          <span className="font-medium text-muted">({agent.reviews})</span>
        </div>
      </div>

      <h3 className="mt-4 text-lg text-forest">
        <Link href={`/agents/${agent.slug}`} className="transition hover:text-brass">
          {agent.name}
        </Link>
      </h3>
      <p className="text-xs font-semibold text-brass">{agent.agency}</p>
      <p className="mt-0.5 text-[11px] text-muted">{agent.role}</p>

      <p className="mt-3 flex items-center gap-1 text-xs text-muted">
        <MapPin className="size-3.5" />
        {agent.areas.slice(0, 3).join(" · ")}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-cream p-3 text-center">
        <div>
          <p className="text-sm font-extrabold text-forest">{agent.listings}</p>
          <p className="text-[10px] text-muted">Listings</p>
        </div>
        <div className="border-x border-line">
          <p className="text-sm font-extrabold text-forest">{agent.experience.replace(" years", "")} yrs</p>
          <p className="text-[10px] text-muted">Experience</p>
        </div>
        <div>
          <p className="text-sm font-extrabold text-forest">{agent.deals}</p>
          <p className="text-[10px] text-muted">Closed</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {agent.languages.slice(0, 3).map((language) => (
          <Badge key={language} variant="outline">
            {language}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-[11px] text-muted">{getCityName(agent.city)}</span>
        <Link
          href={`/agents/${agent.slug}`}
          className="flex items-center gap-1 text-xs font-bold text-forest transition group-hover:text-brass"
        >
          View profile <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
