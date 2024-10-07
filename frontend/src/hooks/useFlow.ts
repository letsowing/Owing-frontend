import { useCallback, useRef } from 'react'

import { useFlowStore } from '@stores/flowStore'

import { CustomNodeData } from '@types'
import { Connection, Edge, Node } from '@xyflow/react'

export const useFlow = () => {
  const {
    nodes,
    edges,
    isBidirectionalEdge,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    removeNode,
    updateNode,
    removeEdge,
    reconnect,
    setIsBidirectionalEdge,
    updateEdgeLabel,
  } = useFlowStore()

  const edgeReconnectSuccessful = useRef(true)

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false
  }, [])

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true
      reconnect(oldEdge, newConnection)
    },
    [reconnect],
  )

  const onReconnectEnd = useCallback(
    (_Event: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        removeEdge(edge.id)
      }
    },
    [removeEdge],
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
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    onNodeAdd,
    onNodeRemove,
    onNodeUpdate,
    onEdgeRemove,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
  }
}
