import { motion } from "framer-motion";
import { useState } from "react";
import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Gamepad2,
} from "lucide-react";

import { SectionHeading } from "./SectionHeading";

const SOCIALS = [
  {
    Icon: Github,
    label: "GitHub",
    value: "github.com/TyrantRaj",
    href: "https://github.com/TyrantRaj",
  },

  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/yuvarajdev",
    href: "https://www.linkedin.com/in/yuvarajdev/",
  },

  {
    Icon: Gamepad2,
    label: "Itch.io",
    value: "tyrantrraj.itch.io",
    href: "https://tyrantrraj.itch.io/",
  },

  {
    Icon: MessageCircle,
    label: "Discord",
    value: "tyrant_raj",
    href: "#",
  },

  {
    Icon: Mail,
    label: "Email",
    value: "yuvarajdev04@gmail.com",
    href: "mailto:yuvarajdev04@gmail.com",
  },

  {
    Icon: Phone,
    label: "Phone",
    value: "+91 6374189347",
    href: "tel:+916374189347",
  },
];

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const [sent, setSent] = useState(false);

  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);

      setCopied(v);

      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  return (
    <section id="contact" className="relative py-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_center,oklch(1_0_0/0.06),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Let's Build"
          title={
            <>
              Have an idea?{" "}
              <span className="text-gradient-primary">
                Let's make it real.
              </span>
            </>
          }
          description="Open to freelance, game collaborations, AI work and full-time opportunities."
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            action="https://formsubmit.co/yuvarajdev04@gmail.com"
            method="POST"
            onSubmit={() => {
              setSent(true);

              setTimeout(() => setSent(false), 2500);
            }}
            className="ring-glow space-y-4 rounded-3xl border border-border bg-surface/60 p-7 backdrop-blur"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                type="text"
                placeholder="Your Name"
              />

              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@gmail.com"
              />
            </div>

            <Field
              label="Subject"
              name="subject"
              type="text"
              placeholder="Project / Collaboration"
            />

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Message
              </label>

              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about what you're building..."
                className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <input
              type="hidden"
              name="_captcha"
              value="false"
            />

            <input
  type="hidden"
  name="_template"
  value="table"
/>

<input
  type="hidden"
  name="_next"
  value="https://yuvarajdev.netlify.app/"
/>



            <button
              type="submit"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_oklch(1_0_0/0.25)] transition-transform hover:scale-[1.02]"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" />
                  Message sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Send message
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="ring-glow group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4 backdrop-blur transition-colors hover:bg-surface-elevated"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110">
                  <s.Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>

                  <div className="truncate font-mono text-sm">
                    {s.value}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    copy(s.value);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="Copy"
                >
                  {copied === s.value ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}