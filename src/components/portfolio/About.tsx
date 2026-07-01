import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            01 — About
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            A builder at heart.
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-8 space-y-6 text-lg text-muted-foreground leading-relaxed"
        >
          <p>
            I'm a full-stack engineer who enjoys the whole picture — from the
            first pixel of a landing page to the last query in a database. I
            work across the stack with{" "}
            <span className="text-foreground">React, TypeScript, Next.js,
            Laravel and PHP</span>, and I care deeply about how software{" "}
            <span className="text-foreground">feels</span> once it's in front of
            real users.
          </p>
          <p>
            My open-source work spans real-estate ecosystems, social apps, blog
            platforms, dashboards and dozens of front-end experiments. Each
            project is a chance to sharpen a specific skill —{" "}
            <span className="text-foreground">performance, accessibility,
            animation, architecture</span> — and to keep shipping.
          </p>
          <p>
            When I'm not building, I'm reading design systems, dissecting
            production apps I admire, and looking for the next problem worth
            solving well.
          </p>

          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border/40 mt-8">
            {[
              { k: "Focus", v: "Full-stack web" },
              { k: "Base", v: "Nigeria — Remote" },
              { k: "Interests", v: "UI, DX, Systems" },
              { k: "Open to", v: "Roles & Freelance" },
            ].map((i) => (
              <div key={i.k}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground/70">
                  {i.k}
                </div>
                <div className="mt-1 text-foreground text-sm font-medium">
                  {i.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
