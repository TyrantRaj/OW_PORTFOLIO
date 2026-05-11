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
  const [loading, setLoading] = useState(false);

  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(v);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/yuvarajdev04@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
          }),
        }
      );

      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Let's Build"
          title={
            <>
              Have an idea?{" "}
              <span className="text-gradient-primary">Let's make it real.</span>
            </>
          }
          description="Open to freelance, game collaborations, AI work and full-time opportunities."
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-black p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@gmail.com"
                required
              />
            </div>

            <Field
              label="Subject"
              name="subject"
              type="text"
              placeholder="Project / Collaboration"
              required
            />

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-gray-400">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                autoComplete="off"
                placeholder="Tell me about what you're building..."
                style={{ cursor: "text" }}
                className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>

            <input type="hidden" name="_captcha" value="false" />

            <button
              type="submit"
              disabled={loading || sent}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" />
                  Message sent
                </>
              ) : loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>
          </form>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black p-4 transition hover:border-white/20"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <s.Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-widest text-gray-400">
                    {s.label}
                  </div>
                  <div className="truncate font-mono text-sm text-white">
                    {s.value}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    copy(s.value);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:text-white"
                >
                  {copied === s.value ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-gray-400">
        {label}
      </label>
      <input
        {...props}
        autoComplete="off"
        style={{ cursor: "text" }}
        className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none"
      />
    </div>
  );
}