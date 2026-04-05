"use client"

import { useState, useEffect, useRef } from "react"
import Nav from "./components/Nav"
import Btn from "./components/Btn"
import Footer from "./components/Footer"

const ACCENT = "#89FBF6"
const ACCENT_DIM = "rgba(137,251,246,0.15)"
const ACCENT_GLOW = "rgba(137,251,246,0.3)"

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── Section wrapper with fade-in ─── */
function Section({ children, className = "", id, style = {} }) {
  const [ref, visible] = useInView(0.08)
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s cubic-bezier(.23,1,.32,1), transform 0.8s cubic-bezier(.23,1,.32,1)",
      }}
    >
      {children}
    </section>
  )
}

/* ─── FAQ Item ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        borderBottom: "1px solid #222",
        padding: "24px 0",
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "1.05rem", fontWeight: 500, color: "#fff", lineHeight: 1.5, paddingRight: 16 }}>{q}</span>
        <span
          style={{
            color: ACCENT,
            fontSize: "1.5rem",
            fontWeight: 300,
            transition: "transform 0.3s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? 400 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(.23,1,.32,1)",
        }}
      >
        <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.7, marginTop: 16 }}>{a}</p>
      </div>
    </div>
  )
}

/* ─── Strategy Card ─── */
function StrategyCard({ num, title, subtitle, desc, points, color, delay = 0 }) {
  const [ref, visible] = useInView(0.15)
  return (
    <div
      ref={ref}
      style={{
        background: "#111",
        border: "1px solid #1a1a1a",
        borderRadius: 16,
        padding: "36px 32px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ${delay}ms cubic-bezier(.23,1,.32,1), transform 0.7s ${delay}ms cubic-bezier(.23,1,.32,1)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: color }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span
          style={{
            width: 36, height: 36, borderRadius: "50%", background: color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.85rem", fontWeight: 700, color: "#000",
          }}
        >
          {num}
        </span>
        <div>
          <div style={{ fontWeight: 600, color: "#fff", fontSize: "1.05rem" }}>{title}</div>
          <div style={{ color: "#666", fontSize: "0.8rem", marginTop: 2 }}>{subtitle}</div>
        </div>
      </div>
      <p style={{ color: "#aaa", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {points.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color, fontSize: "0.7rem" }}>●</span>
            <span style={{ color: "#ccc", fontSize: "0.85rem" }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Performance metric block ─── */
function MetricBlock({ label, value, sub, delay = 0 }) {
  const [ref, visible] = useInView(0.2)
  return (
    <div
      ref={ref}
      style={{
        background: "#111", border: "1px solid #1a1a1a", borderRadius: 14,
        padding: "28px 24px", textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `all 0.6s ${delay}ms cubic-bezier(.23,1,.32,1)`,
      }}
    >
      <div style={{ color: ACCENT, fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>{value}</div>
      <div style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 500, marginBottom: 4 }}>{label}</div>
      {sub && <div style={{ color: "#666", fontSize: "0.8rem" }}>{sub}</div>}
    </div>
  )
}

/* ─── Bullet with check ─── */
function Bullet({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
      <span style={{
        width: 22, height: 22, borderRadius: "50%", background: ACCENT_DIM,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: 2,
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span style={{ color: "#ccc", fontSize: "0.95rem", lineHeight: 1.6 }}>{children}</span>
    </div>
  )
}

/* ─── Interactive Hero Chart ─── */
const CHART_COLORS = {
  1: { main: "#ff9800", glow: "rgba(255,152,0,0.3)", dim: "rgba(255,152,0,0.12)" },
  2: { main: "#4caf50", glow: "rgba(76,175,80,0.3)", dim: "rgba(76,175,80,0.12)" },
  3: { main: ACCENT, glow: ACCENT_GLOW, dim: ACCENT_DIM },
}

const SP500_LINE = "M20,155 C55,153 90,151 125,149 C160,147 195,144 230,141 C265,138 300,135 335,132 C370,129 405,126 440,123 C460,121 475,120 490,118"

const CHART_PATHS = {
  1: {
    line: "M20,150 C30,145 38,158 50,168 C62,178 70,170 82,158 C94,146 100,164 112,175 C124,172 130,155 142,140 C154,125 160,142 172,155 C184,165 190,145 202,132 C214,120 220,142 232,152 C244,160 250,138 262,122 C274,108 280,125 292,138 C304,148 310,128 322,108 C334,88 340,110 352,125 C364,135 370,108 382,88 C394,68 400,82 412,75 C424,68 432,55 445,50 C458,46 472,55 490,48",
    fill: "M20,150 C30,145 38,158 50,168 C62,178 70,170 82,158 C94,146 100,164 112,175 C124,172 130,155 142,140 C154,125 160,142 172,155 C184,165 190,145 202,132 C214,120 220,142 232,152 C244,160 250,138 262,122 C274,108 280,125 292,138 C304,148 310,128 322,108 C334,88 340,110 352,125 C364,135 370,108 382,88 C394,68 400,82 412,75 C424,68 432,55 445,50 C458,46 472,55 490,48 L490,185 L20,185Z",
    endY: 48,
    pct: "+18.3%",
    label: "Volatiel — verliesperiodes",
    labelColor: "#ff9800",
  },
  2: {
    line: "M20,155 C35,150 50,145 65,138 C80,131 90,136 105,128 C120,120 135,125 150,116 C165,107 175,112 190,103 C205,94 220,88 235,80 C250,72 260,78 275,68 C290,58 305,52 320,44 C335,36 345,42 360,34 C375,26 390,22 405,18 C420,14 440,12 460,10 C475,9 485,8 490,7",
    fill: "M20,155 C35,150 50,145 65,138 C80,131 90,136 105,128 C120,120 135,125 150,116 C165,107 175,112 190,103 C205,94 220,88 235,80 C250,72 260,78 275,68 C290,58 305,52 320,44 C335,36 345,42 360,34 C375,26 390,22 405,18 C420,14 440,12 460,10 C475,9 485,8 490,7 L490,185 L20,185Z",
    endY: 7,
    pct: "+58.2%",
    label: "Stabieler — minder drawdown",
    labelColor: "#4caf50",
  },
  3: {
    line: "M20,158 C38,154 56,149 74,144 C92,139 110,134 128,129 C146,124 164,118 182,112 C200,106 218,99 236,92 C254,85 272,77 290,69 C308,61 326,52 344,43 C362,34 380,25 398,18 C416,12 434,8 452,5 C470,3 480,2 490,2",
    fill: "M20,158 C38,154 56,149 74,144 C92,139 110,134 128,129 C146,124 164,118 182,112 C200,106 218,99 236,92 C254,85 272,77 290,69 C308,61 326,52 344,43 C362,34 380,25 398,18 C416,12 434,8 452,5 C470,3 480,2 490,2 L490,185 L20,185Z",
    endY: 2,
    pct: "+87.4%",
    label: "Consistent — maximale spreiding",
    labelColor: ACCENT,
  },
}

const STRATEGIES = [
  { id: 1, name: "Scalp" },
  { id: 2, name: "Grid" },
  { id: 3, name: "Manueel" },
]

function HeroChart() {
  const [active, setActive] = useState(new Set([1, 2, 3]))
  const [animKey, setAnimKey] = useState(0)

  const toggleStrategy = (id) => {
    setActive(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        if (next.size > 1) next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    setAnimKey(k => k + 1)
  }

  const count = active.size
  const chart = CHART_PATHS[count]
  const colors = CHART_COLORS[count]

  return (
    <div style={{
      width: "100%", maxWidth: 540, background: "linear-gradient(170deg, #0d0d0d 0%, #080808 100%)",
      border: "1px solid #1a1a1a", borderRadius: 24, position: "relative",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(137,251,246,0.04)",
    }}>
      <style>{`
        .chart-toggles { display: flex; gap: 10px; }
        .chart-header-top { flex-direction: row; justify-content: space-between; }
        @media (max-width: 500px) {
          .chart-header-top { flex-direction: column !important; }
        }
      `}</style>

      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${colors.main}, transparent)`, borderRadius: "24px 24px 0 0", transition: "all 0.5s" }} />

      <div style={{ padding: "28px 28px 0" }}>
        <div className="chart-header-top" style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
          <div>
            <span style={{ color: "#555", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Portfolio groei</span>
            <div style={{ color: colors.main, fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.03em", marginTop: 4, transition: "color 0.5s" }}>
              {chart.pct}
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: `${chart.labelColor}12`, borderRadius: 100, padding: "5px 12px",
              transition: "all 0.5s", marginTop: 6,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: chart.labelColor, transition: "background 0.5s" }} />
              <span style={{ color: chart.labelColor, fontSize: "0.66rem", fontWeight: 600, whiteSpace: "nowrap", transition: "color 0.5s" }}>{chart.label}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexShrink: 0 }}>
            <div style={{ width: 16, height: 2, background: "#555", borderRadius: 1 }} />
            <span style={{ color: "#444", fontSize: "0.65rem", fontWeight: 500 }}>S&P 500</span>
          </div>
        </div>

        <div style={{
          marginTop: 8, marginBottom: 16,
          background: "#080808", border: "1px solid #151515", borderRadius: 14,
          padding: "14px 16px",
        }}>
          <span style={{ color: "#444", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 10 }}>Actieve strategieën</span>
          <div className="chart-toggles">
            {STRATEGIES.map((s) => {
              const isOn = active.has(s.id)
              return (
                <button key={s.id} onClick={() => toggleStrategy(s.id)} style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 8,
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                }}>
                  <div style={{
                    width: 36, height: 20, borderRadius: 10, padding: 2,
                    background: isOn ? ACCENT : "#282828",
                    transition: "background 0.3s",
                    flexShrink: 0, display: "flex", alignItems: "center",
                  }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%", background: "#fff",
                      transform: isOn ? "translateX(16px)" : "translateX(0)",
                      transition: "transform 0.3s cubic-bezier(.23,1,.32,1)",
                      boxShadow: isOn ? `0 0 8px ${ACCENT}60` : "0 1px 3px rgba(0,0,0,0.4)",
                    }} />
                  </div>
                  <span style={{ color: isOn ? "#fff" : "#555", fontSize: "0.75rem", fontWeight: 500, transition: "color 0.3s" }}>{s.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: "0 8px 0 0", position: "relative", height: 180 }}>
        <svg key={animKey} viewBox="0 0 510 200" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block", overflow: "visible", position: "absolute", top: 0, left: 0 }}>
          <defs>
            <linearGradient id="cFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.main} stopOpacity="0.22"/>
              <stop offset="50%" stopColor={colors.main} stopOpacity="0.06"/>
              <stop offset="100%" stopColor={colors.main} stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="cStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={colors.main} stopOpacity="0.15"/>
              <stop offset="30%" stopColor={colors.main} stopOpacity="0.5"/>
              <stop offset="100%" stopColor={colors.main} stopOpacity="1"/>
            </linearGradient>
            <filter id="gl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="dg"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          {[50, 100, 150].map(y => (
            <line key={y} x1="20" y1={y} x2="490" y2={y} stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="4 6"/>
          ))}

          <path d={SP500_LINE} fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" opacity="0.5"/>
          <text x="490" y="114" fill="#444" fontSize="7" fontFamily="sans-serif" textAnchor="end">S&P 500</text>

          <path d={chart.fill} fill="url(#cFill)">
            <animate attributeName="opacity" from="0" to="1" dur="1.2s" fill="freeze"/>
          </path>

          <path d={chart.line} fill="none" stroke="url(#cStroke)" strokeWidth="2.5" strokeLinecap="round" filter="url(#gl)" strokeDasharray="1600" strokeDashoffset="1600">
            <animate attributeName="stroke-dashoffset" from="1600" to="0" dur="3.5s" fill="freeze" calcMode="spline" keySplines="0.23 1 0.32 1"/>
          </path>

          <circle cx="490" cy={chart.endY} r="14" fill={colors.main} opacity="0.1">
            <animate attributeName="r" values="14;24;14" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.1;0.03;0.1" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="490" cy={chart.endY} r="7" fill={colors.main} opacity="0.18">
            <animate attributeName="r" values="7;12;7" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.18;0.06;0.18" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="490" cy={chart.endY} r="4" fill={colors.main} filter="url(#dg)"/>

          {[
            {x:20,l:"Jan"},{x:78,l:"Feb"},{x:137,l:"Mrt"},{x:196,l:"Apr"},
            {x:255,l:"Mei"},{x:313,l:"Jun"},{x:372,l:"Jul"},{x:431,l:"Aug"},{x:490,l:"Sep"},
          ].map((m,i) => (
            <text key={i} x={m.x} y="198" fill="#2a2a2a" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle">{m.l}</text>
          ))}
        </svg>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, margin: "0 24px", borderTop: "1px solid #151515" }}>
        {[
          { label: "Rendement", val: chart.pct, color: colors.main },
          { label: "Strategieën", val: `${count}/3`, color: count === 3 ? ACCENT : count === 2 ? "#4caf50" : "#ff9800" },
          { label: "Stabiliteit", val: count === 3 ? "Hoog" : count === 2 ? "Gemiddeld" : "Laag", color: count === 3 ? ACCENT : count === 2 ? "#4caf50" : "#ef4444" },
        ].map((m, i) => (
          <div key={i} style={{ textAlign: "center", padding: "18px 8px", borderRight: i < 2 ? "1px solid #151515" : "none" }}>
            <div style={{ color: m.color, fontWeight: 700, fontSize: "1rem", marginBottom: 3, transition: "color 0.5s" }}>{m.val}</div>
            <div style={{ color: "#444", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
    </div>
  )
}


/* ════════════════════════════════════════════════════ */
/*  HOMEPAGE                                            */
/* ════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <style>{`
        .hero-grid { display: grid; grid-template-columns: 5fr 6fr; gap: 48px; align-items: center; }
        .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .strategy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .cta-buttons { display: flex; gap: 16px; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .hero-grid, .two-col, .strategy-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 700px) {
          .metric-grid, .trust-grid { grid-template-columns: 1fr !important; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(137,251,246,0.15); }
          50% { box-shadow: 0 0 40px rgba(137,251,246,0.3); }
        }

        @keyframes chart-pulse {
          0%, 100% { r: 12; opacity: 0.15; }
          50% { r: 20; opacity: 0.05; }
        }
        @keyframes chart-pulse-inner {
          0%, 100% { r: 6; opacity: 0.25; }
          50% { r: 10; opacity: 0.1; }
        }
        .chart-pulse-ring {
          animation: chart-pulse 2.5s ease-in-out infinite;
        }
        .chart-pulse-ring-inner {
          animation: chart-pulse-inner 2.5s ease-in-out infinite;
        }

        @keyframes draw-line {
          from { stroke-dashoffset: 800; }
          to { stroke-dashoffset: 0; }
        }
        .chart-line-draw {
          stroke-dasharray: 800;
          animation: draw-line 2s cubic-bezier(.23,1,.32,1) forwards;
        }
      `}</style>

      <Nav />

      {/* ═══════ HERO ═══════ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", padding: "140px 24px 80px", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-30%", right: "-10%",
          width: 700, height: 700, borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT_DIM} 0%, transparent 70%)`,
          filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #222, transparent)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div className="hero-grid">
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: ACCENT_DIM, borderRadius: 100, padding: "8px 18px", marginBottom: 32,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, animation: "pulse-glow 2s infinite" }} />
                <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Live strategieën actief</span>
              </div>

              <h1 style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 800,
                lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24,
              }}>
                Consistente rendementen.{" "}
                <span style={{ color: ACCENT }}>Gebouwd op gecontroleerd risico.</span>
              </h1>

              <p style={{ color: "#999", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
                TrustedPips is ontworpen om kapitaal te laten groeien via gestructureerd traden, risicomanagement en portfolio-gebaseerde strategieën.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                <Bullet>Maandelijkse performance tracking</Bullet>
                <Bullet>Gecontroleerde drawdown</Bullet>
                <Bullet>Portfolio-gebaseerde aanpak</Bullet>
              </div>

             <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  <Btn glass primary href="#performance">Bekijk performance</Btn>
  <Btn glass href="/hoe-het-werkt">Hoe het werkt →</Btn>
</div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <HeroChart />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ POSITIONERING ═══════ */}
      <Section id="positioning" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col">
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 28 }}>
                TrustedPips is <span style={{ color: ACCENT }}>anders opgebouwd.</span>
              </h2>
              <p style={{ color: "#999", fontSize: "1.05rem", lineHeight: 1.7 }}>
                Wij werken met één doel: kapitaal laten groeien met gecontroleerd risico.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "✕", text: "Geen signalen" },
                { icon: "✕", text: "Geen hype" },
                { icon: "✕", text: "Geen shortcuts" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 12, padding: "20px 24px",
                }}>
                  <span style={{ color: "#ff4444", fontWeight: 700, fontSize: "1.1rem" }}>{item.icon}</span>
                  <span style={{ color: "#ccc", fontSize: "1rem", fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ PERFORMANCE ═══════ */}
      <Section id="performance" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Performance</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Waar serieuze investeerders naar kijken
            </h2>
          </div>

          <div className="metric-grid">
            <MetricBlock label="Maandelijkse rendementen" value="~5%" sub="Consistentie, niet uitschieters" delay={0}/>
            <MetricBlock label="Drawdown" value="Beheerst" sub="Risico eerst, rendement daarna" delay={100}/>
            <MetricBlock label="Risk metrics" value="Gestructureerd" sub="Elke positie binnen risicomodel" delay={200}/>
          </div>

          <div style={{
            marginTop: 48, background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 16, overflow: "hidden",
          }}>
            <div style={{ padding: "24px 28px", borderBottom: "1px solid #1a1a1a" }}>
              <span style={{ color: "#fff", fontWeight: 600 }}>Maandelijks overzicht</span>
              <span style={{ color: "#555", fontSize: "0.85rem", marginLeft: 12 }}>(voorbeeld)</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
                    {["Maand", "Rendement", "Drawdown", "Status"].map((h, i) => (
                      <th key={i} style={{ padding: "14px 24px", textAlign: "left", color: "#555", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { m: "Januari", r: "+4.8%", d: "-1.2%", s: true },
                    { m: "Februari", r: "+5.3%", d: "-0.9%", s: true },
                    { m: "Maart", r: "+3.7%", d: "-1.8%", s: true },
                    { m: "April", r: "+6.1%", d: "-1.1%", s: true },
                    { m: "Mei", r: "+4.2%", d: "-1.5%", s: true },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #111" }}>
                      <td style={{ padding: "16px 24px", color: "#ccc", fontSize: "0.9rem" }}>{row.m}</td>
                      <td style={{ padding: "16px 24px", color: ACCENT, fontSize: "0.9rem", fontWeight: 600 }}>{row.r}</td>
                      <td style={{ padding: "16px 24px", color: "#ff6b6b", fontSize: "0.9rem" }}>{row.d}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ background: "rgba(76,175,80,0.15)", color: "#4caf50", fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: 100 }}>Afgerond</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ STRATEGIEËN ═══════ */}
      <Section id="strategies" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Strategieën</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              De strategieën achter de performance
            </h2>
            <p style={{ color: "#999", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Performance komt niet voort uit één systeem. Het is het resultaat van meerdere strategieën die samenwerken.
            </p>
          </div>

          <div className="strategy-grid">
            <StrategyCard num="1" title="Scalpstrategie" subtitle="Forex: Goud & Nasdaq"
              desc="High-frequency scalpstrategie op de forexmarkt. Trades duren van seconden tot minuten met strikte risicobeheersing en een trailing stop-loss."
              points={["~87% winrate", "Hogere risk/reward setups", "Gebaseerd op marktstructuur"]}
              color={ACCENT} delay={0}/>
            <StrategyCard num="2" title="Gridstrategie" subtitle="Goudmarkt — Intraday"
              desc="Agressieve gridstrategie gericht op extreme prijsbewegingen via mean reversion. Bewezen trackrecord van 2,5 jaar."
              points={["~5% gemiddeld per maand", "Strakke risicocontrole", "Korte blootstelling"]}
              color="#A78BFA" delay={100}/>
            <StrategyCard num="3" title="Manuele strategie" subtitle="Selectief & gedisciplineerd"
              desc="Gehandeld wordt uitsluitend bij duidelijke en kwalitatieve kansen. Focus op consistentie en risicobeheersing."
              points={["~80% winrate", "1RR target per trade", "Geen impulsieve beslissingen"]}
              color="#FCD34D" delay={200}/>
          </div>
        </div>
      </Section>

      {/* ═══════ PORTFOLIO STRUCTUUR ═══════ */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col">
            <div>
              <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Portfolio structuur</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.15 }}>
                Wij vertrouwen niet op één systeem. <span style={{ color: ACCENT }}>Wij bouwen portfolios.</span>
              </h2>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
                <Bullet>Meerdere strategieën</Bullet>
                <Bullet>Verschillende marktomstandigheden</Bullet>
                <Bullet>Gespreid risico</Bullet>
              </div>
            </div>
            <div>
              <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 16, padding: "32px 28px" }}>
                <div style={{ color: "#666", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>Risicomanagement</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
                  Risico staat altijd op <span style={{ color: ACCENT }}>één.</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <Bullet>Gecontroleerde drawdown</Bullet>
                  <Bullet>Position sizing</Bullet>
                  <Bullet>Kapitaalbescherming</Bullet>
                </div>
                <div style={{ marginTop: 28, padding: "20px 0 0", borderTop: "1px solid #1a1a1a" }}>
                  <p style={{ color: "#888", fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.6 }}>
                    &ldquo;Wij streven niet naar de hoogste rendementen. Wij streven naar duurzame rendementen.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ TRUST ═══════ */}
      <Section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Veiligheid</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Jouw kapitaal blijft van <span style={{ color: ACCENT }}>jou</span>
            </h2>
          </div>
          <div className="trust-grid">
            {[
              { icon: "🔒", title: "Eigen account", desc: "Je geld blijft altijd op je eigen broker account. Volledig op jouw naam." },
              { icon: "🚫", title: "Geen opname-toegang", desc: "Wij hebben geen toegang om geld op te nemen van jouw account." },
              { icon: "⚡", title: "Alleen trading permissies", desc: "Uitsluitend trading rechten worden verleend. Niets meer, niets minder." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 16, padding: "36px 28px", textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: "#fff" }}>{item.title}</h3>
                <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════ HOE HET WERKT ═══════ */}
      <Section id="how" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Aan de slag</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>Hoe het werkt</h2>
            <p style={{ color: "#999", fontSize: "1.05rem", lineHeight: 1.7 }}>In een paar stappen koppel je jouw account aan ons systeem.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { step: "01", title: "Open een broker account", desc: "Maak een account aan bij één van onze partner brokers en stort minimaal €500." },
              { step: "02", title: "Koppel via Metacopier", desc: "Verbind je account met ons systeem. Je ontvangt een uitlegvideo en stap-voor-stap instructies." },
              { step: "03", title: "Automatische uitvoering", desc: "Posities worden automatisch gekopieerd. Jouw account draait volledig mee." },
              { step: "04", title: "Monitor je resultaten", desc: "Bekijk je account op elk moment. Wij delen alle trades, updates en resultaten." },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 24, padding: "32px 0",
                borderBottom: i < 3 ? "1px solid #1a1a1a" : "none", alignItems: "flex-start",
              }}>
                <span style={{ color: ACCENT, fontWeight: 800, fontSize: "1.1rem", fontVariantNumeric: "tabular-nums", flexShrink: 0, marginTop: 2 }}>{item.step}</span>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "#fff" }}>{item.title}</h3>
                  <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════ FAQ ═══════ */}
      <Section id="faq" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Veelgestelde vragen</h2>
          </div>
          <FaqItem q="Hoeveel startkapitaal heb ik nodig?" a="Om te starten heb je minimaal €500 nodig. Dit bedrag gebruik je om je broker account te activeren. Een hoger kapitaal zorgt voor stabielere resultaten en betere risicospreiding."/>
          <FaqItem q="Hoe werkt copytrading?" a="Copytrading betekent dat jouw account automatisch dezelfde trades uitvoert als ons hoofdaccount. Zodra je account is gekoppeld via Metacopier worden posities automatisch geopend en gesloten. Je hoeft zelf niets te doen."/>
          <FaqItem q="Kan ik op elk moment stoppen?" a="Ja, je kunt op elk moment stoppen. Omdat je account op jouw eigen naam staat, kun je de copier uitschakelen, posities sluiten en geld opnemen wanneer je wilt. Er zijn geen lock-ins of verplichte looptijden."/>
          <FaqItem q="Hoe werkt de winstverdeling?" a="De winstverdeling is gebaseerd op performance. Dit betekent dat wij alleen verdienen wanneer jouw account winst maakt. De exacte verdeling wordt vooraf duidelijk gedeeld."/>
          <FaqItem q="Met welke brokers werken jullie?" a="Wij werken met geselecteerde partner brokers die geschikt zijn voor copytrading. Deze brokers ondersteunen de technische koppeling via Metacopier en bieden stabiele uitvoering."/>
          <FaqItem q="Wat gebeurt er met mijn geld?" a="Je geld blijft altijd op je eigen broker account. Wij hebben geen toegang om geld op te nemen. Wij beheren alleen de trading via een beperkte koppeling. Jij behoudt volledige controle over je kapitaal."/>
        </div>
      </Section>

      {/* ═══════ FINAL CTA ═══════ */}
      <Section style={{ padding: "100px 24px 120px" }}>
        <div style={{
          maxWidth: 800, margin: "0 auto", textAlign: "center",
          background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 24,
          padding: "64px 40px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)",
            width: 500, height: 500, borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_DIM} 0%, transparent 70%)`,
            filter: "blur(60px)", pointerEvents: "none",
          }} />
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800,
            letterSpacing: "-0.02em", marginBottom: 16, position: "relative",
          }}>
            Klaar om te begrijpen hoe <span style={{ color: ACCENT }}>gestructureerd traden</span> werkt?
          </h2>
          <p style={{ color: "#888", fontSize: "1rem", marginBottom: 36, position: "relative" }}>
            Ontdek onze performance of begin direct.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
  <Btn glass primary href="#performance">Bekijk performance</Btn>
  <Btn glass href="/hoe-het-werkt">Start nu →</Btn>
</div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
