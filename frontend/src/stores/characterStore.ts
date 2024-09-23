import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import { create } from 'zustand'

type CharacterState = {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  nodes: [
    {
      id: '1',
      type: 'custom',
      position: { x: 0, y: 0 },
      data: { label: '이름 작성', image: '/path/to/image1.jpg' },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 250, y: 0 },
      data: { label: '이름 작성', image: '/path/to/image2.jpg' },
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 500, y: 0 },
      data: { label: '이름 작성', image: '/path/to/image3.jpg' },
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 250, y: 200 },
      data: { label: '이름 작성', image: '/path/to/image4.jpg' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', label: '조직적', animated: true },
    { id: 'e2-3', source: '2', target: '3', label: '남매', animated: true },
    {
      id: 'e1-4',
      source: '1',
      target: '4',
      label: '대립관계',
      animated: true,
    },
  ],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
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
}))
