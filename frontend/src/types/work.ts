export interface Work {
  id: number
  title: string
  category?: string
  genres: string[]
  description?: string
  imageUrl: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ProjectProps {
  id: number
  title: string
  createdAt: Date
  updatedAt?: Date
  imageUrl: string
}
