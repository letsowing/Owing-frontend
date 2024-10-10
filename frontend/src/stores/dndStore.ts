import { SCENARIO_LIST } from '@datas/scenarioList'
import { FileItem, FolderItem } from '@types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface DndState {
  items: FolderItem[]
  setItems: (items: FolderItem[]) => void
  moveFolder: (dragIndex: number, hoverIndex: number) => void
  moveFileItem: (
    folderId: number,
    dragIndex: number,
    hoverIndex: number,
  ) => void
  addFolder: (id: number, name: string, description: string) => void
  addFile: (folderId: number, fileId: number, fileName: string) => void
  updateFolderName: (folderId: number, newFolderName: string) => void
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
  deleteFolder: (folderId: number) => void
  deleteFile: (folderId: number, fileId: number) => void
}

export const useDndStore = create(
  persist<DndState>(
    (set) => ({
      items: SCENARIO_LIST.map((item) => ({
        ...item,
        files: item.files.map((file) => ({ ...file })),
      })),
      setItems: (items: FolderItem[]) => set({ items }),
      moveFolder: (dragIndex: number, hoverIndex: number) =>
        set((state) => {
          const updatedItems = [...state.items]
          const [movedFolder] = updatedItems.splice(dragIndex, 1)
          updatedItems.splice(hoverIndex, 0, movedFolder)
          return { items: updatedItems }
        }),
      moveFileItem: (folderId: number, dragIndex: number, hoverIndex: number) =>
        set((state) => {
          const folder = state.items.find((f) => f.id === folderId)
          if (!folder) return state

          const updatedFiles = [...folder.files]
          const [draggedFile] = updatedFiles.splice(dragIndex, 1)
          updatedFiles.splice(hoverIndex, 0, draggedFile)

          const updatedItems = state.items.map((f) =>
            f.id === folderId ? { ...f, files: updatedFiles } : f,
          )

          return { items: updatedItems }
        }),
      addFolder: (id: number, name: string, description: string) =>
        set((state) => {
          const newFolder: FolderItem = {
            id,
            name,
            description,
            files: [],
          }
          return { items: [...state.items, newFolder] }
        }),
      addFile: (folderId: number, fileId: number, fileName: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find((f) => f.id === folderId)
          if (folder) {
            const newFile: FileItem = {
              id: fileId,
              name: fileName,
              description: '새로운 파일 설명',
            }
            folder.files.push(newFile)
          }
          return { items: updatedItems }
        }),
      updateFolderName: (folderId: number, newFolderName: string) =>
        set((state) => {
          const updatedItems = state.items.map((folder) =>
            folder.id === folderId
              ? { ...folder, name: newFolderName }
              : folder,
          )
          return { items: updatedItems }
        }),
      updateFileName: (folderId: number, fileId: number, newFileName: string) =>
        set((state) => {
          const updatedItems = state.items.map((folder) =>
            folder.id === folderId
              ? {
                  ...folder,
                  files: folder.files.map((file) =>
                    file.id === fileId ? { ...file, name: newFileName } : file,
                  ),
                }
              : folder,
          )
          return { items: updatedItems }
        }),
      updateFile: (
        folderId: number,
        fileId: number,
        updates: Partial<FileItem>,
      ) =>
        set((state) => ({
          items: state.items.map((folder) =>
            folder.id === folderId
              ? {
                  ...folder,
                  files: folder.files.map((file) =>
                    file.id === fileId ? { ...file, ...updates } : file,
                  ),
                }
              : folder,
          ),
        })),
      deleteFolder: (folderId: number) =>
        set((state) => ({
          items: state.items.filter((folder) => folder.id !== folderId),
        })),
      deleteFile: (folderId: number, fileId: number) =>
        set((state) => ({
          items: state.items.map((folder) =>
            folder.id === folderId
              ? {
                  ...folder,
                  files: folder.files.filter((file) => file.id !== fileId),
                }
              : folder,
          ),
        })),
    }),
    {
      name: 'dnd-items',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
