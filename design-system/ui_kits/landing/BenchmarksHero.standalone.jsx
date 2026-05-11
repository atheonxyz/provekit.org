// BenchmarksHero.standalone.jsx — points to Provekit Landing.html

function BenchmarksHero() {
  return (
    <Panel tab="BENCHMARKS" tabBrand={true}
           contentStyle={{ padding: "72px 48px", display: "flex", flexDirection: "column", gap: 48 }}>
        <div style={{ display: "flex", gap: 48, alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 0" }}>
            <div style={{ font: "400 18px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--pk-mute-2)", marginBottom: 24 }}>
              v0.4.2 · April 2026
            </div>
            <h1 style={{ margin: 0, font: "500 64px/72px var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)", whiteSpace: "pre-line" }}>{"Provekit, measured\nagainst the field"}</h1>
            <p style={{ margin: "16px 0 0", maxWidth: 720, font: "400 22px/1.4 var(--pk-font-sans)", color: "var(--pk-mute-2)" }}>
              A reproducible look at how Provekit performs against TOOLKIT 1 and TOOLKIT 2 across proving time, memory, and verification cost — measured on commodity client hardware, with the dataset and methodology published in full below.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
            <a href="Provekit Landing.html" className="pk-btn pk-btn--secondary" style={{ height: 52, padding: "8px 16px", textDecoration: "none" }}>
              ← BACK
            </a>
            <button className="pk-btn pk-btn--primary" style={{ height: 52, padding: "8px 16px", minWidth: 200 }}>
              RAW RESULTS <span style={{ font: "400 22px/1 var(--pk-font-mono)", letterSpacing: "0.02em" }}>{"{ }"}</span>
            </button>
          </div>
        </div>
      </Panel>
  );
}

window.BenchmarksHero = BenchmarksHero;
