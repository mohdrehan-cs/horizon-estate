import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/types";
import { getCityName } from "@/data/cities";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line bg-white transition duration-300 hover:border-forest/20 hover:shadow-card",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/75 via-forest-dark/10 to-transparent" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            <Badge variant="white">{project.possession}</Badge>
            {project.verified ? <Badge variant="success">RERA</Badge> : null}
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-white/90 text-forest backdrop-blur transition group-hover:bg-brass group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-4 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass-light">{project.developer}</p>
          <h3 className="mt-1 text-2xl leading-tight">
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-white/75">
            <MapPin className="size-3.5" />
            {project.locality}, {getCityName(project.city)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Starting at</p>
          <p className="text-lg font-extrabold text-forest">{project.priceRange.split("–")[0].trim()}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Configurations</p>
          <p className="text-xs font-semibold text-forest">{project.configurations.join(" · ")}</p>
        </div>
      </div>
    </article>
  );
}
