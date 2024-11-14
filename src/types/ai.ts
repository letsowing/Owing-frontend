export type Feature = {
  id: 'home' | 'validation' | 'spelling' | 'search'
  title: string
  icon: string
  description: string
}

export type Message = {
  id?: number
  base: string
  add: string
  reason: string
  createdAt: Date
}
