export interface Work {
  id?: number
  title: string
  category: string
  genres: string[]
  description: string
  imageUrl: string
  createdAt?: Date
  updatedAt?: Date
}
