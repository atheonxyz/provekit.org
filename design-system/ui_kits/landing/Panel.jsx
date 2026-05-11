// Panel.jsx — shared white panel with a top-left category tab

function Panel({ tab, tabBrand = false, children, extras, style = {}, contentStyle = {} }) {
  return (
    <section style={{
      position: "relative", width: 1600, maxWidth: "100%",
      background: "#fff", border: "1px solid var(--pk-line)",
      overflow: "hidden",
      ...style,
    }}>
      {tab && (
        <div style={{
          position: "relative", zIndex: 2,
          display: "inline-flex", alignItems: "center",
          height: 47, padding: "12px 24px", boxSizing: "border-box",
          background: tabBrand ? "var(--pk-brand)" : "#fff",
          color: tabBrand ? "#fff" : "var(--pk-ink)",
          borderRight: "1px solid var(--pk-line)",
          borderBottom: "1px solid var(--pk-line)",
          font: "400 24px/1 var(--pk-font-mono)",
          letterSpacing: "0.02em", textTransform: "uppercase",
          width: "fit-content",
        }}>
          {tab}
        </div>
      )}
      <div style={contentStyle}>{children}</div>
      {extras}
    </section>
  );
}

function Strip() {
  return <div style={{ height: 80, width: 1600, maxWidth: "100%", borderLeft: "1px solid var(--pk-line)", borderRight: "1px solid var(--pk-line)", boxSizing: "border-box" }}></div>;
}

window.Panel = Panel;
window.Strip = Strip;
