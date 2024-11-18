export type Feature = {
  id: 'home' | 'validation' | 'spelling' | 'search'
  title: string
  icon: string
  description: string
}

export type CrashMessage = {
  base: string
  add: string
  reason: string
}

export type CrashCheck = {
  id: number
  crashCheckItemResponseList: CrashMessage[]
  createdAt: string
}

export type SpellingMessage = {
  help: string
  errorIdx: number
  correctMethod: number
  start: number
  errMsg: string
  end: number
  orgStr: string
  candWord: string
}

export type SpellingCheck = {
  id: number
  storySpellCheckResponseList: SpellingMessage[]
  createdAt: string
}
