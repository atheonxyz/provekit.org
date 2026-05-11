// FaqSection.jsx — standalone

const { useState: useFaqState } = React;

function FaqRow({ q, a, defaultOpen }) {
  const [open, setOpen] = useFaqState(!!defaultOpen);
  return (
    <div>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <h3 style={{ margin: 0, font: "500 28px/1 var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink-alt)" }}>{q}</h3>
        <span style={{ font: "400 24px/1 var(--pk-font-mono)", color: "var(--pk-ink-alt)" }}>{open ? "−" : "→"}</span>
      </div>
      {open && a && <p style={{ margin: "16px 0 0", font: "300 22px/1.4 var(--pk-font-sans)", color: "#808080" }}>{a}</p>}
    </div>
  );
}

function FaqSection() {
  return (
    <section style={{ width: 1600, maxWidth: "100%", background: "#fff", border: "1px solid var(--pk-line)" }}>
      <div className="pk-tab" style={{ display: "inline-flex", width: "fit-content", borderRight: "1px solid var(--pk-line)", borderBottom: "1px solid var(--pk-line)", borderTop: 0, borderLeft: 0 }}>FREQUENTLY ASKED QUESTIONS</div>
      <div style={{ padding: "72px 48px", display: "flex", justifyContent: "flex-end", position: "relative", overflow: "hidden" }}>
        <img src={window.__resources["faq-bloom"]} alt=""
             style={{ position: "absolute", left: -340, top: -260, width: 1280, height: 1280, objectFit: "contain", pointerEvents: "none" }} />
        <div style={{ width: 880, display: "flex", flexDirection: "column", gap: 48, position: "relative", zIndex: 1 }}>
          <h2 style={{ margin: 0, font: "500 72px/72px var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)", whiteSpace: "pre-line" }}>{"Comprehensive list of\nanswers to all your questions"}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <FaqRow defaultOpen q="What exactly is Provekit?" a="Provekit is a lightweight assertion and verification library for JavaScript and TypeScript. It lets you write expressive, readable checks for both runtime validation and unit tests without pulling in a full testing framework." />
            <div style={{ borderTop: "1px solid var(--pk-line)" }}></div>
            <FaqRow q="Does it work in the browser?" />
            <div style={{ borderTop: "1px solid var(--pk-line)" }}></div>
            <FaqRow q="Is TypeScript supported?" />
            <div style={{ borderTop: "1px solid var(--pk-line)" }}></div>
            <FaqRow q="Can I use it for runtime validation in production?" />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px", borderTop: "1px solid var(--pk-line)" }}>
        <div style={{ font: "500 40px/1 var(--pk-font-sans)", letterSpacing: "-0.02em", color: "var(--pk-ink)" }}>Need more information or help?</div>
        <button className="pk-btn pk-btn--primary" style={{ height: 52, padding: "8px 16px", minWidth: 208 }}>
          CONTACT US <ArrowRight />
        </button>
      </div>
    </section>
  );
}

window.FaqSection = FaqSection;
