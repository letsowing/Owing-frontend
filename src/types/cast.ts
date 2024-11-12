import { CustomNode, EdgeTypes } from '@types'

export interface Cast {
  id: string
  name: string
  age: number
  gender: string
  role: string
  description: string
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

export interface CastPostRequest {
  folderId: number
  name: string
  age: number
  gender: string
  role: string
  description: string
  imageUrl: string
  coordinate: {
    x: number
    y: number
  }
}

export interface CastPutRequest {
  name: string
  age: number
  gender: string
  role: string
  description: string
  imageUrl: string
}

export interface CastResponse {
  id: number
  name: string
  age: number
  gender: string
  role: string
  description: string
  imageUrl: string
  coordinate: {
    x: number
    y: number
  }
}

export interface CastAiImageRequest {
  name: string
  age: number
  gender: string
  role: string
  description: string
}
