import { Briefcase } from "lucide-react";

const timeline = [
  { year: "2020", text: "Started learning web fundamentals" },
  { year: "2021", text: "Built responsive frontend projects" },
  { year: "2022", text: "Expanded into backend development" },
  { year: "2023", text: "Built full-stack applications" },
  { year: "2024+", text: "Continuing to grow and explore modern technologies" },
];

export function Experience() {
  return (
    <section id="experience" className="glass rounded-2xl p-6 md:p-7 h-full">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
          <Briefcase className="h-5 w-5" />
        </span>
        <h2 className="font-display font-bold text-xl">Experience &amp; Journey</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground ml-13">My development journey</p>

      <div className="mt-6 relative pl-6">
        <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
        {timeline.map((t, i) => (
          <div key={t.year} className={`relative ${i < timeline.length - 1 ? "pb-5" : ""}`}>
            <span className="absolute -left-[22px] top-1 grid h-3 w-3 place-items-center rounded-full bg-primary glow-purple" />
            <div className="text-sm font-semibold text-primary">{t.year}</div>
            <div className="text-sm text-muted-foreground mt-0.5 leading-snug">{t.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
