import { useCallback } from 'react'

import { useCharacterStore } from '@/stores/characterStore'
import { FlowEdge, FlowNode } from '@/types/node'
import {
  Connection,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from 'reactflow'

export const useCustomReactFlow = () => {
  const { setNodes, setEdges } = useReactFlow()
  const {
    nodes,
    edges,
    addNode,
    removeNode,
    updateNode,
    addEdge: addStoreEdge,
    updateEdge,
  } = useCharacterStore()

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds)
        changes.forEach((change) => {
          if (change.type === 'position' && change.dragging) {
            updateNode(change.id, { position: change.position }) // 여기서 무한 루프 발생 가능성
          }
        })
        return updatedNodes
      })
    },
    [setNodes, updateNode],
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => {
        const updatedEdges = applyEdgeChanges(changes, eds)
        changes.forEach((change) => {
          if (change.type === 'select') {
            updateEdge(change.id, { selected: change.selected })
          }
        })
        return updatedEdges
      })
    },
    [setEdges, updateEdge],
  )

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const relationship = prompt('관계를 입력하세요:')
      if (relationship) {
        const newEdge: FlowEdge = {
          ...connection,
          id: `e${connection.source}-${connection.target}`,
          data: { relationship },
          animated: true,
          source: connection.source || '',
          target: connection.target || '',
          sourceHandle: connection.sourceHandle || '',
          targetHandle: connection.targetHandle || '',
        }
        setEdges((eds) => addEdge(newEdge, eds))
        addStoreEdge(newEdge)
      }
    },
    [setEdges, addStoreEdge],
  )

  const handleAddNode = useCallback(() => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      data: {
        id: `node-${Date.now()}`,
        name: '새 노드',
        role: '역할',
        image: 'https://via.placeholder.com/150',
      },
    }
    addNode(newNode)
    setNodes((nds) => nds.concat(newNode))
  }, [addNode, setNodes])

  const handleRemoveNode = useCallback(
    (nodeId: string) => {
      removeNode(nodeId)
      setNodes((nds) => nds.filter((node) => node.id !== nodeId))
    },
    [removeNode, setNodes],
  )

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleAddNode,
    handleRemoveNode,
  }
}

export default useCustomReactFlow
