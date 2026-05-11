// Hero.jsx — INTRODUCING PROVEKIT panel (standalone)

function Hero() {
  return (
    <>
      <div style={{
        position: "relative", width: 1600, maxWidth: "100%", height: 600,
        overflow: "hidden", background: "#fff",
        borderLeft: "1px solid var(--pk-line)", borderRight: "1px solid var(--pk-line)",
      }}>
        <img src={window.__resources.heroBg} alt="" loading="eager" decoding="async"
             style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: `url(${window.__resources.grainTexture}) center/cover`, opacity: 0.18, mixBlendMode: "overlay", pointerEvents: "none" }}></div>
      </div>

      <Panel tab="INTRODUCING PROVEKIT" tabBrand={true}
             contentStyle={{ padding: "72px 48px", display: "flex", flexDirection: "column", gap: 48 }}>
        <div>
          <h1 style={{
            margin: 0,
            font: "500 72px/80px var(--pk-font-sans)",
            letterSpacing: "-0.02em", color: "var(--pk-ink)",
            whiteSpace: "pre-line",
          }}>{"Client-side zero-knowledge,\nbuilt for the real world"}</h1>
          <p style={{ margin: "16px 0 0", maxWidth: 655, font: "300 24px/32px var(--pk-font-sans)", color: "var(--pk-mute)" }}>
            Provekit is a lightweight, modular ZK toolkit designed from the ground up for client-side execution.
          </p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <button className="pk-btn pk-btn--secondary" style={{ height: 52, padding: "8px 16px", minWidth: 208 }}>
            VISIT REPO <span style={{ font: "400 22px/1 var(--pk-font-mono)", letterSpacing: "0.02em" }}>{"{ }"}</span>
          </button>
          <button className="pk-btn pk-btn--primary" style={{ height: 52, padding: "8px 16px", minWidth: 237 }}>
            EXPLORE DOCS <ArrowRight />
          </button>
        </div>
      </Panel>
    </>
  );
}

window.Hero = Hero;
