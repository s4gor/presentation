/** Aurora + neural mesh background — pure CSS/SVG, no WebGL */
export function Background() {
  return (
    <div className="ambient-bg" aria-hidden>
      <div className="ambient-bg__base" />

      <div className="ambient-bg__aurora ambient-bg__aurora--1" />
      <div className="ambient-bg__aurora ambient-bg__aurora--2" />
      <div className="ambient-bg__aurora ambient-bg__aurora--3" />

      <svg className="ambient-bg__neural" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g className="ambient-bg__neural-lines" fill="none" strokeWidth="1">
          <line x1="120" y1="180" x2="340" y2="320" />
          <line x1="340" y1="320" x2="580" y2="240" />
          <line x1="580" y1="240" x2="820" y2="380" />
          <line x1="820" y1="380" x2="1100" y2="280" />
          <line x1="1100" y1="280" x2="1320" y2="420" />
          <line x1="200" y1="520" x2="480" y2="620" />
          <line x1="480" y1="620" x2="720" y2="540" />
          <line x1="720" y1="540" x2="960" y2="680" />
          <line x1="960" y1="680" x2="1240" y2="600" />
          <line x1="340" y1="320" x2="480" y2="620" />
          <line x1="580" y1="240" x2="720" y2="540" />
          <line x1="820" y1="380" x2="960" y2="680" />
          <line x1="280" y1="740" x2="620" y2="800" />
          <line x1="900" y1="120" x2="1100" y2="280" />
        </g>
        <g className="ambient-bg__neural-nodes">
          <circle cx="120" cy="180" r="4" />
          <circle cx="340" cy="320" r="5" />
          <circle cx="580" cy="240" r="4" />
          <circle cx="820" cy="380" r="6" />
          <circle cx="1100" cy="280" r="4" />
          <circle cx="1320" cy="420" r="5" />
          <circle cx="200" cy="520" r="4" />
          <circle cx="480" cy="620" r="5" />
          <circle cx="720" cy="540" r="6" />
          <circle cx="960" cy="680" r="4" />
          <circle cx="1240" cy="600" r="5" />
          <circle cx="280" cy="740" r="3" />
          <circle cx="620" cy="800" r="4" />
          <circle cx="900" cy="120" r="5" />
        </g>
      </svg>

      <div className="ambient-bg__bokeh">
        {[
          { w: 280, t: "8%", l: "5%", c: "teal", d: "0s", dur: "22s" },
          { w: 220, t: "62%", l: "78%", c: "violet", d: "-4s", dur: "26s" },
          { w: 180, t: "72%", l: "12%", c: "rose", d: "-8s", dur: "20s" },
          { w: 160, t: "18%", l: "68%", c: "gold", d: "-2s", dur: "24s" },
          { w: 120, t: "42%", l: "44%", c: "teal", d: "-6s", dur: "18s" },
          { w: 100, t: "85%", l: "52%", c: "violet", d: "-10s", dur: "21s" },
        ].map((b, i) => (
          <span
            key={i}
            className={`ambient-bg__orb ambient-bg__orb--${b.c}`}
            style={{
              width: b.w,
              height: b.w,
              top: b.t,
              left: b.l,
              animationDelay: b.d,
              animationDuration: b.dur,
            }}
          />
        ))}
      </div>

      <div className="ambient-bg__shimmer" />
      <div className="ambient-bg__grain" />
      <div className="ambient-bg__vignette" />
    </div>
  );
}
