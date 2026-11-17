import { motion } from "framer-motion";
import { Github } from "lucide-react";
import type { ContributionDay, GithubContributions, Repo } from "@/lib/github.functions";

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

const levelColor: Record<string, string> = {
  NONE: "oklch(0.22 0.02 285)",
  FIRST_QUARTILE: "oklch(0.35 0.10 300)",
  SECOND_QUARTILE: "oklch(0.52 0.18 300)",
  THIRD_QUARTILE: "oklch(0.65 0.22 300)",
  FOURTH_QUARTILE: "oklch(0.78 0.22 300)",
};

export function GitHubActivity({
  dataAvailable,
  languages,
  repos,
  contributions,
}: {
  dataAvailable: boolean;
  languages: Record<string, number>;
  repos: Repo[];
  contributions: GithubContributions | null;
}) {
  const bars = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const totalLanguageRepos = Object.values(languages).reduce((total, count) => total + count, 0);
  const days = contributions?.days ?? [];

  return (
    <section id="github" className="glass rounded-2xl p-6 md:p-7 h-full">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
          <Github className="h-5 w-5" />
        </span>
        <h2 className="font-display font-bold text-xl">GitHub Activity</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground ml-13">
        {dataAvailable
          ? "Public repository data from GitHub"
          : "GitHub data is temporarily unavailable."}
      </p>

      {contributions ? (
        <ContributionCalendar days={days} />
      ) : (
        <div className="mt-5 rounded-xl border border-border/60 bg-card/40 p-4 text-sm text-muted-foreground">
          Contribution activity is unavailable. A server-side GitHub token is needed to retrieve it.
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/60 bg-card/40 p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Contributions (12 mo)
          </div>
          <div className="mt-1 font-display font-bold text-2xl text-primary">
            {contributions ? contributions.totalContributions.toLocaleString() : "—"}
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/40 p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Current Streak
          </div>
          <div className="mt-1 font-display font-bold text-2xl text-primary">
            {contributions ? `${contributions.currentStreak} days` : "—"}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          Primary languages across public repos
        </div>
        {bars.length > 0 ? (
          <div className="space-y-2.5">
            {bars.map(([language, count]) => {
              const percent = totalLanguageRepos
                ? Math.round((count / totalLanguageRepos) * 100)
                : 0;
              const color = langColor[language] || "oklch(0.7 0.15 300)";
              return (
                <div key={language}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                      {language}
                    </span>
                    <span className="text-muted-foreground font-mono">
                      {count} repo{count === 1 ? "" : "s"} ({percent}%)
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${color}, oklch(0.72 0.22 275))`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {dataAvailable && repos.length === 0
              ? "No public repositories with language data were found."
              : "Language information is unavailable."}
          </p>
        )}
      </div>
    </section>
  );
}

function ContributionCalendar({ days }: { days: ContributionDay[] }) {
  return (
    <div
      className="mt-5 overflow-x-auto"
      role="img"
      aria-label="GitHub contribution calendar for the past 12 months"
    >
      <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
        {days.map((day) => (
          <span
            key={day.date}
            title={`${day.date}: ${day.contributionCount} contributions`}
            className="h-2.5 w-2.5 rounded-[2px]"
            style={{ background: levelColor[day.contributionLevel] ?? levelColor.NONE }}
          />
        ))}
      </div>
    </div>
  );
}
