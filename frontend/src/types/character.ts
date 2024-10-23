import { CustomNode, EdgeTypes } from '@types'

export interface Character {
  id: string
  name: string
  age: number
  gender: string
  role: string
  detail: string
  imageUrl: string
  position: {
    x: number
    y: number
  }
}
export interface CharacterGraph {
  nodes: CustomNode[]
  edges: CharacterRelationship[]
}

export interface CharacterRelationship {
  uuid?: string
  sourceId: number
  targetId: number
  label: string
  type: keyof EdgeTypes
  sourceHandle: string
  targetHandle: string
}
export interface CharacterCoord {
  position: {
    x: number
    y: number
  }
}
