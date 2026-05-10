import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Play, X } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type Project = {
  id: string;
  title: string;
  category: string;
  tag: string;
  blurb: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  gradient: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    id: "missile-run",
    title: "Missile Run",
    category: "Game",
    tag: "Unity · 2D",
    blurb: "High-speed evasive arcade shooter with reactive enemy waves.",
    description:
      "A fast, polished arcade game built in Unity featuring procedural wave generation, reactive AI, juicy feedback systems and a full meta-progression loop.",
    tech: ["Unity", "C#", "Shader Graph", "Inkscape"],
    github: "https://github.com/TyrantRaj/Missile-Run",
    demo: "https://tyrantrraj.itch.io/missilerun-2d",
    gradient: "from-white/[0.08] to-white/[0.02]",
    image: "/projectimages/missile.png",
  },
  {
    id: "fragile-relic",
    title: "Fragile Relic",
    category: "Game",
    tag: "India Game Jam · Top 7",
    blurb: "Atmospheric puzzle-platformer about preserving a dying artifact.",
    description:
      "Selected in the Top 7 of the India Game Jam. A narrative-driven puzzle platformer with hand-tuned mechanics, ambient sound design and a custom lighting system.",
    tech: ["Unity", "C#", "PS", "FMOD"],
    github: "https://github.com/TyrantRaj",
    demo: "https://tyrantrraj.itch.io/the-fragile-relic",
    gradient: "from-white/[0.08] to-white/[0.02]",
    image: "/projectimages/fragilerelic.png",
  },
  {
    id: "Circle Chaos",
    title: "2D Chaos Platformer",
    category: "Game",
    tag: "Playstore",
    blurb: "A chaotic rage platformer where random events constantly try to ruin your run.",
  description:
    "Circle Chaos is a fast-paced 2D platformer built around unpredictable gameplay and pure chaos. The game constantly triggers random events like inverted controls, missile attacks, gravity flips, bouncing physics, screen distortion, speed changes and time manipulation to challenge player reflexes and patience. Designed with a minimal visual style and frustration-driven gameplay loop, the project focuses on dynamic event systems, responsive controls and replayability.",
  tech: ["Unity", "C#", "2D Physics", "Mobile", "Play Store"],
  github: "https://github.com/TyrantRaj/Circle-Chaos",
  demo: "https://play.google.com/store/apps/details?id=com.tyrantgames.circlechaos&hl=en_IN",
  gradient: "from-white/[0.08] to-white/[0.02]",
  image: "/projectimages/CircleChaos.png",
  },
  {
  id: "dental-website",
  title: "Dental Website",
  category: "Web",
  tag: "Client Website",
  blurb: "Modern dental clinic website focused on appointments, services and patient trust.",
  description:
    "A professionally designed dental clinic website developed for a client.",
  tech: ["HTML", "CSS", "JavaScript","BOOTSTRAP"],
  github: "https://github.com/TyrantRaj/dental-web-project",
  demo: "https://olivedentistry.in/",
  gradient: "from-white/[0.08] to-white/[0.02]",
  image: "/projectimages/dental-website.png",
},
  {
  id: "speed-math",
  title: "Speed Math App",
  category: "Mobile",
  tag: "Play Store",
  blurb: "Fast-paced mental math training app designed to improve calculation speed and accuracy.",
  description:
    "A mobile app developed to help students practice and improve mental math through quick problem-solving challenges and timed exercises. Built with Android Studio using Java and XML, the app features score tracking, responsive UI screens and progressively difficult math challenges. Published on the Google Play Store with a focus on performance, simplicity and engaging practice sessions.",
  tech: ["Android Studio", "Java", "XML", "Google Play"],
  demo: "https://play.google.com/store/apps/details?id=com.yuvaraj.speedmath",
  gradient: "from-white/[0.08] to-white/[0.02]",
  image: "/projectimages/speedmath.png",
},
  {
  id: "sign-language-recognition",
  title: "Sign Language Recognition",
  category: "AI / ML",
  tag: "Hackathon Winner",
  blurb: "AI-powered system that converts hand gestures into readable English text in real time.",
  description:
    "A computer vision project developed to bridge communication barriers for deaf and mute individuals by translating sign language gestures into English. Built using Python, OpenCV, MediaPipe and TensorFlow, the system detects hand landmarks in real time and predicts corresponding gestures using a trained machine learning model. The project was developed during a hackathon and won 1st prize for its social impact and practical implementation.",
  tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow"],
  github: "https://github.com/TyrantRaj/Sign-Language-Learner",
  demo: "https://github.com/TyrantRaj/Sign-Language-Learner",
  gradient: "from-white/[0.08] to-white/[0.02]",
  image: "/projectimages/signlanguage.jpg",
},
  {
  id: "fraud-detection-system",
  title: "Fraud Detection System",
  category: "AI / ML",
  tag: "Machine Learning",
  blurb: "AI-powered fraud detection system that identifies suspicious financial transactions in real time.",
  description:
    "A machine learning web application designed to detect fraudulent transactions using predictive analytics and classification models. The system analyzes transaction patterns, user behavior and anomaly indicators to classify transactions as legitimate or fraudulent. Built with Python and deployed using Streamlit for an interactive user experience.",
  tech: ["Python", "Machine Learning", "Pandas", "Scikit-learn", "Streamlit"],
  github: "https://github.com/TyrantRaj/FraudDetection-System",
  demo: "https://fraud-detector-ai.streamlit.app/",
  gradient: "from-white/[0.08] to-white/[0.02]",
  image: "/projectimages/FraudDetection.png",
},
 {
  id: "fake-news-detection",
  title: "Fake News Detection",
  category: "AI / ML",
  tag: "NLP",
  blurb: "Natural language processing system that predicts whether news content is real or fake.",
  description:
    "An NLP-based fake news detection system developed to classify news articles using machine learning and text analysis techniques. The project uses preprocessing, vectorization and classification models to analyze article content and predict authenticity. Deployed with Streamlit to provide a simple and interactive interface for testing news articles in real time.",
  tech: ["Python", "NLP", "Scikit-learn", "Pandas", "Streamlit"],
  github: "https://github.com/TyrantRaj/FakeNewsPrediction",
  demo: "https://truthnewsai.streamlit.app/",
  gradient: "from-white/[0.08] to-white/[0.02]",
  image: "/projectimages/FakeNews.png",
},
];

