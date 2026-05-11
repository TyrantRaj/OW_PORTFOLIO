import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";

/**
 * Blender showcase — Add new images by:
 *   1. Dropping the file into  public/blenderimages/
 *   2. Adding its filename + a title to the IMAGES array below.
 */
const FOLDER = "/blenderimages";

const IMAGES: { file: string; title: string }[] = [
  { file: "burger.png", title: "Stylized Burger Render" },
  { file: "cap.png", title: "Streetwear Cap" },
  { file: "chair.png", title: "Minimal Chair Study" },
  { file: "character.png", title: "3D Character Design" },
  { file: "finalrazegrenade.png", title: "Raze Grenade Final" },
  { file: "headset.png", title: "Gaming Headset" },
  { file: "helmet.png", title: "Sci-Fi Helmet" },
  { file: "machine.png", title: "Industrial Machine" },
  { file: "Mushroom.png", title: "Fantasy Mushroom" },
  { file: "Pig.png", title: "Low Poly Pig" },
  { file: "raze grenade.png", title: "Raze Grenade Prototype" },
  { file: "robot.png", title: "Robot Concept" },
  { file: "scientificbox.png", title: "Scientific Storage Box" },
  { file: "sparkplug.png", title: "Tyrant Spark Plug" },
  { file: "sword.png", title: "Fantasy Sword" },
  { file: "tea.png", title: "Tea Cup Render" },
  { file: "tentacle.png", title: "Creature Tentacle Study" },
  { file: "vase.png", title: "Decorative Vase" },
];



export function Creative() {
  const setRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const openModal = (idx: number) => setActive(idx % IMAGES.length);

  const Card = ({ it, i, refCb }: { it: { file: string; title: string }; i: number; refCb?: (el: HTMLButtonElement | null) => void }) => (
    <button
      ref={refCb}
      type="button"
      onClick={() => openModal(i)}
      data-cursor="view"
      data-cursor-label="Open"
      className="group relative h-[220px] w-[340px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:border-white/30 md:h-[300px] md:w-[460px]"
    >
      <img
        src={`${FOLDER}/${it.file}`}
        alt={it.title}
        draggable={false}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-5 left-6 right-6 flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            Blender · Render
          </div>
          <div className="mt-1 font-display text-xl font-semibold tracking-tight text-white">
            {it.title}
          </div>
        </div>
        <div className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur transition-colors group-hover:border-white/60 group-hover:text-white">
          View
        </div>
      </div>
    </button>
  );

  return (
    <section id="creative" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Creative Lab"
          title={
            <>
              <span className="text-gradient-primary">Blender</span> renders & 3D experiments.
            </>
          }
          description="A cinematic reel of lighting, modelling and material studies. Tap an image to view & download."
        />
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-32" />

        {IMAGES.length === 0 ? (
          <div className="px-8 py-6 font-mono text-sm text-muted-foreground">
            Drop images into <span className="text-foreground">public/blenderimages/</span> and add them to the array.
          </div>
        ) : (
          <motion.div
  className="flex w-max items-center py-6"
  animate={isMobile ? false : { x: ["0%", "-50%"] }}
  transition={{
    duration: 30,
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop",
  }}
  style={{
    willChange: "transform",
  }}
>
            {/* Set A (measured) */}
            <div ref={setRef} className="flex items-center gap-5 pr-5 md:gap-6 md:pr-6">
              {IMAGES.map((it, i) => (
                <Card key={`a-${i}`} it={it} i={i} />
              ))}
            </div>
            {/* Set B (duplicate for seamless wrap) */}
            <div className="flex items-center gap-5 pr-5 md:gap-6 md:pr-6" aria-hidden="true">
              {IMAGES.map((it, i) => (
                <Card key={`b-${i}`} it={it} i={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-10"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col items-center justify-center"
            >
              <img
                src={`${FOLDER}/${IMAGES[active].file}`}
                alt={IMAGES[active].title}
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 backdrop-blur">
                {IMAGES[active].title}
              </div>
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <a
                  href={`${FOLDER}/${IMAGES[active].file}`}
                  download
                  data-cursor-label="Download"
                  className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-xs font-medium text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-black"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
