// PartnersSection.standalone.jsx — uses window.__resources

function PartnerLogo({ src, alt, height = 36, offsetY = 0 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", height: 48, padding: "0 16px" }}>
      <img src={src} alt={alt} style={{ height, width: "auto", display: "block", transform: offsetY ? `translateY(${offsetY}px)` : undefined }} />
    </div>
  );
}

function Divider() {
  return <div style={{ width: 0, height: 40, borderLeft: "2px solid var(--pk-line-soft)" }}></div>;
}

function PartnersSection() {
  return (
    <Panel tab="BUILT FOR PERFORMANCE AND PRIVACY"
           contentStyle={{ padding: "72px 48px", display: "flex", justifyContent: "flex-start", alignItems: "stretch", gap: 48, position: "relative" }}
           extras={
             <img src={window.__resources["partners-graphic"]} alt=""
                  style={{ position: "absolute", inset: 0, width: "100%",
                           height: "100%", objectFit: "cover", objectPosition: "right center", display: "block",
                           transform: "translateX(60px)",
                           pointerEvents: "none" }} />
           }>
      <div style={{ display: "flex", flexDirection: "column", gap: 48, position: "relative", zIndex: 1, maxWidth: 880 }}>
        <h2 style={{ margin: 0, font: "500 72px/80px var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)", whiteSpace: "pre-line" }}>{"Engineered by some of\nthe best technical brains"}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <PartnerLogo src={window.__resources["world-logo"]} alt="World" height={32} offsetY={4} />
          <Divider />
          <PartnerLogo src={window.__resources["atheon-logo"]} alt="Atheon" height={36} />
          <Divider />
          <PartnerLogo src={window.__resources["reilabs-logo"]} alt="Reilabs" height={36} />
        </div>
        <div>
          <button className="pk-btn pk-btn--primary" style={{ height: 52, padding: "8px 16px", minWidth: 237 }}>
            VISIT GITHUB <ArrowRight />
          </button>
        </div>
      </div>
    </Panel>
  );
}

window.PartnersSection = PartnersSection;
