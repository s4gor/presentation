/** Shared motion timing — keep slides 1 & 2 (and scenes) in sync */
export const DECK_EASE = [0.25, 0.1, 0.25, 1] as const;

export const DECK_TIMING = {
  typewriterCharMs: 18,
  typewriterStartMs: 650,
  statsStartMs: 1350,
  countUpMs: 900,
  enterDurationSec: 0.4,
  staggerSec: 0.08,
  staggerChildrenDelaySec: 0.12,
  titleLine1DelaySec: 0.2,
  titleAccentDelaySec: 0.55,
} as const;

/** Slide 2 — three Mac-style scene panels (editor / agent / google) */
export const HOOK_SCENE = {
  charMs: 16,
  enterDurationSec: 0.35,
  revealMs: 720,
} as const;

export const deckFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DECK_TIMING.enterDurationSec, ease: DECK_EASE },
  },
};

export const deckStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DECK_TIMING.staggerSec,
      delayChildren: DECK_TIMING.staggerChildrenDelaySec,
    },
  },
};
