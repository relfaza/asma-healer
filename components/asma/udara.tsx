"use client"

import { useState } from "react"
import { ArrowLeft, Bell, BellOff, MapPin, Wind } from "lucide-react"
import { C, shadowCard } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"
import { Card, Toggle } from "./shared"
import { AqiGauge, aqiInfo, ForecastChart, ValueBar } from "./widgets"

const AQI = 78

const POLLUTANTS = [
  { name: "PM2.5", value: 28, max: 100, unit: "µg/m³" },
  { name: "PM10",  value: 52, max: 150, unit: "µg/m³" },
  { name: "O₃",   value: 38, max: 120, unit: "ppb"   },
  { name: "NO₂",  value: 22, max: 100, unit: "ppb"   },
  { name: "CO",   value: 5,  max: 30,  unit: "ppm"   },
  { name: "SO₂",  value: 12, max: 75,  unit: "ppb"   },
]

const FORECAST = [65, 72, 78, 82, 86, 80, 74, 68]
const HOURS    = ["10", "11", "12", "13", "14", "15", "16", "17"]

function pollutantColor(ratio: number) {
  if (ratio > 0.66) return C.red
  if (ratio > 0.4)  return "#EF6C00"
  return C.green
}

export function UdaraScreen({ go }: { go: (s: Screen) => void }) {
  const [notif, setNotif] = useState(true)
  const info = aqiInfo(AQI)

  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto", paddingBottom: 28 }}>
      {/* Header */}
      <div
        style={{
          padding: "52px 20px 16px",
          background: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
          color: C.white,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <button
            type="button"
            onClick={() => go("home")}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.white }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: 19, fontWeight: 800 }}>Kualitas Udara</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, opacity: 0.85, marginLeft: 48 }}>
          <MapPin size={14} />
          <span>Yogyakarta · {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB</span>
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* AQI Gauge card */}
        <Card style={{ textAlign: "center", paddingTop: 24, paddingBottom: 20 }}>
          <p style={{ fontSize: 13, color: C.caption, marginBottom: 14 }}>Indeks Kualitas Udara (AQI US)</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AqiGauge value={AQI} />
          </div>
          <div
            style={{
              marginTop: 16,
              display: "inline-block",
              background: info.color + "1A",
              color: info.color,
              borderRadius: 50,
              padding: "6px 20px",
              fontSize: 13.5,
              fontWeight: 800,
            }}
          >
            Udara {info.label}
          </div>
          <p style={{ fontSize: 12.5, color: C.caption, marginTop: 8 }}>
            Aman untuk aktivitas ringan di luar ruangan
          </p>
        </Card>

        {/* 6 pollutant mini-cards (2×3 grid) */}
        <h3 style={{ fontSize: 15, fontWeight: 800, color: C.heading, margin: "20px 0 10px" }}>
          Rincian Polutan
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          {POLLUTANTS.map((p) => {
            const ratio = p.value / p.max
            const col = pollutantColor(ratio)
            return (
              <div
                key={p.name}
                style={{
                  background: C.white,
                  borderRadius: 14,
                  padding: "12px 10px",
                  boxShadow: shadowCard,
                  textAlign: "center",
                  border: `1px solid ${col}30`,
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 800, color: C.heading, marginBottom: 4 }}>{p.name}</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: col, lineHeight: 1 }}>{p.value}</p>
                <p style={{ fontSize: 10, color: C.caption, marginTop: 2 }}>{p.unit}</p>
                <div style={{ marginTop: 6 }}>
                  <ValueBar value={p.value} max={p.max} color={col} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Forecast chart */}
        <h3 style={{ fontSize: 15, fontWeight: 800, color: C.heading, margin: "20px 0 10px" }}>
          Prakiraan 8 Jam ke Depan
        </h3>
        <Card>
          <ForecastChart values={FORECAST} labels={HOURS} />
        </Card>

        {/* Tip card */}
        <Card style={{ marginTop: 14, background: "#E3F2FD", border: `1px solid ${C.light2}` }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Wind size={20} color={C.primary} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: C.heading }}>
                Tips untuk Penderita Asma
              </h3>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.55, marginTop: 4 }}>
                Kualitas udara sedang. Boleh beraktivitas ringan di luar, namun selalu bawa inhaler dan hindari area berdebu.
              </p>
            </div>
          </div>
        </Card>

        {/* Notification toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: C.white,
            borderRadius: 16,
            boxShadow: shadowCard,
            padding: 16,
            marginTop: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: notif ? "#E3F2FD" : C.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {notif
                ? <Bell size={18} color={C.primary} />
                : <BellOff size={18} color={C.caption} />
              }
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>Notifikasi Kualitas Udara</p>
              <p style={{ fontSize: 12, color: C.caption, marginTop: 2 }}>
                {notif ? "Aktif · beri tahu saat AQI memburuk" : "Nonaktif"}
              </p>
            </div>
          </div>
          <Toggle on={notif} onChange={setNotif} />
        </div>
      </div>
    </div>
  )
}
