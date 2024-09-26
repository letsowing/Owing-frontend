import React, { useMemo } from 'react'

import CustomEdge from './CustomEdge'
import CustomNode from './CustomNode'

import { useFlow } from '@/hooks/useFlow'
import useThemeStore from '@/stores/themeStore'
import {
  Background,
  ConnectionMode,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const FlowWithProvider: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, createNode } =
    useFlow()
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), [])
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), [])
  const { isDarkMode } = useThemeStore()

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        defaultEdgeOptions={{
          type: 'customEdge',
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        connectionMode={ConnectionMode.Loose}
        colorMode={isDarkMode ? 'dark' : 'light'}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <button
        className="absolute left-4 top-4 z-10 rounded bg-blue px-4 py-2 text-white"
        onClick={() =>
          createNode(
            {
              name: 'New Character',
              role: 'Unknown',
              image: 'placeholder.jpg',
            },
            { x: 100, y: 100 },
          )
        }
      >
        Add Character
      </button>
    </div>
  )
}

const CharacterRelationship: React.FC = () => (
  <div className="relative h-full w-full">
    <ReactFlowProvider>
      <FlowWithProvider />
    </ReactFlowProvider>
  </div>
)

export default CharacterRelationship
