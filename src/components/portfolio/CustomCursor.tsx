import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hoverActive, setHoverActive] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }

      const t = e.target as HTMLElement;

      // input and textarea intentionally excluded — they must not trigger hover state
      const interactive = t.closest(
        "a, button, [role='button'], [data-cursor]"
      ) as HTMLElement | null;

      if (interactive) {
        const label =
          interactive.getAttribute("data-cursor-label") ??
          (interactive.getAttribute("data-cursor") === "view" ? "View" : null);
        // Only call setState when value actually changes
        setHoverActive((prev) => (prev === true ? true : true));
        setHoverLabel((prev) => (prev === label ? prev : label));
      } else {
        setHoverActive((prev) => (prev === false ? false : false));
        setHoverLabel((prev) => (prev === null ? null : null));
      }
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white transition-[width,height,opacity] duration-150"
        style={{
          width: clicking ? 4 : 6,
          height: clicking ? 4 : 6,
          opacity: hoverActive ? 0 : 1,
          boxShadow: "0 0 12px oklch(1 0 0 / 0.9)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-white transition-[width,height,background] duration-200 ease-out"
        style={{
          width: hoverActive ? 64 : 28,
          height: hoverActive ? 64 : 28,
          background: hoverActive ? "oklch(1 0 0 / 0.95)" : "transparent",
          mixBlendMode: "difference",
        }}
      >
        {hoverLabel && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-black">
            {hoverLabel}
          </span>
        )}
      </div>
    </>
  );
}