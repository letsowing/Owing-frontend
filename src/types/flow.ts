import { Edge, EdgeProps, Node, NodeProps, Position } from '@xyflow/react'

export interface CustomNodeData {
  name: string
  role: string
  image: string
  [key: string]: unknown
}

export type CustomNode = Node<CustomNodeData>

export interface CustomNodeProps extends NodeProps {
  data: CustomNodeData
}

export type NodeTypes = {
  customNode: React.FC<CustomNodeProps>
}

export type EdgeTypes = {
  DIRECTIONAL: React.FC<EdgeProps>
  BIDIRECTIONAL: React.FC<EdgeProps>
}

export interface CustomEdge extends Edge {
  [key: string]: unknown
  type: keyof EdgeTypes
}

export interface CommonEdgeProps {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  label?: React.ReactNode
  sourcePosition?: Position
  targetPosition?: Position
  onLabelChange: (edgeId: string, newLabel: string) => void
  type: keyof EdgeTypes
}
