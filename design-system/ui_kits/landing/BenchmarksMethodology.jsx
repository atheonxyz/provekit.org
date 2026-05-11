// BenchmarksMethodology.jsx — test setup metadata panel

function MethodCell({ label, value, sub }) {
  return (
    <div style={{ flex: "1 1 0", padding: "32px 24px", borderRight: "1px solid var(--pk-line)", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ font: "400 14px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--pk-mute-2)" }}>{label}</div>
      <div style={{ font: "500 32px/1.1 var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)" }}>{value}</div>
      {sub && <div style={{ font: "300 16px/1.4 var(--pk-font-sans)", color: "var(--pk-mute-2)" }}>{sub}</div>}
    </div>
  );
}

function BenchmarksMethodology() {
  return (
    <Panel tab="METHODOLOGY"
           contentStyle={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "48px 48px 0" }}>
        <h2 style={{ margin: 0, font: "500 48px/56px var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)" }}>How these numbers were captured</h2>
        <p style={{ margin: "16px 0 0", maxWidth: 880, font: "300 20px/1.4 var(--pk-font-sans)", color: "var(--pk-mute-2)" }}>
          Each toolkit ran the same Groth16 reference circuit against a fixed set of input batches. We report the median of 50 runs after a 10-run warmup; raw timing data and the harness are linked from the repo.
        </p>
      </div>
      <div style={{ display: "flex", marginTop: 48, borderTop: "1px solid var(--pk-line)" }}>
        <MethodCell label="Hardware" value="MacBook Pro" sub="M2 Pro · 16 GB · macOS 14.4" />
        <MethodCell label="Toolchain" value="rustc 1.79" sub="release · LTO fat · codegen 1" />
        <MethodCell label="Dataset" value="ZK-bench v3" sub="2¹⁰ – 2²² constraints" />
        <MethodCell label="Runs" value="50" sub="median reported · 10-run warmup" />
        <div style={{ flex: "1 1 0", padding: "32px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ font: "400 14px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--pk-mute-2)" }}>Reproducible</div>
          <div style={{ font: "500 32px/1.1 var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)" }}>SHA 4f1c…ae2</div>
          <div style={{ font: "300 16px/1.4 var(--pk-font-sans)", color: "var(--pk-mute-2)" }}>harness pinned at HEAD</div>
        </div>
      </div>
    </Panel>
  );
}

window.BenchmarksMethodology = BenchmarksMethodology;
