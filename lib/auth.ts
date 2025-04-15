import { createClient } from "@supabase/supabase-js"
import { isRefreshTokenError } from "./supabase"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)

function isBrowser() {
  return typeof window !== "undefined"
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Erreur de connexion:", error)
      throw error
    }

    return data
  } catch (error) {
    // Gérer spécifiquement les erreurs de token
    if (isRefreshTokenError(error)) {
      console.warn("Problème avec le token de rafraîchissement lors de la connexion")
      // Effacer les tokens existants si nécessaire
      try {
        if (isBrowser()) { // 
          localStorage.removeItem("supabase.auth.token")
        }
      } catch (e) {
        console.error("Erreur lors de la suppression du token:", e)
      }
    }
    throw error
  }
}

export async function signUp(email: string, password: string, userData: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  })

  if (error) {
    console.error("Erreur d'inscription:", error)
    throw error
  }

  return data
}

export async function signOut() {
  // Vérifier si nous sommes dans un environnement navigateur
  if (typeof window === "undefined") {
    console.log("Déconnexion ignorée (environnement serveur)")
    return true
  }

  try {
    // Nettoyer d'abord le stockage local pour éviter les problèmes de canal fermé
    cleanupLocalStorage()

    // Vérifier d'abord si une session existe
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    // Si une erreur se produit lors de la récupération de la session ou si aucune session n'existe
    if (sessionError || !sessionData?.session) {
      console.log("Aucune session active trouvée ou erreur lors de la récupération de la session")
      return true
    }

    // Utiliser une promesse avec timeout pour éviter les problèmes de canal fermé
    const signOutPromise = new Promise<boolean>((resolve) => {
      // Définir un timeout pour résoudre la promesse même si la déconnexion échoue
      const timeoutId = setTimeout(() => {
        console.log("Timeout de déconnexion atteint, considéré comme réussi")
        resolve(true)
      }, 2000) // 2 secondes de timeout

      // Tenter la déconnexion
      supabase.auth
        .signOut({ scope: "local" })
        .then(() => {
          clearTimeout(timeoutId)
          resolve(true)
        })
        .catch((error) => {
          console.error("Erreur lors de la déconnexion:", error)
          clearTimeout(timeoutId)
          resolve(true) // Résoudre quand même pour permettre à l'utilisateur de continuer
        })
    })

    // Attendre la résolution de la promesse
    await signOutPromise

    return true
  } catch (error) {
    console.error("Erreur non gérée lors de la déconnexion:", error)
    // Même en cas d'erreur, essayer de nettoyer le stockage local
    cleanupLocalStorage()

    // Ne pas propager l'erreur pour permettre à l'utilisateur de continuer
    return true
  }
}

// Fonction utilitaire pour nettoyer le stockage local
function cleanupLocalStorage() {
  // Vérifier si nous sommes dans un environnement navigateur
  if (typeof window === "undefined") {
    console.log("Nettoyage du stockage local ignoré (environnement serveur)")
    return
  }

  try {
    // Supprimer tous les éléments liés à Supabase
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("supabase.auth.")) {
        keysToRemove.push(key)
      }
    }

    // Supprimer les clés dans un second temps pour éviter les problèmes d'itération
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key)
    })

    // Supprimer également les cookies liés à Supabase si possible
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.trim().split("=")
      if (name && name.trim().startsWith("supabase-auth-")) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      }
    })
  } catch (e) {
    console.error("Erreur lors du nettoyage du stockage local:", e)
  }
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    console.error("Erreur de réinitialisation du mot de passe:", error)
    throw error
  }

  return data
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    console.error("Erreur de mise à jour du mot de passe:", error)
    throw error
  }

  return data
}

export async function getCurrentUser() {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      if (isRefreshTokenError(sessionError)) {
        console.warn("Token de rafraîchissement invalide lors de la récupération de l'utilisateur")
        return null
      }
      throw sessionError
    }

    if (!session) {
      return null
    }

    const { data, error } = await supabase.auth.getUser()

    if (error) {
      if (isRefreshTokenError(error)) {
        console.warn("Token de rafraîchissement invalide lors de la récupération de l'utilisateur")
        return null
      }
      throw error
    }

    return data?.user || null
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return null
  }
}
