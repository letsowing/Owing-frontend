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

export type SpellingError = {
  help: string
  errorIdx: number
  correctMethod: number
  start: number
  errMsg: string
  end: number
  orgStr: string
  candWord: string
}
