import { supabase } from "./supabase"
import type { Event, News, Team, Match, Media } from "@/types/database.types"

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
