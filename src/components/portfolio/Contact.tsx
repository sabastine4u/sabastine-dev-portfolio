import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";

const EMAIL = "sabastine4u@gmail.com";

export function Contact() {
  const [state, setState] = useState<"idle" | "draft-opened">("idle");

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
    setState("draft-opened");
    form.reset();
  }

  return (
    <section id="contact" className="py-20 md:py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 md:p-10 grid lg:grid-cols-2 gap-10"
        >
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight">
              Let's Build <span className="text-gradient">Something Great</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
              I'm open to new opportunities, collaborations, and interesting projects. Let's discuss
              how we can work together.
            </p>

            <div className="mt-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Connect with me
              </div>
              <div className="flex items-center gap-3">
                <SocialLink href={`mailto:${EMAIL}`} label="Email">
                  <Mail className="h-4 w-4" />
                </SocialLink>
                <SocialLink href="https://github.com/sabastine4u" label="GitHub">
                  <Github className="h-4 w-4" />
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/sabastine-aguluka-chibuike"
                  label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </SocialLink>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" placeholder="Your Name" />
              <Field name="email" type="email" placeholder="Your Email" />
            </div>
            <textarea
              aria-label="Your message"
              name="message"
              required
              rows={5}
              placeholder="Your Message"
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus:border-primary/60 resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {state === "draft-opened"
                  ? "Your mail app should open with a draft. Send it there to deliver your message."
                  : "Opens a draft in your default mail app; you will need to send it there."}
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground px-5 py-2.5 text-sm font-semibold glow-purple hover:opacity-95 transition-all"
              >
                Send Message{" "}
                <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  name,
  type = "text",
  placeholder,
}: {
  name: string;
  type?: string;
  placeholder?: string;
}) {
  const label = name === "name" ? "Your name" : "Your email";
  return (
    <label className="sr-only" htmlFor={`contact-${name}`}>
      {label}
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={name === "name" ? "name" : "email"}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus:border-primary/60"
      />
    </label>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </a>
  );
}
