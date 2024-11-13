import { useCallback, useRef } from 'react'

import { useFlowStore } from '@stores/flowStore'

import {
  deleteCast,
  deleteCastRelationship,
  getCastGraph,
  patchCastCoord,
  patchCastRelationshipLabel,
  postCast,
  postCastRelationship,
  putCast,
  putCastRelationshipHandle,
} from '@services/castService'
import { Cast, CustomEdge, CustomNode, EdgeTypes } from '@types'
import { Connection, Edge, NodeChange } from '@xyflow/react'

export const useFlow = () => {
  const {
    nodes,
    edges,
    isBidirectionalEdge,
    onNodesChange: onNodesChangeFromStore,
    onConnect: onConnectFromStore,
    setNodes,
    setEdges,
    addNode,
    removeNode,
    updateNode: updateNodeInStore,
    removeEdge,
    setIsBidirectionalEdge,
    updateEdgeLabel: updateEdgeLabelInStore,
  } = useFlowStore(
    useCallback(
      (state) => ({
        nodes: state.nodes as CustomNode[],
        edges: state.edges as Edge[],
        isBidirectionalEdge: state.isBidirectionalEdge,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
        reconnect: state.reconnect,
        setNodes: state.setNodes,
        setEdges: state.setEdges,
        addNode: state.addNode,
        removeNode: state.removeNode,
        updateNode: state.updateNode,
        removeEdge: state.removeEdge,
        setIsBidirectionalEdge: state.setIsBidirectionalEdge,
        updateEdgeLabel: state.updateEdgeLabel,
      }),
      [],
    ),
  )

  const edgeReconnectSuccessful = useRef(true)

  // Flow Management Functions
  const setInitialFlow = useCallback(
    async (projectId: number) => {
      try {
        const graphData = await getCastGraph(projectId)
        const initialNodes: CustomNode[] = graphData.cast.map((cast) => ({
          id: cast.id?.toString(),
          position: cast.coordinate || { x: 0, y: 0 },
          type: 'customNode',
          data: {
            name: cast.name || '',
            role: cast.role || '',
            image: cast.imageUrl || '',
          },
        }))

        const initialEdges = graphData.relationship.map((rel) => ({
          id: rel.id.toString(),
          source: rel.source.toString(),
          target: rel.target.toString(),
          label: rel.label || '관계',
          type: rel.type,
          sourceHandle: rel.sourceHandle,
          targetHandle: rel.targetHandle,
        }))

        setNodes(initialNodes)
        setEdges(initialEdges)
        return graphData
      } catch (error) {
        console.error('Failed to load graph data:', error)
        throw error
      }
    },
    [setNodes, setEdges],
  )

  // Node Management Functions
  const onNodeAdd = useCallback(
    async (cast: Cast, folderId: number | undefined) => {
      try {
        const castData = {
          name: cast.name,
          age: 0,
          gender: '',
          role: cast.role,
          description: '',
          imageUrl: cast.imageUrl || '',
          folderId: folderId,
          coordinate: cast.position,
        }

        const newCast = await postCast(castData)

        addNode({
          id: newCast.id.toString(),
          data: {
            name: newCast.name,
            role: newCast.role,
            image: newCast.imageUrl,
          },
          position: cast.position,
          type: 'customNode',
        } as CustomNode)
      } catch (error) {
        console.error('Failed to add cast:', error)
      }
    },
    [addNode],
  )

  const onNodeUpdate = useCallback(
    async (nodeId: string, cast: Cast) => {
      try {
        const castData = {
          name: cast.name,
          age: cast.age || 0,
          gender: cast.gender || '',
          role: cast.role,
          description: cast.description || '',
          imageUrl: cast.imageUrl || '',
        }
        await putCast(nodeId, castData)

        updateNodeInStore(nodeId, {
          name: cast.name,
          role: cast.role,
          image: cast.imageUrl,
        })
      } catch (error) {
        console.error('Failed to update cast:', error)
      }
    },
    [updateNodeInStore],
  )

  const onNodeRemove = useCallback(
    async (nodeId: string) => {
      try {
        await deleteCast(nodeId)
        removeNode(nodeId)
      } catch (error) {
        console.error('Failed to remove cast:', error)
      }
    },
    [removeNode],
  )

  // Edge Management Functions
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false
  }, [])

  const onReconnect = useCallback(
    async (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true
      try {
        const result = await putCastRelationshipHandle(oldEdge.id, {
          source: Number(newConnection.source),
          target: Number(newConnection.target),
          type: oldEdge.type as keyof EdgeTypes,
          sourceHandle: newConnection.sourceHandle!,
          targetHandle: newConnection.targetHandle!,
        })

        const updatedEdges = edges.map((edge) =>
          edge.id === oldEdge.id
            ? {
                ...edge,
                id: result.id || edge.id, // 새 ID가 있으면 업데이트
                source: newConnection.source || edge.source,
                target: newConnection.target || edge.target,
                sourceHandle: newConnection.sourceHandle || edge.sourceHandle,
                targetHandle: newConnection.targetHandle || edge.targetHandle,
              }
            : edge,
        )
        setEdges(updatedEdges as CustomEdge[])
      } catch (error) {
        console.error('Failed to handle edge reconnection:', error)
      }
    },
    [edges, setEdges],
  )

  const onReconnectEnd = useCallback(
    async (_event: MouseEvent | TouchEvent, edge: Edge) => {
      try {
        if (!edgeReconnectSuccessful.current) {
          // 재연결이 실패한 경우 엣지 삭제
          await deleteCastRelationship(edge.id)
          removeEdge(edge.id)
        }
      } catch (error) {
        console.error('Failed to handle edge reconnection:', error)
      }
    },
    [removeEdge],
  )

  const onConnect = useCallback(
    async (connection: Connection) => {
      try {
        const newCast = await postCastRelationship({
          source: Number(connection.source),
          target: Number(connection.target),
          label: '관계',
          type: isBidirectionalEdge ? 'BIDIRECTIONAL' : 'DIRECTIONAL',
          sourceHandle: connection.sourceHandle || 'left',
          targetHandle: connection.targetHandle || 'right',
        })
        onConnectFromStore(connection, newCast.id)
      } catch (error) {
        console.error('Failed to create cast relationship:', error)
      }
    },
    [onConnectFromStore, isBidirectionalEdge],
  )

  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      const positionChanges = changes.filter(
        (change) => change.type === 'position' && change.dragging === false,
      )

      for (const change of positionChanges) {
        if (change.type === 'position' && 'position' in change) {
          const { id, position } = change
          try {
            await patchCastCoord(id, {
              x: position?.x ?? 0,
              y: position?.y ?? 0,
            })
          } catch (error) {
            console.error('Failed to update cast position:', error)
          }
        }
      }

      onNodesChangeFromStore(changes)
    },
    [onNodesChangeFromStore],
  )

  const onEdgeLabelChange = useCallback(
    async (edgeId: string, newLabel: string) => {
      const edge = edges.find((e) => e.id === edgeId)
      if (edge) {
        try {
          await patchCastRelationshipLabel(edgeId, { label: newLabel })
          updateEdgeLabelInStore(edgeId, newLabel)
        } catch (error) {
          console.error('Failed to update cast relationship:', error)
        }
      }
    },
    [edges, updateEdgeLabelInStore],
  )

  return {
    // State
    nodes,
    edges,
    isBidirectionalEdge,

    // Node Management
    onNodeAdd,
    onNodeUpdate,
    onNodeRemove,

    // Edge Management
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    onEdgeLabelChange,
    removeEdge,

    // Flow Management
    setInitialFlow,
    onNodesChange,
    onConnect,
    setIsBidirectionalEdge,
  }
}
