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
  onNodeClick: (nodeId: string) => void
  reconnect: (oldEdge: Edge, newConnection: Connection) => void
}

const getInitialState = (): Pick<FlowState, 'nodes' | 'edges'> => {
  const storedState = localStorage.getItem('flow-storage')
  if (storedState) {
    return JSON.parse(storedState)
  }
  return { nodes: [], edges: [] }
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
      onNodeClick: (nodeId: string) => {
        get().removeNode(nodeId)
      },
      reconnect: (oldEdge: Edge, newConnection: Connection) => {
        set({
          edges: get().edges.map((edge) =>
            edge.id === oldEdge.id ? { ...edge, ...newConnection } : edge,
          ),
        })
      },
    }),
    {
      name: 'flow-storage',
      getStorage: () => localStorage,
    },
  ),
)
