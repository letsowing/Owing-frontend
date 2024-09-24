import { FlowEdge, FlowNode } from '@/types/node'
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  nodes: FlowNode[]
  edges: FlowEdge[]
  addNode: (node: FlowNode) => void
  removeNode: (nodeId: string) => void
  updateNode: (nodeId: string, updates: Partial<FlowNode>) => void
  addEdge: (edge: FlowEdge) => void
  updateEdge: (edgeId: string, updates: Partial<FlowEdge>) => void
}

export const useCharacterStore = create<StoreState>()(
  persist(
    (set) => ({
      nodes: [],
      edges: [],
      addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
      removeNode: (nodeId) =>
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== nodeId),
          edges: state.edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId,
          ),
        })),
      updateNode: (nodeId, updates) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId ? { ...node, ...updates } : node,
          ),
        })),
      addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
      updateEdge: (edgeId, updates) =>
        set((state) => ({
          edges: state.edges.map((edge) =>
            edge.id === edgeId ? { ...edge, ...updates } : edge,
          ),
        })),
    }),
    {
      name: 'character-flow',
    },
  ),
)
