import { useCallback, useRef } from 'react'

import { useFlowStore } from '@stores/flowStore'

import { CustomNode, CustomNodeData } from '@types'
import { Connection, Edge } from '@xyflow/react'

export const useFlow = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    removeNode,
    removeEdge,
    onNodeClick,
    reconnect,
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

  const onNodeRemove = useCallback(
    (nodeId: string) => {
      removeNode(nodeId)
    },
    [removeNode],
  )

  const onEdgeRemove = useCallback(
    (edgeId: string) => {
      removeEdge(edgeId)
    },
    [removeEdge],
  )

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    onNodeAdd,
    onNodeRemove,
    onEdgeRemove,
    onNodeClick,
  }
}
