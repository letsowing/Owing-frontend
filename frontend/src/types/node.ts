// types/node.ts
import { Node } from '@xyflow/react'

// 노드 데이터 타입
export interface CustomNodeData {
  name: string
  role: string
  image: string
  [key: string]: unknown // 인덱스 시그니처 추가
}

// 전체 노드 타입
export type CustomNode = Node<CustomNodeData>
