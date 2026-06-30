"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, FileText, Search } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { DECK_EASE, DECK_TIMING, HOOK_SCENE } from "@/components/ui/deck-timing";

const ease = DECK_EASE;

export function useTypewriter(text: string, speed: number, enabled: boolean) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!enabled) {
      setOut("");
      return;
    }
    if (speed === 0) {
      setOut(text);
      return;
    }
    let i = 0;
    setOut("");
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, enabled]);
  return out;
}

export function useCountUp(target: number, duration: number, enabled: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled]);
  return value;
}

export function TypingCursor({ dark }: { dark?: boolean }) {
  return <span className={`hook-cursor${dark ? " hook-cursor--dark" : ""}`} />;
}

export function TypewriterText({
  text,
  speed = DECK_TIMING.typewriterCharMs,
  active = true,
  showCursor = true,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  speed?: number;
  active?: boolean;
  showCursor?: boolean;
  className?: string;
  as?: "span" | "p";
}) {
  const reduced = useReducedMotion();
  const display = useTypewriter(text, reduced ? 0 : speed, active);
  const typing = !reduced && active && display.length < text.length;

  return (
    <Tag className={className}>
      {reduced ? text : display}
      {showCursor && typing && <TypingCursor dark />}
    </Tag>
  );
}

type SceneBase = {
  active?: boolean;
  compact?: boolean;
  delay?: number;
  className?: string;
  fast?: boolean;
};

export function EditorScene({
  active = true,
  compact,
  delay = 0,
  className = "",
  fast,
  label = "Content editor",
  lines = ["// SEO blog draft — Q1 2026", 'H1: "How to rank #1 on Google"', "Writing 2,000 words for clicks..."],
}: SceneBase & { label?: string; lines?: [string, string, string] }) {
  const ms = fast ? HOOK_SCENE.charMs : 28;
  const line1 = useTypewriter(lines[0], ms, active);
  const line2 = useTypewriter(lines[1], ms, fast ? active : false);
  const line3 = useTypewriter(lines[2], ms, fast ? active : false);
  const [line2On, setLine2On] = useState(false);
  const [line3On, setLine3On] = useState(false);
  const slowLine2 = useTypewriter(lines[1], 26, line2On);
  const slowLine3 = useTypewriter(lines[2], 24, line3On);

  useEffect(() => {
    if (!active || fast) {
      setLine2On(false);
      setLine3On(false);
      return;
    }
    const t1 = window.setTimeout(() => setLine2On(true), 900);
    const t2 = window.setTimeout(() => setLine3On(true), 1900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [active, fast]);

  const displayLine2 = fast ? line2 : slowLine2;
  const displayLine3 = fast ? line3 : slowLine3;
  const typingLine3 = fast ? active : line3On;

  return (
    <motion.div
      className={`hook-scene${compact ? " hook-scene--compact" : ""} ${className}`.trim()}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: fast ? HOOK_SCENE.enterDurationSec : 0.4, delay, ease }}
    >
      <div className="hook-scene__head">
        <FileText size={15} />
        <span>{label}</span>
      </div>
      <div className="hook-scene__editor">
        <div className="hook-scene__chrome">
          <span /><span /><span />
        </div>
        <div className="hook-scene__code">
          <p>{line1}</p>
          <p>{displayLine2}</p>
          <p>
            {displayLine3}
            {typingLine3 && displayLine3.length < lines[2].length && <TypingCursor />}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function AgentScene({
  active = true,
  compact,
  delay = 0,
  className = "",
  fast,
  label = "AI agent",
  prompt = "Assign agent: audit AI citation share",
  chips = ["Visibility audit", "Entity mapping"],
  assignedLabel = "Assigned ✓",
}: SceneBase & {
  label?: string;
  prompt?: string;
  chips?: [string, string?];
  assignedLabel?: string;
}) {
  const typed = useTypewriter(prompt, fast ? HOOK_SCENE.charMs : 22, active);
  const [assigned, setAssigned] = useState(false);

  useEffect(() => {
    if (!active) {
      setAssigned(false);
      return;
    }
    const t = window.setTimeout(
      () => setAssigned(true),
      fast ? HOOK_SCENE.revealMs : 2200,
    );
    return () => window.clearTimeout(t);
  }, [active, fast]);

  return (
    <motion.div
      className={`hook-scene${compact ? " hook-scene--compact" : ""} ${className}`.trim()}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: fast ? HOOK_SCENE.enterDurationSec : 0.4, delay, ease }}
    >
      <div className="hook-scene__head">
        <Bot size={15} />
        <span>{label}</span>
      </div>
      <div className="hook-scene__agent">
        <p className="hook-scene__prompt">{typed}</p>
        <div className="hook-scene__chips">
          <span className="hook-scene__chip">{chips[0]}</span>
          {chips[1] && <span className="hook-scene__chip hook-scene__chip--muted">{chips[1]}</span>}
        </div>
        <motion.span
          className="hook-scene__assigned"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={assigned ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.25, ease }}
        >
          {assignedLabel}
        </motion.span>
      </div>
    </motion.div>
  );
}

