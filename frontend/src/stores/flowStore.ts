import { CustomNode } from '@types'
import {
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FlowState {
  nodes: CustomNode[]
  edges: Edge[]
  isBidirectionalEdge: boolean
}

interface FlowActions {
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  addNode: (node: CustomNode) => void
  removeNode: (nodeId: string) => void
  removeEdge: (edgeId: string) => void
  updateEdgeLabel: (edgeId: string, label: string) => void
  reconnect: (oldEdge: Edge, newConnection: Connection) => void
  setIsBidirectionalEdge: (isBidirectional: boolean) => void
}

interface FlowStore extends FlowState, FlowActions {}

const getInitialState = (): FlowState => {
  const storedState = localStorage.getItem('flow-storage')
  if (storedState) {
    return JSON.parse(storedState)
  }
  return { nodes: [], edges: [], isBidirectionalEdge: false }
}

export const useFlowStore = create<FlowStore>()(
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
        set((state) => {
          const { edges, isBidirectionalEdge } = state

          const edgeType = isBidirectionalEdge
            ? 'bidirectionalEdge'
            : 'unidirectionalEdge'

          const newEdgeId = `${edgeType}-${connection.source}-${connection.target}`

          let updatedEdges = [...edges]

          if (isBidirectionalEdge) {
            // 양방향 엣지 추가 시 기존 모든 관련 엣지 제거
            updatedEdges = updatedEdges.filter(
              (edge) =>
                !(
                  edge.source === connection.source &&
                  edge.target === connection.target
                ) &&
                !(
                  edge.source === connection.target &&
                  edge.target === connection.source
                ),
            )
          } else {
            // 단방향 엣지 추가 시 기존 양방향 엣지만 제거
            updatedEdges = updatedEdges.filter(
              (edge) =>
                !(
                  edge.type === 'bidirectionalEdge' &&
                  ((edge.source === connection.source &&
                    edge.target === connection.target) ||
                    (edge.source === connection.target &&
                      edge.target === connection.source))
                ),
            )
          }

          // 새 엣지 추가
          updatedEdges.push({
            ...connection,
            id: newEdgeId,
            type: edgeType,
            label: '관계',
          })

          return { edges: updatedEdges }
        })
      },

      addNode: (node: CustomNode) => {
        set((state) => ({
          nodes: [...state.nodes, node],
        }))
      },

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
      getStorage: () => localStorage,
    },
  ),
)
