<<<<<<< HEAD
// Types pour les tables Supabase

export type Profile = {
  id: string // Clé primaire qui est aussi une clé étrangère vers auth.users.id
  first_name: string | null
  last_name: string | null
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


// Assurons-nous que les types correspondent exactement aux tables Supabase
/*
=======
// Assurons-nous que les types correspondent exactement aux tables Supabase

>>>>>>> 7372b4576f08d50320a89a3f58eb14cbbfec481c
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
<<<<<<< HEAD
*/
=======
>>>>>>> 7372b4576f08d50320a89a3f58eb14cbbfec481c
