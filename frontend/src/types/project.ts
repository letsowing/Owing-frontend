export interface Project {
  id: number
  title: string
  category?: string
  genres: string[]
  description?: string
  imageUrl: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ProjectSummary {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
  imageUrl: string
}

export interface ProjectProps {
  id: number
  title: string
  createdAt: Date
  updatedAt?: Date
  imageUrl: string
}
