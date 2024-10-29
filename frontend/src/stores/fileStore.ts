import { useFolderStore } from './folderStore'

import { FileItem } from '@types'
import { create } from 'zustand'

interface FileState {
  moveFileItem: (
    folderId: number,
    dragIndex: number,
    hoverIndex: number,
  ) => void
  addFile: (folderId: number, fileId: number, fileName: string) => void
  updateFileName: (
    folderId: number,
    fileId: number,
    newFileName: string,
  ) => void
  updateFile: (
    folderId: number,
    fileId: number,
    updates: Partial<FileItem>,
  ) => void
  deleteFile: (folderId: number, fileId: number) => void
}

export const useFileStore = create<FileState>(() => ({
  moveFileItem: (folderId, dragIndex, hoverIndex) => {
    const { items } = useFolderStore.getState()
    const folder = items.find((f) => f.id === folderId)
    if (!folder) return

    const updatedFiles = [...folder.files]
    const [draggedFile] = updatedFiles.splice(dragIndex, 1)
    updatedFiles.splice(hoverIndex, 0, { ...draggedFile })

    useFolderStore.setState({
      items: items.map((f) =>
        f.id === folderId ? { ...f, files: updatedFiles } : f,
      ),
    })
  },

  addFile: (folderId, fileId, fileName) => {
    const { items } = useFolderStore.getState()

    useFolderStore.setState({
      items: items.map((folder) => {
        if (folder.id !== folderId) return folder

        return {
          ...folder,
          files: [
            ...folder.files,
            {
              id: fileId,
              name: fileName,
              description: '새로운 파일 설명',
            },
          ],
        }
      }),
    })
  },

  updateFileName: (folderId, fileId, newFileName) => {
    const { items } = useFolderStore.getState()

    useFolderStore.setState({
      items: items.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: folder.files.map((file) =>
                file.id === fileId ? { ...file, name: newFileName } : file,
              ),
            }
          : folder,
      ),
    })
  },

  updateFile: (folderId, fileId, updates) => {
    const { items } = useFolderStore.getState()

    useFolderStore.setState({
      items: items.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: folder.files.map((file) =>
                file.id === fileId ? { ...file, ...updates } : file,
              ),
            }
          : folder,
      ),
    })
  },

  deleteFile: (folderId, fileId) => {
    const { items } = useFolderStore.getState()

    useFolderStore.setState({
      items: items.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: folder.files.filter((file) => file.id !== fileId),
            }
          : folder,
      ),
    })
  },
}))
