import { CustomEdge, CustomNode, CustomNodeData } from '@types'
import {
  Connection,
  Edge,
  OnEdgesChange,
  OnNodesChange,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FlowState {
  nodes: CustomNode[]
  edges: Edge[]
  isBidirectionalEdge: boolean
}

interface FlowActions {
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: (connection: Connection, id: string) => void
  setNodes: (nodes: CustomNode[]) => void
  setEdges: (edges: CustomEdge[]) => void
  addNode: (node: CustomNode) => void
  removeNode: (nodeId: string) => void
  updateNode: (nodeId: string, data: Partial<CustomNodeData>) => void
  removeEdge: (edgeId: string) => void
  updateEdgeLabel: (edgeId: string, label: string) => void
  reconnect: (oldEdge: Edge, newConnection: Connection) => void
  setIsBidirectionalEdge: (isBidirectional: boolean) => void
}

interface FlowStore extends FlowState, FlowActions {}

export const useFlowStore = create<FlowStore>()(
  persist(
    (set) => ({
      nodes: [],
      edges: [],
      isBidirectionalEdge: false,

      setNodes: (nodes) =>
        set({
          nodes: nodes.map((node) => ({
            ...node,
            data: { ...node.data },
            position: { ...node.position },
          })),
        }),

      setEdges: (edges) =>
        set({
          edges: edges.map((edge) => ({ ...edge })),
        }),

      onNodesChange: (changes) =>
        set((state) => ({
          nodes: applyNodeChanges(changes, state.nodes).map((node) => ({
            ...node,
            data: { ...node.data },
            position: { ...node.position },
          })) as CustomNode[],
        })),

      onEdgesChange: (changes) =>
        set((state) => ({
          edges: applyEdgeChanges(changes, state.edges).map((edge) => ({
            ...edge,
          })),
        })),

      onConnect: (connection: Connection, id: string) => {
        set((state) => {
          const { edges, isBidirectionalEdge } = state
          const edgeType = isBidirectionalEdge ? 'BIDIRECTIONAL' : 'DIRECTIONAL'

          const updatedEdges = [
            ...edges.filter((edge) => {
              if (isBidirectionalEdge) {
                // 양방향 엣지 추가 시 기존 모든 관련 엣지 제거
                return !(
                  (edge.source === connection.source &&
                    edge.target === connection.target) ||
                  (edge.source === connection.target &&
                    edge.target === connection.source)
                )
              } else {
                // 단방향 엣지 추가 시 기존 양방향 엣지만 제거
                return !(
                  edge.type === 'BIDIRECTIONAL' &&
                  ((edge.source === connection.source &&
                    edge.target === connection.target) ||
                    (edge.source === connection.target &&
                      edge.target === connection.source))
                )
              }
            }),

            {
              ...connection,
              id,
              type: edgeType,
              label: '관계',
            },
          ]

          return { edges: updatedEdges }
        })
      },

      addNode: (node: CustomNode) =>
        set((state) => ({
          nodes: [
            ...state.nodes,
            {
              ...node,
              data: { ...node.data },
              position: { ...node.position },
            },
          ],
        })),

      updateNode: (nodeId: string, data: Partial<CustomNodeData>) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? {
                  ...node,
                  data: { ...node.data, ...data },
                  position: { ...node.position },
                }
              : node,
          ),
        })),

      removeNode: (nodeId: string) => {
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== nodeId),
          edges: state.edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId,
          ),
        }))
      },

      removeEdge: (edgeId: string) => {
        set((state) => ({
          edges: state.edges.filter((edge) => edge.id !== edgeId),
        }))
      },

      updateEdgeLabel: (edgeId: string, label: string) => {
        set((state) => ({
          edges: state.edges.map((edge) =>
            edge.id === edgeId ? { ...edge, label } : edge,
          ),
        }))
      },

      reconnect: (oldEdge: Edge, newConnection: Connection) => {
        set((state) => ({
          edges: state.edges.map((edge) =>
            edge.id === oldEdge.id ? { ...edge, ...newConnection } : edge,
          ),
        }))
      },

      setIsBidirectionalEdge: (isBidirectional: boolean) => {
        set({ isBidirectionalEdge: isBidirectional })
      },
    }),
    {
      name: 'flow-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