export function GoogleScene({
  active = true,
  compact,
  delay = 0,
  className = "",
  fast,
  label = "Google search",
  query = "best B2B marketing agency germany",
  overviewText = "Top agencies include…",
  overviewEm = "answer shown — zero click",
}: SceneBase & {
  label?: string;
  query?: string;
  overviewText?: string;
  overviewEm?: string;
}) {
  const typed = useTypewriter(query, fast ? HOOK_SCENE.charMs : 30, active);
  const [showOverview, setShowOverview] = useState(false);

  useEffect(() => {
    if (!active) {
      setShowOverview(false);
      return;
    }
    const t = window.setTimeout(
      () => setShowOverview(true),
      fast ? HOOK_SCENE.revealMs : 1800,
    );
    return () => window.clearTimeout(t);
  }, [active, fast]);

  return (
    <motion.div
      className={`hook-scene${compact ? " hook-scene--compact" : ""} ${className}`.trim()}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: fast ? HOOK_SCENE.enterDurationSec : 0.4, delay, ease }}
    >
      <div className="hook-scene__head">
        <Search size={15} />
        <span>{label}</span>
      </div>
      <div className="hook-scene__google">
        <div className="hook-scene__searchbar">
          <Search size={14} className="text-faint" />
          <span>{typed}</span>
          {active && typed.length < query.length && <TypingCursor dark />}
        </div>
        <motion.div
          className="hook-scene__overview"
          initial={{ opacity: 0, height: 0 }}
          animate={showOverview ? { opacity: 1, height: "auto" } : {}}
          transition={{ duration: 0.35, ease }}
        >
          <p className="hook-scene__overview-label">AI Overview</p>
          <p className="hook-scene__overview-text">
            {overviewText} <em>{overviewEm}</em>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function SceneStrip({
  scenes,
  compact,
}: {
  compact?: boolean;
  scenes: ReactNode;
}) {
  return <div className={`hook-scenes${compact ? " hook-scenes--compact" : ""}`}>{scenes}</div>;
}

export function CountUpNumber({
  value,
  duration = DECK_TIMING.countUpMs,
  active = true,
  className = "",
}: {
  value: number;
  duration?: number;
  active?: boolean;
  className?: string;
}) {
  const count = useCountUp(value, duration, active);
  return <span className={className}>{count}</span>;
}

export function AnimatedStat({
  numeric,
  prefix = "",
  suffix = "",
  label,
  sub,
  color,
  show = true,
  className = "",
  statDelay = 0,
}: {
  numeric: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub?: string;
  color: "teal" | "rose" | "blue" | "amber" | "green";
  show?: boolean;
  className?: string;
  statDelay?: number;
}) {
  const count = useCountUp(numeric, DECK_TIMING.countUpMs, show);
  const colorClass = {
    teal: "text-teal",
    rose: "text-rose",
    blue: "text-blue",
    amber: "text-amber",
    green: "text-green",
  }[color];

  return (
    <motion.div
      className={`hook-stat card ${className}`.trim()}
      initial={{ opacity: 0, y: 12 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: statDelay, ease }}
    >
      <p className={`stat-value ${colorClass}`}>
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="hook-stat__label">{label}</p>
      {sub && <p className="hook-stat__sub">{sub}</p>}
    </motion.div>
  );
}
