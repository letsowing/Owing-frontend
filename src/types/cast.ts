import { CustomEdge, EdgeTypes } from '@types'

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
  cast: CastResponse[]
  relationship: CustomEdge[]
}

export interface PutCastRelationshipRequest {
  source: number
  target: number
  type: keyof EdgeTypes
  sourceHandle: string
  targetHandle: string
}

export interface PostCastRelationshipRequest {
  source: number
  target: number
  label: string
  type: keyof EdgeTypes
  sourceHandle: string
  targetHandle: string
}

export interface PostCastRelationshipResponse
  extends PostCastRelationshipRequest {
  id: string
}

export interface CastCoord {
  x: number
  y: number
}

export interface getCastResponse {
  folderId: number
  cast: {
    id: string
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
}

export interface CastPostRequest {
  folderId: number | undefined
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
  role: string
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
