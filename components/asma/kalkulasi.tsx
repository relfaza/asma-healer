"use client"

import { useEffect, useState } from "react"
import { C } from "@/lib/asma-theme"

const STEPS = [
  "Membaca jawaban skrining...",
  "Menormalisasi nilai kriteria...",
  "Menerapkan bobot SAW...",
  "Menghitung skor akhir...",
  "Mengklasifikasikan risiko...",
]

export function KalkulasiScreen() {
  const [stepIdx, setStepIdx] = useState(0)

  // Cycle through step labels every ~380 ms so users can see the "work" happening
  useEffect(() => {
    const id = setInterval(() => {
      setStepIdx((i) => (i + 1) % STEPS.length)
    }, 380)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* Inject keyframes once — avoids needing a global CSS file change */}
      <style>{`
        @keyframes kalkulasiSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes kalkulasiPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1);   }
        }
        @keyframes kalkulasiFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <div
        style={{
          height: "100%",
          background: `linear-gradient(160deg, ${C.primary} 0%, ${C.dark} 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 28px",
          gap: 32,
        }}
      >
        {/* Spinner ring */}
        <div style={{ position: "relative", width: 120, height: 120 }}>
          {/* Outer track */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "6px solid rgba(255,255,255,0.15)",
            }}
          />
          {/* Spinning arc */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "6px solid transparent",
              borderTopColor: "#fff",
              borderRightColor: "rgba(255,255,255,0.4)",
              animation: "kalkulasiSpin 0.9s linear infinite",
            }}
          />
          {/* Centre icon */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
            }}
          >
            🧮
          </div>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.3,
              marginBottom: 10,
            }}
          >
            Sedang menghitung risiko asma Anda...
          </h1>
          <p
            style={{
              fontSize: 13.5,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
            }}
          >
            Metode SAW (Simple Additive Weighting)
          </p>
        </div>

        {/* Animated step label */}
        <div
          key={stepIdx}
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 50,
            padding: "10px 22px",
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            animation: "kalkulasiFadeIn 0.3s ease both",
          }}
        >
          {STEPS[stepIdx]}
        </div>

        {/* Pulsing dots */}
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.8)",
                animation: `kalkulasiPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
