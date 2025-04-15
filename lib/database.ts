import { supabase } from "./supabase"
import type { Event, News, Team, Match, Media, Profile } from "@/types/database.types"

// Fonction pour vérifier la connexion à Supabase
export async function checkSupabaseConnection() {
  try {
    // Une requête simple pour vérifier la connexion
    const { error } = await supabase.from("profiles").select("count")
    return !error
  } catch (error) {
    console.error("Erreur de connexion à Supabase:", error)
    return false
  }
}

// Fonction pour récupérer le profil d'un utilisateur
export async function getUserProfile(userId: string) {
  try {
    // Vérifier d'abord si la connexion à Supabase fonctionne
    const isConnected = await checkSupabaseConnection()
    if (!isConnected) {
      console.error("Impossible de se connecter à Supabase")
      // Retourner un profil par défaut en cas d'échec de connexion
      return {
        id: userId,
        first_name: null,
        last_name: null,
        role: "member",
        created_at: new Date().toISOString(),
      } as Profile
    }

    // Dans votre structure, l'id du profil est le même que l'id de l'utilisateur
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error(`Error fetching profile for user ${userId}:`, error)
      // Retourner un profil par défaut en cas d'erreur
      return {
        id: userId,
        first_name: null,
        last_name: null,
        role: "member",
        created_at: new Date().toISOString(),
      } as Profile
    }

    return data as Profile
  } catch (error) {
    console.error("Error in getUserProfile:", error)
    // Retourner un profil par défaut en cas d'exception
    return {
      id: userId,
      first_name: null,
      last_name: null,
      role: "member",
      created_at: new Date().toISOString(),
    } as Profile
  }
}

// Fonction pour mettre à jour le profil d'un utilisateur
export async function updateUserProfile(userId: string, profileData: Partial<Profile>) {
  try {
    const { data, error } = await supabase.from("profiles").update(profileData).eq("id", userId).select().single()

    if (error) {
      console.error(`Error updating profile for user ${userId}:`, error)
      throw error
    }

    return data as Profile
  } catch (error) {
    console.error("Error in updateUserProfile:", error)
    throw error
  }
}

// Fonction pour inspecter la structure de la table profiles
export async function inspectProfilesTable() {
  try {
    // Récupérer un échantillon de la table profiles
    const { data, error } = await supabase.from("profiles").select("*").limit(5)

    if (error) {
      console.error("Error fetching profiles sample:", error)
      throw error
    }

    // Si nous avons des données, extraire la structure
    if (data && data.length > 0) {
      const sampleProfile = data[0]
      const columns = Object.keys(sampleProfile)

      return {
        columns,
        sampleProfile,
        count: data.length,
        allProfiles: data,
      }
    }

    return {
      message: "No profiles found",
      data: [],
    }
  } catch (error) {
    console.error("Error inspecting profiles table:", error)
    throw error
  }
}

// Fonctions pour les événements
export async function getEvents() {
  const { data, error } = await supabase.from("events").select("*").order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data as Event[]
}

export async function getEventsByMonth(year: number, month: number) {
  // Créer des dates pour le premier et dernier jour du mois
  const startDate = new Date(year, month - 1, 1).toISOString()
  const endDate = new Date(year, month, 0).toISOString()

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("start_time", startDate)
    .lte("start_time", endDate)
    .order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching events by month:", error)
    return []
  }

  return data as Event[]
}

export async function getEvent(id: string) {
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching event with id ${id}:`, error)
    return null
  }

  return data as Event
}

// Fonctions pour les actualités
export async function getNews(limit = 10) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching news:", error)
    return []
  }

  return data as News[]
}

export async function getNewsArticle(id: string) {
  const { data, error } = await supabase.from("news").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching news article with id ${id}:`, error)
    return null
  }

  return data as News
}

// Fonctions pour les équipes
export async function getTeams() {
  const { data, error } = await supabase.from("teams").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching teams:", error)
    return []
  }

  return data as Team[]
}

export async function getTeam(id: string) {
  const { data, error } = await supabase.from("teams").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching team with id ${id}:`, error)
    return null
  }

  return data as Team
}

// Fonctions pour les matchs
export async function getMatches(limit = 10) {
  const { data, error } = await supabase
    .from("matches")
    .select("*, teams(*)")
    .order("date", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Error fetching matches:", error)
    return []
  }

  return data as (Match & { teams: Team })[]
}

export async function getMatchesByTeam(teamId: string) {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("team_id", teamId)
    .order("date", { ascending: true })

  if (error) {
    console.error(`Error fetching matches for team ${teamId}:`, error)
    return []
  }

  return data as Match[]
}

// Fonctions pour les médias
export async function getMedia(category?: string, limit = 20) {
  let query = supabase.from("media").select("*").order("created_at", { ascending: false }).limit(limit)

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching media:", error)
    return []
  }

  return data as Media[]
}
