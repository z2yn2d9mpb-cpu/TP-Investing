"use client"

import { useState, useEffect, useRef } from "react"
import Nav from "../components/Nav"
import Btn from "../components/Btn"
import Footer from "../components/Footer"

const ACCENT = "#89FBF6"
const ACCENT_DIM = "rgba(137,251,246,0.15)"
const ACCENT_GLOW = "rgba(137,251,246,0.3)"

const STEP_COLORS = ["#89FBF6", "#A78BFA", "#FCD34D", "#F472B6"]

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

/* ─── Bullet with check ─── */
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

/* ─── Step Card (big visual) ─── */
function StepCard({ num, title, desc, details, note, color, delay = 0 }) {
  const [ref, visible] = useInView(0.12)
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "auto 1fr", gap: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s ${delay}ms cubic-bezier(.23,1,.32,1)`,
    }} className="step-card">
      {/* Left: Timeline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 32 }} className="step-timeline">
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: `${color}15`, border: `2px solid ${color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.2rem", fontWeight: 800, color,
          flexShrink: 0,
        }}>
          {num}
        </div>
        {num < 4 && (
          <div style={{
            width: 2, flex: 1, minHeight: 40,
            background: `linear-gradient(to bottom, ${color}40, transparent)`,
            marginTop: 8,
          }} />
        )}
      </div>

      {/* Right: Content */}
      <div style={{ paddingBottom: num < 4 ? 48 : 0 }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{title}</h3>
        <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: details ? 16 : note ? 16 : 0 }}>{desc}</p>
        
        {details && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: note ? 16 : 0 }}>
            {details.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color, fontSize: "0.6rem" }}>●</span>
                <span style={{ color: "#bbb", fontSize: "0.9rem" }}>{d}</span>
              </div>
            ))}
          </div>
        )}

        {note && (
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            background: `${color}08`, border: `1px solid ${color}20`,
            borderRadius: 10, padding: "14px 18px", marginTop: 4,
          }}>
            <span style={{ color, fontSize: "0.85rem", flexShrink: 0, marginTop: 1 }}>→</span>
            <span style={{ color: "#aaa", fontSize: "0.88rem", lineHeight: 1.6 }}>{note}</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Info Card ─── */
