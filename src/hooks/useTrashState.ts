import { useEffect, useMemo, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import { useTrashActions } from './useTrashActions'

import { getTrashcanList } from '@services/trashService'
import {
  FileItem,
  FolderItem,
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
    isStoryDetail: false, // Added to match TrashState interface
  })

  const setters: TrashSetters = useMemo(
    () => ({
      setSelectedType: (type: TrashContentType) =>
        setState((prev) => ({ ...prev, selectedType: type })),
      setItems: (items: TrashFolderData) =>
        setState((prev) => ({ ...prev, items })),
      setSelectedFolder: (folder: FolderItem | null) => {
        setState((prev) => ({ ...prev, selectedFolder: folder }))
      },
      setSelectedFile: (file: FileItem | null) =>
        setState((prev) => ({ ...prev, selectedFile: file })),
      setIsStoryDetail: (check: boolean) =>
        setState((prev) => ({ ...prev, isStoryDetail: check })),
    }),
    [],
  )

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedFolders = await getTrashcanList(currentProject.id)
        setters.setItems(fetchedFolders)
        if (fetchedFolders.story.length > 0) {
          const firstFolder = fetchedFolders.story[0]
          setters.setSelectedFolder(firstFolder)
          if (firstFolder.files.length > 0) {
            setters.setSelectedFile(firstFolder.files[0])
          }
        }
      } catch (err) {
        console.error('폴더 목록 조회 실패:', err)
      }
    }

    if (currentProject?.id) {
      fetchInitialData()
    }
  }, [currentProject.id, setters])

  const actions = {
    onFolderSelect: setters.setSelectedFolder,
    onFileSelect: setters.setSelectedFile,
    ...useTrashActions(state, setters),
    setSelectedType: setters.setSelectedType,
    setIsStoryDetail: setters.setIsStoryDetail,
  }

  const selection: TrashSelection = {
    selectedType: state.selectedType,
    selectedFolder: state.selectedFolder,
    selectedFile: state.selectedFile,
    isStoryDetail: state.isStoryDetail,
  }

  return {
    selection,
    actions,
    items: state.items,
  }
}
