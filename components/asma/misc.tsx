"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Phone,
  Users,
  MapPin,
  LogOut,
  Pencil,
  Bell,
  CheckCircle2,
  Info,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react"
import { C, shadowCard, headerGradient } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"
import { PrimaryButton } from "./shared"

export function ProfilScreen({ go }: { go: (s: Screen) => void }) {
  const rows: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Calendar, label: "Tanggal Lahir", value: "12 Maret 1995" },
    { icon: Phone, label: "Nomor HP", value: "0812 3456 7890" },
    { icon: Users, label: "Jenis Kelamin", value: "Laki-laki" },
    { icon: MapPin, label: "Domisili", value: "Bandung, Jawa Barat" },
  ]

  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto", paddingBottom: 84 }}>
      <div style={{ background: headerGradient, padding: "52px 20px 30px", borderBottomLeftRadius: 26, borderBottomRightRadius: 26, color: C.white, textAlign: "center" }}>
        <div style={{ width: 84, height: 84, borderRadius: "50%", background: C.white, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800, color: C.primary }}>
          AP
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>Andi Pratama</h1>
        <p style={{ fontSize: 13, color: C.light2, marginTop: 2 }}>andi.pratama@email.com</p>
        <p style={{ fontSize: 12, color: C.light3, marginTop: 8 }}>Anggota sejak Januari 2024</p>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ background: C.white, borderRadius: 18, boxShadow: shadowCard, overflow: "hidden" }}>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderTop: i === 0 ? "none" : `1px solid ${C.light}` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: C.light, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <r.icon size={18} color={C.primary} />
              </div>
              <div>
                <p style={{ fontSize: 12, color: C.caption }}>{r.label}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.heading, marginTop: 1 }}>{r.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          <PrimaryButton>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <Pencil size={16} /> Edit Profil
            </span>
          </PrimaryButton>
          <PrimaryButton variant="danger" onClick={() => go("login")}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <LogOut size={16} /> Keluar Akun
            </span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

const SECTIONS = [
  {
    title: "Apa itu Asma?",
    body: "Asma adalah penyakit kronis yang menyebabkan peradangan dan penyempitan saluran pernapasan, sehingga membuat penderita sulit bernapas. Kondisi ini dapat dikontrol dengan penanganan yang tepat.",
    emoji: "🫁",
  },
  {
    title: "Gejala Utama",
    body: "Sesak napas, batuk terutama malam/dini hari, bunyi mengi (wheezing) saat bernapas, serta rasa berat atau tertekan di dada. Gejala dapat memburuk saat terpapar pemicu.",
    emoji: "⚠️",
  },
  {
    title: "Asma vs Infeksi Biasa",
    body: "Berbeda dengan flu atau infeksi saluran napas biasa, gejala asma cenderung berulang, dipicu alergen atau aktivitas, dan tidak disertai demam. Asma bersifat jangka panjang.",
    emoji: "🔍",
  },
  {
    title: "Kapan ke Dokter?",
    body: "Segera konsultasi bila sesak napas semakin sering, mengganggu tidur/aktivitas, tidak membaik dengan istirahat, atau bila skor risiko skrining Anda tergolong tinggi.",
    emoji: "🏥",
  },
]

export function InfoScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto", paddingBottom: 24 }}>
      <div style={{ background: headerGradient, padding: "52px 20px 28px", borderBottomLeftRadius: 26, borderBottomRightRadius: 26, color: C.white }}>
        <button type="button" onClick={() => go("home")} style={{ background: "none", border: "none", color: C.white, cursor: "pointer", marginBottom: 14 }}>
          <ArrowLeft size={22} />
        </button>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.light2 }}>EDUKASI KESEHATAN</span>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 6, lineHeight: 1.3 }}>Mengenal Asma Lebih Dekat</h1>
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        {SECTIONS.map((s) => (
          <div key={s.title} style={{ background: C.white, borderRadius: 18, boxShadow: shadowCard, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{s.emoji}</span>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: C.heading }}>{s.title}</h3>
            </div>
            <p style={{ fontSize: 14, color: C.body, lineHeight: 1.6 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

type Notif = {
  id: string
  icon: LucideIcon
  color: string
  title: string
  body: string
  time: string
  unread: boolean
}

const NOTIFS: Notif[] = [
  { id: "n1", icon: CheckCircle2, color: C.green, title: "Hasil Skrining Siap", body: "Skrining terbaru Anda menunjukkan risiko rendah. Tetap jaga kesehatan!", time: "5 menit lalu", unread: true },
  { id: "n2", icon: Bell, color: C.primary, title: "Pengingat Skrining", body: "Sudah 2 minggu sejak skrining terakhir. Yuk lakukan skrining rutin.", time: "2 jam lalu", unread: true },
  { id: "n3", icon: Info, color: C.primary, title: "Artikel Baru", body: "Baca: 5 pemicu asma yang sering tidak disadari sehari-hari.", time: "Kemarin", unread: false },
  { id: "n4", icon: AlertTriangle, color: C.yellow, title: "Tips Kualitas Udara", body: "Kualitas udara di area Anda sedang menurun. Hindari aktivitas luar berlebih.", time: "2 hari lalu", unread: false },
]

export function NotifScreen({ go }: { go: (s: Screen) => void }) {
  const [items, setItems] = useState(NOTIFS)

  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto" }}>
      <div style={{ padding: "52px 20px 18px", background: C.white, borderBottom: `1px solid ${C.light}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button type="button" onClick={() => go("home")} style={{ background: "none", border: "none", color: C.heading, cursor: "pointer" }}>
          <ArrowLeft size={22} />
        </button>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: C.heading }}>Notifikasi</h1>
        <button
          type="button"
          onClick={() => setItems(items.map((i) => ({ ...i, unread: false })))}
          style={{ marginLeft: "auto", background: "none", border: "none", color: C.primary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
        >
          Tandai dibaca
        </button>
      </div>

      <div style={{ padding: "12px 12px" }}>
        {items.map((n) => (
          <div
            key={n.id}
            style={{
              display: "flex",
              gap: 12,
              padding: 14,
              borderRadius: 14,
              marginBottom: 8,
              background: n.unread ? C.light : C.white,
              boxShadow: n.unread ? "none" : shadowCard,
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: n.color + "1A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <n.icon size={20} color={n.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>{n.title}</p>
                {n.unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.primary, flexShrink: 0 }} />}
              </div>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.5, marginTop: 3 }}>{n.body}</p>
              <p style={{ fontSize: 11, color: C.caption, marginTop: 6 }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
