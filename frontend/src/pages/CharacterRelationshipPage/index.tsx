import React, { useCallback, useEffect, useMemo, useState } from 'react'

import useThemeStore from '@stores/themeStore'
import { useWorkStore } from '@stores/workStore'

import { useCharFlow } from '@hooks/useCharFlow'
import { useModalManagement } from '@hooks/useModal'

import AddButton from './AddButton'
import BidirectionalEdge from './BidirectionalEdge'
import CustomNode from './CustomNode'
import DirectionalEdge from './DirectionalEdge'
import SelectEdgeButton from './SelectEdgeButton'
import CharacterRelationshipModal from './modal/CharacterRelationshipModal'

import { generateUUID } from '@/utils/uuid'
import {
  deleteCharacter,
  deleteCharacterRelationship,
  getCharacter,
  getCharacterGraph,
  postCharacter,
  postCharacterRelationship,
  putCharacter,
  putCharacterCoord,
  putCharacterRelationship,
} from '@services/characterService'
import {
  Character,
  CharacterCoord,
  CustomNodeProps,
  CustomNode as CustomNodeType,
  EdgeTypes,
  ModalType,
  NodeTypes,
} from '@types'
import {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  EdgeProps,
  MiniMap,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const FlowWithProvider: React.FC = () => {
  const {
    nodes,
    edges,
    edgeReconnectSuccessful,
    onNodesChange: onNodesChangeFromStore,
    onConnect: onConnectFromStore,
    onReconnectStart,
    onReconnect,
    onReconnectEnd: onReconnectEndFromStore,
    addCharacter,
    updateCharacter,
    deleteCharacter: deleteCharacterFromStore,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange: onEdgeLabelChangeFromStore,
    setInitialFlow,
  } = useCharFlow()

  const { isDarkMode } = useThemeStore()
  const { modals, openModal, closeModal } = useModalManagement()
  const { currentWork } = useWorkStore()

  const [isEditable, setIsEditable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true)
        const projectId = currentWork?.id
        if (!projectId) {
          throw new Error('프로젝트 ID가 없습니다.')
        }
        const graphData = await getCharacterGraph(projectId)
        setInitialFlow(graphData.nodes, graphData.edges)
      } catch (error) {
        console.error('초기 그래프 데이터를 가져오는 데 실패했습니다:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [currentWork?.id, setInitialFlow])

  const isValidConnection = () => {
    return true // 모든 연결 허용
  }

  const toggleEditMode = useCallback(() => {
    setIsEditable((prev) => !prev)
  }, [])

  const handleEdgeLabelChange = useCallback(
    async (edgeId: string, newLabel: string) => {
      onEdgeLabelChangeFromStore(edgeId, newLabel)
      const edge = edges.find((e) => e.id === edgeId)
      if (edge) {
        try {
          await putCharacterRelationship(edgeId, {
            sourceId: Number(edge.source),
            targetId: Number(edge.target),
            label: newLabel,
            type: edge.type as keyof EdgeTypes,
            sourceHandle: edge.sourceHandle || 'left',
            targetHandle: edge.targetHandle || 'right',
          })
        } catch (error) {
          console.error('Failed to update character relationship:', error)
        }
      }
    },
    [onEdgeLabelChangeFromStore, edges],
  )

  const handleCharacterAction = useCallback(
    async (character: Character) => {
      try {
        if (character.id) {
          // 기존 캐릭터 업데이트
          const updatedCharacter = await putCharacter(character)
          updateCharacter(updatedCharacter)
        } else {
          // 새 캐릭터 생성
          const characterData = {
            name: character.name,
            age: character.age,
            gender: character.gender,
            role: character.role,
            detail: character.detail,
            position: character.position,
            imageUrl: character.imageUrl,
            folderId: 24,
          }
          const newCharacter = await postCharacter(characterData)
          addCharacter(newCharacter)
        }
        closeModal()
        setIsEditable(false)
      } catch (error) {
        console.error('Failed to handle character action:', error)
      }
    },
    [updateCharacter, addCharacter, closeModal],
  )

  const handleCloseModal = useCallback(() => {
    closeModal()
    setIsEditable(false)
  }, [closeModal])

  const handleNodeClick = useCallback(
    async (_event: React.MouseEvent, node: CustomNodeType) => {
      try {
        setIsLoading(true)
        const character = await getCharacter(node.id)
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
      } catch (error) {
        console.error('Failed to fetch character details:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [handleCharacterAction, handleCloseModal, openModal, toggleEditMode],
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
    async (nodeId: string) => {
      setIsLoading(true)
      try {
        await deleteCharacter(nodeId)
        deleteCharacterFromStore(nodeId)
      } catch (err) {
        console.error('Failed to remove node:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [deleteCharacterFromStore],
  )

  const onConnect = useCallback(
    async (connection: Connection) => {
      const newEdgeId = generateUUID()
      onConnectFromStore(connection, newEdgeId)

      try {
        await postCharacterRelationship({
          uuid: newEdgeId,
          sourceId: Number(connection.source),
          targetId: Number(connection.target),
          label: '관계',
          type: isBidirectionalEdge ? 'BIDIRECTIONAL' : 'DIRECTIONAL',
          sourceHandle: connection.sourceHandle || 'left',
          targetHandle: connection.targetHandle || 'right',
        })
      } catch (error) {
        console.error('Failed to create character relationship:', error)
      }
    },
    [onConnectFromStore, isBidirectionalEdge],
  )

  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      const positionChanges = changes.filter(
        (change) => change.type === 'position' && change.dragging === false,
      )

      for (const change of positionChanges) {
        if (change.type === 'position' && 'position' in change) {
          const { id, position } = change
          try {
            await putCharacterCoord(id, {
              position: {
                x: position?.x ?? 0,
                y: position?.y ?? 0,
              },
            } as unknown as CharacterCoord)
          } catch (error) {
            console.error('Failed to update character position:', error)
          }
        }
      }

      onNodesChangeFromStore(changes)
    },
    [onNodesChangeFromStore],
  )

  const onReconnectEnd = useCallback(
    async (event: MouseEvent | TouchEvent, edge: Edge) => {
      try {
        if (!edgeReconnectSuccessful.current) {
          await deleteCharacterRelationship(edge.id)
          onReconnectEndFromStore(event, edge as Edge)
        }
      } catch (error) {
        console.error('Failed to delete character relationship:', error)
      }
    },
    [edgeReconnectSuccessful, onReconnectEndFromStore],
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
      DIRECTIONAL: (props: EdgeProps) => (
        <DirectionalEdge
          {...props}
          onLabelChange={handleEdgeLabelChange}
          type="DIRECTIONAL"
        />
      ),
      BIDIRECTIONAL: (props: EdgeProps) => (
        <BidirectionalEdge
          {...props}
          onLabelChange={handleEdgeLabelChange}
          type="BIDIRECTIONAL"
        />
      ),
    }),
    [handleEdgeLabelChange],
  )

  const defaultEdgeOptions = useMemo(
    () => ({
      type: isBidirectionalEdge ? 'BIDIRECTIONAL' : 'DIRECTIONAL',
    }),
    [isBidirectionalEdge],
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
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
