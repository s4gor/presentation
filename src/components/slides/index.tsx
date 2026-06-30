"use client";

import { HookSlide } from "@/components/slides/HookSlide";
import {
  AxisSpectrum,
  DriverTags,
  DriversMatrixHint,
  GivensChart,
  MethodologyPhases,
  OpenWebSplit,
  ScenarioMatrix,
  ScenarioVisual,
  SteepPillar,
  ValueChainFlow,
} from "@/components/slides/slide-visuals";
import { AnimatedStat, TypewriterText } from "@/components/ui/animations";
import { DECK_EASE, DECK_TIMING, deckFade, deckStagger } from "@/components/ui/deck-timing";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Callout,
  Card,
  CardTitle,
  Eyebrow,
  List,
  SectionHero,
  SlideBody,
  SlideHeader,
  SlideMain,
  SlideShell,
  Stat,
  Subtitle,
  Tag,
  DisplayTitle,
} from "@/components/ui/premium";

type P = { index: number; total: number };

export function TitleSlide({ index, total }: P) {
  const reduced = useReducedMotion();
  const [subtitleOn, setSubtitleOn] = useState(!!reduced);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setSubtitleOn(true), DECK_TIMING.typewriterStartMs);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const members = ["Emran Sagor", "Arshi Islam", "Ashiqur Rahman", "Özlem Ceylan", "Muhammad Wasay"];

  return (
    <SlideShell index={index} total={total} center>
      <div className="intro-slide-wrap">
        <motion.span className="intro-watermark" aria-hidden initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: DECK_EASE }}>
          2035
        </motion.span>
        <motion.div className="intro-slide" variants={deckStagger} initial="hidden" animate="visible">
          <motion.div variants={deckFade}>
            <Eyebrow>Fachhochschule Südwestfalen · E-Business &amp; E-Commerce</Eyebrow>
          </motion.div>
          <motion.h1 className="slide-title" style={{ marginTop: 20 }}>
            <motion.span className="intro-title-line" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: DECK_TIMING.enterDurationSec, delay: reduced ? 0 : DECK_TIMING.titleLine1DelaySec, ease: DECK_EASE }}>
              SEO in the
            </motion.span>
            <motion.span className="intro-title-line intro-title-accent" initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: DECK_TIMING.enterDurationSec, delay: reduced ? 0 : DECK_TIMING.titleAccentDelaySec, ease: DECK_EASE }}>
              Age of AI
            </motion.span>
          </motion.h1>
          <motion.p className="slide-subtitle" style={{ marginTop: 16, maxWidth: 600, marginInline: "auto" }} variants={deckFade}>
            {reduced ? "Scenario planning · Horizon 2035 · Chermack (2011)" : <TypewriterText text="Scenario planning · Horizon 2035 · Chermack (2011)" active={subtitleOn} showCursor={false} />}
          </motion.p>
          <motion.div className="intro-meta" variants={deckStagger}>
            <Tag active>Brief B</Tag>
            <Tag>Prof. Dr. Peter Weber</Tag>
            <Tag>June 2026</Tag>
          </motion.div>
          <motion.div className="intro-team" variants={deckStagger}>
            <motion.p className="intro-team__label" variants={deckFade}>Team 14</motion.p>
            <div className="intro-team__grid">
              {members.map((name) => (
                <motion.div key={name} className="intro-member" variants={deckFade}>
                  <p className="intro-member__name">{name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.p className="intro-footnote" variants={deckFade}>
            Four scenarios for organic discoverability when AI mediates search
          </motion.p>
        </motion.div>
      </div>
    </SlideShell>
  );
}

export function PurposeSlide({ index, total }: P) {
  const decisions = [
    { q: "Budget", d: "SEO vs SEM vs AI visibility / GEO" },
    { q: "Team", d: "Retrain SEO teams or hire citation specialists?" },
    { q: "KPIs", d: "Sessions vs influence inside AI answers" },
    { q: "Content", d: "Volume production vs authority & entities" },
  ];
  return (
    <SlideShell index={index} total={total}>
      <SlideBody>
        <SlideHeader eyebrow="Phase 1 · Preparation" title="Purpose & decision focus" subtitle="Chermack — scenarios must inform real organizational choices" />
        <SlideMain className="slide-cols-2">
          <Card>
            <CardTitle color="teal">Audience</CardTitle>
            <List items={["Brand managers & content strategists", "SEO & marketing agencies", "Publishers facing referral decline", "B2B marketers defending organic budgets"]} />
          </Card>
          <Card accentColor="var(--blue)">
            <CardTitle color="blue">Four decisions by 2035</CardTitle>
            <div className="decision-list">
              {decisions.map((item, i) => (
                <div key={item.q} className="decision-item">
                  <p className="decision-item__q">{i + 1}. {item.q}</p>
                  <p className="decision-item__d">{item.d}</p>
                </div>
              ))}
            </div>
          </Card>
        </SlideMain>
        <Callout>Not a forecast — a preparation tool. Horizon: 2035.</Callout>
      </SlideBody>
    </SlideShell>
  );
}

export function MethodologySlide({ index, total }: P) {
  return (
    <SlideShell index={index} total={total}>
      <SlideBody>
        <SlideHeader eyebrow="Methodology" title="Chermack's three-phase cycle" subtitle="Performance-based scenario planning · Givens separated from Drivers" />
        <SlideMain><MethodologyPhases /></SlideMain>
        <Callout>Wack (1985): separate consequences in the pipeline from genuinely uncertain forces that become matrix axes.</Callout>
      </SlideBody>
    </SlideShell>
  );
}

export function SystemSlide({ index, total }: P) {
  const layers = [
    { h: "General environment", b: "GenAI · copyright · Gartner forecasts · data-centre energy · platform competition" },
    { h: "Specific environment (DE / EU)", b: "SISTRIX & SparkToro · DMA · EU AI Act · uneven industry impact" },
    { h: "Value chain", chain: true },
    { h: "Core strategic issue", b: "Organic discoverability when AI mediates users and information", core: true },
  ];
  return (
    <SlideShell index={index} total={total}>
      <SlideBody>
        <SlideHeader eyebrow="System picture" title="Discovery ecosystem" subtitle="Figure 1 · Chermack nested layers" />
        <SlideMain className="system-layers">
          {layers.map((l, i) => (
            <Card key={l.h} accentColor={l.core ? "var(--teal)" : undefined} className={`system-layer${l.core ? " bg-teal-pale" : ""}`} style={{ marginLeft: i * 12, width: `calc(100% - ${i * 24}px)` }}>
              <div className="system-layer__row">
                <span className="system-layer__dot" style={{ background: l.core ? "var(--teal)" : "var(--gold)" }} />
                <div>
                  <p className="system-layer__title" style={{ color: l.core ? "var(--teal)" : "var(--text)" }}>{l.h}</p>
                  {l.b && <p className="system-layer__body">{l.b}</p>}
                </div>
              </div>
              {l.chain && <ValueChainFlow />}
            </Card>
          ))}
        </SlideMain>
      </SlideBody>
    </SlideShell>
  );
}

export function SteepSlide({ index, total }: P) {
  const pillars = [
    { l: "S", n: "Social", f: "59.7% EU zero-click; AI-first vs hybrid behaviour", k: "driver" as const, c: "var(--rose)" },
    { l: "T", n: "Technology", f: "AIO ~20% DE queries; CTR #1 drops 27→11%", k: "driver" as const, c: "var(--teal)" },
    { l: "E", n: "Economic", f: "374/1k reach open web; 265M lost clicks/mo DE", k: "driver" as const, c: "var(--amber)" },
    { l: "En", n: "Environmental", f: "AI search compute may cap rollout pace", k: "driver" as const, c: "var(--green)" },
    { l: "P", n: "Political", f: "EU DMA + 11% unsupported AI claims", k: "driver" as const, c: "var(--violet)" },
  ];
  return (
    <SlideShell index={index} total={total}>
      <SlideBody>
        <SlideHeader eyebrow="Phase 2 · Exploration" title="STEEP external analysis" subtitle="11 factors · importance + uncertainty assessed" />
        <SlideMain className="slide-cols-5">
          {pillars.map((p) => <SteepPillar key={p.l} letter={p.l} name={p.n} fact={p.f} kind={p.k} color={p.c} />)}
        </SlideMain>
        <Callout>Key Givens: zero-click baseline · AIO deployed · 2B+ users · 374/1k open-web clicks</Callout>
      </SlideBody>
    </SlideShell>
  );
}

export function GivensSlide({ index, total }: P) {
  const drivers = [
    "S2 · AI-first vs hybrid",
    "T2 · CTR compression",
    "T3 · Gartner −25%",
    "E2 · Publisher attrition",
    "P1/P2 · DMA & AI rules",
    "En1 · Energy ceiling",
  ];
  return (
    <SlideShell index={index} total={total}>
      <SlideBody className="givens-slide-body">
        <SlideHeader eyebrow="Classification" title="Givens vs Drivers" subtitle="Table 1 · axes built from the most critical Drivers" />
        <SlideMain className="slide-cols-2 givens-grid">
          <Card accentColor="var(--green)">
            <CardTitle color="green">Givens — every scenario starts here</CardTitle>
            <GivensChart />
          </Card>
          <Card accentColor="var(--blue)" className="drivers-card">
            <CardTitle color="blue">Drivers — feed the 2×2 matrix</CardTitle>
            <div className="drivers-card__body">
              <div className="drivers-axes-row">
                <AxisSpectrum tone="teal" label="Axis 1 · Discovery" left="AI-native" right="Hybrid" />
                <AxisSpectrum tone="gold" label="Axis 2 · Value" left="Funnels" right="Zero-click" />
              </div>
              <DriversMatrixHint />
              <div className="drivers-card__tags">
                <p className="driver-tags__heading">Critical drivers</p>
                <DriverTags grid items={drivers} />
              </div>
            </div>
          </Card>
        </SlideMain>
      </SlideBody>
    </SlideShell>
  );
}

export function DataSlide({ index, total }: P) {
  return (
    <SlideShell index={index} total={total}>
      <SlideBody>
        <SlideHeader eyebrow="Key data" title="Measured pressure on organic search" subtitle="SparkToro · SISTRIX · Gartner · arXiv" />
        <div className="slide-cols-4">
          <Stat value="59.7%" label="Zero-click EU" sub="SparkToro 2024" color="rose" />
          <Stat value="27→11%" label="CTR on #1" sub="when AIO present" color="amber" />
          <Stat value="−25%" label="Search volume" sub="Gartner by 2026" color="blue" />
          <AnimatedStat numeric={265} suffix="M" label="Lost clicks/mo" sub="Germany · SISTRIX" color="teal" />
        </div>
        <SlideMain className="slide-cols-2">
          <Card>
            <CardTitle color="teal">Open web vs zero-click</CardTitle>
            <OpenWebSplit />
          </Card>
          <Card className="data-aio-card">
            <CardTitle color="gold">AI Overview reach</CardTitle>
            <p className="stat-value text-teal data-aio-card__num">2B+</p>
            <p className="text-muted">users globally</p>
            <p className="text-faint data-aio-card__note">~20% of DE queries show AIO · ~30% long-tail informational</p>
          </Card>
        </SlideMain>
      </SlideBody>
    </SlideShell>
  );
}

export function InterviewSlide({
  index, total, name, role, quote, insights, initials, tagline, animateInsight,
}: P & { name: string; role: string; quote: string; insights: string[]; initials: string; tagline: string; animateInsight?: number }) {
  return (
    <SlideShell index={index} total={total}>
      <SlideBody className="interview-slide-body">
        <SlideHeader eyebrow="Stakeholder interview · Özlem" title={name} subtitle={role} />
        <SlideMain className="slide-cols-2 interview-grid">
          <div className="interview-col">
            <Card accentColor="var(--gold)" className="interview-quote-card">
              <p className="interview-quote-mark">&ldquo;</p>
              <p className="interview-quote-text"><TypewriterText text={quote} speed={14} as="span" /></p>
            </Card>
            <Card className="interview-insights-card">
              <CardTitle color="teal">Key insights</CardTitle>
              <ul className="slide-list interview-list">
                {insights.map((item, i) => (
                  <li key={item}>
                    <span className="slide-list__num">{i + 1}</span>
                    <span>{animateInsight === i ? <TypewriterText text={item} speed={18} as="span" showCursor={false} /> : item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <Card className="interview-profile">
            <div className="interview-avatar">{initials}</div>
            <p className="interview-name">{name}</p>
            <p className="interview-role">{role}</p>
            <p className="interview-tag-label">Shaped axis logic</p>
            <p className="interview-tagline">{tagline}</p>
          </Card>
        </SlideMain>
      </SlideBody>
    </SlideShell>
  );
}

export function MatrixSlide({ index, total }: P) {
  return (
    <SlideShell index={index} total={total}>
      <SlideBody className="matrix-slide-body">
        <SlideHeader eyebrow="Phase 3 · Development" title="2×2 scenario matrix" subtitle="Two critical uncertainties → four plausible futures by 2035" />
        <SlideMain><ScenarioMatrix /></SlideMain>
      </SlideBody>
    </SlideShell>
  );
}

export function ScenarioSlide({
  index, total, num, name, drivers, story, warnings, accent, visual,
}: P & { num: string; name: string; drivers: string; story: string[]; warnings: string[]; accent: string; visual: "citation" | "lastclick" | "gatekeeper" | "slow" }) {
  return (
    <SlideShell index={index} total={total}>
      <SlideBody>
        <SlideHeader eyebrow={`Scenario ${num}`} title={name} subtitle={drivers} />
        <SlideMain className="slide-cols-2 scenario-grid">
          <Card accentColor={accent}>
            <CardTitle color="teal">By 2035…</CardTitle>
            <List numbered items={story} />
          </Card>
          <div className="scenario-side">
            <Card>
              <CardTitle color="gold">Early-warning signals</CardTitle>
              <div className="tag-wrap">{warnings.map((w) => <Tag key={w}>{w}</Tag>)}</div>
            </Card>
            <Card className="scenario-visual-card"><ScenarioVisual type={visual} /></Card>
          </div>
        </SlideMain>
      </SlideBody>
    </SlideShell>
  );
}

export function ReflectionSlide({ index, total }: P) {
  const cards = [
    { t: "Most plausible", h: "Slow Adaptation", b: "Hybrid behaviour persists · org inertia slows KPI redesign.", c: "text-amber" },
    { t: "Most concerning", h: "Gatekeeper Web", b: "Few platforms control discovery while boards still track website sessions.", c: "text-rose" },
    { t: "What we'd do", h: "Build for all four", b: "Measurement judgment · expert content · citation experiments early.", c: "text-blue" },
  ];
  const strategies = [
    { s: "Citation Economy", a: "Proprietary data · entity schema · citation share as KPI" },
    { s: "Last-Click Web", a: "High-intent SEO · hybrid attribution · conversion depth" },
    { s: "Gatekeeper Web", a: "Diversify channels · licensing · brand moats" },
    { s: "Slow Adaptation", a: "Kill generic content · parallel GEO experiments · new KPIs early" },
  ];
  return (
    <SlideShell index={index} total={total}>
      <SlideBody className="reflection-slide-body">
        <SlideHeader eyebrow="Critical reflection" title="Which future — and what would we do?" />
        <SlideMain>
          <div className="slide-cols-3">
            {cards.map((c) => (
              <Card key={c.t}>
                <p className="reflection-label">{c.t}</p>
                <p className={`reflection-heading ${c.c}`}>{c.h}</p>
                <p className="reflection-body">{c.b}</p>
              </Card>
            ))}
          </div>
          <div className="strategy-grid">
            {strategies.map((item) => (
              <div key={item.s} className="strategy-item">
                <p className="strategy-item__scenario">{item.s}</p>
                <p className="strategy-item__action">{item.a}</p>
              </div>
            ))}
          </div>
        </SlideMain>
      </SlideBody>
    </SlideShell>
  );
}

export function ThankYouSlide({ index, total }: P) {
  return (
    <SlideShell index={index} total={total} center>
      <div style={{ textAlign: "center" }}>
        <Eyebrow>Horizon 2035</Eyebrow>
        <DisplayTitle>Thank you</DisplayTitle>
        <Subtitle>Prof. Dr. Peter Weber · Questions welcome</Subtitle>
        <div className="thank-tags">
          {["Chermack", "SparkToro", "SISTRIX", "Gartner", "Aydin", "Contreras"].map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
        <p className="text-faint thank-note">Team 14</p>
      </div>
    </SlideShell>
  );
}

export const TOTAL_SLIDES = 19;

export function getSlideComponent(slideIndex: number, total: number) {
  const p = { index: slideIndex, total };
  switch (slideIndex) {
    case 1: return <TitleSlide {...p} />;
    case 2: return <HookSlide {...p} />;
    case 3: return <PurposeSlide {...p} />;
    case 4: return <MethodologySlide {...p} />;
    case 5: return <SystemSlide {...p} />;
    case 6: return <SteepSlide {...p} />;
    case 7: return <GivensSlide {...p} />;
    case 8: return <DataSlide {...p} />;
    case 9:
      return (
        <InterviewSlide {...p} name="Funda Aydin" role="Marketing · GEA Digital · 17 Jun 2026"
          quote="Companies need to optimize for being cited, selected, and trusted by AI systems — not just for being clicked in search results."
          insights={["ChatGPT is her #1 work tool — shift from Google over ~2 years", "Checks sources for technical, legal & financial queries", "B2B still needs deep technical content — consumption moves to AI", "Fear: few AI platforms become gatekeepers of visibility"]}
          initials="FA" tagline="Axis 1 up · Axis 2 right — AI-first + citations" animateInsight={0} />
      );
    case 10:
      return (
        <InterviewSlide {...p} name="Lorena Contreras" role="Community manager · SEO background · 18 Jun 2026"
          quote="Users may get the information without clicking on the company website — even if the content helped to create the answer."
          insights={["Google first for known-intent; ChatGPT for writing & structuring", "Attribution paradox: your content builds the AI answer, no visit", "Expert cases & data survive; generic keyword blogs lose value", "Would invest in original insights — not mass-produced articles"]}
          initials="LC" tagline="Axis 1 down · hybrid + website value tension" animateInsight={0} />
      );
    case 11: return <SectionHero {...p} num="02" title="The four scenarios" subtitle="2×2 matrix · narratives from 2035 · early warnings" />;
    case 12: return <MatrixSlide {...p} />;
    case 13:
      return (
        <ScenarioSlide {...p} num="01" name="The Citation Economy" drivers="AI-native discovery + zero-click influence"
          story={["AI assistants become default for substantive B2B research", "Citation share replaces sessions as the primary visibility KPI", "Winners publish specs, cases & structured entity data AI cites", "Niche publishers license content; thin SEO filler disappears"]}
          warnings={["AI before Google in buyer surveys", "GEO / AEO job postings", "EU open-web clicks < 30%", "Publisher licensing deals"]}
          accent="var(--teal)" visual="citation" />
      );
    case 14:
      return (
        <ScenarioSlide {...p} num="02" name="The Last-Click Web" drivers="Hybrid discovery + website-centric funnels"
          story={["AI captures informational queries; commercial intent still clicks", "Buyers synthesize in AI, verify & convert on brand-owned sites", "SEO invests in expert cases, schema & credibility architecture", "Hybrid measurement: sessions + surveys + citation monitoring"]}
          warnings={["AIO stays informational", "CRM pipeline from organic holds", "Structured data spend > volume", "Commercial CTR within 20% of baseline"]}
          accent="var(--green)" visual="lastclick" />
      );
    case 15:
      return (
        <ScenarioSlide {...p} num="03" name="The Gatekeeper Web" drivers="AI-native discovery + funnels still expected"
          story={["3–4 platforms control most professional information retrieval", "Firms invest in landing pages; users never arrive", "Large brands buy priority citations; mid-market sees dark influence", "Boards see flat traffic while commercial presence erodes invisibly"]}
          warnings={["2–3 platforms > 60% B2B research", "Paid AI visibility products launch", "Publisher referrals −50%+", "Mentions absent from analytics"]}
          accent="var(--rose)" visual="gatekeeper" />
      );
    case 16:
      return (
        <ScenarioSlide {...p} num="04" name="The Slow Adaptation" drivers="Hybrid discovery + gradual zero-click shift"
          story={["Industry knows the old playbook is broken — no replacement agreed", "Organic sessions decline gradually, not catastrophically", "Content volume grows while conversion value approaches zero", "Early experimenters with hybrid measurement escape the trap"]}
          warnings={["Flat SEO budgets vs rising AI usage", "Content up, pipeline down", "SEO community fragmented on metrics", "Funda + Lorena behaviours coexist"]}
          accent="var(--amber)" visual="slow" />
      );
    case 17: return <SectionHero {...p} num="03" title="Critical reflection" subtitle="Plausibility · concerns · strategic responses" />;
    case 18: return <ReflectionSlide {...p} />;
    case 19: return <ThankYouSlide {...p} />;
    default: return null;
  }
}
