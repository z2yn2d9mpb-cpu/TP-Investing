"use client"

import { useState, useEffect, useRef } from "react"

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

/* ─── Button ─── */
function Btn({ children, primary, href = "#", onClick, style: s = {} }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: primary ? "16px 36px" : "14px 28px",
        borderRadius: 10, fontSize: "0.95rem", fontWeight: 600,
        textDecoration: "none", cursor: "pointer",
        transition: "all 0.35s cubic-bezier(.23,1,.32,1)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        ...(primary
          ? {
              background: hovered ? "#a5fdf9" : ACCENT,
              color: "#000",
              border: "none",
              boxShadow: hovered ? `0 8px 30px rgba(137,251,246,0.35), 0 2px 8px rgba(137,251,246,0.2)` : `0 0 0 rgba(137,251,246,0)`,
            }
          : {
              background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
              color: "#fff",
              border: `1px solid ${hovered ? "#555" : "#333"}`,
              boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.3)" : "none",
            }),
        ...s,
      }}
    >
      {children}
    </a>
  )
}

/* ─── Navbar ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  const links = [
    { label: "Hoe het werkt", href: "/hoe-het-werkt" },
    { label: "Risico & Strategie", href: "/risico-strategie" },
    { label: "Over ons", href: "/over-ons" },
    { label: "FAQ", href: "#faq" },
  ]

  return (
    <>
      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile-btn { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "14px 0" : "20px 0",
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo-wit.png" alt="TrustedPips" style={{ height: 32, width: "auto" }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>TrustedPips</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                style={{ color: "#999", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "#999"}
              >
                {l.label}
              </a>
            ))}
            <Btn primary href="/hoe-het-werkt" style={{ padding: "10px 24px", fontSize: "0.85rem" }}>Start nu</Btn>
          </div>

          <button className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.97)", zIndex: 999,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
        }}>
          <button onClick={() => setMobileOpen(false)} style={{
            position: "absolute", top: 20, right: 24, background: "none", border: "none", cursor: "pointer",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/>
            </svg>
          </button>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ color: "#fff", textDecoration: "none", fontSize: "1.3rem", fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
          <Btn primary href="/hoe-het-werkt" onClick={() => setMobileOpen(false)} style={{ marginTop: 16 }}>Start nu</Btn>
        </div>
      )}
    </>
  )
}


/* ─── Interactive Hero Chart ─── */
const CHART_PATHS = {
  // 1 strategy: volatile, dips, lower end result
  1: {
    line: "M20,155 C35,150 45,158 65,162 C85,166 95,155 110,148 C125,141 135,152 150,158 C165,164 175,148 190,140 C205,132 215,142 230,135 C245,128 255,138 270,130 C285,122 295,115 310,120 C325,125 335,108 350,100 C365,92 375,85 390,78 C405,71 420,68 440,62 C455,58 470,52 490,45",
    fill: "M20,155 C35,150 45,158 65,162 C85,166 95,155 110,148 C125,141 135,152 150,158 C165,164 175,148 190,140 C205,132 215,142 230,135 C245,128 255,138 270,130 C285,122 295,115 310,120 C325,125 335,108 350,100 C365,92 375,85 390,78 C405,71 420,68 440,62 C455,58 470,52 490,45 L490,185 L20,185Z",
    endY: 45,
    pct: "+32.1%",
    label: "Volatiel — periodes van verlies",
    labelColor: "#ff9800",
  },
  // 2 strategies: smoother but still some dips
  2: {
    line: "M20,155 C35,151 50,147 65,143 C80,139 95,142 110,136 C125,130 140,133 155,126 C170,119 185,122 200,115 C215,108 230,105 245,98 C260,91 275,95 290,86 C305,77 320,74 335,68 C350,62 365,58 380,52 C395,46 410,42 430,36 C450,30 470,26 490,22",
    fill: "M20,155 C35,151 50,147 65,143 C80,139 95,142 110,136 C125,130 140,133 155,126 C170,119 185,122 200,115 C215,108 230,105 245,98 C260,91 275,95 290,86 C305,77 320,74 335,68 C350,62 365,58 380,52 C395,46 410,42 430,36 C450,30 470,26 490,22 L490,185 L20,185Z",
    endY: 22,
    pct: "+61.7%",
    label: "Stabieler — minder pieken en dalen",
    labelColor: "#A78BFA",
  },
  // 3 strategies: smooth consistent growth
  3: {
    line: "M20,155 C40,150 55,146 70,141 C85,136 100,132 115,127 C130,122 145,118 160,113 C175,108 190,104 205,99 C220,94 235,89 250,84 C265,79 280,74 295,68 C310,62 325,56 340,50 C355,44 370,38 385,33 C400,28 415,23 435,18 C455,14 475,11 490,8",
    fill: "M20,155 C40,150 55,146 70,141 C85,136 100,132 115,127 C130,122 145,118 160,113 C175,108 190,104 205,99 C220,94 235,89 250,84 C265,79 280,74 295,68 C310,62 325,56 340,50 C355,44 370,38 385,33 C400,28 415,23 435,18 C455,14 475,11 490,8 L490,185 L20,185Z",
    endY: 8,
    pct: "+87.4%",
    label: "Consistent — gespreid risico",
    labelColor: "#4caf50",
  },
}

