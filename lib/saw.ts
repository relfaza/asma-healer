// SAW (Simple Additive Weighting) — MADM method for asthma risk screening.

export type Criterion = {
  id: string
  question: string
  weight: number
  options: { label: string; value: number }[]
  max: number
}

export const CRITERIA: Criterion[] = [
  {
    id: "C1",
    question: "Seberapa sering Anda mengalami sesak napas?",
    weight: 0.25,
    max: 4,
    options: [
      { label: "Tidak pernah", value: 1 },
      { label: "Kadang-kadang", value: 2 },
      { label: "Sering", value: 3 },
      { label: "Hampir setiap hari", value: 4 },
    ],
  },
  {
    id: "C2",
    question: "Sudah berapa lama gejala berlangsung?",
    weight: 0.15,
    max: 3,
    options: [
      { label: "Kurang dari 1 minggu", value: 1 },
      { label: "1 - 4 minggu", value: 2 },
      { label: "Lebih dari 1 bulan", value: 3 },
    ],
  },
  {
    id: "C3",
    question: "Apakah ada bunyi mengi (wheezing) saat bernapas?",
    weight: 0.25,
    max: 3,
    options: [
      { label: "Tidak pernah", value: 1 },
      { label: "Kadang-kadang", value: 2 },
      { label: "Ya, sering", value: 3 },
    ],
  },
  {
    id: "C4",
    question: "Apakah ada riwayat asma atau alergi di keluarga?",
    weight: 0.1,
    max: 3,
    options: [
      { label: "Tidak ada", value: 1 },
      { label: "1 orang", value: 2 },
      { label: "Lebih dari 1 orang", value: 3 },
    ],
  },
  {
    id: "C5",
    question: "Apakah gejala membaik setelah istirahat/obat?",
    weight: 0.25,
    max: 3,
    options: [
      // cost-style: not improving = higher risk
      { label: "Ya, membaik", value: 1 },
      { label: "Sedikit membaik", value: 2 },
      { label: "Tidak membaik", value: 3 },
    ],
  },
]

export type RiskLevel = "Rendah" | "Sedang" | "Tinggi"

export type SawResult = {
  score: number
  risk: RiskLevel
  rows: {
    id: string
    rawValue: number
    max: number
    normalized: number
    weight: number
    weighted: number
  }[]
}

// answers: map of criterion id -> selected raw value
export function computeSaw(answers: Record<string, number>): SawResult {
  let score = 0
  const rows = CRITERIA.map((c) => {
    const rawValue = answers[c.id] ?? c.options[0].value
    const normalized = rawValue / c.max // benefit normalization
    const weighted = normalized * c.weight
    score += weighted
    return {
      id: c.id,
      rawValue,
      max: c.max,
      normalized: Number(normalized.toFixed(2)),
      weight: c.weight,
      weighted: Number(weighted.toFixed(3)),
    }
  })

  const risk: RiskLevel = score < 0.45 ? "Rendah" : score <= 0.7 ? "Sedang" : "Tinggi"
  return { score: Number(score.toFixed(2)), risk, rows }
}

// Specific advice keyed by criterion id — used to build targeted recommendations
// for whichever criteria scored highest (most contribution to risk).
export const CRITERIA_ADVICE: Record<string, string> = {
  C1: "Sesak napas sering muncul — catat waktu & pemicunya, dan pertimbangkan inhaler pereda sesuai anjuran dokter.",
  C2: "Gejala sudah berlangsung lama — sebaiknya periksakan diri agar tidak berkembang menjadi asma kronis.",
  C3: "Bunyi mengi menandakan penyempitan saluran napas — hindari pemicu dan konsultasikan ke dokter paru.",
  C4: "Ada riwayat asma/alergi keluarga — lakukan skrining rutin karena faktor genetik meningkatkan risiko.",
  C5: "Gejala kurang membaik dengan istirahat/obat — ini perlu evaluasi medis lebih lanjut.",
}

// Returns the ids of the criteria contributing most to the risk score.
export function topCriteria(result: SawResult, n = 2): string[] {
  return [...result.rows]
    .sort((a, b) => b.weighted - a.weighted)
    .slice(0, n)
    .map((r) => r.id)
}

export type BmiResult = { value: number; category: string; color: "green" | "yellow" | "red" }

export function computeBmi(heightCm: number, weightKg: number): BmiResult {
  const h = heightCm / 100
  const value = Number((weightKg / (h * h)).toFixed(1))
  let category = "Normal"
  let color: BmiResult["color"] = "green"
  if (value < 18.5) {
    category = "Kurus"
    color = "yellow"
  } else if (value < 25) {
    category = "Normal"
    color = "green"
  } else if (value < 30) {
    category = "Gemuk"
    color = "yellow"
  } else {
    category = "Obesitas"
    color = "red"
  }
  return { value, category, color }
}

export const RECOMMENDATION: Record<RiskLevel, string> = {
  Rendah:
    "Gejala Anda menunjukkan risiko asma yang rendah. Tetap jaga pola hidup sehat, hindari pemicu alergi, dan lakukan skrining ulang bila gejala berubah.",
  Sedang:
    "Gejala Anda menunjukkan risiko asma sedang. Disarankan untuk memantau gejala secara berkala dan berkonsultasi dengan tenaga kesehatan bila gejala memburuk.",
  Tinggi:
    "Gejala Anda menunjukkan risiko asma tinggi. Sangat disarankan untuk segera berkonsultasi dengan dokter untuk pemeriksaan lebih lanjut.",
}
