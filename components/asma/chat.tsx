"use client"

import { useState } from "react"
import { ArrowLeft, Paperclip, Send, Phone, Video } from "lucide-react"
import { C } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"

type Msg = { id: string; from: "doctor" | "patient" | "system"; text: string; time?: string }

const INITIAL: Msg[] = [
  { id: "m1", from: "doctor",  text: "Halo! Ada yang bisa saya bantu? 😊",                           time: "09:41" },
  { id: "m2", from: "patient", text: "Hasil skrining risiko sedang dok",                              time: "09:42" },
  { id: "m3", from: "doctor",  text: "Sudah berapa lama sesak napasnya?",                             time: "09:42" },
  { id: "m4", from: "patient", text: "2 minggu dok, terutama malam hari",                             time: "09:43" },
  { id: "m5", from: "doctor",  text: "Saya sarankan spirometri. Ada riwayat alergi?",                 time: "09:44" },
  { id: "s1", from: "system",  text: "⚠️ Ini simulasi chat untuk prototype. Konsultasi resmi memerlukan tatap muka." },
]

export function ChatScreen({ go }: { go: (s: Screen) => void }) {
  const [messages, setMessages] = useState<Msg[]>(INITIAL)
  const [draft, setDraft] = useState("")

  const send = () => {
    if (!draft.trim()) return
    const time = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    setMessages((prev) => [...prev, { id: "u" + Date.now(), from: "patient", text: draft.trim(), time }])
    setDraft("")
  }

  return (
    <div style={{ height: "100%", background: "#F0F4F8", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div
        style={{
          padding: "48px 16px 12px",
          background: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={() => go("dokter")}
          style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Doctor avatar */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.5)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            SR
          </div>
          {/* Online dot */}
          <span
            style={{
              position: "absolute",
              bottom: 1,
              right: 1,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#4CAF50",
              border: "2px solid #1565C0",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>dr. Siti Rahayu Sp.P</p>
          <p style={{ fontSize: 12, color: "#A5D6A7", fontWeight: 600 }}>● Online</p>
        </div>

        {/* Action buttons */}
        <button type="button" style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
          <Phone size={18} />
        </button>
        <button type="button" style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
          <Video size={18} />
        </button>
      </div>

      {/* Message list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m) => {
          // System message
          if (m.from === "system") {
            return (
              <div key={m.id} style={{ textAlign: "center", margin: "6px auto", maxWidth: 290 }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(0,0,0,0.08)",
                    color: C.caption,
                    fontSize: 12,
                    lineHeight: 1.55,
                    borderRadius: 12,
                    padding: "8px 14px",
                    fontStyle: "italic",
                  }}
                >
                  {m.text}
                </span>
              </div>
            )
          }

          const mine = m.from === "patient"
          return (
            <div key={m.id} style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
              {/* Doctor avatar on left */}
              {!mine && (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: C.light,
                    color: C.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  SR
                </div>
              )}

              <div style={{ maxWidth: "72%" }}>
                <div
                  style={{
                    background: mine ? C.primary : C.white,
                    color: mine ? C.white : C.heading,
                    borderRadius: 18,
                    borderBottomRightRadius: mine ? 4 : 18,
                    borderBottomLeftRadius: mine ? 18 : 4,
                    padding: "10px 14px",
                    fontSize: 14,
                    lineHeight: 1.5,
                    boxShadow: mine
                      ? "0 2px 8px rgba(21,101,192,0.25)"
                      : "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  {m.text}
                </div>
                {m.time && (
                  <p style={{ fontSize: 11, color: C.caption, marginTop: 3, textAlign: mine ? "right" : "left" }}>
                    {m.time}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Input bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px 20px",
          background: C.white,
          borderTop: `1px solid ${C.light}`,
          boxShadow: "0 -2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <button
          type="button"
          style={{ background: C.bg, border: "none", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.caption, flexShrink: 0 }}
        >
          <Paperclip size={20} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ketik pesan..."
          style={{
            flex: 1,
            border: `1.5px solid ${C.light2}`,
            borderRadius: 50,
            padding: "10px 18px",
            fontSize: 14,
            outline: "none",
            color: C.heading,
            background: C.bg,
          }}
        />
        <button
          type="button"
          onClick={send}
          aria-label="Kirim"
          style={{
            background: draft.trim() ? C.primary : C.light2,
            border: "none",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: draft.trim() ? "pointer" : "default",
            flexShrink: 0,
            transition: "background .2s",
          }}
        >
          <Send size={19} color={draft.trim() ? C.white : C.caption} />
        </button>
      </div>
    </div>
  )
}
