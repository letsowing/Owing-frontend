import { FlowEdge, FlowNode } from '@/types/node'
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  nodes: FlowNode[]
  edges: FlowEdge[]
  setNodes: (nodes: FlowNode[]) => void
  setEdges: (edges: FlowEdge[]) => void
}

export const useCharacterStore = create<StoreState>()(
  persist(
    (set) => ({
      nodes: [],
      edges: [],
      setNodes: (nodes: FlowNode[]) => set({ nodes }),

      setEdges: (edges: FlowEdge[]) => set({ edges }),
    }),
    {
      name: 'flow-storage',
      getStorage: () => localStorage,
    },
  ),
)
