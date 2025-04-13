import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Options de configuration pour gérer correctement les cookies et les tokens
const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: "supabase.auth.token",
    storage: {
      getItem: (key) => {
        try {
          return localStorage.getItem(key)
        } catch (error) {
          console.error("Error getting item from localStorage:", error)
          return null
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, value)
        } catch (error) {
          console.error("Error setting item in localStorage:", error)
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key)
        } catch (error) {
          console.error("Error removing item from localStorage:", error)
        }
      },
    },
  },
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)

// Fonction utilitaire pour vérifier si une erreur est liée au token de rafraîchissement
export const isRefreshTokenError = (error: any): boolean => {
  return (
    error?.name === "AuthApiError" &&
    (error?.status === 400 || error?.status === 401) &&
    (error?.message?.includes("refresh_token") || error?.code === "refresh_token_not_found")
  )
}

// Fonction utilitaire pour vérifier si une erreur est liée à la déconnexion
export const isSignOutError = (error: any): boolean => {
  return (
    error?.name === "AuthApiError" &&
    (error?.status === 400 || error?.status === 401 || error?.status === 404) &&
    (error?.message?.includes("sign out") ||
      error?.message?.includes("signOut") ||
      error?.message?.includes("session") ||
      Object.keys(error).length === 0)
  )
}
