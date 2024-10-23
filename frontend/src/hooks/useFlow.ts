import { useCallback } from 'react'

import { useFlowStore } from '@stores/flowStore'

import { CustomEdge, CustomNode, CustomNodeData } from '@types'
import { Node } from '@xyflow/react'

export const useFlow = () => {
  const {
    nodes,
    edges,
    isBidirectionalEdge,
    onNodesChange,
    onEdgesChange,
    onConnect,
    reconnect,
    setNodes,
    setEdges,
    addNode,
    removeNode,
    updateNode,
    removeEdge,
    setIsBidirectionalEdge,
    updateEdgeLabel,
  } = useFlowStore()

  const onNodesSet = useCallback(
    (newNodes: Node<CustomNodeData>[]) => {
      setNodes(newNodes as CustomNode[])
    },
    [setNodes],
  )

  const onEdgesSet = useCallback(
    (newEdges: CustomEdge[]) => {
      setEdges(newEdges)
    },
    [setEdges],
  )

  const onNodeAdd = useCallback(
    (id: string, data: CustomNodeData, position: { x: number; y: number }) => {
      const newNode: Node<CustomNodeData> = {
        id,
        data,
        position,
        type: 'customNode',
      }
      addNode(newNode)
    },
    [addNode],
  )

  const onNodeRemove = useCallback(
    (nodeId: string) => {
      removeNode(nodeId)
    },
    [removeNode],
  )

  const onNodeUpdate = useCallback(
    (nodeId: string, data: Partial<CustomNodeData>) => {
      updateNode(nodeId, data)
    },
    [updateNode],
  )

  const onEdgeRemove = useCallback(
    (edgeId: string) => {
      removeEdge(edgeId)
    },
    [removeEdge],
  )

  const onEdgeLabelChange = useCallback(
    (edgeId: string, newLabel: string) => {
      updateEdgeLabel(edgeId, newLabel)
    },
    [updateEdgeLabel],
  )

  return {
    nodes: nodes as Node<CustomNodeData>[],
    edges,
    isBidirectionalEdge,
    onNodesChange,
    onEdgesChange,
    onConnect,
    reconnect,
    removeEdge,
    onNodesSet,
    onEdgesSet,
    onNodeAdd,
    onNodeRemove,
    onNodeUpdate,
    onEdgeRemove,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
  }
}
