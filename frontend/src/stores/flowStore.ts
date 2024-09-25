import { CustomNode } from '@/types/node'
import {
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FlowState {
  nodes: CustomNode[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  addNode: (node: CustomNode) => void
  removeNode: (nodeId: string) => void
  removeEdge: (edgeId: string) => void
}

const getInitialState = (): Pick<FlowState, 'nodes' | 'edges'> => {
  const storedState = localStorage.getItem('flow-storage')
  if (storedState) {
    return JSON.parse(storedState)
  }
  return { nodes: [], edges: [] } // 기본 초기값
}

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      ...getInitialState(),
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes) as CustomNode[],
        })
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        })
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        })
      },
      addNode: (node: CustomNode) => {
        set({
          nodes: [...get().nodes, node],
        })
      },
      removeNode: (nodeId: string) => {
        set({
          nodes: get().nodes.filter((node) => node.id !== nodeId),
          edges: get().edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId,
          ),
        })
      },
      removeEdge: (edgeId: string) => {
        set({
          edges: get().edges.filter((edge) => edge.id !== edgeId),
        })
      },
    }),
    {
      name: 'flow-storage',
      getStorage: () => localStorage,
    },
  ),
)
