import { motion } from "framer-motion";
import {
  Award,
  Brain,
  Medal,
  Star,
  Trophy,
  Gamepad2,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    Icon: Trophy,
    title: "1st Prize — SRM Hackathon",
    sub: "Built a Sign Language Recognition system translating gestures into English.",
  },

  {
    Icon: Medal,
    title: "1st Prize — IEEE Day Technical Quiz",
    sub: "Won the IEEE technical quiz competition at SA Engineering College.",
  },

  {
    Icon: Gamepad2,
    title: "Released Game on Play Store",
    sub: "Published 'Circle Chaos' independently using Unity.",
  },

  {
    Icon: Star,
    title: "Top 7 — National Game Jam",
    sub: "Fragile Relic ranked among top entries nationwide.",
  },

  {
    Icon: Brain,
    title: "100+ Problems — LeetCode",
    sub: "Consistent DSA and problem-solving practice across algorithms.",
  },

  {
    Icon: Award,
    title: "700+ Problems — Skillrack",
    sub: "Solved hundreds of programming and competitive coding challenges.",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Achievements"
          title={
            <>
              Milestones along the{" "}
              <span className="text-gradient-primary">
                journey
              </span>
              .
            </>
          }
          description="Competitions, projects and coding milestones that shaped my journey in software development, AI and game engineering."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
              }}
              className="ring-glow group flex items-start gap-4 rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-surface-elevated"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/15 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110">
                <it.Icon className="h-5 w-5" />
              </div>

              <div>
                <div className="font-display text-base font-semibold">
                  {it.title}
                </div>

                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {it.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}