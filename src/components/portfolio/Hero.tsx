import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import profile from "@/assets/sabastine.png.asset.json";

type Props = {
  stars: number;
  repoCount: number;
  followers: number;
};

export function Hero({ stars, repoCount, followers }: Props) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for full-stack engineering roles & freelance
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display font-light tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95]"
          >
            I build <span className="italic text-gradient">premium</span>
            <br />
            web products
            <br />
            end-to-end.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            I'm <span className="text-foreground font-medium">Sabastine Aguluka Chibuike</span>{" "}
            — a full-stack engineer crafting fast, thoughtful interfaces and clean backend
            systems with React, TypeScript, Laravel and modern JavaScript.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-5 pr-2 py-2 text-sm font-medium hover:bg-primary/90 transition-all"
            >
              View selected work
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-foreground/10 group-hover:translate-x-0.5 transition-transform">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="https://github.com/sabastine4u"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium hover:border-primary/60 transition-colors"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { k: repoCount, l: "Public repos" },
              { k: stars, l: "GitHub stars" },
              { k: followers, l: "Followers" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl md:text-4xl">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-4 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass grain">
            <img
              src={profile.url}
              alt="Portrait of Sabastine Aguluka Chibuike"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="glass rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" />
                Currently shipping
              </div>
              <div className="glass rounded-full px-3 py-1.5 text-xs font-mono">
                v2026
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-primary/90 grid place-items-center text-primary-foreground font-display rotate-[-8deg] shadow-2xl">
            <div className="text-center leading-tight">
              <div className="text-2xl font-semibold">3+</div>
              <div className="text-[10px] uppercase tracking-widest">years</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
