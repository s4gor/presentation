"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Globe,
  Layers,
  Lock,
  MessageSquareQuote,
  MousePointerClick,
  Search,
  TrendingDown,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { DECK_EASE } from "@/components/ui/deck-timing";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: DECK_EASE },
  }),
};

export function MethodologyPhases() {
  const phases = [
    { n: "01", title: "Preparation", body: "Purpose · system picture · decision focus", color: "var(--teal)" },
    { n: "02", title: "Exploration", body: "STEEP scan · Givens vs Drivers · interviews", color: "var(--blue)" },
    { n: "03", title: "Development", body: "2×2 matrix · four narratives · early warnings", color: "var(--gold)" },
  ];
  return (
    <div className="method-phases">
      {phases.flatMap((p, i) => {
        const card = (
          <motion.div
            key={p.n}
            className="method-phase card"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fade}
          >
            <span className="method-phase__num" style={{ color: p.color }}>{p.n}</span>
            <p className="method-phase__title">{p.title}</p>
            <p className="method-phase__body">{p.body}</p>
          </motion.div>
        );
        if (i === phases.length - 1) return [card];
        return [
          card,
          <div key={`connector-${p.n}`} className="method-phase__connector" aria-hidden>
            <span className="method-phase__connector-line" />
            <span className="method-phase__connector-icon">
              <ArrowRight size={14} strokeWidth={2.5} />
            </span>
          </div>,
        ];
      })}
    </div>
  );
}

