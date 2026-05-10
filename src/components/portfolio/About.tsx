import { motion } from "framer-motion";
import { Brain, Code2, Gamepad2, Network, Rocket, Wand2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const traits = [
  { Icon: Code2, title: "Engineer", text: "Architecting clean, scalable systems with modern stacks." },
  { Icon: Gamepad2, title: "Game Dev", text: "Building polished gameplay loops, mechanics & multiplayer worlds." },
  { Icon: Brain, title: "AI / ML", text: "Designing intelligent models for vision, language and decision systems." },
  { Icon: Network, title: "Full Stack", text: "Shipping end-to-end products from database to pixel." },
  { Icon: Wand2, title: "Creative Tech", text: "Blending art, motion and code into interactive experiences." },
  { Icon: Rocket, title: "Indie Mindset", text: "Owning the full creative loop — design, build, ship, iterate." },
];

export function About() {
  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              I build <span className="text-gradient-primary">games</span>, intelligent systems,
              and the products that connect them.
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-5 text-[15px] leading-relaxed text-muted-foreground md:text-base"
          >
            <p>
              I'm a software developer driven by a deep curiosity for how systems, people, and
              creativity intersect. My work spans <span className="text-foreground">game development</span>,
              <span className="text-foreground"> AI/ML</span>, full-stack engineering and
              experimental creative tech — building things that feel alive.
            </p>
            <p>
              From shipping multiplayer game worlds and AI-driven tools to crafting client websites
              and automation systems, I love the entire cycle: designing the architecture, writing
              the engine, polishing the experience, and pushing it into the wild.
            </p>
            <p>
              I care about <span className="text-foreground">craft</span>, performance, and the
              small details that make a product feel premium. Whether it's a Unity prototype at a
              48-hour game jam or a production-grade ML pipeline, I bring the same builder mindset.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["13+", "Projects Built"],
                ["5", "Hackathons"],
                ["6", "Games Published"],
                ["3+", "Freelance Clients"],
                ["300+", "DSA Problems"],
                ["25+", "Technologies"],
              ].map(([k, v]) => (
                <div
                  key={v}
                  className="ring-glow rounded-xl border border-border bg-surface/60 p-4 backdrop-blur transition-colors hover:bg-surface-elevated"
                >
                  <div className="font-display text-2xl font-bold text-gradient-primary">{k}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            {traits.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="ring-glow spotlight group relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur transition-all hover:-translate-y-1"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-display text-base font-semibold">{title}</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
