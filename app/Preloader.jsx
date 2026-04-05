"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    if (sessionStorage.getItem("preloaderShown")) {
      setPhase("done");
      return;
    }

    sessionStorage.setItem("preloaderShown", "true");
    setPhase("enter");

    const holdTimer = setTimeout(() => setPhase("exit"), 3100);
    const doneTimer = setTimeout(() => setPhase("done"), 3900);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done" || phase === "loading") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition:
          phase === "exit"
            ? "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
      }}
    >
      <img
        src="/logo-wit.svg"
        alt="TrustedPips"
        style={{
          width: 100,
          height: 100,
          objectFit: "contain",
          opacity: phase === "enter" ? 0 : 1,
          transform:
            phase === "enter" ? "translateY(40px)" : "translateY(0)",
          transition:
            "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}
        onLoad={() => setPhase("visible")}
      />
    </div>
  );
}
