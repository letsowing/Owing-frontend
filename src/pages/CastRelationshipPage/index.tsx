import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'
import { useThemeStore } from '@stores/themeStore'

import { useCharFlow } from '@hooks/useCharFlow'
import { useModalManagement } from '@hooks/useModal'

import { generateUUID } from '@utils/uuid'

import AddButton from './AddButton'
import BidirectionalEdge from './BidirectionalEdge'
import CustomNode from './CustomNode'
import DirectionalEdge from './DirectionalEdge'
import SelectEdgeButton from './SelectEdgeButton'
import CastRelationshipModal from './modal/CastRelationshipModal'

import {
  deleteCast,
  deleteCastRelationship,
  getCast,
  getCastGraph,
  postCast,
  postCastRelationship,
  putCast,
  putCastCoord,
  putCastRelationship,
} from '@services/castService'
import {
  Cast,
  CastCoord,
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
    addCast,
    updateCast,
    deleteCast: deleteCastFromStore,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange: onEdgeLabelChangeFromStore,
    setInitialFlow,
  } = useCharFlow()

  const { isDarkMode } = useThemeStore()
  const { modals, openModal, closeModal } = useModalManagement()
  const { currentProject } = useProjectStore()

  const [isEditable, setIsEditable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true)
        const graphData = await getCastGraph(currentProject.id)
        setInitialFlow(graphData.nodes, graphData.edges)
      } catch (error) {
        console.error('초기 그래프 데이터를 가져오는 데 실패했습니다:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [currentProject.id, setInitialFlow])

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
          await putCastRelationship(edgeId, {
            sourceId: Number(edge.source),
            targetId: Number(edge.target),
            label: newLabel,
            type: edge.type as keyof EdgeTypes,
            sourceHandle: edge.sourceHandle || 'left',
            targetHandle: edge.targetHandle || 'right',
          })
        } catch (error) {
          console.error('Failed to update cast relationship:', error)
        }
      }
    },
    [onEdgeLabelChangeFromStore, edges],
  )

  const handleCastAction = useCallback(
    async (cast: Cast) => {
      try {
        if (cast.id) {
          // 기존 캐릭터 업데이트
          const updatedCast = await putCast(cast)
          updateCast(updatedCast)
        } else {
          // 새 캐릭터 생성
          const castData = {
            name: cast.name,
            age: cast.age,
            gender: cast.gender,
            role: cast.role,
            detail: cast.detail,
            position: cast.position,
            imageUrl: cast.imageUrl,
            folderId: 29,
          }
          const newCast = await postCast(castData)
          addCast(newCast)
        }
        closeModal()
        setIsEditable(false)
      } catch (error) {
        console.error('Failed to handle cast action:', error)
      }
    },
    [updateCast, addCast, closeModal],
  )

  const handleCloseModal = useCallback(() => {
    closeModal()
    setIsEditable(false)
  }, [closeModal])

  const handleNodeClick = useCallback(
    async (_event: React.MouseEvent, node: CustomNodeType) => {
      try {
        setIsLoading(true)
        const cast = await getCast(node.id)
        if (cast) {
          openModal({
            type: ModalType.CHARACTER_RELATIONSHIP,
            cast,
            isEditable: false,
            onSave: handleCastAction,
            onEdit: toggleEditMode,
            onClose: handleCloseModal,
          })
          setIsEditable(false)
        }
      } catch (error) {
        console.error('Failed to fetch cast details:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [handleCastAction, handleCloseModal, openModal, toggleEditMode],
  )

  const handleAddCast = useCallback(() => {
    openModal({
      type: ModalType.CHARACTER_RELATIONSHIP,
      cast: null,
      isEditable: true,
      onSave: handleCastAction,
      onEdit: toggleEditMode,
      onClose: handleCloseModal,
    })
    setIsEditable(true)
  }, [handleCloseModal, handleCastAction, openModal, toggleEditMode])

  const handleNodeRemove = useCallback(
    async (nodeId: string) => {
      setIsLoading(true)
      try {
        await deleteCast(nodeId)
        deleteCastFromStore(nodeId)
      } catch (err) {
        console.error('Failed to remove node:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [deleteCastFromStore],
  )

  const onConnect = useCallback(
    async (connection: Connection) => {
      const newEdgeId = generateUUID()
      onConnectFromStore(connection, newEdgeId)

      try {
        await postCastRelationship({
          uuid: newEdgeId,
          sourceId: Number(connection.source),
          targetId: Number(connection.target),
          label: '관계',
          type: isBidirectionalEdge ? 'BIDIRECTIONAL' : 'DIRECTIONAL',
          sourceHandle: connection.sourceHandle || 'left',
          targetHandle: connection.targetHandle || 'right',
        })
      } catch (error) {
        console.error('Failed to create cast relationship:', error)
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
            await putCastCoord(id, {
              position: {
                x: position?.x ?? 0,
                y: position?.y ?? 0,
              },
            } as unknown as CastCoord)
          } catch (error) {
            console.error('Failed to update cast position:', error)
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
          await deleteCastRelationship(edge.id)
          onReconnectEndFromStore(event, edge as Edge)
        }
      } catch (error) {
        console.error('Failed to delete cast relationship:', error)
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
          <AddButton onClick={handleAddCast} />
          <SelectEdgeButton
            isBidirectional={isBidirectionalEdge}
            onChange={setIsBidirectionalEdge}
          />
        </div>
      </div>
      {modals.map((modal, index) => {
        if (modal.type === 'CHARACTER_RELATIONSHIP') {
          return (
            <CastRelationshipModal
              key={index}
              isEditable={isEditable}
              onEdit={() => setIsEditable(true)}
              onSave={handleCastAction}
              onClose={handleCloseModal}
              type={ModalType.CHARACTER_RELATIONSHIP}
              cast={modal.cast}
            />
          )
        }
        return null
      })}
    </>
  )
}

const CastRelationship: React.FC = () => (
  <div className="relative h-full w-full">
    <ReactFlowProvider>
      <FlowWithProvider />
    </ReactFlowProvider>
  </div>
)

export default CastRelationship
