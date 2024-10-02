import React, { useCallback, useMemo } from 'react'

import useThemeStore from '@stores/themeStore'

import { useFlow } from '@hooks/useFlow'

import AddButton from './AddButton'
import BidirectionalEdge from './BidirectionalEdge'
import CustomNode from './CustomNode'
import SelectEdgeButton from './SelectEdgeButton'
import UnidirectionalEdge from './UnidirectionalEdge'

import { CustomNodeProps, EdgeTypes, NodeTypes } from '@/types'
import {
  Background,
  ConnectionMode,
  Controls,
  EdgeProps,
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
    onNodeRemove,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
  } = useFlow()

  const isValidConnection = () => {
    return true // 모든 연결 허용
  }

  const handleEdgeLabelChange = useCallback(
    (edgeId: string, newLabel: string) => {
      onEdgeLabelChange(edgeId, newLabel)
    },
    [onEdgeLabelChange],
  )

  const nodeTypes = useMemo<NodeTypes>(
    () => ({
      customNode: (props: CustomNodeProps) => (
        <CustomNode {...props} onNodeRemove={onNodeRemove} />
      ),
    }),
    [onNodeRemove],
  )
  const edgeTypes = useMemo<EdgeTypes>(
    () => ({
      unidirectionalEdge: (props: EdgeProps) => (
        <UnidirectionalEdge
          {...props}
          onLabelChange={handleEdgeLabelChange}
          type="unidirectionalEdge"
        />
      ),
      bidirectionalEdge: (props: EdgeProps) => (
        <BidirectionalEdge
          {...props}
          onLabelChange={handleEdgeLabelChange}
          type="bidirectionalEdge"
        />
      ),
    }),
    [handleEdgeLabelChange],
  )
  const defaultEdgeOptions = useMemo(
    () => ({
      type: isBidirectionalEdge ? 'bidirectionalEdge' : 'unidirectionalEdge',
    }),
    [isBidirectionalEdge],
  )
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
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        isValidConnection={isValidConnection}
        connectionMode={ConnectionMode.Loose}
        colorMode={isDarkMode ? 'dark' : 'light'}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <div className="absolute left-0 right-9 top-2 z-10 flex justify-center">
        <div className="inline-flex space-x-2 rounded-lg bg-beige p-2 dark:bg-coldbeige">
          <AddButton onClick={handleAddCharacter} />
          <SelectEdgeButton
            isBidirectional={isBidirectionalEdge}
            onChange={setIsBidirectionalEdge}
          />
        </div>
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
