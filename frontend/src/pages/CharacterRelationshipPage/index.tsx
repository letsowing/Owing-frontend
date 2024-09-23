import React from 'react'

import CustomNode from './CustomNode'

import { useCharacterStore } from '@/stores/characterStore'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'

const nodeTypes = {
  custom: CustomNode,
}

const CharacterRelationship: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useCharacterStore()

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default CharacterRelationship
