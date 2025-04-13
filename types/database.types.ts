// Assurons-nous que les types correspondent exactement aux tables Supabase

export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  role: "admin" | "member" | "coach"
  created_at: string
}

export type Team = {
  id: string
  name: string
  category: string
  coach: string
  championship: string
  schedule: string
  description: string
  image_url: string
  created_at?: string
}

export type News = {
  id: string
  title: string
  content: string
  summary: string
  image_url: string
  category: string
  published_at: string
  author_id?: string
  created_at?: string
}

export type Event = {
  id: string
  title: string
  description: string
  location: string
  start_time: string
  end_time: string
  category: string
  team_id?: string
  created_at?: string
}

export type Media = {
  id: string
  title: string
  description: string
  url: string
  type: "image" | "video"
  category: string
  created_at: string
}

export type Match = {
  id: string
  team_id: string
  opponent: string
  location: string
  is_home: boolean
  date: string
  time: string
  score_home?: number
  score_away?: number
  created_at?: string
}
