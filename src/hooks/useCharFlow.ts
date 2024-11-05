import { useCallback, useRef } from 'react'

import { useCast } from '@hooks/useCast'
import { useFlow } from '@hooks/useFlow'

import { generateUUID } from '@utils/uuid'

import { Cast, CastRelationship } from '@types'
import { Connection, Edge } from '@xyflow/react'

export const useCharFlow = () => {
  const {
    casts,
    setCasts: setCastStore,
    addCast: addCastToStore,
    updateCast: updateCastInStore,
    deleteCast: deleteCastFromStore,
    getCastById,
  } = useCast()

  const {
    nodes,
    edges,
    reconnect,
    removeEdge,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesSet,
    onEdgesSet,
    onNodeAdd,
    onNodeRemove,
    onNodeUpdate,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
  } = useFlow()

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

  // 초기화 함수들
  const setInitialCasts = useCallback(
    (initialCasts: Cast[]) => {
      setCastStore(initialCasts)
    },
    [setCastStore],
  )

  const setInitialFlow = useCallback(
    (
      initialNodes: Partial<Cast>[],
      initialRelationships: CastRelationship[],
    ) => {
      const nodes = initialNodes.map((node) => ({
        id: node.id?.toString() || generateUUID(),
        position: node.position || { x: 0, y: 0 },
        type: 'customNode',
        data: {
          name: node.name || '',
          role: node.role || '',
          image: node.imageUrl || '',
        },
      }))

      const edges = initialRelationships.map((rel) => ({
        id: rel.uuid ?? generateUUID(),
        source: rel.sourceId.toString(),
        target: rel.targetId.toString(),
        label: rel.label,
        type: rel.type,
        sourceHandle: rel.sourceHandle.toLowerCase(),
        targetHandle: rel.targetHandle.toLowerCase(),
      }))

      onNodesSet(nodes)
      onEdgesSet(edges)
    },
    [onNodesSet, onEdgesSet],
  )

  // 동기화 함수들
  const addCast = useCallback(
    (cast: Cast) => {
      addCastToStore(cast)
      onNodeAdd(
        cast.id,
        {
          name: cast.name,
          role: cast.role,
          image: cast.imageUrl,
        },
        cast.position,
      )
    },
    [addCastToStore, onNodeAdd],
  )

  const updateCast = useCallback(
    (cast: Cast) => {
      const node = nodes.find((n) => n.id === cast.id)
      if (!node) return

      updateCastInStore(cast)
      onNodeUpdate(cast.id, {
        name: cast.name,
        role: cast.role,
        image: cast.imageUrl,
      })
    },
    [updateCastInStore, onNodeUpdate, nodes],
  )

  const deleteCast = useCallback(
    (id: string) => {
      const exists = getCastById(id) || nodes.find((n) => n.id === id)
      if (!exists) return

      deleteCastFromStore(id)
      onNodeRemove(id)
    },
    [deleteCastFromStore, onNodeRemove, nodes, getCastById],
  )

  return {
    casts,
    nodes,
    edges,
    edgeReconnectSuccessful,
    setInitialCasts,
    setInitialFlow,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
    addCast,
    updateCast,
    deleteCast,
    getCastById,
  }
}
