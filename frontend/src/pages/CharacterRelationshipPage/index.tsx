import React from 'react'

import { useCustomReactFlow } from '@/hooks/useCustomReactFlow'
import AddButton from '@/pages/CharacterRelationshipPage/AddButton'
import { FlowEdge } from '@/types/node'
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MarkerType,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'

const FlowDiagramContent: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleAddNode,
  } = useCustomReactFlow()

  const edgeWithRelationship = (edge: FlowEdge): Edge => ({
    ...edge,
    label: edge.data?.relationship,
    labelStyle: { fill: '#000', fontWeight: 700 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#000' },
  })

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges.map(edgeWithRelationship)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <div className="absolute right-4 top-4 z-10">
        <AddButton onClick={handleAddNode} />
      </div>
    </div>
  )
}

const FlowDiagram: React.FC = () => {
  return (
    <ReactFlowProvider>
      <div className="h-full w-full">
        <FlowDiagramContent />
      </div>
    </ReactFlowProvider>
  )
}

export default FlowDiagram
