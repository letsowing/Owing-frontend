import { useCallback } from 'react';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCharacterStore } from "@/stores/characterStore";

export const useCustomReactFlow = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
  } = useCharacterStore()

  const onNodesChange = useCallback(
    (changes:) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  )
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  )

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  )

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  }
}

export default useCustomReactFlow
