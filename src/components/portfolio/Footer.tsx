export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Sabastine Aguluka Chibuike. Crafted with care.
        </div>
        <div className="font-mono">
          Designed & built end-to-end · v2026.1
        </div>
      </div>
    </footer>
  );
}
