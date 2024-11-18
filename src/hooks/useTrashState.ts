import { useCallback, useEffect, useMemo, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import { useTrashActions } from './useTrashActions'

import { getTrashcanList } from '@services/trashService'
import {
  FileItem,
  FolderItem,
  TrashActions,
  TrashContentType,
  TrashFolderData,
  TrashSelection,
  TrashSetters,
  TrashState,
} from '@types'

export const useTrashState = () => {
  const currentProject = useProjectStore((state) => state.currentProject)

  const [state, setState] = useState<TrashState>({
    selectedType: 'story',
    items: {
      story: [],
      cast: [],
      universe: [],
    },
    selectedFolder: null,
    selectedFile: null,
    isStoryDetail: false,
  })

  const updateItems = useCallback(async () => {
    if (!currentProject?.id) return

    try {
      const fetchedFolders = await getTrashcanList(currentProject.id)
      setState((prev) => {
        // 현재 선택된 폴더가 여전히 존재하는지 확인
        const currentFolder = prev.selectedFolder
        const currentType = prev.selectedType
        const folderExists =
          currentFolder &&
          fetchedFolders[currentType].some(
            (folder: FolderItem) => folder.id === currentFolder.id,
          )

        // 현재 선택된 파일이 여전히 존재하는지 확인
        const currentFile = prev.selectedFile
        const fileExists =
          folderExists &&
          currentFile &&
          fetchedFolders[currentType]
            .find((folder: FolderItem) => folder.id === currentFolder?.id)
            ?.files.some((file: FileItem) => file.id === currentFile.id)

        return {
          ...prev,
          items: fetchedFolders,
          selectedFolder: folderExists ? currentFolder : null,
          selectedFile: fileExists ? currentFile : null,
        }
      })
    } catch (err) {
      console.error('폴더 목록 조회 실패:', err)
    }
  }, [currentProject?.id])

  // 초기 데이터 로드
  useEffect(() => {
    updateItems()
  }, [updateItems])

  const setters: TrashSetters = useMemo(
    () => ({
      setSelectedType: (type: TrashContentType) =>
        setState((prev) => ({ ...prev, selectedType: type })),
      setItems: (items: TrashFolderData) =>
        setState((prev) => ({ ...prev, items })),
      setSelectedFolder: (folder: FolderItem | null) =>
        setState((prev) => ({ ...prev, selectedFolder: folder })),
      setSelectedFile: (file: FileItem | null) =>
        setState((prev) => ({ ...prev, selectedFile: file })),
      setIsStoryDetail: (check: boolean) =>
        setState((prev) => ({ ...prev, isStoryDetail: check })),
    }),
    [],
  )

  const actions = useTrashActions()

  const enhancedActions: TrashActions = useMemo(
    () => ({
      onFolderSelect: setters.setSelectedFolder,
      onFileSelect: setters.setSelectedFile,
      setSelectedType: setters.setSelectedType,
      setIsStoryDetail: setters.setIsStoryDetail,
      onDelete: async (elementId: number, isFolder?: boolean) => {
        await actions.onDelete(elementId, isFolder)
        await updateItems()
      },
      onRestore: async (elementId: number, isFolder?: boolean) => {
        await actions.onRestore(elementId, isFolder)
        await updateItems()
      },
      onEmptyTrash: async (projectId: number) => {
        await actions.onEmptyTrash(projectId)
        await updateItems()
      },
    }),
    [actions, setters, updateItems],
  )

  const selection: TrashSelection = {
    selectedType: state.selectedType,
    selectedFolder: state.selectedFolder,
    selectedFile: state.selectedFile,
    isStoryDetail: state.isStoryDetail,
  }

  return {
    selection,
    actions: enhancedActions,
    items: state.items,
  }
}
