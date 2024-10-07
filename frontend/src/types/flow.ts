import { EdgeProps, Node, NodeProps } from '@xyflow/react'

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
  Directional: React.FC<EdgeProps>
  Bidirectional: React.FC<EdgeProps>
}
