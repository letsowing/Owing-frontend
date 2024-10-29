import { useCallback } from 'react'

import { useFileStore } from '@stores/fileStore'
import { useFolderStore } from '@stores/folderStore'

export const useDnd = () => {
  // 폴더 관련 상태와 액션들
  const {
    items,
    setItems,
    moveFolder,
    addFolder,
    updateFolderName,
    deleteFolder,
  } = useFolderStore(
    useCallback(
      (state) => ({
        items: state.items,
        setItems: state.setItems,
        moveFolder: state.moveFolder,
        addFolder: state.addFolder,
        updateFolderName: state.updateFolderName,
        deleteFolder: state.deleteFolder,
      }),
      [],
    ),
  )

  // 파일 관련 액션들
  const { moveFileItem, addFile, updateFileName, updateFile, deleteFile } =
    useFileStore(
      useCallback(
        (state) => ({
          moveFileItem: state.moveFileItem,
          addFile: state.addFile,
          updateFileName: state.updateFileName,
          updateFile: state.updateFile,
          deleteFile: state.deleteFile,
        }),
        [],
      ),
    )

  return {
    items,
    setItems,
    moveFolder,
    addFolder,
    updateFolderName,
    deleteFolder,

    moveFileItem,
    addFile,
    updateFileName,
    updateFile,
    deleteFile,
  }
}
