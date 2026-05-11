// FeatureCards.standalone.jsx — uses window.__resources

function FeatureCard({ num, title, body, image, borderColor }) {
  const bc = borderColor;
  return (
    <div style={{ flex: "1 1 0", maxWidth: 465, height: 722, border: `2px solid ${bc}`, background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#fff" }}>
        <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ display: "flex", alignItems: "stretch", borderTop: `2px solid ${bc}` }}>
        <div style={{ width: 69, height: 69, display: "flex", alignItems: "center", justifyContent: "center", borderRight: `1px solid ${bc}`, font: "400 24px/1 var(--pk-font-mono)", letterSpacing: "0.02em" }}>{num}</div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 24px", font: "400 24px/1 var(--pk-font-mono)", letterSpacing: "0.02em", textTransform: "uppercase" }}>{title}</div>
      </div>
      <div style={{ height: 220, padding: "48px", borderTop: `2px solid ${bc}`, font: "300 22px/1.4 var(--pk-font-sans)", color: "#808080", boxSizing: "border-box", display: "flex", alignItems: "center" }}>{body}</div>
    </div>
  );
}

function FeatureCards() {
  return (
    <Panel tab="CORE FEATURES"
           contentStyle={{ padding: "48px", display: "flex", gap: 24, justifyContent: "space-between" }}>
      <FeatureCard num="1" title="Modularity" borderColor="#BCEEFF"
        image={window.__resources["feature-modularity"]}
        body="Cleanly separates proving, verification, and compilation into independent components, making it easy to customize and extend." />
      <FeatureCard num="2" title="Mobile friendly" borderColor="#FFE5C6"
        image={window.__resources["feature-mobile"]}
        body="Designed for client-side proving, generates zero-knowledge proofs directly on a user's device without relying on heavy server infrastructure." />
      <FeatureCard num="3" title="Light weight" borderColor="#FFDEE7"
        image={window.__resources["feature-lightweight"]}
        body="Built in Rust with optimized field arithmetic, Provekit keeps resource usage minimal so it runs efficiently even on constrained hardware." />
    </Panel>
  );
}

window.FeatureCards = FeatureCards;
