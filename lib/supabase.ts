import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Vérifier si les variables d'environnement sont définies
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Les variables d'environnement Supabase ne sont pas définies correctement")
}

// Fonction pour vérifier si localStorage est disponible
const isLocalStorageAvailable = () => {
  if (typeof window === "undefined") return false

  try {
    const testKey = "__supabase_ls_test__"
    localStorage.setItem(testKey, "test")
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

// Options de configuration pour gérer correctement les cookies et les tokens
const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: "supabase.auth.token",
    storage: isLocalStorageAvailable()
      ? {
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
        }
      : undefined,
  },
  global: {
    // Augmenter les timeouts pour les environnements avec une connexion lente
    fetch: (...args) => {
      return fetch(...args)
    },
  },
  // Ajouter des options de récupération pour les requêtes
  realtime: {
    timeout: 30000, // 30 secondes
  },
}

// Créer le client avec gestion d'erreur
let supabaseClient
try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)
} catch (error) {
  console.error("Erreur lors de la création du client Supabase:", error)
  // Créer un client factice pour éviter les erreurs
  supabaseClient = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: null, error: new Error("Client Supabase non disponible") }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error("Client Supabase non disponible") }),
          limit: async () => ({ data: [], error: new Error("Client Supabase non disponible") }),
        }),
        order: () => ({
          limit: async () => ({ data: [], error: new Error("Client Supabase non disponible") }),
        }),
        limit: async () => ({ data: [], error: new Error("Client Supabase non disponible") }),
      }),
    }),
  }
}

export const supabase = supabaseClient

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
