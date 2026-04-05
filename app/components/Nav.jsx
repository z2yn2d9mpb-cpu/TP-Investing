"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Btn from "./Btn"

const allLinks = [
  { label: "Home", href: "/" },
  { label: "Hoe het werkt", href: "/hoe-het-werkt" },
  { label: "Risico & Strategie", href: "/risico-strategie" },
  { label: "Over ons", href: "/over-ons" },
  { label: "FAQ", href: "/#faq" },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const links = allLinks

  // Determine CTA href based on current page
  const ctaHref = pathname === "/hoe-het-werkt" ? "#stappen" : "/hoe-het-werkt"

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
              >
                {l.label}
              </a>
            ))}
            <Btn glass primary href={ctaHref} style={{ padding: "10px 24px", fontSize: "0.85rem" }}>Start nu</Btn>
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
            <a key={l.href} href={l.href}
              style={{ color: "#fff", textDecoration: "none", fontSize: "1.3rem", fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
          <Btn glass primary href={ctaHref} style={{ marginTop: 16 }}>Start nu</Btn>
        </div>
      )}
    </>
  )
}
