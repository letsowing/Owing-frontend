import { SCENARIO_LIST } from '@datas/scenarioList'
import { FolderItem } from '@types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FolderState {
  items: FolderItem[]
  setItems: (items: FolderItem[]) => void
  moveFolder: (dragIndex: number, hoverIndex: number) => void
  addFolder: (id: number, name: string, description: string) => void
  updateFolderName: (folderId: number, newFolderName: string) => void
  deleteFolder: (folderId: number) => void
}

export const useFolderStore = create(
  persist<FolderState>(
    (set) => ({
      items: SCENARIO_LIST.map((item) => ({
        ...item,
        files: [...item.files],
      })),

      setItems: (items) =>
        set({
          items: items.map((item) => ({
            ...item,
            files: [...item.files],
          })),
        }),

      moveFolder: (dragIndex, hoverIndex) =>
        set((state) => {
          const updatedItems = [...state.items]
          const [movedFolder] = updatedItems.splice(dragIndex, 1)
          updatedItems.splice(hoverIndex, 0, {
            ...movedFolder,
            files: [...movedFolder.files],
          })
          return { items: updatedItems }
        }),

      addFolder: (id, name, description) =>
        set((state) => ({
          items: [...state.items, { id, name, description, files: [] }],
        })),

      updateFolderName: (folderId, newFolderName) =>
        set((state) => ({
          items: state.items.map((folder) =>
            folder.id === folderId
              ? { ...folder, name: newFolderName }
              : folder,
          ),
        })),

      deleteFolder: (folderId) =>
        set((state) => ({
          items: state.items.filter((folder) => folder.id !== folderId),
        })),
    }),
    {
      name: 'folder-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
