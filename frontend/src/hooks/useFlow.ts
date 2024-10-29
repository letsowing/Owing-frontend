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
  } = useFlowStore(
    useCallback(
      (state) => ({
        nodes: state.nodes as Node<CustomNodeData>[],
        edges: state.edges,
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
      addNode({
        id,
        data,
        position,
        type: 'customNode',
      } as CustomNode)
    },
    [addNode],
  )

  const onNodeUpdate = useCallback(
    (nodeId: string, data: Partial<CustomNodeData>) => {
      updateNode(nodeId, data)
    },
    [updateNode],
  )

  const onNodeRemove = useCallback(
    (nodeId: string) => removeNode(nodeId),
    [removeNode],
  )

  const onEdgeRemove = useCallback(
    (edgeId: string) => removeEdge(edgeId),
    [removeEdge],
  )

  const onEdgeLabelChange = useCallback(
    (edgeId: string, newLabel: string) => updateEdgeLabel(edgeId, newLabel),
    [updateEdgeLabel],
  )

  return {
    nodes,
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
    onNodeUpdate,
    setIsBidirectionalEdge,
    onNodeRemove,
    onEdgeRemove,
    onEdgeLabelChange,
  }
}
