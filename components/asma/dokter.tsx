"use client"

import { useState } from "react"
import { ArrowLeft, Search, Star, MapPin, MessageCircle, X, Clock, Calendar } from "lucide-react"
import { C, shadowCard } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"

type Doctor = {
  id: string
  name: string
  specialty: string
  spCode: string
  cat: string
  location: string
  distance: string
  rating: number
  reviews: number
  open: boolean
  schedule: { day: string; time: string }[]
  avatarColor: string
  avatarBg: string
}

const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "dr. Siti Rahayu",
    specialty: "Spesialis Paru",
    spCode: "Sp.P",
    cat: "Paru-paru",
    location: "RS Sardjito, Yogyakarta",
    distance: "2.3 km",
    rating: 4.8,
    reviews: 127,
    open: true,
    avatarColor: "#1565C0",
    avatarBg: "#E3F2FD",
    schedule: [
      { day: "Senin – Jumat", time: "08.00 – 14.00" },
      { day: "Sabtu", time: "08.00 – 12.00" },
      { day: "Minggu", time: "Tutup" },
    ],
  },
  {
    id: "d2",
    name: "dr. Budi Santoso",
    specialty: "Spesialis Paru",
    spCode: "Sp.P",
    cat: "Paru-paru",
    location: "RS Bethesda, Yogyakarta",
    distance: "3.1 km",
    rating: 4.7,
    reviews: 98,
    open: true,
    avatarColor: "#1B5E20",
    avatarBg: "#E8F5E9",
    schedule: [
      { day: "Senin, Rabu, Jumat", time: "09.00 – 15.00" },
      { day: "Selasa, Kamis", time: "14.00 – 20.00" },
      { day: "Sabtu – Minggu", time: "Tutup" },
    ],
  },
  {
    id: "d3",
    name: "dr. Maya Putri",
    specialty: "Spesialis Alergi & Imunologi",
    spCode: "Sp.A",
    cat: "Alergi",
    location: "Klinik Sehat Sentosa",
    distance: "1.8 km",
    rating: 4.9,
    reviews: 156,
    open: false,
    avatarColor: "#880E4F",
    avatarBg: "#FCE4EC",
    schedule: [
      { day: "Senin – Kamis", time: "10.00 – 16.00" },
      { day: "Jumat", time: "10.00 – 12.00" },
      { day: "Sabtu – Minggu", time: "Tutup" },
    ],
  },
  {
    id: "d4",
    name: "dr. Andre Wijaya",
    specialty: "Dokter Umum",
    spCode: "",
    cat: "Umum",
    location: "Puskesmas Gondokusuman",
    distance: "0.9 km",
    rating: 4.5,
    reviews: 64,
    open: true,
    avatarColor: "#E65100",
    avatarBg: "#FFF3E0",
    schedule: [
      { day: "Senin – Sabtu", time: "07.30 – 14.00" },
      { day: "Minggu", time: "Tutup" },
    ],
  },
  {
    id: "d5",
    name: "dr. Lestari Dewi",
    specialty: "Spesialis Paru",
    spCode: "Sp.P",
    cat: "Paru-paru",
    location: "RS PKU Muhammadiyah",
    distance: "4.0 km",
    rating: 4.6,
    reviews: 82,
    open: false,
    avatarColor: "#4A148C",
    avatarBg: "#F3E5F5",
    schedule: [
      { day: "Selasa & Kamis", time: "13.00 – 19.00" },
      { day: "Sabtu", time: "09.00 – 13.00" },
      { day: "Minggu – Senin", time: "Tutup" },
    ],
  },
]

const FILTERS = ["Semua", "Paru-paru", "Alergi", "Umum"]

function initials(name: string) {
  const clean = name.replace(/^dr\.\s*/i, "").replace(/,.*$/, "")
  const parts = clean.trim().split(" ")
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")
}

