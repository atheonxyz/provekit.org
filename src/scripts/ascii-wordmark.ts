/**
 * Footer giant-wordmark ASCII shader.
 * Loads /figma/wordmark-large.svg, samples brightness into a grid,
 * renders the grid as ASCII glyphs onto a <canvas>. On hover, runs a
 * wave-shader animation. On mouse-leave, fades back to the static SVG.
 *
 * Direct port of design-system/ui_kits/landing/Footer.jsx#AsciiWordmark.
 */

interface Grid {
  cols: number;
  rows: number;
  cells: Float32Array;
}

const RAMP = " .'`,:;-~+<>i!*=?xowzs#%@";
const CELL_W = 9;
const CELL_H = 16;
const COLS = 180;
const CHAR_ASPECT = 0.55;

function loadGrid(src: string): Promise<Grid | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const rows = Math.max(8, Math.round((COLS * (img.height / img.width)) / CHAR_ASPECT));
      const c = document.createElement('canvas');
      c.width = COLS;
      c.height = rows;
      const ctx = c.getContext('2d');
      if (!ctx) return resolve(null);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, COLS, rows);
      ctx.drawImage(img, 0, 0, COLS, rows);
      let data: Uint8ClampedArray;
      try {
        data = ctx.getImageData(0, 0, COLS, rows).data;
      } catch {
        return resolve(null);
      }
      const cells = new Float32Array(COLS * rows);
      for (let i = 0; i < cells.length; i++) {
        const r = data[i * 4] ?? 0;
        const g = data[i * 4 + 1] ?? 0;
        const b = data[i * 4 + 2] ?? 0;
        const a = (data[i * 4 + 3] ?? 0) / 255;
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        cells[i] = (1 - brightness) * a;
      }
      resolve({ cols: COLS, rows, cells });
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function attach(host: HTMLElement) {
  const svgEl = host.querySelector<HTMLImageElement>('[data-ascii-svg]');
  const canvasEl = host.querySelector<HTMLCanvasElement>('[data-ascii-canvas]');
  if (!svgEl || !canvasEl) return;
  // Locals retain narrowed type inside nested functions.
  const svg = svgEl;
  const canvas = canvasEl;

  let grid: Grid | null = null;
  let raf: number | null = null;
  let hover = false;
  const start = performance.now();

  void loadGrid('/figma/wordmark-large.svg').then((g) => {
    grid = g;
    canvas.width = (g?.cols ?? 0) * CELL_W;
    canvas.height = (g?.rows ?? 0) * CELL_H;
    draw();
  });

  function draw() {
    if (!grid) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const t = hover ? (performance.now() - start) / 1000 : 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `600 ${CELL_H - 4}px ui-monospace, "JetBrains Mono", monospace`;
    ctx.textBaseline = 'top';
    for (let y = 0; y < grid.rows; y++) {
      for (let x = 0; x < grid.cols; x++) {
        const d = grid.cells[y * grid.cols + x] ?? 0;
        if (d < 0.012) continue;
        const dBoost = Math.pow(d, 0.32);
        let mod = 1;
        if (hover) {
          const wave = 0.55 + 0.45 * Math.sin(t * 2.0 + x * 0.11 + y * 0.22);
          const noise = 0.15 * Math.sin(x * 13.7 + y * 9.3 + t * 6.0);
          mod = Math.max(0, Math.min(1.4, wave + noise));
        }
        const idx = Math.min(
          RAMP.length - 1,
          Math.max(0, Math.floor(dBoost * (RAMP.length - 1) * mod)),
        );
        if (idx === 0) continue;
        ctx.fillStyle = '#0D74FF';
        ctx.fillText(RAMP[idx] ?? '', x * CELL_W, y * CELL_H);
      }
    }
    if (hover) raf = requestAnimationFrame(draw);
  }

  function start_() {
    hover = true;
    svg.style.opacity = '0';
    canvas.style.opacity = '1';
    if (raf == null) draw();
  }
  function stop_() {
    hover = false;
    svg.style.opacity = '1';
    canvas.style.opacity = '0';
    if (raf != null) cancelAnimationFrame(raf);
    raf = null;
  }
  host.addEventListener('mouseenter', start_);
  host.addEventListener('mouseleave', stop_);
  host.addEventListener('focusin', start_);
  host.addEventListener('focusout', stop_);
}

if (typeof document !== 'undefined') {
  function init() {
    const hosts = document.querySelectorAll<HTMLElement>('[data-ascii-wordmark]');
    hosts.forEach(attach);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}

export {};
