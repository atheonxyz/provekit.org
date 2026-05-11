// InstallSection.jsx — INSTALL SCRIPT panel with a code block

function CopyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#949494" strokeWidth="2" strokeLinecap="square">
      <rect x="9" y="9" width="11" height="11"/>
      <path d="M5 15V5a1 1 0 0 1 1-1h10"/>
    </svg>
  );
}

function InstallSection() {
  return (
    <Panel tab="INSTALL SCRIPT"
           contentStyle={{ display: "flex", padding: "0", alignItems: "stretch" }}>
      <div style={{ flex: "1 1 0", padding: "72px 48px", display: "flex", flexDirection: "column", gap: 48 }}>
        <div>
          <h2 style={{ margin: 0, font: "500 72px/80px var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)", whiteSpace: "pre-line" }}>{"To install Provekit\nrun this simple install script"}</h2>
          <p style={{ margin: "16px 0 0", maxWidth: 655, font: "300 24px/32px var(--pk-font-sans)", color: "var(--pk-mute)" }}>
            Discover Provekit. Check out the comprehensive guide for a seamless introduction and installation.
          </p>
        </div>
        <div>
          <button className="pk-btn pk-btn--primary" style={{ height: 52, padding: "8px 16px", minWidth: 208 }}>
            READ GUIDE <ArrowRight />
          </button>
        </div>
      </div>
      <div style={{ width: 600, padding: "72px 48px 72px 0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Background bloom */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "20%", top: "30%", width: 220, height: 220, borderRadius: "50%", background: "#FDCC91", filter: "blur(60px)", opacity: 0.6 }}></div>
          <div style={{ position: "absolute", left: "50%", top: "10%", width: 180, height: 180, borderRadius: "50%", background: "#FF9AA0", filter: "blur(60px)", opacity: 0.45 }}></div>
        </div>
        <div style={{ position: "relative", width: "100%", maxWidth: 540, border: "2px solid var(--pk-line)", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", borderBottom: "2px solid var(--pk-line)" }}>
            <div style={{ padding: "16px 24px", font: "400 24px/1 var(--pk-font-mono)", letterSpacing: "0.02em", color: "var(--pk-mute)", textTransform: "uppercase" }}>BASH</div>
            <button style={{ width: 64, height: 64, background: "#fff", border: 0, borderLeft: "1px solid var(--pk-line)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><CopyIcon /></button>
          </div>
          <div style={{ padding: "30px 30px", font: "400 24px/1 var(--pk-font-mono)", letterSpacing: "0.02em", color: "var(--pk-ink)" }}>cargo install provekit-cli</div>
        </div>
      </div>
    </Panel>
  );
}

window.InstallSection = InstallSection;