function InfoCard({ icon, title, children, delay = 0 }) {
  const [ref, visible] = useInView(0.15)
  return (
    <div ref={ref} style={{
      background: "#111", border: "1px solid #1a1a1a", borderRadius: 16,
      padding: "32px 28px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.6s ${delay}ms cubic-bezier(.23,1,.32,1)`,
    }}>
      <div style={{ fontSize: "1.5rem", marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

/* ════════════════════════════════════════════════════ */
/*  HOE HET WERKT PAGE                                 */
/* ════════════════════════════════════════════════════ */
export default function HoeHetWerktPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <style>{`
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .cta-buttons { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .step-timeline { padding-right: 20px !important; }
        }
        @media (max-width: 600px) {
          .step-card { gap: 0 !important; }
          .step-timeline { padding-right: 16px !important; }
        }
      `}</style>

      <Nav />

      {/* ═══════ HERO ═══════ */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "center",
        position: "relative", padding: "160px 24px 80px", overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: 800, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT_DIM} 0%, transparent 70%)`,
          filter: "blur(100px)", pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #222, transparent)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", width: "100%", textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: ACCENT_DIM, borderRadius: 100, padding: "8px 18px", marginBottom: 32,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.5 5H13L9.25 7.5L10.5 12L7 9L3.5 12L4.75 7.5L1 5H5.5L7 1Z" fill={ACCENT}/>
            </svg>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Eenvoudig & transparant</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24,
          }}>
            Hoe het <span style={{ color: ACCENT }}>werkt</span>
          </h1>

          <p style={{
            color: "#999", fontSize: "1.15rem", lineHeight: 1.7,
            marginBottom: 40, maxWidth: 560, margin: "0 auto 40px",
          }}>
            In een paar stappen koppel je jouw account aan ons systeem en loopt jouw kapitaal automatisch mee binnen onze strategieën.
          </p>

          <Btn primary href="#stappen">Bekijk de stappen ↓</Btn>
        </div>
      </section>

      {/* ═══════ STAPPENPLAN ═══════ */}
      <Section id="stappen" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Stappenplan</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Aan de slag in <span style={{ color: ACCENT }}>4 stappen</span>
            </h2>
          </div>

          <StepCard
            num={1} color={STEP_COLORS[0]} delay={0}
            title="Open een broker account"
            desc="Maak een account aan bij één van onze partner brokers en stort minimaal €500 op je account."
            note="Dit bedrag vormt het startkapitaal waarmee je account meedraait."
          />
          <StepCard
            num={2} color={STEP_COLORS[1]} delay={100}
            title="Koppel je account via Metacopier"
            desc="De verbinding met ons systeem loopt via Metacopier. Zodra je account is aangemaakt, ontvang je van ons:"
            details={["Een duidelijke uitlegvideo", "Stap-voor-stap instructies voor de koppeling"]}
            note="Dit proces duurt meestal slechts enkele minuten."
          />
          <StepCard
            num={3} color={STEP_COLORS[2]} delay={200}
            title="Automatische uitvoering"
            desc="Na het koppelen wordt jouw account automatisch verbonden met onze trades. Vanaf dat moment:"
            details={["Worden posities automatisch gekopieerd", "Hoef je zelf niets meer te doen", "Draait je account volledig mee binnen onze strategieën"]}
          />
          <StepCard
            num={4} color={STEP_COLORS[3]} delay={300}
            title="Monitor je resultaten"
            desc="Je kunt je account op elk moment zelf bekijken via je broker. Daarnaast delen wij in onze groep:"
            details={["Alle geplaatste trades", "Updates en resultaten", "Belangrijke informatie over performance"]}
            note="Controleer regelmatig of jouw account overeenkomt met de gedeelde trades."
          />
        </div>
      </Section>

      {/* ═══════ BELANGRIJKE NUANCES ═══════ */}
      <Section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
            padding: "48px 40px", position: "relative", overflow: "hidden",
          }}>
            {/* Accent top border */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, #ff9800, transparent)` }} />

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,152,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem",
              }}>⚠️</span>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Waarom resultaten kunnen verschillen</h2>
            </div>

            <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 24 }}>
              De resultaten op jouw account zullen nooit volledig identiek zijn aan die van ons. Dit komt door:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 28 }} className="nuance-grid">
              {["Verschillen in brokers", "Liquiditeitsproviders", "Spreads", "Kleine vertragingen in uitvoering"].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "rgba(255,152,0,0.05)", border: "1px solid rgba(255,152,0,0.1)",
                  borderRadius: 10, padding: "12px 16px",
                }}>
                  <span style={{ color: "#ff9800", fontSize: "0.7rem" }}>●</span>
                  <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{item}</span>
                </div>
              ))}
            </div>
            <style>{`.nuance-grid { grid-template-columns: repeat(2, 1fr); } @media (max-width: 600px) { .nuance-grid { grid-template-columns: 1fr !important; } }`}</style>

            <div style={{
              background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.15)",
              borderRadius: 12, padding: "16px 20px",
            }}>
              <p style={{ color: "#4caf50", fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.6 }}>
                ✓ Deze verschillen zijn doorgaans minimaal en hebben meestal weinig impact op het maandelijkse resultaat.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ RISICO & STRUCTUUR + CONTROLE ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col">
            {/* Left: Risico & Structuur */}
            <div style={{
              background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
              padding: "40px 36px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
              
              <span style={{ color: ACCENT, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Structuur</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
                Gebouwd om risico te <span style={{ color: ACCENT }}>beperken</span>
              </h3>
              <p style={{ color: "#999", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 24 }}>
                Ons portfolio is zo ingericht dat risico wordt gespreid over meerdere strategieën. Dit betekent:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                <Bullet>Geen afhankelijkheid van één systeem</Bullet>
                <Bullet>Gecontroleerde drawdown</Bullet>
                <Bullet>Stabiliteit over verschillende marktomstandigheden</Bullet>
              </div>
              <div style={{ padding: "20px 0 0", borderTop: "1px solid #1a1a1a" }}>
                <p style={{ color: "#888", fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.6 }}>
                  &ldquo;Het doel is niet maximale winst per trade, maar consistente groei over tijd.&rdquo;
                </p>
              </div>
            </div>

            {/* Right: Controle & Checks */}
            <div style={{
              background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
              padding: "40px 36px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, #A78BFA, transparent)` }} />
              
              <span style={{ color: "#A78BFA", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Monitoring</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
                Blijf betrokken bij je <span style={{ color: "#A78BFA" }}>account</span>
              </h3>
              <p style={{ color: "#999", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 24 }}>
                Hoewel alles automatisch verloopt, is het belangrijk om je account te blijven monitoren. Let op:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                <Bullet color="#A78BFA">Komen trades overeen met wat wij delen</Bullet>
                <Bullet color="#A78BFA">Zijn er geen trades gemist</Bullet>
                <Bullet color="#A78BFA">Werkt de copier correct</Bullet>
              </div>
              <div style={{
                background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.15)",
                borderRadius: 12, padding: "14px 18px",
              }}>
                <p style={{ color: "#A78BFA", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  → Soms kan er iets misgaan bij de setup, waardoor trades worden overgeslagen. Controleer dit regelmatig.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ VEILIGHEID ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Veiligheid</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Jouw kapitaal blijft van <span style={{ color: ACCENT }}>jou</span>
            </h2>
          </div>

          <div className="three-col">
            <InfoCard icon="🔒" title="Eigen broker account" delay={0}>
              <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Je geld blijft altijd op je eigen broker account. Volledig op jouw naam, onder jouw controle.
              </p>
            </InfoCard>
            <InfoCard icon="🚫" title="Geen opname-toegang" delay={100}>
              <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Wij hebben geen toegang om geld op te nemen van jouw account. Onmogelijk.
              </p>
            </InfoCard>
            <InfoCard icon="⚡" title="Alleen trading permissies" delay={200}>
              <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Uitsluitend trading rechten worden verleend. Jij houdt altijd volledige controle.
              </p>
            </InfoCard>
          </div>
        </div>
      </Section>

      {/* ═══════ SAMENVATTING ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
            padding: "48px 40px",
          }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 28, textAlign: "center" }}>Kort samengevat</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="summary-grid">
              {[
                { num: "1", label: "Account openen", color: STEP_COLORS[0] },
                { num: "2", label: "Koppelen via Metacopier", color: STEP_COLORS[1] },
                { num: "3", label: "Automatisch traden", color: STEP_COLORS[2] },
                { num: "4", label: "Resultaten monitoren", color: STEP_COLORS[3] },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, margin: "0 auto 12px",
                    background: `${s.color}12`, border: `1px solid ${s.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, color: s.color, fontSize: "1rem",
                  }}>
                    {s.num}
                  </div>
                  <span style={{ color: "#999", fontSize: "0.82rem", lineHeight: 1.4, display: "block" }}>{s.label}</span>
                </div>
              ))}
            </div>
            <style>{`.summary-grid { grid-template-columns: repeat(4, 1fr); } @media (max-width: 600px) { .summary-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; } }`}</style>
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
            Klaar om te <span style={{ color: ACCENT }}>starten</span>?
          </h2>
          <p style={{ color: "#888", fontSize: "1rem", marginBottom: 36, position: "relative" }}>
            Open een account en begin vandaag nog.
          </p>
          <div className="cta-buttons" style={{ position: "relative" }}>
            <Btn primary href="#">Open een account</Btn>
            <Btn href="/#performance">Bekijk performance</Btn>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
