import { useDndStore } from '@stores/dndStore'

export const useDnd = () => {
  const items = useDndStore((state) => state.items)
  const moveFolder = useDndStore((state) => state.moveFolder)
  const moveFileItem = useDndStore((state) => state.moveFileItem)
  const addFolder = useDndStore((state) => state.addFolder)
  const addFile = useDndStore((state) => state.addFile)
  const updateFolderName = useDndStore((state) => state.updateFolderName)
  const updateFileName = useDndStore((state) => state.updateFileName)
  const deleteFolder = useDndStore((state) => state.deleteFolder)
  const deleteFile = useDndStore((state) => state.deleteFile)

  return {
    items,
    moveFolder,
    moveFileItem,
    addFolder,
    addFile,
    updateFolderName,
    updateFileName,
    deleteFolder,
    deleteFile,
  }
}
