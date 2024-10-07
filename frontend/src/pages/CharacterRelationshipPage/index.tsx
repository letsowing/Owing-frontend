import React, { useCallback, useMemo, useState } from 'react'

import useThemeStore from '@stores/themeStore'

import { useCharFlow } from '@hooks/useCharFlow'
import { useModalManagement } from '@hooks/useModal'

import AddButton from './AddButton'
import BidirectionalEdge from './BidirectionalEdge'
import CustomNode from './CustomNode'
import DirectionalEdge from './DirectionalEdge'
import SelectEdgeButton from './SelectEdgeButton'
import CharacterRelationshipModal from './modal/CharacterRelationshipModal'

import {
  Character,
  CustomNodeProps,
  CustomNode as CustomNodeType,
  EdgeTypes,
  ModalType,
  NodeTypes,
} from '@types'
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
    addCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacterById,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
  } = useCharFlow()

  const { isDarkMode } = useThemeStore()
  const { modals, openModal, closeModal } = useModalManagement()

  const [isEditable, setIsEditable] = useState(false)

  const isValidConnection = () => {
    return true // 모든 연결 허용
  }

  const toggleEditMode = useCallback(() => {
    setIsEditable((prev) => !prev)
  }, [])

  const handleEdgeLabelChange = useCallback(
    (edgeId: string, newLabel: string) => {
      onEdgeLabelChange(edgeId, newLabel)
    },
    [onEdgeLabelChange],
  )

  const handleCharacterAction = useCallback(
    (character: Character) => {
      if (character.id) {
        updateCharacter(character)
      } else {
        addCharacter(character)
      }
      closeModal()
      setIsEditable(false)
    },
    [updateCharacter, addCharacter, closeModal],
  )

  const handleCloseModal = useCallback(() => {
    closeModal()
    setIsEditable(false)
  }, [closeModal])

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: CustomNodeType) => {
      const character = getCharacterById(node.id)
      if (character) {
        openModal({
          type: ModalType.CHARACTER_RELATIONSHIP,
          character,
          isEditable: false,
          onSave: handleCharacterAction,
          onEdit: toggleEditMode,
          onClose: handleCloseModal,
        })
        setIsEditable(false)
      }
    },
    [
      getCharacterById,
      handleCharacterAction,
      handleCloseModal,
      openModal,
      toggleEditMode,
    ],
  )

  const handleAddCharacter = useCallback(() => {
    openModal({
      type: ModalType.CHARACTER_RELATIONSHIP,
      character: null,
      isEditable: true,
      onSave: handleCharacterAction,
      onEdit: toggleEditMode,
      onClose: handleCloseModal,
    })
    setIsEditable(true)
  }, [handleCloseModal, handleCharacterAction, openModal, toggleEditMode])

  const handleNodeRemove = useCallback(
    (nodeId: string) => {
      deleteCharacter(nodeId)
    },
    [deleteCharacter],
  )

  const nodeTypes = useMemo<NodeTypes>(
    () => ({
      customNode: (props: CustomNodeProps) => (
        <CustomNode
          {...props}
          onNodeRemove={handleNodeRemove}
          onNodeClick={handleNodeClick}
        />
      ),
    }),
    [handleNodeRemove, handleNodeClick],
  )

  const edgeTypes = useMemo<EdgeTypes>(
    () => ({
      Directional: (props: EdgeProps) => (
        <DirectionalEdge
          {...props}
          onLabelChange={handleEdgeLabelChange}
          type="Directional"
        />
      ),
      Bidirectional: (props: EdgeProps) => (
        <BidirectionalEdge
          {...props}
          onLabelChange={handleEdgeLabelChange}
          type="Bidirectional"
        />
      ),
    }),
    [handleEdgeLabelChange],
  )

  const defaultEdgeOptions = useMemo(
    () => ({
      type: isBidirectionalEdge ? 'Bidirectional' : 'Directional',
    }),
    [isBidirectionalEdge],
  )

  return (
    <>
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
      {modals.map((modal, index) => {
        if (modal.type === 'CHARACTER_RELATIONSHIP') {
          return (
            <CharacterRelationshipModal
              key={index}
              isEditable={isEditable}
              onEdit={() => setIsEditable(true)}
              onSave={handleCharacterAction}
              onClose={handleCloseModal}
              type={ModalType.CHARACTER_RELATIONSHIP}
              character={modal.character}
            />
          )
        }
        return null
      })}
    </>
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
