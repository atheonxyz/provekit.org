// BenchmarkSection.jsx — BENCHMARKS split panel with switchable charts

const METRICS = [
  {
    key: "proving",
    title: "Proving time",
    body: "Provekit generates proofs ~36% faster than comparable client-side toolkits on commodity hardware.",
    chart: "line",
    unit: "s",
    xLabels: ["2¹⁰", "2¹⁴", "2¹⁸", "2²²"],
    xAxisLabel: "CIRCUIT SIZE",
    series: [
      { label: "TOOLKIT 1", color: "#DE00FF", values: [0.6, 2.4, 9.5, 38.4] },
      { label: "TOOLKIT 2", color: "#E91900", values: [0.4, 1.5, 6.0, 24.0] },
      { label: "PROVEKIT",  color: "#0D74FF", values: [0.18, 0.7, 2.8, 11.2] },
    ],
    yMax: 40,
    kpis: [{ value: "+36% Faster" }, { value: "11.2s @ 2²²" }],
  },
  {
    key: "memory",
    title: "Memory footprint",
    body: "A streamlined Rust core keeps the resident set ~24% lighter than the next nearest toolkit.",
    chart: "bars",
    unit: " MB",
    series: [
      { label: "TOOLKIT 1", color: "#DE00FF", value: 92 },
      { label: "TOOLKIT 2", color: "#E91900", value: 64 },
      { label: "PROVEKIT",  color: "#0D74FF", value: 38 },
    ],
    max: 100,
    kpis: [{ value: "+24% Lighter" }, { value: "38 MB peak" }],
  },
  {
    key: "verify",
    title: "Verification cost",
    body: "Verifier circuits compile to a fraction of the gate count, keeping verification cheap on chain and off.",
    chart: "columns",
    unit: "k",
    xLabels: ["Setup", "Compile", "Verify", "Settle"],
    xAxisLabel: "STAGE",
    series: [
      { label: "TOOLKIT 1", color: "#DE00FF", values: [42, 38, 90, 120] },
      { label: "TOOLKIT 2", color: "#E91900", values: [28, 24, 64, 80] },
      { label: "PROVEKIT",  color: "#0D74FF", values: [18, 14, 32, 42] },
    ],
    yMax: 120,
    kpis: [{ value: "−68% Gates" }, { value: "32k verify" }],
  },
];

function BenchItem({ num, active, title, body, onClick }) {
  const [hover, setHover] = React.useState(false);
  const tinted = active || hover;
  return (
    <div onClick={onClick}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 8,
                  padding: "4px 0 4px 16px",
                  borderLeft: active
                    ? "3px solid var(--pk-brand)"
                    : hover ? "3px solid var(--pk-ink)" : "3px solid transparent",
                  marginLeft: -19,
                  transition: "border-color 0.18s ease, color 0.18s ease",
                  userSelect: "none" }}>
      <div style={{ font: "500 28px/1 var(--pk-font-sans)", color: tinted ? "var(--pk-brand)" : "var(--pk-ink)", transition: "color 0.18s ease" }}>{num}.</div>
      <h3 style={{ margin: 0, font: "500 28px/1 var(--pk-font-sans)", letterSpacing: "-0.02em",
                   color: tinted ? "var(--pk-brand)" : "var(--pk-ink)", transition: "color 0.18s ease" }}>{title}</h3>
      <p style={{ margin: 0, font: "300 22px/1.4 var(--pk-font-sans)", color: "var(--pk-mute-2,#808080)" }}>{body}</p>
    </div>
  );
}

// ── Charts ────────────────────────────────────────────────────────────────

const CHART_W = 640, CHART_H = 320;
const PAD_L = 56, PAD_R = 24, PAD_T = 24, PAD_B = 48;
const INNER_W = CHART_W - PAD_L - PAD_R;
const INNER_H = CHART_H - PAD_T - PAD_B;

function fmt(v, unit) {
  const n = v >= 10 ? Math.round(v) : Math.round(v * 10) / 10;
  return `${n}${unit}`;
}

