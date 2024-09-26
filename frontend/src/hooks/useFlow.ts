import { useCallback } from 'react'

import { useFlowStore } from '@/stores/flowStore'
import { CustomNode, CustomNodeData } from '@/types/node'

export const useFlow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useFlowStore()

  const createNode = useCallback(
    (data: CustomNodeData, position: { x: number; y: number }) => {
      const newNode: CustomNode = {
        id: `node_${Date.now()}`,
        data,
        position,
        type: 'customNode',
      }
      addNode(newNode)
    },
    [addNode],
  )

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    createNode,
  }
}
