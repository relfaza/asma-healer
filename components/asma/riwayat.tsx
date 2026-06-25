"use client"

import { ArrowLeft, ChevronRight, Trash2, Inbox } from "lucide-react"
import { C, shadowCard, headerGradient } from "@/lib/asma-theme"
import type { Screen, HistoryItem } from "@/lib/asma-nav"
import { PrimaryButton, RiskBadge } from "./shared"

export function RiwayatScreen({
  go,
  history,
  onOpen,
}: {
  go: (s: Screen) => void
  history: HistoryItem[]
  onOpen: (item: HistoryItem) => void
}) {
  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto", paddingBottom: 84 }}>
      <div style={{ padding: "52px 20px 18px", background: C.white, borderBottom: `1px solid ${C.light}` }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.heading }}>Riwayat Skrining</h1>
        <p style={{ fontSize: 14, color: C.body, marginTop: 2 }}>{history.length} hasil tersimpan</p>
      </div>

      <div style={{ padding: 16 }}>
        {history.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: C.caption }}>
            <Inbox size={40} style={{ margin: "0 auto 12px" }} />
            <p style={{ fontSize: 14 }}>Belum ada riwayat skrining.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {history.map((h) => {
              const ring = h.risk === "Rendah" ? C.green : h.risk === "Sedang" ? C.yellow : C.red
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => onOpen(h)}
                  style={{ display: "flex", alignItems: "center", gap: 14, background: C.white, border: "none", borderRadius: 16, padding: 14, boxShadow: shadowCard, cursor: "pointer", textAlign: "left" }}
                >
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: ring + "1A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: ring, lineHeight: 1 }}>{h.score}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>{h.date}</p>
                    <div style={{ marginTop: 6 }}>
                      <RiskBadge risk={h.risk} size="sm" />
                    </div>
                  </div>
                  <ChevronRight size={18} color={C.caption} />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export function DetailScreen({
  go,
  item,
  onDelete,
}: {
  go: (s: Screen) => void
  item: HistoryItem
  onDelete: (id: string) => void
}) {
  const ring = item.risk === "Rendah" ? C.green : item.risk === "Sedang" ? C.yellow : C.red

  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto" }}>
      <div style={{ background: headerGradient, padding: "52px 20px 34px", borderBottomLeftRadius: 26, borderBottomRightRadius: 26, color: C.white }}>
        <button type="button" onClick={() => go("riwayat")} style={{ background: "none", border: "none", color: C.white, cursor: "pointer", marginBottom: 14 }}>
          <ArrowLeft size={22} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", border: `4px solid ${C.white}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: C.light2 }}>Skor</span>
            <span style={{ fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{item.score}</span>
          </div>
          <div>
            <span style={{ background: C.white, color: ring, borderRadius: 50, padding: "5px 14px", fontSize: 13, fontWeight: 800 }}>
              Risiko {item.risk}
            </span>
            <p style={{ fontSize: 13, color: C.light2, marginTop: 8 }}>{item.date}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: C.heading, marginBottom: 12 }}>Jawaban Anda</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {item.answers.map((a) => (
            <div key={a.id} style={{ background: C.white, borderRadius: 14, boxShadow: shadowCard, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{a.id}</span>
                <span style={{ background: C.light, color: C.primary, borderRadius: 50, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>
                  Nilai {a.value}
                </span>
              </div>
              <p style={{ fontSize: 13, color: C.caption, lineHeight: 1.4 }}>{a.question}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.heading, marginTop: 4 }}>{a.label}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, marginBottom: 24 }}>
          <PrimaryButton variant="danger" onClick={() => onDelete(item.id)}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <Trash2 size={16} /> Hapus Riwayat
            </span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