const FILTERS = ["All", "Game", "AI / ML", "Web", "Mobile"];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Project | null>(null);

  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected Work"
          title={
            <>
              Projects I've <span className="text-gradient-primary">built, broken</span> and shipped.
            </>
          }
          description="A cross-section of games, AI tools, web platforms and experiments."
        />

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                filter === f
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border bg-surface/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => setActive(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setActive(p); }}
                data-cursor="view"
                data-cursor-label="Open"
                className="ring-glow group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 text-left backdrop-blur transition-all hover:-translate-y-1 hover:bg-surface-elevated"
              >
                {/* Cover */}
                <div className="relative aspect-[16/10] overflow-hidden">
  <img
    src={p.image}
    alt={p.title}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

  <div className="absolute right-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-foreground backdrop-blur">
    {p.tag}
  </div>
</div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background/40 px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor-label="Launch"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-[0_0_18px_oklch(1_0_0/0.22)] transition-transform hover:scale-[1.03]"
                      >
                        <Play className="h-3 w-3 fill-current" /> Live Demo
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor-label="Code"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background/40 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        <Github className="h-3 w-3" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-elevated"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative aspect-[16/8] overflow-hidden">
  <img
    src={active.image}
    alt={active.title}
    className="h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
</div>
              <div className="space-y-5 p-7">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest">
                  <span className="text-primary">{active.category}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{active.tag}</span>
                </div>
                <h3 className="font-display text-3xl font-bold">{active.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {active.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium hover:border-primary/40"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  )}
                  {active.demo && (
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
