"use client"

import { Phone, PhoneCall, X } from "lucide-react"
import { C } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"

const STEPS = [
  { emoji: "🧘", text: "Duduk tegak, jangan berbaring. Tetap tenang dan atur napas secara perlahan dan dalam." },
  { emoji: "💨", text: "Gunakan inhaler pereda (bronkodilator) sebanyak 2–4 semprotan segera." },
  { emoji: "⏱️", text: "Tunggu 20 menit. Jika belum membaik, ulangi pemberian inhaler." },
  { emoji: "🚫", text: "Hindari pemicu: asap rokok, debu, udara dingin, dan aktivitas berat." },
  { emoji: "🏥", text: "Tidak membaik dalam 1 jam? Segera ke IGD rumah sakit terdekat." },
]

export function DaruratScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        background: "linear-gradient(165deg, #C62828 0%, #8B0000 100%)",
        color: C.white,
        paddingBottom: 32,
      }}
    >
      {/* Top bar */}
      <div style={{ padding: "44px 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.75 }}>
          DARURAT / SOS
        </span>
        <button
          type="button"
          onClick={() => go("home")}
          aria-label="Tutup"
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: 12,
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.white,
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Hero icon */}
      <div style={{ textAlign: "center", padding: "8px 20px 12px" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 6px",
            animation: "asmaEmergencyPulse 1.4s ease-in-out infinite",
            boxShadow: "0 0 0 0 rgba(255,255,255,0.4)",
          }}
        >
          <span style={{ fontSize: 52, lineHeight: 1 }}>🚨</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginTop: 12, lineHeight: 1.2 }}>
          Penanganan Darurat Asma
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", marginTop: 6, lineHeight: 1.5 }}>
          Ikuti langkah berikut dengan tenang dan teratur.
        </p>
      </div>

      {/* Steps */}
      <div style={{ padding: "12px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              background: C.white,
              borderRadius: 18,
              padding: "14px 14px",
              animation: "asmaFadeUp .4s ease both",
              animationDelay: `${i * 0.08}s`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                minWidth: 34,
                height: 34,
                borderRadius: "50%",
                background: "#FFEBEE",
                color: C.red,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <span style={{ fontSize: 24, flexShrink: 0, marginTop: 4 }}>{s.emoji}</span>
            <p style={{ fontSize: 13.5, color: C.body, lineHeight: 1.55 }}>{s.text}</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ padding: "22px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: C.white,
            color: "#C62828",
            border: "none",
            borderRadius: 50,
            padding: "15px",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          <PhoneCall size={20} />
          📞 Hubungi 119
        </button>

        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "rgba(255,255,255,0.12)",
            color: C.white,
            border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: 50,
            padding: "14px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Phone size={18} />
          📞 Hubungi Dokter
        </button>
      </div>

      {/* Back button */}
      <div style={{ padding: "16px 16px 0" }}>
        <button
          type="button"
          onClick={() => go("home")}
          style={{
            width: "100%",
            background: "rgba(0,0,0,0.2)",
            color: "rgba(255,255,255,0.85)",
            border: "none",
            borderRadius: 50,
            padding: "13px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ✅ Saya sudah membaik → Kembali
        </button>
      </div>
    </div>
  )
}
