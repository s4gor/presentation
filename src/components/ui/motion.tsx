/** Lightweight slide transitions — opacity + translate only (no blur / 3D) */
export const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -16 : 16,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  }),
};
