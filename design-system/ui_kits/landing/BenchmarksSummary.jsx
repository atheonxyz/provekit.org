// BenchmarksSummary.jsx — interactive comparison table panel

const SUMMARY_ROWS = [
  { label: "Proving time @ 2¹⁸",  unit: "s",       values: [9.5, 6.0, 2.8],  better: "low" },
  { label: "Memory peak",         unit: " MB",     values: [92, 64, 38],     better: "low" },
  { label: "Verifier gates",      unit: "k",       values: [90, 64, 32],     better: "low" },
  { label: "Proof bytes",         unit: " B",      values: [256, 224, 192],  better: "low" },
  { label: "Verify (EVM)",        unit: "k gas",   values: [620, 420, 210],  better: "low" },
  { label: "Throughput",          unit: " p/s",    values: [0.10, 0.16, 0.36], better: "high" },
];

const TOOLKITS = [
  { label: "TOOLKIT 1", color: "#DE00FF" },
  { label: "TOOLKIT 2", color: "#E91900" },
  { label: "PROVEKIT",  color: "#0D74FF" },
];

function fmtN(v, unit) {
  const n = v >= 10 ? Math.round(v) : Math.round(v * 100) / 100;
  return `${n}${unit}`;
}

function isWinner(values, idx, better) {
  const v = values[idx];
  if (better === "low")  return values.every(x => v <= x) && values.some(x => v < x);
  if (better === "high") return values.every(x => v >= x) && values.some(x => v > x);
  return false;
}

// Magnitude of the bar in a cell — for "lower is better" we invert so smaller numbers get longer bars
function barFraction(values, idx, better) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const v = values[idx];
  if (better === "low") {
    // map smallest → 1.0, largest → 0.25 (so the worst still gets a short bar, never zero)
    if (max === min) return 1;
    return 0.25 + 0.75 * (max - v) / (max - min);
  }
  // higher is better — direct
  if (max === min) return 1;
  return 0.25 + 0.75 * (v - min) / (max - min);
}

