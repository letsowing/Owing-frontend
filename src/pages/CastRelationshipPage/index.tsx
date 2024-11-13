import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'
import { useThemeStore } from '@stores/themeStore'

import { useModalManagement } from '@hooks/useModal'

import AddButton from './AddButton'
import BidirectionalEdge from './BidirectionalEdge'
import CustomNode from './CustomNode'
import DirectionalEdge from './DirectionalEdge'
import SelectEdgeButton from './SelectEdgeButton'
import CastRelationshipModal from './modal/CastRelationshipModal'

import { useFlow } from '@/hooks/useFlow'
import { getCast, getFolderList } from '@services/castService'
import {
  Cast,
  CustomNodeProps,
  CustomNode as CustomNodeType,
  EdgeTypes,
  FolderSummary,
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
    isBidirectionalEdge,
    onNodesChange,
    onConnect,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    onNodeAdd,
    onNodeUpdate,
    onNodeRemove,
    onEdgeLabelChange,
    setInitialFlow,
    setIsBidirectionalEdge,
  } = useFlow()

  const { isDarkMode } = useThemeStore()
  const { modals, openModal, closeModal } = useModalManagement()
  const { currentProject } = useProjectStore()

  const [isEditable, setIsEditable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [folderList, setFolderList] = useState<FolderSummary[]>([])
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>()

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true)
        await setInitialFlow(currentProject.id)

        const list = await getFolderList(currentProject.id)
        setFolderList(list)
      } catch (error) {
        console.error('초기 그래프 데이터를 가져오는 데 실패했습니다:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [currentProject.id, setFolderList, setInitialFlow])

  const isValidConnection = () => {
    return true // 모든 연결 허용
  }

  const toggleEditMode = useCallback(() => {
    setIsEditable((prev) => !prev)
  }, [])

  const handleCloseModal = useCallback(() => {
    closeModal()
    setIsEditable(false)
  }, [closeModal])

  const handleCastAction = useCallback(
    async (cast: Cast, selectedFolderId: number | undefined) => {
      try {
        if (cast.id) {
          onNodeUpdate(cast.id, cast)
        } else {
          onNodeAdd(cast, selectedFolderId)
        }
        handleCloseModal()
      } catch (error) {
        console.error('Failed to handle cast action:', error)
      }
    },
    [onNodeUpdate, onNodeAdd, handleCloseModal],
  )

  const handleNodeClick = useCallback(
    async (_event: React.MouseEvent, node: CustomNodeType) => {
      try {
        setIsLoading(true)
        const data = await getCast(node.id)
        setSelectedFolderId(data.folderId)
        if (data) {
          openModal({
            type: ModalType.CHARACTER_RELATIONSHIP,
            cast: {
              ...data.cast,
              position: data.cast.coordinate,
            },
            isEditable: false,
            folderId: selectedFolderId,
            folderList: folderList,
            onSave: handleCastAction,
            onEdit: toggleEditMode,
            onSelect: setSelectedFolderId,
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
    [
      folderList,
      handleCastAction,
      handleCloseModal,
      openModal,
      selectedFolderId,
      toggleEditMode,
    ],
  )

  const handleAddCast = useCallback(async () => {
    openModal({
      type: ModalType.CHARACTER_RELATIONSHIP,
      cast: null,
      isEditable: true,
      folderId: undefined,
      folderList: folderList,
      onSave: handleCastAction,
      onEdit: toggleEditMode,
      onSelect: setSelectedFolderId,
      onClose: handleCloseModal,
    })
    setIsEditable(true)
  }, [
    openModal,
    folderList,
    handleCastAction,
    toggleEditMode,
    handleCloseModal,
  ])

  const handleNodeRemove = useCallback(
    (nodeId: string) => {
      onNodeRemove(nodeId)
    },
    [onNodeRemove],
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
          onLabelChange={onEdgeLabelChange}
          type="DIRECTIONAL"
        />
      ),
      BIDIRECTIONAL: (props: EdgeProps) => (
        <BidirectionalEdge
          {...props}
          onLabelChange={onEdgeLabelChange}
          type="BIDIRECTIONAL"
        />
      ),
    }),
    [onEdgeLabelChange],
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
              folderId={modal.folderId}
              folderList={modal.folderList}
              onSave={handleCastAction}
              onEdit={() => setIsEditable(true)}
              onSelect={setSelectedFolderId}
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
