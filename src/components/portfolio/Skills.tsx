import { Sparkles } from "lucide-react";

const groups = [
  {
    title: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "PHP", "Laravel"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman"],
  },
  {
    title: "Deployment",
    items: ["Vercel", "Netlify", "Render"],
  },
];

const dot: Record<string, string> = {
  HTML5: "oklch(0.68 0.19 30)",
  CSS3: "oklch(0.68 0.15 220)",
  JavaScript: "oklch(0.85 0.15 90)",
  TypeScript: "oklch(0.65 0.18 250)",
  React: "oklch(0.75 0.15 220)",
  "Next.js": "oklch(0.98 0 0)",
  TailwindCSS: "oklch(0.72 0.15 220)",
  "Node.js": "oklch(0.72 0.19 145)",
  Express: "oklch(0.7 0.02 250)",
  PHP: "oklch(0.65 0.15 290)",
  Laravel: "oklch(0.65 0.22 25)",
  Git: "oklch(0.68 0.22 30)",
  GitHub: "oklch(0.9 0.005 285)",
  "VS Code": "oklch(0.65 0.18 240)",
  Postman: "oklch(0.7 0.2 40)",
  Vercel: "oklch(0.98 0 0)",
  Netlify: "oklch(0.72 0.15 200)",
};

export function Skills() {
  return (
    <section id="skills" className="glass rounded-2xl p-6 md:p-7 h-full">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
          <Sparkles className="h-5 w-5" />
        </span>
        <h2 className="font-display font-bold text-xl">My Skills</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground ml-13">Technologies I work with</p>

      <div className="mt-6 space-y-5">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2.5">
              {g.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-2.5 py-1.5 text-xs hover:border-primary/60 hover:bg-card/70 transition-colors"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: dot[it] || "oklch(0.7 0.1 300)" }}
                  />
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
