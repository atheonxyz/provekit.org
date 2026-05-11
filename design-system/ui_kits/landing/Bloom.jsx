// Bloom.jsx — reusable bloom composition: pastel blurred discs + crisp shape
const { useMemo } = React;

function Bloom({ shape = "hexagon", palette = "cyan", size = 360 }) {
  const palettes = {
    cyan:    { discs: ["#A2D0FC", "#FFE5C6", "#FFDEE7"], hub: "rgba(0,190,255,0.9)", core: "#0D74FF" },
    orange:  { discs: ["#FDCC91", "#FFE5C6", "#FFDEE7"], hub: "#FFB02E", core: "#E91900" },
    pink:    { discs: ["#FF9AA0", "#FFDEE7", "#FFE5C6"], hub: "#FF4F7B", core: "#DE00FF" },
    coral:   { discs: ["#F9C7C0", "#FFDEE7", "#FFE5C6"], hub: "#FF7F7F", core: "#FFC57F" },
  };
  const p = palettes[palette] || palettes.cyan;
  const shapeFile = `../../assets/shape-${shape}.svg`;

  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Blurred ellipse blooms */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: "-12%", top: "8%", width: "70%", height: "82%", borderRadius: "50%", background: p.discs[0], filter: "blur(40px)", opacity: 0.85 }}></div>
        <div style={{ position: "absolute", right: "-10%", bottom: "0", width: "55%", height: "75%", borderRadius: "50%", background: p.discs[1], filter: "blur(45px)", opacity: 0.85 }}></div>
        <div style={{ position: "absolute", left: "30%", top: "-10%", width: "45%", height: "55%", borderRadius: "50%", background: p.discs[2], filter: "blur(50px)", opacity: 0.7 }}></div>
      </div>
      {/* Hub disc */}
      <div style={{ position: "relative", width: "84%", height: "84%", borderRadius: "50%", background: p.hub, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", width: "30%", height: "30%", borderRadius: "50%", background: p.core }}></div>
        <img src={shapeFile} alt="" loading="lazy" decoding="async" style={{ position: "relative", width: "55%", height: "55%", filter: "drop-shadow(0 0 0 transparent)" }} />
      </div>
    </div>
  );
}

window.Bloom = Bloom;