const STRATEGIES = [
  { id: 1, name: "Scalp", color: ACCENT },
  { id: 2, name: "Grid", color: "#A78BFA" },
  { id: 3, name: "Manueel", color: "#FCD34D" },
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

  return (
    <div style={{
      width: "100%", maxWidth: 540, background: "linear-gradient(170deg, #0d0d0d 0%, #080808 100%)",
      border: "1px solid #1a1a1a", borderRadius: 24, position: "relative",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(137,251,246,0.04)",
    }}>
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, borderRadius: "24px 24px 0 0" }} />

      {/* Header */}
      <div style={{ padding: "28px 28px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <span style={{ color: "#555", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Portfolio groei</span>
            <div style={{
              color: "#fff", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", marginTop: 4,
              transition: "all 0.4s",
            }}>
              {chart.pct}
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: `${chart.labelColor}15`, borderRadius: 100, padding: "6px 14px",
            transition: "all 0.4s",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: chart.labelColor }} />
            <span style={{ color: chart.labelColor, fontSize: "0.68rem", fontWeight: 600, whiteSpace: "nowrap", transition: "color 0.4s" }}>{chart.label}</span>
          </div>
        </div>

        {/* Strategy toggles */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 16 }}>
          {STRATEGIES.map((s) => {
            const isActive = active.has(s.id)
            return (
              <button
                key={s.id}
                onClick={() => toggleStrategy(s.id)}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: `1px solid ${isActive ? s.color + "50" : "#1a1a1a"}`,
                  background: isActive ? s.color + "12" : "#0a0a0a",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                }}
              >
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: isActive ? s.color : "#333",
                  transition: "all 0.3s",
                  boxShadow: isActive ? `0 0 8px ${s.color}50` : "none",
                }} />
                <span style={{
                  color: isActive ? s.color : "#555",
                  fontSize: "0.72rem", fontWeight: 600,
                  transition: "color 0.3s",
                }}>{s.name}</span>
              </button>
            )
          })}
        </div>
        <p style={{ color: "#333", fontSize: "0.7rem", textAlign: "center", marginBottom: 12 }}>
          Klik om strategieën toe te voegen of te verwijderen
        </p>
      </div>

      {/* Chart */}
      <div style={{ padding: "0 8px 0 0", position: "relative" }}>
        <svg key={animKey} viewBox="0 0 510 200" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
          <defs>
            <linearGradient id="cFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.2"/>
              <stop offset="50%" stopColor={ACCENT} stopOpacity="0.05"/>
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="cStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.2"/>
              <stop offset="40%" stopColor={ACCENT} stopOpacity="0.6"/>
              <stop offset="100%" stopColor={ACCENT} stopOpacity="1"/>
            </linearGradient>
            <filter id="gl">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="dg">
              <feGaussianBlur stdDeviation="6" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[50, 100, 150].map(y => (
            <line key={y} x1="20" y1={y} x2="490" y2={y} stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="4 6"/>
          ))}

          {/* Fill */}
          <path d={chart.fill} fill="url(#cFill)" style={{ transition: "d 0.8s cubic-bezier(.23,1,.32,1)" }}>
            <animate attributeName="opacity" from="0" to="1" dur="1s" fill="freeze"/>
          </path>

          {/* Line */}
          <path
            d={chart.line}
            fill="none" stroke="url(#cStroke)" strokeWidth="2.5" strokeLinecap="round"
            filter="url(#gl)"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            style={{ transition: "d 0.8s cubic-bezier(.23,1,.32,1)" }}
          >
            <animate attributeName="stroke-dashoffset" from="1200" to="0" dur="3s" fill="freeze" calcMode="spline" keySplines="0.23 1 0.32 1"/>
          </path>

          {/* End pulse dot */}
          <circle cx="490" cy={chart.endY} r="14" fill={ACCENT} opacity="0.12">
            <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.12;0.04;0.12" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="490" cy={chart.endY} r="6" fill={ACCENT} opacity="0.2">
            <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.08;0.2" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="490" cy={chart.endY} r="4" fill={ACCENT} filter="url(#dg)"/>

          {/* Month labels */}
          {[
            {x:20,l:"Jan"},{x:78,l:"Feb"},{x:137,l:"Mrt"},{x:196,l:"Apr"},
            {x:255,l:"Mei"},{x:313,l:"Jun"},{x:372,l:"Jul"},{x:431,l:"Aug"},{x:490,l:"Sep"},
          ].map((m,i) => (
            <text key={i} x={m.x} y="198" fill="#2a2a2a" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle">{m.l}</text>
          ))}
        </svg>
      </div>

      {/* Bottom stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0,
        margin: "0 24px", borderTop: "1px solid #151515",
      }}>
        {[
          { label: "Rendement", val: chart.pct, color: count === 3 ? "#4caf50" : count === 2 ? "#A78BFA" : "#ff9800" },
          { label: "Strategieën", val: `${count}/3`, color: count === 3 ? ACCENT : "#555" },
          { label: "Stabiliteit", val: count === 3 ? "Hoog" : count === 2 ? "Gemiddeld" : "Laag", color: count === 3 ? "#4caf50" : count === 2 ? "#ff9800" : "#ef4444" },
        ].map((m, i) => (
          <div key={i} style={{
            textAlign: "center", padding: "18px 8px",
            borderRight: i < 2 ? "1px solid #151515" : "none",
          }}>
            <div style={{ color: m.color, fontWeight: 700, fontSize: "1rem", marginBottom: 3, transition: "all 0.4s" }}>{m.val}</div>
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

              <div className="cta-buttons">
                <Btn primary href="#performance">Bekijk performance</Btn>
                <Btn href="/hoe-het-werkt">Hoe het werkt →</Btn>
              </div>
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
            <Btn primary href="#performance">Bekijk performance</Btn>
            <Btn href="/hoe-het-werkt">Start nu →</Btn>
          </div>
        </div>
      </Section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo-wit.png" alt="TrustedPips" style={{ height: 20, width: "auto" }} />
            <span style={{ color: "#555", fontSize: "0.85rem" }}>© 2026 TrustedPips. Alle rechten voorbehouden.</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" style={{ color: "#555", fontSize: "0.85rem", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "#555", fontSize: "0.85rem", textDecoration: "none" }}>Voorwaarden</a>
            <a href="#" style={{ color: "#555", fontSize: "0.85rem", textDecoration: "none" }}>Disclaimer</a>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 32, borderTop: "1px solid #111" }}>
          <p style={{ color: "#444", fontSize: "0.75rem", lineHeight: 1.7 }}>
            <strong style={{ color: "#555" }}>Risicowaarschuwing:</strong> Trading in forex en CFDs brengt aanzienlijke risicos met zich mee en is niet geschikt voor alle investeerders. Je kunt (een deel van) je investering verliezen. Resultaten uit het verleden bieden geen garantie voor toekomstige resultaten. Investeer alleen geld dat je kunt missen. TrustedPips biedt geen financieel advies. Raadpleeg een onafhankelijk financieel adviseur indien nodig.
          </p>
        </div>
      </footer>
    </div>
  )
}
