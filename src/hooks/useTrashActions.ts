import {
  deleteTrashcanElement,
  deleteTrashcans,
  postRestoreTrashcanElement,
} from '@services/trashService'
import { TrashSetters, TrashState } from '@types'

export const useTrashActions = (state: TrashState, setters: TrashSetters) => {
  const removeFromList = (elementId: number) => {
    const updatedItems = {
      ...state.items,
      [state.selectedType]: state.items[state.selectedType].filter(
        (folder) => folder.id !== elementId,
      ),
    }
    setters.setItems(updatedItems)

    if (state.selectedFolder?.id === elementId) {
      setters.setSelectedFolder(null)
      setters.setSelectedFile(null)
    }
  }

  const handleDeleteFolder = async (elementId: number, projectId: number) => {
    try {
      await deleteTrashcanElement(elementId, projectId)
      removeFromList(elementId)
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
    }
  }

  const handleRestore = async (elementId: number, projectId: number) => {
    try {
      await postRestoreTrashcanElement(elementId, projectId)
      removeFromList(elementId)
    } catch (error) {
      console.error('복원 실패:', error)
    }
  }

  const handleDeleteFile = async (elementId: number, projectId: number) => {
    try {
      await deleteTrashcanElement(elementId, projectId)
      if (state.selectedFolder) {
        const updatedFolder = {
          ...state.selectedFolder,
          files: state.selectedFolder.files.filter(
            (file) => file.id !== elementId,
          ),
        }
        setters.setSelectedFolder(updatedFolder)
      }
      if (state.selectedFile?.id === elementId) {
        setters.setSelectedFile(null)
      }
    } catch (error) {
      console.error('파일 삭제 실패:', error)
    }
  }

  const handleEmptyTrash = async (projectId: number) => {
    try {
      await deleteTrashcans(projectId)
      setters.setItems({
        story: [],
        cast: [],
        universe: [],
      })
      setters.setSelectedFolder(null)
      setters.setSelectedFile(null)
    } catch (error) {
      console.error('휴지통 비우기 실패:', error)
    }
  }

  return {
    onDeleteFolder: handleDeleteFolder,
    onRestore: handleRestore,
    onDeleteFile: handleDeleteFile,
    onEmptyTrash: handleEmptyTrash,
  }
}
