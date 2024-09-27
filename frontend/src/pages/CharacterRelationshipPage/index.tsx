import React, { useCallback, useMemo } from 'react'

import useThemeStore from '@stores/themeStore'

import { useFlow } from '@hooks/useFlow'

import AddButton from './AddButton'
import CustomEdge from './CustomEdge'
import CustomNode from './CustomNode'

import {
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const FlowWithProvider: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    onNodeAdd,
  } = useFlow()

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), [])
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), [])
  const { isDarkMode } = useThemeStore()

  const handleAddCharacter = useCallback(() => {
    onNodeAdd(
      {
        name: '김보미',
        role: '여주인공',
        image: 'placeholder.jpg',
      },
      { x: 100, y: 100 },
    )
  }, [onNodeAdd])

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // onNodeClick={(_, node) => onNodeClick(node.id)}
        fitView
        defaultEdgeOptions={{
          type: 'customEdge',
        }}
        connectionMode={ConnectionMode.Loose}
        colorMode={isDarkMode ? 'dark' : 'light'}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <div className="absolute left-4 top-4 z-10">
        <AddButton onClick={handleAddCharacter} />
      </div>
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
