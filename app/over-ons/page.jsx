"use client"

import { useState, useEffect, useRef } from "react"

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

/* ─── Button ─── */
function Btn({ children, primary, href = "#", style: s = {} }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={href}
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
              background: hovered ? "#a5fdf9" : ACCENT, color: "#000", border: "none",
              boxShadow: hovered ? "0 8px 30px rgba(137,251,246,0.35)" : "none",
            }
          : {
              background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
              color: "#fff", border: `1px solid ${hovered ? "#555" : "#333"}`,
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
    { label: "Home", href: "/" },
    { label: "Hoe het werkt", href: "/hoe-het-werkt" },
    { label: "Risico & Strategie", href: "/risico-strategie" },
    { label: "FAQ", href: "/#faq" },
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
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/logo-wit.png" alt="TrustedPips" style={{ height: 32, width: "auto" }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>TrustedPips</span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                style={{ color: "#999", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "#999"}
              >{l.label}</a>
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
              style={{ color: "#fff", textDecoration: "none", fontSize: "1.3rem", fontWeight: 500 }}>{l.label}</a>
          ))}
          <Btn primary href="/hoe-het-werkt" onClick={() => setMobileOpen(false)} style={{ marginTop: 16 }}>Start nu</Btn>
        </div>
      )}
    </>
  )
}


