import { Edge, Node } from '@xyflow/react'

// Node 데이터 인터페이스 정의
export interface NodeData extends Record<string, unknown> {
  id: string
  name: string
  role: string
  image: string
}

export type FlowNode = Node<NodeData>

export interface EdgeData extends Record<string, unknown> {
  relationship: string
}

export type FlowEdge = Edge<EdgeData>
