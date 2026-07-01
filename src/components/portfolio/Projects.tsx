import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Boxes } from "lucide-react";
import type { Repo } from "@/lib/github.functions";
import { useMemo, useState } from "react";

const FILTERS = ["All", "Full Stack", "Frontend", "Backend", "API", "Tools"] as const;
type Filter = (typeof FILTERS)[number];

function classify(r: Repo): Filter[] {
  const tags: Filter[] = [];
  const name = r.name.toLowerCase();
  const desc = (r.description || "").toLowerCase();
  const topics = r.topics.map((t) => t.toLowerCase());
  const hay = `${name} ${desc} ${topics.join(" ")}`;
  const lang = r.language || "";

  if (/api|rest|graphql|backend|server/.test(hay)) tags.push("API", "Backend");
  if (["PHP", "Laravel", "Blade", "Node.js"].includes(lang) || /laravel|node|express|php/.test(hay)) tags.push("Backend");
  if (["TypeScript", "JavaScript", "HTML", "CSS", "Vue"].includes(lang) || /react|next|frontend|ui|portfolio|landing/.test(hay)) tags.push("Frontend");
  if (r.homepage || /platform|ecosystem|ecommerce|dashboard|management|app/.test(hay)) tags.push("Full Stack");
  if (/cli|tool|script|util|starter|template/.test(hay)) tags.push("Tools");
  return tags.length ? tags : ["Full Stack"];
}

function scoreRepo(r: Repo) {
  let s = 0;
  if (r.description) s += 3;
  if (r.homepage) s += 6;
  s += r.stars * 2;
  s += Math.min(4, r.topics.length);
  s += Math.max(0, 10 - Math.floor((Date.now() - +new Date(r.pushedAt)) / (1000 * 60 * 60 * 24 * 60)));
  return s;
}

function techFor(r: Repo): string[] {
  const t = new Set<string>();
  if (r.language) t.add(r.language);
  r.topics.slice(0, 4).forEach((x) => t.add(x.replace(/(^|-)([a-z])/g, (_, s, c) => s + c.toUpperCase())));
  return Array.from(t).slice(0, 4);
}

export function Projects({ repos }: { repos: Repo[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);

  const enriched = useMemo(
    () => repos.map((r) => ({ repo: r, tags: classify(r), score: scoreRepo(r) })).sort((a, b) => b.score - a.score),
    [repos],
  );
  const filtered = filter === "All" ? enriched : enriched.filter((e) => e.tags.includes(filter));
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary flex-shrink-0 mt-1">
              <Boxes className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl">Featured Projects</h2>
              <p className="mt-1 text-sm text-muted-foreground">A selection of my recent work</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-full glass p-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setShowAll(false);
                }}
                className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition-all ${
                  filter === f
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <a
            href="https://github.com/sabastine4u?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View all projects <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((e, i) => (
            <ProjectCard key={e.repo.name} repo={e.repo} tag={e.tags[0]} tech={techFor(e.repo)} index={i} />
          ))}
        </div>

        {filtered.length > 6 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="rounded-full glass px-6 py-2.5 text-sm hover:border-primary/60"
            >
              {showAll ? "Show less" : `Show ${filtered.length - 6} more`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ repo, tag, tech, index }: { repo: Repo; tag: string; tech: string[]; index: number }) {
  const seed = encodeURIComponent(repo.name);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative overflow-hidden rounded-2xl glass hover:border-primary/60 transition-all hover:-translate-y-1"
    >
      {/* Preview */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: `url(https://opengraph.githubassets.com/${seed}/sabastine4u/${repo.name})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        <span className="absolute top-3 right-3 rounded-md bg-primary/90 text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
          {tag}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg leading-tight capitalize">
          {repo.name.replace(/[-_]/g, " ")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {repo.description || "A crafted engineering project by Sabastine."}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-primary/30 bg-primary/10 text-primary text-[10px] font-medium px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
          {repo.homepage ? (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Github className="h-3.5 w-3.5" /> Source
            </span>
          )}
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repo"
            className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
