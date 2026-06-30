"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  AgentScene,
  AnimatedStat,
  EditorScene,
  GoogleScene,
  TypewriterText,
} from "@/components/ui/animations";
import { DECK_EASE, DECK_TIMING } from "@/components/ui/deck-timing";
import { CardTitle, SlideBody, SlideShell } from "@/components/ui/premium";

type P = { index: number; total: number };

const QUESTION =
  "What happens to organic discoverability when AI answers the query — and the brand never gets the click?";

export function HookSlide({ index, total }: P) {
  const reduced = useReducedMotion();
  const [questionOn, setQuestionOn] = useState(!!reduced);
  const [statsOn, setStatsOn] = useState(!!reduced);

  useEffect(() => {
    if (reduced) return;
    const q = window.setTimeout(() => setQuestionOn(true), DECK_TIMING.typewriterStartMs);
    const s = window.setTimeout(() => setStatsOn(true), DECK_TIMING.statsStartMs);
    return () => {
      window.clearTimeout(q);
      window.clearTimeout(s);
    };
  }, [reduced]);

  return (
    <SlideShell index={index} total={total}>
      <SlideBody className="hook-slide-body">
        <div className="hook-scenes hook-scenes--lg">
          <EditorScene
            active
            fast
            label="Content editor"
            lines={[
              "// Generic blog — Q1 2026",
              'H1: "Top 10 SEO tips for 2026"',
              "2,000 words AI can rewrite for free...",
            ]}
          />
          <AgentScene
            active
            fast
            label="ChatGPT"
            prompt="Best B2B vendor for food processing?"
            chips={["Synthesizes sources", "Cites spec sheets"]}
            assignedLabel="Answer ready"
          />
          <GoogleScene
            active
            fast
            label="Google · AI Overview"
            query="industrial pump specifications"
            overviewText="Key specs summarized from GEA, Grundfos…"
            overviewEm="no click required"
          />
        </div>

        <motion.div
          className="hook-question card bg-teal-pale"
          initial={{ opacity: 0, y: 8 }}
          animate={questionOn ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: DECK_TIMING.enterDurationSec, ease: DECK_EASE }}
        >
          <CardTitle>The strategic problem</CardTitle>
          <p className="hook-question__text">
            {reduced ? QUESTION : <TypewriterText text={QUESTION} active={questionOn} as="span" />}
          </p>
        </motion.div>

        <div className="hook-stats">
          <motion.div className="hook-stat card" initial={{ opacity: 0, y: 12 }} animate={statsOn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, ease: DECK_EASE }}>
            <p className="stat-value text-rose">59.7%</p>
            <p className="hook-stat__label">Zero-click EU</p>
            <p className="hook-stat__sub">SparkToro</p>
          </motion.div>
          <AnimatedStat show={statsOn} statDelay={0.08} numeric={20} suffix="%" label="AI Overviews" sub="SISTRIX DE" color="teal" />
          <AnimatedStat show={statsOn} statDelay={0.16} numeric={25} prefix="−" suffix="%" label="Search volume" sub="Gartner 2026" color="blue" />
          <AnimatedStat show={statsOn} statDelay={0.24} numeric={374} label="Clicks / 1k" sub="Open web EU" color="amber" />
        </div>
      </SlideBody>
    </SlideShell>
  );
}
