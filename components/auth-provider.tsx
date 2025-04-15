"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { supabase, isRefreshTokenError } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
  clearSession: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  clearSession: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Utiliser useRef pour suivre les changements d'utilisateur et éviter les mises à jour inutiles
  const userRef = useRef<User | null>(null)
  // Utiliser useRef pour suivre si une session a déjà été récupérée
  const sessionFetched = useRef(false)
  // Utiliser useRef pour éviter les mises à jour d'état pendant le démontage du composant
  const isMounted = useRef(true)
<<<<<<< HEAD
  // Utiliser useRef pour stocker la référence à l'abonnement
  const subscriptionRef = useRef(null)
=======
>>>>>>> 7372b4576f08d50320a89a3f58eb14cbbfec481c

  // Fonction pour effacer la session en cas d'erreur de token
  const clearSession = useCallback(() => {
    if (!isMounted.current) return

    setUser(null)
    userRef.current = null
<<<<<<< HEAD

    // Vérifier si nous sommes dans un environnement navigateur
    if (typeof window === "undefined") {
      console.log("Nettoyage du stockage local ignoré (environnement serveur)")
      return
    }

=======
>>>>>>> 7372b4576f08d50320a89a3f58eb14cbbfec481c
    // Nettoyer le stockage local
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
      console.error("Erreur lors de la suppression des données d'authentification:", e)
    }
  }, [])

  const refreshUser = useCallback(async () => {
    if (!isMounted.current) return

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Erreur lors de la récupération de la session:", error)

        // Si c'est une erreur de token de rafraîchissement, effacer la session
        if (isRefreshTokenError(error)) {
          console.warn("Token de rafraîchissement invalide, effacement de la session")
          clearSession()
          return
        }
      }

      // Utiliser userRef pour comparer et éviter les mises à jour inutiles
      const sessionUser = session?.user || null
      const currentUserStr = JSON.stringify(userRef.current)
      const newUserStr = JSON.stringify(sessionUser)

      if (currentUserStr !== newUserStr) {
        console.log("Mise à jour de l'utilisateur:", sessionUser?.id || "null")
        userRef.current = sessionUser
        if (isMounted.current) {
          setUser(sessionUser)
        }
      }

      // Marquer le chargement comme terminé
      if (isMounted.current) {
        setLoading(false)
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement de l'utilisateur:", error)

      // Si c'est une erreur de token de rafraîchissement, effacer la session
      if (isRefreshTokenError(error)) {
        console.warn("Token de rafraîchissement invalide, effacement de la session")
        clearSession()
      }

      // Marquer le chargement comme terminé même en cas d'erreur
      if (isMounted.current) {
        setLoading(false)
      }
    }
  }, [clearSession])

<<<<<<< HEAD
  // Fonction pour nettoyer l'abonnement
  const cleanupSubscription = useCallback(() => {
    if (subscriptionRef.current) {
      try {
        subscriptionRef.current.unsubscribe()
        subscriptionRef.current = null
      } catch (error) {
        console.error("Erreur lors du nettoyage de l'abonnement:", error)
      }
    }
  }, [])

  // Configurer l'écouteur d'événements d'authentification
  const setupAuthListener = useCallback(() => {
    // Nettoyer l'abonnement existant si nécessaire
    cleanupSubscription()

    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!isMounted.current) return

        console.log("État d'authentification changé:", _event)

        const sessionUser = session?.user || null

        // Comparer uniquement les propriétés pertinentes de l'utilisateur
        const isSameUser = userRef.current?.id === sessionUser?.id && userRef.current?.email === sessionUser?.email

        if (!isSameUser) {
          userRef.current = sessionUser
          if (isMounted.current) {
            setUser(sessionUser)
          }
        }

        // Marquer le chargement comme terminé si nécessaire
        if (isMounted.current && loading) {
          setLoading(false)
        }
      })

      // Stocker la référence à l'abonnement
      subscriptionRef.current = data.subscription
    } catch (error) {
      console.error("Erreur lors de la configuration de l'écouteur d'authentification:", error)
      // Marquer le chargement comme terminé en cas d'erreur
      if (isMounted.current) {
        setLoading(false)
      }
    }
  }, [cleanupSubscription, loading])

=======
>>>>>>> 7372b4576f08d50320a89a3f58eb14cbbfec481c
  useEffect(() => {
    // Initialiser l'état d'authentification une seule fois
    const initializeAuth = async () => {
      if (sessionFetched.current) return

      try {
        sessionFetched.current = true
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Erreur lors de l'initialisation de l'authentification:", error)

          // Si c'est une erreur de token de rafraîchissement, effacer la session
          if (isRefreshTokenError(error)) {
            console.warn("Token de rafraîchissement invalide, effacement de la session")
            clearSession()
          }
        } else {
          const sessionUser = session?.user || null
          userRef.current = sessionUser
          if (isMounted.current) {
            setUser(sessionUser)
          }
        }

        if (isMounted.current) {
          setLoading(false)
        }
<<<<<<< HEAD

        // Configurer l'écouteur d'authentification après l'initialisation
        setupAuthListener()
=======
>>>>>>> 7372b4576f08d50320a89a3f58eb14cbbfec481c
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'authentification:", error)

        // Si c'est une erreur de token de rafraîchissement, effacer la session
        if (isRefreshTokenError(error)) {
          console.warn("Token de rafraîchissement invalide, effacement de la session")
          clearSession()
        }

        if (isMounted.current) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

<<<<<<< HEAD
    // Nettoyer lors du démontage
    return () => {
      isMounted.current = false
      cleanupSubscription()
    }
  }, [clearSession, setupAuthListener, cleanupSubscription])
=======
    // Configurer l'écouteur d'événements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("État d'authentification changé:", _event)

      const sessionUser = session?.user || null

      // Comparer uniquement les propriétés pertinentes de l'utilisateur
      const isSameUser = userRef.current?.id === sessionUser?.id && userRef.current?.email === sessionUser?.email

      if (!isSameUser) {
        userRef.current = sessionUser
        if (isMounted.current) {
          setUser(sessionUser)
        }
      }

      // Marquer le chargement comme terminé si nécessaire
      if (isMounted.current && loading) {
        setLoading(false)
      }
    })

    // Nettoyer lors du démontage
    return () => {
      isMounted.current = false
      subscription.unsubscribe()
    }
  }, [clearSession, loading])
>>>>>>> 7372b4576f08d50320a89a3f58eb14cbbfec481c

  // Réinitialiser isMounted lors du montage
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return <AuthContext.Provider value={{ user, loading, refreshUser, clearSession }}>{children}</AuthContext.Provider>
}