function BenchmarksSummary() {
  const [hoverRow, setHoverRow] = React.useState(null);
  const [hoverCol, setHoverCol] = React.useState(null);
  const [sortIdx, setSortIdx] = React.useState(2); // PROVEKIT default

  const rows = React.useMemo(() => {
    if (sortIdx == null) return SUMMARY_ROWS.map((r, i) => ({ ...r, _i: i }));
    return SUMMARY_ROWS.map((r, i) => ({ ...r, _i: i }))
      .slice()
      .sort((a, b) => {
        const fa = barFraction(a.values, sortIdx, a.better);
        const fb = barFraction(b.values, sortIdx, b.better);
        return fb - fa; // strongest result for that toolkit at top
      });
  }, [sortIdx]);

  return (
    <Panel tab="SUMMARY"
           contentStyle={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "56px 48px 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
        <div>
          <h2 style={{ margin: 0, font: "500 48px/56px var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)" }}>Side-by-side</h2>
          <p style={{ margin: "16px 0 0", maxWidth: 760, font: "300 20px/1.4 var(--pk-font-sans)", color: "var(--pk-mute-2)" }}>
            Hover a row to compare across toolkits; click a toolkit header to sort by its strongest results. Best value per row reads in brand blue.
          </p>
        </div>
        {sortIdx != null && (
          <div style={{ font: "400 13px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--pk-mute-2)", display: "flex", alignItems: "center", gap: 8 }}>
            Sorted by
            <span style={{ width: 10, height: 10, background: TOOLKITS[sortIdx].color, display: "inline-block" }}></span>
            <span style={{ color: "var(--pk-ink)" }}>{TOOLKITS[sortIdx].label}</span>
            <button onClick={() => setSortIdx(null)}
                    style={{ marginLeft: 8, padding: "4px 8px", border: "1px solid var(--pk-line)", background: "#fff", font: "400 11px/1 var(--pk-font-mono)", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", color: "var(--pk-mute-2)" }}>
              Reset
            </button>
          </div>
        )}
      </div>

      {/* table */}
      <div style={{ borderTop: "1px solid var(--pk-line)" }}>
        {/* header row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, 220px)", borderBottom: "1px solid var(--pk-line)" }}>
          <div style={{ padding: "20px 48px", font: "400 13px/1 var(--pk-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--pk-mute-2)" }}>Metric</div>
          {TOOLKITS.map((t, i) => {
            const isSorted = sortIdx === i;
            const isHover = hoverCol === i;
            return (
              <div key={t.label}
                   onClick={() => setSortIdx(i === sortIdx ? null : i)}
                   onMouseEnter={() => setHoverCol(i)}
                   onMouseLeave={() => setHoverCol(null)}
                   style={{ padding: "20px 24px", borderLeft: "1px solid var(--pk-line)",
                            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                            font: "400 14px/1 var(--pk-font-mono)", letterSpacing: "0.06em", textTransform: "uppercase",
                            color: "var(--pk-ink)", cursor: "pointer", userSelect: "none",
                            background: isSorted ? "rgba(13,116,255,0.06)" : isHover ? "rgba(13,116,255,0.03)" : "transparent",
                            transition: "background 0.18s ease" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 12, height: 12, background: t.color, display: "inline-block" }}></span>{t.label}
                </span>
                <span style={{ font: "400 11px/1 var(--pk-font-mono)", letterSpacing: "0.08em", color: isSorted ? "var(--pk-brand)" : "var(--pk-mute-3, #B7B7B7)" }}>
                  {isSorted ? "▼" : "↕"}
                </span>
              </div>
            );
          })}
        </div>

        {rows.map((row, ri) => (
          <div key={row.label}
               onMouseEnter={() => setHoverRow(row._i)}
               onMouseLeave={() => setHoverRow(null)}
               style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, 220px)",
                        borderBottom: ri < rows.length - 1 ? "1px solid var(--pk-line)" : 0,
                        background: hoverRow === row._i ? "rgba(13,116,255,0.03)" : "transparent",
                        transition: "background 0.18s ease" }}>
            <div style={{ padding: "28px 48px", display: "flex", alignItems: "center", gap: 12,
                          font: "500 22px/1.1 var(--pk-font-sans)", color: "var(--pk-ink)" }}>
              <span style={{ font: "400 11px/1 var(--pk-font-mono)", letterSpacing: "0.08em", color: "var(--pk-mute-3,#B7B7B7)", minWidth: 22 }}>
                {String(row._i + 1).padStart(2, "0")}
              </span>
              {row.label}
              <span style={{ font: "400 11px/1 var(--pk-font-mono)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--pk-mute-3,#B7B7B7)" }}>
                {row.better === "low" ? "↓ better" : "↑ better"}
              </span>
            </div>
            {row.values.map((v, i) => {
              const win = isWinner(row.values, i, row.better);
              const frac = barFraction(row.values, i, row.better);
              const colHover = hoverCol === i || sortIdx === i;
              return (
                <div key={i}
                     onMouseEnter={() => setHoverCol(i)}
                     onMouseLeave={() => setHoverCol(null)}
                     style={{
                       padding: "0", borderLeft: "1px solid var(--pk-line)",
                       position: "relative", height: 88,
                       background: colHover ? "rgba(13,116,255,0.03)" : "transparent",
                       transition: "background 0.18s ease",
                     }}>
                  {/* mini bar, eased on row hover */}
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0,
                    width: `${frac * 100}%`,
                    background: TOOLKITS[i].color,
                    opacity: hoverRow === row._i ? 0.18 : 0.08,
                    transition: "opacity 0.2s ease, width 0.4s cubic-bezier(.2,.8,.2,1)",
                  }}></div>
                  <div style={{
                    position: "relative", padding: "28px 24px",
                    display: "flex", alignItems: "baseline", gap: 8,
                    font: "400 28px/1 var(--pk-font-mono)", letterSpacing: "0.02em",
                    color: win ? "var(--pk-brand)" : "var(--pk-ink)",
                  }}>
                    {fmtN(v, row.unit)}
                    {win && <span style={{ font: "400 11px/1 var(--pk-font-mono)", letterSpacing: "0.08em", color: "var(--pk-brand)", textTransform: "uppercase" }}>best</span>}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Panel>
  );
}

window.BenchmarksSummary = BenchmarksSummary;
