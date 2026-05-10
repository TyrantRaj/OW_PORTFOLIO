import { motion } from "framer-motion";
import { Award, Briefcase, Code2, Gamepad2, Trophy } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const TIMELINE = [
  {
    year: "2018",
    role: "First Introduction to Programming",
    org: "School Days",
    Icon: Code2,
    desc: "While watching my brother and cousin struggle with a C++ error, I searched online and fixed it myself. That moment sparked my curiosity about programming and became the beginning of my journey into tech.",
  },
  {
    year: "2020",
    role: "Learning Python & C++ During COVID",
    org: "Self Learning",
    Icon: Code2,
    desc: "During the COVID lockdown period in 10th grade, I started learning Python and C++ through online resources and experimentation. This was my first serious step into software development.",
  },
  {
    year: "2021",
    role: "Game Development Dream Begins",
    org: "Gaming & Creativity",
    Icon: Gamepad2,
    desc: "After spending countless hours playing Free Fire, I became fascinated by how games were created. That curiosity pushed me to explore game engines and game development for the first time.",
  },
  {
    year: "2021",
    role: "Android Developer Journey",
    org: "Android Studio",
    Icon: Briefcase,
    desc: "Without owning a PC capable of running game engines, I borrowed a government laptop from my brother’s friend and started learning Android Studio. My goal was to release apps, earn money and build my dream gaming PC.",
  },
  {
    year: "2022",
    role: "Published First Play Store App",
    org: "Speed Math",
    Icon: Trophy,
    desc: "Built and released Speed Math on the Google Play Store using Android Studio, Java and XML. Although it did not generate income, it gave me real-world experience in mobile app development and publishing.",
  },
  {
    year: "2023",
    role: "Dream PC & Full Game Development",
    org: "College Journey",
    Icon: Gamepad2,
    desc: "After joining college, I finally got my dream PC and fully entered the world of game development. I built multiple Unity projects, released games on the Play Store and started experimenting with advanced gameplay systems.",
  },
  {
    year: "2024",
    role: "Freelance Web Development",
    org: "Client Projects",
    Icon: Briefcase,
    desc: "Developed a professional dental clinic website for a client with modern UI, responsive design and SEO optimization. What started as a simple requirement became a polished high-end production website.",
  },
  {
    year: "2024",
    role: "Hackathons & AI/ML Projects",
    org: "Innovation",
    Icon: Award,
    desc: "Built AI and computer vision projects including Sign Language Recognition, Fraud Detection and Fake News Detection systems. Participated in hackathons and developed real-world solutions focused on impact and usability.",
  },
  {
    year: "2025",
    role: "Building My Dream Multiplayer Game",
    org: "Current Focus",
    Icon: Gamepad2,
    desc: "Currently developing my dream PC game featuring proximity voice chat, procedural world generation and multiplayer systems while continuing to explore AI, game development and full-stack engineering.",
  },
  {
    year: "2025",
    role: "Graduate & Aspiring Software Engineer",
    org: "Career Journey",
    Icon: Trophy,
    desc: "Completed my college journey and now actively looking for opportunities in software engineering, game development and AI/ML while continuing to build ambitious projects independently.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Journey"
          title={
            <>
              A timeline of <span className="text-gradient-primary">building, shipping</span> and competing.
            </>
          }
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-secondary/30 to-transparent md:left-1/2 md:-translate-x-1/2" />
          {TIMELINE.map((t, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative mb-8 flex gap-4 md:mb-12 md:items-center ${
                  left ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background shadow-[0_0_0_4px_oklch(0_0_0)] md:absolute md:left-1/2 md:-translate-x-1/2">
                  <t.Icon className="h-4 w-4 text-primary" />
                </div>
                <div className={`ring-glow w-full rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur md:w-[calc(50%-2.5rem)] ${left ? "md:mr-auto" : "md:ml-auto"}`}>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-primary">{t.year}</div>
                  <div className="mt-1 font-display text-lg font-semibold">{t.role}</div>
                  <div className="text-xs text-muted-foreground">{t.org}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
