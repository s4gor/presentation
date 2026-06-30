"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Grid3X3 } from "lucide-react";
import { Background } from "@/components/ui/Background";
import { slideVariants } from "@/components/ui/motion";
import { getSlideComponent, TOTAL_SLIDES } from "@/components/slides";

export function Presentation() {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const go = useCallback(
    (next: number) => {
      if (next < 1 || next > TOTAL_SLIDES) return;
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current],
  );

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const clearFocus = useCallback(() => {
    const el = document.activeElement;
    if (el instanceof HTMLElement) el.blur();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showOverview) {
        if (e.key === "Escape") setShowOverview(false);
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          next();
          clearFocus();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          clearFocus();
          break;
        case "Home":
          go(1);
          clearFocus();
          break;
        case "End":
          go(TOTAL_SLIDES);
          clearFocus();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "o":
        case "O":
          setShowOverview((v) => !v);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, showOverview, toggleFullscreen, clearFocus]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <Background />

      <div className="absolute left-0 top-0 z-50 h-[2px] w-full bg-border">
        <motion.div
          className="h-full bg-teal shadow-[0_0_8px_rgba(10,124,120,0.35)]"
          animate={{ width: `${(current / TOTAL_SLIDES) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div
        className="slide-viewport"
        style={{ aspectRatio: "16/9" }}
      >
        <div className="slide-viewport__titlebar">
          <div className="window-chrome" aria-hidden>
            <span /><span /><span />
          </div>
          <span className="slide-viewport__title">Horizon 2035 · SEO in the Age of AI</span>
        </div>
        <div className="slide-viewport__stage">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {getSlideComponent(current, TOTAL_SLIDES)}
            </motion.div>
          </AnimatePresence>
          <div
            role="presentation"
            className="absolute inset-y-0 left-0 z-20 w-[8%] cursor-pointer"
            onClick={prev}
            onMouseDown={(e) => e.preventDefault()}
          />
          <div
            role="presentation"
            className="absolute inset-y-0 right-0 z-20 w-[8%] cursor-pointer"
            onClick={next}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <div className="relative z-20 mt-5 flex items-center gap-5">
        <button
          type="button"
          onClick={prev}
          onMouseDown={(e) => e.preventDefault()}
          disabled={current === 1}
          className="text-text-muted transition outline-none hover:text-teal focus:outline-none disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-[11px] text-text-muted tabular-nums">
          {String(current).padStart(2, "0")} / {TOTAL_SLIDES}
        </span>
        <button
          type="button"
          onClick={next}
          onMouseDown={(e) => e.preventDefault()}
          disabled={current === TOTAL_SLIDES}
          className="text-text-muted transition outline-none hover:text-teal focus:outline-none disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
        <button
          type="button"
          onClick={() => setShowOverview(true)}
          onMouseDown={(e) => e.preventDefault()}
          className="ml-2 text-text-muted outline-none hover:text-teal focus:outline-none"
        >
          <Grid3X3 size={16} />
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          onMouseDown={(e) => e.preventDefault()}
          className="text-text-muted outline-none hover:text-teal focus:outline-none"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {showOverview && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-y-auto bg-bg/95 p-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOverview(false)}
          >
            <div className="mb-8 flex items-end justify-between border-b border-border pb-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="display text-4xl">Index</h2>
              <button
                type="button"
                onClick={() => setShowOverview(false)}
                onMouseDown={(e) => e.preventDefault()}
                className="text-sm text-text-muted outline-none hover:text-teal focus:outline-none"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 md:grid-cols-4" onClick={(e) => e.stopPropagation()}>
              {Array.from({ length: TOTAL_SLIDES }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    go(n);
                    setShowOverview(false);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  className={`rounded-lg border p-3 text-left outline-none transition focus:outline-none ${
                    n === current ? "border-teal bg-teal-pale/30" : "border-border hover:border-teal/40"
                  }`}
                >
                  <span className="text-xs text-teal tabular-nums">{String(n).padStart(2, "0")}</span>
                  <p className="mt-1 text-sm text-text-muted">Slide {n}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
