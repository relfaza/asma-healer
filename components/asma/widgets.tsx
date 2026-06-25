"use client"

import type { ReactNode } from "react"
import { C } from "@/lib/asma-theme"

/* ---------- Skeleton shimmer ---------- */
export function Skeleton({ h = 16, w = "100%", r = 8, style }: { h?: number; w?: number | string; r?: number; style?: React.CSSProperties }) {
  return <div className="asma-shimmer" style={{ height: h, width: w, borderRadius: r, ...style }} />
}

/* ---------- Empty state (geometric, on-brand) ---------- */
export function EmptyState({
  icon,
  title,
  desc,
  action,
}: {
  icon: ReactNode
  title: string
  desc: string
  action?: ReactNode
}) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", animation: "asmaFadeUp .45s ease both" }}>
      <div
        style={{
          width: 120,
          height: 120,
          margin: "0 auto 20px",
          borderRadius: "50%",
          background: C.light,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", width: 84, height: 84, borderRadius: "50%", background: C.light2, opacity: 0.6 }} />
        <div style={{ position: "relative", color: C.primary }}>{icon}</div>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 800, color: C.heading }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: C.body, lineHeight: 1.6, maxWidth: 260, margin: "8px auto 20px" }}>{desc}</p>
      {action}
    </div>
  )
}

/* ---------- Radar / spider chart (5 axes, values 0..1) ---------- */
export function RadarChart({ values, labels }: { values: number[]; labels: string[] }) {
  const size = 220
  const cx = size / 2
  const cy = size / 2
  const radius = 78
  const n = values.length
  const angleAt = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const pointAt = (i: number, r: number) => {
    const a = angleAt(i)
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const
  }

  const gridLevels = [0.25, 0.5, 0.75, 1]
  const dataPoints = values.map((v, i) => pointAt(i, radius * Math.max(0.04, v)))
  const dataPath = dataPoints.map((p) => p.join(",")).join(" ")

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height={size} role="img" aria-label="Diagram radar skor kriteria">
      {gridLevels.map((lvl) => (
        <polygon
          key={lvl}
          points={Array.from({ length: n }, (_, i) => pointAt(i, radius * lvl).join(",")).join(" ")}
          fill="none"
          stroke={C.light2}
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = pointAt(i, radius)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.light2} strokeWidth={1} />
      })}
      <polygon points={dataPath} fill={C.primary + "33"} stroke={C.primary} strokeWidth={2} />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill={C.primary} />
      ))}
      {labels.map((lab, i) => {
        const [x, y] = pointAt(i, radius + 16)
        return (
          <text
            key={lab}
            x={x}
            y={y}
            fontSize={11}
            fontWeight={700}
            fill={C.heading}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {lab}
          </text>
        )
      })}
    </svg>
  )
}

/* ---------- Trend line chart with risk color bands ---------- */
export function TrendChart({ points }: { points: { date: string; score: number }[] }) {
  const w = 320
  const h = 150
  const padL = 8
  const padR = 8
  const padT = 10
  const padB = 22
  const innerW = w - padL - padR
  const innerH = h - padT - padB
  const n = points.length
  const x = (i: number) => padL + (n <= 1 ? innerW / 2 : (innerW * i) / (n - 1))
  const y = (s: number) => padT + innerH * (1 - s) // score 0..1

  const bands = [
    { from: 0, to: 0.45, color: C.greenBg },
    { from: 0.45, to: 0.7, color: C.yellowBg },
    { from: 0.7, to: 1, color: C.redBg },
  ]

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.score)}`).join(" ")
  const areaPath = `${linePath} L ${x(n - 1)} ${padT + innerH} L ${x(0)} ${padT + innerH} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} role="img" aria-label="Tren skor SAW">
      {bands.map((b) => (
        <rect key={b.from} x={padL} y={y(b.to)} width={innerW} height={innerH * (b.to - b.from)} fill={b.color} opacity={0.7} />
      ))}
      <path d={areaPath} fill={C.primary + "1F"} />
      <path d={linePath} fill="none" stroke={C.primary} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => {
        const col = p.score < 0.45 ? C.green : p.score <= 0.7 ? C.yellow : C.red
        return (
          <g key={i}>
            <circle cx={x(i)} cy={y(p.score)} r={4} fill={C.white} stroke={col} strokeWidth={2.5} />
            <text x={x(i)} y={h - 7} fontSize={9} fill={C.caption} textAnchor="middle">
              {p.date}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Simple line forecast (values arbitrary scale) ---------- */
export function ForecastChart({ values, labels }: { values: number[]; labels: string[] }) {
  const w = 320
  const h = 120
  const padX = 10
  const padT = 12
  const padB = 20
  const innerW = w - padX * 2
  const innerH = h - padT - padB
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const n = values.length
  const x = (i: number) => padX + (innerW * i) / (n - 1)
  const y = (v: number) => padT + innerH * (1 - (v - min) / range)
  const linePath = values.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ")

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} role="img" aria-label="Prakiraan kualitas udara">
      <path d={`${linePath} L ${x(n - 1)} ${padT + innerH} L ${x(0)} ${padT + innerH} Z`} fill={C.primary + "1A"} />
      <path d={linePath} fill="none" stroke={C.primary} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3} fill={C.primary} />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={h - 5} fontSize={9} fill={C.caption} textAnchor="middle">
          {l}
        </text>
      ))}
    </svg>
  )
}

/* ---------- AQI circular gauge (0..300) ---------- */
export function AqiGauge({ value, max = 300 }: { value: number; max?: number }) {
  const size = 168
  const stroke = 14
  const r = (size - stroke) / 2
  const cx = size / 2
  const circumference = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const { color, label } = aqiInfo(value)

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={C.light} strokeWidth={stroke} />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 40, fontWeight: 800, color: C.heading, lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color, marginTop: 4 }}>{label}</span>
        <span style={{ fontSize: 10, color: C.caption }}>AQI (US)</span>
      </div>
    </div>
  )
}

export function aqiInfo(value: number): { color: string; label: string } {
  if (value <= 50) return { color: C.green, label: "Baik" }
  if (value <= 100) return { color: C.yellow, label: "Sedang" }
  if (value <= 150) return { color: "#EF6C00", label: "Tidak Sehat" }
  return { color: C.red, label: "Berbahaya" }
}

/* ---------- horizontal value bar ---------- */
export function ValueBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div style={{ height: 6, borderRadius: 50, background: C.light, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.min((value / max) * 100, 100)}%`, background: color, borderRadius: 50, transition: "width .6s ease" }} />
    </div>
  )
}
