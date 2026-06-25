"use client"

import { useState } from "react"
import { ChevronDown, RotateCcw, Save } from "lucide-react"
import { C, headerGradient } from "@/lib/asma-theme"
import type { Screen } from "@/lib/asma-nav"
import { CRITERIA, RECOMMENDATION, type SawResult } from "@/lib/saw"
import { Card, PrimaryButton } from "./shared"

export function HasilScreen({
  go,
  result,
  onSave,
}: {
  go: (s: Screen) => void
  result: SawResult
  onSave: () => void
}) {
  const [open, setOpen] = useState(false)
  const ring = result.risk === "Rendah" ? C.green : result.risk === "Sedang" ? C.yellow : C.red

  return (
    <div style={{ height: "100%", background: C.bg, overflowY: "auto", paddingBottom: 24 }}>
      <div style={{ background: headerGradient, padding: "52px 20px 40px", borderBottomLeftRadius: 26, borderBottomRightRadius: 26, color: C.white, textAlign: "center" }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Hasil Skrining</h1>
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            border: `5px solid ${C.white}`,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 11, color: C.light2 }}>Skor SAW</span>
          <span style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>{result.score}</span>
        </div>
        <div style={{ marginTop: 16 }}>
          <span style={{ background: C.white, color: ring, borderRadius: 50, padding: "7px 18px", fontSize: 14, fontWeight: 800 }}>
            Risiko {result.risk}
          </span>
        </div>
      </div>

      <div style={{ padding: "18px 16px 0" }}>
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: C.heading, marginBottom: 8 }}>Rekomendasi</h3>
          <p style={{ fontSize: 14, color: C.body, lineHeight: 1.6 }}>{RECOMMENDATION[result.risk]}</p>
        </Card>

        <Card style={{ marginTop: 14, padding: 0, overflow: "hidden" }}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", padding: 16, cursor: "pointer" }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: C.heading }}>Detail Perhitungan SAW</span>
            <ChevronDown size={20} color={C.primary} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
          </button>

          {open && (
            <div style={{ padding: "0 16px 16px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ color: C.caption, textAlign: "left" }}>
                    <th style={{ padding: "8px 4px", fontWeight: 600 }}>Kriteria</th>
                    <th style={{ padding: "8px 4px", fontWeight: 600, textAlign: "center" }}>Nilai</th>
                    <th style={{ padding: "8px 4px", fontWeight: 600, textAlign: "center" }}>Norm.</th>
                    <th style={{ padding: "8px 4px", fontWeight: 600, textAlign: "center" }}>Bobot</th>
                    <th style={{ padding: "8px 4px", fontWeight: 600, textAlign: "right" }}>Skor</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r) => (
                    <tr key={r.id} style={{ borderTop: `1px solid ${C.light}` }}>
                      <td style={{ padding: "9px 4px", fontWeight: 700, color: C.heading }}>{r.id}</td>
                      <td style={{ padding: "9px 4px", textAlign: "center", color: C.body }}>
                        {r.rawValue}/{r.max}
                      </td>
                      <td style={{ padding: "9px 4px", textAlign: "center", color: C.body }}>{r.normalized}</td>
                      <td style={{ padding: "9px 4px", textAlign: "center", color: C.body }}>{r.weight}</td>
                      <td style={{ padding: "9px 4px", textAlign: "right", fontWeight: 700, color: C.primary }}>{r.weighted}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: `2px solid ${C.light2}` }}>
                    <td colSpan={4} style={{ padding: "9px 4px", fontWeight: 800, color: C.heading }}>
                      Total Skor SAW
                    </td>
                    <td style={{ padding: "9px 4px", textAlign: "right", fontWeight: 800, color: C.primary }}>{result.score}</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ fontSize: 11, color: C.caption, marginTop: 10, lineHeight: 1.5 }}>
                Normalisasi = nilai ÷ nilai maksimum kriteria. Skor akhir = Σ (normalisasi × bobot).
              </p>
            </div>
          )}
        </Card>

        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <div style={{ flex: 1 }}>
            <PrimaryButton variant="outline" onClick={() => go("skrining")}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                <RotateCcw size={16} /> Skrining Ulang
              </span>
            </PrimaryButton>
          </div>
          <div style={{ flex: 1 }}>
            <PrimaryButton onClick={onSave}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                <Save size={16} /> Simpan
              </span>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
