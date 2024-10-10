import { create } from 'zustand'

interface FolderStore {
  selectedFolderId: number | null
  setSelectedFolderId: (id: number | null) => void
}

const useFolderStore = create<FolderStore>((set) => ({
  selectedFolderId: 0, // 초기 상태는 0
  setSelectedFolderId: (id: number | null) => set({ selectedFolderId: id }),
}))

export default useFolderStore
