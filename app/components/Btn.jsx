"use client"
import { useState } from "react"

const ACCENT = "#89FBF6"

export default function Btn({ children, primary, glass, href = "#", onClick, style: s = {} }) {
  const [hovered, setHovered] = useState(false)

  const glassStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: primary ? "13px 32px" : "13px 32px",
    borderRadius: 100,
    fontSize: "0.95rem",
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    outline: "none",
    transition: "all 0.2s ease",
    transform: hovered ? "translateY(-1px)" : "translateY(0)",
    userSelect: "none",
    position: "relative",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    ...(primary
      ? {
          // Teal glass variant
          color: "#89FBF6",
          textShadow: "0 0 12px rgba(137,251,246,0.3), 0 1px 6px rgba(0,0,0,0.5)",
          background: hovered
            ? "linear-gradient(160deg, rgba(137,251,246,0.20) 0%, rgba(137,251,246,0.09) 40%, rgba(0,0,0,0.12) 100%)"
            : "linear-gradient(160deg, rgba(137,251,246,0.14) 0%, rgba(137,251,246,0.06) 40%, rgba(0,0,0,0.18) 100%)",
          boxShadow: hovered
            ? "0 0 0 1px rgba(137,251,246,0.32), 0 1px 0 0 rgba(137,251,246,0.40) inset, 0 -1px 0 0 rgba(0,0,0,0.30) inset, 0 12px 40px rgba(0,0,0,0.50), 0 0 32px rgba(137,251,246,0.12)"
            : "0 0 0 1px rgba(137,251,246,0.22), 0 1px 0 0 rgba(137,251,246,0.32) inset, 0 -1px 0 0 rgba(0,0,0,0.35) inset, 0 8px 32px rgba(0,0,0,0.45), 0 0 22px rgba(137,251,246,0.07)",
        }
      : {
          // White glass variant
          color: hovered ? "#fff" : "rgba(255,255,255,0.92)",
          textShadow: "0 1px 8px rgba(0,0,0,0.6)",
          background: hovered
            ? "linear-gradient(160deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.12) 100%)"
            : "linear-gradient(160deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.18) 100%)",
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,0.20), 0 1px 0 0 rgba(255,255,255,0.35) inset, 0 -1px 0 0 rgba(0,0,0,0.30) inset, 0 12px 40px rgba(0,0,0,0.50), 0 2px 10px rgba(0,0,0,0.30)"
            : "0 0 0 1px rgba(255,255,255,0.14), 0 1px 0 0 rgba(255,255,255,0.28) inset, 0 -1px 0 0 rgba(0,0,0,0.35) inset, 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.30)",
        }),
    ...s,
  }

  const defaultStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: primary ? "16px 36px" : "14px 28px",
    borderRadius: 10,
    fontSize: "0.95rem",
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.35s cubic-bezier(.23,1,.32,1)",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    ...(primary
      ? {
          background: hovered ? "#a5fdf9" : ACCENT,
          color: "#000",
          border: "none",
          boxShadow: hovered
            ? "0 8px 30px rgba(137,251,246,0.35), 0 2px 8px rgba(137,251,246,0.2)"
            : "0 0 0 rgba(137,251,246,0)",
        }
      : {
          background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
          color: "#fff",
          border: `1px solid ${hovered ? "#555" : "#333"}`,
          boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.3)" : "none",
        }),
    ...s,
  }

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={glass ? glassStyle : defaultStyle}
    >
      {children}
    </a>
  )
}
