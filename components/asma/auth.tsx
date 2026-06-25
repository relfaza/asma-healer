"use client"

import { useState } from "react"
import { Activity, ArrowLeft } from "lucide-react"
import { C } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"
import { Field, PrimaryButton } from "./shared"

export function LoginScreen({ go }: { go: (s: Screen) => void }) {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  return (
    <div style={{ height: "100%", background: C.white, overflowY: "auto" }}>
      <div style={{ padding: "56px 24px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <Activity size={36} color={C.white} strokeWidth={2.4} />
          </div>
          <h1 style={{ color: C.heading, fontSize: 24, fontWeight: 800 }}>Selamat Datang</h1>
          <p style={{ color: C.body, fontSize: 14, marginTop: 4 }}>Masuk untuk melanjutkan skrining Anda</p>
        </div>

        <Field label="Email" type="email" placeholder="nama@email.com" value={email} onChange={setEmail} />
        <Field label="Kata Sandi" type="password" placeholder="••••••••" value={pass} onChange={setPass} />

        <div style={{ textAlign: "right", marginBottom: 22 }}>
          <button
            type="button"
            style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Lupa kata sandi?
          </button>
        </div>

        <PrimaryButton onClick={() => go("home")}>Masuk</PrimaryButton>

        <p style={{ textAlign: "center", color: C.body, fontSize: 14, marginTop: 22 }}>
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => go("register")}
            style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Daftar
          </button>
        </p>
      </div>
    </div>
  )
}

export function RegisterScreen({ go }: { go: (s: Screen) => void }) {
  const [agree, setAgree] = useState(false)

  return (
    <div style={{ height: "100%", background: C.white, overflowY: "auto" }}>
      <div style={{ padding: "52px 24px 32px" }}>
        <button
          type="button"
          onClick={() => go("login")}
          style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 12, color: C.heading, display: "flex", alignItems: "center", gap: 6 }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ color: C.heading, fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Buat Akun Baru</h1>
        <p style={{ color: C.body, fontSize: 14, marginBottom: 24 }}>Lengkapi data diri Anda di bawah ini</p>

        <Field label="Nama Lengkap" placeholder="Nama lengkap Anda" />
        <Field label="Email" type="email" placeholder="nama@email.com" />
        <Field label="Nomor HP" type="tel" placeholder="08xxxxxxxxxx" />
        <Field label="Tanggal Lahir" type="date" />
        <Field label="Kata Sandi" type="password" placeholder="••••••••" />
        <Field label="Konfirmasi Kata Sandi" type="password" placeholder="••••••••" />

        <button
          type="button"
          onClick={() => setAgree(!agree)}
          style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "none", border: "none", cursor: "pointer", textAlign: "left", margin: "6px 0 22px" }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              flexShrink: 0,
              marginTop: 1,
              border: `1.5px solid ${agree ? C.primary : C.light3}`,
              background: agree ? C.primary : "transparent",
              color: C.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
            }}
          >
            {agree ? "✓" : ""}
          </span>
          <span style={{ fontSize: 13, color: C.body, lineHeight: 1.5 }}>
            Saya menyetujui syarat &amp; ketentuan serta kebijakan privasi AsmaHealer.
          </span>
        </button>

        <PrimaryButton onClick={() => go("home")} disabled={!agree}>
          Daftar
        </PrimaryButton>
      </div>
    </div>
  )
}