/* ════════════════════════════════════════════════════ */
/*  OVER ONS PAGE                                       */
/* ════════════════════════════════════════════════════ */
export default function OverOnsPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .cta-buttons { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav />

      {/* ═══════ HERO ═══════ */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "center",
        position: "relative", padding: "160px 24px 80px", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-20%", left: "30%",
          width: 700, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT_DIM} 0%, transparent 70%)`,
          filter: "blur(120px)", pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #222, transparent)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", width: "100%", textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: ACCENT_DIM, borderRadius: 100, padding: "8px 18px", marginBottom: 32,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />
            <span style={{ color: ACCENT, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Over ons</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24,
          }}>
            Het gezicht achter{" "}
            <span style={{ color: ACCENT }}>TrustedPips</span>
          </h1>

          <p style={{
            color: "#999", fontSize: "1.15rem", lineHeight: 1.7,
            maxWidth: 580, margin: "0 auto",
          }}>
            Geen groot team. Geen kantoor op de Zuidas. Gewoon een doordachte aanpak, gebouwd vanuit overtuiging.
          </p>
        </div>
      </section>

      {/* ═══════ TEUN SECTION ═══════ */}
      <Section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-grid">
            {/* Photo */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                {/* Glow behind photo */}
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%", height: "80%", borderRadius: "50%",
                  background: `radial-gradient(circle, ${ACCENT_DIM} 0%, transparent 70%)`,
                  filter: "blur(40px)", pointerEvents: "none",
                }} />
                <div style={{
                  position: "relative",
                  width: "100%", maxWidth: 400,
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "1px solid #1a1a1a",
                }}>
                  <img
                    src="/teun.jpg"
                    alt="Teun — Founder TrustedPips"
                    style={{
                      width: "100%", height: "auto",
                      display: "block",
                      filter: "brightness(0.95) contrast(1.05)",
                    }}
                  />
                  {/* Name overlay */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                    padding: "40px 28px 24px",
                  }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>Teun</div>
                    <div style={{ color: ACCENT, fontSize: "0.85rem", fontWeight: 500 }}>Founder — TrustedPips</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <span style={{ color: ACCENT, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>De oprichter</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 24 }}>
                Maak kennis met <span style={{ color: ACCENT }}>Teun</span>
              </h2>

              <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 16 }}>
                De forexindustrie wordt grotendeels gedreven door marketing. Snelle beloftes, hoge winrates en focus op individuele trades.
              </p>
              <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 16 }}>
                Maar kapitaal groeit niet door losse trades. Kapitaal groeit door structuur.
              </p>
              <p style={{ color: "#ccc", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 28, fontWeight: 500 }}>
                TrustedPips is opgericht vanuit die overtuiging. Niet om trades te verkopen, maar om een model te bouwen waarin lange termijn resultaat centraal staat.
              </p>

              <div style={{
                background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 14,
                padding: "24px 28px",
              }}>
                <p style={{ color: "#888", fontSize: "0.92rem", fontStyle: "italic", lineHeight: 1.7 }}>
                  &ldquo;Wij behandelen trading als kapitaalbeheer. Niet als speculatie.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ WAAROM TRUSTEDPIPS ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
            padding: "48px 40px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />

            <span style={{ color: ACCENT, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Onze visie</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.2 }}>
              Waarom TrustedPips is <span style={{ color: ACCENT }}>opgericht</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.8 }}>
                De meeste traders vertrouwen op één strategie. Wanneer die strategie tijdelijk minder presteert, verdwijnt het rendement. Professionele structuren werken anders.
              </p>
              <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.8 }}>
                Kapitaal wordt verdeeld over meerdere strategieën, zodat prestaties niet afhankelijk zijn van één systeem. Dat is precies hoe TrustedPips is opgebouwd — met structuur, discipline en een lange termijn visie.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ WAARDEN ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Waar wij voor <span style={{ color: ACCENT }}>staan</span>
            </h2>
          </div>

          <div className="values-grid">
            {[
              {
                icon: "🎯",
                title: "Structuur boven speculatie",
                desc: "Wij geloven niet in losse trades of quick wins. Alles wat wij doen is gebouwd rondom structuur en herhaalbaar resultaat.",
                color: ACCENT,
              },
              {
                icon: "🛡️",
                title: "Risico als fundament",
                desc: "Rendement begint bij risicobeheer. Zonder controle over verlies is winst toeval. Dat is ons startpunt bij elke beslissing.",
                color: "#ef4444",
              },
              {
                icon: "🔍",
                title: "Transparantie als standaard",
                desc: "Jouw geld blijft van jou. Geen verborgen kosten, geen opnametoegang. Wij verdienen alleen wanneer jij verdient.",
                color: "#A78BFA",
              },
              {
                icon: "📊",
                title: "Portfolio-benadering",
                desc: "Niet afhankelijk van één systeem. Meerdere strategieën die samenwerken voor consistente resultaten.",
                color: "#FCD34D",
              },
              {
                icon: "⏳",
                title: "Lange termijn denken",
                desc: "Wij jagen geen maandelijkse uitschieters na. Wij bouwen aan duurzame groei over maanden en jaren.",
                color: "#4caf50",
              },
              {
                icon: "🤝",
                title: "Gelijke belangen",
                desc: "Onze winstverdeling is gebaseerd op performance. Wij groeien alleen wanneer jouw kapitaal groeit.",
                color: "#F472B6",
              },
            ].map((item, i) => {
              const [ref, visible] = useInView(0.12)
              return (
                <div key={i} ref={ref} style={{
                  background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 16,
                  padding: "32px 28px", position: "relative", overflow: "hidden",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ${i * 70}ms cubic-bezier(.23,1,.32,1)`,
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
                  <div style={{ fontSize: "1.5rem", marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ═══════ NIET / WEL ═══════ */}
      <Section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="about-grid">
            {/* Wat wij NIET doen */}
            <div style={{
              background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
              padding: "36px 32px",
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 24, color: "#ef4444" }}>Wat wij niet doen</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Signalen verkopen",
                  "Signal groups runnen",
                  "\"Get rich quick\" beloven",
                  "Toegang tot jouw geld vragen",
                  "Onrealistische rendementen garanderen",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(239,68,68,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{ color: "#ef4444", fontSize: "0.75rem", fontWeight: 700 }}>✕</span>
                    </span>
                    <span style={{ color: "#999", fontSize: "0.9rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wat wij WEL doen */}
            <div style={{
              background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 20,
              padding: "36px 32px",
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 24, color: "#4caf50" }}>Wat wij wel doen</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Kapitaal structureel laten groeien",
                  "Risico altijd op de eerste plaats zetten",
                  "Meerdere strategieën combineren",
                  "Volledig transparant opereren",
                  "Lange termijn resultaat nastreven",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(76,175,80,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
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
            Klaar om te beginnen met{" "}
            <span style={{ color: ACCENT }}>TrustedPips</span>?
          </h2>
          <p style={{ color: "#888", fontSize: "1rem", marginBottom: 36, position: "relative" }}>
            Bekijk hoe het werkt of ontdek onze strategieën.
          </p>
          <div className="cta-buttons" style={{ position: "relative" }}>
            <Btn primary href="/hoe-het-werkt">Hoe het werkt</Btn>
            <Btn href="/risico-strategie">Risico & Strategie →</Btn>
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
            <a href="/" style={{ color: "#555", fontSize: "0.85rem", textDecoration: "none" }}>Home</a>
            <a href="#" style={{ color: "#555", fontSize: "0.85rem", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "#555", fontSize: "0.85rem", textDecoration: "none" }}>Voorwaarden</a>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 32, borderTop: "1px solid #111" }}>
          <p style={{ color: "#444", fontSize: "0.75rem", lineHeight: 1.7 }}>
            <strong style={{ color: "#555" }}>Risicowaarschuwing:</strong> Trading in forex en CFDs brengt aanzienlijke risicos met zich mee en is niet geschikt voor alle investeerders. Je kunt (een deel van) je investering verliezen. Resultaten uit het verleden bieden geen garantie voor toekomstige resultaten. Investeer alleen geld dat je kunt missen.
          </p>
        </div>
      </footer>
    </div>
  )
}
