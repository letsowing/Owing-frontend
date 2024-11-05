import { CustomNode, EdgeTypes } from '@types'

export interface Cast {
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
export interface CastGraph {
  nodes: CustomNode[]
  edges: CastRelationship[]
}

export interface CastRelationship {
  uuid?: string
  sourceId: number
  targetId: number
  label: string
  type: keyof EdgeTypes
  sourceHandle: string
  targetHandle: string
}
export interface CastCoord {
  position: {
    x: number
    y: number
  }
}
