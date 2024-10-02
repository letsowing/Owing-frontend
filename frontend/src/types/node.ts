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

export interface CustomNodeRemoveProps extends NodeProps {
  data: CustomNodeData
  onNodeRemove: (nodeId: string) => void
}

export type NodeTypes = {
  customNode: React.FC<CustomNodeProps>
}

export type EdgeTypes = {
  unidirectionalEdge: React.FC<EdgeProps>
  bidirectionalEdge: React.FC<EdgeProps>
}
