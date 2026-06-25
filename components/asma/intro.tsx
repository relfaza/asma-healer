"use client"

import { useEffect, useState } from "react"
import { Activity } from "lucide-react"
import { C, splashGradient } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"
import { Toggle } from "./shared"

export function SplashScreen({ go }: { go: (s: Screen) => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 4, 100))
    }, 70)
    const timer = setTimeout(() => go("onboarding"), 2000)
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [go])

  return (
    <div
      style={{
        height: "100%",
        background: splashGradient,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 28,
          background: C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          animation: "asmaPulse 1.8s ease-in-out infinite",
        }}
      >
        <Activity size={48} color={C.primary} strokeWidth={2.4} />
      </div>
      <h1 style={{ color: C.white, fontWeight: 800, fontSize: 30, marginTop: 22, letterSpacing: -0.5 }}>AsmaHealer</h1>
      <p style={{ color: C.light2, fontSize: 14, marginTop: 6 }}>Deteksi Dini Asma · Metode SAW</p>

      <div style={{ position: "absolute", bottom: 56, width: 180 }}>
        <div style={{ height: 5, borderRadius: 50, background: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: C.white,
              borderRadius: 50,
              transition: "width .1s linear",
            }}
          />
        </div>
        <p style={{ color: C.light2, fontSize: 11, textAlign: "center", marginTop: 10 }}>Memuat...</p>
      </div>

      <style>{`
        @keyframes asmaPulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}

const SLIDES = [
  {
    emoji: "🫁",
    title: "Kenali Gejala Asma",
    desc: "Lakukan self-screening sederhana untuk mengenali gejala asma sejak dini, kapan saja dan di mana saja.",
  },
  {
    emoji: "🧠",
    title: "Teknologi MADM",
    desc: "Menggunakan metode SAW (Simple Additive Weighting) untuk menilai tingkat risiko Anda secara objektif.",
  },
  {
    emoji: "📊",
    title: "Hasil Instan & Jelas",
    desc: "Dapatkan skor risiko, kategori, serta rekomendasi tindakan yang mudah dipahami dalam hitungan detik.",
  },
]

export function OnboardingScreen({ go }: { go: (s: Screen) => void }) {
  const [i, setI] = useState(0)
  const last = i === SLIDES.length - 1
  const slide = SLIDES[i]

  return (
    <div style={{ height: "100%", background: C.white, display: "flex", flexDirection: "column", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 16 }}>
        <button
          type="button"
          onClick={() => go("login")}
          style={{ background: "transparent", border: "none", color: C.caption, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          Lewati
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: C.light,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            marginBottom: 32,
          }}
        >
          {slide.emoji}
        </div>
        <h2 style={{ color: C.heading, fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{slide.title}</h2>
        <p style={{ color: C.body, fontSize: 15, lineHeight: 1.6, maxWidth: 300 }}>{slide.desc}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
        {SLIDES.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === i ? 24 : 8,
              height: 8,
              borderRadius: 50,
              background: idx === i ? C.primary : C.light2,
              transition: "all .25s ease",
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => (last ? go("login") : setI(i + 1))}
        style={{
          background: C.primary,
          color: C.white,
          border: "none",
          borderRadius: 50,
          padding: "15px",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {last ? "Mulai Sekarang" : "Selanjutnya"}
      </button>
    </div>
  )
}
