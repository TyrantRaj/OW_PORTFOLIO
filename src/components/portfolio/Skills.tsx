import { motion } from "framer-motion";
import { Boxes, Brain, Cloud, Code2, Database, Gamepad2, Globe, Smartphone, Wand2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type Skill = { name: string; level: number };
type Group = { Icon: React.ComponentType<{ className?: string }>; title: string; items: Skill[] };

// Edit levels (0–100) here to reflect how well you know each tech.
const groups: Group[] = [
  {
    Icon: Code2,
    title: "Languages",
    items: [
      { name: "C#", level: 92 },
      { name: "Python", level: 88 },
      { name: "JavaScript", level: 90 },
      { name: "C++", level: 70 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    Icon: Gamepad2,
    title: "Game Dev",
    items: [
      { name: "Unity", level: 93 },
      { name: "Unreal", level: 55 },
      { name: "Multiplayer / Netcode", level: 78 },
      { name: "Gameplay AI", level: 80 },
    ],
  },
  {
    Icon: Brain,
    title: "AI / ML",
    items: [
      { name: "PyTorch", level: 80 },
      { name: "TensorFlow", level: 72 },
      { name: "OpenCV", level: 85 },
      { name: "Langraph", level: 70 },
    ],
  },
  {
    Icon: Globe,
    title: "Web",
    items: [
      { name: "HTML/CSS", level: 92 },
      { name: "React", level: 65 },
      { name: "TailwindCSS", level: 72 },
      { name: "Vite", level: 70 },
    ],
  },
  {
    Icon: Smartphone,
    title: "App Dev",
    items: [
      { name: "Android Studio", level: 75 },
      { name: "Kotlin", level: 72 },
      { name: "Firebase", level: 80 },
      { name: "XML", level: 70 },
    ],
  },
  {
    Icon: Boxes,
    title: "Backend",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 82 },
      { name: "Flask", level: 70 },
      { name: "WebSockets", level: 78 },
    ],
  },
  {
    Icon: Database,
    title: "Databases",
    items: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 78 },
      { name: "Firebase", level: 80 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    Icon: Cloud,
    title: "Cloud & Tools",
    items: [
      { name: "Docker", level: 72 },
      { name: "Git", level: 92 },
      { name: "GitHub Actions", level: 70 },
    ],
  },
  {
    Icon: Wand2,
    title: "3D & Creative",
    items: [
      { name: "Blender", level: 86 },
      { name: "Inkscape", level: 60 },
      { name: "Figma", level: 88 },
      { name: "Adobe Photoshop", level: 65 },
    ],
  },
];

function Bar({ name, level }: Skill) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-[12px]">
        <span className="font-medium text-foreground/90">{name}</span>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
          {level}
          <span className="opacity-50">/100</span>
        </span>
      </div>
      <div className="relative h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-foreground"
          style={{ boxShadow: "0 0 12px oklch(1 0 0 / 0.35)" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skillset"
          title={
            <>
              A <span className="text-gradient-primary">multi-disciplinary</span> toolkit, measured.
            </>
          }
          description="Honest proficiency levels across the stack — from low-level systems to creative pipelines."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ Icon, title, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="ring-glow group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:bg-surface-elevated"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <div className="font-display text-lg font-semibold">{title}</div>
              <div className="mt-5 space-y-3.5">
                {items.map((it) => (
                  <Bar key={it.name} {...it} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
