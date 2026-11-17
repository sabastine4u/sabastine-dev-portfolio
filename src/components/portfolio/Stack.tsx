import { motion } from "framer-motion";

const groups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    items: ["Laravel", "PHP", "Node.js", "REST APIs", "Blade"],
  },
  {
    title: "Tooling & Platform",
    items: ["Git & GitHub", "Vite", "Vercel", "MySQL", "Supabase", "Figma"],
  },
];

export function Stack({ languages }: { languages: Record<string, number> }) {
  const totalLang = Object.values(languages).reduce((a, b) => a + b, 0) || 1;
  const bars = Object.entries(languages).sort((a, b) => b[1] - a[1]);

  return (
    <section id="stack" className="py-24 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">03 — Stack</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            Tools I reach for.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            A pragmatic mix — modern React for interfaces, Laravel and Node for backends, and a
            strong opinion that simple beats clever.
          </p>

          <div className="mt-10 space-y-3">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Language mix (GitHub)
            </div>
            {bars.map(([lang, count]) => {
              const pct = Math.round((count / totalLang) * 100);
              return (
                <div key={lang} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">{lang}</span>
                    <span className="text-muted-foreground font-mono">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="glass rounded-3xl p-6"
            >
              <div className="text-xs uppercase tracking-widest text-primary/90 font-medium">
                {g.title}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-border bg-card/50 px-3.5 py-1.5 text-sm text-foreground/90 hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
