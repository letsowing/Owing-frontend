export interface Character {
  id: string
  name: string
  age: number
  gender: string
  role: string
  details: string
  position?: {
    x: number
    y: number
  }
  imageUrl: string
}
