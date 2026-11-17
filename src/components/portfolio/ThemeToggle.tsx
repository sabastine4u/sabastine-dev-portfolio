import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function getInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("theme");
  return saved === "light" || saved === "dark" ? saved : "dark";
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
}

function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const t = getInitial();
    setTheme(t);
    apply(t);
  }, []);
  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem("theme", next);
      apply(next);
      return next;
    });
  };
  return { theme, toggle };
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Sun
        className={`h-4 w-4 absolute transition-all ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
      />
      <Moon
        className={`h-4 w-4 absolute transition-all ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
      />
    </button>
  );
}
