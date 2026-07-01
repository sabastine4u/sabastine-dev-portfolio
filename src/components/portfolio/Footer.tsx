import { Boxes, Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 pt-14 pb-8 relative">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-4 gap-10">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <Boxes className="h-5 w-5" />
            </span>
            <span className="font-display font-semibold text-lg">
              WebChain <span className="text-primary">Dev</span>
            </span>
          </a>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Building modern web experiences with clean code and strong architecture.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold mb-4">Navigation</div>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-4">Resources</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://github.com/sabastine4u" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/sabastine-aguluka-chibuike" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
            <li><a href="mailto:sabastine4u@gmail.com" className="hover:text-primary transition-colors">Email</a></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-4">Let's connect</div>
          <p className="text-sm text-muted-foreground mb-4">Available for new opportunities</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="https://github.com/sabastine4u" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/sabastine-aguluka-chibuike" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href="mailto:sabastine4u@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-10 pt-6 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Sabastine Aguluka Chibuike. All rights reserved.</div>
        <a
          href="#top"
          aria-label="Back to top"
          className="grid h-9 w-9 place-items-center rounded-full border border-border hover:text-primary hover:border-primary/60 transition-colors"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
