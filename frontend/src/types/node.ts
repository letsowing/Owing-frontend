import { Node } from '@xyflow/react'

export interface CustomNodeData {
  name: string
  role: string
  image: string
  [key: string]: unknown
}

export type CustomNode = Node<CustomNodeData>