function LineChart({ metric }) {
  const xs = metric.xLabels;
  const xAt = i => PAD_L + (INNER_W * i) / (xs.length - 1);
  const yAt = v => PAD_T + INNER_H * (1 - v / metric.yMax);
  const [hover, setHover] = React.useState(null);
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => t * metric.yMax);

  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CHART_W;
    if (x < PAD_L - 8 || x > CHART_W - PAD_R + 8) { setHover(null); return; }
    const t = ((x - PAD_L) / INNER_W) * (xs.length - 1);
    setHover(Math.max(0, Math.min(xs.length - 1, Math.round(t))));
  };

  const tooltip = (() => {
    if (hover == null) return null;
    const items = metric.series.map(s => ({ ...s, v: s.values[hover] })).sort((a, b) => b.v - a.v);
    const tw = 168, th = 30 + items.length * 18 + 10;
    let tx = xAt(hover) + 14;
    if (tx + tw > CHART_W - PAD_R) tx = xAt(hover) - tw - 14;
    const ty = PAD_T + 8;
    return { items, tw, th, tx, ty };
  })();

  // keep last rendered tooltip so it can fade out (and stay positioned) after hover ends
  const [renderedTip, setRenderedTip] = React.useState(null);
  React.useEffect(() => { if (tooltip) setRenderedTip(tooltip); }, [tooltip && tooltip.tx, tooltip && tooltip.ty, hover]);
  const lastGuideX = React.useRef(PAD_L);
  if (hover != null) lastGuideX.current = xAt(hover);

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} style={{ width: "100%", height: "auto", display: "block" }}
         onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      {/* gridlines + y ticks */}
      {yTicks.map(v => (
        <g key={v}>
          <line x1={PAD_L} x2={CHART_W - PAD_R} y1={yAt(v)} y2={yAt(v)} stroke="var(--pk-line)" strokeDasharray="3 4"/>
          <text x={PAD_L - 10} y={yAt(v) + 4} fontSize="12" fill="#808080" textAnchor="end" fontFamily="var(--pk-font-mono)" letterSpacing="0.04em">{fmt(v, metric.unit)}</text>
        </g>
      ))}
      {/* baseline axis */}
      <line x1={PAD_L} x2={CHART_W - PAD_R} y1={CHART_H - PAD_B} y2={CHART_H - PAD_B} stroke="var(--pk-ink)" strokeWidth="1"/>
      {/* x labels */}
      {xs.map((l, i) => (
        <text key={i} x={xAt(i)} y={CHART_H - PAD_B + 22} fontSize="12" fill="#808080" textAnchor="middle" fontFamily="var(--pk-font-mono)" letterSpacing="0.04em">{l}</text>
      ))}
      {metric.xAxisLabel && (
        <text x={PAD_L + INNER_W / 2} y={CHART_H - 6} fontSize="10" fill="#808080" textAnchor="middle" fontFamily="var(--pk-font-mono)" letterSpacing="0.08em">{metric.xAxisLabel}</text>
      )}
      {/* hover guide */}
      <line x1={0} x2={0} y1={PAD_T} y2={CHART_H - PAD_B} stroke="var(--pk-ink)" strokeDasharray="2 4"
            style={{ transform: `translateX(${lastGuideX.current}px)`, transition: "transform 0.28s cubic-bezier(.2,.8,.2,1), opacity 0.2s ease",
                     opacity: hover != null ? 0.5 : 0 }}/>
      {/* series lines */}
      {metric.series.map(s => {
        const d = s.values.map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`).join(" ");
        return <path key={s.label} d={d} fill="none" stroke={s.color} strokeWidth={s.label === "PROVEKIT" ? 3 : 2} strokeLinejoin="round" strokeLinecap="round"/>;
      })}
      {/* dots — always for endpoints, full row on hover */}
      {metric.series.map(s => s.values.map((v, i) => (
        <circle key={s.label + i} cx={xAt(i)} cy={yAt(v)} r={hover === i ? 6 : 3.5}
                fill={hover === i ? "#fff" : s.color} stroke={s.color}
                strokeWidth="2"
                style={{ transition: "r 0.22s ease" }}/>
      )))}
      {/* tooltip */}
      {renderedTip && (
        <g style={{ transform: `translate(${renderedTip.tx}px, ${renderedTip.ty}px)`,
                    transition: "transform 0.28s cubic-bezier(.2,.8,.2,1), opacity 0.2s ease",
                    opacity: tooltip ? 1 : 0, pointerEvents: "none" }}>
          <style>{`@keyframes pk-tip-flip { 0% { transform: translateY(-8px); opacity: 0 } 60% { opacity: 1 } 100% { transform: translateY(0); opacity: 1 } }`}</style>
          <rect x={0} y={0} width={renderedTip.tw} height={renderedTip.th} fill="#fff" stroke="var(--pk-ink)" strokeWidth="1"/>
          <text x={12} y={20} fontSize="11" fill="#808080" fontFamily="var(--pk-font-mono)" letterSpacing="0.06em">{xs[hover ?? 0]}</text>
          {renderedTip.items.map((s, i) => (
            <g key={s.label}>
              <rect x={12} y={32 + i * 18} width={9} height={9} fill={s.color}/>
              <text x={28} y={40 + i * 18} fontSize="11" fill="#2D2D2B" fontFamily="var(--pk-font-mono)" letterSpacing="0.04em">{s.label}</text>
              <g key={`${s.label}-${s.v}`} style={{ animation: "pk-tip-flip 0.28s cubic-bezier(.2,.8,.2,1)" }}>
                <text x={renderedTip.tw - 12} y={40 + i * 18} fontSize="11" fill="#2D2D2B" textAnchor="end" fontFamily="var(--pk-font-mono)" letterSpacing="0.04em">{fmt(s.v, metric.unit)}</text>
              </g>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

function ColumnChart({ metric }) {
  const xs = metric.xLabels;
  const yAt = v => PAD_T + INNER_H * (1 - v / metric.yMax);
  const [hover, setHover] = React.useState(null);
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => t * metric.yMax);
  const groupW = INNER_W / xs.length;
  const inner = groupW * 0.72;
  const series = metric.series;
  const barW = (inner - (series.length - 1) * 4) / series.length;

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} style={{ width: "100%", height: "auto", display: "block" }}
         onMouseLeave={() => setHover(null)}>
      <defs>
        <pattern id="pk-col-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--pk-ink)" strokeWidth="1" strokeOpacity="0.12"/>
        </pattern>
      </defs>
      {yTicks.map(v => (
        <g key={v}>
          <line x1={PAD_L} x2={CHART_W - PAD_R} y1={yAt(v)} y2={yAt(v)} stroke="var(--pk-line)" strokeDasharray="3 4"/>
          <text x={PAD_L - 10} y={yAt(v) + 4} fontSize="12" fill="#808080" textAnchor="end" fontFamily="var(--pk-font-mono)" letterSpacing="0.04em">{Math.round(v)}{metric.unit}</text>
        </g>
      ))}
      <line x1={PAD_L} x2={CHART_W - PAD_R} y1={CHART_H - PAD_B} y2={CHART_H - PAD_B} stroke="var(--pk-ink)" strokeWidth="1"/>
      {xs.map((l, i) => {
        const gLeft = PAD_L + groupW * i;
        const innerLeft = gLeft + (groupW - inner) / 2;
        return (
          <g key={i}>
            <rect x={gLeft} y={PAD_T} width={groupW} height={INNER_H}
                  fill="url(#pk-col-hatch)"
                  style={{ cursor: "pointer", opacity: hover === i ? 1 : 0, transition: "opacity 0.28s ease" }}
                  onMouseEnter={() => setHover(i)}/>
            {/* invisible hover hit area so transition doesn't block hovering */}
            <rect x={gLeft} y={PAD_T} width={groupW} height={INNER_H}
                  fill="transparent"
                  onMouseEnter={() => setHover(i)} style={{ cursor: "pointer" }}/>
            {series.map((s, j) => {
              const x = innerLeft + j * (barW + 4);
              const y = yAt(s.values[i]);
              return (
                <g key={s.label} style={{ pointerEvents: "none" }}>
                  <rect x={x} y={y} width={barW} height={CHART_H - PAD_B - y} fill={s.color}/>
                  {/* knockout label: white halo paint-order keeps text legible on full-opacity bars */}
                  <text x={x + barW / 2} y={y - 6} fontSize="11" fill="#2D2D2B" textAnchor="middle"
                        fontFamily="var(--pk-font-mono)" letterSpacing="0.04em"
                        stroke="#fff" strokeWidth="3" paintOrder="stroke"
                        style={{ opacity: hover === i ? 1 : 0, transition: "opacity 0.22s ease" }}>{s.values[i]}</text>
                </g>
              );
            })}
            <text x={gLeft + groupW / 2} y={CHART_H - PAD_B + 22} fontSize="12"
                  fill={hover === i ? "var(--pk-ink)" : "#808080"} textAnchor="middle"
                  fontFamily="var(--pk-font-mono)" letterSpacing="0.06em"
                  style={{ pointerEvents: "none", textTransform: "uppercase", transition: "fill 0.28s ease" }}>{l}</text>
          </g>
        );
      })}
      {metric.xAxisLabel && (
        <text x={PAD_L + INNER_W / 2} y={CHART_H - 6} fontSize="10" fill="#808080" textAnchor="middle" fontFamily="var(--pk-font-mono)" letterSpacing="0.08em">{metric.xAxisLabel}</text>
      )}
    </svg>
  );
}

function HorizontalBars({ metric }) {
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 36 }}>
        {metric.series.map((s, i) => {
          const w = (s.value / metric.max) * 100;
          const dim = hover != null && hover !== i;
          return (
            <div key={s.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                 style={{ display: "flex", alignItems: "center", gap: 12, opacity: dim ? 0.35 : 1, transition: "opacity 0.18s ease", cursor: "pointer" }}>
              <div style={{ position: "relative", height: 48, width: `${w}%`, background: s.color, transition: "width 0.5s cubic-bezier(.2,.8,.2,1)" }}>
                <span style={{ position: "absolute", right: 12, top: 16, color: "#fff", font: "500 16px/1 var(--pk-font-mono)", letterSpacing: "0.04em", opacity: hover === i ? 1 : 0, transition: "opacity 0.22s ease" }}>{s.value}{metric.unit}</span>
              </div>
              <span style={{ font: "400 18px/1 var(--pk-font-mono)", letterSpacing: "0.02em", color: hover === i ? "var(--pk-ink)" : "#808080", transition: "color 0.22s ease" }}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartFor({ metric }) {
  if (metric.chart === "line") return <LineChart metric={metric} />;
  if (metric.chart === "columns") return <ColumnChart metric={metric} />;
  return <HorizontalBars metric={metric} />;
}

function Legend({ metric }) {
  const series = metric.chart === "bars"
    ? metric.series
    : metric.series;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
      {series.map(s => (
        <div key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", border: "1px solid var(--pk-line)", font: "400 18px/1 var(--pk-font-mono)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
          <span style={{ width: 12, height: 12, background: s.color, display: "inline-block" }}></span>{s.label}
        </div>
      ))}
    </div>
  );
}

function BenchmarkSection() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const metric = METRICS[activeIdx];

  return (
    <section style={{ width: 1600, maxWidth: "100%", display: "flex" }}>
      {/* LEFT */}
      <div style={{ flex: "1 1 0", background: "#fff", border: "1px solid var(--pk-line)", display: "flex", flexDirection: "column" }}>
        <div className="pk-tab" style={{ display: "inline-flex", width: "fit-content", borderRight: "1px solid var(--pk-line)", borderBottom: "1px solid var(--pk-line)", borderTop: 0, borderLeft: 0 }}>BENCHMARKS</div>
        <div style={{ padding: "108px 48px", display: "flex", flexDirection: "column", gap: 36 }}>
          <h2 style={{ margin: 0, font: "500 64px/72px var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)", whiteSpace: "pre-line" }}>{"A client-side ZK toolkit\nthat excels in every aspect"}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {METRICS.map((m, i) => (
              <React.Fragment key={m.key}>
                <BenchItem num={i + 1} active={i === activeIdx}
                           title={m.title} body={m.body}
                           onClick={() => setActiveIdx(i)} />
                {i < METRICS.length - 1 && <div style={{ borderTop: "2px solid var(--pk-line)" }}></div>}
              </React.Fragment>
            ))}
          </div>
          <div>
            <a href="benchmarks.html" className="pk-btn pk-btn--primary" style={{ height: 52, padding: "8px 16px", minWidth: 266, textDecoration: "none" }}>
              ALL BENCHMARKS <ArrowRight />
            </a>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div style={{ flex: "1 1 0", background: "#fff", border: "1px solid var(--pk-line)", borderLeft: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ padding: "72px 48px", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Chart-type chip — small, tells the user this view is a Line / Bars / Columns */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <span style={{ font: "400 14px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "#808080" }}>
              {metric.title} · {metric.chart === "line" ? "Line" : metric.chart === "columns" ? "Columns" : "Bars"}
            </span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
            {metric.chart === "bars" && (
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i + 1) * 10}%`, borderLeft: "1px dashed var(--pk-line)" }}></div>
                ))}
              </div>
            )}
            <Legend metric={metric} />
            <div>
              <ChartFor metric={metric} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {metric.kpis.map((k, i) => (
            <div key={i} style={{ flex: 1, padding: "48px 24px", textAlign: "center",
                                  borderTop: "1px solid var(--pk-line)",
                                  borderRight: i < metric.kpis.length - 1 ? "1px solid var(--pk-line)" : 0,
                                  font: "300 48px/1 var(--pk-font-sans)", letterSpacing: "-0.02em" }}>{k.value}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  BenchmarkSection,
  BENCH_METRICS: METRICS,
  LineChart, ColumnChart, HorizontalBars, Legend, ChartFor, BenchItem,
});
