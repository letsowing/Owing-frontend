export interface Project {
  id: number
  title: string
  category: string
  genres: string[]
  description: string
  coverUrl: string
  createdAt?: Date
  updatedAt?: Date
  accessedAt?: Date
}

export interface ProjectSummary {
  id: number
  title: string
  coverUrl: string
  accessedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ProjectProps {
  id: number
  title: string
  coverUrl: string
  createdAt: Date
  updatedAt?: Date
}

export interface ProjectPutRequest {
  title: string
  description: string
  category: string
  genres: string[]
  coverUrl: string
}

export interface ProjectPutResponse {
  id: number
  title: string
  description: string
  category: string
  genres: string[]
  coverUrl: string
}
