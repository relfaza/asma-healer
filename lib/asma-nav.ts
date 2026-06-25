export type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "register"
  | "home"
  | "skrining"
  | "hasil"
  | "riwayat"
  | "detail"
  | "profil"
  | "info"
  | "notif"
  | "darurat"
  | "udara"
  | "dokter"
  | "settings"
  | "chat"

export const SCREEN_LABELS: Record<Screen, string> = {
  splash: "Splash",
  onboarding: "Onboarding",
  login: "Login",
  register: "Register",
  home: "Home",
  skrining: "Form Skrining",
  hasil: "Hasil Skrining",
  riwayat: "Riwayat",
  detail: "Detail Riwayat",
  profil: "Profil",
  info: "Informasi Asma",
  notif: "Notifikasi",
  darurat: "Darurat / SOS",
  udara: "Kualitas Udara",
  dokter: "Cari Dokter",
  settings: "Pengaturan",
  chat: "Chat Dokter",
}

export const SCREEN_CATEGORIES: { label: string; screens: Screen[] }[] = [
  { label: "Auth", screens: ["splash", "onboarding", "login", "register"] },
  { label: "Utama", screens: ["home", "skrining", "hasil", "riwayat", "detail"] },
  { label: "Profil & Info", screens: ["profil", "info", "notif", "settings"] },
  { label: "Fitur Baru", screens: ["darurat", "udara", "dokter", "chat"] },
]

export type HistoryItem = {
  id: string
  date: string
  score: number
  risk: "Rendah" | "Sedang" | "Tinggi"
  answers: { id: string; question: string; label: string; value: number }[]
}

export type ProfileData = {
  name: string
  email: string
  birth: string
  phone: string
  gender: string
  city: string
  smoker: boolean
  allergies: string[]
  heightCm: number
  weightKg: number
}

export const DEFAULT_PROFILE: ProfileData = {
  name: "Andi Pratama",
  email: "andi.pratama@email.com",
  birth: "12 Maret 1995",
  phone: "0812 3456 7890",
  gender: "Laki-laki",
  city: "Yogyakarta",
  smoker: false,
  allergies: ["Debu", "Serbuk sari"],
  heightCm: 170,
  weightKg: 68,
}
