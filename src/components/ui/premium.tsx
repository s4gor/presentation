"use client";

import { speakerForSlide } from "@/components/slides/speakers";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};

export function SlideShell({
  children,
  index,
  total,
  center,
  speaker,
}: {
  children: ReactNode;
  index: number;
  total: number;
  center?: boolean;
  speaker?: string;
}) {
  const who = speaker ?? speakerForSlide(index);
  return (
    <div className="slide-root">
      {who && <span className="slide-speaker">{who}</span>}
      <motion.div
        className={`slide-inner${center ? " slide-inner--center" : ""}`}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
      <footer className="slide-footer">
        <span>Horizon 2035 · Team 14 · Brief B</span>
        <span className="slide-footer__num">
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </footer>
    </div>
  );
}

export function SlideBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`slide-body${className ? ` ${className}` : ""}`}>{children}</div>;
}

export function SlideMain({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`slide-main${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}

export function SlideHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <header className="slide-header">
      <motion.div className="slide-eyebrow" variants={fade}>
        {eyebrow}
      </motion.div>
      <motion.h1 className="slide-title" variants={fade}>
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p className="slide-subtitle" variants={fade}>
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}

export function Card({
  children,
  accentColor,
  className = "",
  style,
}: {
  children: ReactNode;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`card${accentColor ? " card--accent-top" : ""} ${className}`.trim()}
      style={{ ...style, ...(accentColor ? { borderTopColor: accentColor } : {}) }}
      variants={fade}
    >
      {children}
    </motion.div>
  );
}

export function CardTitle({ children, color = "teal" }: { children: ReactNode; color?: string }) {
  const map: Record<string, string> = {
    teal: "text-teal",
    blue: "text-blue",
    green: "text-green",
    gold: "text-gold",
    rose: "text-rose",
  };
  return <p className={`card-title ${map[color] ?? "text-teal"}`}>{children}</p>;
}

export function List({ items, numbered }: { items: string[]; numbered?: boolean }) {
  return (
    <ul className="slide-list">
      {items.map((item, i) => (
        <motion.li key={i} variants={fade}>
          {numbered ? (
            <span className="slide-list__num">{i + 1}</span>
          ) : (
            <span className="slide-list__dot" />
          )}
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <motion.div className="slide-callout" variants={fade}>
      {children}
    </motion.div>
  );
}

export function Tag({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span className={`slide-tag${active ? " slide-tag--active" : ""}`}>{children}</span>
  );
}

export function Stat({ value, label, sub, color = "teal" }: { value: string; label: string; sub?: string; color?: string }) {
  const map: Record<string, string> = {
    teal: "text-teal",
    rose: "text-rose",
    blue: "text-blue",
    amber: "text-amber",
    green: "text-green",
  };
  return (
    <motion.div className="card" style={{ textAlign: "center" }} variants={fade}>
      <p className={`stat-value ${map[color]}`} style={{ fontSize: "var(--deck-stat)", fontWeight: 500 }}>
        {value}
      </p>
      <p style={{ marginTop: 8, fontSize: "var(--deck-sm)", fontWeight: 600, color: "var(--text)" }}>{label}</p>
      {sub && <p style={{ marginTop: 4, fontSize: "var(--deck-xs)", color: "var(--text-faint)" }}>{sub}</p>}
    </motion.div>
  );
}

export function SectionHero({
  index,
  total,
  num,
  title,
  subtitle,
}: {
  index: number;
  total: number;
  num: string;
  title: string;
  subtitle: string;
}) {
  return (
    <SlideShell index={index} total={total} center>
      <motion.div className="section-panel" variants={fade}>
        <span className="section-panel__num" aria-hidden>
          {num}
        </span>
        <div className="section-panel__content">
          <Tag active>Section {num}</Tag>
          <h1 className="slide-title" style={{ marginTop: 24 }}>
            {title}
          </h1>
          <p className="slide-subtitle" style={{ marginTop: 16, maxWidth: 520, marginInline: "auto" }}>
            {subtitle}
          </p>
        </div>
      </motion.div>
    </SlideShell>
  );
}

export function BarChart({ bars }: { bars: { label: string; value: number; max: number }[] }) {
  return (
    <div style={{ display: "flex", height: 140, alignItems: "flex-end", justifyContent: "center", gap: 48, padding: "0 16px" }}>
      {bars.map((b) => (
        <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <motion.div
            style={{
              width: 56,
              borderRadius: "6px 6px 0 0",
              background: "var(--teal)",
              height: `${(b.value / b.max) * 100}%`,
              maxHeight: 110,
            }}
            initial={{ height: 0 }}
            animate={{ height: `${(b.value / b.max) * 100}%` }}
            transition={{ duration: 0.5, ease }}
          />
          <span className="stat-value" style={{ fontSize: 14, fontWeight: 500 }}>
            {b.value}%
          </span>
          <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

/* Aliases for slides that still import old names */
export const DisplayTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h1 className={`slide-title ${className}`}>{children}</h1>
);
export const Subtitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`slide-subtitle ${className}`}>{children}</p>
);
export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="slide-eyebrow">{children}</div>
);
