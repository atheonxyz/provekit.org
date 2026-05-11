// BenchmarkDetail.jsx — full-bleed detail panel for a single metric

const DETAIL_EXTRAS = {
  proving: {
    extraKpis: [
      { label: "Median",  value: "2.8s" },
      { label: "p95",     value: "4.1s" },
      { label: "p99",     value: "6.3s" },
      { label: "Speedup", value: "+36%" },
    ],
    notes: [
      "Measured on Groth16 reference circuit, 2¹⁸ constraints",
      "All toolkits compiled with Rust 1.79 · release · LTO fat",
      "Single-threaded; multi-thread variants linked in raw results",
    ],
  },
  memory: {
    extraKpis: [
      { label: "Peak RSS", value: "38 MB" },
      { label: "Steady",   value: "31 MB" },
      { label: "Page-ins", value: "0" },
      { label: "vs next",  value: "−24%" },
    ],
    notes: [
      "Peak resident set sampled at 50 ms during proving",
      "Heap profile captured with macOS leaks(1) and dtrace",
      "Provekit reuses witness arenas across batched proofs",
    ],
  },
  verify: {
    extraKpis: [
      { label: "Verify gates", value: "32k" },
      { label: "On-chain",     value: "210k gas" },
      { label: "Proof bytes",  value: "192 B" },
      { label: "vs Toolkit 1", value: "−68%" },
    ],
    notes: [
      "Gate counts measured at the verifier circuit only",
      "On-chain costs reflect a Groth16 verifier on EVM Cancun",
      "Proof bytes constant across circuit families",
    ],
  },
};

function DetailKpiCell({ label, value, accent }) {
  return (
    <div style={{ flex: "1 1 0", padding: "36px 24px", borderRight: "1px solid var(--pk-line)", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ font: "400 13px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--pk-mute-2)" }}>{label}</div>
      <div style={{ font: "300 44px/1 var(--pk-font-sans)", letterSpacing: "-0.02em", color: accent ? "var(--pk-brand)" : "var(--pk-ink)" }}>{value}</div>
    </div>
  );
}

function BenchmarkDetail({ index }) {
  const metric = window.BENCH_METRICS[index];
  const extra = DETAIL_EXTRAS[metric.key];
  const num = String(index + 1).padStart(2, "0");

  return (
    <Panel tab={`${num} · ${metric.title.toUpperCase()}`}
           contentStyle={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "56px 48px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 48 }}>
        <div style={{ flex: "1 1 0" }}>
          <h2 style={{ margin: 0, font: "500 56px/64px var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)" }}>{metric.title}</h2>
          <p style={{ margin: "16px 0 0", maxWidth: 720, font: "300 20px/1.4 var(--pk-font-sans)", color: "var(--pk-mute-2)" }}>{metric.body}</p>
        </div>
        <div style={{
          padding: "16px 24px", border: "1px solid var(--pk-brand)",
          font: "300 44px/1 var(--pk-font-sans)", letterSpacing: "-0.02em",
          color: "var(--pk-brand)", whiteSpace: "nowrap",
        }}>
          {metric.kpis[0].value}
        </div>
      </div>

      {/* Chart row */}
      <div style={{ padding: "48px 48px 56px", display: "grid", gridTemplateColumns: "260px 1fr", gap: 48, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ font: "400 13px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--pk-mute-2)" }}>
            Test setup
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            {extra.notes.map((n, i) => (
              <li key={i} style={{ font: "300 16px/1.45 var(--pk-font-sans)", color: "var(--pk-mute-2)", paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, background: "var(--pk-brand)" }}></span>
                {n}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ font: "400 13px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--pk-mute-2)" }}>Series</div>
            {metric.series.map(s => (
              <div key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "400 14px/1 var(--pk-font-mono)", letterSpacing: "0.04em" }}>
                <span style={{ width: 12, height: 12, background: s.color }}></span>{s.label}
              </div>
            ))}
          </div>
        </div>
        <div>
          <window.ChartFor metric={metric} />
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: "flex", borderTop: "1px solid var(--pk-line)" }}>
        {extra.extraKpis.map((k, i) => (
          <DetailKpiCell key={i} label={k.label} value={k.value} accent={i === extra.extraKpis.length - 1} />
        ))}
      </div>
    </Panel>
  );
}

window.BenchmarkDetail = BenchmarkDetail;
