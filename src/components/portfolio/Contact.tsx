import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, ArrowUpRight } from "lucide-react";

const EMAIL = "sabastine4u@gmail.com";

export function Contact() {
  const [state, setState] = useState<"idle" | "sent">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio inquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setState("sent");
    form.reset();
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            04 — Contact
          </div>
          <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95]">
            Let's build <br />
            <span className="italic text-gradient">something great.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
            I'm currently open to full-stack roles, contract work and
            interesting collaborations. If you have a product worth building
            well, I'd love to hear about it.
          </p>

          <div className="mt-10 space-y-3">
            {[
              { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
              { icon: Github, label: "github.com/sabastine4u", href: "https://github.com/sabastine4u" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sabastine-aguluka-chibuike" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:border-primary/60 transition-colors"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary">
                  <c.icon className="h-4 w-4" />
                </span>
                <span className="text-sm">{c.label}</span>
                <ArrowUpRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass rounded-3xl p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field name="name" label="Your name" placeholder="Ada Lovelace" />
            <Field name="email" label="Email" type="email" placeholder="you@company.com" />
          </div>
          <Field name="subject" label="Subject" placeholder="A short summary" />
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Tell me about the project, timeline and what success looks like…"
              className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary/60 resize-none"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              {state === "sent"
                ? "Draft opened in your mail app ✓"
                : "Opens in your default mail client."}
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-5 pr-2 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Send message
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-foreground/10 group-hover:translate-x-0.5 transition-transform">
                <Send className="h-4 w-4" />
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary/60"
      />
    </label>
  );
}
