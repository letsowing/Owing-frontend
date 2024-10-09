import { generateUUID } from '@utils/uuid'

import { WORLDVIEW_LIST } from '@/datas/worldviewList'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// 파일 하나의 타입 정의
interface FileItem {
  fileId: string
  name: string
  description: string
  imageUrl: string
}

// 폴더 하나의 타입 정의 (하위 폴더와 파일을 가질 수 있음)
interface FolderItem {
  folderId: string
  name: string
  folderDesc: string
  files: FileItem[]
  subfolders?: FolderItem[] // 폴더 안에 폴더가 있을 수 있으므로 optional 설정
}

// zustand store의 타입 정의
interface DndState {
  items: FolderItem[]
  moveFolder: (dragIndex: number, hoverIndex: number) => void
  moveFile: (folderId: string, dragIndex: number, hoverIndex: number) => void // 파일 이동
  addFolder: (name: string) => void // 새로운 폴더 추가
  addFile: (folderId: string, fileName: string) => void // 새로운 파일 추가
  updateFolderName: (folderId: string, newFolderName: string) => void // 폴더 이름 변경
  updateFileName: (
    folderId: string,
    fileId: string,
    newFileName: string,
  ) => void // 파일 이름 변경
  deleteFolder: (folderId: string) => void
  deleteFile: (folderId: string, fileId: string) => void
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
      moveFile: (folderId: string, dragIndex: number, hoverIndex: number) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder: any = updatedItems.find((f) => f.folderId === folderId)
          const [movedFile] = folder.files.splice(dragIndex, 1)
          folder.files.splice(hoverIndex, 0, movedFile)
          return { items: updatedItems }
        }),
      addFolder: (name: string) =>
        set((state) => {
          const newFolder: FolderItem = {
            folderId: generateUUID(), // getUUID로 새로운 id 생성
            name,
            folderDesc: '',
            files: [],
          }
          return { items: [...state.items, newFolder] }
        }),
      addFile: (folderId: string, fileName: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find((f) => f.folderId === folderId)
          if (folder) {
            const newFile: FileItem = {
              fileId: generateUUID(), // getUUID로 새로운 id 생성
              name: fileName,
              description: '새로운 파일 설명',
              imageUrl: '',
            }
            folder.files.push(newFile) // 폴더에 파일 추가
          }
          return { items: updatedItems }
        }),
      updateFolderName: (folderId: string, newFolderName: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find((f) => f.folderId === folderId)
          if (folder) {
            folder.name = newFolderName
          }
          return { items: updatedItems }
        }),
      updateFileName: (folderId: string, fileId: string, newFileName: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find((f) => f.folderId === folderId)
          if (folder) {
            const file = folder.files.find((f) => f.fileId === fileId)
            if (file) {
              file.name = newFileName
            }
          }
          return { items: updatedItems }
        }),
      deleteFolder: (folderId: string) =>
        set((state) => {
          // 기존 상태에서 삭제할 폴더를 제외하고 업데이트
          const updatedItems = state.items.filter(
            (folder) => folder.folderId !== folderId,
          )

          return { items: updatedItems }
        }),
      deleteFile: (folderId: string, fileId: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find(
            (folder) => folder.folderId === folderId,
          ) // 삭제할 파일의 폴더 찾기

          if (folder) {
            folder.files = folder.files.filter((file) => file.fileId !== fileId) // 삭제할 파일을 제외하고 업데이트
          }

          return { items: updatedItems }
        }),
    }),
    {
      name: 'Worldview-items',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
