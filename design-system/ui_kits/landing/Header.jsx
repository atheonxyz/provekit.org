// Header.jsx — fixed top nav

function ArrowRight({ color = "#fff" }) {
  const path = "M5 12h14M13 6l6 6-6 6";
  return (
    <span className="pk-arrow" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square">
        <path d={path}/>
      </svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square">
        <path d={path}/>
      </svg>
    </span>
  );
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D2D2B" strokeWidth="2" strokeLinecap="square">
      <path d="M3 6h18M3 12h18M3 18h18"/>
    </svg>
  );
}

function Header() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      width: "100%", height: 76,
      background: "#fff", borderBottom: "1px solid var(--pk-line)",
      display: "flex", justifyContent: "center",
    }}>
      <div style={{ width: 1600, maxWidth: "100%", height: "100%", padding: "0 0", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "1px solid var(--pk-line)", borderRight: "1px solid var(--pk-line)" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "0 24px", height: 48, marginLeft: 16 }}>
          <a href="index.html" style={{ display: "block", lineHeight: 0 }}>
            <img src="../../assets/wordmark-black.svg" alt="Provekit" loading="eager" decoding="async" style={{ height: 24, display: "block" }} />
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginRight: 16 }}>
          <button className="pk-btn pk-btn--primary" style={{ height: 52, paddingLeft: 16, paddingRight: 16 }}>
            DOCS <ArrowRight />
          </button>
          <button style={{ width: 56, height: 52, background: "#fff", border: "1px solid var(--pk-line)", borderLeft: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <HamburgerIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
window.ArrowRight = ArrowRight;
