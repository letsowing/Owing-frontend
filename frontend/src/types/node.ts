import { Edge, Node } from 'reactflow'

export interface NodeData {
  id: string
  name: string
  role: string
  image: string
}

export type FlowNode = Node<NodeData>

export interface EdgeData {
  relationship: string
}

export type FlowEdge = Edge<EdgeData>
