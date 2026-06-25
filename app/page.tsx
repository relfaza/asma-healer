"use client"

import { useState } from "react"
import { C } from "@/lib/asma-theme"
import { type Screen, SCREEN_LABELS, type HistoryItem } from "@/lib/asma-nav"
import { CRITERIA, computeSaw, type SawResult } from "@/lib/saw"
import { BottomNav, type Tab } from "@/components/asma/shared"
import { SplashScreen, OnboardingScreen } from "@/components/asma/intro"
import { LoginScreen, RegisterScreen } from "@/components/asma/auth"
import { HomeScreen } from "@/components/asma/home"
import { SkriningScreen } from "@/components/asma/skrining"
import { HasilScreen } from "@/components/asma/hasil"
import { RiwayatScreen, DetailScreen } from "@/components/asma/riwayat"
import { ProfilScreen, InfoScreen, NotifScreen } from "@/components/asma/misc"
import { DaruratScreen } from "@/components/asma/darurat"
import { UdaraScreen } from "@/components/asma/udara"
import { DokterScreen } from "@/components/asma/dokter"
import { SettingsScreen } from "@/components/asma/settings"
import { ChatScreen } from "@/components/asma/chat"

const SEED: HistoryItem[] = [
  {
    id: "s1",
    date: "18 Jun 2026",
    score: 0.38,
    risk: "Rendah",
    answers: CRITERIA.map((c) => ({ id: c.id, question: c.question, label: c.options[0].label, value: c.options[0].value })),
  },
  {
    id: "s2",
    date: "10 Jun 2026",
    score: 0.62,
    risk: "Sedang",
    answers: CRITERIA.map((c) => ({ id: c.id, question: c.question, label: c.options[1].label, value: c.options[1].value })),
  },
  {
    id: "s3",
    date: "28 Mei 2026",
    score: 0.41,
    risk: "Rendah",
    answers: CRITERIA.map((c) => ({ id: c.id, question: c.question, label: c.options[0].label, value: c.options[0].value })),
  },
]

const TAB_SCREENS: Record<Tab, Screen> = {
  home: "home",
  skrining: "skrining",
  riwayat: "riwayat",
  profil: "profil",
}

function formatToday() {
  return new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [history, setHistory] = useState<HistoryItem[]>(SEED)
  const [result, setResult] = useState<SawResult | null>(null)
  const [lastAnswers, setLastAnswers] = useState<Record<string, number>>({})
  const [detail, setDetail] = useState<HistoryItem | null>(null)

  const go = (s: Screen) => setScreen(s)

  const activeTab: Tab | null =
    screen === "home"
      ? "home"
      : screen === "skrining"
        ? "skrining"
        : screen === "riwayat" || screen === "detail"
          ? "riwayat"
          : screen === "profil"
            ? "profil"
            : null

  const showNav = activeTab !== null && screen !== "skrining"

  const handleComplete = (answers: Record<string, number>) => {
    setLastAnswers(answers)
    setResult(computeSaw(answers))
    go("hasil")
  }

  const handleSave = () => {
    if (!result) return
    const item: HistoryItem = {
      id: "h" + Date.now(),
      date: formatToday(),
      score: result.score,
      risk: result.risk,
      answers: CRITERIA.map((c) => {
        const v = lastAnswers[c.id] ?? c.options[0].value
        const opt = c.options.find((o) => o.value === v) ?? c.options[0]
        return { id: c.id, question: c.question, label: opt.label, value: v }
      }),
    }
    setHistory([item, ...history])
    go("riwayat")
  }

  const handleDelete = (id: string) => {
    setHistory(history.filter((h) => h.id !== id))
    go("riwayat")
  }

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen go={go} />
      case "onboarding":
        return <OnboardingScreen go={go} />
      case "login":
        return <LoginScreen go={go} />
      case "register":
        return <RegisterScreen go={go} />
      case "home":
        return <HomeScreen go={go} history={history} onStart={() => go("skrining")} />
      case "skrining":
        return <SkriningScreen go={go} onComplete={handleComplete} />
      case "hasil":
        return (
          <HasilScreen
            go={go}
            result={result ?? computeSaw({ C1: 2, C2: 2, C3: 2, C4: 1, C5: 2 })}
            onSave={handleSave}
          />
        )
      case "riwayat":
        return (
          <RiwayatScreen
            go={go}
            history={history}
            onOpen={(item) => {
              setDetail(item)
              go("detail")
            }}
          />
        )
      case "detail":
        return <DetailScreen go={go} item={detail ?? history[0]} onDelete={handleDelete} />
      case "profil":
        return <ProfilScreen go={go} />
      case "info":
        return <InfoScreen go={go} />
      case "notif":
        return <NotifScreen go={go} />
      case "darurat":
        return <DaruratScreen go={go} />
      case "udara":
        return <UdaraScreen go={go} />
      case "dokter":
        return <DokterScreen go={go} />
      case "settings":
        return <SettingsScreen go={go} />
      case "chat":
        return <ChatScreen go={go} />
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0D1B2A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 16px 48px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 18, color: C.white }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>AsmaHealer</h1>
        <p style={{ fontSize: 13, color: C.light3, marginTop: 2 }}>Sistem Deteksi Dini Asma · Metode SAW (MADM)</p>
      </div>

      {/* Screen selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 560, marginBottom: 24 }}>
        {(Object.keys(SCREEN_LABELS) as Screen[]).map((s) => {
          const on = screen === s
          return (
            <button
              key={s}
              type="button"
              onClick={() => go(s)}
              style={{
                background: on ? C.primary : "rgba(255,255,255,0.08)",
                color: on ? C.white : C.light3,
                border: `1px solid ${on ? C.primary : "rgba(255,255,255,0.12)"}`,
                borderRadius: 50,
                padding: "7px 13px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {SCREEN_LABELS[s]}
            </button>
          )
        })}
      </div>

      {/* Phone frame */}
      <div
        style={{
          width: 390,
          maxWidth: "100%",
          height: 800,
          background: "#000",
          borderRadius: 48,
          padding: 12,
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 38, overflow: "hidden", background: C.white }}>
          {/* notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 150,
              height: 28,
              background: "#000",
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
              zIndex: 50,
            }}
          />
          <div style={{ position: "absolute", inset: 0 }}>{renderScreen()}</div>
          {showNav && activeTab && <BottomNav active={activeTab} onNavigate={(t) => go(TAB_SCREENS[t])} />}
        </div>
      </div>
    </main>
  )
}
