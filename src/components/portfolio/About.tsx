import { motion } from "framer-motion";
import { Code2, Lightbulb, Gauge, GraduationCap, User } from "lucide-react";

const traits = [
  { icon: Code2, label: "Clean Code Advocate" },
  { icon: Lightbulb, label: "Problem Solver" },
  { icon: Gauge, label: "Performance Focused" },
  { icon: GraduationCap, label: "Always Learning" },
];

export function About() {
  return (
    <section id="about" className="glass rounded-2xl p-6 md:p-7 h-full">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
          <User className="h-5 w-5" />
        </span>
        <h2 className="font-display font-bold text-xl">About Me</h2>
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        I'm a Full-Stack Engineer passionate about building modern, scalable,
        and user-focused applications. I enjoy turning ideas into digital
        experiences and continuously learning new technologies to solve
        real-world problems.
      </p>

      <div className="mt-6 space-y-2.5">
        {traits.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-3.5 py-2.5"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
              <t.icon className="h-4 w-4" />
            </span>
            <span className="text-sm">{t.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
