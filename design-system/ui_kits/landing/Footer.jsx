// Footer.jsx — chip nav + giant wordmark

function Chip({ children, href }) {
  const [hover, setHover] = React.useState(false);
  const baseStyle = {
    display: "inline-flex", alignItems: "center", padding: "8px 16px",
    border: "1px solid var(--pk-line)",
    background: hover ? "var(--pk-brand)" : "transparent",
    font: "400 18px/1 var(--pk-font-mono)", letterSpacing: "0.02em", textTransform: "uppercase",
    color: hover ? "#fff" : "var(--pk-ink)",
    borderColor: hover ? "var(--pk-brand)" : "var(--pk-line)",
    cursor: "pointer", textDecoration: "none",
    transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease",
  };
  if (href) {
    return (
      <a href={href}
         onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         style={baseStyle}>{children}</a>
    );
  }
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={baseStyle}>{children}</span>
  );
}

function AsciiWordmark() {
  const [hover, setHover] = React.useState(false);
  const [grid, setGrid] = React.useState(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const cols = 180;
      const charAspect = 0.55; // monospace char w/h
      const rows = Math.max(8, Math.round(cols * (img.height / img.width) / charAspect));
      const c = document.createElement("canvas");
      c.width = cols; c.height = rows;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, cols, rows);
      ctx.drawImage(img, 0, 0, cols, rows);
      let data;
      try { data = ctx.getImageData(0, 0, cols, rows).data; } catch (e) { return; }
      const cells = new Float32Array(cols * rows);
      for (let i = 0; i < cells.length; i++) {
        const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3] / 255;
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        cells[i] = (1 - brightness) * a;
      }
      setGrid({ cols, rows, cells });
    };
    img.src = "../../assets/wordmark-large.svg";
  }, []);

  React.useEffect(() => {
    if (!grid || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const cellW = 9, cellH = 16;
    canvas.width = grid.cols * cellW;
    canvas.height = grid.rows * cellH;
    const ctx = canvas.getContext("2d");
    const ramp = " .'`,:;-~+<>i!*=?xowzs#%@";

    let raf;
    const start = performance.now();
    const draw = () => {
      const t = hover ? (performance.now() - start) / 1000 : 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `600 ${cellH - 4}px ui-monospace, "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      for (let y = 0; y < grid.rows; y++) {
        for (let x = 0; x < grid.cols; x++) {
          const d = grid.cells[y * grid.cols + x];
          if (d < 0.012) continue;
          // exponential boost — push mid-density values toward heavier glyphs
          const dBoost = Math.pow(d, 0.32);
          let mod = 1;
          if (hover) {
            // shader-style wave + cheap noise
            const wave = 0.55 + 0.45 * Math.sin(t * 2.0 + x * 0.11 + y * 0.22);
            const noise = 0.15 * Math.sin(x * 13.7 + y * 9.3 + t * 6.0);
            mod = Math.max(0, Math.min(1.4, wave + noise));
          }
          const idx = Math.min(ramp.length - 1, Math.max(0, Math.floor(dBoost * (ramp.length - 1) * mod)));
          if (idx === 0) continue;
          ctx.fillStyle = "#0D74FF";
          ctx.fillText(ramp[idx], x * cellW, y * cellH);
        }
      }
      if (hover) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [grid, hover]);

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         style={{ width: "100%", marginTop: 24, marginBottom: -32, position: "relative", cursor: "pointer", overflow: "hidden" }}>
      <img src="../../assets/wordmark-large-blue.svg" alt="Provekit" loading="lazy" decoding="async"
           style={{ width: "100%", display: "block", opacity: hover ? 0 : 1, transition: "opacity 0.25s ease" }} />
      <canvas ref={canvasRef} aria-hidden="true"
              style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", opacity: hover ? 1 : 0, transition: "opacity 0.25s ease", pointerEvents: "none", display: "block" }} />
    </div>
  );
}

function Footer() {
  const onBench = typeof window !== "undefined" && /benchmarks\.html$/i.test(window.location.pathname);
  return (
    <footer style={{ width: 1600, maxWidth: "100%", padding: "48px 24px 24px", display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden", borderLeft: "1px solid var(--pk-line)", borderRight: "1px solid var(--pk-line)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <Chip>DOCS</Chip>
          <Chip>GUIDE</Chip>
          <Chip href={onBench ? "index.html" : "benchmarks.html"}>{onBench ? "HOME" : "BENCHMARKS"}</Chip>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Chip>TELEGRAM</Chip>
          <Chip>TWITTER</Chip>
          <Chip>GITHUB</Chip>
        </div>
      </div>
      <AsciiWordmark />
    </footer>
  );
}

window.Footer = Footer;
