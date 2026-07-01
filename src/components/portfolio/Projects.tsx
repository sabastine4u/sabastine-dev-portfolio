import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star, GitFork, ExternalLink } from "lucide-react";
import type { Repo } from "@/lib/github.functions";
import { useMemo, useState } from "react";

const langColor: Record<string, string> = {
  TypeScript: "oklch(0.72 0.15 240)",
  JavaScript: "oklch(0.85 0.15 90)",
  PHP: "oklch(0.65 0.12 290)",
  HTML: "oklch(0.68 0.19 30)",
  CSS: "oklch(0.68 0.15 220)",
  Blade: "oklch(0.65 0.20 20)",
};

function scoreRepo(r: Repo) {
  let s = 0;
  if (r.description) s += 3;
  if (r.homepage) s += 5;
  if (["TypeScript", "JavaScript", "PHP", "Blade"].includes(r.language || "")) s += 3;
  s += r.stars * 2;
  s += Math.min(3, r.topics.length);
  return s;
}

export function Projects({ repos }: { repos: Repo[] }) {
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => r.language && set.add(r.language));
    return ["All", ...Array.from(set)];
  }, [repos]);

  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const sorted = useMemo(
    () => [...repos].sort((a, b) => scoreRepo(b) - scoreRepo(a)),
    [repos]
  );
  const filtered = filter === "All" ? sorted : sorted.filter((r) => r.language === filter);
  const featured = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              02 — Selected Work
            </div>
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-tight max-w-2xl">
              Things I've <span className="italic text-gradient">shipped</span>.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Live, dynamic list of my public repositories — pulled straight
              from GitHub, ranked by recency, activity and craft.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.slice(0, 6).map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  filter === l
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((r, i) => (
            <FeaturedCard key={r.name} repo={r} index={i} />
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <div className="mt-20 mb-6 flex items-end justify-between">
              <h3 className="font-display text-2xl">More from the workshop</h3>
              <span className="text-xs text-muted-foreground">
                {rest.length} additional repos
              </span>
            </div>
            <div className="grid gap-3">
              {(showAll ? rest : rest.slice(0, 6)).map((r) => (
                <RepoRow key={r.name} repo={r} />
              ))}
            </div>
            {rest.length > 6 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll((s) => !s)}
                  className="rounded-full glass px-6 py-2.5 text-sm hover:border-primary/60"
                >
                  {showAll ? "Show less" : `Show ${rest.length - 6} more`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ repo, index }: { repo: Repo; index: number }) {
  const color = repo.language ? langColor[repo.language] || "oklch(0.7 0.1 250)" : "oklch(0.7 0 0)";
  return (
    <motion.a
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      href={repo.homepage || repo.url}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-3xl glass p-6 flex flex-col hover:border-primary/60 transition-colors min-h-[320px]"
    >
      <div
        className="absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: color }}
      />
      <div className="flex items-start justify-between relative">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: color }} />
          {repo.language || "Project"}
          {repo.homepage && (
            <span className="ml-2 inline-flex items-center gap-1 text-emerald-400">
              <ExternalLink className="h-3 w-3" /> Live
            </span>
          )}
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>

      <h3 className="mt-6 font-display text-2xl leading-tight relative">
        {repo.name.replace(/[-_]/g, " ")}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 relative">
        {repo.description || "An engineering exploration by Sabastine."}
      </p>

      <div className="mt-auto pt-6 flex items-center justify-between text-xs text-muted-foreground relative">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" /> {repo.stars}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" /> {repo.forks}
          </span>
        </div>
        <span className="font-mono">
          {new Date(repo.pushedAt).toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </motion.a>
  );
}

function RepoRow({ repo }: { repo: Repo }) {
  const color = repo.language ? langColor[repo.language] || "oklch(0.7 0.1 250)" : "oklch(0.7 0 0)";
  return (
    <a
      href={repo.homepage || repo.url}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card/30 hover:bg-card/70 hover:border-primary/50 px-5 py-4 transition-all"
    >
      <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{repo.name.replace(/[-_]/g, " ")}</span>
          {repo.homepage && (
            <ExternalLink className="h-3 w-3 text-emerald-400 flex-shrink-0" />
          )}
        </div>
        {repo.description && (
          <div className="text-xs text-muted-foreground truncate mt-0.5">
            {repo.description}
          </div>
        )}
      </div>
      <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
        <span>{repo.language || "—"}</span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-3 w-3" /> {repo.stars}
        </span>
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground hover:text-foreground"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </a>
  );
}
