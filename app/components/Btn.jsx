"use client"

import { useState } from "react"

const ACCENT = "#89FBF6"

export default function Btn({ children, primary, href = "#", onClick, style: s = {} }) {
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
              boxShadow: hovered ? "0 8px 30px rgba(137,251,246,0.35), 0 2px 8px rgba(137,251,246,0.2)" : "0 0 0 rgba(137,251,246,0)",
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
