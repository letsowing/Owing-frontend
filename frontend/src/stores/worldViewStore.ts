import { WORLDVIEW_LIST } from '@/datas/worldviewList'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// 파일 하나의 타입 정의
interface FileItem {
  fileId: number
  name: string
  description: string
  imageUrl: string
}

// 폴더 하나의 타입 정의 (하위 폴더와 파일을 가질 수 있음)
interface FolderItem {
  folderId: number
  name: string
  folderDesc: string
  files: FileItem[]
  subfolders?: FolderItem[] // 폴더 안에 폴더가 있을 수 있으므로 optional 설정
}

// zustand store의 타입 정의
interface DndState {
  items: FolderItem[]
  moveFolder: (dragIndex: number, hoverIndex: number) => void
  moveFile: (folderId: number, dragIndex: number, hoverIndex: number) => void // 파일 이동
}

export const useWorldViewStore = create(
  persist<DndState>(
    (set) => ({
      items: WORLDVIEW_LIST.map((folder) => ({
        ...folder,
        files: folder.files.map((file) => ({ ...file })),
      })),
      moveFolder: (dragIndex: number, hoverIndex: number) =>
        set((state) => {
          const updatedItems = [...state.items]
          const [movedFolder] = updatedItems.splice(dragIndex, 1) // 드래그한 폴더를 삭제
          updatedItems.splice(hoverIndex, 0, movedFolder) // 새로운 위치에 폴더 삽입
          return { items: updatedItems }
        }),
      moveFile: (folderId: number, dragIndex: number, hoverIndex: number) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder: any = updatedItems.find((f) => f.folderId === folderId)
          const [movedFile] = folder.files.splice(dragIndex, 1)
          folder.files.splice(hoverIndex, 0, movedFile)
          return { items: updatedItems }
        }),
    }),
    {
      name: 'Worldview-items',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
