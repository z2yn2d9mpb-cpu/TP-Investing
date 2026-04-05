"use client"

import { useState, useEffect, useRef } from "react"
import Nav from "../components/Nav"
import Btn from "../components/Btn"
import Footer from "../components/Footer"

const ACCENT = "#89FBF6"
const ACCENT_DIM = "rgba(137,251,246,0.15)"

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

/* ─── Section fade-in ─── */
function Section({ children, id, style = {} }) {
  const [ref, visible] = useInView(0.08)
  return (
    <section ref={ref} id={id} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s cubic-bezier(.23,1,.32,1), transform 0.8s cubic-bezier(.23,1,.32,1)",
    }}>
      {children}
    </section>
  )
}

/* ─── Bullet ─── */
function Bullet({ children, color = ACCENT }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
      <span style={{
        width: 22, height: 22, borderRadius: "50%",
        background: color === ACCENT ? ACCENT_DIM : `${color}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: 2,
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span style={{ color: "#ccc", fontSize: "0.95rem", lineHeight: 1.6 }}>{children}</span>
    </div>
  )
}

/* ─── Expandable Strategy Panel ─── */
function StrategyPanel({ num, title, subtitle, intro, description, keypoints, color, stat, statLabel, delay = 0 }) {
  const [open, setOpen] = useState(false)
  const [ref, visible] = useInView(0.1)
  return (
    <div ref={ref} style={{
      background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s ${delay}ms cubic-bezier(.23,1,.32,1)`,
    }}>
      {/* Color bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      {/* Header — always visible */}
      <div style={{ padding: "32px 36px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, marginBottom: 16 }} className="strategy-header">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{
              width: 44, height: 44, borderRadius: 12,
              background: `${color}15`, border: `1px solid ${color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", fontWeight: 800, color, flexShrink: 0,
            }}>
              {num}
            </span>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{title}</h3>
              <span style={{ color: "#555", fontSize: "0.82rem" }}>{subtitle}</span>
            </div>
          </div>
          {stat && (
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ color, fontSize: "1.5rem", fontWeight: 800 }}>{stat}</div>
              <div style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{statLabel}</div>
            </div>
          )}
        </div>

        <p style={{ color: "#999", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 20 }}>{intro}</p>

        {/* Keypoints */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
          {keypoints.map((kp, i) => (
            <span key={i} style={{
              background: `${color}10`, border: `1px solid ${color}20`,
              borderRadius: 100, padding: "6px 16px",
              color, fontSize: "0.82rem", fontWeight: 500,
            }}>
              {kp}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button onClick={() => setOpen(!open)} style={{
          background: "none", border: "1px solid #222", borderRadius: 8,
          color: "#888", fontSize: "0.82rem", fontWeight: 500,
          padding: "8px 18px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
          transition: "all 0.3s",
        }}>
          {open ? "Minder details" : "Meer details"}
          <span style={{
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block", fontSize: "0.7rem",
          }}>▼</span>
        </button>
      </div>

      {/* Expandable detail */}
      <div style={{
        maxHeight: open ? 500 : 0,
        overflow: "hidden",
        transition: "max-height 0.6s cubic-bezier(.23,1,.32,1)",
      }}>
        <div style={{
          padding: "0 36px 32px",
          borderTop: "1px solid #151515",
          paddingTop: 24,
        }}>
          <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.8 }}>{description}</p>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════ */
/*  RISICO & STRATEGIE PAGE                             */
/* ════════════════════════════════════════════════════ */
export default function RisicoStrategiePage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <style>{`
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .cta-buttons { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
        .strategy-header { flex-direction: row; }
        .risk-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .summary-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }

        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .risk-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .strategy-header { flex-direction: column !important; }
          .risk-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav />

      {/* ═══════ HERO ═══════ */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "center",
        position: "relative", padding: "160px 24px 80px", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)`,
          filter: "blur(100px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "-10%", left: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT_DIM} 0%, transparent 70%)`,
          filter: "blur(100px)", pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #222, transparent)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", width: "100%", textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(239,68,68,0.1)", borderRadius: 100, padding: "8px 18px", marginBottom: 32,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v6m0 2.5v.5M2 7a5 5 0 1010 0A5 5 0 002 7z" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ color: "#ef4444", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Risico & Strategie</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24,
          }}>
            Hoe wij kapitaal <span style={{ color: ACCENT }}>beheren</span>
          </h1>

          <p style={{
            color: "#999", fontSize: "1.15rem", lineHeight: 1.7,
            maxWidth: 600, margin: "0 auto",
          }}>
            TrustedPips is gebouwd rondom één principe: kapitaal laten groeien via structuur, risicobeheer en strategische allocatie.
          </p>
        </div>
      </section>

      {/* ═══════ GEEN HYPE ═══════ */}
      <Section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="two-col">
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 28 }}>
                Geen hype.{" "}
                <span style={{ color: "#ef4444" }}>Geen shortcuts.</span>
              </h2>
              <p style={{ color: "#888", fontSize: "1rem", lineHeight: 1.7 }}>
                Wij behandelen trading als kapitaalbeheer. Niet als speculatie.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "Wij verkopen geen signalen",
                "Wij runnen geen signal groups",
                'Wij verkopen geen "get rich quick" strategieën',
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 12, padding: "20px 24px",
                }}>
                  <span style={{ color: "#ef4444", fontWeight: 700, fontSize: "1.1rem" }}>✕</span>
                  <span style={{ color: "#ccc", fontSize: "0.95rem", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ PORTFOLIO DENKEN ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
            padding: "48px 40px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, #A78BFA, transparent)` }} />

            <span style={{ color: "#A78BFA", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Onze aanpak</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2 }}>
              Wij bouwen portfolios,{" "}
              <span style={{ color: "#A78BFA" }}>geen losse trades</span>
            </h2>
            <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 8 }}>
              De meeste traders vertrouwen op één strategie. Wanneer die strategie tijdelijk minder presteert, verdwijnt het rendement.
            </p>
            <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.8 }}>
              Professionele structuren werken anders. Kapitaal wordt verdeeld over meerdere strategieën, zodat prestaties niet afhankelijk zijn van één systeem.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════ STRATEGIEËN (DETAIL) ═══════ */}
      <Section id="strategies" style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Onze strategieën</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              De lagen achter de <span style={{ color: ACCENT }}>performance</span>
            </h2>
            <p style={{ color: "#999", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Onze performance komt voort uit meerdere lagen die samenwerken.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <StrategyPanel
              num="1" color={ACCENT} delay={0}
              title="Scalpstrategie"
              subtitle="Forex: Goud (XAUUSD) & Nasdaq (NAS100)"
              intro="High-frequency scalpstrategie gericht op het benutten van grotere marktbewegingen. Ontworpen voor markten met duidelijke richting, waar trends zorgen voor kansen."
              description="Deze strategie is actief op de forexmarkt met focus op goud en de Nasdaq. Trades hebben een zeer korte looptijd van enkele seconden tot enkele minuten. De strategie werkt met een single-entry model, waarbij elke trade één instapmoment heeft gecombineerd met een vooraf bepaalde stop-loss. Daarnaast wordt gebruikgemaakt van een trailing stop-loss, waardoor winsten efficiënt worden veiliggesteld en de totale winrate wordt geoptimaliseerd. Instappen gebeurt op het moment dat belangrijke key levels worden doorbroken, met als uitgangspunt dat deze doorbraak leidt tot een sterke breakout-beweging."
              keypoints={["~87% winrate", "Hogere risk/reward", "Marktstructuur"]}
              stat="~87%"
              statLabel="Winrate"
            />
            <StrategyPanel
              num="2" color="#A78BFA" delay={100}
              title="Agressieve Gridstrategie"
              subtitle="Goudmarkt (XAUUSD) — Intraday"
              intro="Gericht op kortetermijn prijsbewegingen. Ontworpen om consistente activiteit te genereren in meer neutrale of zijwaartse markten via mean reversion."
              description="Deze strategie richt zich specifiek op de goudmarkt en focust op het identificeren van extreme prijsbewegingen, zowel naar boven als naar beneden. Wanneer vooraf gedefinieerde indicatoren extreme marktomstandigheden signaleren, opent de strategie posities in de tegenovergestelde richting. Hierbij wordt gebruikgemaakt van een gridstructuur, waarbij meerdere posities gefaseerd worden opgebouwd. Door het systematisch inspelen op overextensies in de markt, gecombineerd met position scaling, worden consistente rendementen gegenereerd, ook in volatiele marktomstandigheden."
              keypoints={["~5% per maand", "Strakke risicocontrole", "Korte blootstelling"]}
              stat="~5%"
              statLabel="Gem. / maand"
            />
            <StrategyPanel
              num="3" color="#FCD34D" delay={200}
              title="Manuele Strategie"
              subtitle="Selectief & gedisciplineerd"
              intro="Onze manuele strategie vormt een belangrijk onderdeel binnen onze aanpak. De kracht ligt in selectiviteit en discipline."
              description="Omdat het een manuele strategie betreft, verschilt de activiteit per periode. Er zijn fases waarin de markt weinig duidelijke setups biedt en er minder wordt gehandeld, afgewisseld met periodes waarin juist meerdere kansen kort achter elkaar ontstaan. Er wordt uitsluitend gehandeld wanneer de markt duidelijke en kwalitatieve kansen biedt, waarbij de focus altijd ligt op consistentie en risicobeheersing. Iedere trade wordt genomen volgens een vaste structuur, zonder impulsieve beslissingen."
              keypoints={["~80% winrate", "1RR target", "Geen impuls"]}
              stat="~80%"
              statLabel="Winrate"
            />
          </div>

          {/* Strategy closing statement */}
          <div style={{ textAlign: "center", marginTop: 48, padding: "32px 0", borderTop: "1px solid #151515" }}>
            <p style={{ color: "#888", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
              &ldquo;Elke strategie heeft een eigen rol. Samen vormen ze een systeem dat is ontworpen voor consistentie, niet afhankelijkheid van één uitkomst.&rdquo;
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════ RISICOMANAGEMENT ═══════ */}
      <Section id="risk" style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ color: "#ef4444", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Risicomanagement</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Risico komt altijd <span style={{ color: "#ef4444" }}>eerst</span>
            </h2>
            <p style={{ color: "#999", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Elke investering brengt risico met zich mee. Forex is daarop geen uitzondering. Het verschil zit in hoe dat risico wordt beheerd.
            </p>
          </div>

          {/* Risk principle cards */}
          <div className="risk-grid">
            {[
              { icon: "📉", title: "Gecontroleerde drawdown", desc: "Maximale verliezen worden beperkt door vaste limieten." },
              { icon: "📏", title: "Risicolimieten per positie", desc: "Elke trade heeft een vooraf bepaald risicoplafond." },
              { icon: "🔀", title: "Spreiding over strategieën", desc: "Kapitaal wordt verdeeld, niet geconcentreerd." },
              { icon: "🔄", title: "Continue monitoring", desc: "Aanpassing aan veranderende marktomstandigheden." },
            ].map((item, i) => {
              const [ref, visible] = useInView(0.15)
              return (
                <div key={i} ref={ref} style={{
                  background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 16,
                  padding: "28px 24px", textAlign: "center",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ${i * 80}ms cubic-bezier(.23,1,.32,1)`,
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>{item.icon}</div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ color: "#666", fontSize: "0.82rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Strong statement */}
          <div style={{
            textAlign: "center", marginTop: 48,
            background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)",
            borderRadius: 16, padding: "32px 40px",
          }}>
            <p style={{ color: "#ef4444", fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.6 }}>
              Zonder risicobeheer is rendement toeval.
            </p>
            <p style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.6 }}>
              Met risicobeheer wordt rendement herhaalbaar.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════ TRANSPARANTIE & COPYTRADING ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="two-col">
            {/* Transparantie */}
            <div style={{
              background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
              padding: "40px 36px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
              <span style={{ color: ACCENT, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Transparantie</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
                Volledige controle over je <span style={{ color: ACCENT }}>kapitaal</span>
              </h3>
              <p style={{ color: "#999", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 24 }}>
                Een belangrijk onderdeel van ons model is transparantie. Je behoudt altijd controle over je eigen geld.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Bullet>Je kapitaal blijft op je eigen account</Bullet>
                <Bullet>Wij hebben geen opname-toegang</Bullet>
                <Bullet>Alleen trading permissies worden verleend</Bullet>
              </div>
            </div>

            {/* Copytrading uitleg */}
            <div style={{
              background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
              padding: "40px 36px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, #FCD34D, transparent)` }} />
              <span style={{ color: "#FCD34D", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Copytrading</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
                Hoe copytrading <span style={{ color: "#FCD34D" }}>werkt</span>
              </h3>
              <p style={{ color: "#999", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 24 }}>
                Copytrading betekent dat trades automatisch worden gekopieerd naar jouw account. Door technische factoren kunnen kleine verschillen ontstaan:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                <Bullet color="#FCD34D">Spreads</Bullet>
                <Bullet color="#FCD34D">Uitvoeringsvertraging</Bullet>
                <Bullet color="#FCD34D">Broker verschillen</Bullet>
              </div>
              <div style={{
                background: "rgba(252,211,77,0.06)", border: "1px solid rgba(252,211,77,0.12)",
                borderRadius: 12, padding: "14px 18px",
              }}>
                <p style={{ color: "#FCD34D", fontSize: "0.88rem", fontStyle: "italic", lineHeight: 1.6 }}>
                  &ldquo;De performance is ontworpen om te volgen, niet om exact te spiegelen.&rdquo;
                </p>
              </div>
              <div style={{ marginTop: 20 }}>
                <Btn glass href="/hoe-het-werkt" style={{ fontSize: "0.85rem", padding: "10px 20px" }}>Bekijk hoe het werkt →</Btn>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ SAMENVATTING ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Wat TrustedPips <span style={{ color: ACCENT }}>anders maakt</span>
            </h2>
          </div>
          <div className="summary-grid">
            {[
              { icon: "🎯", label: "Kapitaalbeheer in plaats van trades" },
              { icon: "📊", label: "Portfolio-gebaseerde strategieën" },
              { icon: "🛡️", label: "Streng risicomanagement" },
              { icon: "🔍", label: "Transparante structuur" },
              { icon: "📈", label: "Lange termijn benadering" },
            ].map((item, i) => {
              const [ref, visible] = useInView(0.15)
              return (
                <div key={i} ref={ref} style={{
                  background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 14,
                  padding: "24px 16px", textAlign: "center",
                  opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.95)",
                  transition: `all 0.5s ${i * 60}ms cubic-bezier(.23,1,.32,1)`,
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{item.icon}</div>
                  <span style={{ color: "#bbb", fontSize: "0.82rem", lineHeight: 1.5, display: "block" }}>{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ═══════ CTA ═══════ */}
      <Section style={{ padding: "0 24px 120px" }}>
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
            Wil je zien hoe dit eruitziet <span style={{ color: ACCENT }}>in de praktijk</span>?
          </h2>
          <p style={{ color: "#888", fontSize: "1rem", marginBottom: 36, position: "relative" }}>
            Bekijk onze performance of begin vandaag nog.
          </p>
          <div className="cta-buttons" style={{ position: "relative" }}>
            <Btn glass primary href="/#performance">Bekijk performance</Btn>
            <Btn glass href="/hoe-het-werkt">Start met TrustedPips →</Btn>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
