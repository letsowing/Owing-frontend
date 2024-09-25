import React from 'react'

import CustomNode from './CustomNode'

import { useFlow } from '@/hooks/useFlow'
import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const nodeTypes = {
  customNode: CustomNode,
}

const CharacterRelationship: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, createNode } =
    useFlow()

  return (
    <div className="relative h-full w-full">
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

export default CharacterRelationship
