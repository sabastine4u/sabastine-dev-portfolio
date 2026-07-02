import { motion } from "framer-motion";
import { ArrowRight, Github, Mail, Linkedin, Boxes, Zap, Code2, Award } from "lucide-react";
import profile from "@/assets/sabastine.png.asset.json";

type Props = {
  stars: number;
  repoCount: number;
  followers: number;
};

const badges = [
  { name: "React", color: "oklch(0.75 0.15 220)", top: "8%", left: "-6%", delay: "float-a", icon: "⚛" },
  { name: "TypeScript", color: "oklch(0.65 0.18 250)", top: "42%", left: "-14%", delay: "float-b", icon: "TS" },
  { name: "Next.js", color: "oklch(0.98 0 0)", top: "4%", right: "-6%", delay: "float-c", icon: "N" },
  { name: "Node.js", color: "oklch(0.72 0.19 145)", top: "38%", right: "-10%", delay: "float-a", icon: "⬢" },
  { name: "Laravel", color: "oklch(0.65 0.22 25)", top: "70%", right: "-4%", delay: "float-b", icon: "L" },
];

export function Hero({ stars, repoCount, followers }: Props) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-36">
      {/* Space background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 starfield" />
        <div className="absolute inset-0 twinkle starfield" style={{ backgroundPosition: "100px 200px" }} />
        <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/25 blur-[160px]" />
        <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-foreground/90">Available for opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display font-bold tracking-tight text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05]"
          >
            Full-Stack Engineer
            <br />
            Building Modern
            <br />
            <span className="text-gradient">Digital Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            I build scalable, responsive, and user-focused applications using
            React, Next.js, JavaScript, TypeScript, Node.js, Laravel, and
            modern web technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 text-sm font-semibold glow-purple hover:opacity-95 transition-all"
            >
              View Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium hover:border-primary/60 transition-colors"
            >
              Contact Me <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/sabastine4u"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium hover:border-primary/60 transition-colors"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex items-center gap-4 text-sm text-muted-foreground"
          >
            <span>Connect with me</span>
            <div className="flex items-center gap-2">
              <SocialIcon href="https://github.com/sabastine4u" label="GitHub"><Github className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/sabastine-aguluka-chibuike" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="mailto:sabastine4u@gmail.com" label="Email"><Mail className="h-4 w-4" /></SocialIcon>
            </div>
          </motion.div>
        </div>

        {/* Right column — portrait + floating badges + terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[22rem] aspect-square"
        >
          {/* Purple orbit rings — centered circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90%] w-[90%] rounded-full bg-gradient-to-br from-primary/30 via-transparent to-accent/30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[78%] w-[78%] rounded-full border border-primary/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[62%] w-[62%] rounded-full border border-accent/20" />

          {/* Portrait */}
          <div className="absolute inset-6 rounded-full overflow-hidden glow-purple bg-background/60">
            <img
              src={profile.url}
              alt="Sabastine Aguluka Chibuike"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating tech badges */}
          {badges.map((b) => (
            <div
              key={b.name}
              className={`absolute ${b.delay}`}
              style={{
                top: b.top,
                left: (b as any).left,
                right: (b as any).right,
              }}
            >
              <div className="glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-xl">
                <span
                  className="grid h-7 w-7 place-items-center rounded-lg text-xs font-bold"
                  style={{ background: `${b.color}20`, color: b.color }}
                >
                  {b.icon}
                </span>
                <span className="text-xs font-medium pr-1">{b.name}</span>
              </div>
            </div>
          ))}

          {/* Terminal card */}
          <div className="absolute -bottom-4 -left-4 md:-left-8 float-b">
            <div className="glass rounded-xl overflow-hidden shadow-2xl w-[280px]">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/50">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>
              <pre className="p-3 text-[11px] font-mono leading-relaxed text-foreground/90">
{`> const developer = {
   name: "Sabastine",
   role: "Full-Stack Engineer",
   passion: "Building scalable web apps",
   code: "Clean. Efficient. Impactful."
 }
> _`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mx-auto max-w-7xl px-6 mt-16"
      >
        <div className="glass rounded-2xl p-5 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          <Stat icon={Boxes} value={`${repoCount}+`} label="Public Repos" />
          <Stat icon={Zap} value="4+" label="Years of Coding" />
          <Stat icon={Code2} value="25+" label="Technologies" />
          <Stat icon={Award} value={`${Math.max(stars + followers * 4, 100)}+`} label="GitHub Contributions" />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary flex-shrink-0">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="font-display font-bold text-2xl">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
    >
      {children}
    </a>
  );
}
