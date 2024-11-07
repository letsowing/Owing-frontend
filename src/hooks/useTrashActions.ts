import {
  deleteAllTrashes,
  deleteTrashcanFile,
  deleteTrashcanFolder,
  postRestoreTrashcanFile,
  postRestoreTrashcanFolder,
} from '@services/trashService'
import { FolderItem, TrashSetters, TrashState } from '@types'

export const useTrashActions = (state: TrashState, setters: TrashSetters) => {
  // 파일 상태 업데이트 공통 로직
  const updateFileState = (fileId: number) => {
    if (state.selectedFolder) {
      const updatedFolder = {
        ...state.selectedFolder,
        files: state.selectedFolder.files.filter((file) => file.id !== fileId),
      }
      setters.setSelectedFolder(updatedFolder)
    }
    if (state.selectedFile?.id === fileId) {
      setters.setSelectedFile(null)
    }
  }

  // 폴더 상태 업데이트 공통 로직
  const updateFolderState = (folderId: number) => {
    const updatedItems = {
      ...state.items,
      [state.selectedType]: state.items[state.selectedType].filter(
        (folder: FolderItem) => folder.id !== folderId,
      ),
    }
    setters.setItems(updatedItems)
    if (state.selectedFolder?.id === folderId) {
      setters.setSelectedFolder(null)
    }
  }

  const handleDeleteFile = async (fileId: number) => {
    try {
      await deleteTrashcanFile(fileId)
      updateFileState(fileId)
    } catch (error) {
      console.error('파일 삭제 실패:', error)
      throw error
    }
  }

  const handleDeleteFolder = async (folderId: number) => {
    try {
      await deleteTrashcanFolder(folderId)
      updateFolderState(folderId)
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
      throw error
    }
  }

  const handleRestoreFile = async (fileId: number) => {
    try {
      await postRestoreTrashcanFile(fileId)
      updateFileState(fileId)
    } catch (error) {
      console.error('파일 복원 실패:', error)
      throw error
    }
  }

  const handleRestoreFolder = async (folderId: number) => {
    try {
      await postRestoreTrashcanFolder(folderId)
      updateFolderState(folderId)
    } catch (error) {
      console.error('폴더 복원 실패:', error)
      throw error
    }
  }

  const handleEmptyTrash = async (projectId: number) => {
    try {
      await deleteAllTrashes(projectId)
      setters.setItems({
        story: [],
        cast: [],
        universe: [],
      })
      setters.setSelectedFolder(null)
      setters.setSelectedFile(null)
    } catch (error) {
      console.error('휴지통 비우기 실패:', error)
      throw error
    }
  }

  const handleRestore = async (
    elementId: number,
    isFolder: boolean = false,
  ) => {
    if (isFolder) {
      await handleRestoreFolder(elementId)
    } else {
      await handleRestoreFile(elementId)
    }
  }

  const handleDelete = async (elementId: number, isFolder: boolean = false) => {
    if (isFolder) {
      await handleDeleteFolder(elementId)
    } else {
      await handleDeleteFile(elementId)
    }
  }

  return {
    onDelete: handleDelete,
    onRestore: handleRestore,
    onEmptyTrash: handleEmptyTrash,
  }
}
