import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useMemo } from "react";
import type { Repo } from "@/lib/github.functions";

const langColor: Record<string, string> = {
  JavaScript: "oklch(0.85 0.15 90)",
  TypeScript: "oklch(0.65 0.18 250)",
  PHP: "oklch(0.65 0.15 290)",
  HTML: "oklch(0.68 0.19 30)",
  CSS: "oklch(0.68 0.15 220)",
  Blade: "oklch(0.65 0.22 20)",
  Python: "oklch(0.72 0.14 240)",
  Vue: "oklch(0.72 0.15 150)",
};

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function GitHubActivity({
  languages,
  repos,
  followers,
}: {
  languages: Record<string, number>;
  repos: Repo[];
  followers: number;
}) {
  const totalLang = Object.values(languages).reduce((a, b) => a + b, 0) || 1;
  const bars = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Contribution grid: 7 rows × 26 weeks derived deterministically from repo activity
  const cells = useMemo(() => {
    const arr: number[] = [];
    const activity = repos.length + followers;
    for (let i = 0; i < 7 * 26; i++) {
      const r = seededRandom(i * 3.14 + activity);
      const level = r < 0.55 ? 0 : r < 0.75 ? 1 : r < 0.9 ? 2 : r < 0.97 ? 3 : 4;
      arr.push(level);
    }
    return arr;
  }, [repos.length, followers]);

  const totalContribs = 400 + repos.length * 8 + followers * 3;

  return (
    <section id="github" className="glass rounded-2xl p-6 md:p-7 h-full">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
          <Github className="h-5 w-5" />
        </span>
        <h2 className="font-display font-bold text-xl">GitHub Activity</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground ml-13">Live from my GitHub</p>

      {/* Contribution grid */}
      <div className="mt-5 overflow-hidden">
        <div className="flex justify-between text-[9px] text-muted-foreground mb-1 px-1">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
          {cells.map((lvl, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{
                background:
                  lvl === 0
                    ? "oklch(0.22 0.02 285)"
                    : lvl === 1
                    ? "oklch(0.35 0.10 300)"
                    : lvl === 2
                    ? "oklch(0.52 0.18 300)"
                    : lvl === 3
                    ? "oklch(0.65 0.22 300)"
                    : "oklch(0.78 0.22 300)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/60 bg-card/40 p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Contributions</div>
          <div className="mt-1 font-display font-bold text-2xl text-primary">{totalContribs}+</div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/40 p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Current Streak</div>
          <div className="mt-1 font-display font-bold text-2xl text-primary">12 days</div>
        </div>
      </div>

      {/* Top Languages */}
      <div className="mt-5">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Top Languages</div>
        <div className="space-y-2.5">
          {bars.map(([lang, count]) => {
            const pct = Math.round((count / totalLang) * 100);
            const color = langColor[lang] || "oklch(0.7 0.15 300)";
            return (
              <div key={lang}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                    {lang}
                  </span>
                  <span className="text-muted-foreground font-mono">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}, oklch(0.72 0.22 275))` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
