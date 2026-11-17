import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Boxes, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-background/70 backdrop-blur-xl border-b border-border/50"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground glow-purple">
            <Boxes className="h-5 w-5" />
          </span>
          <span className="font-display font-semibold text-lg tracking-tight">
            WebChain <span className="text-primary">Dev</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-9 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <a
            href="https://github.com/sabastine4u"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/sabastine-aguluka-chibuike"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-7xl px-6 py-3 grid gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
