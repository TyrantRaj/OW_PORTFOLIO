import {
  Github,
  Linkedin,
  Mail,
  Gamepad2,
} from "lucide-react";

export function Footer() {
  const socials = [
    {
      Icon: Github,
      href: "https://github.com/TyrantRaj",
    },

    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/yuvarajdev/",
    },

    {
      Icon: Gamepad2,
      href: "https://tyrantrraj.itch.io/",
    },

    {
      Icon: Mail,
      href: "mailto:yuvarajdev04@gmail.com",
    },
  ];

  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 rounded-md bg-gradient-primary glow-primary">
            <div className="absolute inset-[2px] rounded-[5px] bg-background/80" />

            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-primary">
              {"</>"}
            </div>
          </div>

          <div>
            <div className="font-display text-sm font-semibold">
              yuvaraj.dev
            </div>

            <div className="text-[11px] text-muted-foreground">
              "Build it like it matters."
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {[
            "About",
            "Skills",
            "Projects",
            "Creative",
            "Experience",
            "Contact",
          ].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <s.Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} · Designed & built with care.
      </div>
    </footer>
  );
}