export function ValueChainFlow() {
  const steps = [
    { icon: Search, label: "Users" },
    { icon: Bot, label: "AI platforms" },
    { icon: Globe, label: "Publishers & brands" },
    { icon: Layers, label: "Agencies & tools" },
    { icon: MousePointerClick, label: "B2B funnels" },
  ];
  const platforms = ["Google AIO", "ChatGPT", "Copilot", "Perplexity"];
  return (
    <div className="value-chain">
      <div className="value-chain__platforms">
        {platforms.map((p) => (
          <span key={p} className="slide-tag">{p}</span>
        ))}
      </div>
      <div className="value-chain__row">
        {steps.map((s, i) => (
          <div key={s.label} className="value-chain__step">
            <div className="value-chain__icon"><s.icon size={16} /></div>
            <span>{s.label}</span>
            {i < steps.length - 1 && <ArrowRight size={14} className="value-chain__sep" aria-hidden />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function OpenWebSplit() {
  return (
    <div className="open-web-split">
      <div className="open-web-split__bar">
        <motion.div className="open-web-split__zero" initial={{ width: 0 }} animate={{ width: "62.6%" }} transition={{ duration: 0.7, ease: DECK_EASE }} />
        <motion.div className="open-web-split__open" initial={{ width: 0 }} animate={{ width: "37.4%" }} transition={{ duration: 0.7, delay: 0.15, ease: DECK_EASE }} />
      </div>
      <div className="open-web-split__labels">
        <span><strong className="text-rose">626</strong> zero-click</span>
        <span><strong className="text-teal">374</strong> reach open web</span>
      </div>
      <p className="text-faint open-web-split__note">Per 1,000 EU Google searches · SparkToro 2024</p>
    </div>
  );
}

export function GivenDriverBadge({ kind }: { kind: "given" | "driver" }) {
  return <span className={`factor-badge factor-badge--${kind}`}>{kind === "given" ? "Given" : "Driver"}</span>;
}

export function GivensChart() {
  const bars = [
    { id: "S1", label: "Zero-click EU", value: 59.7, color: "var(--rose)" },
    { id: "T1", label: "AI Overviews DE", value: 20, color: "var(--teal)" },
    { id: "E1", label: "Reach open web", value: 37.4, color: "var(--amber)" },
  ];
  return (
    <div className="givens-chart">
      {bars.map((b, i) => (
        <motion.div
          key={b.id}
          className="givens-chart__row"
          custom={i}
          initial="hidden"
          animate="visible"
          variants={fade}
        >
          <div className="givens-chart__meta">
            <span className="givens-chart__id">{b.id}</span>
            <span className="givens-chart__label">{b.label}</span>
            <span className="givens-chart__value" style={{ color: b.color }}>{b.value}%</span>
          </div>
          <div className="givens-chart__track">
            <motion.div
              className="givens-chart__fill"
              style={{ background: b.color }}
              initial={{ width: 0 }}
              animate={{ width: `${b.value}%` }}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.08, ease: DECK_EASE }}
            />
          </div>
        </motion.div>
      ))}
      <motion.div className="givens-chart__aio" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, ease: DECK_EASE }}>
        <span className="givens-chart__aio-num">2B+</span>
        <span className="givens-chart__aio-label">AIO users across platforms</span>
      </motion.div>
      <p className="givens-chart__footnote">SparkToro · SISTRIX · 374 / 1k searches</p>
    </div>
  );
}

export function AxisSpectrum({
  label,
  left,
  right,
  tone,
}: {
  label: string;
  left: string;
  right: string;
  tone: "teal" | "gold";
}) {
  return (
    <div className={`axis-spectrum axis-spectrum--${tone}`}>
      <p className="axis-spectrum__label">{label}</p>
      <div className="axis-spectrum__bar">
        <span className="axis-spectrum__pole">{left}</span>
        <div className="axis-spectrum__line" aria-hidden>
          <span className="axis-spectrum__line-fill" />
        </div>
        <span className="axis-spectrum__pole">{right}</span>
      </div>
    </div>
  );
}

export function DriverTags({ items, grid }: { items: string[]; grid?: boolean }) {
  return (
    <div className={`driver-tags${grid ? " driver-tags--grid" : ""}`}>
      {items.map((item) => (
        <span key={item} className="driver-tags__item">{item}</span>
      ))}
    </div>
  );
}

export function DriversAxisFrame({ drivers }: { drivers: string[] }) {
  return (
    <div className="drivers-axis-frame">
      <p className="drivers-axis-frame__caption">Two critical uncertainties — four scenarios on the matrix</p>
      <div className="drivers-axis-frame__body">
        <div className="drivers-axis-frame__layout">
          <div className="drivers-axis-frame__y-axis" aria-hidden>
            <span className="drivers-axis-frame__y-end">AI-native</span>
            <div className="drivers-axis-frame__y-line" />
            <span className="drivers-axis-frame__y-end">Hybrid</span>
          </div>
          <div className="drivers-axis-frame__core">
            <p className="drivers-axis-frame__axis-title drivers-axis-frame__axis-title--y">Axis 1 · Discovery</p>
            <div className="drivers-axis-frame__plot">
              <div className="drivers-axis-frame__crosshair" aria-hidden />
              <span className="drivers-axis-frame__hub">2035</span>
            </div>
            <div className="drivers-axis-frame__x-axis" aria-hidden>
              <span>Website funnels</span>
              <span>Zero-click influence</span>
            </div>
            <p className="drivers-axis-frame__axis-title drivers-axis-frame__axis-title--x">Axis 2 · Value capture</p>
          </div>
        </div>
        <div className="drivers-axis-frame__drivers">
          <p className="drivers-axis-frame__drivers-label">Critical drivers</p>
          <ul className="drivers-axis-frame__list">
            {drivers.map((item, i) => (
              <motion.li key={item} custom={i} initial="hidden" animate="visible" variants={fade}>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function DriversMatrixHint() {
  const rows = [
    [
      { n: "03", t: "Gatekeeper", c: "rose" },
      { n: "01", t: "Citation", c: "teal" },
    ],
    [
      { n: "02", t: "Last-Click", c: "green" },
      { n: "04", t: "Slow", c: "amber" },
    ],
  ];
  return (
    <div className="drivers-matrix-hint">
      <p className="drivers-matrix-hint__label">Feeds the 2×2 matrix</p>
      <div className="drivers-matrix-hint__grid">
        {rows.map((row, ri) => (
          <div key={ri} className="drivers-matrix-hint__row">
            {row.map((cell) => (
              <div key={cell.n} className={`drivers-matrix-hint__cell drivers-matrix-hint__cell--${cell.c}`}>
                <span>{cell.n}</span>
                <span>{cell.t}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DriverList({ items }: { items: string[] }) {
  return <DriverTags items={items} />;
}

export function SteepPillar({
  letter,
  name,
  fact,
  kind,
  color,
}: {
  letter: string;
  name: string;
  fact: string;
  kind: "given" | "driver";
  color: string;
}) {
  return (
    <div className="steep-pillar card" style={{ borderTopColor: color }}>
      <div className="steep-pillar__head">
        <span className="steep-pillar__letter" style={{ color }}>{letter}</span>
        <GivenDriverBadge kind={kind} />
      </div>
      <p className="steep-pillar__name">{name}</p>
      <p className="steep-pillar__fact">{fact}</p>
    </div>
  );
}

function MatrixCell({
  c,
  i,
}: {
  i: number;
  c: {
    num: string;
    title: string;
    sub: string;
    badge: string;
    tone: "rose" | "teal" | "green" | "amber";
    color: string;
    icon: typeof Lock;
    hint: string;
    pos: string;
  };
}) {
  return (
    <motion.div
      className={`matrix-cell matrix-cell--${c.pos}`}
      style={{ borderTopColor: c.color, height: "100%" }}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={fade}
    >
      <div className="matrix-cell__head">
        <span className="matrix-cell__num">{c.num}</span>
        <div className={`matrix-cell__icon matrix-cell__icon--${c.tone}`}>
          <c.icon size={18} strokeWidth={2} />
        </div>
      </div>
      <span className={`matrix-badge matrix-badge--${c.tone}`}>{c.badge}</span>
      <p className="matrix-cell__title">{c.title}</p>
      <p className="matrix-cell__sub">{c.sub}</p>
      <p className="matrix-cell__hint">{c.hint}</p>
    </motion.div>
  );
}

export function ScenarioMatrix() {
  const topRow = [
    {
      num: "03",
      title: "Gatekeeper Web",
      sub: "AI-native · funnels still expected",
      badge: "Most concerning",
      tone: "rose" as const,
      color: "var(--rose)",
      icon: Lock,
      hint: "3 platforms control retrieval",
      pos: "tl",
    },
    {
      num: "01",
      title: "Citation Economy",
      sub: "AI-native · zero-click wins",
      badge: "Plausible destination",
      tone: "teal" as const,
      color: "var(--teal)",
      icon: Sparkles,
      hint: "Cited in the answer, not clicked",
      pos: "tr",
    },
  ];

  const bottomRow = [
    {
      num: "02",
      title: "Last-Click Web",
      sub: "Hybrid · websites convert",
      badge: "If commercial CTR holds",
      tone: "green" as const,
      color: "var(--green)",
      icon: MousePointerClick,
      hint: "AI informs · site closes deal",
      pos: "bl",
    },
    {
      num: "04",
      title: "Slow Adaptation",
      sub: "Hybrid · gradual zero-click",
      badge: "Most plausible",
      tone: "amber" as const,
      color: "var(--amber)",
      icon: TrendingDown,
      hint: "More content · fewer clicks",
      pos: "br",
    },
  ];

  return (
    <div className="matrix-chart">
      <div className="matrix-chart__layout">
        <div className="matrix-chart__y-axis" aria-hidden>
          <span className="matrix-chart__y-end">AI-native</span>
          <div className="matrix-chart__y-line" />
          <span className="matrix-chart__y-end">Hybrid</span>
        </div>

        <div className="matrix-chart__core">
          <p className="matrix-chart__x-title">Axis 2 · Value capture</p>
          <div className="matrix-chart__frame">
            <div className="matrix-chart__crosshair" aria-hidden />
            <div className="matrix-chart__hub"><span>2035</span></div>
            <div className="matrix-chart__row">
              {topRow.map((c, i) => <MatrixCell key={c.title} c={c} i={i} />)}
            </div>
            <div className="matrix-chart__row">
              {bottomRow.map((c, i) => <MatrixCell key={c.title} c={c} i={i + 2} />)}
            </div>
          </div>
          <div className="matrix-chart__x-axis" aria-hidden>
            <span>Website funnels</span>
            <span>Zero-click influence</span>
          </div>
        </div>
      </div>

      <div className="matrix-legend">
        <span><MessageSquareQuote size={13} /> Funda → AI-first + citations</span>
        <span><Search size={13} /> Lorena → hybrid + attribution</span>
      </div>
    </div>
  );
}

export function ScenarioVisual({ type }: { type: "citation" | "lastclick" | "gatekeeper" | "slow" }) {
  if (type === "citation") {
    return (
      <div className="scenario-visual">
        <div className="scenario-visual__ai-box">
          <p className="scenario-visual__label">AI answer</p>
          <p className="scenario-visual__line">Best B2B pumps for food processing…</p>
          <div className="scenario-visual__cites">
            <span className="scenario-visual__cite">GEA spec sheet</span>
            <span className="scenario-visual__cite">Industry report</span>
          </div>
        </div>
        <p className="scenario-visual__note text-teal">Citation share = new KPI</p>
      </div>
    );
  }
  if (type === "lastclick") {
    return (
      <div className="scenario-visual">
        <div className="scenario-visual__flow">
          <span className="scenario-visual__node">AI overview</span>
          <ArrowRight size={16} />
          <span className="scenario-visual__node">Google vendor search</span>
          <ArrowRight size={16} />
          <span className="scenario-visual__node scenario-visual__node--accent">Website click</span>
        </div>
        <p className="scenario-visual__note text-green">Commercial intent still converts</p>
      </div>
    );
  }
  if (type === "gatekeeper") {
    return (
      <div className="scenario-visual">
        <div className="scenario-visual__platforms">
          {["ChatGPT", "Copilot", "Perplexity"].map((p) => (
            <div key={p} className="scenario-visual__platform"><Lock size={14} /><span>{p}</span></div>
          ))}
        </div>
        <p className="scenario-visual__note text-rose">Influence real · analytics dark</p>
      </div>
    );
  }
  return (
    <div className="scenario-visual">
      <div className="scenario-visual__trends">
        <div className="scenario-visual__trend"><TrendingUp size={16} className="text-amber" /><span>Content volume</span></div>
        <div className="scenario-visual__trend"><TrendingDown size={16} className="text-rose" /><span>Organic clicks</span></div>
      </div>
      <p className="scenario-visual__note text-amber">Drift, not disruption</p>
    </div>
  );
}