export function DokterScreen({ go }: { go: (s: Screen) => void }) {
  const [filter, setFilter] = useState("Semua")
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<Doctor | null>(null)

  let list = DOCTORS.filter((d) => filter === "Semua" || d.cat === filter)
  if (query) {
    const q = query.toLowerCase()
    list = list.filter((d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.location.toLowerCase().includes(q))
  }

  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto", paddingBottom: 28, position: "relative" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 14px", background: C.white, borderBottom: `1px solid ${C.light}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <button type="button" onClick={() => go("home")} style={{ background: "none", border: "none", color: C.heading, cursor: "pointer" }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: 19, fontWeight: 800, color: C.heading }}>Cari Dokter</h1>
        </div>
        {/* Search bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: 14, padding: "11px 14px", border: `1.5px solid ${C.light2}` }}>
          <Search size={18} color={C.caption} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari dokter atau rumah sakit..."
            style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 14, color: C.heading }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 16px 4px" }}>
        {FILTERS.map((f) => {
          const on = f === filter
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              style={{
                flexShrink: 0,
                border: `1.5px solid ${on ? C.primary : C.light2}`,
                background: on ? C.primary : C.white,
                color: on ? C.white : C.body,
                borderRadius: 50,
                padding: "7px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* Doctor cards */}
      <div style={{ padding: "10px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 24px", color: C.caption }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Dokter tidak ditemukan</p>
          </div>
        )}
        {list.map((d, i) => (
          <div
            key={d.id}
            style={{
              background: C.white,
              borderRadius: 20,
              boxShadow: shadowCard,
              padding: 16,
              animation: "asmaFadeUp .4s ease both",
              animationDelay: `${i * 0.06}s`,
              border: `1px solid ${C.light}`,
            }}
          >
            <div style={{ display: "flex", gap: 14 }}>
              {/* Avatar */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: d.avatarBg,
                  color: d.avatarColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {initials(d.name)}
              </div>

              <div style={{ flex: 1 }}>
                {/* Name + badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <p style={{ fontSize: 14.5, fontWeight: 800, color: C.heading, lineHeight: 1.3 }}>
                      {d.name}{d.spCode ? `, ${d.spCode}` : ""}
                    </p>
                    <p style={{ fontSize: 12.5, color: C.primary, fontWeight: 600, marginTop: 1 }}>{d.specialty}</p>
                  </div>
                  <span
                    style={{
                      flexShrink: 0,
                      background: d.open ? "#E8F5E9" : "#F5F5F5",
                      color: d.open ? "#2E7D32" : C.caption,
                      borderRadius: 50,
                      padding: "4px 11px",
                      fontSize: 11.5,
                      fontWeight: 700,
                    }}
                  >
                    {d.open ? "🟢 Buka" : "🔴 Tutup"}
                  </span>
                </div>

                {/* Location */}
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.caption, marginTop: 6 }}>
                  <MapPin size={13} />
                  <span>{d.location}</span>
                  <span style={{ color: C.light2 }}>·</span>
                  <span style={{ color: C.primary, fontWeight: 600 }}>{d.distance}</span>
                </div>

                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12.5, marginTop: 5 }}>
                  <Star size={14} color="#F9A825" fill="#F9A825" />
                  <strong style={{ color: C.heading }}>{d.rating}</strong>
                  <span style={{ color: C.caption }}>({d.reviews} ulasan)</span>
                </div>
              </div>
            </div>

            {/* Book button */}
            <button
              type="button"
              onClick={() => setActive(d)}
              style={{
                width: "100%",
                marginTop: 14,
                background: d.open ? C.primary : C.bg,
                color: d.open ? C.white : C.caption,
                border: "none",
                borderRadius: 50,
                padding: "12px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Calendar size={16} />
              Buat Janji
            </button>
          </div>
        ))}
      </div>

      {/* Bottom sheet modal */}
      {active && <DoctorModal doctor={active} onClose={() => setActive(null)} onChat={() => go("chat")} />}
    </div>
  )
}

function DoctorModal({ doctor, onClose, onChat }: { doctor: Doctor; onClose: () => void; onChat: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(13,27,42,0.55)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 60,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: C.white,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: "20px 20px 32px",
          animation: "asmaSlideInRight .3s ease",
        }}
      >
        {/* Close */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onClose}
            style={{ background: C.bg, border: "none", borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.body }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Doctor info */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: -4 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: doctor.avatarBg,
              color: doctor.avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {initials(doctor.name)}
          </div>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: C.heading, lineHeight: 1.3 }}>
              {doctor.name}{doctor.spCode ? `, ${doctor.spCode}` : ""}
            </h2>
            <p style={{ fontSize: 13, color: C.primary, fontWeight: 600, marginTop: 2 }}>{doctor.specialty}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
              <Star size={13} color="#F9A825" fill="#F9A825" />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.heading }}>{doctor.rating}</span>
              <span style={{ fontSize: 12, color: C.caption }}>({doctor.reviews} ulasan)</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.body, marginTop: 14 }}>
          <MapPin size={15} color={C.caption} />
          {doctor.location} · {doctor.distance}
        </div>

        {/* Schedule */}
        <h3 style={{ fontSize: 14, fontWeight: 800, color: C.heading, margin: "16px 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
          <Clock size={15} color={C.primary} /> Jadwal Praktik
        </h3>
        <div style={{ background: C.bg, borderRadius: 14, padding: "4px 14px" }}>
          {doctor.schedule.map((s, i) => (
            <div
              key={s.day}
              style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: i === 0 ? "none" : `1px solid ${C.light}` }}
            >
              <span style={{ fontSize: 13, color: C.body }}>{s.day}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: s.time === "Tutup" ? C.caption : C.heading }}>
                {s.time}
              </span>
            </div>
          ))}
        </div>

        {/* Chat button */}
        <button
          type="button"
          onClick={onChat}
          style={{
            width: "100%",
            marginTop: 18,
            background: C.primary,
            color: C.white,
            border: "none",
            borderRadius: 50,
            padding: "14px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <MessageCircle size={18} /> Chat dengan Dokter
        </button>
      </div>
    </div>
  )
}
