"use client"

export default function Footer() {
  return (
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
  )
}
