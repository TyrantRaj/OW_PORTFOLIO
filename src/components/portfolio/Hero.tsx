import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import profPic from "@/assets/profpic.jpg";

const ROLES = [
  "Software Developer",
  "Game Developer",
  "AI / ML Engineer",
  "Full Stack Developer",
  "Creative Technologist",
];

function useTypewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = ROLES[i];
    const speed = del ? 35 : 75;
    const t = setTimeout(() => {
      const next = del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!del && next === current) setTimeout(() => setDel(true), 1500);
      else if (del && next === "") {
        setDel(false);
        setI((v) => (v + 1) % ROLES.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return text;
}

export function Hero() {
  const role = useTypewriter();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 80, damping: 20 });
  const y = useSpring(mvY, { stiffness: 80, damping: 20 });
  const blobX = useTransform(x, (v) => v * 0.5);
  const blobY = useTransform(y, (v) => v * 0.5);
  const blob2X = useTransform(x, (v) => v * -0.35);
  const blob2Y = useTransform(y, (v) => v * -0.35);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mvX.set(((e.clientX - cx) / cx) * 60);
      mvY.set(((e.clientY - cy) / cy) * 60);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mvX, mvY]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-hero-gradient noise"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 grid-bg" />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px]"
      />
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className="absolute -right-32 bottom-10 h-[480px] w-[480px] rounded-full bg-secondary/25 blur-[140px]"
      />

      {/* Profile portrait with orbits */}
      <div className="pointer-events-none absolute right-[2%] top-[18%] xl:right-[6%] hidden lg:block">
        <div className="relative h-[300px] w-[300px] xl:h-[380px] xl:w-[380px]">
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-6 rounded-full border border-secondary/15" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary glow-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "190px 190px" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "150px 150px" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-12 overflow-hidden rounded-full border border-primary/30 shadow-elevated"
            style={{ boxShadow: "0 0 60px oklch(1 0 0 / 0.18), inset 0 0 0 2px oklch(1 0 0 / 0.18)" }}
          >
            <img
              src={profPic}
              alt="Yuvaraj — software & game developer portrait"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* mobile portrait */}
      <div className="absolute right-6 top-24 z-10 lg:hidden">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-primary/40"
          style={{ boxShadow: "0 0 30px oklch(1 0 0 / 0.2)" }}>
          <img src={profPic} alt="Yuvaraj portrait" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="font-mono uppercase tracking-widest">Available for projects</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-primary/80"
        >
          Hi, I'm
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[900px] font-display text-5xl font-bold leading-[1.02] tracking-tight md:max-w-[650px] md:text-6xl lg:max-w-none lg:text-[88px]"
        >
          <span className="text-gradient-primary">Yuvaraj</span>
          <br />
          <span className="text-gradient">Crafting Software,</span>
          <br />
          <span className="text-gradient">Games & Intelligent Worlds.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm md:text-base"
        >
          <span className="text-muted-foreground">{">"}</span>
          <span className="text-muted-foreground">role =</span>
          <span className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
            {role}
            <span className="caret ml-0.5 inline-block w-[2px] bg-primary align-middle" style={{ height: "1em" }} />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Building games, intelligent systems, and interactive digital experiences.
          I design and engineer products at the intersection of creativity and code —
          from multiplayer game worlds to AI-powered tools and full-stack platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_oklch(1_0_0/0.25)] transition-transform hover:scale-[1.03]"
          >
            <Sparkles className="h-4 w-4" />
            View my work
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/resume.pdf"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:bg-surface-elevated"
          >
            <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Download CV
          </a>
          <div className="ml-1 flex items-center gap-1.5">
            {[
              { Icon: Github, href: "https://github.com/TyrantRaj" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/yuvarajdev/" },
              { Icon: Mail, href: "mailto:yuvarajdev04@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground backdrop-blur transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4"
        >
          {[
            { k: "13+", v: "Projects" },
            { k: "5", v: "Hackathons" },
            { k: "6", v: "Games Shipped" },
            { k: "300+", v: "DSA Solved" },
          ].map((s) => (
            <div key={s.v} className="bg-surface/80 p-5 backdrop-blur">
              <div className="font-display text-3xl font-bold text-gradient-primary">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}
