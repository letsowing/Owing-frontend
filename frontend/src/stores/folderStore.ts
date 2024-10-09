import { create } from 'zustand'

interface FolderStore {
  selectedFolderId: string | null
  setSelectedFolderId: (id: string | null) => void
}

const useFolderStore = create<FolderStore>((set) => ({
  selectedFolderId: '0', // 초기 상태는 0
  setSelectedFolderId: (id: string | null) => set({ selectedFolderId: id }),
}))

export default useFolderStore
