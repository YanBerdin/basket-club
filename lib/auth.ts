import { supabase, isRefreshTokenError } from "./supabase"

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
        localStorage.removeItem("supabase.auth.token")
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
  try {
    // Vérifier d'abord si une session existe
    const { data: sessionData } = await supabase.auth.getSession()

    // Si aucune session n'existe, considérer que l'utilisateur est déjà déconnecté
    if (!sessionData?.session) {
      console.log("Aucune session active trouvée, l'utilisateur est déjà déconnecté")
      cleanupLocalStorage()
      return true
    }

    // Utiliser une approche plus défensive pour la déconnexion
    try {
      const { error } = await supabase.auth.signOut({
        scope: "local", // Utiliser 'local' pour déconnecter uniquement l'appareil actuel
      })

      if (error) {
        console.error("Erreur de déconnexion:", error)
        // Même en cas d'erreur, essayer de nettoyer le stockage local
        cleanupLocalStorage()
        // Ne pas propager l'erreur pour permettre à l'utilisateur de continuer
        return true
      }
    } catch (signOutError) {
      console.error("Exception lors de la déconnexion:", signOutError)
      // Même en cas d'erreur, essayer de nettoyer le stockage local
      cleanupLocalStorage()
      // Ne pas propager l'erreur pour permettre à l'utilisateur de continuer
      return true
    }

    // Nettoyer le stockage local après la déconnexion
    cleanupLocalStorage()

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
