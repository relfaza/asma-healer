"use client"

import { Bell, ChevronRight, Plus, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react"
import { C, shadowCard, headerGradient } from "@/lib/asma-theme"
import type { Screen, HistoryItem } from "@/lib/asma-nav"
import { Card, RiskBadge } from "./shared"

const ARTICLES = [
  { title: "5 Pemicu Asma yang Sering Tidak Disadari", tag: "Edukasi", emoji: "🌬️" },
  { title: "Cara Tepat Menggunakan Inhaler", tag: "Tips", emoji: "💊" },
]

export function HomeScreen({
  go,
  history,
  onStart,
}: {
  go: (s: Screen) => void
  history: HistoryItem[]
  onStart: () => void
}) {
  const last = history[0]
  const total = history.length
  const rendah = history.filter((h) => h.risk === "Rendah").length
  const sedang = history.filter((h) => h.risk === "Sedang").length

  return (
    <div style={{ height: "100%", overflowY: "auto", background: C.bg, paddingBottom: 84 }}>
      <div style={{ background: headerGradient, padding: "52px 20px 56px", borderBottomLeftRadius: 26, borderBottomRightRadius: 26, color: C.white }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: 14, color: C.light2 }}>Selamat pagi 👋</p>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginTop: 2 }}>Andi Pratama</h1>
          </div>
          <button
            type="button"
            onClick={() => go("notif")}
            style={{ position: "relative", background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 12, width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <Bell size={20} color={C.white} />
            <span style={{ position: "absolute", top: 9, right: 10, width: 8, height: 8, borderRadius: "50%", background: "#FF5252", border: `2px solid ${C.dark}` }} />
          </button>
        </div>

        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 14, marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 12, color: C.light2 }}>Skrining terakhir</p>
            {last ? (
              <p style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>
                Skor {last.score} · {last.date}
              </p>
            ) : (
              <p style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>Belum ada data</p>
            )}
          </div>
          {last && (
            <span style={{ background: C.white, color: last.risk === "Rendah" ? C.green : last.risk === "Sedang" ? C.yellow : C.red, borderRadius: 50, padding: "5px 12px", fontSize: 12, fontWeight: 700 }}>
              {last.risk}
            </span>
          )}
        </div>
      </div>

      <div style={{ padding: "0 16px", marginTop: -36 }}>
        <button
          type="button"
          onClick={onStart}
          style={{ width: "100%", textAlign: "left", background: headerGradient, color: C.white, border: "none", borderRadius: 20, padding: 18, boxShadow: "0 8px 24px rgba(21,101,192,0.35)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 800 }}>Mulai Skrining Baru</h3>
            <p style={{ fontSize: 13, color: C.light2, marginTop: 4 }}>5 pertanyaan singkat · 1 menit</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 14, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={24} color={C.white} />
          </div>
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16 }}>
          <StatCard icon={<TrendingUp size={18} color={C.primary} />} value={total} label="Total Skrining" />
          <StatCard icon={<ShieldCheck size={18} color={C.green} />} value={rendah} label="Risiko Rendah" />
          <StatCard icon={<AlertTriangle size={18} color={C.yellow} />} value={sedang} label="Risiko Sedang" />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22, marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: C.heading }}>Artikel Kesehatan</h3>
          <button
            type="button"
            onClick={() => go("info")}
            style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Lihat semua
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ARTICLES.map((a) => (
            <button
              key={a.title}
              type="button"
              onClick={() => go("info")}
              style={{ display: "flex", alignItems: "center", gap: 12, background: C.white, border: "none", borderRadius: 16, padding: 12, boxShadow: shadowCard, cursor: "pointer", textAlign: "left" }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 12, background: C.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                {a.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>{a.tag}</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.heading, marginTop: 2, lineHeight: 1.3 }}>{a.title}</p>
              </div>
              <ChevronRight size={18} color={C.caption} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <Card style={{ padding: 12, textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>{icon}</div>
      <p style={{ fontSize: 22, fontWeight: 800, color: C.heading, lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 10.5, color: C.caption, marginTop: 4, lineHeight: 1.2 }}>{label}</p>
    </Card>
  )
}
