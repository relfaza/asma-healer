"use client"

import type { ReactNode } from "react"
import { Home, ClipboardList, History, User, type LucideIcon } from "lucide-react"
import { C, shadowCard, headerGradient } from "@/lib/asma-theme"
import type { RiskLevel } from "@/lib/saw"

export function PrimaryButton({
  children,
  onClick,
  variant = "solid",
  full = true,
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "solid" | "outline" | "ghost" | "danger"
  full?: boolean
  disabled?: boolean
}) {
  const base = {
    borderRadius: 50,
    padding: "14px 24px",
    fontWeight: 700,
    fontSize: 15,
    width: full ? "100%" : undefined,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "transform .12s ease, opacity .12s ease",
    border: "none",
  } as const

  const styles: Record<string, React.CSSProperties> = {
    solid: { ...base, background: C.primary, color: C.white },
    outline: { ...base, background: "transparent", color: C.primary, border: `1.5px solid ${C.primary}` },
    ghost: { ...base, background: C.light, color: C.primary },
    danger: { ...base, background: C.redBg, color: C.red },
  }

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      style={styles[variant]}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  )
}

export function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
}) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.body, marginBottom: 6 }}>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: "100%",
          borderRadius: 12,
          border: `1.5px solid ${C.light2}`,
          padding: "13px 14px",
          fontSize: 14,
          color: C.heading,
          outline: "none",
          background: C.white,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = C.primary)}
        onBlur={(e) => (e.currentTarget.style.borderColor = C.light2)}
      />
    </label>
  )
}

export function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: C.white, borderRadius: 18, boxShadow: shadowCard, padding: 16, ...style }}>{children}</div>
  )
}

export function GradientHeader({
  children,
  style,
}: {
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: headerGradient,
        padding: "52px 20px 26px",
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 26,
        color: C.white,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function RiskBadge({ risk, size = "md" }: { risk: RiskLevel; size?: "sm" | "md" }) {
  const map: Record<RiskLevel, { bg: string; fg: string }> = {
    Rendah: { bg: C.greenBg, fg: C.green },
    Sedang: { bg: C.yellowBg, fg: C.yellow },
    Tinggi: { bg: C.redBg, fg: C.red },
  }
  const m = map[risk]
  return (
    <span
      style={{
        background: m.bg,
        color: m.fg,
        borderRadius: 50,
        padding: size === "sm" ? "3px 10px" : "5px 14px",
        fontSize: size === "sm" ? 11 : 13,
        fontWeight: 700,
      }}
    >
      Risiko {risk}
    </span>
  )
}

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      style={{
        width: 46,
        height: 26,
        borderRadius: 50,
        border: "none",
        cursor: "pointer",
        background: on ? C.primary : C.light2,
        position: "relative",
        transition: "background .25s ease",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: on ? 23 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: C.white,
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transition: "left .25s cubic-bezier(.34,1.56,.64,1)",
        }}
      />
    </button>
  )
}

export function SegmentSelector({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div style={{ display: "flex", gap: 4, background: C.light, borderRadius: 12, padding: 4 }}>
      {options.map((o) => {
        const on = o === value
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            style={{
              flex: 1,
              border: "none",
              borderRadius: 9,
              padding: "8px 6px",
              fontSize: 12.5,
              fontWeight: on ? 700 : 600,
              cursor: "pointer",
              background: on ? C.white : "transparent",
              color: on ? C.primary : C.caption,
              boxShadow: on ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all .2s ease",
            }}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 800,
        color: C.caption,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {children}
    </p>
  )
}

// Direction-aware page transition wrapper.
export function AnimatedScreen({ dir, screenKey, children }: { dir: "forward" | "back"; screenKey: string; children: ReactNode }) {
  return (
    <div
      key={screenKey}
      style={{
        height: "100%",
        animation: `${dir === "forward" ? "asmaSlideInRight" : "asmaSlideInLeft"} .28s ease`,
      }}
    >
      {children}
    </div>
  )
}

// fade-up wrapper with stagger index
export function FadeUp({ index = 0, children, style }: { index?: number; children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ animation: "asmaFadeUp .45s ease both", animationDelay: `${index * 0.07}s`, ...style }}>{children}</div>
  )
}

export type Tab = "home" | "skrining" | "riwayat" | "profil"

export function BottomNav({ active, onNavigate }: { active: Tab; onNavigate: (t: Tab) => void }) {
  const items: { key: Tab; label: string; icon: LucideIcon }[] = [
    { key: "home", label: "Home", icon: Home },
    { key: "skrining", label: "Skrining", icon: ClipboardList },
    { key: "riwayat", label: "Riwayat", icon: History },
    { key: "profil", label: "Profil", icon: User },
  ]
  return (
    <nav
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: C.white,
        borderTop: `1px solid ${C.light}`,
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 4px 12px",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.05)",
        zIndex: 20,
      }}
    >
      {items.map(({ key, label, icon: Icon }) => {
        const on = active === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onNavigate(key)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: on ? C.primary : C.caption,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 30,
                borderRadius: 50,
                background: on ? C.light : "transparent",
                transition: "background .2s ease",
              }}
            >
              <span style={{ display: "inline-flex", animation: on ? "asmaBounce .5s ease" : "none" }}>
                <Icon size={21} strokeWidth={on ? 2.4 : 2} />
              </span>
            </span>
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500 }}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
