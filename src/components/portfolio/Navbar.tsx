import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Creative", href: "#creative" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed left-0 right-0 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-500`}
    >
      <div
        className={`flex w-full items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-elevated" : "glass"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2" aria-label="Yuvaraj — Home">
          <span
            className="font-mono text-[15px] font-bold leading-none text-primary drop-shadow-[0_0_10px_oklch(0.56_0.13_28/0.7)]"
            aria-hidden="true"
          >
            {"</>"}
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            yuvaraj<span className="text-primary">.dev</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                active === l.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/15 ring-1 ring-primary/30"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-gradient-primary px-4 py-1.5 text-[13px] font-semibold text-primary-foreground shadow-[0_0_20px_oklch(1_0_0/0.22)] transition-transform hover:scale-105 sm:flex"
        >
          Hire Me
          <span className="text-base leading-none">→</span>
        </a>
      </div>
    </motion.header>
  );
}
