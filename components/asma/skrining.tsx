"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { C } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"
import { CRITERIA } from "@/lib/saw"
import { PrimaryButton } from "./shared"

export function SkriningScreen({
  go,
  onComplete,
}: {
  go: (s: Screen) => void
  onComplete: (answers: Record<string, number>) => void
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const c = CRITERIA[step]
  const selected = answers[c.id]
  const progress = ((step + 1) / CRITERIA.length) * 100

  const next = () => {
    if (step < CRITERIA.length - 1) setStep(step + 1)
    else onComplete(answers)
  }
  const back = () => {
    if (step === 0) go("home")
    else setStep(step - 1)
  }

  return (
    <div style={{ height: "100%", background: C.white, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "52px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <button type="button" onClick={back} style={{ background: "none", border: "none", cursor: "pointer", color: C.heading }}>
            <ArrowLeft size={22} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>
            Skrining Gejala
          </span>
          <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 600, color: C.caption }}>
            {step + 1}/{CRITERIA.length}
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 50, background: C.light, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: C.primary, borderRadius: 50, transition: "width .3s ease" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
        <span style={{ display: "inline-block", background: C.light, color: C.primary, fontSize: 12, fontWeight: 700, borderRadius: 50, padding: "4px 12px", marginBottom: 14 }}>
          Kriteria {c.id}
        </span>
        <h2 style={{ fontSize: 21, fontWeight: 800, color: C.heading, lineHeight: 1.35, marginBottom: 22 }}>{c.question}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {c.options.map((opt) => {
            const on = selected === opt.value
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setAnswers({ ...answers, [c.id]: opt.value })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  textAlign: "left",
                  background: on ? C.light : C.white,
                  border: `1.5px solid ${on ? C.primary : C.light2}`,
                  borderRadius: 14,
                  padding: "15px 16px",
                  cursor: "pointer",
                  transition: "all .15s ease",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `2px solid ${on ? C.primary : C.light3}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {on && <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.primary }} />}
                </span>
                <span style={{ fontSize: 15, fontWeight: on ? 700 : 500, color: on ? C.heading : C.body }}>{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, padding: 20 }}>
        <div style={{ flex: 1 }}>
          <PrimaryButton variant="ghost" onClick={back}>
            Kembali
          </PrimaryButton>
        </div>
        <div style={{ flex: 2 }}>
          <PrimaryButton onClick={next} disabled={selected === undefined}>
            {step === CRITERIA.length - 1 ? "Lihat Hasil" : "Selanjutnya"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
