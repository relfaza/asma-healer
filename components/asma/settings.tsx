"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight, Lock, Trash2, Shield, Info } from "lucide-react"
import { C, shadowCard } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"
import { SectionHeader, SegmentSelector, Toggle } from "./shared"

export function SettingsScreen({ go }: { go: (s: Screen) => void }) {
  const [reminderOn, setReminderOn] = useState(true)
  const [airOn, setAirOn] = useState(true)
  const [freq, setFreq] = useState("Mingguan")
  const [dark, setDark] = useState(false)
  const [textSize, setTextSize] = useState("M")
  const [lang, setLang] = useState("Indonesia")

  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto", paddingBottom: 28 }}>
      {/* Header */}
      <div
        style={{
          padding: "52px 20px 16px",
          background: C.white,
          borderBottom: `1px solid ${C.light}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={() => go("profil")}
          style={{ background: "none", border: "none", color: C.heading, cursor: "pointer" }}
        >
          <ArrowLeft size={22} />
        </button>
        <h1 style={{ fontSize: 19, fontWeight: 800, color: C.heading }}>Pengaturan</h1>
      </div>

      <div style={{ padding: 16 }}>
        {/* Notifikasi */}
        <SectionHeader>Notifikasi</SectionHeader>
        <div style={{ background: C.white, borderRadius: 16, boxShadow: shadowCard, overflow: "hidden", marginBottom: 22 }}>
          <ToggleRow
            label="Pengingat skrining rutin"
            sub="Ingatkan saya untuk skrining berkala"
            on={reminderOn}
            onChange={setReminderOn}
            first
          />
          <ToggleRow
            label="Notifikasi kualitas udara (AQI)"
            sub="Peringatan saat udara tidak sehat"
            on={airOn}
            onChange={setAirOn}
          />
          <div style={{ padding: "12px 16px 16px", borderTop: `1px solid ${C.light}` }}>
            <p style={{ fontSize: 13.5, color: C.heading, fontWeight: 700, marginBottom: 10 }}>
              Frekuensi pengingat
            </p>
            <SegmentSelector options={["Harian", "Mingguan", "Bulanan"]} value={freq} onChange={setFreq} />
          </div>
        </div>

        {/* Tampilan */}
        <SectionHeader>Tampilan</SectionHeader>
        <div style={{ background: C.white, borderRadius: 16, boxShadow: shadowCard, overflow: "hidden", marginBottom: 22 }}>
          <ToggleRow
            label="Mode gelap"
            sub="Tema gelap untuk kenyamanan malam"
            on={dark}
            onChange={setDark}
            first
          />
          <div style={{ padding: "12px 16px 14px", borderTop: `1px solid ${C.light}` }}>
            <p style={{ fontSize: 13.5, color: C.heading, fontWeight: 700, marginBottom: 10 }}>Ukuran teks</p>
            <SegmentSelector options={["S", "M", "L"]} value={textSize} onChange={setTextSize} />
          </div>
          <div style={{ padding: "12px 16px 16px", borderTop: `1px solid ${C.light}` }}>
            <p style={{ fontSize: 13.5, color: C.heading, fontWeight: 700, marginBottom: 10 }}>Bahasa</p>
            <SegmentSelector options={["Indonesia", "English"]} value={lang} onChange={setLang} />
          </div>
        </div>

        {/* Akun */}
        <SectionHeader>Akun</SectionHeader>
        <div style={{ background: C.white, borderRadius: 16, boxShadow: shadowCard, overflow: "hidden", marginBottom: 22 }}>
          <NavRow icon={Lock} label="Ubah kata sandi" first />
          <NavRow icon={Shield} label="Kebijakan privasi" />
          <NavRow icon={Trash2} label="Hapus akun" danger />
        </div>

        {/* Tentang */}
        <SectionHeader>Tentang</SectionHeader>
        <div style={{ background: C.white, borderRadius: 16, boxShadow: shadowCard, overflow: "hidden", marginBottom: 20 }}>
          <NavRow icon={Info} label="Versi aplikasi" value="1.0.0" first />
        </div>

        {/* SAW-MADM explanation */}
        <div
          style={{
            background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
            borderRadius: 18,
            padding: 18,
            border: `1px solid ${C.light2}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🧮</span>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: C.heading }}>Tentang SAW-MADM</h3>
          </div>
          <p style={{ fontSize: 13, color: C.body, lineHeight: 1.65 }}>
            AsmaHealer menggunakan metode{" "}
            <strong style={{ color: C.primary }}>Simple Additive Weighting (SAW)</strong>, salah satu
            pendekatan <strong style={{ color: C.primary }}>Multi-Attribute Decision Making (MADM)</strong>.
          </p>
          <p style={{ fontSize: 13, color: C.body, lineHeight: 1.65, marginTop: 8 }}>
            Setiap jawaban skrining dinormalisasi lalu dikalikan bobot kriteria masing-masing, kemudian
            dijumlahkan menjadi skor risiko 0–1 yang dikategorikan sebagai{" "}
            <span style={{ color: C.green, fontWeight: 700 }}>Rendah</span>,{" "}
            <span style={{ color: "#EF6C00", fontWeight: 700 }}>Sedang</span>, atau{" "}
            <span style={{ color: C.red, fontWeight: 700 }}>Tinggi</span>.
          </p>
          <div
            style={{
              marginTop: 12,
              background: "rgba(255,255,255,0.6)",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 12,
              color: C.caption,
              textAlign: "center",
            }}
          >
            Versi 1.0.0 · AsmaHealer · 2026
          </div>
        </div>
      </div>
    </div>
  )
}

function ToggleRow({
  label,
  sub,
  on,
  onChange,
  first,
}: {
  label: string
  sub?: string
  on: boolean
  onChange: (v: boolean) => void
  first?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderTop: first ? "none" : `1px solid ${C.light}`,
        gap: 12,
      }}
    >
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 14, color: C.heading, fontWeight: 700, display: "block" }}>{label}</span>
        {sub && <span style={{ fontSize: 12, color: C.caption, marginTop: 2, display: "block" }}>{sub}</span>}
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  )
}

function NavRow({
  icon: Icon,
  label,
  value,
  danger,
  first,
}: {
  icon: typeof Lock
  label: string
  value?: string
  danger?: boolean
  first?: boolean
}) {
  return (
    <button
      type="button"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: "none",
        border: "none",
        borderTop: first ? "none" : `1px solid ${C.light}`,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: danger ? "#FFEBEE" : C.light,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={17} color={danger ? C.red : C.primary} />
      </div>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: danger ? C.red : C.heading }}>{label}</span>
      {value && <span style={{ fontSize: 13, color: C.caption, fontWeight: 600 }}>{value}</span>}
      <ChevronRight size={18} color={C.caption} />
    </button>
  )
}
